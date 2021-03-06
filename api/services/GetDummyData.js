const Mongoose = require('mongoose');
const Chance = require('chance');
const chance = new Chance();

exports.getDummyDataForPatients = () => {

    return {
        _id: new Mongoose.Types.ObjectId(),
        firstName: chance.first(),
        lastName: chance.last(),
        dateOfBirth: chance.birthday(),
        sex: chance.gender(),
        address: chance.address(),
        contact: chance.phone(),
        drugAllergy: chance.bool(),
        smoking: chance.bool(),
        coronaryHeartDisease: chance.bool(),
        heartArrhythmia: chance.bool(),
        heartFailure: chance.bool(),
        lungDisease: chance.bool(),
        asthma: chance.bool(),
        chronicKidneyDisease: chance.bool(),
        diabetes: chance.bool(),
        heartStroke: chance.bool(),
        malignantDisease: chance.bool(),
        chronicLiverDisease: chance.bool(),
        inflamatoryBowelDisease: chance.bool(),
        reuma: chance.bool(),
        hiv: chance.bool(),
        medications: [],
        operations: [],
    };
};

exports.getDummyDataForWarningScore = () => {
    return {
        _id: new Mongoose.Types.ObjectId(),
        years: chance.age(),
        numberOfRespirations: chance.natural({ min: 5, max: 30 }),
        oxygenSaturation: chance.natural({ min: 85, max: 100 }),
        anyAdditionalO2: chance.bool(),
        onRespirator: chance.bool(),
        systolicPressure: chance.natural({ min: 80, max: 230 }),
        heartRate: chance.natural({ min: 30, max: 150 }),
        stateOfConsciousness: chance.natural() % 2 === 0 ? 'Nothing' : 'Confused',
        bodyTemperature: chance.floating({ min: 33, max: 42 })
    }
};

exports.getDummyDataForPatientRelevantData = () => {
    return {
        _id: new Mongoose.Types.ObjectId(),
        travelToRiskCountriesInTheLast14Days: chance.bool() ? chance.country({ full: true }) : 'false',
        contactInTheLast14DaysWithAPersonWhoHasSymptoms: chance.bool(),
        haveYouBeenInContactWithPeopleWhoHaveTheCoronaVirusInTheLast14Days: chance.bool(),
        haveYouEverBeenToAHealthCareFacilityWhereTheDiseaseHasBeenDiagnosedWithANewCoronavirus: chance.bool(),
        didYouGoForAExaminationSomewhere: chance.bool(),
        symptoms: [],
        symptomsDuration: chance.integer({ min: 1, max: 5 }),
        highTemperature: chance.floating({ min: 30, max: 40 }),
        shaking: chance.bool(),
        lossOfAppetite: chance.bool(),
        exhaustion: chance.bool(),
        muscleAchesAndPains: chance.bool(),
        boneOrJointPain: chance.bool(),
        cough: chance.bool(),
        expectoration: chance.bool(),
        shortnessOfBreath: chance.bool(),
        choking: chance.bool(),
        fatigue: chance.bool(),
        chestPressure: chance.bool(),
        chestPain: chance.bool(),
        sneezing: chance.bool(),
        nasalCongestion: chance.bool(),
        secretionFromTheNose: chance.bool(),
        bleedingFromTheNose: chance.bool(),
        eyesPain: chance.bool(),
        redEyes: chance.bool(),
        throatProblems: chance.bool(),
        throatSecretion: chance.bool(),
        headache: chance.bool(),
        abdominalPain: chance.bool(),
        nausea: chance.bool(),
        vomit: chance.bool(),
        diarrhea: chance.bool(),
        backPain: chance.bool(),
        urinaryProblems: chance.bool(),
        rash: chance.bool(),
        enlargedLymphNodes: chance.bool(),
        neuroInterferences: chance.bool(),
        increasedBloodPressure: chance.bool(),
        positiveToCoronavirus: chance.bool(),
        curedOfCoronavirus: chance.bool()
    };
};