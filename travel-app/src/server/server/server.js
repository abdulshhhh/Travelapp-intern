const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());

// Basic route to test server
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NomadNova API' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Apply routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Test routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Check MongoDB connection
app.get('/api/status', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    status: 'Server is running',
    database: dbStatus,
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});