'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://localhost:27017/desarrolloweb').then(
    () => {
        console.log("Database conneting, si comenzo");
        application.listen(6542, function(){
            console.log("comenzo el gogoog");
        });

    },
    err => {
        console.log("error when connecting to database" + err);
    }


);