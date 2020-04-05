const Express = require('express');
const Router = Express.Router({ mergeParams: true });
const passport = require('passport');

require('./../../passport');

const WarningScoreController = require('../controllers/WarningScoreController');

Router.post('/:patientId', passport.authenticate('jwt', {session: false}), WarningScoreController.addWarningScore);

module.exports = Router;