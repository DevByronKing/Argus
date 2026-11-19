'use client';

import React from 'react';
import {
  Trophy,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Crown,
  BarChart2,
  Sparkles,
  Check,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import {
  MockExam,
  MockExamAnswer,
  MockExamResult,
  SubscriptionPlan,
} from '@/lib/types';

interface MockExamResultViewProps {
  selectedExam: MockExam;
  result: MockExamResult;
  answers: Record<string, MockExamAnswer>;
  userPlan: SubscriptionPlan;
  resultFilter: 'all' | 'wrong' | 'blank' | 'correct';
  setResultFilter: (filter: 'all' | 'wrong' | 'blank' | 'correct') => void;
  visibleResultsCount: number;
  setVisibleResultsCount: React.Dispatch<React.SetStateAction<number>>;
  addedToSRS: boolean;
  onAddWrongQuestionsToSRS: () => void;
  onBackToSelect: () => void;
  onRetakeExam: () => void;
  onOpenPricing?: () => void;
}

export const MockExamResultView: React.FC<MockExamResultViewProps> = ({
  selectedExam,
  result,
  answers,
  userPlan,
  resultFilter,
  setResultFilter,
  visibleResultsCount,
  setVisibleResultsCount,
  addedToSRS,
  onAddWrongQuestionsToSRS,
  onBackToSelect,
  onRetakeExam,
  onOpenPricing,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Performance Card */}
      <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 sm:p-8 rounded-3xl border border-indigo-500/40 glow-brand">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shrink-0 ${
                result.isAboveCutoff
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 dark:text-emerald-400'
                  : 'bg-rose-500/20 border border-rose-500/40 text-rose-500 dark:text-rose-400'
              }`}
            >
              {result.isAboveCutoff ? '✓' : '✗'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-black uppercase tracking-wider ${
                    result.isAboveCutoff ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {result.isAboveCutoff ? 'DENTRO DA NOTA DE CORTE' : 'ABAIXO DA NOTA DE CORTE'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-700">
                  Corte Estimado: {result.cutoffScore}%
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Nota Líquida:{' '}
                <span className={result.isAboveCutoff ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                  {result.netScore > 0 ? `+${result.netScore}` : result.netScore}
                </span>{' '}
                / {result.totalQuestions} pts líquidos ({result.percentage}%)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {result.mockExamTitle} • Concluído em {result.completedAt} ({Math.round(result.timeSpentSeconds / 60)} min gastos).
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-surface/90 p-4 rounded-2xl border border-slate-200 dark:border-white/5 text-xs self-start md:self-auto shadow-sm">
            <span className="text-slate-500 dark:text-slate-400">Fórmula de Apuração Oficial:</span>
            {result.scoringRule === 'cebraspe_uma_anula_uma' ? (
              <div className="mt-1">
                <p className="font-mono font-bold text-slate-900 dark:text-white">
                  Nota Líquida = Acertos ({result.correctCount}) - Erros ({result.wrongCount})
                </p>
                <p className="text-[11px] text-rose-500 dark:text-rose-400 mt-0.5 font-semibold">
                  Penalidades deduzidas: -{result.penaltyDeductions} pts
                </p>
              </div>
            ) : (
              <div className="mt-1">
                <p className="font-mono font-bold text-slate-900 dark:text-white">
                  Nota = {result.correctCount} acertos de {result.totalQuestions} questões
                </p>
                <p className="text-[11px] text-emerald-500 dark:text-emerald-400 mt-0.5 font-semibold">
                  Sem fator de penalização por erro
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Simulated Ranking Banner */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-emerald-500/15 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Posição no Ranking Simulado do Concurso
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                🏆 Você ficou em <span className="text-amber-600 dark:text-amber-400">{result.simulatedRank}º lugar</span> entre {result.totalCandidates.toLocaleString('pt-BR')} candidatos
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Percentil atingido: <strong>{Math.max(1, 100 - Math.round((result.simulatedRank / result.totalCandidates) * 100))}%</strong> dos concorrentes simulados.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold block">Status no Concurso</span>
            <span
              className={`px-3 py-1.5 rounded-xl text-xs font-black inline-block mt-1 ${
                result.isAboveCutoff
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40'
              }`}
            >
              {result.isAboveCutoff ? 'Classificado para a 2ª Fase' : 'Fora das Vagas Imediatas'}
            </span>
          </div>
        </div>

        {/* Official Real Cutoff Comparison Notification Banner */}
        {selectedExam.isOfficialPastExam && selectedExam.historicalCutoffScore && (
          <div className="mt-4 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                      Métrica Oficial Real ({selectedExam.examYear})
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Banca {selectedExam.banca}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1">
                    Corte Histórico Real: <span className="text-amber-600 dark:text-amber-400">{selectedExam.historicalCutoffScore} pontos líquidos</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                    {selectedExam.historicalCutoffDescription}
                  </p>
                  {result.netScore >= selectedExam.historicalCutoffScore ? (
                    <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Parabéns! Sua pontuação líquida teria garantido a convocação na lista real deste certame!</span>
                    </div>
                  ) : (
                    <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>
                        Você ficou a {(selectedExam.historicalCutoffScore - result.netScore).toFixed(1)} pontos do corte oficial real. Revise os pontos cegos no Caderno de Erros!
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {userPlan !== 'elite' && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center shrink-0 self-start md:self-center">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1.5 font-bold">Quer diagnóstico cognitivo de cada erro?</span>
                  <button
                    onClick={onOpenPricing}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Desbloquear no Elite</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Acertos (Certas)</span>
            <p className="text-xl font-black text-emerald-500 dark:text-emerald-400 font-mono mt-1">+{result.correctCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Erros (Anulam)</span>
            <p className="text-xl font-black text-rose-500 dark:text-rose-400 font-mono mt-1">-{result.wrongCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Em Branco (Neutras)</span>
            <p className="text-xl font-black text-amber-500 dark:text-amber-400 font-mono mt-1">{result.blankCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Tempo Médio/Questão</span>
            <p className="text-xl font-black text-indigo-500 dark:text-indigo-400 font-mono mt-1">
              {Math.round(result.timeSpentSeconds / result.totalQuestions)}s
            </p>
          </div>
        </div>
      </div>

      {/* Performance by Subject Breakdown Table */}
      <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <BarChart2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          <span>Desempenho Discriminado por Disciplina</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-dark-surface text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="p-3">Disciplina</th>
                <th className="p-3 text-center">Questões</th>
                <th className="p-3 text-center text-emerald-500 dark:text-emerald-400">Acertos</th>
                <th className="p-3 text-center text-rose-500 dark:text-rose-400">Erros</th>
                <th className="p-3 text-center text-amber-500 dark:text-amber-400">Em Branco</th>
                <th className="p-3 text-center font-bold text-slate-900 dark:text-white">Saldo Líquido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
              {result.subjectBreakdown.map((subj, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                  <td className="p-3 font-sans font-bold text-slate-900 dark:text-white">{subj.subjectName}</td>
                  <td className="p-3 text-center">{subj.total}</td>
                  <td className="p-3 text-center text-emerald-500 dark:text-emerald-400">+{subj.correct}</td>
                  <td className="p-3 text-center text-rose-500 dark:text-rose-400">-{subj.wrong}</td>
                  <td className="p-3 text-center text-amber-500 dark:text-amber-400">{subj.blank}</td>
                  <td className="p-3 text-center font-bold text-indigo-600 dark:text-indigo-300">
                    {subj.netScore > 0 ? `+${subj.netScore}` : subj.netScore} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Answer Key (Gabarito Comentado Oficial) */}
      <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Gabarito Comentado</span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              Conferência Questão por Questão com Análise da Banca
            </h3>
          </div>

          <div className="flex items-center p-1 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs shadow-sm">
            <button
              onClick={() => {
                setResultFilter('all');
                setVisibleResultsCount(15);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                resultFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todas ({result.totalQuestions})
            </button>
            <button
              onClick={() => {
                setResultFilter('wrong');
                setVisibleResultsCount(15);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                resultFilter === 'wrong' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Erros ({result.wrongCount})
            </button>
            <button
              onClick={() => {
                setResultFilter('blank');
                setVisibleResultsCount(15);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                resultFilter === 'blank' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Em Branco ({result.blankCount})
            </button>
          </div>
        </div>

        {/* SRS Sync Banner */}
        {result.wrongCount > 0 && (
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-medium">
              <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
              <span>
                Você errou <strong>{result.wrongCount} questões</strong> neste simulado. Converta seus erros em flashcards para fixação definitiva.
              </span>
            </div>
            <button
              onClick={onAddWrongQuestionsToSRS}
              disabled={addedToSRS}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                addedToSRS
                  ? 'bg-emerald-600/30 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
              }`}
            >
              {addedToSRS ? <Check className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
              <span>{addedToSRS ? 'Flashcards Adicionados!' : 'Salvar Erros no Deck SRS'}</span>
            </button>
          </div>
        )}

        {/* Questions List with Lazy-Loading Pagination */}
        {(() => {
          const filteredQuestions = selectedExam.questions.filter((q) => {
            const ans = answers[q.id];
            const correctOpt = q.options.find((o) => o.isCorrect);
            const isCorrect = ans && ans.selectedOptionId === correctOpt?.id;
            const isBlank = !ans || ans.selectedOptionId === null;

            if (resultFilter === 'wrong') return !isBlank && !isCorrect;
            if (resultFilter === 'blank') return isBlank;
            if (resultFilter === 'correct') return isCorrect;
            return true;
          });

          const displayedQuestions = filteredQuestions.slice(0, visibleResultsCount);

          return (
            <div className="space-y-6">
              {displayedQuestions.map((q) => {
                const ans = answers[q.id];
                const correctOpt = q.options.find((o) => o.isCorrect);
                const selectedOpt = q.options.find((o) => o.id === ans?.selectedOptionId);
                const isCorrect = ans && ans.selectedOptionId === correctOpt?.id;
                const isBlank = !ans || ans.selectedOptionId === null;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border text-xs sm:text-sm transition-all shadow-sm ${
                      isCorrect
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/30'
                        : isBlank
                        ? 'bg-amber-50/90 dark:bg-amber-950/20 border-amber-300 dark:border-amber-500/30'
                        : 'bg-rose-50/90 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          Questão #{selectedExam.questions.indexOf(q) + 1}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">• {q.subjectName}</span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                            : isBlank
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
                            : 'bg-rose-500/20 text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {isCorrect ? '✓ Acerto (+1 pt)' : isBlank ? '○ Em Branco (0 pt)' : '✗ Erro (-1 pt no Cebraspe)'}
                      </span>
                    </div>

                    <p className="mt-3 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {q.statement}
                    </p>

                    <div className="mt-4 p-3.5 rounded-xl bg-slate-100 dark:bg-dark-bg/70 border border-slate-200 dark:border-white/5 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400">Sua Marcação:</span>
                        <strong
                          className={
                            isCorrect
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : isBlank
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }
                        >
                          {isBlank ? 'EM BRANCO' : selectedOpt?.text}
                        </strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400">Gabarito Oficial:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400">{correctOpt?.text}</strong>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-indigo-700 dark:text-indigo-300">Fundamentação: </strong>
                      {q.explanation}
                    </div>

                    {q.lawArticles && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {q.lawArticles.map((art, aIdx) => (
                          <span
                            key={aIdx}
                            className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/25 text-[10px] font-semibold"
                          >
                            {art}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredQuestions.length > visibleResultsCount && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    Exibindo <strong>{displayedQuestions.length}</strong> de <strong>{filteredQuestions.length}</strong> questões filtradas.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVisibleResultsCount((prev) => prev + 15)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
                    >
                      Carregar Mais 15
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisibleResultsCount(filteredQuestions.length)}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold transition-all"
                    >
                      Ver Todas
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        <div className="pt-6 border-t border-slate-300 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToSelect}
            className="px-6 py-3 rounded-xl bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all"
          >
            Voltar aos Simulados
          </button>

          <button
            type="button"
            onClick={onRetakeExam}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refazer Este Simulado</span>
          </button>
        </div>
      </div>
    </div>
  );
};
