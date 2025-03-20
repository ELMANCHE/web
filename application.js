'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const routesCourse = require('./routes/products');
const routesUser = require('./routes/users');

const application = express();

// Middleware de body-parser solo para JSON en POST y PUT
application.use((req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
        bodyParser.json()(req, res, next);
    } else {
        next();
    }
});

// Middleware para URL-encoded (formularios)
application.use(bodyParser.urlencoded({ extended: false }));

// Rutas
application.use(routesCourse);
application.use(routesUser);

module.exports = application;
