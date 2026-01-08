const promClient = require('prom-client');

// Créer un registre pour les métriques
const register = new promClient.Registry();

// Collecter les métriques par défaut (CPU, mémoire, etc.)
promClient.collectDefaultMetrics({ register });

// Métrique : Nombre de requêtes HTTP
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Métrique : Durée des requêtes HTTP
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée des requêtes HTTP en secondes',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Métrique : Nombre d'utilisateurs en base
const usersTotal = new promClient.Gauge({
  name: 'users_total',
  help: 'Nombre total d\'utilisateurs en base de données',
  registers: [register]
});

// Middleware pour tracker les requêtes
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  // Hook sur la réponse
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    // Incrémenter le compteur de requêtes
    httpRequestsTotal.labels(req.method, route, res.statusCode).inc();
    
    // Enregistrer la durée
    httpRequestDuration.labels(req.method, route, res.statusCode).observe(duration);
  });
  
  next();
};

module.exports = {
  register,
  metricsMiddleware,
  usersTotal
};