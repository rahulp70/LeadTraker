const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
//const Leads = require('./models/Leads');
const { router: leadsRouter } = require('./models/Leads');
const Employees = require('./models/Employees');
const ServiceType = require('./models/ServiceType');
const LeadType = require('./models/LeadType');
const Status = require('./models/Status');
const Source = require('./models/Source');
const AddGroup = require('./models/AddGroup');
const authRoutes = require('./routes/auth');
const filesUploadRouter = require('./routes/filesUpload')
                         
const fs = require('fs');

require('dotenv').config();

const app = express();
const PORT = 9000;


// Ensure uploads directory exists
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);
app.use('/leads', leadsRouter);
app.use('/employees', Employees);
app.use('/serviceTypes', ServiceType);
app.use('/leadTypes', LeadType);
app.use('/status', Status);
app.use('/source', Source);
app.use('/groups', AddGroup);
app.use('/api/files', filesUploadRouter);



const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes'); // Adjust the path as needed

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/upload', uploadRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Endpoint for downloading a file
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log(filename);
  const filePath = path.join(__dirname, 'uploads', filename); // Adjust the path if necessary

  // Attempt to download the file
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('File not found or error downloading file.');
    }
  });
});
