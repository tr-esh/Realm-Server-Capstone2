const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deletedParameterSchema = new Schema({
    station_id: {
        type: String,
        required: true
    },
    tester_id: {
        type: String,
        required: true
    },
    paramName: {
        type: String,
        required: true
    },
    paramValue: {
        type: Number,
        required: true
    },
    deletionTimestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('DeletedParameterModel', deletedParameterSchema);
