const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import your Employee model
const Employee = require('./Employees');

// Endpoint to handle password reset
router.post('/', async (req, res) => {
    const { token, email, newPassword } = req.body;

    if (!token || !email || !newPassword) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email !== email) {
            return res.status(400).json({ error: 'Invalid token or email' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the employee details in the database
        const updatedEmployee = await Employee.findOneAndUpdate(
            { EmpEmail: email },
            { password: hashedPassword }, // Assuming you have a field for password
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ error: 'An error occurred while resetting the password' });
    }
});

module.exports = router;