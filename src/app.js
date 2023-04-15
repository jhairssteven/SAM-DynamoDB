require('dotenv').config();
const loginController = require('./controller/login/login.controller');
const userController = require('./controller/user/user.controller');
const clientController = require('./controller/client/client.controller');

exports.login = loginController.login;
exports.user = userController.user;
exports.client = clientController.client;
