import Cart from '../models/Cart.js';
import ash from 'express-async-handler';

// Create or update cart
export const addToCart = ash(async (req, res) => {
    const { product, quantity } = req.body;
    const cart = await Cart.findOne({ user_id: req.user._id });

    if (cart) {
        const itemIndex = cart.items.findIndex(item => item.product.toString() === product);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }
        cart.totalPrice += req.body.price * quantity;
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } else {
        const newCart = new Cart({
            user_id: req.user._id,
            items: [{ product, quantity }],
            totalPrice: req.body.price * quantity,
        });
        const createdCart = await newCart.save();
        res.status(201).json(createdCart);
    }
});

// Get user's cart
export const getUserCart = ash(async (req, res) => {
    const cart = await Cart.findOne({ user_id: req.user._id }).populate('items.product');
    if (cart) {
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

// Remove item from cart
export const removeFromCart = ash(async (req, res) => {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user_id: req.user._id });

    if (cart) {
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.totalPrice -= cart.items[itemIndex].quantity * req.body.price;
            cart.items.splice(itemIndex, 1);
            const updatedCart = await cart.save();
            res.json(updatedCart);
        } else {
            res.status(404);
            throw new Error('Item not found in cart');
        }
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});
