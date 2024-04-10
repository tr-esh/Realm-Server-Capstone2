const TemperatureReading = require('../models/temperatureModel');
const TurbidityReading = require('../models/turbidityModel');
const PhReading = require('../models/phLevelModel');

const getDataForAllParameters = async (req, res) => {
    try {
        const { stationId } = req.params;

        // Fetch data for each parameter
        const temperatureData = await getDataForParameter(stationId, TemperatureReading, 'temperature');
        const turbidityData = await getDataForParameter(stationId, TurbidityReading, 'turbidity');
        const phData = await getDataForParameter(stationId, PhReading, 'pH');

        // Combine and format the data
        const combinedData = mergeData(temperatureData, turbidityData, phData);

        // Return the constructed response
        res.status(200).json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getDataForParameter = async (stationId, model, parameterName) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();

        // Fetch data for the specified parameter and month
        const parameterData = await model.find({
            station_id: stationId,
            createdAt: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31, 23, 59, 59, 999) },
        }).select('tester_id paramValue createdAt').sort({ createdAt: 1 });

        // Group consecutive readings with the same tester
        const groupedData = groupConsecutiveReadings(parameterData);

        // Transform groups into the expected result format
        const transformedData = groupedData.map((group) => {
            const firstReading = group[0];
            return {
                tester: firstReading.tester_id, // Adjust according to the actual field name for tester_id
                temperature: parameterName === 'temperature' ? firstReading.paramValue : null,
                turbidity: parameterName === 'turbidity' ? firstReading.paramValue : null,
                pH: parameterName === 'pH' ? firstReading.paramValue : null,
                date: new Date(firstReading.createdAt),
            };
        });

        return transformedData;
    } catch (error) {
        console.error(`Error fetching data for ${parameterName}:`, error);
        throw error;
    }
};

const groupConsecutiveReadings = (parameterData) => {
    const groupedData = [];

    parameterData.reduce((prev, current) => {
        if (
            prev &&
            prev.tester_id === current.tester_id &&
            Math.abs(new Date(prev.createdAt) - new Date(current.createdAt)) < 60000 // Within 1 minute of each other
        ) {
            groupedData[groupedData.length - 1].push(current);
        } else {
            groupedData.push([current]);
        }

        return current;
    }, null);

    return groupedData;
};

const mergeData = (...parameterData) => {
    const combinedData = [];

    parameterData.forEach((data) => {
        combinedData.push(...data);
    });

    return combinedData;
};

module.exports = {
    getDataForAllParameters,
};
