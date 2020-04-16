const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    address: { type: String, required: true },
    numberOfBeds: { type: Number, required: false }
});

module.exports = mongoose.model('Hospital', hospitalSchema);