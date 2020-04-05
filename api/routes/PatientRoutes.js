const Express = require('express');
const Router = Express.Router({ mergeParams: true });

const PatientController = require('../controllers/PatientController');

Router.post('/', PatientController.createPatient);

module.exports = Router;