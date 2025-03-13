'use estrict'

var express = require('express');

var courseController = require ('../controllers/courses');

var routes = express.Router();

routes.post('/api/course',courseController.createCourse);
routes.put('/api/course/:_id',courseController.editCourse);
routes.delete('/api/course/:_id',courseController.deleteCourse);
routes.get('/api/course/:_id',courseController.findCourseByid);
routes.get('/api/courses',courseController.findAllCourses);
routes.get('/api/courses/:price',courseController.findCoursesWithPriceEqualsTo);
routes.get('/api/courses/:price/:name',courseController.findCoursesWithPriceAndName);
routes.get('/api/courses/:price/or/:name',courseController.findCoursesWithPriceOrName);




module.exports = routes