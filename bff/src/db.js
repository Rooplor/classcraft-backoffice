const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
    throw new Error('MongoDB connection string is not defined');
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
    if (!db) {
        await client.connect();
        db = client.db(dbName);
    }
    return db;
}

module.exports = connectToDatabase;