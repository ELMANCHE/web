'use strict'


var jwt = require('jwt-simple');
var moment = require('moment');

var{response} = require('express');
var secret = '@Matina2190';

function generateToken(user){
    var payload = {
        sub : user._id,
        name : user.email,
        ist : moment().unix(),
        exp : moment().add('10','minutes').unix()
    }

    return jwt.encode(payload, secret);
}

function validateToken(req, resp, nextStep){
    try{
        var userToken = req.headers.authorization;
        var cleanToken = user.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);

        req.header.userId = payload.sub; // deja recordar quien fue el usuario logueado
        nextStep();
    }
    catch(ex){
        resp.status(403).send({message: 'Invalid token'});
    }
}

module.exports = {generateToken, validateToken}