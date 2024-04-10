const mongoose = require('mongoose');

const Schema = mongoose.Schema

const wqiSchema = new Schema({
  stationId: {
    type: String,
    required: true
  },
  date: {
      type: Date,
      required: true
  },
  wqi: {
      type: Number,
      required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('WQIValues', wqiSchema);