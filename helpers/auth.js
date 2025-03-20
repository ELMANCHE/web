'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var {response} = require('express');
var secret = 'martina';

function generateToken(user){
    var payload = {
        sub : user._id,
        name : user.email,
        role : user.role,  // Agregamos el rol aquí
        iat : moment().unix(),
        exp : moment().add(2, 'minutes').unix()
    }

    return jwt.encode(payload, secret);
}


function validateToken(req, resp, nextStep){
    try{
        var userToken = req.headers.authorization;
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);
        
        console.log(payload); // <-- Verifica si el token tiene "role"

        req.header.userId = payload.sub;
        req.userRole = payload.role; // rol del usuario autenticado
        nextStep();
    }
    catch(ex){
        resp.status(403).send({message: 'Invalid token'});
    }
}


module.exports = { generateToken, validateToken }
