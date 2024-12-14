const connectToDatabase = require('../db');

const logAction = async (action, username, detail = null) => {
    const db = await connectToDatabase();
    const logEntry = {
        action,
        username,
        detail,
        timestamp: new Date()
    };
    await db.collection('logs').insertOne(logEntry);
};

module.exports = logAction;