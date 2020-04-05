const Patient = require('../models/patient');
const WarningScore = require('../models/warningScore');
const Mongoose = require('mongoose');
const jsonExport = require('jsonexport');
const fs = require('fs');
const DummyData = require('../services/GetDummyData');
const CalculateScore = require('../services/CalculateScore');

/**
 * Create patient
 *
 * @param req
 * @param res
 * @param next
 */
exports.createPatient = (req, res, next) => {

    let { body } = req;

    body = { ...body, _id: new Mongoose.Types.ObjectId()};

    const patient = new Patient(body);

    patient
        .save()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Get patient data
 *
 * @param req
 * @param res
 * @param next
 */
exports.getPatientData = (req, res, next) => {

    const { patientId } = req.params;

    Patient
        .findOne({ _id: patientId })
        .exec()
        .then(patient => {

            const { warningScores } = patient;

            WarningScore
                .find({ _id: { $in: warningScores } })
                .then(warnings => {

                    patient.warningScores = warnings;

                    res.status(200).json(patient);
                })
                .catch(e => res.status(500).json(e));
        })
        .catch(e => res.status(500).json(e));
};

/**
 * Delete patient
 *
 * @param req
 * @param res
 * @param next
 */
exports.deletePatient = (req, res, next) => {

    const { patientId } = req.params;

    Patient
        .findOneAndDelete({ _id: patientId })
        .exec()
        .then(() => res.status(204))
        .catch(e => res.status(500).json(e));
};

/**
 * Edit patient
 *
 * @param req
 * @param res
 * @param next
 */
exports.editPatient = (req, res, next) => {

    const { patientId } = req.params;
    const { body } = req;

    Patient
        .findOneAndUpdate(
            { _id: patientId },
            body,
            { returnOriginal: false, new: true, upsert: true }
        )
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Get data of all patients
 *
 * @param req
 * @param res
 * @param next
 */
exports.getAllPatients = (req, res, next) => {

    Patient
        .find({})
        .populate('warningScores')
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Export patients data in csv
 *
 * @param req
 * @param res
 * @param next
 */
exports.exportPatientsInCsv = (req, res, next) => {

    Patient
        .find({})
        .populate('warningScores')
        .exec()
        .then(patients => {

            let patientsData = [];

            for(let patient of patients) {
                for(const warningScore of patient['warningScores']) {

                    let filteredPatient = {};
                    let filteredWarningScores = {};

                    for(const [key, value] of Object.entries(patient.toJSON()))
                        if(key !== 'warningScores' && key !== '_id')
                            filteredPatient[key] = value;

                    for(const [key, value] of Object.entries(warningScore.toJSON()))
                        if(key !== '_id')
                            filteredWarningScores[key] = value;

                    patientsData = [...patientsData, {
                        ...filteredPatient,
                        ...filteredWarningScores
                    }];
                }
            }

            jsonExport(patientsData, (err, csv) => {

                if(err) res.status(500).json(err);

                const fileName = `${__dirname}/../../exports/${Date.now()}_export.csv`;
                fs.writeFile(fileName, csv, (e) => {

                    if(e) res.status(500).json(e);

                    res.download(fileName);
                });
            });

        })
        .catch(e => res.status(500).json(e));
};

/**
 * Create dummy patients
 *
 * @param req
 * @param res
 * @param next
 */
exports.createDummyPatients = (req, res, next) => {

    for(let users = 0; users < 5; users++) {

        const patient = new Patient(DummyData.getDummyDataForPatients());

        patient
            .save()
            .then(r => {

                for(let warnings = 0; warnings < 50; warnings += 1) {
                    let body = DummyData.getDummyDataForWarningScore();
                    const score = CalculateScore(body);

                    body = {
                        _id: new Mongoose.Types.ObjectId(),
                        score,
                        ...body
                    };

                    const warningScore = new WarningScore(body);

                    warningScore.save(error => {

                        if(error) throw error;

                        Patient
                            .findOneAndUpdate(
                                {_id: r._id},
                                {$push: {warningScores: warningScore}},
                                {returnOriginal: false, new: true, upsert: true}
                            )
                            .populate('WarningScore')
                            .exec();

                    })
                }
            })
    }
};