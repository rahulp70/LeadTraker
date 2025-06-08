const mongoose = require('mongoose');

// Schema for FilesUpload
const FilesUploadSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Custom ID
    fileName: { type: String, required: true },         // Name of the file
    leadId: { type: Number, required: true },           // Associated Lead ID
    file: { type: Buffer, required: true },             // File data (binary data)
});

// FilesUpload Model
const FilesUpload = mongoose.model('FilesUpload', FilesUploadSchema);

module.exports = FilesUpload;