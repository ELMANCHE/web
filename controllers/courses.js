'use strict'

var Course  = require("../models/courses");

function createCourse(req,resp){
    var courseReqBody = req.body;

    var newCourse = new Course();
    newCourse.name = courseReqBody.name;
    newCourse.duration = courseReqBody.duration;
    newCourse.price = courseReqBody.price;

    if (newCourse.name === null || newCourse.name.trim() === ''
    || newCourse.duration === null || newCourse.duration <= 0
    || newCourse.price === null || newCourse.price <= 0){
        resp.status(400).send({'message': 'One or more required variables were not sent'});
    }

    newCourse.save().then(
        (savedCourse) =>{
            resp.status(200).send({'message': 'Course was created succesfully', 'course': savedCourse});
        },
        err =>{
            resp.status(500).send({'message': 'An error ocurred while creating the course', 'error': err});
        }
    );
}

function editCourse (req, resp){
    var courseToEdit = req.params._id;
    var courseNewValues = req.body;


    var course = new Course();

    course._id = courseToEdit;
    course.name = courseNewValues.name;
    course.duration = courseNewValues.duration;
    course.price = courseNewValues.price;

    Course.findByIdAndUpdate(course._id,course, { new: true }).then(
        (editedCourse) => {
            resp.status(200).send({'message': 'Course was edited succesfully', 'course': editedCourse});
        },
        err =>{
            resp.status(500).send({'message': 'An error ocurred while editing the course', 'error': err});
        }
    );
}

function deleteCourse (req, resp){
    var courseToDelete = req.params._id;

    Course.findByIdAndDelete(courseToDelete).then(
        (deletedCourse) => {
            resp.status(200).send({'message': 'Course was deleted succesfully', 'course': deletedCourse});
        },
        err =>{
            resp.status(500).send({'message': 'An error ocurred while deleting the course', 'error': err});
        }
    );
}

function findCourseByid (req, resp){
    var courseToFind = req.params._id;

    Course.findById(courseToFind).then(
        (foundCourse) => {
            resp.status(200).send({'course': foundCourse});
        },
        err =>{
            resp.status(500).send({'message': 'An error ocurred while searching the course', 'error': err});
        }
    );
}

function findAllCourses(req, resp){
    Course.find({}).then(
        (foundCourse) => {
            resp.status(200).send({'courses': foundCourse});
        },
        err =>{
            resp.status(500).send({'message': 'An error ocurred while searching the courses', 'error': err});
        }
    );
}

function findCoursesWithPriceEqualsTo(req, resp){
    var priceToFind = req.params.price;

    
    Course.find({price: priceToFind}).then(
        (foundCourse) => {
            resp.status(200).send({'courses': foundCourse});
        },
        err =>{
            resp.status(500).send({'message': 'An error ocurred while searching the courses', 'error': err});
        }
    );
}

function findCoursesWithPriceAndName(req, resp){
    var priceToFind = req.params.price;
    var nameToFind = req.params.name;
    
    Course.find(
        {
            price: {$gt: priceToFind},
            name: {$regex: nameToFind}
        }
    ).then(
    (foundCourse) => {
        resp.status(200).send({'courses': foundCourse});
    },
    err =>{
        resp.status(500).send({'message': 'An error ocurred while searching the courses', 'error': err});
    }
    );
}

function findCoursesWithPriceOrName(req, resp){
    var priceToFind = req.params.price;
    var nameToFind = req.params.name;
    
    Course.find(
        {
            $or: [
                {price: {$gt: priceToFind}},
                {name: {$regex: nameToFind}}
            ]
        }
    ).then(
    (foundCourse) => {
        resp.status(200).send({'courses': foundCourse});
    },
    err =>{
        resp.status(500).send({'message': 'An error ocurred while searching the courses', 'error': err});
    }
    );
}

module.exports = {
    createCourse, editCourse , deleteCourse , findCourseByid , findAllCourses,
    findCoursesWithPriceEqualsTo , findCoursesWithPriceAndName , findCoursesWithPriceOrName
}