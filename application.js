'use strict'

var express = require('express');
var bodyParser = require ('body-parser');
var routesCourse = require('./routes/courses');


var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({'extended' : false}));
application.use(routesCourse);

module.exports = application;


