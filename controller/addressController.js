import Address from '../models/Address.js';
import ash from 'express-async-handler';

// Create a new address
export const createAddress = ash(async (req, res) => {
    const { addressLine1, addressLine2, city, state, zipCode, country } = req.body;
    const address = new Address({
        user_id: req.user._id,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        country,
    });

    const createdAddress = await address.save();
    res.status(201).json(createdAddress);
});

// Get all addresses for a user
export const getUserAddresses = ash(async (req, res) => {
    const addresses = await Address.find({ user_id: req.user._id });
    res.json(addresses);
});

// Update an address
export const updateAddress = ash(async (req, res) => {
    const { id } = req.params;
    const address = await Address.findById(id);

    if (address) {
        address.addressLine1 = req.body.addressLine1 || address.addressLine1;
        address.addressLine2 = req.body.addressLine2 || address.addressLine2;
        address.city = req.body.city || address.city;
        address.state = req.body.state || address.state;
        address.zipCode = req.body.zipCode || address.zipCode;
        address.country = req.body.country || address.country;

        const updatedAddress = await address.save();
        res.json(updatedAddress);
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

// Delete an address
export const deleteAddress = ash(async (req, res) => {
    const { id } = req.params;
    const address = await Address.findById(id);

    if (address) {
        await address.remove();
        res.json({ message: 'Address removed' });
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});
