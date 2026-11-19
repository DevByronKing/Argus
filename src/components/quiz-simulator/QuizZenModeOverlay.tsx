'use client';

import React from 'react';
import {
  Clock,
  Minimize2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  Scale,
  Check,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Question, Flashcard } from '@/lib/types';
import { nativeHaptics } from '@/lib/nativeHaptics';

interface QuizZenModeOverlayProps {
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  selectedOptionId: string | null;
  setSelectedOptionId: (id: string | null) => void;
  isAnswered: boolean;
  zenFlashcardSaved: boolean;
  setZenFlashcardSaved: (saved: boolean) => void;
  onCloseZenMode: () => void;
  onConfirmAnswer: () => void;
  onNext: () => void;
  onAddFlashcard: (flashcard: Flashcard) => void;
  formatTimer: (seconds: number) => string;
}

export const QuizZenModeOverlay: React.FC<QuizZenModeOverlayProps> = ({
  currentQuestion,
  currentIndex,
  totalQuestions,
  timeSpentSeconds,
  selectedOptionId,
  setSelectedOptionId,
  isAnswered,
  zenFlashcardSaved,
  setZenFlashcardSaved,
  onCloseZenMode,
  onConfirmAnswer,
  onNext,
  onAddFlashcard,
  formatTimer,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[999] text-white p-4 sm:p-8 md:p-12 overflow-y-auto flex flex-col justify-between animate-fadeIn preserve-dark force-white"
      style={{ backgroundColor: '#050811', color: '#ffffff' }}
    >
      {/* Zen Mode Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5 text-xs font-black tracking-wider text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white">MODO FOCO TOTAL ZEN • ARENA DE COMBATE</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">Pressione [F] ou [ESC] para sair</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs text-amber-300 font-bold bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(timeSpentSeconds)}</span>
          </div>
          <div className="hidden sm:block text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/10">
            {currentIndex + 1}/{totalQuestions}
          </div>
          <button
            type="button"
            onClick={onCloseZenMode}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Sair do Modo Zen [ESC]"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sair [ESC]</span>
          </button>
        </div>
      </div>

      {/* Zen Mode Body */}
      <div className="max-w-3xl w-full mx-auto my-auto py-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
            {currentQuestion.banca} • {currentQuestion.year}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">
            {currentQuestion.subjectName}
          </span>
          <span className="text-slate-400">{currentQuestion.topicName}</span>
        </div>

        <p className="text-lg sm:text-xl text-slate-100 font-normal leading-relaxed whitespace-pre-line">
          {currentQuestion.statement}
        </p>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const letter = String.fromCharCode(65 + idx);
            let optionStyle = 'bg-white/5 border-white/10 hover:border-indigo-400/50 hover:bg-white/10 text-slate-200';

            if (isAnswered) {
              if (option.isCorrect) {
                optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40 font-bold';
              } else if (isSelected && !option.isCorrect) {
                optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-100 ring-2 ring-rose-500/40';
              } else {
                optionStyle = 'opacity-35 bg-white/5 border-transparent text-slate-400';
              }
            } else if (isSelected) {
              optionStyle = 'bg-indigo-600/30 border-indigo-400 text-white ring-2 ring-indigo-400/40 shadow-lg';
            }

            return (
              <div
                key={option.id}
                onClick={() => {
                  if (!isAnswered) {
                    setSelectedOptionId(option.id);
                    nativeHaptics.lightImpact();
                  }
                }}
                className={'p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ' + optionStyle}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={
                      'w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ' +
                      (isAnswered && option.isCorrect
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : isAnswered && isSelected && !option.isCorrect
                        ? 'bg-rose-500 text-white'
                        : isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 text-slate-300')
                    }
                  >
                    {letter}
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed break-words">{option.text}</span>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isAnswered && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-400 border border-white/10">
                    {letter}
                  </kbd>
                </div>
              </div>
            );
          })}
        </div>

        {/* FULL AI EXPLANATION IN MODO ZEN */}
        {isAnswered && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/15 space-y-4 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                {selectedOptionId && currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                  <span className="flex items-center gap-1.5 text-xs font-black text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-xl border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Gabarito Correto!
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-black text-rose-300 bg-rose-500/20 px-3 py-1 rounded-xl border border-rose-500/40">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Resposta Incorreta
                  </span>
                )}
                <span className="text-xs font-bold text-slate-200">
                  Gabarito Oficial: Letra {String.fromCharCode(65 + Math.max(0, currentQuestion.options.findIndex((o) => o.isCorrect)))}
                </span>
              </div>
            </div>

            {/* Distrator Se Errou */}
            {selectedOptionId && !currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200">
                <strong className="text-rose-300">Pegadinha / Distrator explorado pela banca: </strong>
                {currentQuestion.options.find((o) => o.id === selectedOptionId)?.distractorReason ||
                  'Alternativa construída para induzir o candidato ao erro conceitual.'}
              </div>
            )}

            {/* Fundamentação & Comentário */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Comentário do Especialista &amp; Fundamentação:</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                {currentQuestion.explanation}
              </p>
            </div>

            {/* Lei Seca Vinculada */}
            {currentQuestion.codeCitation && (
              <div className="p-3.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-xs flex items-start gap-2.5">
                <Scale className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-indigo-200 block mb-0.5">
                    Legislação / Lei Seca Vinculada:
                  </span>
                  <span className="font-mono text-indigo-300">
                    {currentQuestion.codeCitation}
                  </span>
                </div>
              </div>
            )}

            {/* Flashcard 1-Click Action */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const correctOpt = currentQuestion.options.find((o) => o.isCorrect);
                  onAddFlashcard({
                    id: 'fc-zen-' + Date.now(),
                    subjectName: currentQuestion.subjectName,
                    topicName: currentQuestion.topicName,
                    front: '[' + currentQuestion.banca + ' / ' + currentQuestion.subjectName + ']\n' + currentQuestion.statement.slice(0, 180) + '...',
                    back:
                      'Gabarito Correto: ' +
                      (correctOpt ? correctOpt.text : '') +
                      '\n\nFundamento: ' +
                      currentQuestion.explanation.slice(0, 200) +
                      '...\n\nBase Legal: ' +
                      (currentQuestion.codeCitation || currentQuestion.lawArticles?.join(', ') || ''),
                    errorOriginQuestionId: currentQuestion.id,
                    nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    intervalDays: 1,
                    repetitions: 0,
                    easeFactor: 2.5,
                  });
                  setZenFlashcardSaved(true);
                }}
                className={
                  'px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ' +
                  (zenFlashcardSaved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15')
                }
              >
                {zenFlashcardSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Salvo no Deck de Flashcards!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>+ Salvar no Baralho de Flashcards SRS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Zen Bottom Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <span className="text-xs text-slate-400">
            Navegação: [A-E] seleciona &bull; [Enter] confirma &bull; [→] avança
          </span>

          {!isAnswered ? (
            <button
              type="button"
              onClick={onConfirmAnswer}
              disabled={!selectedOptionId}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Resposta [Enter ↵]</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
            >
              <span>Próxima Questão</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-500 max-w-4xl mx-auto w-full pt-4 border-t border-white/10 shrink-0">
        Arena de Combate Zen &bull; Argus AI
      </div>
    </div>
  );
};
