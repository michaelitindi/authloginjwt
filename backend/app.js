const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const privateRoutes = require('./routes/privateRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://loginjwtfrontend.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

// Connect to database
require('./config/db');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));