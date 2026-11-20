import { NextResponse } from 'next/server';
import { resolveServerUserSession } from '@/lib/serverSession';
import { assertServerAdmin } from '@/lib/adminAuth';

export async function GET(request: Request) {
  const adminCheck = await assertServerAdmin(request, '/api/retention/inactivity-check');
  const session = adminCheck.authorized ? null : await resolveServerUserSession(request, '/api/retention/inactivity-check');

  if (!adminCheck.authorized && !session?.authenticated) {
    return NextResponse.json(
      { success: false, code: 'UNAUTHORIZED', error: 'Autenticação necessária para verificação de inatividade.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const inactiveThresholdHours = Math.min(720, Math.max(1, parseInt(searchParams.get('threshold') || '48', 10) || 48));
  const candidateEmail = adminCheck.authorized
    ? (searchParams.get('email') || 'candidato@argus.app.br').slice(0, 120)
    : (session?.email || 'candidato@argus.app.br');
  const warName = (searchParams.get('warName') || 'Guerreiro(a)').slice(0, 60);

  return NextResponse.json({
    status: 'success',
    checkedAt: new Date().toISOString(),
    inactiveThresholdHours,
    targetCandidate: {
      email: candidateEmail,
      warName,
      status: 'rescue_triggered',
      lastSeenHoursAgo: 52,
    },
    recoveryTrigger: {
      type: 'modo_pilula_rescue',
      recommendedCardsCount: 3,
      estimatedTimeMinutes: 2,
      pushTitle: `⚡ ${warName}, salve sua ofensiva no Argus!`,
      pushBody: 'A banca não descansa. Ative o Modo Pílula: só 3 flashcards rápidos hoje para manter o hábito e blindar seus 80%.',
      deepLink: 'https://argus-edu.vercel.app/?modo_pilula=true',
    },
  });
}

export async function POST(request: Request) {
  try {
    const session = await resolveServerUserSession(request, '/api/retention/inactivity-check');
    if (!session.authenticated) {
      return NextResponse.json(
        { success: false, code: 'UNAUTHORIZED', error: 'Autenticação necessária.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { lastActiveTimestamp } = body;

    const now = Date.now();
    const lastActive = lastActiveTimestamp ? parseInt(lastActiveTimestamp, 10) : now;
    const diffHours = Math.max(0, Math.floor((now - lastActive) / (1000 * 60 * 60)));
    const needsRescue = diffHours >= 48;

    return NextResponse.json({
      status: 'processed',
      userId: session.userId || 'authenticated',
      diffHours,
      needsRescue,
      action: needsRescue ? 'DISPATCH_MODO_PILULA' : 'STANDBY',
      suggestedNotification: needsRescue
        ? {
            title: '🔥 Sua ofensiva está sob ameaça!',
            message: 'Faça 3 flashcards ultrarrápidos agora para não perder o ritmo.',
          }
        : null,
    });
  } catch {
    return NextResponse.json(
      { error: 'Falha ao processar verificação de inatividade' },
      { status: 500 }
    );
  }
}
