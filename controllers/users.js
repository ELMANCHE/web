'use strict'

var User = require('../models/users');
var token = require('../helpers/auth');
var bcrypt = require("bcryptjs");


// Función para crear un nuevo usuario
// Se encripta la contraseña antes de guardarla en la base de datos
function createUser(req, resp){

    var parameters = req.body;
    var salt = bcrypt.genSaltSync(15);

    var newUser = new User();
    newUser.email = parameters.email;
    newUser.password = bcrypt.hashSync(parameters.password, salt);
    //prueba
    newUser.role = parameters.role || "user"; // Si no se envía un rol, se asigna "user"


    newUser.save().then(
        (userSaved) => {
            resp.status(200).send({'message': 'User created succesfully'});
        },
        err=>{
           resp.status(500).send( {'message':'An error ocurred while creating the user', 'error': err });
        }
    );
}

// Función para iniciar sesión de un usuario
// Se valida el email y la contraseña, y se genera un token si son correctos
function loginUser(req, resp){
    var parameters = req.body;

    User.findOne({'email': parameters.email}).then(
        (userFound) => {
            if(userFound == null){
                resp.status(403).send( {'message':'User not found' }); 
            }
            if(bcrypt.compareSync(parameters.password, userFound.password)){
                resp.status(200).send({'message': 'Login Success', 'token': token.generateToken(userFound)});
            }
            else{
                resp.status(403).send({'message': 'Invalid Login'});
            }
        },
        err =>{
            resp.status(500).send( {'message':'An error ocurred while validating the user', 'error': err });  
        }
    );
}



module.exports = {createUser, loginUser}
