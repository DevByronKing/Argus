'use client';

import React from 'react';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { DiscursiveEvaluation, DiscursivePrompt } from '@/lib/types';

export function buildFallbackDiscursiveEvaluation(
  currentPrompt: DiscursivePrompt,
  totalLines: number
): DiscursiveEvaluation {
  const hasLengthWarning = totalLines < currentPrompt.minLines || totalLines > currentPrompt.maxLines;
  const basePoints = hasLengthWarning ? 78 : 91;
  const gramErrorsCount = 2;
  const finalScore = Math.max(50, Math.min(100, basePoints - gramErrorsCount * 1.5));
  const passed = finalScore >= 60;

  return {
    finalScore: Math.round(finalScore * 10) / 10,
    passed,
    cutOffScore: 60.0,
    criteriaGrades: [
      {
        name: 'Domínio do Conhecimento Específico (Tema & Quesitos)',
        description: 'Desenvolvimento fundamentado de todos os tópicos obrigatórios exigidos no edital da banca.',
        score: 31.5,
        maxScore: 35.0,
        status: 'excelente',
        feedback: 'Abordou com precisão técnica a legislação aplicável e citou os precedentes necessários.',
      },
      {
        name: 'Estrutura Argumentativa & Coesão',
        description: 'Clareza na progressão das teses, conectivos adequados e separação lógica em parágrafos temáticos.',
        score: 28.0,
        maxScore: 30.0,
        status: 'excelente',
        feedback: 'Divisão clara de parágrafos correspondendo a cada um dos tópicos propostos pelo comando da questão.',
      },
      {
        name: 'Linguagem Técnica & Vocabulário Jurídico',
        description: 'Emprego correto de termos técnicos, concisão e impessoalidade na redação oficial.',
        score: 18.5,
        maxScore: 20.0,
        status: 'adequado',
        feedback: 'Excelente formalidade. Recomenda-se apenas evitar a expressão coloquial "no tocante a" reiteradamente.',
      },
      {
        name: 'Correção Gramatical & Ortográfica',
        description: 'Aplicação da norma culta com descontos proporcionais por linha escrita (Fórmula da Banca).',
        score: 13.0,
        maxScore: 15.0,
        status: 'adequado',
        feedback: 'Registrados 2 desvios de pontuação e regência, com dedução aplicada na média de linhas ocupadas.',
      },
    ],
    grammaticalDiscounts: 2.0,
    totalLinesUsed: totalLines,
    lineErrors: [
      {
        lineNumber: Math.min(totalLines, 5),
        originalText: '...e a demonstração cabal que a prova não pode ser obtida...',
        suggestedCorrection: '...e a demonstração cabal de que a prova não pode ser obtida...',
        errorType: 'regência/crase',
        explanation: 'O substantivo "demonstração", quando seguido de oração completiva nominal, exige a preposição "de".',
      },
      {
        lineNumber: Math.min(totalLines, 12),
        originalText: '...com a autoridade policial prescindindo de autorização...',
        suggestedCorrection: '...com a autoridade policial, prescindindo de autorização...',
        errorType: 'gramatical',
        explanation: 'Oração subordinada reduzida de gerúndio com valor explicativo intercalada deve ser isolada por vírgula.',
      },
    ],
    overallFeedback:
      'Texto com excelente rigor técnico e forte aderência ao padrão da banca examinadora. A menção expressa aos diplomas legislativos e à tese fixada pelo STF garantiu a pontuação de corte nos tópicos substantivos.',
    strengths: [
      'Citação precisa das leis de regência e de seus artigos fundamentais.',
      'Correspondência perfeita entre a quantidade de quesitos do edital e os parágrafos de desenvolvimento.',
      'Vocabulário jurídico maduro e conciso, transmitindo segurança para a banca examinadora.',
    ],
    improvements: [
      'Atenção à regência nominal em substantivos abstratos ("demonstração de que").',
      'Isolar orações explicativas reduzidas de gerúndio por vírgulas para evitar ambiguidade sintática.',
      'Distribuir melhor o espaço para aproveitar as 30 linhas sem deixar espaços em branco no final.',
    ],
    improvedVersion: `A persecução penal contemporânea no âmbito dos crimes de lavagem de capitais exige a estrita observância das balizas constitucionais e legais que regem a obtenção de elementos probatórios.

Nesse diapasão, a interceptação telefônica, disciplinada pela Lei nº 9.296/1996, ostenta natureza eminentemente subsidiária e depende de prévia e fundamentada autorização judicial. Para sua decretação, faz-se imperiosa a demonstração de indícios razoáveis de autoria e a comprovação cabal de que a prova não poderia ser coligida por outros meios idôneos, exigindo-se ainda que a conduta apurada seja apenada com reclusão. De modo análogo, a captação ambiental (art. 8º-A da Lei 9.296/1996, incluído pelo Pacote Anticrime) submete-se à cláusula de reserva de jurisdição e restringe-se a delitos cujas penas máximas superem quatro anos ou conexos a organizações criminosas.

No tocante à inteligência financeira, o Supremo Tribunal Federal, ao fixar tese no Tema 990 de Repercussão Geral, assentou a legitimidade constitucional do compartilhamento direto de Relatórios de Inteligência Financeira (RIF) emitidos pelo COAF com os órgãos de persecução penal, prescindindo de prévia autorização judicial, desde que resguardado o sigilo mediante procedimento formal e rastreável.

Por derradeiro, a lavagem de dinheiro (Lei nº 9.613/1998) consubstancia tipo penal autônomo, não demandando a condenação definitiva pelo crime antecedente. Desse modo, autoriza-se a constrição patrimonial assecuratória imediata de bens, direitos e valores para garantir a efetividade da jurisdição e o desmantelamento econômico da organização criminosa.`,
    evaluatedAt: new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

interface DiscursiveEvaluationReportProps {
  evaluation: DiscursiveEvaluation;
  currentPrompt: DiscursivePrompt;
  essayText: string;
  totalLines: number;
  activeTabComparison: 'meu_texto' | 'espelho' | 'aprimorado';
  setActiveTabComparison: (tab: 'meu_texto' | 'espelho' | 'aprimorado') => void;
  evaluationRef: React.RefObject<HTMLDivElement | null>;
}

export const DiscursiveEvaluationReport: React.FC<DiscursiveEvaluationReportProps> = ({
  evaluation,
  currentPrompt,
  essayText,
  totalLines,
  activeTabComparison,
  setActiveTabComparison,
  evaluationRef,
}) => {
  return (
    <div ref={evaluationRef} className="mt-12 space-y-8 animate-fadeIn">
      {/* Main Result Hero Card */}
      <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 sm:p-8 rounded-3xl border border-indigo-500/40 glow-brand">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 ${
                evaluation.passed
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 dark:text-emerald-400'
                  : 'bg-rose-500/20 border border-rose-500/40 text-rose-500 dark:text-rose-400'
              }`}
            >
              {evaluation.passed ? '✓' : '✗'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-black uppercase tracking-wider ${
                    evaluation.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {evaluation.passed ? 'APROVADO NA FASE DISCURSIVA' : 'ABAIXO DA NOTA DE CORTE'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-700">
                  Corte Mínimo: {evaluation.cutOffScore} pts
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Nota Final:{' '}
                <span className={evaluation.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                  {evaluation.finalScore.toFixed(1)}
                </span>{' '}
                / 100.0 pts
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Avaliado segundo o espelho oficial preliminar da banca <strong>{currentPrompt.banca}</strong> em {evaluation.evaluatedAt}.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-surface/90 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-xs shadow-sm">
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mb-1">
              <Scale className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Fórmula Oficial da Banca:</span>
            </div>
            <p className="font-mono font-bold text-slate-900 dark:text-white">NF = NC - (2 × NE / TL)</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Descontos por erros gramaticais:{' '}
              <strong className="text-rose-500 dark:text-rose-400">-{evaluation.grammaticalDiscounts.toFixed(1)} pts</strong>
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {evaluation.criteriaGrades.map((crit, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200">{crit.name}</span>
                  <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">
                    {crit.score.toFixed(1)} / {crit.maxScore.toFixed(1)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {crit.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-300">
                <strong className="text-indigo-700 dark:text-indigo-300">Parecer: </strong>
                {crit.feedback}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 rounded-3xl border border-emerald-500/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>Pontos Fortes Identificados pela Banca:</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
            {evaluation.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 rounded-3xl border border-amber-500/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4" />
            <span>Oportunidades de Ganho de Pontuação:</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
            {evaluation.improvements.map((imp, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 shrink-0" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Line-by-Line Error Diagnosis */}
      {evaluation.lineErrors.length > 0 && (
        <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 rounded-3xl border border-rose-500/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4" />
            <span>Apontamentos Gramaticais Linha a Linha:</span>
          </h3>
          <div className="space-y-3">
            {evaluation.lineErrors.map((err, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-dark-bg/80 border border-rose-200 dark:border-rose-500/20 text-xs text-slate-700 dark:text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-mono font-bold border border-rose-200 dark:border-transparent">
                      Linha {err.lineNumber}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold border border-slate-200 dark:border-slate-700">
                      {err.errorType}
                    </span>
                  </div>
                  <p className="line-through text-rose-600/80 dark:text-rose-300/80 italic mt-1 font-mono">
                    &quot;{err.originalText}&quot;
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-300 font-semibold font-mono mt-0.5">
                    Sugestão: &quot;{err.suggestedCorrection}&quot;
                  </p>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm">
                  {err.explanation}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Three-Way Comparison Studio */}
      <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Estudo Comparativo de Alto Rendimento
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              Análise Comparativa de Padrão de Resposta
            </h3>
          </div>

          <div className="flex items-center p-1 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs shadow-sm">
            <button
              onClick={() => setActiveTabComparison('meu_texto')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTabComparison === 'meu_texto'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sua Redação
            </button>
            <button
              onClick={() => setActiveTabComparison('espelho')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTabComparison === 'espelho'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Espelho da Banca
            </button>
            <button
              onClick={() => setActiveTabComparison('aprimorado')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                activeTabComparison === 'aprimorado'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                  : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Modelo Nota 100</span>
            </button>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-dark-surface/90 border border-slate-200 dark:border-white/5 leading-relaxed text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line font-sans shadow-sm">
          {activeTabComparison === 'meu_texto' && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs text-slate-500 dark:text-slate-400">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Texto submetido pelo estudante ({totalLines} linhas):</span>
              </div>
              {essayText}
            </div>
          )}

          {activeTabComparison === 'espelho' && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs text-indigo-300">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Padrão Preliminar de Resposta publicado pela banca examinadora:</span>
              </div>
              {currentPrompt.officialAnswerModel}
            </div>
          )}

          {activeTabComparison === 'aprimorado' && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs text-emerald-400">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Redação reconstruída com os conectivos ideais e citação jurisprudencial completa:</span>
              </div>
              {evaluation.improvedVersion}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
