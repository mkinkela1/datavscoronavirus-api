const Patient = require('../models/patient');
const Mongoose = require('mongoose');

/**
 * @swagger
 * /api/patient:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create a new patient
 *      tags:
 *          - Patients
 *      parameters:
 *          - name: body
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName
 *              properties:
 *                  firstName:
 *                      type: string
 *                      example: Pero
 *                  lastName:
 *                      type: string
 *                      example: Peric
 *                  dateOfBirth:
 *                      type: string
 *                      example: 03.05.1995.
 *                  sex:
 *                      type: string
 *                      example: M
 *                  address:
 *                      type: string
 *                      example: Neka random ulica
 *                  contact:
 *                      type: string
 *                      example: 12345678908634
 *                  travelToRiskCountriesInTheLast14Days:
 *                      type: boolean
 *                      example: true
 *                  contactInTheLast14DaysWithAPersonWhoHasSymptoms:
 *                      type: boolean
 *                      example: true
 *                  haveYouBeenInContactWithPeopleWhoHaveTheCoronaVirusInTheLast14Days:
 *                      type: boolean
 *                      example: true
 *                  haveYouEverBeenToAHealthCareFacilityWhereTheDiseaseHasBeenDiagnosedWithANewCoronavirus:
 *                      type: boolean
 *                      example: true
 *                  didYouGoForAExaminationSomewhere:
 *                      type: boolean
 *                      example: true
 *                  currentProblems:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: headache
 *                  problemsDuration:
 *                      type: integer
 *                      example: 5
 *                  highTemperature:
 *                      type: boolean
 *                      example: true
 *                  shaking:
 *                      type: boolean
 *                      example: true
 *                  lossOfAppetite:
 *                      type: boolean
 *                      example: true
 *                  exhaustion:
 *                      type: boolean
 *                      example: true
 *                  muscleAchesAndPains:
 *                      type: boolean
 *                      example: true
 *                  boneOrJointPain:
 *                      type: boolean
 *                      example: true
 *                  cough:
 *                      type: boolean
 *                      example: true
 *                  expectoration:
 *                      type: boolean
 *                      example: true
 *                  shortnessOfBreath:
 *                      type: boolean
 *                      example: true
 *                  choking:
 *                      type: boolean
 *                      example: true
 *                  fatigue:
 *                      type: boolean
 *                      example: true
 *                  chestPressure:
 *                      type: boolean
 *                      example: true
 *                  chestPain:
 *                      type: boolean
 *                      example: true
 *                  sneezing:
 *                      type: boolean
 *                      example: true
 *                  nasalCongestion:
 *                      type: boolean
 *                      example: true
 *                  secretionFromTheNose:
 *                      type: boolean
 *                      example: true
 *                  bleedingFromTheNose:
 *                      type: boolean
 *                      example: true
 *                  eyesPain:
 *                      type: boolean
 *                      example: true
 *                  redEyes:
 *                      type: boolean
 *                      example: true
 *                  throatProblems:
 *                      type: boolean
 *                      example: true
 *                  throatSecretion:
 *                      type: boolean
 *                      example: true
 *                  headache:
 *                      type: boolean
 *                      example: true
 *                  abdominalPain:
 *                      type: boolean
 *                      example: true
 *                  nausea:
 *                      type: boolean
 *                      example: true
 *                  vomit:
 *                      type: boolean
 *                      example: true
 *                  diarrhea:
 *                      type: boolean
 *                      example: true
 *                  backPain:
 *                      type: boolean
 *                      example: true
 *                  urinaryProblems:
 *                      type: boolean
 *                      example: true
 *                  rash:
 *                      type: boolean
 *                      example: true
 *                  enlargedLymphNodes:
 *                      type: boolean
 *                      example: true
 *                  neuroInterferences:
 *                      type: boolean
 *                      example: true
 *                  drugAllergy:
 *                      type: boolean
 *                      example: true
 *                  smoking:
 *                      type: boolean
 *                      example: true
 *                  increasedBloodPressure:
 *                      type: boolean
 *                      example: true
 *                  coronaryHeartDisease:
 *                      type: boolean
 *                      example: true
 *                  heartArrhythmia:
 *                      type: boolean
 *                      example: true
 *                  heartFailure:
 *                      type: boolean
 *                      example: true
 *                  lungDisease:
 *                      type: boolean
 *                      example: true
 *                  asthma:
 *                      type: boolean
 *                      example: true
 *                  chronicKidneyDisease:
 *                      type: boolean
 *                      example: true
 *                  diabetes:
 *                      type: boolean
 *                      example: true
 *                  heartStroke:
 *                      type: boolean
 *                      example: true
 *                  malignantDisease:
 *                      type: boolean
 *                      example: true
 *                  chronicLiverDisease:
 *                      type: boolean
 *                      example: true
 *                  inflamatoryBowelDisease:
 *                      type: boolean
 *                      example: true
 *                  reuma:
 *                      type: boolean
 *                      example: true
 *                  hiv:
 *                      type: boolean
 *                      example: true
 *                  medications:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: wrG
 *                  operations:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: wrG
 *
 *      responses:
 *          201:
 *              description: Patient created
 *
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