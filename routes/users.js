'use strict'
// Importación de dependencias
var express = require('express');
var userController = require('../controllers/users');
var routes = express.Router();
// Definición de rutas
routes.post('/api/user', userController.createUser);
routes.post('/api/login', userController.loginUser);


// Exportación del enrutador configurado
module.exports = routes;
