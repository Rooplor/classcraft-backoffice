const express = require('express');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../db');
const logAction = require('../utils/logger');
const router = express.Router();

router.get('/class', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const venue = await db.collection('class').find().toArray();
        res.status(200).json(venue);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/class/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectToDatabase();
        const venue = await db.collection('class').findOne({ _id: new ObjectId(id) });
        res.status(200).json(venue);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.delete('/class/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectToDatabase();
        await db.collection('class').deleteOne({ _id: new ObjectId(id) });
        await logAction('delete', req.user.username);
        res.status(200).send('Class deleted');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;