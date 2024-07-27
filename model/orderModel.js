import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    cart_id: {type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true},
    items: [{
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true},
    }],
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    totalPrice: {type: Number, required: true},
    status: {type: String, enum:["pending", "shipped", "delivered"], default: "pending"},
},
{
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;