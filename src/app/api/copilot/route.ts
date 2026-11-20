import { NextResponse } from 'next/server';
import { checkDistributedRateLimit, getClientIp } from '@/lib/rateLimiter';
import { measureLatency } from '@/lib/logger';
import {
  answerStudentQueryDirectly,
  buildCopilotPrompt,
  queryGeminiCopilot,
} from '@/lib/copilot/copilotEngine';

export async function POST(req: Request) {
  return measureLatency('/api/copilot', async () => {
    try {
      const ip = getClientIp(req);
      const { allowed, resetTime } = await checkDistributedRateLimit({
        key: `copilot:ip:${ip}`,
        limit: 20,
        windowMs: 60000,
        ip,
      });

      if (!allowed) {
        return NextResponse.json(
          {
            success: false,
            error: 'Muitas perguntas em sequência. Aguarde alguns segundos para enviar nova pergunta.',
            retryAfterSeconds: Math.ceil((resetTime - Date.now()) / 1000),
          },
          { status: 429 }
        );
      }

      const body = await req.json();
      const rawQuery = typeof body?.query === 'string' ? body.query.trim().slice(0, 1500) : '';
      const studentProfile = body?.studentProfile && typeof body.studentProfile === 'object' ? body.studentProfile : {};
      const examContext = body?.examContext && typeof body.examContext === 'object' ? body.examContext : {};
      const history = Array.isArray(body?.history)
        ? body.history.slice(-6).map((h: any) => ({
            sender: h?.sender === 'user' ? 'user' : 'assistant',
            text: String(h?.text || '').slice(0, 600),
          }))
        : [];

      if (!rawQuery) {
        return NextResponse.json(
          { success: false, error: 'Por favor, digite sua pergunta.' },
          { status: 400 }
        );
      }

      const query = rawQuery;

      const apiKey =
        process.env.GEMINI_API_KEY ||
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
        process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

      const warName = studentProfile.warName || studentProfile.name || 'Estudante';
      const targetExam =
        examContext.title || studentProfile.targetExamTitle || 'Concurso Público';
      const banca = examContext.banca || studentProfile.targetBanca || 'Cebraspe';
      const focusList: string[] =
        Array.isArray(studentProfile.focusSubjects) && studentProfile.focusSubjects.length > 0
          ? studentProfile.focusSubjects
          : [studentProfile.weakSubject || 'Direito Constitucional'];

      if (apiKey) {
        const prompt = buildCopilotPrompt(query, targetExam, banca, focusList, history);
        const geminiResult = await queryGeminiCopilot(apiKey, model, prompt);
        if (geminiResult) {
          return NextResponse.json({
            success: true,
            source: 'gemini',
            text: geminiResult.text,
            reply: geminiResult.text,
            quickAction: geminiResult.quickAction,
            recommendedAction: {
              label: geminiResult.quickAction.label,
              tab: geminiResult.quickAction.actionTab,
            },
          });
        }
      }

      const directAnswer = answerStudentQueryDirectly(
        query,
        warName,
        targetExam,
        banca,
        focusList,
        examContext
      );

      return NextResponse.json({
        success: true,
        source: 'argus_knowledge_engine',
        text: directAnswer.text,
        reply: directAnswer.text,
        quickAction: directAnswer.quickAction,
        recommendedAction: {
          label: directAnswer.quickAction.label,
          tab: directAnswer.quickAction.actionTab,
        },
      });
    } catch (error: any) {
      console.error('API Copilot Error:', error);
      const fallbackText =
        'Não consegui processar sua pergunta neste instante. Tente reformular com o tema ou artigo que você quer revisar.';
      return NextResponse.json({
        success: true,
        source: 'fallback',
        text: fallbackText,
        reply: fallbackText,
        quickAction: {
          label: 'Abrir Banco de Questões',
          actionTab: 'questions',
        },
        recommendedAction: {
          label: 'Abrir Banco de Questões',
          tab: 'questions',
        },
      });
    }
  });
}
