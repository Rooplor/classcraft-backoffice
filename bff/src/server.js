const express = require('express');
const cors = require('cors');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/user');
const venueRoutes = require('./routes/venues');
const classroomRoutes = require('./routes/classroom');
const logsRoutes = require('./routes/logs');
const authenticateToken = require('./middleware/auth');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', loginRoutes);
app.use('/api', authenticateToken, registerRoutes);
app.use('/api', authenticateToken, venueRoutes);
app.use('/api', authenticateToken, classroomRoutes);
app.use('/api', authenticateToken, logsRoutes);

app.listen(port, () => {
    console.log(`BFF server running at http://localhost:${port}`);
});