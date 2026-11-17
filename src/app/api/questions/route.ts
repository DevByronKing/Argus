import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_QUESTIONS } from '@/lib/mockData';
import { Question } from '@/lib/types';
import {
  buildQuestionsCacheKey,
  getCachedQuestionsCatalog,
  setCachedQuestionsCatalog,
} from '@/lib/questionsCache';
import { measureLatency } from '@/lib/logger';

const PUBLIC_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
};

export async function GET(req: NextRequest) {
  return measureLatency('/api/questions', async () => {
    try {
      const { searchParams } = new URL(req.url);
      const banca = searchParams.get('banca');
      const subject = searchParams.get('subject');
      const parsedLimit = Number.parseInt(searchParams.get('limit') || '100', 10);
      const limit = Number.isFinite(parsedLimit)
        ? Math.min(500, Math.max(1, parsedLimit))
        : 100;

      const cacheKey = buildQuestionsCacheKey(banca, subject, limit);
      const cached = getCachedQuestionsCatalog(cacheKey);
      if (cached) {
        return NextResponse.json(
          {
            success: true,
            cached: true,
            source: cached.source,
            count: cached.count,
            questions: cached.questions,
          },
          { headers: PUBLIC_CACHE_HEADERS }
        );
      }

      // Se o Supabase estiver configurado, busca as questões reais no PostgreSQL usando filtros indexáveis
      if (isSupabaseConfigured()) {
        const client = getSupabase();
        if (client) {
          let query = client
            .from('questions')
            .select('*')
            .order('year', { ascending: false })
            .limit(limit);

          if (banca && banca !== 'todas') {
            query = query.ilike('banca', banca.trim());
          }

          if (subject && subject !== 'todas') {
            query = query.ilike('subject_name', subject.trim());
          }

          const { data, error } = await query;

          if (!error && data && data.length > 0) {
            const mappedQuestions: Question[] = data.map((row) => ({
              id: row.id,
              subjectId: `sub-${(row.subject_name || 'geral').toLowerCase().replace(/\s+/g, '-')}`,
              subjectName: row.subject_name,
              topicId: `top-${(row.topic_name || 'geral').toLowerCase().replace(/\s+/g, '-')}`,
              topicName: row.topic_name,
              banca: row.banca,
              year: Number(row.year) || 2024,
              institution: row.institution,
              statement: row.statement,
              codeCitation: row.code_citation || undefined,
              options: Array.isArray(row.options) ? row.options : [],
              explanation: row.explanation,
              lawArticles: Array.isArray(row.law_articles) ? row.law_articles : [],
              cognitiveAnalysis: row.cognitive_analysis || {
                commonTrap: 'Análise literal e confronto com a jurisprudência consolidada.',
                keyConcept: row.topic_name,
                bancaTendency: `Padrão clássico de distratores da banca ${row.banca}.`,
              },
              isOfficialAudited: true,
              format: Array.isArray(row.options) && row.options.length === 2 ? 'certo_errado' : 'multipla_escolha',
              difficulty: 'Média',
            }));

            const payload = {
              source: 'supabase' as const,
              count: mappedQuestions.length,
              questions: mappedQuestions,
            };
            setCachedQuestionsCatalog(cacheKey, payload);

            return NextResponse.json(
              {
                success: true,
                cached: false,
                ...payload,
              },
              { headers: PUBLIC_CACHE_HEADERS }
            );
          }
        }
      }

      // Fallback: Retorna as questões pré-cadastradas no catálogo mock respeitando o limite
      let filtered = MOCK_QUESTIONS;
      if (banca && banca !== 'todas') {
        const targetBanca = banca.trim().toLowerCase();
        filtered = filtered.filter((q) => q.banca.trim().toLowerCase() === targetBanca);
      }
      if (subject && subject !== 'todas') {
        const targetSubject = subject.trim().toLowerCase();
        filtered = filtered.filter((q) => q.subjectName.trim().toLowerCase() === targetSubject);
      }

      const limitedQuestions = filtered.slice(0, limit);
      const fallbackPayload = {
        source: 'catalog_fallback' as const,
        count: limitedQuestions.length,
        questions: limitedQuestions,
      };
      setCachedQuestionsCatalog(cacheKey, fallbackPayload);

      return NextResponse.json(
        {
          success: true,
          cached: false,
          ...fallbackPayload,
        },
        { headers: PUBLIC_CACHE_HEADERS }
      );
    } catch (error: any) {
      if (error?.digest === 'DYNAMIC_SERVER_USAGE') {
        throw error;
      }
      console.error('Erro na API /api/questions:', error);
      return NextResponse.json(
        { success: false, error: error?.message || 'Falha ao buscar questões' },
        { status: 500 }
      );
    }
  });
}
