const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationModelSchema = new Schema({
    stationName: { type: String, required: true, unique: true },  // Add a field for stationName
    tester: { type: String, required: true },
    siteLocation: { type: String, required: true },
    address: { type: String, required: true },
    stationImage: {
        url: String,
        publicId: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('station', stationModelSchema);
