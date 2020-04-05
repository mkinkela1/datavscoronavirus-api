const Patient = require('../models/patient');
const WarningScore = require('../models/warningScore');
const Mongoose = require('mongoose');
const CalculateScore = require('../services/CalculateScore');

/**
 * Add warning score
 *
 * @param req
 * @param res
 * @param next
 */
exports.addWarningScore = (req, res, next) => {

    const { patientId } = req.params;
    let { body } = req;

    const score = CalculateScore(body);

    body = {
        _id: new Mongoose.Types.ObjectId(),
        score,
        ...body
    };

    const warningScore = new WarningScore(body);

    warningScore.save(error => {

        if(error)
            res.status(500).json(error);

        Patient
            .findOneAndUpdate(
                { _id: patientId },
                { $push: { warningScores: warningScore } },
                { returnOriginal: false, new: true, upsert: true }
            )
            .populate('WarningScore')
            .exec()
            .then(r => res.status(201).json(r))
            .catch(e => res.status(500).json(e));
    });
};

/**
 * Get warning score by id
 *
 * @param req
 * @param res
 * @param next
 */
exports.getWaringScoreById = (req, res, next) => {

    const { warningScoreId } = req.params;

    WarningScore
        .find({ _id: warningScoreId })
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Delete warning score
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteWarningScore = (req, res, next) => {

    const { warningScoreId } = req.params;

    WarningScore
        .findOneAndDelete({ _id: warningScoreId })
        .exec()
        .then(() => res.status(204))
        .catch(e => res.status(500).json(e));
};

/**
 * Update warning score
 *
 * @param req
 * @param res
 * @param next
 */
exports.updateWarningScore = (req, res, next) => {

    const { warningScoreId } = req.params;
    const { body } = req;

    WarningScore
        .findOneAndUpdate(
            { _id: warningScoreId },
            body,
            { returnOriginal: false, new: true, upsert: true }
        )
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};