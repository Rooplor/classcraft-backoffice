const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../db');
require('dotenv').config();
const router = express.Router();

const secretKey = process.env.SECRET_KEY;

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectToDatabase();
    const user = await db.collection('user').findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = router;