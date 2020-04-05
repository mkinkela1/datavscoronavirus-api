const Express = require('express');
const Router = Express.Router({ mergeParams: true });
const passport = require('passport');

require('./../../passport');
const DoctorController = require('../controllers/DoctorController');

Router.post('/', DoctorController.createDoctor);
Router.get('/', passport.authenticate('jwt', {session: false}), DoctorController.getDoctors);
Router.get('/:doctorId', passport.authenticate('jwt', {session: false}), DoctorController.getDoctorById);
Router.put('/:doctorId', passport.authenticate('jwt', {session: false}), DoctorController.editDoctor);
Router.delete('/:doctorId', passport.authenticate('jwt', {session: false}), DoctorController.deleteDoctor);

module.exports = Router;