'use client';

import React from 'react';
import {
  Clock,
  Bookmark,
  Scale,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { MockExam, MockExamAnswer, Question } from '@/lib/types';

interface MockExamInProgressViewProps {
  selectedExam: MockExam;
  currentQuestion: Question;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  currentAnswer?: MockExamAnswer;
  answers: Record<string, MockExamAnswer>;
  remainingSeconds: number;
  answeredCount: number;
  blankCount: number;
  flaggedCount: number;
  showConfirmModal: boolean;
  setShowConfirmModal: (show: boolean) => void;
  formatTime: (secs: number) => string;
  onSelectOption: (questionId: string, optionId: string) => void;
  onClearAnswer: (questionId: string) => void;
  onToggleFlag: (questionId: string) => void;
  onFinishExam: () => void;
}

export const MockExamInProgressView: React.FC<MockExamInProgressViewProps> = ({
  selectedExam,
  currentQuestion,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  currentAnswer,
  answers,
  remainingSeconds,
  answeredCount,
  blankCount,
  flaggedCount,
  showConfirmModal,
  setShowConfirmModal,
  formatTime,
  onSelectOption,
  onClearAnswer,
  onToggleFlag,
  onFinishExam,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Real-time Bar */}
      <div className="glass-panel bg-white/95 dark:bg-dark-card/95 p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-30 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-500/30">
            {selectedExam.banca}
          </span>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
              Questão {currentQuestionIndex + 1} de {selectedExam.questions.length}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {currentQuestion.subjectName} • {currentQuestion.topicName}
            </span>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-black text-sm ${
            remainingSeconds <= 300
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-500 dark:text-rose-400 animate-pulse'
              : 'bg-white dark:bg-dark-surface border-slate-200 dark:border-white/10 text-amber-500 dark:text-amber-400 shadow-sm'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{formatTime(remainingSeconds)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleFlag(currentQuestion.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentAnswer?.isFlaggedForReview
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30 font-black'
                : 'bg-white dark:bg-dark-surface text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{currentAnswer?.isFlaggedForReview ? 'Marcada para Revisão' : 'Marcar para Revisar'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-600/30"
          >
            Entregar Prova
          </button>
        </div>
      </div>

      {/* Main Layout: Question (Left) vs Answer Sheet Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10">
            {currentQuestion.codeCitation && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
                <Scale className="w-3.5 h-3.5" />
                <span>{currentQuestion.codeCitation}</span>
              </div>
            )}

            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed whitespace-pre-line">
              {currentQuestion.statement}
            </p>

            <div className="mt-8 space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer?.selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => onSelectOption(currentQuestion.id, option.id)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 dark:border-indigo-400 text-indigo-950 dark:text-white shadow-md ring-2 ring-indigo-200 dark:ring-indigo-400/50'
                        : 'bg-white dark:bg-dark-surface/70 hover:bg-slate-50 dark:hover:bg-dark-hover border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {option.id.replace('opt-', '').toUpperCase()}
                      </div>
                      <span className="leading-snug">{option.text}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-300 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onClearAnswer(currentQuestion.id)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 self-start"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Deixar esta questão em branco</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-hover disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  type="button"
                  disabled={currentQuestionIndex === selectedExam.questions.length - 1}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(selectedExam.questions.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cartão-Resposta Digital (Gabarito Lateral) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel bg-white/90 dark:bg-dark-card/80 backdrop-blur-md shadow-sm p-6 rounded-3xl border border-slate-200 dark:border-white/10 sticky top-36">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Cartão-Resposta Digital</span>
              </h4>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {answeredCount} / {selectedExam.questions.length} marcadas
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                <span>Marcada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span>Revisar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                <span>Em branco</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 mt-5">
              {selectedExam.questions.map((q, idx) => {
                const ans = answers[q.id];
                const isAnswered = ans && ans.selectedOptionId !== null;
                const isFlagged = ans && ans.isFlaggedForReview;
                const isCurrent = idx === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-11 rounded-xl font-mono text-xs font-bold transition-all relative flex flex-col items-center justify-center ${
                      isCurrent ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-dark-bg z-10' : ''
                    } ${
                      isFlagged
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : isAnswered
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <span>{String(idx + 1).padStart(2, '0')}</span>
                    {isAnswered && (
                      <span className="text-[9px] uppercase font-black -mt-1 opacity-90">
                        {ans.selectedOptionId?.replace('opt-', '')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Respondidas:</span>
                <strong className="text-slate-900 dark:text-white font-mono">{answeredCount}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Em Branco:</span>
                <strong className="text-amber-400 font-mono">{blankCount}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Para Revisão:</span>
                <strong className="text-amber-400 font-mono">{flaggedCount}</strong>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/30"
              >
                Finalizar e Entregar Gabarito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Finish Modal */}
      {showConfirmModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[110] argus-modal-backdrop flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Entregar Gabarito Definitivo?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Confira o resumo do seu preenchimento antes de fechar a prova:
            </p>

            <div className="my-5 p-4 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Questões Respondidas:</span>
                <strong className="text-emerald-400 font-mono">{answeredCount}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Questões em Branco:</span>
                <strong className="text-amber-400 font-mono">{blankCount}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Marcadas para Revisão:</span>
                <strong className="text-amber-400 font-mono">{flaggedCount}</strong>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Tempo Restante:</span>
                <strong className="text-slate-900 dark:text-white font-mono">{formatTime(remainingSeconds)}</strong>
              </div>
            </div>

            {blankCount > 0 && selectedExam.scoringRule === 'cebraspe_uma_anula_uma' && (
              <p className="text-[11px] text-amber-300 mb-4 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                💡 <strong>Lembrete Cebraspe:</strong> Deixar {blankCount} questões em branco é uma estratégia válida para não perder pontos positivos em caso de dúvida.
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-xl bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all"
              >
                Voltar à Prova
              </button>
              <button
                type="button"
                onClick={onFinishExam}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30"
              >
                Confirmar Entrega
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
