import { NextResponse } from 'next/server';
import { getSupabase, getSupabaseServiceRole, isSupabaseConfigured } from '@/lib/supabase';
import { checkDualRateLimit, getClientIp } from '@/lib/rateLimiter';
import { siemEngine } from '@/lib/siemEngine';
import '@/lib/auditLogger';
import { signAccessCookiePayload } from '@/lib/signedAccessToken';

function isConfiguredAdminIdentity(userId: string, email?: string | null, emailConfirmed?: boolean): boolean {
  const allowedIds = new Set(
    (process.env.ADMIN_USER_IDS || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
  if (allowedIds.has(userId.toLowerCase())) return true;

  const allowedEmails = new Set(
    (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
  if (email && emailConfirmed && allowedEmails.has(email.trim().toLowerCase())) {
    return true;
  }
  return false;
}

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

    const { email, password } = body || {};

    // Rate limiting distribuído duplo (IP + E-mail)
    const rateCheck = await checkDualRateLimit({
      ip,
      identifier: typeof email === 'string' ? email : undefined,
      profile: 'auth',
      namespace: 'auth_login',
    });

    if (!rateCheck.allowed) {
      siemEngine.logEvent({
        eventType: 'BRUTE_FORCE_DETECTED',
        severity: 'HIGH',
        sourceIp: ip,
        details: { route: '/api/auth/login', scope: rateCheck.scope || 'ip' },
      });
      const retryAfter = Math.max(1, Math.ceil((rateCheck.resetTime - Date.now()) / 1000));
      return NextResponse.json(
        {
          success: false,
          error: 'Muitas tentativas de login consecutivas. Aguarde 1 minuto para tentar novamente.',
          retryAfterSeconds: retryAfter,
        },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const client = getSupabase();
      if (client) {
        const cleanEmail = String(email).trim().toLowerCase();
        const { data, error } = await client.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (error || !data.user) {
          siemEngine.logEvent({
            eventType: 'AUTH_FAILED',
            severity: 'MEDIUM',
            sourceIp: ip,
            details: { route: '/api/auth/login', attemptedEmail: cleanEmail },
          });
          return NextResponse.json(
            { success: false, error: error?.message || 'Credenciais inválidas.' },
            { status: 401 }
          );
        }

        const serviceClient = getSupabaseServiceRole();
        const emailConfirmed = Boolean(data.user.email_confirmed_at || data.user.confirmed_at);
        let isAdmin = isConfiguredAdminIdentity(data.user.id, data.user.email, emailConfirmed);

        let profileData: { subscription_tier?: string; subscription_status?: string } | null = null;
        if (serviceClient) {
          if (!isAdmin) {
            try {
              const { data: allowRow } = await serviceClient
                .from('admin_allowlist')
                .select('is_active')
                .eq('is_active', true)
                .or(
                  data.user.email && emailConfirmed
                    ? `user_id.eq.${data.user.id},email.eq.${data.user.email.toLowerCase()}`
                    : `user_id.eq.${data.user.id}`
                )
                .limit(1)
                .maybeSingle();
              if (allowRow?.is_active) isAdmin = true;
            } catch {}
          }

          try {
            const { data: prof } = await serviceClient
              .from('profiles')
              .select('subscription_tier, subscription_status')
              .eq('id', data.user.id)
              .maybeSingle();
            profileData = prof;
          } catch {}
        }

        const response = NextResponse.json({
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email,
            role: isAdmin ? 'admin' : 'student',
            isAdmin,
          },
          session: {
            accessToken: data.session?.access_token,
            expiresAt: data.session?.expires_at,
          },
          mode: 'supabase',
        });

        if (data.session?.access_token) {
          response.cookies.set('argus-session', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
          });
        }

        if (
          profileData?.subscription_status === 'active' &&
          profileData.subscription_tier &&
          ['lancamento', 'pro', 'elite', 'black'].includes(profileData.subscription_tier)
        ) {
          const signedAccess = await signAccessCookiePayload({
            status: 'ativa',
            isPayingOrCommitted: true,
            planId: profileData.subscription_tier,
            userId: data.user.id,
          });
          if (signedAccess) {
            response.cookies.set('argus_user_access', signedAccess, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 365 * 24 * 60 * 60,
              path: '/',
            });
          }
        }

        return response;
      }
    }

    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          code: 'AUTH_SERVICE_UNAVAILABLE',
          error: 'Serviço de autenticação temporariamente indisponível. Verifique as credenciais do provedor de autenticação.',
        },
        { status: 503 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const mockId = `usr_${Buffer.from(cleanEmail).toString('base64').slice(0, 12)}`;
    const mockToken = `jwt_mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const response = NextResponse.json({
      success: true,
      user: {
        id: mockId,
        email: cleanEmail,
        name: cleanEmail.split('@')[0],
        role: 'student',
        isAdmin: false,
      },
      session: {
        accessToken: mockToken,
        expiresAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      },
      mode: 'local_dev',
    });

    response.cookies.set('argus-session', mockToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Erro interno no servidor de autenticação.' },
      { status: 500 }
    );
  }
}
