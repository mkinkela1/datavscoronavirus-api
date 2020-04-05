const Express = require('express');
const Router = Express.Router({ mergeParams: true });

const PatientController = require('../controllers/PatientController');

Router.post('/', PatientController.createPatient);
Router.get('/:patientId', PatientController.getPatientData);

module.exports = Router;