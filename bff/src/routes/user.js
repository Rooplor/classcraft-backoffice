const express = require('express');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../db');
const logAction = require('../utils/logger');
const router = express.Router();

router.get('/user', async (req, res) => {
    const db = await connectToDatabase();
    const users = await db.collection('user').find().toArray();
    res.json(users);
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connectToDatabase();
    const user = await db.collection('user').findOne({ _id: new ObjectId(id) });
    const response = { username: user.username, role: user.role };
    res.json(response);
});

router.post('/user', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectToDatabase();
    await db.collection('user').insertOne({ username, password: hashedPassword, role });
    await logAction('create user', req.user.username);
    res.status(201).send('User registered');
});

router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid user ID');
    }

    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await connectToDatabase();
    const existingUser = await db.collection('user').findOne({ _id: new ObjectId(id) });
    const differences = {};

    for (const key in req.body) {
        if (key === 'password') {
            if (!await bcrypt.compare(req.body.password, existingUser.password)) {
                differences[key] = "Changed password";
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