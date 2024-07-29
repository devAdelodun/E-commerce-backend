import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import ash from 'express-async-handler';


export const createOrder = ash(async (req, res) => {
    const { shippingAddress, paymentMethod, totalPrice } = req.body;
    const cart = await Cart.findOne({ user_id: req.user._id });

    if (cart) {
        const order = new Order({
            user_id: req.user._id,
            cart_id: cart._id,
            items: cart.items,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});


export const getUserOrders = ash(async (req, res) => {
    const orders = await Order.find({ user_id: req.user._id });
    res.json(orders);
});


export const getOrderById = ash(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('items.product_id');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});


export const updateOrderStatus = ash(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});
