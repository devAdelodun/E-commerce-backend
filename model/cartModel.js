import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, default: 1},
    }],
    totalPrice: {type: Number, default: 0},
 }, 
 {
    timestamps: true,
 }

);


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;