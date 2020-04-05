const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    sex: { type: String, required: true },
    address: { type: String, required: false },
    contact: { type: String, required: false },
    travelToRiskCountriesInTheLast14Days: { type: mongoose.Schema.Types.Mixed, default: false },
    contactInTheLast14DaysWithAPersonWhoHasSymptoms: { type: Boolean, default: false },
    haveYouBeenInContactWithPeopleWhoHaveTheCoronaVirusInTheLast14Days: { type: Boolean, default: false },
    haveYouEverBeenToAHealthCareFacilityWhereTheDiseaseHasBeenDiagnosedWithANewCoronavirus: { type: Boolean, default: false },
    didYouGoForAExaminationSomewhere: { type: Boolean, default: false },
    currentProblems: [String],
    problemsDuration: { type: Number, required: true },
    highTemperature: { type: mongoose.Schema.Types.Mixed, default: false },
    shaking: { type: Boolean, default: false },
    lossOfAppetite: { type: Boolean, default: false },
    exhaustion: { type: Boolean, default: false },
    muscleAchesAndPains: { type: Boolean, default: false },
    boneOrJointPain: { type: Boolean, default: false },
    cough: { type: Boolean, default: false },
    expectoration: { type: Boolean, default: false },
    shortnessOfBreath: { type: Boolean, default: false },
    choking: { type: Boolean, default: false },
    fatigue: { type: Boolean, default: false },
    chestPressure: { type: Boolean, default: false },
    chestPain: { type: Boolean, default: false },
    sneezing: { type: Boolean, default: false },
    nasalCongestion: { type: Boolean, default: false },
    secretionFromTheNose: { type: Boolean, default: false },
    bleedingFromTheNose: { type: Boolean, default: false },
    eyesPain: { type: Boolean, default: false },
    redEyes: { type: Boolean, default: false },
    throatProblems: { type: Boolean, default: false },
    throatSecretion: { type: Boolean, default: false },
    headache: { type: Boolean, default: false },
    abdominalPain: { type: Boolean, default: false },
    nausea: { type: Boolean, default: false },
    vomit: { type: Boolean, default: false },
    diarrhea: { type: Boolean, default: false },
    backPain: { type: Boolean, default: false },
    urinaryProblems: { type: Boolean, default: false },
    rash: { type: Boolean, default: false },
    enlargedLymphNodes: { type: Boolean, default: false },
    neuroInterferences: { type: Boolean, default: false },
    drugAllergy: { type: Boolean, default: false },
    smoking: { type: Boolean, default: false },
    increasedBloodPressure: { type: Boolean, default: false },
    coronaryHeartDisease: { type: Boolean, default: false },
    heartArrhythmia: { type: Boolean, default: false },
    heartFailure: { type: Boolean, default: false },
    lungDisease: { type: Boolean, default: false },
    asthma: { type: Boolean, default: false },
    chronicKidneyDisease: { type: Boolean, default: false },
    diabetes: { type: Boolean, default: false },
    heartStroke: { type: Boolean, default: false },
    malignantDisease: { type: Boolean, default: false },
    chronicLiverDisease: { type: Boolean, default: false },
    inflamatoryBowelDisease: { type: Boolean, default: false },
    reuma: { type: Boolean, default: false },
    hiv: { type: Boolean, default: false },
    medications: [String],
    operations: [String],
    warningScores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WarningScore'
    }]
});

module.exports = mongoose.model('Patient', patientSchema);