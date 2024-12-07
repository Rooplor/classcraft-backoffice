const express = require('express');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../db');
const router = express.Router();

router.get('/venue', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const venue = await db.collection('venue').find().toArray();
        res.status(200).json(venue);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/venue/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectToDatabase();
        const venue = await db.collection('venue').findOne({ _id: new ObjectId(id) });
        res.status(200).json(venue);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/venue', async (req, res) => {
    try {
        const { room, location, description, capacity, imageUrl } = req.body;
        const newVenue = { room, location, description, capacity, imageUrl };
        const db = await connectToDatabase();
        await db.collection('venue').insertOne(newVenue);
        res.status(201).send('Venue created');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/venue/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { room, location, description, capacity, imageUrl } = req.body;
        const updatedVenue = { room, location, description, capacity, imageUrl };
        const db = await connectToDatabase();
        await db.collection('venue').updateOne({ _id: new ObjectId(id) }, { $set: updatedVenue });
        res.status(200).send('Venue updated');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.delete('/venue/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await connectToDatabase();
        await db.collection('venue').deleteOne({ _id: new ObjectId(id) });
        res.status(200).send('Venue deleted');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;