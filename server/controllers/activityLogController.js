const ActivityLog = require('../models/activityLogModel');
const StationLog = require('../models/stationLogModel');
const Station = require('../models/stationModel');
const WaterTemperature = require('../models/temperatureModel');
const WaterTurbidity = require('../models/turbidityModel');
const WaterPHLevel = require('../models/phLevelModel');

const handleActivityLog = async (req, res) => {
    try {
        // Fetch all stations from Station model
        const stations = await Station.find();

        // Fetch existing activity log entries for comparison
        const existingActivityLogs = await ActivityLog.find({}, 'stationName dateAdded');

        // Create activity log entries based on station data, avoiding duplicates
        const activityLogs = stations.reduce((result, station) => {
            const existingEntry = existingActivityLogs.find(
                entry =>
                    entry.stationName === station.stationName &&
                    entry.dateAdded.getTime() === station.createdAt.getTime()
            );

            if (!existingEntry) {
                result.push({
                    stationName: station.stationName,
                    tester: station.tester,
                    dateAdded: station.createdAt, 
                    status: 'Added', 
                });
            }

            return result;
        }, []);

        // Save the non-duplicate activity log entries to the database
        if (activityLogs.length > 0) {
            await ActivityLog.insertMany(activityLogs);
        }

        // Fetch and return the activity log entries
        const fetchedActivityLogs = await ActivityLog.find().sort({ dateAdded: -1 });

        // Respond with the fetched activity logs
        res.status(200).json(fetchedActivityLogs);
    } catch (error) {
        console.error('Error handling activity log:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleStationActivityLog = async (req, res) => {
      try {
        const temperatureReadings = await WaterTemperature.find().lean();
        const turbidityReadings = await WaterTurbidity.find().lean();
        const pHReadings = await WaterPHLevel.find().lean();

        const allReadings = [...temperatureReadings, ...turbidityReadings, ...pHReadings];

        const stationDataMap = {};
        allReadings.forEach(reading => {
            const stationId = reading.station_id;
            if (!stationDataMap[stationId]) {
                stationDataMap[stationId] = [];
            }
            stationDataMap[stationId].push(reading);
        });

        for (const stationId in stationDataMap) {
            const stationReadings = stationDataMap[stationId];
            
            const uniqueReadings = {};
            stationReadings.forEach(reading => {
                const datePart = new Date(reading.createdAt).toDateString();
                if (!uniqueReadings[datePart]) {
                    uniqueReadings[datePart] = reading;
                }
            });

            const today = new Date();
            for (const datePart in uniqueReadings) {
                const readingDate = new Date(uniqueReadings[datePart].createdAt);
                const daysDifference = Math.floor((today - readingDate) / (1000 * 60 * 60 * 24));
                const status = daysDifference > 3 ? 'Monitored' : 'Recently Monitored';
            
                const existingLog = await StationLog.findOne({
                    stationName: stationId,
                    dateAdded: readingDate
                });
            
                if (existingLog) {
                    // Update only the status field without affecting dateAdded
                    await StationLog.findOneAndUpdate(
                        { _id: existingLog._id },
                        { $set: { status: status } }
                    );
                } else {
                    // If the log doesn't exist, create a new one
                    const stationLog = new StationLog({
                        stationName: stationId,
                        tester: uniqueReadings[datePart].tester_id,
                        dateAdded: readingDate,
                        status: status
                    });
                    await stationLog.save();
                }
            }
        }

        const fetchedActivityLogs = await StationLog.find().sort({ dateAdded: -1 });
        res.status(200).json(fetchedActivityLogs);
    } catch (error) {
        console.error('Error processing station data:', error);
        res.status(500).send('Error processing station data: ' + error.message);
    }
};

// Function to get all activity logs of selected station
const getActivityLogs = async (req, res) => {
    const { stationName } = req.params; 

    try {
        // Query the database for logs with the specified stationName
        const logs = await ActivityLog.find({ stationName })
            .select('tester dateAdded status'); 

        if (logs.length === 0) {
            return res.status(404).json({ message: 'No logs found for the specified stationName' });
        }

        // Send the response with the logs
        res.status(200).json({ logs });
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };


// Function to get all activity logs of selected station
const getStationLogs = async (req, res) => {
    const { stationName } = req.params; 

    try {
        // Query the database for logs with the specified stationName
        const logs = await StationLog.find({ stationName })
            .select('tester dateAdded status'); 

        if (logs.length === 0) {
            return res.status(404).json({ message: 'No logs found for the specified stationName' });
        }

        // Send the response with the logs
        res.status(200).json({ logs });
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };


module.exports = { handleActivityLog,
                   handleStationActivityLog,
                   getActivityLogs,
                   getStationLogs };
