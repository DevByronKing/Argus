import { NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { checkDualRateLimit, getClientIp } from '@/lib/rateLimiter';
import { verifyTurnstileToken } from '@/lib/captcha';
import { siemEngine } from '@/lib/siemEngine';
import '@/lib/auditLogger';

/**
 * Fluxo seguro de recuperação de senha:
 * - Rate limit estrito por IP + E-mail (perfil `password_reset`: 3 req/min)
 * - Verificação server-side de CAPTCHA (Cloudflare Turnstile)
 * - Anti-enumeração: sempre retorna resposta genérica 200 sem revelar se o e-mail existe
 */
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Formato de requisição inválido (JSON malformado).' },
        { status: 400 }
      );
    }

    const rawEmail = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!rawEmail || !rawEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Informe um e-mail válido para recuperação de senha.' },
        { status: 400 }
      );
    }

    const rateCheck = await checkDualRateLimit({
      ip,
      identifier: rawEmail,
      profile: 'password_reset',
      namespace: 'auth_password_reset',
    });

    if (!rateCheck.allowed) {
      siemEngine.logEvent({
        eventType: 'BRUTE_FORCE_DETECTED',
        severity: 'HIGH',
        sourceIp: ip,
        details: { route: '/api/auth/forgot-password', scope: rateCheck.scope || 'ip' },
      });
      const retryAfter = Math.max(1, Math.ceil((rateCheck.resetTime - Date.now()) / 1000));
      return NextResponse.json(
        {
          success: false,
          code: 'RATE_LIMIT_EXCEEDED',
          error: 'Muitas solicitações de redefinição. Aguarde alguns instantes antes de tentar novamente.',
          retryAfterSeconds: retryAfter,
        },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    const captchaCheck = await verifyTurnstileToken({
      token: body?.turnstileToken || body?.captchaToken || body?.['cf-turnstile-response'],
      remoteIp: ip,
    });

    if (!captchaCheck.valid) {
      siemEngine.logEvent({
        eventType: 'CAPTCHA_FAILED',
        severity: 'MEDIUM',
        sourceIp: ip,
        details: { route: '/api/auth/forgot-password', code: captchaCheck.code },
      });
      return NextResponse.json(
        {
          success: false,
          code: captchaCheck.code || 'CAPTCHA_INVALID',
          error: captchaCheck.error || 'Verificação anti-bot inválida.',
        },
        { status: captchaCheck.code === 'CAPTCHA_REQUIRED' ? 400 : 403 }
      );
    }

    if (isSupabaseConfigured()) {
      const client = getSupabase();
      if (client) {
        const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '');
        try {
          await client.auth.resetPasswordForEmail(rawEmail, {
            redirectTo: `${appUrl}/auth/callback?type=recovery`,
          });
        } catch {
          // Resposta neutra mantida propositalmente para prevenir enumeração de contas
        }

        return NextResponse.json({
          success: true,
          message:
            'Se o e-mail informado estiver cadastrado, enviaremos instruções de redefinição em instantes.',
        });
      }
    }

    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          code: 'AUTH_SERVICE_UNAVAILABLE',
          error: 'Serviço de recuperação de senha temporariamente indisponível.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        'Se o e-mail informado estiver cadastrado, enviaremos instruções de redefinição em instantes.',
      mode: 'local_dev',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Falha ao processar solicitação de redefinição.' },
      { status: 500 }
    );
  }
}
