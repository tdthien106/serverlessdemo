const express = require('express');
const app = express();

// Import routes
const productsRouter = require('./products');

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);

// Middleware CORS chi tiết
app.use((req, res, next) => {
    const allowedOrigins = [
      'https://serverlessdemo-f030kswf3-serverlesssdemo.vercel.app',
      'https://serverlessdemo-git-main-serverlesssdemo.vercel.app'
    ];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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