'use strict'

const Product = require("../models/products");

async function createProduct(req, res) {
    try {

        // Validar que el usuario sea administrador
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Unauthorized: Only admins can create products' });
        }
        //
        const { name, category, price, stock } = req.body;

        if (!name || !category || price == null || price <= 0 || stock == null || stock < 0) {
            return res.status(400).send({ message: 'Invalid input data' });
        }

        const newProduct = new Product({ name, category, price, stock });
        const savedProduct = await newProduct.save();
        res.status(200).send({ message: 'Product created successfully', product: savedProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error creating product', error });
    }
}

async function editProduct(req, res) {
    try {
        const productId = req.params.id;
        const productData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
        if (!updatedProduct) return res.status(404).send({ message: 'Product not found' });

        res.status(200).send({ message: 'Product updated successfully', product: updatedProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error updating product', error });
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) return res.status(404).send({ message: 'Product not found' });

        res.status(200).send({ message: 'Product deleted successfully', product: deletedProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error deleting product', error });
    }
}

async function findProductById(req, res) {
    try {
        const productId = req.params.id;

        const foundProduct = await Product.findById(productId);
        if (!foundProduct) return res.status(404).send({ message: 'Product not found' });

        res.status(200).send({ product: foundProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching product', error });
    }
}

async function findAllProducts(req, res) {
    try {
        const products = await Product.find({});
        res.status(200).send({ products });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
}


async function findProductsWithPriceEqualsTo(req, res) {
    try {
        const price = parseFloat(req.params.price);
        if (isNaN(price) || price < 0) return res.status(400).send({ message: 'Invalid price' });

        const products = await Product.find({ price });
        res.status(200).send({ products });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
}

async function findProductsByPriceAndName(req, res) {
    try {
        const price = parseFloat(req.params.price);
        const name = req.params.name;

        if (isNaN(price) || price < 0) return res.status(400).send({ message: 'Invalid price' });

        const products = await Product.find({
            price: { $gt: price },
            name: { $regex: name, $options: 'i' }
        });

        res.status(200).send({ products });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching products', error });
    }
}

async function findProductsByPriceOrName(req, res) {
    try {
        const price = parseFloat(req.params.price);
        const name = req.params.name;

        if (isNaN(price) || price < 0) return res.status(400).send({ message: 'Invalid price' });

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
