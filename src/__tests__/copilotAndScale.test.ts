import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as copilotPost } from '../app/api/copilot/route';
import { GET as questionsGet } from '../app/api/questions/route';
import * as supabaseModule from '../lib/supabase';
import {
  clearQuestionsCatalogCache,
  getCachedQuestionsCatalog,
  setCachedQuestionsCatalog,
  buildQuestionsCacheKey,
} from '../lib/questionsCache';

describe('Copilot Local Knowledge Fallback & Escalabilidade (/api/copilot + /api/questions)', () => {
  const originalGeminiKey = process.env.GEMINI_API_KEY;
  const originalGoogleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const originalPublicGeminiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  beforeEach(() => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    delete process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    clearQuestionsCatalogCache();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalGeminiKey !== undefined) process.env.GEMINI_API_KEY = originalGeminiKey;
    if (originalGoogleKey !== undefined) process.env.GOOGLE_GENERATIVE_AI_API_KEY = originalGoogleKey;
    if (originalPublicGeminiKey !== undefined) process.env.NEXT_PUBLIC_GEMINI_API_KEY = originalPublicGeminiKey;
  });

  it('deve responder consultas do /api/copilot usando Vade Mecum, micro-resumos e questões comentadas no fallback local', async () => {
    // 1. Match em INITIAL_VADE_MECUM (Inviolabilidade do domicílio - Art. 5º, XI CF/88)
    const vadeMecumReq = new Request('http://localhost/api/copilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.1.1' },
      body: JSON.stringify({
        query: 'Quando posso entrar na casa por determinacao judicial durante o dia sem consentimento?',
        studentProfile: { targetExamTitle: 'PF Agente', targetBanca: 'Cebraspe' },
      }),
    });
    const vadeRes = await copilotPost(vadeMecumReq);
    const vadeData = await vadeRes.json();

    expect(vadeRes.status).toBe(200);
    expect(vadeData.success).toBe(true);
    expect(vadeData.source).toBe('argus_knowledge_engine');
    expect(vadeData.reply).toContain('O que diz a Lei (CF/88');
    expect(vadeData.reply).toContain('Art. 5º, inciso XI');
    expect(vadeData.quickAction?.actionTab).toBe('vademecum');

    // 2. Match em INITIAL_MICRO_SUMMARIES (Improbidade Administrativa - Lei 14.230/21)
    const summaryReq = new Request('http://localhost/api/copilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.1.2' },
      body: JSON.stringify({
        query: 'Como ficou a modalidade culposa e a prescricao de 8 anos no Raio-X da Nova Lei de Improbidade?',
      }),
    });
    const summaryRes = await copilotPost(summaryReq);
    const summaryData = await summaryRes.json();

    expect(summaryRes.status).toBe(200);
    expect(summaryData.source).toBe('argus_knowledge_engine');
    expect(summaryData.reply).toContain('Resumo Simples (Direito Administrativo');
    expect(summaryData.reply).toContain('P-I-P-O-C-A');

    // 3. Match em ALL_QUESTIONS deduplicado (Presunção de legitimidade dos atos administrativos)
    const questionReq = new Request('http://localhost/api/copilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.1.3' },
      body: JSON.stringify({
        query: 'A presuncao de legitimidade dos atos administrativos e absoluta juris et de jure?',
      }),
    });
    const questionRes = await copilotPost(questionReq);
    const questionData = await questionRes.json();

    expect(questionRes.status).toBe(200);
    expect(questionData.source).toBe('argus_knowledge_engine');
    expect(questionData.reply).toContain('Como as bancas cobram isso');
    expect(questionData.reply).toContain('Direito Administrativo');
    expect(questionData.reply).toContain('Armadilha recorrente');
  });

  it('deve usar filtros indexáveis sem wildcard e servir cache L1 compartilhado no /api/questions', async () => {
    const ilikeCalls: Array<{ col: string; val: string }> = [];
    const mockRows = [
      {
        id: 'q-supa-1',
        subject_name: 'Direito Constitucional',
        topic_name: 'Direitos Fundamentais',
        banca: 'Cebraspe',
        year: 2025,
        institution: 'PF',
        statement: 'Questão indexada de teste.',
        code_citation: 'Art. 5º, CF/88',
        options: [
          { id: 'c', text: 'CERTO', isCorrect: true },
          { id: 'e', text: 'ERRADO', isCorrect: false },
        ],
        explanation: 'Conforme Art. 5º da CF/88.',
        law_articles: ['Art. 5º CF/88'],
      },
    ];

    const queryBuilder: any = {
      select: vi.fn(() => queryBuilder),
      order: vi.fn(() => queryBuilder),
      limit: vi.fn(() => queryBuilder),
      ilike: vi.fn((col: string, val: string) => {
        ilikeCalls.push({ col, val });
        return queryBuilder;
      }),
      then: (resolve: (val: any) => void) => resolve({ data: mockRows, error: null }),
    };

    const fromMock = vi.fn(() => queryBuilder);
    vi.spyOn(supabaseModule, 'isSupabaseConfigured').mockReturnValue(true);
    vi.spyOn(supabaseModule, 'getSupabase').mockReturnValue({ from: fromMock } as any);

    // Primeira requisição: bate no banco (1 consulta) e grava no cache L1 + Cache-Control CDN
    const firstRes = await questionsGet(
      new NextRequest('http://localhost/api/questions?banca=Cebraspe&subject=Direito%20Constitucional&limit=20')
    );
    const firstJson = await firstRes.json();

    expect(firstRes.status).toBe(200);
    expect(firstJson.success).toBe(true);
    expect(firstJson.source).toBe('supabase');
    expect(firstJson.cached).toBe(false);
    expect(firstJson.count).toBe(1);
    expect(firstRes.headers.get('Cache-Control')).toBe(
      'public, s-maxage=300, stale-while-revalidate=600'
    );
    expect(fromMock).toHaveBeenCalledTimes(1);
    expect(ilikeCalls).toEqual([
      { col: 'banca', val: 'Cebraspe' },
      { col: 'subject_name', val: 'Direito Constitucional' },
    ]);

    // Requisições subsequentes com mesma chave usam o cache compartilhado ("1 consulta em vez de 1.000")
    const secondRes = await questionsGet(
      new NextRequest('http://localhost/api/questions?banca=%20cebraspe%20&subject=direito%20constitucional&limit=20')
    );
    const secondJson = await secondRes.json();

    expect(secondRes.status).toBe(200);
    expect(secondJson.cached).toBe(true);
    expect(secondJson.source).toBe('supabase');
    expect(secondJson.questions).toEqual(firstJson.questions);
    expect(secondRes.headers.get('Cache-Control')).toBe(
      'public, s-maxage=300, stale-while-revalidate=600'
    );
    expect(fromMock).toHaveBeenCalledTimes(1);
  });

  it('deve expirar o cache L1 após o TTL configurado', () => {
    const key = buildQuestionsCacheKey('FGV', 'Direito Penal', 50);
    setCachedQuestionsCatalog(
      key,
      { source: 'catalog_fallback', count: 0, questions: [] },
      1_000,
      5_000
    );

    expect(getCachedQuestionsCatalog(key, 5_999)).not.toBeNull();
    expect(getCachedQuestionsCatalog(key, 6_000)).toBeNull();
  });
});
