const mongoose = require('mongoose')


const Schema = mongoose.Schema

const turbidityReadingSchema = new Schema({
    station_id: {
        type: String, 
        required: true,
    },
    tester_id: {
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
}, { timestamps: true });


module.exports = mongoose.model('water_turbidity', turbidityReadingSchema)