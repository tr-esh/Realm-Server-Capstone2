const Station = require('../models/stationModel');
const Counter = require('../models/counterModel');
const PendingStation = require('../models/pendingStation');
const cloudinary = require('cloudinary').v2;

const stationController = async (req, res) => {
    try {
        const { tester, siteLocation, address } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        if (!imageBuffer) {
            console.error('Error: No image provided');
            res.status(400).json({ error: 'Bad Request - No image provided' });
            return;
        }

        // Find the current value of the counter
        let lastStationNumber = 0;

        // Fetch both PendingStations and Stations
        const pendingStations = await PendingStation.find({}, {}, { sort: { 'stationName': 1 } });
        const stations = await Station.find({}, {}, { sort: { 'stationName': 1 } });

        // Extract station numbers from both collections
        const pendingStationNumbers = pendingStations.map(station => {
            const [, stationNumberStr] = station.stationName.split('HO');
            return parseInt(stationNumberStr);
        });

        const stationNumbers = stations.map(station => {
            const [, stationNumberStr] = station.stationName.split('HO');
            return parseInt(stationNumberStr);
        });

        const allStationNumbers = [...pendingStationNumbers, ...stationNumbers].sort((a, b) => a - b);

        // Find the smallest missing number
        for (let i = 1; i <= allStationNumbers.length; i++) {
            if (!allStationNumbers.includes(i)) {
                lastStationNumber = i;
                break;
            }
        }

        // If no missing number found, use the next number after the last station
        if (lastStationNumber === 0) {
            lastStationNumber = allStationNumbers[allStationNumbers.length - 1] + 1;
        }

        // Create station name
        const stationName = `Station HO${lastStationNumber}`;

        const { value: counterValue } = await Counter.findOneAndUpdate(
            { name: 'stationCounter' },
            { $set: { value: lastStationNumber } },
            { new: true, upsert: true }
        );

        // Upload image to Cloudinary
        cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            folder: 'station_image',
        }, async (error, result) => {
            if (error) {
                console.error('Error uploading to Cloudinary:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            // Create station document with Cloudinary URL or public ID and the generated stationName
            const pendingStation = new PendingStation({
                stationName,
                tester,
                siteLocation,
                address,
                stationImage: {
                    url: result.secure_url,
                    publicId: result.public_id,
                },
            });

            // Save station document to MongoDB
            await pendingStation.save();
            // Respond with success message
            res.status(201).json({ message: 'Station creation request sent for approval' });

        }).end(imageBuffer);

    } catch (error) {
        console.error('Error creating station:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = stationController;