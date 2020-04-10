const PatientRelevantData = require('../models/patientRelevantData');
const Patient = require('../models/patient');
const Mongoose = require('mongoose');

/**
 * Create patient's relevant data
 *
 * @param req
 * @param res
 * @param next
 */
exports.createPatientRelevantData = (req, res, next) => {

    const { patientId } = req.params;
    let { body } = req;

    body = {
        _id: new Mongoose.Types.ObjectId(),
        ...body
    };

    const relevantData = new PatientRelevantData(body);

    relevantData.save(e => {

        if(e) res.status(500).json(e);

        Patient
            .findOneAndUpdate(
                { _id: patientId },
                { $push: { patientRelevantData: relevantData } },
                { returnOriginal: false, new: true, upsert: true }
            )
            .populate('PatientRelevantData')
            .exec()
            .then(r => res.status(201).json(r))
            .catch(e => res.status(500).json(e));
    });
};

/**
 * Get all patient's relevant data
 *
 * @param req
 * @param res
 * @param next
 */
exports.getAllPatientRelevantData = (req, res, next) => {

    const { patientId } = req.params;

    Patient
        .find({ _id: patientId })
        .populate('PatientRelevantData')
        .exec()
        .then(r => res.status(200).json(r.patientRelevantData))
        .catch(e => res.status(500).json(e));
};

/**
 * Get single relevant patient data by id
 *
 * @param req
 * @param res
 * @param next
 */
exports.getPatientRelevantDataById = (req, res, next) => {

    const { patientRelevantDataId } = req.params;

    PatientRelevantData
        .findOne({ _id: patientRelevantDataId })
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Update patient relevant data
 *
 * @param req
 * @param res
 * @param next
 */
exports.updatePatientRelevantData = (req, res, next) => {

    const { patientRelevantDataId } = req.params;
    const { body } = req;

    PatientRelevantData
        .findOneAndUpdate(
            { _id: patientRelevantDataId },
            body,
            { returnOriginal: false, new: true, upsert: true }

        )
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Delete patient relevant data
 *
 * @param req
 * @param res
 * @param next
 */
exports.deletePatientRelevantData = (req, res, next) => {

    const { patientRelevantDataId } = req.params;

    PatientRelevantData
        .deleteOne({ _id: patientRelevantDataId })
        .then(() => res.status(204))
        .catch(e => res.status(500).json(e));
};