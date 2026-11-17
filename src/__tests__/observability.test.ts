import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  logger,
  measureLatency,
  recordLatencySLA,
  SLA_LATENCY_THRESHOLD_MS,
} from '../lib/logger';

describe('Observabilidade & Logger Estruturado', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve registrar mensagens e sanitizar campos sensíveis como token e senha', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logger.info('Tentativa de autenticação', {
      email: 'usuario@argus.app.br',
      password: 'minhasenhasupersecreta',
      token: 'jwt_secret_token_123',
    });

    expect(consoleSpy).toHaveBeenCalled();
    const loggedArgs = consoleSpy.mock.calls[0];
    const loggedContext = loggedArgs[1];

    expect(loggedContext.email).toBe('usuario@argus.app.br');
    expect(loggedContext.password).toBe('[REDACTED]');
    expect(loggedContext.token).toBe('[REDACTED]');
  });

  it('deve registrar métricas de performance estruturadas', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logger.metric('tempo_resposta_gemini', 320, 'ms', { rota: '/api/edital' });

    expect(consoleSpy).toHaveBeenCalled();
    const loggedArgs = consoleSpy.mock.calls[0];
    expect(loggedArgs[0]).toContain('tempo_resposta_gemini=320ms');
  });

  it('não deve disparar SLA_LATENCY_BREACH quando latência estiver dentro de 1.000 ms', () => {
    const metricSpy = vi.spyOn(logger, 'metric').mockImplementation(() => {});
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});

    const breached = recordLatencySLA('/api/questions', 850, { cached: true });

    expect(breached).toBe(false);
    expect(metricSpy).toHaveBeenCalledWith('api_latency_ms', 850, 'ms', {
      route: '/api/questions',
      cached: 'true',
    });
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('deve disparar alerta SLA_LATENCY_BREACH quando duração ultrapassar 1.000 ms', async () => {
    const metricSpy = vi.spyOn(logger, 'metric').mockImplementation(() => {});
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});

    let currentTick = 10_000;
    vi.spyOn(Date, 'now').mockImplementation(() => currentTick);

    const output = await measureLatency('/api/checkout', async () => {
      currentTick += 1250;
      return { ok: true };
    });

    expect(output).toEqual({ ok: true });
    expect(metricSpy).toHaveBeenCalledWith('api_latency_ms', 1250, 'ms', {
      route: '/api/checkout',
    });
    expect(warnSpy).toHaveBeenCalledWith('SLA_LATENCY_BREACH', {
      route: '/api/checkout',
      durationMs: 1250,
      thresholdMs: SLA_LATENCY_THRESHOLD_MS,
    });
  });
});
