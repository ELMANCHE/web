'use strict'


var User = require('../models/users');
var token = require('../helpers/auth');
var bcrypt = require("bcryptjs");


function createUser(req, resp){

    var parameters = req.body;
    var salt = bcrypt.genSaltSync(15);


    var newUser = new User();
    newUser.mail = parameters.email;
    newUser.password = bcrypt.hashSync(parameters.password, salt);

    newUser.save().then(
        (userSaved) => {
            resp.status(200).send({'message': 'User created listo'});
        },
        err=>{
            resp.status(500).send({'message': 'Hay un error mijon','error':err});
        }
    )
}

function loginUser(req, resp){
    var parameters = req.body;

    User.findOne({'email': parameters.email}).then(
        (userFound) => {
            if(userFound == null){
                resp.status(403).send({'message': 'User no encontrado'});
            }
            if(bcrypt.compareSync(parameters.password, userFound.password)){
                resp.status(200).send({'message': 'todo ok' , 'token': token.generateToken(userFound)});
            }
            else{
                resp.status(403).send({'message': 'login invalid'});
            }
        },
        err =>{
        resp.status(500).send({'message': 'ocurrio un error' , 'error': err});
        }

    );

}


module.exports = {createUser, loginUser}