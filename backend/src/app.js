const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de santé (health check)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API opérationnelle',
    timestamp: new Date().toISOString()
  });
});

// Routes API
app.use('/api/users', userRoutes);

// Middleware de gestion d'erreurs (doit être à la fin)
app.use(errorHandler);

module.exports = app;