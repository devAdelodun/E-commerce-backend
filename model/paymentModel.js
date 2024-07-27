import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    order_id: {type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true},
    amount: {type: Number, required: true},
    method: {type: String, required: true},
    status: {type: String, enum:["pending", "succeded", "failed"], default: "pending"},
},
{
    timestamps: true,
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;