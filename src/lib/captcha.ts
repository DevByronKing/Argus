/**
 * Verificação server-side de CAPTCHA (Cloudflare Turnstile).
 * Em produção (`NODE_ENV === 'production'`) nunca permite bypass.
 */

export interface CaptchaVerificationResult {
  valid: boolean;
  code?: 'CAPTCHA_REQUIRED' | 'CAPTCHA_INVALID' | 'CAPTCHA_NOT_CONFIGURED';
  error?: string;
}

export async function verifyTurnstileToken(params: {
  token?: string | null;
  remoteIp?: string;
}): Promise<CaptchaVerificationResult> {
  const rawToken = typeof params.token === 'string' ? params.token.trim() : '';
  const isProd = process.env.NODE_ENV === 'production';
  const isTest = process.env.NODE_ENV === 'test';
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();

  // Flag exclusiva para suítes unitárias existentes — NUNCA aceita bypass em produção ou dev HTTP
  const unitTestBypassEnabled =
    !isProd &&
    isTest &&
    process.env.ARGUS_UNIT_TEST_CAPTCHA_BYPASS === 'true';

  if (unitTestBypassEnabled) {
    if (rawToken === 'invalid-captcha-token') {
      return {
        valid: false,
        code: 'CAPTCHA_INVALID',
        error: 'Token de verificação anti-bot inválido.',
      };
    }
    return { valid: true };
  }

  if (!rawToken || rawToken.length < 10) {
    return {
      valid: false,
      code: 'CAPTCHA_REQUIRED',
      error: 'Verificação anti-bot (CAPTCHA Turnstile) obrigatória.',
    };
  }

  if (!secretKey) {
    if (isProd || !isTest) {
      return {
        valid: false,
        code: 'CAPTCHA_NOT_CONFIGURED',
        error: 'Serviço de verificação anti-bot (TURNSTILE_SECRET_KEY) não configurado no servidor.',
      };
    }
    // Em ambiente de teste unitário (sem chave secreta e com flag explícita de mock opcional):
    if (rawToken === 'invalid-captcha-token' || rawToken === 'bad') {
      return {
        valid: false,
        code: 'CAPTCHA_INVALID',
        error: 'Token CAPTCHA inválido.',
      };
    }
    return { valid: true };
  }

  try {
    const formBody = new URLSearchParams({
      secret: secretKey,
      response: rawToken,
      ...(params.remoteIp ? { remoteip: params.remoteIp } : {}),
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      return {
        valid: false,
        code: 'CAPTCHA_INVALID',
        error: 'Falha ao validar desafio CAPTCHA no provedor.',
      };
    }

    const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!result.success) {
      return {
        valid: false,
        code: 'CAPTCHA_INVALID',
        error: 'Desafio anti-bot inválido ou expirado. Atualize a página e tente novamente.',
      };
    }

    return { valid: true };
  } catch {
    return {
      valid: false,
      code: 'CAPTCHA_INVALID',
      error: 'Tempo limite excedido ao validar CAPTCHA Turnstile.',
    };
  }
}
