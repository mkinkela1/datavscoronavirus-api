const Express = require('express');
const Router = Express.Router({ mergeParams: true });
const passport = require('passport');

require('./../../passport');

const WarningScoreController = require('../controllers/WarningScoreController');

Router.post('/patient/:patientId', passport.authenticate('jwt', {session: false}), WarningScoreController.addWarningScore);
Router.get('/:warningScoreId', passport.authenticate('jwt', {session: false}), WarningScoreController.getWaringScoreById);
Router.delete('/:warningScoreId', passport.authenticate('jwt', {session: false}), WarningScoreController.deleteWarningScore);

module.exports = Router;