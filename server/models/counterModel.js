const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterModelSchema = new Schema({
    name: { type: String, required: true, unique: true },
    value: { type: Number, default: 0 },
});

module.exports = mongoose.model('counter', counterModelSchema);
