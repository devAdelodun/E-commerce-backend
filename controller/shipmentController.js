import Shipment from '../models/Shipment.js';
import ash from 'express-async-handler';

// Create a shipment
export const createShipment = ash(async (req, res) => {
    const { orderId, trackingNumber, carrier, shipmentDate, deliveryDate } = req.body;

    const shipment = new Shipment({
        orderId,
        trackingNumber,
        carrier,
        shipmentDate,
        deliveryDate,
    });

    const createdShipment = await shipment.save();
    res.status(201).json(createdShipment);
});

// Get shipments for an order
export const getOrderShipments = ash(async (req, res) => {
    const shipments = await Shipment.find({ orderId: req.params.orderId });
    res.json(shipments);
});

// Update shipment status
export const updateShipmentStatus = ash(async (req, res) => {
    const shipment = await Shipment.findById(req.params.id);

    if (shipment) {
        shipment.status = req.body.status || shipment.status;
        const updatedShipment = await shipment.save();
        res.json(updatedShipment);
    } else {
        res.status(404);
        throw new Error('Shipment not found');
    }
});
