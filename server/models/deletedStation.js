const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deletedStationSchema = new Schema({
    stationName: { type: String, required: true, unique: true },
    tester: { type: String, required: true },
    siteLocation: { type: String, required: true },
    address: { type: String, required: true },
    stationImage: {
        url: String,
        publicId: String,
    },
    deletionTimestamp: { type: Date, default: Date.now, expires: 2592000 }
}, { timestamps: true });


module.exports = mongoose.model('DeletedStation', deletedStationSchema);
