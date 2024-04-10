const KalmanFilter = require('./KalmanFilterClass'); 
const WQIValues = require('../models/wqiModel');
const WQIPredictions = require('../models/predictedWQIModel'); 

// Function to initialize Kalman Filters for each station
function initializeKalmanFilters(stationsData) {
    const kalmanFilters = {};
    // Initialize a Kalman Filter for each station with arbitrary example parameters
    stationsData.forEach(station => {
        const stationId = station.stationId;
        const data = station.data;
        kalmanFilters[stationId] = new KalmanFilter({
            initialEstimate: 50, // Starting guess
            initialErrorCovariance: 1,
            processNoise: 1,
            measurementNoise: 4
        });
    });
    return kalmanFilters;
}

// Function to fetch WQI data from the database
async function fetchWQIData(req, res) {
    try {
        const stations = await WQIValues.find(); 
        const dataMap = new Map();
        for (const station of stations) {
            const stationData = await WQIValues.find({ stationId: station.stationId });
            const formattedData = stationData.map(record => ({
                _id: record._id,
                date: record.date,
                wqi: record.wqi
            }));
            if (dataMap.has(station.stationId)) {
                // Merge data if station already exists
                const existingData = dataMap.get(station.stationId);
                existingData.data.push(...formattedData);
            } else {
                // Add new station data
                dataMap.set(station.stationId, { stationId: station.stationId, data: formattedData });
            }
        }
        const data = Array.from(dataMap.values());
        console.log("Fetched data:");
        data.forEach(station => {
            console.log("Station:", station.stationId);
            console.log("Data:");
            station.data.forEach(record => {
                console.log(record);
            });
        });
        res.status(200).json(data); // Sending data as JSON response
    } catch (error) {
        console.error('Error fetching WQI data:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Sending error response
    }
}

// Function to save predicted WQI values to the database
async function savePredictedWQIToDatabase(predictedWQI) {
    try {
        for (const date in predictedWQI) {
            const predictionsForDate = predictedWQI[date];
            for (const stationId in predictionsForDate) {
                const prediction = predictionsForDate[stationId];
                // Check if there's existing data for the same date and station
                const existingPrediction = await WQIPredictions.findOne({ date, stationId });
                if (existingPrediction) {
                    // Update existing prediction
                    await WQIPredictions.updateOne({ date, stationId }, { $set: { wqi: prediction } });
                } else {
                    // Insert new prediction
                    await WQIPredictions.create({ date, stationId, wqi: prediction });
                }
            }
        }
        console.log('Predicted WQI saved to database successfully.');
    } catch (error) {
        console.error('Error saving predicted WQI to database:', error);
    }
}

// Function to predict WQI values for each station for the next three days (excluding the current date)
async function predictWQI(req, res) {
    try {
        // Fetch WQI data from the database using req
        const stationsData = await fetchWQIData(req);

        // Initialize Kalman Filters for each station
        const kalmanFilters = initializeKalmanFilters(stationsData);

        const currentDate = new Date(); // Current date
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(tomorrowDate.getDate() + 1); // Tomorrow's date

        const predictedWQI = {};

        // Loop over the next three days (excluding the current date)
        for (let i = 0; i < 7; i++) {
            const currentDateStr = tomorrowDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
            predictedWQI[currentDateStr] = {};

            // Iterate over available stations
            Object.keys(kalmanFilters).forEach(stationId => {
                predictedWQI[currentDateStr][stationId] = {};
                const kf = kalmanFilters[stationId];
                if (kf) {
                    // Aggregate WQI values for the station
                    const wqiValues = stationsData.find(station => station.stationId === stationId).data.map(record => record.wqi);
                    const aggregatedWQI = wqiValues.reduce((total, value) => total + value, 0) / wqiValues.length;
                    // Update Kalman filter with aggregated WQI value
                    kf.update(aggregatedWQI);
                    // Predict WQI for the station
                    predictedWQI[currentDateStr][stationId] = kf.estimate;
                } else {
                    console.error(`Kalman filter not found for station ${stationId}`);
                }
            });

            // Move to the next day
            tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        }

        // Log the predicted WQI values
        console.log("Predicted WQI:", predictedWQI);

        // Save predicted WQI to the database
        await savePredictedWQIToDatabase(predictedWQI);

        // Send the predicted WQI as a response
        res.status(200).json(predictedWQI);
    } catch (error) {
        console.error('Error predicting WQI:', error);
        // Send an error response
        res.status(500).json({ error: 'Error predicting WQI' });
    }
}

const getWQIPredictions = async (req, res) => {
    try {
        const { stationId } = req.params;

        // Check if stationId is provided
        if (!stationId) {
            return res.status(400).json({ error: 'Station ID is required' });
        }

        // Aggregate data by stationId
        const aggregatedData = await WQIPredictions.aggregate([
            {
                $match: { stationId: stationId }
            },
            {
                $group: {
                    _id: "$stationId",
                    data: { $push: { date: "$date", wqi: "$wqi" } }
                }
            }
        ]);

        // If no data found for the provided stationId
        if (aggregatedData.length === 0) {
            return res.status(404).json({ error: 'No data found for the provided stationId' });
        }

        // Format the aggregated data
        const formattedData = aggregatedData.map(item => ({
            stationId: item._id,
            data: item.data
        }));

        // Send the formatted data as a JSON response
        res.json(formattedData);
    } catch (error) {
        // Handle any errors that occur during the aggregation process
        console.error('Error aggregating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { predictWQI, getWQIPredictions, fetchWQIData }