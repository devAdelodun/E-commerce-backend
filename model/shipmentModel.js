import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    trackingNumber: { type: String, required: true },
    carrier: { type: String, required: true },
    shipmentDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    status: { type: String, enum: ['shipped', 'in transit', 'delivered', 'returned'], default: 'shipped' },

 },
 {
    timestamps: true,
 }

);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;