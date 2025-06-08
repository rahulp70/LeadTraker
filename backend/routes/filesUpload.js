const express = require('express');
const router = express.Router();
const multer = require('multer');
const FilesUpload = require('../models/FilesUpload'); // Import FilesUpload model
const CounterLeads = require('../models/Leads').CounterLeads;
const {Leads} = require('../models/Leads');
const upload = multer();

// Helper function to get the next sequence value for FilesUpload
const getNextSequenceValue = async (sequenceName) => {
    try {
        const result = await CounterLeads.findByIdAndUpdate(
            sequenceName,
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        return result.sequence_value;
    } catch (error) {
        console.error('Error in getNextSequenceValue:', error);
        throw error;
    }
};


router.post('/', upload.single('file'), async (req, res) => {
    const { leadId } = req.body; // Get leadId from the request body
    const file = req.file; // Get the file from the request

    if (!leadId || !file) {
        return res.status(400).json({ error: 'leadId and file are required' });
    }

    try {
        // Check if the leadId exists in the Leads collection
        const lead = await Leads.findOne({ id: leadId });  // This should be valid now

        if (!lead) {
            return res.status(404).json({ error: 'Lead ID not found' });
        }

        // Proceed to create the new file upload
        const nextId = await getNextSequenceValue('filesuploadid');
        const newFileUpload = new FilesUpload({
            id: nextId,
            fileName: file.originalname,
            leadId,
            file: file.buffer,
        });

        const savedFileUpload = await newFileUpload.save();
        res.status(201).json(savedFileUpload);

    } catch (err) {
        console.error('Error in saving file upload:', err);
        res.status(500).json({ error: 'Failed to save file upload' });
    }
});

// GET API to fetch file upload data by leadId
router.get('/:leadId', async (req, res) => {
    const { leadId } = req.params;

    try {
        const files = await FilesUpload.find({ leadId: parseInt(leadId) });

        if (!files || files.length === 0) {
            return res.status(404).json({ error: 'No files found for the given Lead ID' });
        }

        // If you want to send the file content (binary data) along with the metadata:
        const fileData = files.map(file => ({
            id: file.id,
            fileName: file.fileName,
            leadId: file.leadId,
            fileContent: file.file.toString('base64') // Convert binary data to base64 for JSON response
        }));

        res.json(fileData); // Send file metadata and file content as base64
    } catch (err) {
        console.error('Error in fetching files:', err);
        res.status(500).json({ error: 'Failed to fetch files' });
    }
});

// Download file by fileName
router.get('/download/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../../uploads', fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).json({ error: 'Failed to download file' });
        }
    });
});

module.exports = router;