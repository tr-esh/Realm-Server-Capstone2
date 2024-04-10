const PendingStation = require('../models/pendingStation');

// Controller function to get all documents and count of total documents
const getAllDocuments = async (req, res) => {
    try {
        // Get all documents
        const allDocuments = await PendingStation.find().lean();

        // Get the total count of documents in the collection
        const totalCount = await PendingStation.countDocuments();

        // Respond with all documents and the total count
        res.status(200).json({ allDocuments, totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAllDocuments };
