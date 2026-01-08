console.log('✅ src/app.js chargé');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/errorHandler');
const { register, metricsMiddleware } = require('./middlewares/metrics');

const app = express();

// 🔹 Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Middleware Prometheus
app.use(metricsMiddleware);

// 🔹 Endpoint Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// 🔹 Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API opérationnelle',
    timestamp: new Date().toISOString()
  });
});

// 🔹 Endpoint racine
app.get('/', (req, res) => {
  res.send('Backend API is running 🚀');
});

// 🔹 Routes API
app.use('/api/users', userRoutes);

// 🔹 Middleware d’erreurs (TOUJOURS à la fin)
app.use(errorHandler);

module.exports = app;
