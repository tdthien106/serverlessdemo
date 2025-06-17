const express = require('express');
const app = express();

// Import routes
const productsRouter = require('./products');

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);

// Thêm header CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    next();
  });

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'API Đồ uống đang hoạt động!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint không tồn tại' });
});

// Export the app for Vercel
module.exports = app;