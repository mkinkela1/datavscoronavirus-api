const Express = require('express');
const Router = Express.Router({ mergeParams: true });

const AuthenticationController = require('./../controllers/AuthenticationController');

Router.post('/login', AuthenticationController.auth);
Router.post('/forgot-password', AuthenticationController.forgotPassword);
Router.post('/refresh-token', AuthenticationController.refreshToken);

module.exports = Router;