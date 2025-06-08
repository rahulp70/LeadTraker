const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema for storing the current maximum ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true }
});

const CounterLeadType = mongoose.model('CounterLeadType', counterSchema);

// Initialize counter if it doesn't exist
CounterLeadType.findById('leadtypeid').then(doc => {
    if (!doc) {
        new CounterLeadType({ _id: 'leadtypeid', sequence_value: 0 }).save();
    }
});

// LeadType Schema
const leadTypeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    LeadType: { type: String, required: true }
});

const LeadType = mongoose.model('LeadType', leadTypeSchema);

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
    const result = await CounterLeadType.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );

    const maxIdLeadType = await LeadType.findOne().sort({ id: -1 });
    const maxId = maxIdLeadType ? maxIdLeadType.id : 0;
    
    return maxId + 1; // Return the next available ID
};

// GET endpoint to fetch all lead types
router.get('/', async (req, res) => {
    try {
        const leadTypes = await LeadType.find();
        res.json(leadTypes);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch Lead Types' });
    }
});

// POST endpoint to add a new lead type
router.post('/', async (req, res) => {
    const { LeadType: leadTypeName } = req.body;
    if (!leadTypeName) {
        return res.status(400).json({ error: 'Lead Type is required' });
    }

    try {
        const nextId = await getNextSequenceValue('leadtypeid');

        const newLeadType = new LeadType({
            id: nextId,
            LeadType: leadTypeName
        });

        const savedLeadType = await newLeadType.save();

        res.status(201).json(savedLeadType);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add Lead Type' });
    }
});

// PUT endpoint to update a lead type
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { LeadType: leadTypeName } = req.body;

    if (!leadTypeName) {
        return res.status(400).json({ error: 'Lead Type is required' });
    }

    try {
        const updatedLeadType = await LeadType.findOneAndUpdate(
            { id: parseInt(id) },
            { LeadType: leadTypeName },
            { new: true }
        );

        if (!updatedLeadType) {
            return res.status(404).json({ error: 'Lead Type not found' });
        }

        res.json(updatedLeadType);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to update Lead Type' });
    }
});

// DELETE endpoint to remove a lead type
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLeadType = await LeadType.findOneAndDelete({ id: parseInt(id) });

        if (!deletedLeadType) {
            return res.status(404).json({ error: 'Lead Type not found' });
        }

        // Update IDs of lead types with higher IDs
        await LeadType.updateMany(
            { id: { $gt: deletedLeadType.id } },
            { $inc: { id: -1 } }
        );

        res.status(200).json({ message: 'Lead Type deleted successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to delete Lead Type' });
    }
});

module.exports = router;