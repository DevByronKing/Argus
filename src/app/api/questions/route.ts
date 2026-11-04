import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_QUESTIONS } from '@/lib/mockData';
import { Question } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const banca = searchParams.get('banca');
    const subject = searchParams.get('subject');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    // Se o Supabase estiver configurado, busca as questões reais no PostgreSQL
    if (isSupabaseConfigured()) {
      const client = getSupabase();
      if (client) {
        let query = client
          .from('questions')
          .select('*')
          .order('year', { ascending: false })
          .limit(limit);

        if (banca && banca !== 'todas') {
          query = query.ilike('banca', `%${banca}%`);
        }

        if (subject && subject !== 'todas') {
          query = query.ilike('subject_name', `%${subject}%`);
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

          return NextResponse.json({
            success: true,
            source: 'supabase',
            count: mappedQuestions.length,
            questions: mappedQuestions,
          });
        }
      }
    }

    // Fallback: Retorna as questões pré-cadastradas no catálogo mock
    let filtered = MOCK_QUESTIONS;
    if (banca && banca !== 'todas') {
      filtered = filtered.filter((q) => q.banca.toLowerCase() === banca.toLowerCase());
    }
    if (subject && subject !== 'todas') {
      filtered = filtered.filter((q) => q.subjectName.toLowerCase() === subject.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      source: 'catalog_fallback',
      count: filtered.length,
      questions: filtered,
    });
  } catch (error: any) {
    console.error('Erro na API /api/questions:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Falha ao buscar questões' },
      { status: 500 }
    );
  }
}
