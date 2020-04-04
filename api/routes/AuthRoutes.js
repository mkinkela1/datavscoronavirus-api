const Express = require('express');
const Router = Express.Router({ mergeParams: true });

const AuthenticationController = require('./../controllers/AuthenticationController');

Router.post('/login', AuthenticationController.auth);

module.exports = Router;