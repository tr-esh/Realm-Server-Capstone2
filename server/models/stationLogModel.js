const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationLogSchema = new Schema({
    stationName: { 
        type: String, 
        required: true,
     },  
    tester: { 
        type: String, 
        required: true
     },
    dateAdded: { 
        type: Date, 
        required: true 
    },
    status: {
        type: String, 
        required: true,
    },
});

module.exports = mongoose.model('StationLog', stationLogSchema);
