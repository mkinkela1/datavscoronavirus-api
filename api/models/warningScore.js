const mongoose = require('mongoose');

const warningScoreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    numberOfRespirations: { type: Number, required: true },
    oxygenSaturation: { type: Number, required: true },
    anyAdditionalO2: { type: Boolean, required: true },
    systolicPressure: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    stateOfConsciousness: { type: String, required: true },
    bodyTemperature: { type: mongoose.Decimal128, required: true },
    coughDegree: { type: Number, min: 1, max: 5, required: false }
});

module.exports = mongoose.model('WarningScore', warningScoreSchema);