const TemperatureReading = require('../models/temperatureModel');
const TurbidityModel = require('../models/turbidityModel');
const pHModel = require('../models/phLevelModel');
const ModeValues = require('../models/modeValuesModel');
const tf = require('@tensorflow/tfjs-node');
const cron = require('node-cron');


// KalmanFilter initialization and training
async function kalmanFilter(inputData) {
    try {
        // Convert input data to TensorFlow tensors
        const dataTensor = tf.tensor1d(inputData);

        // Initialize Kalman filter parameters
        let stateEstimate = tf.variable(tf.scalar(inputData[0])); 
        let errorCovariance = tf.variable(tf.scalar(1)); 

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

async function filterTemperatureReadings() {
    try {
        // Fetch all temperature readings
        const readings = await TemperatureReading.find({}).sort({ station_id: 1, createdAt: 1 }).lean();

        // Group readings by station_id and then by date, but also track the latest createdAt for each group
        const groupedReadings = {};
        const latestCreatedAtPerGroup = {}; 

        readings.forEach(reading => {
            const stationId = reading.station_id;
            const date = new Date(reading.createdAt).toISOString().split('T')[0]; 

            if (!groupedReadings[stationId]) {
                groupedReadings[stationId] = {};
                latestCreatedAtPerGroup[stationId] = {};
            }
            if (!groupedReadings[stationId][date]) {
                groupedReadings[stationId][date] = [];
                latestCreatedAtPerGroup[stationId][date] = reading.createdAt; 
            } else if (new Date(reading.createdAt) > new Date(latestCreatedAtPerGroup[stationId][date])) {
                // Update if the current reading's createdAt is later than the currently stored timestamp
                latestCreatedAtPerGroup[stationId][date] = reading.createdAt;
            }
            groupedReadings[stationId][date].push(reading.paramValue);
        });

        // Apply KalmanFilter to each group, now considering the date
        const filteredReadings = {};
        for (const [stationId, dateGroups] of Object.entries(groupedReadings)) {
            filteredReadings[stationId] = {};
            for (const [date, values] of Object.entries(dateGroups)) {
                // Apply kalman filter for each stationId and date
                filteredReadings[stationId][date] = await kalmanFilter(values);
            }
        }

        // Return both filtered readings and the latestCreatedAtPerGroup object
        return { filteredReadings, latestCreatedAtPerGroup };

    } catch (error) {
        console.error('Error filtering readings:', error);
        throw error;
    }
}

// Execute the filterReadings function
filterTemperatureReadings();

const calculateMode = (arr) => {
    if (arr.length === 0) return null;

    const modeMap = {};
    let maxCount = 0;
    let mode = null;

    // Count occurrences of each value
    arr.forEach(val => {
        modeMap[val] = (modeMap[val] || 0) + 1;
        if (modeMap[val] > maxCount) {
            maxCount = modeMap[val];
            mode = val;
        }
    });

    return mode;
};


const calculateTemperatureMode = async () => {
    try {
        // Step 1: Call filterReadings to get filtered readings and latestCreatedAtPerGroup
        const { filteredReadings, latestCreatedAtPerGroup } = await filterTemperatureReadings();

        // Ensure filteredReadings is not undefined or null
        if (!filteredReadings) {
            throw new Error('Filtered readings are undefined or null');
        }

        // Step 2: Aggregate filtered readings to calculate mode
        const modePerStationAndDate = [];

        // Iterate through filtered readings for each station and date
        for (const stationId of Object.keys(filteredReadings)) {
            for (const date of Object.keys(filteredReadings[stationId])) {
                const readings = filteredReadings[stationId][date];

                // Get the latestCreatedAt for the current stationId and date
                const latestCreatedAt = latestCreatedAtPerGroup[stationId][date];

                // Calculate mode
                const mode = calculateMode(readings);

                // Step 3: Update or create mode values in ModeValues collection
                const existingMode = await ModeValues.findOne({
                    station_id: stationId,
                    paramName: "Temperature",
                    createdAt: {
                        $gte: new Date(`${date}T00:00:00.000Z`),
                        $lt: new Date(`${date}T23:59:59.999Z`)
                    }
                });

                if (existingMode) {
                    // Update the existing document if mode is different
                    if (existingMode.paramValue !== mode) {
                        await ModeValues.updateOne({ _id: existingMode._id }, { paramValue: mode });
                    }
                } else {
                    // Create a new document if no existing mode found for the day
                    await ModeValues.create({
                        station_id: stationId,
                        // tester_id: null, // Removed tester_id
                        paramName: "Temperature",
                        paramValue: mode,
                        createdAt: latestCreatedAt
                    });
                }

                modePerStationAndDate.push({
                    station_id: stationId,
                    date: latestCreatedAt,
                    mode: mode
                });
            }
        }

        // Step 4: Return calculated modes
        return modePerStationAndDate;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to calculate temperature mode');
    }
};

const getTemperatureMode = async (req, res) => {
    try {
        const modePerStationAndDate = await calculateTemperatureMode();
        res.json(modePerStationAndDate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function filterTurbidityReadings() {
    try {
        // Fetch all temperature readings
        const readings = await TurbidityModel.find({}).sort({ station_id: 1, createdAt: 1 }).lean();

        // Group readings by station_id and then by date, but also track the latest createdAt for each group
        const groupedReadings = {};
        const latestCreatedAtPerGroup = {}; // New object to track the latest createdAt timestamp

        readings.forEach(reading => {
            const stationId = reading.station_id;
            const date = new Date(reading.createdAt).toISOString().split('T')[0];

            if (!groupedReadings[stationId]) {
                groupedReadings[stationId] = {};
                latestCreatedAtPerGroup[stationId] = {};
            }
            if (!groupedReadings[stationId][date]) {
                groupedReadings[stationId][date] = [];
                latestCreatedAtPerGroup[stationId][date] = reading.createdAt; 
            } else if (new Date(reading.createdAt) > new Date(latestCreatedAtPerGroup[stationId][date])) {
                // Update if the current reading's createdAt is later than the currently stored timestamp
                latestCreatedAtPerGroup[stationId][date] = reading.createdAt;
            }
            groupedReadings[stationId][date].push(reading.paramValue);
        });

        // Apply KalmanFilter to each group, now considering the date
        const filteredReadings = {};
        for (const [stationId, dateGroups] of Object.entries(groupedReadings)) {
            filteredReadings[stationId] = {};
            for (const [date, values] of Object.entries(dateGroups)) {
                // Apply kalman filter for each stationId and date
                filteredReadings[stationId][date] = await kalmanFilter(values);
            }
        }

        // Return both filtered readings and the latestCreatedAtPerGroup object
        return { filteredReadings, latestCreatedAtPerGroup };

    } catch (error) {
        console.error('Error filtering readings:', error);
        throw error;
    }
}

// Execute the filterReadings function
filterTurbidityReadings();

const calculateTurbidityMode = async () => {
    try {
        // Step 1: Call filterReadings to get filtered readings and latestCreatedAtPerGroup
        const { filteredReadings, latestCreatedAtPerGroup } = await filterTurbidityReadings();

        // Ensure filteredReadings is not undefined or null
        if (!filteredReadings) {
            throw new Error('Filtered readings are undefined or null');
        }

        // Step 2: Aggregate filtered readings to calculate mode
        const modePerStationAndDate = [];

        // Iterate through filtered readings for each station and date
        for (const stationId of Object.keys(filteredReadings)) {
            for (const date of Object.keys(filteredReadings[stationId])) {
                const readings = filteredReadings[stationId][date];

                // Get the latestCreatedAt for the current stationId and date
                const latestCreatedAt = latestCreatedAtPerGroup[stationId][date];

                // Calculate mode
                const mode = calculateMode(readings);

                // Step 3: Update or create mode values in ModeValues collection
                const existingMode = await ModeValues.findOne({
                    station_id: stationId,
                    paramName: "Turbidity",
                    createdAt: {
                        $gte: new Date(`${date}T00:00:00.000Z`),
                        $lt: new Date(`${date}T23:59:59.999Z`)
                    }
                });

                if (existingMode) {
                    // Update the existing document if mode is different
                    if (existingMode.paramValue !== mode) {
                        await ModeValues.updateOne({ _id: existingMode._id }, { paramValue: mode });
                    }
                } else {
                    // Create a new document if no existing mode found for the day
                    await ModeValues.create({
                        station_id: stationId,
                        // tester_id: null, // Removed tester_id
                        paramName: "Turbidity",
                        paramValue: mode,
                        createdAt: latestCreatedAt
                    });
                }

                modePerStationAndDate.push({
                    station_id: stationId,
                    date: latestCreatedAt,
                    mode: mode
                });
            }
        }

        // Step 4: Return calculated modes
        return modePerStationAndDate;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to calculate turbidity mode'); 
    }
};

const getTurbidityMode = async (req, res) => {
    try {
        const modePerStationAndDate = await calculateTurbidityMode();
        res.json(modePerStationAndDate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function filterPhReadings() {
    try {
        // Fetch all temperature readings
        const readings = await pHModel.find({}).sort({ station_id: 1, createdAt: 1 }).lean();

        // Group readings by station_id and then by date, but also track the latest createdAt for each group
        const groupedReadings = {};
        const latestCreatedAtPerGroup = {};

        readings.forEach(reading => {
            const stationId = reading.station_id;
            const date = new Date(reading.createdAt).toISOString().split('T')[0]; 

            if (!groupedReadings[stationId]) {
                groupedReadings[stationId] = {};
                latestCreatedAtPerGroup[stationId] = {};
            }
            if (!groupedReadings[stationId][date]) {
                groupedReadings[stationId][date] = [];
                latestCreatedAtPerGroup[stationId][date] = reading.createdAt; 
            } else if (new Date(reading.createdAt) > new Date(latestCreatedAtPerGroup[stationId][date])) {
                // Update if the current reading's createdAt is later than the currently stored timestamp
                latestCreatedAtPerGroup[stationId][date] = reading.createdAt;
            }
            groupedReadings[stationId][date].push(reading.paramValue);
        });

        // Apply KalmanFilter to each group, now considering the date
        const filteredReadings = {};
        for (const [stationId, dateGroups] of Object.entries(groupedReadings)) {
            filteredReadings[stationId] = {};
            for (const [date, values] of Object.entries(dateGroups)) {
                // Apply kalman filter for each stationId and date
                filteredReadings[stationId][date] = await kalmanFilter(values);
            }
        }

        // Return both filtered readings and the latestCreatedAtPerGroup object
        return { filteredReadings, latestCreatedAtPerGroup };

    } catch (error) {
        console.error('Error filtering readings:', error);
        throw error;
    }
}

// Execute the filterReadings function
filterPhReadings();

const calculatePhMode = async () => {
    try {
        // Step 1: Call filterReadings to get filtered readings and latestCreatedAtPerGroup
        const { filteredReadings, latestCreatedAtPerGroup } = await filterPhReadings();

        // Ensure filteredReadings is not undefined or null
        if (!filteredReadings) {
            throw new Error('Filtered readings are undefined or null');
        }

        // Step 2: Aggregate filtered readings to calculate mode
        const modePerStationAndDate = [];

        // Iterate through filtered readings for each station and date
        for (const stationId of Object.keys(filteredReadings)) {
            for (const date of Object.keys(filteredReadings[stationId])) {
                const readings = filteredReadings[stationId][date];

                // Get the latestCreatedAt for the current stationId and date
                const latestCreatedAt = latestCreatedAtPerGroup[stationId][date];

                // Calculate mode
                const mode = calculateMode(readings);

                // Step 3: Update or create mode values in ModeValues collection
                const existingMode = await ModeValues.findOne({
                    station_id: stationId,
                    paramName: "pH",
                    createdAt: {
                        $gte: new Date(`${date}T00:00:00.000Z`),
                        $lt: new Date(`${date}T23:59:59.999Z`)
                    }
                });

                if (existingMode) {
                    // Update the existing document if mode is different
                    if (existingMode.paramValue !== mode) {
                        await ModeValues.updateOne({ _id: existingMode._id }, { paramValue: mode });
                    }
                } else {
                    // Create a new document if no existing mode found for the day
                    await ModeValues.create({
                        station_id: stationId,
                        // tester_id: null, // Removed tester_id
                        paramName: "pH",
                        paramValue: mode,
                        createdAt: latestCreatedAt
                    });
                }

                modePerStationAndDate.push({
                    station_id: stationId,
                    date: latestCreatedAt,
                    mode: mode
                });
            }
        }

        // Step 4: Return calculated modes
        return modePerStationAndDate;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to calculate pH mode');
    }
};

const getPhMode = async (req, res) => {
    try {
        const modePerStationAndDate = await calculatePhMode();
        res.json(modePerStationAndDate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to get all mode results
const getAllMode = async () => {
    try {
        // Trigger mode calculations and wait for them to complete
        await Promise.all([
            calculateTemperatureMode(),
            calculateTurbidityMode(),
            calculatePhMode(),
        ]);

        // Now that the modes are updated, fetch all mode values from the database
        const modeResults = await ModeValues.find().sort({ station_id: 1, createdAt: 1 });

        // Initialize an object to store sorted mode values
        const sortedModeValues = {};

        // Iterate over modeResults
        modeResults.forEach(modeValue => {
            // Extract necessary fields from modeValue
            const { station_id, paramName, paramValue, createdAt } = modeValue;

            // If station_id does not exist in sortedModeValues, initialize it as an empty array
            if (!sortedModeValues[station_id]) {
                sortedModeValues[station_id] = {};
            }

            // Extract date from createdAt
            const date = createdAt.toISOString().slice(0, 10);

            // If date does not exist in sortedModeValues[station_id], initialize it as an empty array
            if (!sortedModeValues[station_id][date]) {
                sortedModeValues[station_id][date] = [];
            }

            // Push new object to sortedModeValues[station_id][date]
            sortedModeValues[station_id][date].push({ paramName, paramValue });
        });

        // Sort parameters within each station and date based on createdAt
        for (const station_id in sortedModeValues) {
            for (const date in sortedModeValues[station_id]) {
                sortedModeValues[station_id][date].sort((a, b) => a.createdAt - b.createdAt);
            }
        }

        return sortedModeValues; // Return the sorted mode values
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch mode values');
    }
};

const scheduledAccumulationMode = () => {
    return new Promise((resolve, reject) => {
        cron.schedule('0 0 * * *', async () => {
            console.log('Cron job triggered!');
            try {
                // Call getAllMode to fetch mode values
                const modeValues = await getAllMode();
                // Handle sending the response here or store the result for further processing
                console.log(modeValues);
                resolve();
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
}

module.exports = {
    getTemperatureMode,
    getTurbidityMode,
    getPhMode,
    getAllMode,
    scheduledAccumulationMode
};
