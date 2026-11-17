import { NextResponse } from 'next/server';
import { getSupabase, getSupabaseServiceRole, isSupabaseConfigured } from '@/lib/supabase';
import { assertServerAdmin } from '@/lib/adminAuth';
import { signAccessCookiePayload } from '@/lib/signedAccessToken';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
    const cookieHeader = req.headers.get('cookie') || '';
    const cookieMatch = cookieHeader.match(/(?:^|;\s*)(?:argus-session|sb-access-token)=([^;]+)/);
    const token = bearerToken || (cookieMatch ? decodeURIComponent(cookieMatch[1]) : null);

    if (!token) {
      return NextResponse.json(
        { authenticated: false, isAdmin: false, message: 'Nenhuma sessão ativa encontrada.' },
        { status: 200 }
      );
    }

    if (isSupabaseConfigured()) {
      const client = getSupabaseServiceRole() || getSupabase();
      if (client) {
        const {
          data: { user },
          error,
        } = await client.auth.getUser(token);
        if (error || !user) {
          return NextResponse.json(
            { authenticated: false, isAdmin: false, error: error?.message || 'Token inválido' },
            { status: 401 }
          );
        }

        const { data: profile } = await client
          .from('profiles')
          .select('id, email, full_name, target_exam, subscription_tier, subscription_status, avatar_animal, war_name')
          .eq('id', user.id)
          .maybeSingle();

        const adminRes = await assertServerAdmin(req, '/api/auth/session');

        const response = NextResponse.json({
          authenticated: true,
          isAdmin: adminRes.authorized,
          user: {
            id: user.id,
            email: user.email,
            role: adminRes.authorized ? 'admin' : 'student',
            profile,
          },
          mode: 'supabase',
        });

        if (
          profile?.subscription_status === 'active' &&
          profile.subscription_tier &&
          ['lancamento', 'pro', 'elite', 'black'].includes(profile.subscription_tier)
        ) {
          const signedAccess = await signAccessCookiePayload({
            status: 'ativa',
            isPayingOrCommitted: true,
            planId: profile.subscription_tier,
            userId: user.id,
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
        { authenticated: false, isAdmin: false, error: 'Autenticação indisponível em produção.' },
        { status: 503 }
      );
    }

    // Modo local offline estritamente sem privilégios admin
    if (token.startsWith('jwt_mock_')) {
      return NextResponse.json({
        authenticated: true,
        isAdmin: false,
        user: {
          id: 'usr_local_active',
          email: 'aluno@argus.app.br',
          name: 'Concurseiro Alta Performance',
          role: 'student',
        },
        mode: 'local_dev',
      });
    }

    return NextResponse.json({ authenticated: false, isAdmin: false }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json(
      { authenticated: false, isAdmin: false, error: err?.message },
      { status: 500 }
    );
  }
}
