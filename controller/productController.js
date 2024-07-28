import Product from '../models/Product.js';
import ash from 'express-async-handler';

// Create a product
export const createProduct = ash(async (req, res) => {
    const { name, description, price, quantity, image, category } = req.body;

    const product = new Product({
        name,
        description,
        price,
        quantity,
        image,
        category,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// Get all products
export const getProducts = ash(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Get product by ID
export const getProductById = ash(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Update a product
export const updateProduct = ash(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.quantity = req.body.quantity || product.quantity;
        product.image = req.body.image || product.image;
        product.category = req.body.category || product.category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Delete a product
export const deleteProduct = ash(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});
