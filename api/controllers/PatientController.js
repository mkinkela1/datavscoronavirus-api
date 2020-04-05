const Patient = require('../models/patient');
const WarningScore = require('../models/warningScore');
const Mongoose = require('mongoose');

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