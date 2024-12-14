const express = require('express');
const connectToDatabase = require('../db');
const router = express.Router();

router.get('/logs', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const logs = await db.collection('logs').find().toArray();
        res.status(200).json(logs);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;