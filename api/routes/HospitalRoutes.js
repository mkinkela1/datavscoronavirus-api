const Express = require('express');
const Router = Express.Router({ mergeParams: true });
const passport = require('passport');

require('./../../passport');
const HospitalController = require('../controllers/HospitalController');

Router.post('/', passport.authenticate('jwt', {session: false}), HospitalController.createHospital);
Router.get('/', passport.authenticate('jwt', {session: false}), HospitalController.getAllHospitals);
Router.get('/:hospitalId', passport.authenticate('jwt', {session: false}), HospitalController.getHospitalById);
Router.put('/:doctorId', passport.authenticate('jwt', {session: false}), HospitalController.updateHospital);
Router.delete('/:doctorId', passport.authenticate('jwt', {session: false}), HospitalController.deleteHospital);

module.exports = Router;