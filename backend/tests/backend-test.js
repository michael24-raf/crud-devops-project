import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Compteur d'erreurs personnalisé
const errorRate = new Rate('errors');

// Configuration des scénarios de test
export const options = {
  stages: [
    { duration: '30s', target: 50 },  // montée progressive à 50 VUs
    { duration: '1m', target: 50 },   // maintien 50 VUs
    { duration: '30s', target: 0 },   // descente à 0 VUs
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // seuils de performance
    http_req_failed: ['rate<0.1'],                 // moins de 10% de requêtes échouées
    errors: ['rate<0.1'],
  },
};

// URL de base de ton backend (port-forward)
const BASE_URL = 'http://localhost:5500';

export default function () {
  // Health check
  let healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health check status 200': (r) => r.status === 200,
    'health check success': (r) => r.json('success') === true,
  }) || errorRate.add(1);

  sleep(1);

  // Récupération des utilisateurs
  let usersRes = http.get(`${BASE_URL}/api/users`);
  check(usersRes, {
    'get users status 200': (r) => r.status === 200,
    'get users returns array': (r) => Array.isArray(r.json('data')),
  }) || errorRate.add(1);

  sleep(1);

  // Création d'un utilisateur aléatoire
  const payload = JSON.stringify({
    name: `Test User ${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    age: Math.floor(Math.random() * 50) + 20,
  });

  const params = { headers: { 'Content-Type': 'application/json' } };

  let createRes = http.post(`${BASE_URL}/api/users`, payload, params);
  check(createRes, {
    'create user status 201': (r) => r.status === 201,
    'create user success': (r) => r.json('success') === true,
  }) || errorRate.add(1);

  sleep(1);
}

// Export pour la génération de résumé JSON
export function handleSummary(data) {
  return {
    stdout: JSON.stringify(data, null, 2),  // affichage dans la console
    'summary.json': JSON.stringify(data, null, 2), // sauvegarde locale
  };
}
