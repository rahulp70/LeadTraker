const express = require('express');
const router = express.Router();
const upload = require('./middleware/multer');
const mongoose = require('mongoose');
const { Leads } = require('../models/Leads'); // Import the Leads model properly


router.post('/', upload.single('file'), async (req, res) => {


  

  try {
    const { id } = req.body; // Lead ID passed from frontend
    console.log("request body",req.body);
    const filePath = req.file ? req.file.path : null; // Path to the uploaded file
    console.log("file path",filePath);
    console.log("leads data", Leads);
    console.log(id);
    
    

    

    if (!filePath) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    let objectId;

    if (mongoose.Types.ObjectId.isValid(id)) {
      // If it's a valid ObjectId, use it as an ObjectId
      objectId = new mongoose.Types.ObjectId(id);
    } else if (typeof id === 'string' && id.trim() !== '') {
      // If it's not a valid ObjectId but it's a non-empty string, treat it as a custom ID
      objectId = id;
    } else {
      // Return error for invalid ID
      return res.status(400).json({ error: 'Invalid ID format' });
    }
     
    // Update the lead report with the file path
    const updatedLead = await Leads.findOneAndUpdate(
      { id: parseInt(id) },
      { $set: { attachment: filePath } }, // Update operation
      { new: true } // Return the updated document
    );

    if (!updatedLead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.status(200).json({ message: 'File uploaded successfully', updatedLead });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}); 


/*router.post('/', upload.single('file'), async (req, res) => {
  try {
      const { id } = req.body;

      // Validate file upload
      if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }

      // Update the lead report with the file path
      const updatedLead = await Leads.findOneAndUpdate(
          { _id: id },
          { $set: { attachment: req.file.path } },
          { new: true }
      );

      if (!updatedLead) {
          return res.status(404).json({ error: 'Lead not found' });
      }

      res.status(200).json({ message: 'File uploaded successfully', updatedLead });
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
  }
});*/



module.exports = router;
