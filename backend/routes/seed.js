require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const User = require('../models/User');

// Define the predefined credentials
const preDefinedCredentials = [
    { email: 'admin@example.com', password: 'password123', name: 'Admin' },
    { email: 'dashboard@example.com', password: 'password123', name: 'Dashboard User' },
    { email: 'dashboard_1@example.com', password: 'password123', name: 'Dashboard User 1' },
    { email: 'dashboard_2@example.com', password: 'password123', name: 'Dashboard User 2' }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');

    // Insert predefined credentials
    User.insertMany(preDefinedCredentials)
        .then(() => {
            console.log('Predefined credentials inserted successfully');
            mongoose.connection.close(); // Close the connection after inserting
        })
        .catch(error => {
            console.error('Error inserting predefined credentials:', error);
            mongoose.connection.close(); // Close the connection in case of error
        });
})
.catch(err => console.error('Error connecting to MongoDB:', err));
