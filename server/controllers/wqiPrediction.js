const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cron = require('node-cron');
const WQIValues = require('../models/wqiModel');
const Predictions = require('../models/predictedWQIModel');

const dbURI = 'mongodb+srv://realmadmin:ZSt6kE8TzgVq92jt@realmcluster.ole0mns.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

const ensureModelDirectoryExists = (modelPath) => {
  if (!fs.existsSync(modelPath)) {
    fs.mkdirSync(modelPath, { recursive: true });
  }
};

const modelSaveBasePath = path.join(__dirname, 'models', 'wqiModels');
const sequenceLength = 3;

// KalmanFilter initialization and training
async function kalmanFilter(inputData) {
  try {
      // Convert input data to TensorFlow tensors
      const dataTensor = tf.tensor1d(inputData);

      // Initialize Kalman filter parameters
      let stateEstimate = tf.variable(tf.scalar(inputData[0])); // Initial state estimate
      let errorCovariance = tf.variable(tf.scalar(1)); // Initial error covariance

      const predictions = [];

      // Iterate over each data point to perform Kalman filter prediction
      for (let i = 0; i < dataTensor.shape[0]; i++) {
          // Prediction step
          const predictedStateEstimate = stateEstimate;
          const predictedErrorCovariance = errorCovariance.add(tf.scalar(1));

          // Update step (in Kalman filter, we don't have external control input)
          const innovation = dataTensor.slice([i], [1]).sub(predictedStateEstimate);
          const innovationCovariance = predictedErrorCovariance.add(tf.scalar(1));
          const kalmanGain = predictedErrorCovariance.div(innovationCovariance);
          
          stateEstimate = predictedStateEstimate.add(kalmanGain.mul(innovation));
          errorCovariance = predictedErrorCovariance.sub(kalmanGain.mul(innovationCovariance));

          predictions.push(stateEstimate.dataSync()[0]);
      }

      return predictions;

  } catch (error) {
      console.error('Error in Kalman filter:', error);
      return [];
  }
}

//preprocess data with the Kalman filtered wqi data
const preprocessDataForLSTM = async () => {
  try {
    const data = await WQIValues.aggregate([
      {
        $group: {
          _id: "$stationId",
          data: {
            $push: {
              _id: "$_id",
              date: "$date",
              wqi: "$wqi"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          stationId: "$_id",
          data: 1
        }
      }
    ]);

    // Apply Kalman filter to each set of WQI values for each station
    const filteredData = await Promise.all(data.map(async stationData => {
      const { stationId, data: stationDataArray } = stationData;
      const wqiValues = stationDataArray.map(item => item.wqi);
      const filteredWQIValues = await kalmanFilter(wqiValues);
      const filteredStationData = stationDataArray.map((item, index) => ({
        ...item,
        wqi: filteredWQIValues[index]
      }));
      return { stationId, data: filteredStationData };
    }));

    return filteredData;
  } catch (error) {
    console.error('Error processing data for LSTM:', error);
    return [];
  }
};

//data training
const preprocessAndTrainModels = async () => {
  const data = await preprocessDataForLSTM();
  for (const stationData of data) {
    const { stationId, data: stationDataArray } = stationData;
    await trainModelForStation(stationId, stationDataArray);
  }
};

const trainModelForStation = async (stationId, data) => {
  const modelSavePath = path.join(modelSaveBasePath, `station_${stationId}`);
  ensureModelDirectoryExists(modelSavePath);

  let model;
  if (fs.existsSync(path.join(modelSavePath, 'model.json'))) {
    model = await tf.loadLayersModel(`file://${path.join(modelSavePath, 'model.json')}`);
  } else {
    model = defineModel();
  }

  model.compile({ loss: 'meanSquaredError', optimizer: 'rmsprop' });

  let sequences = [];
  let labels = [];
  for (let i = 0; i < data.length - sequenceLength; i++) {
    sequences.push(data.slice(i, i + sequenceLength).map(item => [item.wqi]));
    labels.push(data[i + sequenceLength].wqi);
  }

  const xs = tf.tensor3d(sequences);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  await model.fit(xs, ys, {
    batchSize: 32,
    epochs: 100
  });

  await model.save(`file://${modelSavePath}`);
  console.log(`Model for station ${stationId} saved.`);
};

const defineModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.lstm({ units: 128, returnSequences: true, inputShape: [sequenceLength, 1] }));
  model.add(tf.layers.lstm({ units: 64, returnSequences: true }));
  model.add(tf.layers.lstm({ units: 32, returnSequences: false }));
  model.add(tf.layers.dense({ units: 1 }));

  return model;
};


//data prediction
const loadModelForStation = async (stationId) => {
  const modelSavePath = path.join(modelSaveBasePath, `station_${stationId}`);
  if (fs.existsSync(path.join(modelSavePath, 'model.json'))) {
    const model = await tf.loadLayersModel(`file://${path.join(modelSavePath, 'model.json')}`);
    model.compile({ loss: 'meanSquaredError', optimizer: 'rmsprop' });
    return model;
  } else {
    throw new Error(`Model for station ${stationId} not found.`);
  }
};

const generateSequencesForNext5Days = (data) => {
  const lastSequence = data.slice(-sequenceLength).map(item => [item.wqi]);
  let sequences = [lastSequence];

  for (let i = 1; i < 5; i++) {
    const nextSequence = data.slice(-sequenceLength + i).map(item => [item.wqi]);
    sequences.push(nextSequence);
  }

  return sequences;
};

const predictNext5DaysWQIForStation = async (stationId, data) => {
  try {
    const model = await loadModelForStation(stationId);
    const sequences = generateSequencesForNext5Days(data);
    const xs = tf.tensor3d(sequences);

    const predictions = model.predict(xs);
    const predictedValues = Array.from(predictions.dataSync());

    console.log('Predicted values:', predictedValues);

    const currentDate = new Date();
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      dates.push(nextDate);
    }

    const result = dates.map((date, index) => ({
      stationId,
      date,
      wqi: predictedValues[index]
    }));

    // Check if any records with the same date already exist in the database
    const existingPredictions = await Predictions.find({ 
      stationId, 
      $expr: { 
        $in: [
          { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          dates.map(date => date.toISOString().split('T')[0])
        ]
      } 
    });

    if (existingPredictions.length === 0) {
      // No records with the same date found, save the predictions into the database
      await Predictions.insertMany(result);
      console.log('Predictions saved successfully.');
    } else {
      // Records with the same date found, handle the situation based on your requirements
      console.log('Predictions with the same date already exist in the database.');
      // You can choose to update existing records or skip saving the predictions
      
    }

    return result;
  } catch (error) {
    console.error(`Error predicting WQI for station ${stationId}: ${error.message}`);
  }
};


const predictNext5DaysWQIForStations = async () => {
  const data = await preprocessDataForLSTM();
  const predictions = {};

  for (const stationData of data) {
    const { stationId, data: stationDataArray } = stationData;
    const predictedValues = await predictNext5DaysWQIForStation(stationId, stationDataArray);
    predictions[stationId] = predictedValues;
  }

  return predictions;
};

const scheduleModelProcessingAndPrediction = () => {
  return new Promise((resolve, reject) => {
      cron.schedule('0 0 * * *', async () => {
          console.log('Cron job triggered!');

          try {
              if (mongoose.connection.readyState !== 1) {
                  console.log('Reconnecting to the database...');
                  await connectDB();
              }

              console.log('Starting data preprocessing and model training...');
              await preprocessAndTrainModels();
              console.log('Data preprocessing and model training completed.');

              console.log('Starting prediction for the next 5 days...');
              const predictions = await predictNext5DaysWQIForStations();
              console.log('Predictions for the next 5 days:', predictions);
              resolve(); // Resolve the promise when the job is done
          } catch (err) {
              console.error('Error during scheduled tasks:', err);
              reject(err); // Reject the promise if an error occurs
          }
      });
  });
};

connectDB().catch(err => console.error('Error connecting to database:', err));

module.exports = {
  scheduleModelProcessingAndPrediction
};