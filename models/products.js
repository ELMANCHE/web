
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Definición del esquema de productos
var ProductSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 }
});
// Exportación del modelo listo para usar
// 'products' será el nombre de la colección en MongoDB (pluralizado automáticamente)
module.exports = mongoose.model('products', ProductSchema);

