const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WQIPredictionsSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    stationId: {
        type: String,
        required: true
    },
    wqi: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('WQIPredictions', WQIPredictionsSchema);