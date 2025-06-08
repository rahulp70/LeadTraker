const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema for storing the current maximum ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true }
});

const Counter = mongoose.model('Countergroup', counterSchema);

// Initialize the counter for the groups if it doesn't exist
Counter.findById('groupid').then(doc => {
    if (!doc) {
        new Counter({ _id: 'groupid', sequence_value: 0 }).save();
    }
});

// Group Schema
const groupSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    newGroupName: { type: String, required: true }
});

const Group = mongoose.model('Group', groupSchema);

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
    const result = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true } // Upsert ensures the document is created if it doesn't exist
    );

    if (result.sequence_value === 0) {
        // Check if this is the first group
        const count = await Group.countDocuments();
        if (count === 0) {
            return 1; // If no groups exist, start from 1
        }
    }
    
    // Get the maximum ID present in the database
    const maxIdGroup = await Group.findOne().sort({ id: -1 });
    const maxId = maxIdGroup ? maxIdGroup.id : 0;
    
    return maxId + 1; // Return the next available ID
};

// GET endpoint to fetch all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
});

// POST endpoint to add a new group
router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Group name is required' });
    }

    try {
        const nextId = await getNextSequenceValue('groupid');
        const newGroup = new Group({
            id: nextId,
            newGroupName: name
        });
        const savedGroup = await newGroup.save();
        res.status(201).json(savedGroup);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add group' });
    }
});

// PUT endpoint to update a group
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Group name is required' });
    }

    try {
        const updatedGroup = await Group.findOneAndUpdate(
            { id: parseInt(id) },
            { newGroupName: name },
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.json(updatedGroup);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update group' });
    }
});

// DELETE endpoint to remove a group
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // console.log(`Attempting to delete group with id: ${id}`);
        const deletedGroup = await Group.findOneAndDelete({ id: parseInt(id) });

        if (!deletedGroup) {
            // console.error(`Group not found with id: ${id}`);
            return res.status(404).json({ error: 'Group not found' });
        }

        // Update IDs of remaining groups
        await Group.updateMany(
            { id: { $gt: deletedGroup.id } },
            { $inc: { id: -1 } }
        );

        // console.log(`Group with id: ${id} deleted successfully`);
        res.status(200).send('Group deleted successfully');
    } catch (err) {
        // console.error(`Error occurred while deleting group with id: ${id}`, err);
        res.status(500).json({ error: 'Failed to delete group' });
    }
});

module.exports = router;