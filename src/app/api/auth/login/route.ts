import { NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { checkRateLimit, getClientIp } from '@/lib/rateLimiter';

export async function POST(req: Request) {
  try {
    // Proteção contra Brute Force / Credential Stuffing (máx 10 tentativas por minuto)
    const ip = getClientIp(req);
    const { allowed, resetTime } = checkRateLimit(`login_${ip}`, 10, 60000);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Muitas tentativas de login consecutivas. Aguarde 1 minuto para tentar novamente.',
          retryAfterSeconds: Math.ceil((resetTime - Date.now()) / 1000),
        },
        { status: 429 }
      );
    }

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

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    // Se o Supabase estiver configurado com chaves de produção
    if (isSupabaseConfigured()) {
      const client = getSupabase();
      if (client) {
        const { data, error } = await client.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return NextResponse.json(
            { success: false, error: error.message },
            { status: 401 }
          );
        }

        const response = NextResponse.json({
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email,
            role: data.user.role,
          },
          session: {
            accessToken: data.session?.access_token,
            expiresAt: data.session?.expires_at,
          },
          mode: 'supabase',
        });

        // Set secure cookie
        if (data.session?.access_token) {
          response.cookies.set('argus-session', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            path: '/',
          });
        }

        return response;
      }
    }

    // Em ambiente de produção, rejeita categoricamente logins mock se o Supabase não estiver configurado
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'Serviço de autenticação temporariamente indisponível. Verifique as credenciais do provedor de autenticação.' },
        { status: 503 }
      );
    }

    // Fallback Mock Seguro apenas para desenvolvimento local offline
    const mockId = `usr_${Buffer.from(email).toString('base64').slice(0, 12)}`;
    const mockToken = `jwt_mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const response = NextResponse.json({
      success: true,
      user: {
        id: mockId,
        email,
        name: email.split('@')[0],
        role: 'student', // Nunca eleva permissão para admin automaticamente no mock
      },
      session: {
        accessToken: mockToken,
        expiresAt: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
      },
      mode: 'local_dev',
    });

    response.cookies.set('argus-session', mockToken, {
      httpOnly: false,
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
