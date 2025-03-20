'use strict'

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var UserSchema = Schema({
    //name : String,
    //lastname : String,
    email : String,
    password : String

});

module.exports = mongoose.model('users', UserSchema);


