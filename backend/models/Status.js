const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema for storing the current maximum ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true }
});

const CounterStatus = mongoose.model('CounterStatus', counterSchema);

CounterStatus.findById('statusid').then(doc => {
    if (!doc) {
        new CounterStatus({ _id: 'statusid', sequence_value: 0 }).save();
    }
});

// Status Schema
const statusSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    status: { type: String, required: true }
});
const Status = mongoose.model('Status', statusSchema);

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
    const result = await CounterStatus.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );

    if (result.sequence_value === 0) {
        // Check if this is the first group
        const count = await Status.countDocuments();
        if (count === 0) {
            return 1;
        }
    }
    
    const maxIdStatus = await Status.findOne().sort({ id: -1 });
    const maxId = maxIdStatus ? maxIdStatus.id : 0;
    
    return maxId + 1; // Return the next available ID
};

//STATUS
let statusTypes = [];

// GET endpoint to fetch all status types
router.get('/', async(req, res) => {
    try {
        const statuses = await Status.find();
        res.json(statuses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch statuses' });
    }
});

// POST endpoint to add a new status type
router.post('/', async (req, res) => {
    const { newStatus } = req.body;
    if (!newStatus) {
        return res.status(400).json({ error: 'Status is required' });
    }

    try {
        // Get the next sequence value
        const nextId = await getNextSequenceValue('statusid');

        // Create a new Status document
        const newStatusType = new Status({
            id: nextId,
            status: newStatus
        });

        // Save the new Status document
        const savedStatusType = await newStatusType.save();

        res.status(201).json(savedStatusType);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add status' });
    }
});

// PUT endpoint to update a status type
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { newStatus } = req.body;

    try {
        const updatedStatus = await Status.findOneAndUpdate(
            { id: parseInt(id) },
            { status: newStatus }, // Update only the 'status' field
            { new: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ error: 'Status not found' });
        }

        res.json(updatedStatus);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// DELETE endpoint to remove a status type
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const deletedStatus = await Status.findOneAndDelete({ id: parseInt(id) });

        if (!deletedStatus) {
            return res.status(404).json({ error: 'Status Type not found' });
        }

        // Update IDs of statuses with higher IDs
        await Status.updateMany(
            { id: { $gt: deletedStatus.id } },
            { $inc: { id: -1 } }
        );

        // Remove the deleted status from the statusTypes array
        statusTypes = statusTypes.filter(type => type.id !== deletedStatus.id);

        res.status(200).send('Status Type deleted successfully');
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete Status Type' });
    }
});

module.exports = router;