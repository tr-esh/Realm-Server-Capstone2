const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingStationSchema = new Schema({
    stationName: { type: String, required: true, unique: true },
    tester: { type: String, required: true },
    siteLocation: { type: String, required: true },
    address: { type: String, required: true },
    stationImage: {
        url: String,
        publicId: String,
    },
}, { timestamps: true });


module.exports = mongoose.model('PendingStation', pendingStationSchema);
