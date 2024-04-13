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
const sequenceLength = 4;

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

    data.forEach(stationData => {
      stationData.data.forEach(item => {
        if (isNaN(item.wqi)) {
          throw new Error(`Invalid WQI value for station ${stationData.stationId}`);
        }
      });
    });

    // No filtering applied, proceed with raw data
    const unfilteredData = data.map(stationData => ({
      stationId: stationData.stationId,
      data: stationData.data
    }));

    return unfilteredData;
  } catch (error) {
    console.error('Error processing data for LSTM:', error);
    return [];
  }
};


const trainModelForStation = async (stationId, data) => {
  try {
    // Ensure data is an array and has at least `sequenceLength` elements
    if (!Array.isArray(data) || data.length < sequenceLength) {
      throw new Error(`Invalid data structure for station ${stationId}`);
    }

    // Log the input data to inspect its structure
    console.log(`Input data for station ${stationId}:`, data);

    // Extract the 'wqi' values from data for training
    const wqiValues = data.map(item => item.wqi);

    // Check if there are any NaN or undefined values in 'wqiValues'
    if (wqiValues.some(value => isNaN(value) || value === undefined)) {
      throw new Error(`Invalid WQI values for station ${stationId}`);
    }

    // Proceed with model preparation and training
    const modelSavePath = path.join(modelSaveBasePath, `station_${stationId}`);
    ensureModelDirectoryExists(modelSavePath);

    let model;
    if (fs.existsSync(path.join(modelSavePath, 'model.json'))) {
      model = await tf.loadLayersModel(`file://${path.join(modelSavePath, 'model.json')}`);
    } else {
      model = defineModel();
    }

    model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

    let sequences = [];
    let labels = [];
    for (let i = 0; i < data.length - sequenceLength; i++) {
      sequences.push(data.slice(i, i + sequenceLength).map(item => [item.wqi]));
      labels.push(data[i + sequenceLength].wqi);
    }

    const xs = tf.tensor3d(sequences);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    console.log('Input data shape (xs):', xs.shape);

    await model.fit(xs, ys, {
      batchSize: 32,
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1} - Loss: ${logs.loss}`);
        }
      }
    });

    await model.save(`file://${modelSavePath}`);
    console.log(`Model for station ${stationId} saved.`);

  } catch (error) {
    console.error(`Error training model for station ${stationId}:`, error);
  }
};

//data training
const preprocessAndTrainModels = async () => {
  try {
    const data = await preprocessDataForLSTM();
    const totalStations = data.length;
    let stationsProcessed = 0;

    for (const stationData of data) {
      const { stationId, data: stationDataArray } = stationData;
      await trainModelForStation(stationId, stationDataArray);
      stationsProcessed++;

      if (stationsProcessed === totalStations) {
        console.log('All station models trained.');
        process.exit(0); // Exit the script
      }
    }
  } catch (error) {
    console.error('Error during preprocessing and training:', error);
    process.exit(1); // Exit with error status
  }
};

// preprocessAndTrainModels();

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
    model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });
    return model;
  } else {
    throw new Error(`Model for station ${stationId} not found.`);
  }
};

const generateSequencesForNext5Days = (data, predictedWQIValues) => {
  const lastSequence = data.slice(-sequenceLength).map(item => [item.wqi]);
  let sequences = [lastSequence];

  // Append the predicted WQI values for the next 5 days to the sequences
  for (let i = 0; i < 5; i++) {
    const nextSequence = [...sequences[sequences.length - 1].slice(1), [predictedWQIValues[i] || 0]]; // Default to 0 if predicted value is not available
    sequences.push(nextSequence);
  }

  return sequences;
};

const predictNext5DaysWQIForStation = async (stationId, data) => {
  try {
    const model = await loadModelForStation(stationId);
    const currentDate = new Date();
    const predictions = [];

    // Predict WQI for each of the next 5 days
    for (let i = 0; i < 5; i++) {
      // Generate sequences for the current data and predicted values
      const sequences = generateSequencesForNext5Days(data, predictions.map(prediction => prediction.wqi));
      
      // Convert sequences to TensorFlow tensor
      const xs = tf.tensor3d(sequences);

      // Predict WQI values using the model
      const predictedValues = model.predict(xs);
      console.log("Predicted Values:", predictedValues.dataSync());
      const predictedValue = Array.from(predictedValues.dataSync())[0]; // Assuming single prediction per day

      // Add the predicted value to the predictions array
      predictions.push({
        stationId,
        date: new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000), // Add 1 day to the current date
        wqi: predictedValue
      });
    }

    // Check if any records with the same date already exist in the database
    const existingPredictions = await Predictions.find({ 
      stationId, 
      $expr: { 
        $in: [
          { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          predictions.map(prediction => prediction.date.toISOString().split('T')[0])
        ]
      } 
    });

    if (existingPredictions.length === 0) {
      // No records with the same date found, save the predictions into the database
      await Predictions.insertMany(predictions);
      console.log('Predictions saved successfully.');
    } else {
      // Records with the same date found, handle the situation based on your requirements
      console.log('Predictions with the same date already exist in the database.');
      // You can choose to update existing records or skip saving the predictions
    }

    return predictions;
  } catch (error) {
    console.error(`Error predicting WQI for station ${stationId}: ${error.message}`);
  }
};

const predictNext5DaysWQIForStations = async (req, res) => {
  try {
    // Fetch data for LSTM prediction
    const data = await preprocessDataForLSTM();

    // Initialize an array to store predictions
    const predictions = [];

    // Loop through each station's data
    for (const stationData of data) {
        const { stationId, data: stationDataArray } = stationData;

        // Predict WQI for the next 5 days for the current station
        const predictedValues = await predictNext5DaysWQIForStation(stationId, stationDataArray);

        // Push the stationId and its predictions to the array
        predictions.push({ stationId, predictions: predictedValues });
    }

    // Send the predictions as a JSON response
    res.json(predictions);
} catch (error) {
    // Handle any errors that occur during the prediction process
    console.error('Error predicting WQI for stations:', error);
    res.status(500).json({ error: 'Internal server error' });
}

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

// Connect to the database
connectDB().catch(err => console.error('Error connecting to database:', err));

module.exports = {
  scheduleModelProcessingAndPrediction,
  predictNext5DaysWQIForStations,
  preprocessAndTrainModels,
};