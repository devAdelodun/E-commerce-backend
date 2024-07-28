import Review from '../models/Review.js';
import ash from 'express-async-handler';

// Create a review
export const createReview = ash(async (req, res) => {
    const { product_id, rating, comment } = req.body;

    const review = new Review({
        user_id: req.user._id,
        product_id,
        rating,
        comment,
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
});

// Get reviews for a product
export const getProductReviews = ash(async (req, res) => {
    const reviews = await Review.find({ product_id: req.params.product_id });
    res.json(reviews);
});
