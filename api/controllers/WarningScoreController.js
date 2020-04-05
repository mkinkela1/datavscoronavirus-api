const Patient = require('../models/patient');
const WarningScore = require('../models/warningScore');
const Mongoose = require('mongoose');
const CalculateScore = require('../services/CalculateScore');

/**
 * @swagger
 * /api/warning-score/{patientId}:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create a new warning score
 *      tags:
 *          - Warning score
 *      parameters:
 *          - in: path
 *            name: patientId
 *            require: true
 *            description: Patient ID
 *            schema:
 *              type: string
 *          - in: body
 *            name: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - years
 *                  - numberOfRespirations
 *                  - oxygenSaturation
 *                  - anyAdditionalO2
 *                  - systolicPressure
 *                  - heartRate
 *                  - stateOfConsciousness
 *                  - bodyTemperature
 *                  - coughDegree
 *              properties:
 *                  years:
 *                      type: integer
 *                      example: 30
 *                  numberOfRespirations:
 *                      type: integer
 *                      example: 15
 *                  oxygenSaturation:
 *                      type: integer
 *                      example: 30
 *                  anyAdditionalO2:
 *                      type: boolean
 *                      example: true
 *                  systolicPressure:
 *                      type: integer
 *                      example: 30
 *                  heartRate:
 *                      type: integer
 *                      example: 15
 *                  stateOfConsciousness:
 *                      type: string
 *                      example: Confused
 *                  bodyTemperature:
 *                      type: integer
 *                      format: float
 *                      example: 39.1
 *                  coughDegree:
 *                      type: integer
 *                      minimum: 1
 *                      maximum: 5
 *                      example: 4
 *      responses:
 *          201:
 *              description: Warning score added
 *
 *
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