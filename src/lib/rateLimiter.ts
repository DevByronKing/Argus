import { logger } from './logger';
import { getSupabaseServiceRole, isSupabaseServiceRoleConfigured } from './supabase';

/**
 * Argus - WAF & Rate Limiter Híbrido (Memória L1 + Upstash Redis / Supabase RPC + IP Jail)
 * Proteção contra flood de requisições, ataques de força bruta, bots e esgotamento de infraestrutura.
 * Suporta Cloudflare Reverse Proxy (cf-connecting-ip), X-Forwarded-For e X-Real-IP.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
  violationsCount?: number;
}

interface BannedIpRecord {
  bannedUntil: number;
  reason: string;
}

const ipCache = new Map<string, RateLimitRecord>();
const ipJail = new Map<string, BannedIpRecord>();

// Limpeza automática periódica de registros e bans expirados
if (typeof setInterval !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipCache.entries()) {
      if (now > record.resetTime) {
        ipCache.delete(ip);
      }
    }
    for (const [ip, record] of ipJail.entries()) {
      if (now > record.bannedUntil) {
        ipJail.delete(ip);
      }
    }
  }, 120000); // Executa a cada 2 minutos
  if (timer && typeof timer.unref === 'function') {
    timer.unref();
  }
}

export type RateLimitProfile =
  | 'general'
  | 'auth'
  | 'ai'
  | 'admin'
  | 'checkout'
  | 'password_reset'
  | 'public_probes';

export const RATE_LIMIT_PROFILES: Record<RateLimitProfile, { limit: number; windowMs: number }> = {
  general: { limit: 60, windowMs: 60000 },       // 60 req/min
  auth: { limit: 10, windowMs: 60000 },          // 10 tentativas de login/registro por min (anti-brute-force)
  checkout: { limit: 5, windowMs: 60000 },       // 5 tentativas de checkout/min por IP e por e-mail
  password_reset: { limit: 3, windowMs: 60000 }, // 3 pedidos de recuperação de senha/min
  ai: { limit: 20, windowMs: 60000 },            // 20 chamadas de LLM por min
  admin: { limit: 15, windowMs: 60000 },         // 15 req/min para rotas administrativas
  public_probes: { limit: 5, windowMs: 60000 },  // 5 tentativas em rotas suspeitas
};

/**
 * Verifica se um endereço IP está temporariamente bloqueado no WAF IP Jail.
 */
export function isIpBanned(ip: string): { banned: boolean; reason?: string; retryAfterSeconds?: number } {
  const now = Date.now();
  const banRecord = ipJail.get(ip);
  if (!banRecord) return { banned: false };

  if (now > banRecord.bannedUntil) {
    ipJail.delete(ip);
    return { banned: false };
  }

  const retryAfterSeconds = Math.ceil((banRecord.bannedUntil - now) / 1000);
  return { banned: true, reason: banRecord.reason, retryAfterSeconds };
}

/**
 * Coloca um IP no IP Jail (bloqueio temporário).
 */
export function banIp(ip: string, reason = 'Tentativas abusivas repetidas', durationMs = 15 * 60 * 1000): void {
  ipJail.set(ip, {
    bannedUntil: Date.now() + durationMs,
    reason,
  });
  logger.warn('IP_JAILED', {
    sourceIp: ip,
    reason,
    durationMs,
  });
}

/**
 * Remove IP do jail (para testes e unban administrativo).
 */
export function unbanIp(ip: string): void {
  ipJail.delete(ip);
}

/**
 * Valida se um IP ultrapassou a cota de requisições na janela de tempo especificada.
 */
export function checkRateLimit(
  ip: string,
  limit = 20,
  windowMs = 60000
): { allowed: boolean; remaining: number; resetTime: number; isJailed?: boolean } {
  // 1. Checa se o IP já está bloqueado
  const banStatus = isIpBanned(ip);
  if (banStatus.banned) {
    return { allowed: false, remaining: 0, resetTime: Date.now() + (banStatus.retryAfterSeconds || 60) * 1000, isJailed: true };
  }

  const now = Date.now();
  const record = ipCache.get(ip);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    ipCache.set(ip, { count: 1, resetTime, violationsCount: record?.violationsCount || 0 });
    return { allowed: true, remaining: limit - 1, resetTime };
  }

  if (record.count >= limit) {
    record.violationsCount = (record.violationsCount || 0) + 1;
    // Se violou o limite 4 vezes seguidas, aplica ban temporário de 15 minutos
    if (record.violationsCount >= 4) {
      banIp(ip, 'Violação contínua de Rate Limit (WAF Jail)', 15 * 60 * 1000);
      return { allowed: false, remaining: 0, resetTime: now + 900000, isJailed: true };
    }
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

/**
 * Valida rate limit utilizando perfis pré-definidos de segurança.
 */
export function checkRateLimitWithProfile(
  ip: string,
  profile: RateLimitProfile
): { allowed: boolean; remaining: number; resetTime: number; isJailed?: boolean } {
  const config = RATE_LIMIT_PROFILES[profile] || RATE_LIMIT_PROFILES.general;
  return checkRateLimit(ip, config.limit, config.windowMs);
}

/**
 * Rate limiter distribuído para ambiente Serverless:
 * 1) Upstash Redis REST (`UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`), quando configurado;
 * 2) Contador persistente via RPC PostgreSQL `increment_rate_limit` no Supabase;
 * 3) Fallback em memória (`checkRateLimit`) para desenvolvimento local e testes unitários.
 */
export async function checkDistributedRateLimit(params: {
  key: string;
  limit: number;
  windowMs: number;
  ip?: string;
}): Promise<{ allowed: boolean; remaining: number; resetTime: number; isJailed?: boolean; backend: 'upstash' | 'supabase' | 'memory' }> {
  const { key, limit, windowMs, ip } = params;

  if (ip) {
    const banStatus = isIpBanned(ip);
    if (banStatus.banned) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: Date.now() + (banStatus.retryAfterSeconds || 60) * 1000,
        isJailed: true,
        backend: 'memory',
      };
    }
  }

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (upstashUrl && upstashToken) {
    try {
      const redisKey = `argus:rl:${key}`;
      const res = await fetch(`${upstashUrl.replace(/\/$/, '')}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['INCR', redisKey],
          ['PEXPIRE', redisKey, windowMs, 'NX'],
          ['PTTL', redisKey],
        ]),
      });

      if (res.ok) {
        const data = (await res.json()) as Array<{ result?: number }>;
        const count = Number(data?.[0]?.result ?? 1);
        const pttl = Math.max(1000, Number(data?.[2]?.result ?? windowMs));
        return {
          allowed: count <= limit,
          remaining: Math.max(0, limit - count),
          resetTime: Date.now() + pttl,
          backend: 'upstash',
        };
      }
    } catch {
      // Continua para próxima camada
    }
  }

  if (
    typeof (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime === 'undefined' &&
    isSupabaseServiceRoleConfigured()
  ) {
    const client = getSupabaseServiceRole();
    if (client) {
      try {
        const { data, error } = await client.rpc('increment_rate_limit', {
          p_key: key,
          p_limit: limit,
          p_window_ms: windowMs,
        });

        if (!error && data && typeof data === 'object') {
          const record = Array.isArray(data) ? data[0] : data;
          if (record && typeof record.allowed === 'boolean') {
            return {
              allowed: record.allowed,
              remaining: Number(record.remaining ?? 0),
              resetTime: record.reset_at ? new Date(record.reset_at).getTime() : Date.now() + windowMs,
              backend: 'supabase',
            };
          }
        }
      } catch {
        // Fallback em memória garante disponibilidade caso a RPC ainda não tenha sido aplicada
      }
    }
  }

  const mem = checkRateLimit(key, limit, windowMs);
  return { ...mem, backend: 'memory' };
}

/**
 * Aplica rate limit duplo simultâneo por IP e por identificador (ex.: e-mail ou userId).
 */
export async function checkDualRateLimit(params: {
  ip: string;
  identifier?: string | null;
  profile: RateLimitProfile;
  namespace: string;
}): Promise<{ allowed: boolean; remaining: number; resetTime: number; isJailed?: boolean; scope?: 'ip' | 'identifier' }> {
  const config = RATE_LIMIT_PROFILES[params.profile] || RATE_LIMIT_PROFILES.general;

  const ipResult = await checkDistributedRateLimit({
    key: `${params.namespace}:ip:${params.ip}`,
    limit: config.limit,
    windowMs: config.windowMs,
    ip: params.ip,
  });

  if (!ipResult.allowed) {
    return { ...ipResult, scope: 'ip' };
  }

  const cleanId = params.identifier?.trim().toLowerCase();
  if (cleanId) {
    const idResult = await checkDistributedRateLimit({
      key: `${params.namespace}:id:${cleanId}`,
      limit: config.limit,
      windowMs: config.windowMs,
    });
    if (!idResult.allowed) {
      return { ...idResult, scope: 'identifier' };
    }
    return {
      allowed: true,
      remaining: Math.min(ipResult.remaining, idResult.remaining),
      resetTime: Math.max(ipResult.resetTime, idResult.resetTime),
    };
  }

  return ipResult;
}

/**
 * Extrai de forma segura o endereço IP do cliente a partir dos cabeçalhos HTTP.
 * Prioriza Cloudflare (cf-connecting-ip), depois X-Forwarded-For, depois X-Real-IP.
 */
export function getClientIp(req: Request): string {
  // 1. Cloudflare Proxy
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }

  // 2. Standard Reverse Proxy (Nginx, AWS ALB, Vercel)
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // 3. Real IP header
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // 4. True-Client-IP (Akamai, Cloudflare Enterprise)
  const trueClientIp = req.headers.get('true-client-ip');
  if (trueClientIp) {
    return trueClientIp.trim();
  }

  return '127.0.0.1';
}
