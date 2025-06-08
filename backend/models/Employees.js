const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const newUserSchema = new mongoose.Schema({
    EmpFirstName: { type: String, required: true },
    EmpEmail: { type: String, required: true, unique: true },
    EmpAuthLevel: { type: String, required: true },
    password: { type: String, required: true } // Password should be hashed for security
});

const NewUser = mongoose.model('NewUser', newUserSchema);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Disable certificate verification
    }
});

// Schema for storing the current maximum ID
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true }
});

const CounterEmployee = mongoose.model('CounterEmployee', counterSchema);

// Initialize counter if it doesn't exist
CounterEmployee.findById('employeeid').then(doc => {
    if (!doc) {
        new CounterEmployee({ _id: 'employeeid', sequence_value: 0 }).save();
    }
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    EmpFirstName: { type: String, required: true },
    EmpLastName: { type: String, required: true },
    EmpEmail: { type: String, required: true },
    EmpAuthLevel: { type: String, required: true },
    EmpPhone: { type: String, required: true },
    EmpGroups: { type: [String], required: true },
});
const Employee = mongoose.model('Employee', employeeSchema);

// Function to get the next sequence value
const getNextSequenceValue = async (sequenceName) => {
    const result = await CounterEmployee.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );

    const maxIdEmployee = await Employee.findOne().sort({ id: -1 });
    const maxId = maxIdEmployee ? maxIdEmployee.id : 0;
    
    return maxId + 1; // Return the next available ID
};

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'apurvjadhav4554@gmail.com',
            to: to,
            subject: subject,
            text: text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Add a route for password reset and user registration
router.post('/reset-password', async (req, res) => {
    const { email, name, authlevel, newPassword } = req.body;

    if (!email || !name || !authlevel || !newPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if a user with the same email already exists
        const existingUser = await NewUser.findOne({ EmpEmail: email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the newPassword
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Save the user in the newUsers schema
        const newUser = new NewUser({
            EmpFirstName: name,
            EmpEmail: email,
            EmpAuthLevel: authlevel,
            password: hashedPassword
        });

        await newUser.save();

        // Return success response
        res.status(200).json({ message: 'Password reset and registration successful' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Duplicate email error' });
        }
        console.error(err);
        res.status(500).json({ error: 'An error occurred while resetting password and registering user' });
    }
});

// Add a route for forgot password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Check if the user with the provided email exists
        const user = await NewUser.findOne({ EmpEmail: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract required user information
        const { EmpFirstName, EmpAuthLevel } = user;

        // Generate a password reset token
        const resetToken = jwt.sign({ email: user.EmpEmail }, 'your_reset_token_secret', { expiresIn: '1h' });

        // Send email with password reset link
        const resetLink = `http://localhost:3000/resetpw?token=${resetToken}&EmpFirstName=${encodeURIComponent(EmpFirstName)}&EmpAuthLevel=${encodeURIComponent(EmpAuthLevel)}&EmpEmail=${encodeURIComponent(email)}`;
        const emailSubject = 'Password Reset';
        const emailText = `Hello ${EmpFirstName},\n\nYou have requested to reset your password. Click on the link below to reset your password:\n\n${resetLink}`;
        await sendEmail(user.EmpEmail, emailSubject, emailText);

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error during forgot password process:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

// Add a route for updating user password
router.put('/update-password', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Email and new password are required' });
    }

    try {
        // Check if a user with the provided email exists
        const existingUser = await NewUser.findOne({ EmpEmail: email });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        existingUser.password = hashedPassword;

        // Save the updated user
        await existingUser.save();

        // Return success response
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the password' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill all the fields' });
    }

    try {
        const user = await NewUser.findOne({ EmpEmail: email });
        if (!user) {
            return res.status(401).json({ error: 'Incorrect Login Credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect Login Credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ email: user.EmpEmail, name: user.EmpFirstName }, 'your_jwt_secret', { expiresIn: '1h' });

        // Set dashboard URL based on user authentication level
        let dashboardUrl;
        switch (user.EmpAuthLevel) {
            case 'L1':
                dashboardUrl = '/dashboard_1';
                break;
            case 'L2':
                dashboardUrl = '/dashboard_2';
                break;
            case 'L3':
                dashboardUrl = '/dashboard_3';
                break;
            case 'L0':
                dashboardUrl = '/dashboard';
        }

        res.status(200).json({ dashboardUrl, name: user.EmpFirstName, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});


// POST endpoint to receive employee data from frontend
router.post('/', async (req, res) => {
    const { EmpFirstName, EmpLastName, EmpPhone, EmpEmail, EmpAuthLevel, EmpGroups } = req.body;

    if (!EmpFirstName || !EmpLastName || !EmpPhone || !EmpEmail || !EmpAuthLevel) {
        return res.status(400).json({ error: 'All employee fields are required' });
    }

    try {
        // Check if an employee with the same email already exists
        const existingEmployee = await Employee.findOne({ EmpEmail });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee with this email already exists' });
        }

        const nextId = await getNextSequenceValue('employeeid');

        const newEmployee = new Employee({
            id: nextId,
            EmpFirstName,
            EmpLastName,
            EmpPhone,
            EmpEmail,
            EmpAuthLevel,
            EmpGroups
        });

        const savedEmployee = await newEmployee.save();

        console.log(process.env.EMAIL_USER);

        // Send email to the added employee
        const emailSubject = 'QTrackr Registration';
        const emailText = `Hello ${EmpFirstName},\n\nWelcome to Qtrackr! We're glad to have you on board at ${EmpAuthLevel} post.\n\nClick on the link below to setup your account!\n\nhttp://localhost:3000/setpw?email=${encodeURIComponent(EmpEmail)}&authlevel=${encodeURIComponent(EmpAuthLevel)}&name=${encodeURIComponent(EmpFirstName)}}`;
        await sendEmail(EmpEmail, emailSubject, emailText);

        res.status(201).json(savedEmployee);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Duplicate email error' });
        }
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

// GET endpoint to retrieve all posted employee data
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// PUT endpoint to update an employee by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { EmpFirstName, EmpLastName, EmpPhone, EmpEmail, EmpAuthLevel, EmpGroups } = req.body;

    if (!EmpFirstName || !EmpLastName || !EmpPhone || !EmpEmail || !EmpAuthLevel) {
        return res.status(400).json({ error: 'All employee fields are required' });
    }

    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { id: parseInt(id) },
            { EmpFirstName, EmpLastName, EmpPhone, EmpEmail, EmpAuthLevel, EmpGroups },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(updatedEmployee);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to update employee' });
    }
});

// DELETE endpoint to remove an employee by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the employee to get their email
        const employeeToDelete = await Employee.findOne({ id: parseInt(id) });
        if (!employeeToDelete) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Delete the employee from the Employee collection
        const deletedEmployee = await Employee.findOneAndDelete({ id: parseInt(id) });

        // Also delete the corresponding user from the NewUser collection
        const deletedUser = await NewUser.findOneAndDelete({ EmpEmail: deletedEmployee.EmpEmail });

        // Update IDs of employees with higher IDs
        await Employee.updateMany(
            { id: { $gt: deletedEmployee.id } },
            { $inc: { id: -1 } }
        );

        res.status(200).json({ message: 'Employee and associated user deleted successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to delete employee and associated user' });
    }
});

module.exports = router;