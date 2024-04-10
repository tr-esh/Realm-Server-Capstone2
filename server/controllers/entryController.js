const TemperatureReading = require('../models/temperatureModel');
const TurbidityReading = require('../models/turbidityModel');
const PhReading = require('../models/phLevelModel');

//controller handles monthly data fetch
const getDataCountForAllStations = async (req, res) => {
    try {
        const { stationId, year } = req.params; // Assume year is passed as a URL parameter for simplicity

        // Use the provided year or default to the current year
        const targetYear = year ? parseInt(year, 10) : new Date().getFullYear();

        // Fetch monthly counts for each parameter, now with the year consideration
        const temperatureMonthlyCount = await getMonthlyCountForParameter(stationId, TemperatureReading, targetYear);
        const turbidityMonthlyCount = await getMonthlyCountForParameter(stationId, TurbidityReading, targetYear);
        const phMonthlyCount = await getMonthlyCountForParameter(stationId, PhReading, targetYear);

        // Combine and format the monthly counts
        const totalMonthlyCount = mergeMonthlyCounts(temperatureMonthlyCount, turbidityMonthlyCount, phMonthlyCount);

        // Return the constructed response
        res.status(200).json(totalMonthlyCount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Adjust the getMonthlyCountForParameter function to accept a year
const getMonthlyCountForParameter = async (stationId, model, year) => {
    try {
        // Use the provided year to set the date range for the query
        const monthlyCount = await model.aggregate([
            {
                $match: {
                    station_id: stationId,
                    createdAt: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31, 23, 59, 59, 999) },
                },
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
        ]);

        const formattedCount = {};
        monthlyCount.forEach((entry) => {
            const month = entry._id.month;
            formattedCount[month] = (formattedCount[month] || 0) + entry.count;
        });

        return formattedCount;
    } catch (error) {
        console.error('Error fetching monthly count for parameter:', error);
        throw error;
    }
};

const mergeMonthlyCounts = (...monthlyCounts) => {
    const totalMonthlyCount = {};

    monthlyCounts.forEach((counts) => {
        Object.keys(counts).forEach((month) => {
            totalMonthlyCount[month] = (totalMonthlyCount[month] || 0) + counts[month];
        });
    });

    return totalMonthlyCount;
}

const getMonthlyData = async (req, res) => {
    try {
        const { stationId } = req.params;

        // Fetch monthly data for each parameter
        const temperatureMonthlyData = await getMonthlyDataForParameter(stationId, TemperatureReading);
        const turbidityMonthlyData = await getMonthlyDataForParameter(stationId, TurbidityReading);
        const phMonthlyData = await getMonthlyDataForParameter(stationId, PhReading);

        // Combine and format the monthly data
        const totalMonthlyData = mergeMonthlyData(temperatureMonthlyData, turbidityMonthlyData, phMonthlyData);

        // Return the constructed response
        res.status(200).json(totalMonthlyData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMonthlyDataForParameter = async (stationId, model) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();

        // Fetch monthly data for the specified parameter
        const monthlyData = await model.find({
            station_id: stationId,
            createdAt: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31, 23, 59, 59, 999) },
        });

        // Format the monthly data
        const formattedData = monthlyData.map(entry => ({
            tester: entry.tester_id,  
            paramName: entry.paramName,  
            paramValue: entry.paramValue, 
            createdAt: entry.createdAt,
        }));

        return formattedData;
    } catch (error) {
        console.error('Error fetching monthly data for parameter:', error);
        throw error;
    }
}

const mergeMonthlyData = (...monthlyData) => {
    const totalMonthlyData = [];

    monthlyData.forEach(data => {
        totalMonthlyData.push(...data);
    });

    return totalMonthlyData;
}

module.exports = {
    getDataCountForAllStations,
    getMonthlyData
};
