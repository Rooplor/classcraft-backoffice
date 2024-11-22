const express = require('express');
const bcrypt = require('bcrypt');
const connectToDatabase = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectToDatabase();
    await db.collection('user').insertOne({ username, password: hashedPassword, role });
    res.status(201).send('User registered');
});

module.exports = router;