const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema for storing the current maximum ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true }
});

const CounterLeads = mongoose.model('CounterLeads', counterSchema);

// Initialize counter if it doesn't exist
CounterLeads.findById('leadsid').then(async (doc) => {
    if (!doc) {
        await new CounterLeads({ _id: 'leadsid', sequence_value: 0 }).save();
    }
});

// Leads Schema
const LeadsSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Custom id
    ClientName: { type: String, required: true },
    ClientEmail: { type: String, required: true },
    ProjectName: { type: String, required: true },
    LeadDate: { type: String, required: true },
    ClientPhone: { type: Number, required: true },
    QuotedValue: { type: Number, required: true },
    ClientContactName: { type: String, required: true },
    Status: { type: String, required: true },
    Source: { type: String, required: true },
    TypeService: { type: String, required: true },
    AssignedGroup: { type: String, required: true },
    LeadType: { type: String, required: true },
    FollowupDate: { type: String,  required: function () {
        // Make FollowupDate required only if Status is not "Won" or "Lost"
        return this.Status !== "Won" && this.Status !== "Lost";
      }, },
      
    Probability: { type: String, default: null },
    Reference: { type: String, default: null },
    attachment: {
        type: String, // File path or URL (e.g., AWS S3 link)
      },
});
const Leads = mongoose.model('Leads', LeadsSchema);

const getNextSequenceValue = async (sequenceName) => {
    try {
        const result = await CounterLeads.findByIdAndUpdate(
            sequenceName,
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        const maxIdLeads = await Leads.findOne().sort({ id: -1 });
        const maxId = maxIdLeads ? maxIdLeads.id : 0;

        return maxId + 1; // Return the next available ID
    } catch (error) {
        console.error('Error in getNextSequenceValue:', error);
        throw error;
    }
};

// GET endpoint to fetch all leads
router.get('/', async (req, res) => {
    try {
        const Lead = await Leads.find();
        res.json(Lead);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
});

// POST endpoint to add a new lead
router.post('/', async (req, res) => {
    const { ClientName, ClientEmail, ProjectName, LeadDate, ClientPhone, QuotedValue, ClientContactName, Status, Source, TypeService, AssignedGroup, LeadType, FollowupDate, Probability, Reference } = req.body;

    if (!ClientName) {
        return res.status(400).json({ error: 'All lead fields are required' });
    }

    try {
        const nextId = await getNextSequenceValue('leadsid');

        const newLead = new Leads({
            id: nextId,
            ClientName,
            ClientEmail,
            ProjectName,
            LeadDate,
            ClientPhone,
            QuotedValue,
            ClientContactName,
            Status,
            Source,
            TypeService,
            AssignedGroup,
            LeadType,
            FollowupDate,
            Probability,
            Reference,
        
        });

        const savedLead = await newLead.save();

        res.status(201).json(savedLead);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add lead' });
    }
});

// PUT endpoint to update a lead
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ClientName, ClientEmail, ProjectName, LeadDate, ClientPhone, QuotedValue, ClientContactName, Status, Source, TypeService, AssignedGroup, LeadType, FollowupDate, Probability, Reference } = req.body;

    if (!ClientName) {
        return res.status(400).json({ error: 'All lead fields are required' });
    }

    try {
        const updatedLead = await Leads.findOneAndUpdate(
            { id: parseInt(id) },
            { ClientName, ClientEmail, ProjectName, LeadDate, ClientPhone, QuotedValue, ClientContactName, Status, Source, TypeService, AssignedGroup, LeadType, FollowupDate, Probability, Reference },
            { new: true }
        );

        if (!updatedLead) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        res.json(updatedLead);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update lead' });
    }
});

// DELETE endpoint to remove a lead
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLead = await Leads.findOneAndDelete({ id: parseInt(id) });

        if (!deletedLead) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        // Update IDs of leads with higher IDs
        await Leads.updateMany(
            { id: { $gt: deletedLead.id } },
            { $inc: { id: -1 } }
        );

        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (err) {
        console.error('Error in deleting lead:', err);
        res.status(500).json({ error: 'Failed to delete lead' });
    }
});

module.exports = {
    Leads,
    CounterLeads,
    router,
};
