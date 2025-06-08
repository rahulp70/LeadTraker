const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema for storing the current maximum ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true }
});
const CounterServiceType = mongoose.model('CounterServiceType', counterSchema);

// Initialize counter if it doesn't exist
CounterServiceType.findById('servicetypeid').then(doc => {
    if (!doc) {
        new CounterServiceType({ _id: 'servicetypeid', sequence_value: 0 }).save();
    }
});

// LeadType Schema
const ServiceTypeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    ServiceType: { type: String, required: true }
});

const ServiceType = mongoose.model('ServiceType', ServiceTypeSchema);

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
    const result = await CounterServiceType.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );

    const maxIdServiceType = await ServiceType.findOne().sort({ id: -1 });
    const maxId = maxIdServiceType ? maxIdServiceType.id : 0;
    
    return maxId + 1; // Return the next available ID
};

//SERVICE-TYPES
let ServiceTypes = [];

// GET endpoint to fetch all service types
router.get('/', async (req, res) => {
    try {
        const serviceTypes = await ServiceType.find();
        res.json(serviceTypes); // Return the retrieved service types
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch Service Types' });
    }
});

// POST endpoint to add a new service type
router.post('/', async (req, res) => {
    const { ServiceType: ServiceTypeName } = req.body;
    if (!ServiceTypeName) {
        return res.status(400).json({ error: 'Lead Type is required' });
    }

    try {
        const nextId = await getNextSequenceValue('leadtypeid');

        const newServiceType = new ServiceType({
            id: nextId,
            ServiceType: ServiceTypeName
        });

        const savedServiceType = await newServiceType.save();

        res.status(201).json(savedServiceType);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add Service Type' });
    }
});

// PUT endpoint to update a service type
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ServiceType: ServiceTypeName } = req.body;

    if (!ServiceTypeName) {
        return res.status(400).json({ error: 'Service Type is required' });
    }

    try {
        const updatedServiceType = await ServiceType.findOneAndUpdate(
            { id: parseInt(id) },
            { ServiceType: ServiceTypeName },
            { new: true }
        );

        if (!updatedServiceType) {
            return res.status(404).json({ error: 'Service Type not found' });
        }

        res.json(updatedServiceType);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to update Service Type' });
    }
});

// DELETE endpoint to remove a service type
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedServiceType = await ServiceType.findOneAndDelete({ id: parseInt(id) });

        if (!deletedServiceType) {
            return res.status(404).json({ error: 'Lead Type not found' });
        }

        // Update IDs of lead types with higher IDs
        await ServiceType.updateMany(
            { id: { $gt: deletedServiceType.id } },
            { $inc: { id: -1 } }
        );

        res.status(200).json({ message: 'Service Type deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete Service Type' });
    }
});

module.exports = router;