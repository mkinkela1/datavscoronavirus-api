const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    assignedDoctor: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    sex: { type: String, required: true },
    address: { type: String, required: false },
    contact: { type: String, required: false },
    patientRelevantData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientRelevantData'
    }],
    drugAllergy: { type: Boolean, default: null },
    smoking: { type: Boolean, default: null },
    coronaryHeartDisease: { type: Boolean, default: null },
    heartArrhythmia: { type: Boolean, default: null },
    heartFailure: { type: Boolean, default: null },
    lungDisease: { type: Boolean, default: null },
    asthma: { type: Boolean, default: null },
    chronicKidneyDisease: { type: Boolean, default: null },
    diabetes: { type: Boolean, default: null },
    heartStroke: { type: Boolean, default: null },
    malignantDisease: { type: Boolean, default: null },
    chronicLiverDisease: { type: Boolean, default: null },
    inflamatoryBowelDisease: { type: Boolean, default: null },
    reuma: { type: Boolean, default: null },
    hiv: { type: Boolean, default: null },
    medications: [String],
    operations: [String],
    warningScores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WarningScore'
    }]
});

module.exports = mongoose.model('Patient', patientSchema);