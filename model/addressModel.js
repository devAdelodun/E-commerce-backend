import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    addressLine1: {type: String, required: true},
    addressLine2: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
    country: {type: String, required: true},
},
{
    timestamps: true,
});

const Address = mongoose.model("Address", addressSchema);
export default Address;