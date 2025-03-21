// Elias Manchego Navarro
//Primer parcial

'use strict'

const Product = require("../models/products");


//Crea un nuevo producto en la base de datos.
//Solo los administradores pueden realizar esta acción.
async function createProduct(req, res) {
    try {
        // Validar que el usuario sea administrador
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Unauthorized: Only admins can create products' });
        }
        
        // Extraer datos del cuerpo de la petición
        const { name, category, price, stock } = req.body;

        // Validar que los datos sean correctos
        if (!name || !category || price == null || price <= 0 || stock == null || stock < 0) {
            return res.status(400).send({ message: 'Invalid input data' });
        }

        // Crear y guardar el producto en la base de datos
        const newProduct = new Product({ name, category, price, stock });
        const savedProduct = await newProduct.save();
        res.status(200).send({ message: 'Product created successfully', product: savedProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error creating product', error });
    }
}


//Edita un producto existente basado en su ID.

async function editProduct(req, res) {
    try {
        const productId = req.params.id;
        const productData = req.body;

        // Buscar y actualizar el producto
        const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
        if (!updatedProduct) return res.status(404).send({ message: 'Product not found' });

        res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error updating product', error });
    }
}


//Elimina un producto de la base de datos basado en su ID.
async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;

        // Buscar y eliminar el producto
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) return res.status(404).send({ message: 'Product not found' });

        res.status(200).send({ message: 'Product deleted successfully', product: deletedProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error deleting product', error });
    }
}


//Busca un producto en la base de datos por su ID.

async function findProductById(req, res) {
    try {
        const productId = req.params.id;

        // Buscar el producto por su ID
        const foundProduct = await Product.findById(productId);
        if (!foundProduct) return res.status(404).send({ message: 'Product not found' });

        res.status(200).send({ product: foundProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching product', error });
    }
}


//Obtiene todos los productos de la base de datos.
async function findAllProducts(req, res) {
    try {
        const products = await Product.find({});
        res.status(200).send({ products });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
}


//Busca productos cuyo precio sea igual al valor proporcionado en la URL.

async function findProductsWithPriceEqualsTo(req, res) {
    try {
        const price = parseFloat(req.params.price);
        if (isNaN(price) || price < 0) return res.status(400).send({ message: 'Invalid price' });

        // Buscar productos con el precio exacto
        const products = await Product.find({ price });
        res.status(200).send({ products });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
}

//Busca productos con un precio mayor al dado y que coincidan parcialmente con el nombre proporcionado.
 
async function findProductsByPriceAndName(req, res) {
    try {
        const price = parseFloat(req.params.price);
        const name = req.params.name;

        if (isNaN(price) || price < 0) return res.status(400).send({ message: 'Invalid price' });

        // Buscar productos con precio mayor al dado y nombre coincidente
        const products = await Product.find({
            price: { $gt: price },
            name: { $regex: name, $options: 'i' }
        });

        res.status(200).send({ products });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
}


//Busca productos cuyo precio sea mayor al dado o cuyo nombre coincida parcialmente con el valor proporcionado.

async function findProductsByPriceOrName(req, res) {
    try {
        const price = parseFloat(req.params.price);
        const name = req.params.name;

        if (isNaN(price) || price < 0) return res.status(400).send({ message: 'Invalid price' });

        // Buscar productos que cumplan con al menos una de las condiciones
        const products = await Product.find({
            $or: [
                { price: { $gt: price } },
                { name: { $regex: name, $options: 'i' } }
            ]
        });

        res.status(200).send({ products });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
}

module.exports = {
    createProduct,
    editProduct,
    deleteProduct,
    findProductById,
    findAllProducts,
    findProductsWithPriceEqualsTo,
    findProductsByPriceAndName,
    findProductsByPriceOrName
};
