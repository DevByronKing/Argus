import { NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

const COOKIES_TO_CLEAR = [
  'argus-session',
  'learning-ai-session',
  'sb-access-token',
  'argus_user_access',
  'learning_ai_user_access',
  'argus_checkout_tx',
];

export async function POST() {
  try {
    if (isSupabaseConfigured()) {
      const client = getSupabase();
      if (client) {
        await client.auth.signOut().catch(() => {});
      }
    }

    const response = NextResponse.json({
      success: true,
      message: 'Sessão e credenciais de acesso encerradas com sucesso.',
    });

    const isProd = process.env.NODE_ENV === 'production';
    for (const cookieName of COOKIES_TO_CLEAR) {
      response.cookies.set(cookieName, '', {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        expires: new Date(0),
        maxAge: 0,
        path: '/',
      });
    }

    return response;
  } catch (err) {
    console.error('Erro ao encerrar sessão:', err);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao encerrar sessão.' },
      { status: 500 }
    );
  }
}
