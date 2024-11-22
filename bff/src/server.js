const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const venueRoutes = require('./routes/venues');
const authenticateToken = require('./middleware/auth');
require('dotenv').config();
const app = express();
const port = 3500;

app.use(cors());
app.use(express.json());
app.use('/api', loginRoutes);
app.use('/api', authenticateToken, registerRoutes);
app.use('/api', authenticateToken, venueRoutes);

app.listen(port, () => {
    console.log(`BFF server running at http://localhost:${port}`);
});