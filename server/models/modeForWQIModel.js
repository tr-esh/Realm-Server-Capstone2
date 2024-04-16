const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ModeValuesWQISchema = new Schema({
    station_id: {
        type: String,
        required: true,
    },
    paramName: {
        type: String,
        required: true,
    },
    paramValue: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('modeWQI_value', ModeValuesWQISchema)