const Express = require('express');
const Router = Express.Router({ mergeParams: true });

const PatientRelevantDataController = require('./../controllers/PatientRelevantDataController');

Router.post('/patient/:patientId', PatientRelevantDataController.createPatientRelevantData);
Router.get('/patient/:patientId', PatientRelevantDataController.getAllPatientRelevantData);
Router.get('/:patientRelevantDataId', PatientRelevantDataController.getPatientRelevantDataById);
Router.delete('/:patientRelevantDataId', PatientRelevantDataController.deletePatientRelevantData);
Router.put('/:patientRelevantDataId', PatientRelevantDataController.updatePatientRelevantData);

module.exports = Router;