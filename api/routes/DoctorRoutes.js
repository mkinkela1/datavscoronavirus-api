const Express = require('express');
const Router = Express.Router({ mergeParams: true });

const UserController = require('../controllers/DoctorController');

Router.post('/', UserController.createDoctor);

module.exports = Router;