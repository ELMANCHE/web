'use strict'

const express = require('express');
const productController = require('../controllers/products');
const routes = express.Router();
const token = require('../helpers/auth');

// Middleware para validar que solo los administradores pueden crear productos
const onlyAdmins = (req, res, next) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: "Forbidden: You are not allowed to create articles" });
    }
    next();
};

// CRUD de productos con autenticación en las rutas de modificación
routes.post('/api/product', token.validateToken, onlyAdmins, productController.createProduct);
routes.put('/api/product/:id', token.validateToken, productController.editProduct);
routes.delete('/api/product/:id', token.validateToken, productController.deleteProduct);

// Obtención de productos sin autenticación
routes.get('/api/product/:id', productController.findProductById);
routes.get('/api/products', productController.findAllProducts);

// Búsqueda por precio exacto
routes.get('/api/products/price/:price', productController.findProductsWithPriceEqualsTo);

// Búsqueda por precio mayor y nombre con regex
routes.get('/api/products/price/:price/name/:name', productController.findProductsByPriceAndName);

// Búsqueda por precio o nombre con regex
routes.get('/api/products/price/:price/or/name/:name', productController.findProductsByPriceOrName);

module.exports = routes;
