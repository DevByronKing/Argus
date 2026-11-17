/**
 * Assinatura e verificação HMAC-SHA256 compatível com Edge Runtime e Node.js
 * usando exclusivamente Web Crypto API (`crypto.subtle`).
 */

export interface SignedAccessPayload {
  v: 1;
  status: 'ativa' | 'trial_ativo';
  isPayingOrCommitted: true;
  planId: string;
  userId?: string;
  lockedExamId?: string;
  trialEndsAt?: string;
  iat: number;
  exp: number;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 =
    typeof btoa === 'function'
      ? btoa(binary)
      : Buffer.from(bytes).toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(str: string): Uint8Array | null {
  try {
    const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4);
    if (typeof atob === 'function') {
      const binary = atob(padded);
      const out = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        out[i] = binary.charCodeAt(i);
      }
      return out;
    }
    return new Uint8Array(Buffer.from(padded, 'base64'));
  } catch {
    return null;
  }
}

/**
 * Comparação em tempo constante sem depender do módulo Node `crypto`.
 */
export function constantTimeEqualStrings(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const bufA = enc.encode(a);
  const bufB = enc.encode(b);
  const maxLen = Math.max(bufA.length, bufB.length);
  let diff = bufA.length ^ bufB.length;
  for (let i = 0; i < maxLen; i++) {
    diff |= (bufA[i] ?? 0) ^ (bufB[i] ?? 0);
  }
  return diff === 0;
}

export function getCookieSigningSecret(): string | null {
  const configured =
    process.env.SESSION_SIGNING_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_API_KEY ||
    '';

  if (configured.trim().length >= 16) {
    return configured.trim();
  }

  // Em produção, falha fechado se nenhum segredo criptográfico estiver configurado
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return 'argus-local-dev-ephemeral-hmac-key-2026';
}

async function computeHmacSha256(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await globalThis.crypto.subtle.sign('HMAC', key, enc.encode(message));
  return toBase64Url(new Uint8Array(sig));
}

export async function signAccessCookiePayload(
  payload: Omit<SignedAccessPayload, 'v' | 'iat' | 'exp'>,
  ttlSeconds = 365 * 24 * 60 * 60
): Promise<string | null> {
  const secret = getCookieSigningSecret();
  if (!secret) return null;

  const now = Date.now();
  const fullPayload: SignedAccessPayload = {
    v: 1,
    ...payload,
    iat: now,
    exp: now + ttlSeconds * 1000,
  };

  const encodedPayload = toBase64Url(new TextEncoder().encode(JSON.stringify(fullPayload)));
  const signature = await computeHmacSha256(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifySignedAccessCookie(
  rawCookieValue: string | undefined
): Promise<SignedAccessPayload | null> {
  if (!rawCookieValue || rawCookieValue.length > 4096) return null;

  const secret = getCookieSigningSecret();
  if (!secret) return null;

  let normalized = rawCookieValue.trim();
  if (normalized.includes('%')) {
    try {
      normalized = decodeURIComponent(normalized);
    } catch {
      return null;
    }
  }

  // Bloqueia cookies JSON legados não assinados (ex.: forjados pelo navegador)
  if (normalized.startsWith('{')) {
    return null;
  }

  const dotIdx = normalized.indexOf('.');
  if (dotIdx <= 0 || dotIdx === normalized.length - 1) {
    return null;
  }

  const encodedPayload = normalized.slice(0, dotIdx);
  const providedSig = normalized.slice(dotIdx + 1);
  if (!encodedPayload || !providedSig || providedSig.includes('.')) {
    return null;
  }

  const expectedSig = await computeHmacSha256(encodedPayload, secret);
  if (!constantTimeEqualStrings(providedSig, expectedSig)) {
    return null;
  }

  const decodedBytes = fromBase64Url(encodedPayload);
  if (!decodedBytes) return null;

  try {
    const parsed = JSON.parse(new TextDecoder().decode(decodedBytes)) as SignedAccessPayload;
    if (
      parsed.v !== 1 ||
      (parsed.status !== 'ativa' && parsed.status !== 'trial_ativo') ||
      parsed.isPayingOrCommitted !== true ||
      typeof parsed.exp !== 'number' ||
      parsed.exp <= Date.now()
    ) {
      return null;
    }

    if (parsed.trialEndsAt && new Date(parsed.trialEndsAt).getTime() <= Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Verifica formato estrutural de JWT (3 segmentos Base64URL com assinatura não vazia)
 * antes de encaminhar para validação completa no backend/Supabase Auth.
 */
export function isValidJwtStructure(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') return false;
  const clean = token.trim();
  if (clean.length < 30 || clean.length > 8192) return false;
  const parts = clean.split('.');
  if (parts.length !== 3) return false;
  const base64UrlRegex = /^[A-Za-z0-9_-]{8,}$/;
  return parts.every((part) => base64UrlRegex.test(part));
}
