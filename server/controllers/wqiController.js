const ModeValues = require('../models/modeValuesModel');
const WQIResult = require('../models/wqiModel');
const cron = require('node-cron');

const calculateWQI = (temperatureMode, turbidityMode, pHMode) => {
    // Check if any of the input values are not valid numbers
    if (isNaN(temperatureMode) || isNaN(turbidityMode) || isNaN(pHMode)) {
        throw new Error('Invalid input values for WQI calculation');
    }

    // Define weights for each parameter (adjust these based on your requirements)
    const temperatureWeight = 0.2;
    const turbidityWeight = 0.5;
    const pHWeight = 0.3;

    // Assume temperatureMode, turbidityMode, and pHMode are in the range of 0-100
    const normalizedTemperature = (temperatureMode - 5) / (25 - 5);
    const normalizedTurbidity = turbidityMode / 10;
    const normalizedPh = (pHMode - 7) / (8.5 - 7);

    const temperatureSubIndex = normalizedTemperature * temperatureWeight;
    const phSubIndex = normalizedPh * pHWeight;
    const turbiditySubIndex = normalizedTurbidity * turbidityWeight;

    // Normalize the result to a 0-100 scale (adjust as needed)
    const wqi = (temperatureSubIndex + phSubIndex + turbiditySubIndex) * 100;

    return wqi;
};

const calculateWQIForAllGroups = async () => {
    try {
        const modeData = await ModeValues.find().sort({ station_id: 1, createdAt: 1 });
        const result = {};

        for (const modeValue of modeData) {
            const { station_id, paramName, paramValue, createdAt } = modeValue;

            // Extract date from createdAt
            const date = createdAt.toISOString().slice(0, 10);

            // Initialize result structure
            if (!result[station_id]) {
                result[station_id] = {};
            }
            if (!result[station_id][date]) {
                result[station_id][date] = [];
            }

            // Add parameter to respective group
            result[station_id][date].push({ paramName, paramValue, createdAt });
        }

        const wqiResult = {};

        for (const stationId in result) {
            wqiResult[stationId] = {};
            for (const date in result[stationId]) {
                const group = result[stationId][date];
                const temperatureMode = group.find(item => item.paramName.toLowerCase() === 'temperature');
                const turbidityMode = group.find(item => item.paramName.toLowerCase() === 'turbidity');
                const pHMode = group.find(item => item.paramName.toLowerCase() === 'ph');

                if (temperatureMode && turbidityMode && pHMode) {
                    const wqi = calculateWQI(temperatureMode.paramValue, turbidityMode.paramValue, pHMode.paramValue);
                    const status = determineStatus(wqi);

                    // Check if data already exists for this stationId and createdAt
                    const existingData = await checkExistingData(stationId, date);

                    if (!existingData) {
                        wqiResult[stationId][date] = { wqi, status };

                        // Save the WQI result to the database
                        await saveWQIResultToDatabase(stationId, date, wqi, status);
                    } else {
                        // Return existing data
                        wqiResult[stationId][date] = existingData;
                    }
                }
            }
        }

        return wqiResult;
    } catch (error) {
        throw new Error('Error fetching mode data: ' + error.message);
    }
};

const determineStatus = (wqi) => {
    if (wqi >= 0 && wqi <= 25) {
        return 'Excellent';
    } else if (wqi > 25 && wqi <= 50) {
        return 'Good';
    } else if (wqi > 50 && wqi <= 75) {
        return 'Fair';
    } else if (wqi > 75 && wqi <= 100) {
        return 'Poor';
    } else if (wqi > 100 && wqi <= 150) {
        return 'Very Poor';
    } else {
        // Handle any other cases here
        return 'Unknown';
    }
};

const checkExistingData = async (stationId, date) => {
    // Implement logic to check if data already exists for the given stationId and date
    const existingData = await WQIResult.findOne({ stationId, date});
    return existingData;

};

const saveWQIResultToDatabase = async (stationId, date, wqi, status) => {
    try {

        // Create a new instance of the WQIResult model
        const wqiResult = new WQIResult({
            stationId,
            date,
            wqi, 
            status
        });

        // Save the WQI result to the database
        await wqiResult.save();
    } catch (error) {
        throw new Error('Error saving WQI result to database: ' + error.message);
    }
};

const calculateWQIController = async (req, res) => {
    try {
        const wqiResult = await calculateWQIForAllGroups();
        res.json(wqiResult);
    } catch (error) {
        console.error(error);
        res.json({ message: 'Internal Server Error' });
    }
};

const scheduledCalculationWQI = () => {
    return new Promise((resolve, reject) => {
        cron.schedule('0 0 * * *', () => {
            console.log('Cron job triggered!');
            calculateWQIController();
            resolve(); // Resolve the promise when the job is done
        });
    });
}

const identifyStationWithMostLowWQI = async () => {
    try {
        const allWQIValues = await WQIResult.find().sort({ stationId: 1, date: 1 });

        let stationWQIValues = {}; // Object to store WQI values for each station

        // Iterate through all WQI values
        allWQIValues.forEach(wqiValue => {
            const { stationId, wqi } = wqiValue;
            if (!stationWQIValues[stationId]) {
                stationWQIValues[stationId] = [];
            }
            stationWQIValues[stationId].push(wqi);
        });

        // Find the station with the maximum count of low WQI values
        let maxLowWQIStation = null;
        let maxLowWQICount = 0;

        for (const stationId in stationWQIValues) {
            const lowWQICount = stationWQIValues[stationId].filter(wqi => wqi <= 25).length;
            if (lowWQICount > maxLowWQICount) {
                maxLowWQIStation = stationId;
                maxLowWQICount = lowWQICount;
            }
        }

        // Return the WQI values of the identified station
        const wqiValuesOfIdentifiedStation = stationWQIValues[maxLowWQIStation];

        return { maxLowWQIStation, wqiValuesOfIdentifiedStation };
    } catch (error) {
        throw new Error('Error identifying station with most low WQI: ' + error.message);
    }
};


const identifyStationController = async (req, res) => {
    try {
        const { maxLowWQIStation, wqiValuesOfIdentifiedStation } = await identifyStationWithMostLowWQI();
        res.json({ maxLowWQIStation, wqiValuesOfIdentifiedStation });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Internal Server Error' });
    }
};

const getAllWQIPoorValues = async (req, res) => {
    try {
        // Calculate date three days ago from the current date
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        // Query documents where date is greater than or equal to three days ago and wqi is greater than 51
        const latestWQIValuesAbove51 = await WQIResult.find({ 
            date: { $gte: threeDaysAgo },
            wqi: { $gte: 51 }
        }).sort({ date: -1 }).limit(1).lean();

        // Respond with the latest filtered document
        res.status(200).json({ latestWQIValuesAbove51 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { 
    calculateWQIController, 
    scheduledCalculationWQI,
    identifyStationController,
    getAllWQIPoorValues
};

