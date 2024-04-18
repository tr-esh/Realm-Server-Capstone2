const mongoose = require('mongoose');

const Schema = mongoose.Schema

const wqiResultSchema = new Schema({
    stationId: {
        type: String,
        required: true
    },
    wqi: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('WqiResult', wqiResultSchema);
