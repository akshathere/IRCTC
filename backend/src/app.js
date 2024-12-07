const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const trainRoutes = require('./routes/train.routes');
const bookingRoutes = require('./routes/booking.routes');
const userRoutes = require('./routes/users.routes'); // Import the new routes
const cors = require('cors');

const app = express();
app.use(cors());

// Allow specific origins (optional for tighter security)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL for Vite
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods to allow
  credentials: true // Allow cookies if needed
}));
app.use(bodyParser.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api', trainRoutes);
app.use('/api', bookingRoutes);
app.use('/api', userRoutes);

module.exports = app;
