const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    stationName: {
        type: String,
        required: true,
    },
    tester: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('UserData', userDataSchema);
