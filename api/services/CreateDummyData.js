const Mongoose = require('mongoose');

const Patient = require('../models/patient');
const WarningScore = require('../models/warningScore');
const PatientRelevantData = require('../models/patientRelevantData');
const DummyData = require('./GetDummyData');
const CalculateScore = require('./CalculateScore');

require('dotenv').config();
const mongoDbString = process.env.DATABASE_URL;

Mongoose.connect(
    mongoDbString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

exports.createDummyPatients = () => {

    for(let users = 0; users < 5; users++) {

        const patient = new Patient(DummyData.getDummyDataForPatients());

        for(let warnings = 0; warnings < 50; warnings++) {
            let body = DummyData.getDummyDataForWarningScore();
            const score = CalculateScore(body);

            body = {
                score,
                ...body
            };

            const warningScore = new WarningScore(body);
            warningScore.save()
            patient.warningScores.push(body._id);
        }

        for(let patientRelevantData = 0; patientRelevantData < 50; patientRelevantData++) {

            let body = DummyData.getDummyDataForPatientRelevantData();

            const patientRelevantData = new PatientRelevantData(body);
            patientRelevantData.save();
            patient.patientRelevantData.push(body._id);
        }

        patient.save();
    }
};

require('make-runnable');