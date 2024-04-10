const PendingStation = require('../models/pendingStation');
const Station = require('../models/stationModel');

// Function to approve a pending station request
const approveStationRequest = async (req, res) => {
    try {
        const { stationId } = req.params; 

        // Find the pending station request by ID
        const pendingStation = await PendingStation.findById(stationId);

        // If the pending station request is not found, return an error
        if (!pendingStation) {
            return res.status(404).json({ error: 'Pending station request not found' });
        }

        // Create a new station document using the details from the pending request
        const { stationName, tester, siteLocation, address, stationImage } = pendingStation;
        const station = new Station({
            stationName,
            tester,
            siteLocation,
            address,
            stationImage,
        });

        // Save the new station document to the main collection
        await station.save();

        // Delete the pending station request from the pending collection
        await pendingStation.remove();

        // Respond with success message
        res.status(200).json({ message: 'Station request approved and added to main collection' });

    } catch (error) {
        console.error('Error approving station request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to delete a pending station request
const deletePendingStationRequest = async (req, res) => {
    try {
        const { stationId } = req.params;

        // Find the pending station request by ID
        const pendingStation = await PendingStation.findById(stationId);

        // If the pending station request is not found, return an error
        if (!pendingStation) {
            return res.status(404).json({ error: 'Pending station request not found' });
        }

        // Delete the pending station request from the pending collection
        await pendingStation.remove();

        // Respond with success message
        res.status(200).json({ message: 'Request denied successfully' });

    } catch (error) {
        console.error('Error deleting pending station request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { approveStationRequest, deletePendingStationRequest };
