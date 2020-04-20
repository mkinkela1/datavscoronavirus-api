const Patient = require('../models/patient');
const Mongoose = require('mongoose');
const jsonExport = require('jsonexport');
const fs = require('fs');

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
        .then(r => res.status(201).json(r))
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
        .populate('warningScores')
        .populate('patientRelevantData')
        .exec()
        .then(r => res.status(200).json(r))
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
        .then(() => res.status(204).json())
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
        .populate('patientRelevantData')
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * TODO: refactor
 *
 * Export patients data in csv
 *
 * @param req
 * @param res
 * @param next
 */
exports.exportPatientsInCsv = (req, res, next) => {

    Patient
        .find({})
        .populate('warningScores', '-__v')
        .populate('patientRelevantData', '-__v')
        .select('-__v')
        .exec()
        .then(patients => {

            let patientsData = [];

            for(let patient of patients) {

                let filteredPatient = {};

                for(const [key, value] of Object.entries(patient.toJSON()))
                    if(!['firstName', 'lastName', 'address', 'contact'].includes(key))
                        filteredPatient[key] = value;

                filteredPatient['_id'] = patient._id.toString();

                filteredPatient.warningScores = patient.warningScores.map(warningScore => { return { ...warningScore.toJSON(), _id: warningScore._id.toString() }});
                filteredPatient.patientRelevantData = patient.patientRelevantData.map(patientRelevantData => { return { ...patientRelevantData.toJSON(), _id: patientRelevantData._id.toString() }});

                patientsData = [...patientsData, filteredPatient];
            }

            jsonExport(patientsData, (err, csv) => {

                if(err) res.status(500).json(err);

                const fileName = `${__dirname}/../../exports/export.csv`;
                fs.writeFile(fileName, csv, (e) => {

                    if(e) res.status(500).json(e);

                    res.download(fileName);
                });
            });

        })
        .catch(e => res.status(500).json(e));
};