import http from 'k6/http';
import { check, group, sleep } from 'k6';

/**
 * Teste de Carga HTTP Real — Argus (k6)
 * Adaptado da escada 100 -> 1.000 usuários simultâneos com SLA < 1.000 ms.
 *
 * Uso:
 *   1) Degrau 100 usuários (10 min):
 *      k6 run -e BASE_URL=https://seu-ambiente.vercel.app -e LOAD_PROFILE=stage100 scripts/load/k6-argus-1000-users.js
 *   2) Pico 1.000 usuários:
 *      k6 run -e BASE_URL=https://seu-ambiente.vercel.app -e LOAD_PROFILE=peak1000 scripts/load/k6-argus-1000-users.js
 */

const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:3000';
const LOAD_PROFILE = __ENV.LOAD_PROFILE || 'stage100';

const PROFILES = {
  stage100: {
    vus: 100,
    duration: '10m',
  },
  peak1000: {
    stages: [
      { duration: '1m', target: 100 },
      { duration: '2m', target: 500 },
      { duration: '3m', target: 1000 },
      { duration: '2m', target: 1000 },
      { duration: '1m', target: 0 },
    ],
  },
};

export const options = {
  ...(PROFILES[LOAD_PROFILE] || PROFILES.stage100),
  thresholds: {
    // Degrau 5: alerta/falha automática se p95 passar de 1 segundo
    http_req_duration: ['p(95)<1000'],
    'http_req_duration{endpoint:landing}': ['p(95)<1000'],
    'http_req_duration{endpoint:edital_ssg}': ['p(95)<1000'],
    'http_req_duration{endpoint:questions_api}': ['p(95)<1000'],
    http_req_failed: ['rate<0.01'],
  },
};

const BANCAS = ['Cebraspe', 'FGV', 'FCC', 'Vunesp', 'Cesgranrio'];

export default function () {
  group('01_landing_inicial', () => {
    const res = http.get(`${BASE_URL}/`, {
      tags: { endpoint: 'landing' },
    });
    check(res, {
      'landing status 200': (r) => r.status === 200,
      'landing < 1s': (r) => r.timings.duration < 1000,
    });
  });

  group('02_edital_seo_ssg', () => {
    const res = http.get(`${BASE_URL}/edital/inss-tecnico-seguro-social-2026`, {
      tags: { endpoint: 'edital_ssg' },
    });
    check(res, {
      'edital status 200': (r) => r.status === 200,
      'edital < 1s': (r) => r.timings.duration < 1000,
    });
  });

  group('03_questions_catalog_api', () => {
    const banca = BANCAS[Math.floor(Math.random() * BANCAS.length)];
    const res = http.get(`${BASE_URL}/api/questions?banca=${encodeURIComponent(banca)}&limit=20`, {
      tags: { endpoint: 'questions_api' },
    });
    check(res, {
      'questions status 200': (r) => r.status === 200,
      'questions < 1s': (r) => r.timings.duration < 1000,
    });
  });

  sleep(1);
}
