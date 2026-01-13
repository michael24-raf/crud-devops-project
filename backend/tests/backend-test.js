// backend/tests/backend-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // 10 utilisateurs virtuels
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.1'],
    errors: ['rate<0.1'],
  },
};

const BASE_URL = 'http://localhost:5500';

export default function () {
  // ✅ Health check
  let healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health check status 200': (r) => r.status === 200,
    'health check success': (r) => r.json('success') === true,
  }) || errorRate.add(1);

  sleep(1);

  // ✅ Récupération de tous les utilisateurs
  let usersRes = http.get(`${BASE_URL}/api/users`);
  check(usersRes, {
    'get users status 200': (r) => r.status === 200,
    'get users returns array': (r) => Array.isArray(r.json('data')),
  }) || errorRate.add(1);

  sleep(1);

  // ✅ Création d’un utilisateur
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

export function handleSummary(data) {
  return { stdout: JSON.stringify(data, null, 2) };
}
