const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema for storing the current maximum ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true }
});

const CounterSource = mongoose.model('CounterSource', counterSchema);

CounterSource.findById('sourceid').then(doc => {
    if (!doc) {
        new CounterSource({ _id: 'sourceid', sequence_value: 0 }).save();
    }
});

// Define the schema and model for source types
const sourceSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    newSource: { type: String, required: true }
});

const Source = mongoose.model('Source', sourceSchema);

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
    const result = await CounterSource.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true } // Upsert ensures the document is created if it doesn't exist
    );

    if (result.sequence_value === 0) {
        // Check if this is the first group
        const count = await Source.countDocuments();
        if (count === 0) {
            return 1; // If no groups exist, start from 1
        }
    }
    
    // Get the maximum ID present in the database
    const maxIdSource = await Source.findOne().sort({ id: -1 });
    const maxId = maxIdSource ? maxIdSource.id : 0;
    
    return maxId + 1; // Return the next available ID
};

// GET endpoint to fetch all source types
router.get('/', async (req, res) => {
    try {
        const sources = await Source.find();
        res.json(sources);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch sources' });
    }
});

// POST endpoint to add a new source type
router.post('/', async (req, res) => {
    const { newSource } = req.body;
    if (!newSource) {
        return res.status(400).json({ error: 'Source is required' });
    }

    try {
        const nextId = await getNextSequenceValue();
        const newSourceType = new Source({
            id: nextId,
            newSource
        });
        const savedSourceType = await newSourceType.save();
        res.status(201).json(savedSourceType);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add source' });
    }
});

// PUT endpoint to update a source type
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { newSource } = req.body;

    try {
        const updatedSource = await Source.findOneAndUpdate(
            { id: parseInt(id) },
            { newSource },
            { new: true }
        );

        if (!updatedSource) {
            return res.status(404).json({ error: 'Source not found' });
        }
        res.json(updatedSource);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update source' });
    }
});

// DELETE endpoint to remove a source type
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSource = await Source.findOneAndDelete({ id: parseInt(id) });

        if (!deletedSource) {
            return res.status(404).json({ error: 'Source not found' });
        }

        // Update IDs of remaining sources
        await Source.updateMany(
            { id: { $gt: deletedSource.id } },
            { $inc: { id: -1 } }
        );

        res.status(200).send('Source deleted successfully');
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete source' });
    }
});

module.exports = router;