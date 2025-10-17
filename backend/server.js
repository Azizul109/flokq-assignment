// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const partsRoutes = require('./routes/parts');

// Import models to ensure they're registered
require('./models/User');
require('./models/Part');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parts', partsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Auto Parts API'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Auto Parts Inventory API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      parts: '/api/parts',
      health: '/api/health'
    }
  });
});

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    success: false,
    error: 'Internal server error' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 API docs: http://localhost:${PORT}/`);
  console.log(`📁 Uploads served from: http://localhost:${PORT}/uploads/`);
});