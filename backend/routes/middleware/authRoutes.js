// authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

router.post('/login', async (req, res) => {
    // Validate user credentials
    // If credentials are valid, generate JWT token
    const token = jwt.sign({ user: userData }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
