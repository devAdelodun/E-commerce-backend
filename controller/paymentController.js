import Payment from '../models/Payment.js';
import ash from 'express-async-handler';

// Create a payment
export const createPayment = ash(async (req, res) => {
    const { order_id, amount, method } = req.body;

    const payment = new Payment({
        user_id: req.user._id,
        order_id,
        amount,
        method,
    });

    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
});

// Get user's payments
export const getUserPayments = ash(async (req, res) => {
    const payments = await Payment.find({ user_id: req.user._id });
    res.json(payments);
});

// Update payment status
export const updatePaymentStatus = ash(async (req, res) => {
    const payment = await Payment.findById(req.params.id);

    if (payment) {
        payment.status = req.body.status || payment.status;
        const updatedPayment = await payment.save();
        res.json(updatedPayment);
    } else {
        res.status(404);
        throw new Error('Payment not found');
    }
});
