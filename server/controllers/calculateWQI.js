const TemperatureReading = require('../models/temperatureModel');
const TurbidityModel = require('../models/turbidityModel');
const pHModel = require('../models/phLevelModel');
const ModeValues = require('../models/modeForWQIModel');
const tf = require('@tensorflow/tfjs-node');

// KalmanFilter initialization and training
async function kalmanFilter(inputData) {
    try {
        const dataTensor = tf.tensor1d(inputData);
        let stateEstimate = tf.variable(tf.scalar(inputData[0]));
        let errorCovariance = tf.variable(tf.scalar(1));
        const predictions = [];

        for (let i = 0; i < dataTensor.shape[0]; i++) {
            const predictedStateEstimate = stateEstimate;
            const predictedErrorCovariance = errorCovariance.add(tf.scalar(1));
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

function interpolateNegativeValues(values) {
    return values.map((value, index) => {
        if (value >= 0) {
            return value; // No need to interpolate if the value is non-negative
        } else {
            // Interpolate using neighboring values
            const prevValue = index > 0 ? values[index - 1] : null;
            const nextValue = index < values.length - 1 ? values[index + 1] : null;
            if (prevValue !== null && nextValue !== null) {
                // Use linear interpolation for simplicity, but other methods could be used
                return (prevValue + nextValue) / 2; // Average of neighboring values
            } else {
                return value; // Unable to interpolate, return original value
            }
        }
    });
}

function replaceNegativeValuesWithMin(values, minValue) {
    return values.map(value => value < 0 ? minValue : value);
}

async function filterTemperatureReadings() {
    try {
        const readings = await TemperatureReading.find({}).sort({ station_id: 1, createdAt: 1 }).lean();
        const groupedReadings = {};
        const latestCreatedAtPerGroup = {};

        readings.forEach(reading => {
            const stationId = reading.station_id;
            const createdAt = new Date(reading.createdAt);
            const dateKey = `${createdAt.toISOString().split('T')[0]}T${createdAt.getHours()}:${createdAt.getMinutes()}`;

            if (!groupedReadings[stationId]) {
                groupedReadings[stationId] = {};
                latestCreatedAtPerGroup[stationId] = {};
            }
            if (!groupedReadings[stationId][dateKey]) {
                groupedReadings[stationId][dateKey] = [];
                latestCreatedAtPerGroup[stationId][dateKey] = reading.createdAt;
            } else if (createdAt > new Date(latestCreatedAtPerGroup[stationId][dateKey])) {
                latestCreatedAtPerGroup[stationId][dateKey] = reading.createdAt;
            }
            groupedReadings[stationId][dateKey].push(reading.paramValue);
        });

        const filteredReadings = {};
        for (const [stationId, dateGroups] of Object.entries(groupedReadings)) {
            filteredReadings[stationId] = {};
            for (const [dateKey, values] of Object.entries(dateGroups)) {
                const processedValues = interpolateNegativeValues(values); // Interpolate negative values
                filteredReadings[stationId][dateKey] = await kalmanFilter(processedValues);
            }
        }

        return { filteredReadings, latestCreatedAtPerGroup };
    } catch (error) {
        console.error('Error filtering readings:', error);
        throw error;
    }
}

const calculateMode = (arr) => {
    if (arr.length === 0) return null;
    const modeMap = {};
    let maxCount = 0;
    let mode = null;

    arr.forEach(val => {
        modeMap[val] = (modeMap[val] || 0) + 1;
        if (modeMap[val] > maxCount) {
            maxCount = modeMap[val];
            mode = val;
        }
    });

    return mode;
};


async function calculateTemperatureMode() {
    try {
        const { filteredReadings, latestCreatedAtPerGroup } = await filterTemperatureReadings();

        if (!filteredReadings) {
            throw new Error('Filtered readings are undefined or null');
        }

        const modePerStationAndDate = [];

        for (const stationId in filteredReadings) {
            for (const dateKey in filteredReadings[stationId]) {
                const readings = filteredReadings[stationId][dateKey];
                const latestCreatedAt = latestCreatedAtPerGroup[stationId][dateKey];
                const mode = calculateMode(readings);

                await ModeValues.updateOne({
                    station_id: stationId,
                    paramName: "Temperature",
                    createdAt: latestCreatedAt
                }, {
                    $set: { paramValue: mode }
                }, { upsert: true });

                modePerStationAndDate.push({
                    station_id: stationId,
                    date: dateKey,
                    mode: mode
                });
            }
        }

        return modePerStationAndDate;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to calculate temperature mode');
    }
}

async function getModeTemperature(req, res) {
    try {
        const modePerStationAndDate = await calculateTemperatureMode();
        console.log(modePerStationAndDate);
        res.json(modePerStationAndDate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function filterTurbidityReadings() {
    try {
        const readings = await TurbidityModel.find({}).sort({ station_id: 1, createdAt: 1 }).lean();
        const groupedReadings = {};
        const latestCreatedAtPerGroup = {};

        readings.forEach(reading => {
            const stationId = reading.station_id;
            const createdAt = new Date(reading.createdAt);
            const dateKey = `${createdAt.toISOString().split('T')[0]}T${createdAt.getHours()}:${createdAt.getMinutes()}`;

            if (!groupedReadings[stationId]) {
                groupedReadings[stationId] = {};
                latestCreatedAtPerGroup[stationId] = {};
            }
            if (!groupedReadings[stationId][dateKey]) {
                groupedReadings[stationId][dateKey] = [];
                latestCreatedAtPerGroup[stationId][dateKey] = reading.createdAt;
            } else if (createdAt > new Date(latestCreatedAtPerGroup[stationId][dateKey])) {
                latestCreatedAtPerGroup[stationId][dateKey] = reading.createdAt;
            }
            groupedReadings[stationId][dateKey].push(reading.paramValue);
        });

        const filteredReadings = {};
        for (const [stationId, dateGroups] of Object.entries(groupedReadings)) {
            filteredReadings[stationId] = {};
            for (const [timeKey, values] of Object.entries(dateGroups)) {
                // Apply preprocessing: replace negative values with a minimum value
                const minValue = 0.6000003218650818; // Adjust the minimum value based on your data characteristics
                const processedValues = replaceNegativeValuesWithMin(values, minValue);

                // Apply interpolation to handle negative values
                const interpolatedValues = interpolateNegativeValues(processedValues);

                // Apply kalman filter for each stationId and date
                filteredReadings[stationId][timeKey] = await kalmanFilter(interpolatedValues);
            }
        }

        return { filteredReadings, latestCreatedAtPerGroup };
    } catch (error) {
        console.error('Error filtering readings:', error);
        throw error;
    }
}

async function calculateTurbidityMode() {
    try {
        const { filteredReadings, latestCreatedAtPerGroup } = await filterTurbidityReadings();

        if (!filteredReadings) {
            throw new Error('Filtered readings are undefined or null');
        }

        const modePerStationAndDate = [];

        for (const stationId in filteredReadings) {
            for (const dateKey in filteredReadings[stationId]) {
                const readings = filteredReadings[stationId][dateKey];
                const latestCreatedAt = latestCreatedAtPerGroup[stationId][dateKey];
                const mode = calculateMode(readings);

                await ModeValues.updateOne({
                    station_id: stationId,
                    paramName: "Turbidity",
                    createdAt: latestCreatedAt
                }, {
                    $set: { paramValue: mode }
                }, { upsert: true });

                modePerStationAndDate.push({
                    station_id: stationId,
                    date: dateKey,
                    mode: mode
                });
            }
        }

        return modePerStationAndDate;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to calculate turbidity mode');
    }
}

async function getModeTurbidity(req, res) {
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
        const readings = await pHModel.find({}).sort({ station_id: 1, createdAt: 1 }).lean();
        const groupedReadings = {};
        const latestCreatedAtPerGroup = {};

        readings.forEach(reading => {
            const stationId = reading.station_id;
            const createdAt = new Date(reading.createdAt);
            const timeKey = `${createdAt.toISOString().split('T')[0]}T${createdAt.getHours()}:${createdAt.getMinutes()}`;

            if (!groupedReadings[stationId]) {
                groupedReadings[stationId] = {};
                latestCreatedAtPerGroup[stationId] = {};
            }
            if (!groupedReadings[stationId][timeKey]) {
                groupedReadings[stationId][timeKey] = [];
                latestCreatedAtPerGroup[stationId][timeKey] = reading.createdAt;
            } else if (createdAt > new Date(latestCreatedAtPerGroup[stationId][timeKey])) {
                latestCreatedAtPerGroup[stationId][timeKey] = reading.createdAt;
            }
            groupedReadings[stationId][timeKey].push(reading.paramValue);
        });

        const filteredReadings = {};
        for (const [stationId, dateGroups] of Object.entries(groupedReadings)) {
            filteredReadings[stationId] = {};
            for (const [timeKey, values] of Object.entries(dateGroups)) {
                const processedValues = interpolateNegativeValues(values); // Interpolate negative values
                filteredReadings[stationId][timeKey] = await kalmanFilter(processedValues);
            }
        }

        return { filteredReadings, latestCreatedAtPerGroup };
    } catch (error) {
        console.error('Error filtering readings:', error);
        throw error;
    }
}

async function calculatePhMode() {
    try {
        const { filteredReadings, latestCreatedAtPerGroup } = await filterPhReadings();
        if (!filteredReadings) {
            throw new Error('Filtered readings are undefined or null');
        }

        const modePerStationAndDate = [];
        for (const stationId in filteredReadings) {
            for (const timeKey in filteredReadings[stationId]) {
                const readings = filteredReadings[stationId][timeKey];
                const latestCreatedAt = latestCreatedAtPerGroup[stationId][timeKey];
                const mode = calculateMode(readings);

                await ModeValues.updateOne({
                    station_id: stationId,
                    paramName: "pH",
                    createdAt: latestCreatedAt
                }, {
                    $set: { paramValue: mode }
                }, { upsert: true });

                modePerStationAndDate.push({
                    station_id: stationId,
                    date: timeKey,
                    mode: mode
                });
            }
        }
        return modePerStationAndDate;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to calculate pH mode');
    }
}

async function getModePH(req, res) {
    try {
        const modePerStationAndDate = await calculatePhMode();
        res.json(modePerStationAndDate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller for calculating WQI
const calculateWQIForStation = async (req, res) => {
    try {
        // Fetch latest mode data from MongoDB using your existing controller
        const latestModeData = await ModeValues.aggregate([
            { $sort: { station_id: 1, paramName: 1, createdAt: -1 } },
            {
                $group: {
                    _id: { station_id: "$station_id", paramName: "$paramName" },
                    latestRecord: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestRecord" }
            }
        ]);

        // Calculate WQI for each station
        const wqiResults = {};
        latestModeData.forEach((record) => {
            const { station_id, paramName, paramValue } = record;

            if (!wqiResults[station_id]) {
                wqiResults[station_id] = {};
            }

            // Assign parameter values to the station's WQI calculation
            switch (paramName) {
                case 'Temperature':
                    wqiResults[station_id].temperature = paramValue;
                    break;
                case 'Turbidity':
                    wqiResults[station_id].turbidity = paramValue;
                    break;
                case 'pH':
                    wqiResults[station_id].pH = paramValue;
                    break;
                default:
                    break;
            }
        });

        // Calculate WQI for each station with valid parameter values
        Object.keys(wqiResults).forEach((station_id) => {
            const { temperature, turbidity, pH } = wqiResults[station_id];

            if (temperature !== undefined && turbidity !== undefined && pH !== undefined) {
                const wqi = calculateWQI(temperature, turbidity, pH);
                wqiResults[station_id].wqi = wqi;
            }
        });

        // Send WQI results as JSON response
        res.json(wqiResults);
    } catch (error) {
        console.error('Error fetching and calculating WQI:', error);

        // Handle errors by sending an appropriate response
        if (res && res.status) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // If `res` object is not properly defined
            console.error('Response object is undefined or invalid.');
            // You might want to throw the error to stop execution or handle it accordingly
            throw error;
        }
    }
};

// Controller to get the latest mode data for each parameter
const getLatestModeDataForEachParameter = async (req, res) => {
    try {
        const latestModeData = await ModeValues.aggregate([
            { $sort: { station_id: 1, paramName: 1, createdAt: -1 } },
            {
                $group: {
                    _id: { station_id: "$station_id", paramName: "$paramName" },
                    latestRecord: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestRecord" }
            }
        ]);

        res.json(latestModeData);
    } catch (error) {
        console.error('Error fetching latest mode data:', error);
        console.log('Response object:', res); // Add this line for debugging
        throw new Error('Error fetching latest mode data: ' + error.message);
    }
};

// Function to calculate WQI
const calculateWQI = (temperatureMode, turbidityMode, pHMode) => {

    console.log('Input values:', { temperatureMode, turbidityMode, pHMode }); 

    if (isNaN(temperatureMode) || isNaN(turbidityMode) || isNaN(pHMode)) {
        throw new Error('Invalid input values for WQI calculation');
    }

    const temperatureWeight = 0.2;
    const turbidityWeight = 0.5;
    const pHWeight = 0.3;

    const normalizedTemperature = (temperatureMode - 5) / (25 - 5);
    const normalizedTurbidity = turbidityMode / 10;
    const normalizedPh = (pHMode - 7) / (8.5 - 7);

    const temperatureSubIndex = normalizedTemperature * temperatureWeight;
    const phSubIndex = normalizedPh * pHWeight;
    const turbiditySubIndex = normalizedTurbidity * turbidityWeight;

    const wqi = (temperatureSubIndex + phSubIndex + turbiditySubIndex) * 100;

    return wqi;
};

const wqiCalculationController = async (req, res) => {
    try {
        const WQIResult = await calculateWQIForStation();
        res.json(WQIResult);
    } catch (error) {
        console.error(error);
        res.json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getModeTemperature,
    getModeTurbidity,
    getModePH,
    getLatestModeDataForEachParameter,
    wqiCalculationController,
    calculateWQIForStation
};
