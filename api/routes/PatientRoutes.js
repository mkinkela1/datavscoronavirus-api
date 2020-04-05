const Express = require('express');
const Router = Express.Router({ mergeParams: true });
const passport = require('passport');

require('./../../passport');
const PatientController = require('../controllers/PatientController');

Router.post('/', passport.authenticate('jwt', {session: false}), PatientController.createPatient);
Router.get('/:patientId', PatientController.getPatientData);
Router.get('/', PatientController.getAllPatients);
Router.get('/export/csv', PatientController.exportPatientsInCsv);
Router.put('/:patientId', passport.authenticate('jwt', {session: false}), PatientController.editPatient);
Router.delete('/:patientId', passport.authenticate('jwt', {session: false}), PatientController.deletePatient);

module.exports = Router;