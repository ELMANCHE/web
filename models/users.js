'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Definición del esquema de usuario
var UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' } // Definimos roles
});

// Creación del modelo User
// MongoDB creará automáticamente una colección llamada 'users' (pluralizado)
module.exports = mongoose.model('User', UserSchema);
