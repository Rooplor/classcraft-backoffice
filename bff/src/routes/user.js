const express = require('express');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../db');
const logAction = require('../utils/logger');
const router = express.Router();

router.post('/user', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectToDatabase();
    await db.collection('user').insertOne({ username, password: hashedPassword, role });
    res.status(201).send('User registered');
});

router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectToDatabase();
    const existingUser = await db.collection('user').findOne({ _id: new ObjectId(id) });
    const differences = {};

    for (const key in req.body) {
        if (key === 'password') {
            if (!await bcrypt.compare(req.body.password, existingUser.password)) {
                differences[key] = { from: existingUser[key], to: hashedPassword };
            }
        } else if (req.body[key] !== existingUser[key]) {
            differences[key] = { from: existingUser[key], to: req.body[key] };
        }
    }

    await db.collection('user').updateOne({ _id: new ObjectId(id) }, { $set: { username, password: hashedPassword, role } });
    await logAction('update user', req.user.username, differences);

    res.status(200).send('User updated');
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connectToDatabase();
    await db.collection('user').deleteOne({ _id: new ObjectId(id) });
    await logAction('delete user', req.user.username);
    res.status(200).send('User deleted');
});

module.exports = router;