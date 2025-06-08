const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const users = [
    {
        email: 'user1@example.com',
        password: process.env.PASS1,
        dashboardUrl: '/dashboard_1',
        name: 'UserOne'
    },
    {
        email: 'user2@example.com',
        password: process.env.PASS2,
        dashboardUrl: '/dashboard_2',
        name: 'UserTwo'
    },
    {
        email: 'user3@example.com',
        password: process.env.PASS3,
        dashboardUrl: '/dashboard_3',
        name: 'UserThree'
    }
];

const JWT_SECRET = 'your_jwt_secret_key';

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (user && user.password === password) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            dashboardUrl: user.dashboardUrl,
            token,
            name: user.name
        });
    } else {
        res.status(401).json({
            message: 'Incorrect Login Credentials'
        });
    }
});

module.exports = router;