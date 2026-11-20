import { NextResponse } from 'next/server';
import { triggerWelcomeEmail } from '@/lib/email/welcomeEmail';
import { resolveServerUserSession } from '@/lib/serverSession';
import { checkDualRateLimit, getClientIp } from '@/lib/rateLimiter';

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const session = await resolveServerUserSession(request, '/api/welcome-email');

    // Impede uso como Open Email Relay anônimo: exige usuário autenticado
    if (!session.authenticated || !session.email) {
      return NextResponse.json(
        {
          success: false,
          code: 'UNAUTHORIZED',
          error: 'Autenticação necessária para envio do e-mail de boas-vindas.',
        },
        { status: 401 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Payload JSON inválido.' },
        { status: 400 }
      );
    }

    const verifiedEmail = session.email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(verifiedEmail)) {
      return NextResponse.json(
        { success: false, error: 'E-mail da sessão inválido.' },
        { status: 400 }
      );
    }

    const rateCheck = await checkDualRateLimit({
      ip,
      identifier: verifiedEmail,
      profile: 'password_reset', // máx 3 envios/min
      namespace: 'welcome_email',
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          code: 'RATE_LIMIT_EXCEEDED',
          error: 'Limite de envios excedido. Aguarde antes de solicitar novamente.',
        },
        { status: 429 }
      );
    }

    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 80) : 'Aluno(a)';
    const targetExam = typeof body.targetExam === 'string' ? body.targetExam.trim().slice(0, 140) : undefined;
    const guardianAnimal = typeof body.guardianAnimal === 'string' ? body.guardianAnimal.trim().slice(0, 60) : undefined;
    const preferredStudyHours =
      typeof body.preferredStudyHours === 'number' && Number.isFinite(body.preferredStudyHours)
        ? Math.min(24, Math.max(1, body.preferredStudyHours))
        : undefined;

    const result = await triggerWelcomeEmail({
      name: name || 'Aluno(a)',
      email: verifiedEmail,
      targetExam,
      guardianAnimal,
      preferredStudyHours,
    });

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
    });
  } catch (err) {
    console.error('Erro na rota /api/welcome-email:', err);
    return NextResponse.json(
      { success: false, error: 'Falha interna ao processar disparo de e-mail' },
      { status: 500 }
    );
  }
}
