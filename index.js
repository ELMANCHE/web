'use strict'

var mongoose = require('mongoose');
var application = require('./application');
// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/desarrolloweb').then(
    () => {
        console.log("Te conectaste a la BD . Are u ready?");
        application.listen(6542, function(){
            console.log("Que comience el gogoog ");
        });
    },
    err => {
        console.log("No te conectaste, algo paso..." + err);
    }
);

// ultima prueba realizada con exito!