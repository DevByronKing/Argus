import { NextResponse } from 'next/server';
import { AIEngine, LegalDiagnosticRequest } from '@/lib/aiEngine';
import { checkDistributedRateLimit, getClientIp } from '@/lib/rateLimiter';
import { measureLatency } from '@/lib/logger';
import { resolveServerUserSession } from '@/lib/serverSession';

export async function POST(req: Request) {
  return measureLatency('/api/diagnosis', async () => {
    try {
      const ip = getClientIp(req);
      const { allowed, resetTime } = await checkDistributedRateLimit({
        key: `diagnosis:ip:${ip}`,
        limit: 20,
        windowMs: 60000,
        ip,
      });

      if (!allowed) {
        return NextResponse.json(
          {
            success: false,
            error: 'Muitas requisições de diagnóstico consecutivas. Aguarde 1 minuto.',
            retryAfterSeconds: Math.ceil((resetTime - Date.now()) / 1000),
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
            },
          }
        );
      }

      // Autorização e plano resolvidos exclusivamente no servidor (nunca confia em body.userPlan)
      const session = await resolveServerUserSession(req, '/api/diagnosis');
      if (process.env.NODE_ENV === 'production' && !session.isPaid) {
        return NextResponse.json(
          {
            success: false,
            code: 'PAYMENT_REQUIRED',
            error: 'Assinatura ativa obrigatória para gerar Diagnóstico Cognitivo com IA.',
          },
          { status: 402 }
        );
      }

      let body: Record<string, any>;
      try {
        body = await req.json();
      } catch {
        return NextResponse.json(
          { success: false, error: 'Payload JSON inválido.' },
          { status: 400 }
        );
      }

      const diagnosticReq: LegalDiagnosticRequest = {
        questionId: typeof body.questionId === 'string' ? body.questionId.slice(0, 80) : undefined,
        statement: String(body.questionStatement || body.statement || '').slice(0, 3000),
        banca: String(body.banca || 'Cebraspe').slice(0, 40),
        subject: String(body.subject || 'Direito').slice(0, 120),
        topic: String(body.topic || 'Geral').slice(0, 140),
        selectedOptionText: String(body.selectedOptionText || body.selectedOption || '').slice(0, 1000),
        isCorrect: Boolean(body.isCorrect),
        confidenceLevel:
          body.confidenceLevel === 'alta' || body.confidenceLevel === 'chute'
            ? body.confidenceLevel
            : 'media',
        knownLawArticle: typeof body.knownLawArticle === 'string' ? body.knownLawArticle.slice(0, 300) : undefined,
        knownExplanation: typeof body.knownExplanation === 'string' ? body.knownExplanation.slice(0, 2000) : undefined,
        knownTrap: typeof body.knownTrap === 'string' ? body.knownTrap.slice(0, 500) : undefined,
        userPlan: session.isPaid ? session.plan : (process.env.NODE_ENV === 'production' ? 'aspirante' : 'pro'),
        userDailyAiCount: 0,
      };

      const result = await AIEngine.generateDiagnostic(diagnosticReq);

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('API Diagnosis Error:', error);
      return NextResponse.json(
        { success: false, error: 'Erro interno ao gerar diagnóstico cognitivo.' },
        { status: 500 }
      );
    }
  });
}
