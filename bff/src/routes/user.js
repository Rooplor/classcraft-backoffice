const express = require('express');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../db');
const logAction = require('../utils/logger');
const { deepEqual } = require('../utils/objectHelper');
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

    for (const key in { username, password: hashedPassword, role }) {
        if (key === 'location') {
            if (!deepEqual(req.body[key], existingUser[key])) {
                differences[key] = { from: existingUser[key], to: req.body[key] };
            }
        } else if (req.body[key] !== existingUser[key]) {
            differences[key] = { from: existingUser[key], to: req.body[key] };
        }
    }

    await db.collection('user').updateOne({ _id: new ObjectId(id) }, { $set: { username, password: hashedPassword, role } });
    await logAction('update', req.user.username, differences);

    res.status(200).send('User updated');
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connectToDatabase();
    await db.collection('user').deleteOne({ _id: new ObjectId(id) });
    res.status(200).send('User deleted');
});

module.exports = router;