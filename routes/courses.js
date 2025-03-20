'use estrict'

var express = require('express');

var courseController = require ('../controllers/courses');

var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/course', token.validateToken,courseController.createCourse); //login
routes.put('/api/course/:_id',token.validateToken ,courseController.editCourse); // login
routes.delete('/api/course/:_id', token.validateToken,courseController.deleteCourse);//login
routes.get('/api/course/:_id',courseController.findCourseByid);
routes.get('/api/courses',courseController.findAllCourses);
routes.get('/api/courses/:price',courseController.findCoursesWithPriceEqualsTo);
routes.get('/api/courses/:price/:name',courseController.findCoursesWithPriceAndName);
routes.get('/api/courses/:price/or/:name',courseController.findCoursesWithPriceOrName);




module.exports = routes