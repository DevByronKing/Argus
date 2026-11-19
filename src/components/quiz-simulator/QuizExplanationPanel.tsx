'use client';

import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Scale,
  Check,
  Plus,
} from 'lucide-react';
import { Question, Flashcard } from '@/lib/types';
import { AIFeedbackVote } from '@/components/AIFeedbackVote';

interface QuizExplanationPanelProps {
  currentQuestion: Question;
  selectedOptionId: string | null;
  zenFlashcardSaved: boolean;
  setZenFlashcardSaved: (saved: boolean) => void;
  onAddFlashcard: (flashcard: Flashcard) => void;
}

export const QuizExplanationPanel: React.FC<QuizExplanationPanelProps> = ({
  currentQuestion,
  selectedOptionId,
  zenFlashcardSaved,
  setZenFlashcardSaved,
  onAddFlashcard,
}) => {
  return (
    <div className="mt-6 p-6 sm:p-7 rounded-3xl bg-white dark:bg-dark-card border border-indigo-500/30 shadow-md space-y-5 animate-fadeIn">
      {/* Header de Gabarito & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          {selectedOptionId && currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
            <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 px-3.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Gabarito Correto!
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-black text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-500/20 px-3.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-500/30">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              Resposta Incorreta
            </span>
          )}
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Gabarito Oficial: Letra {String.fromCharCode(65 + Math.max(0, currentQuestion.options.findIndex((o) => o.isCorrect)))}
          </span>
        </div>

        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          Banca: {currentQuestion.banca} • {currentQuestion.year}
        </span>
      </div>

      {/* Mecanismo do Distrator (Caso tenha errado) */}
      {selectedOptionId && !currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 space-y-1">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Mecanismo do Distrator Explorado pela Banca</span>
          </div>
          <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
            {currentQuestion.options.find((o) => o.id === selectedOptionId)?.distractorReason ||
              'A alternativa foi redigida para induzir o candidato ao erro através de inversão semântica ou confusão de conceitos correlatos.'}
          </p>
        </div>
      )}

      {/* Explicação da Banca / Comentário do Especialista */}
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Comentário do Especialista &amp; Fundamentação:</span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-normal">
          {currentQuestion.explanation}
        </p>
      </div>

      {/* Citação Direta da Lei Seca */}
      {currentQuestion.codeCitation && (
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-xs flex items-start gap-3">
          <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-indigo-950 dark:text-indigo-200 block">
              Legislação / Lei Seca Vinculada:
            </span>
            <span className="font-mono text-indigo-700 dark:text-indigo-300 text-xs">
              {currentQuestion.codeCitation}
            </span>
          </div>
        </div>
      )}

      {/* Raio-X da Pegadinha */}
      {currentQuestion.cognitiveAnalysis?.commonTrap && (
        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-950 dark:text-amber-200 block">
              Pegadinha Detectada pela Banca ({currentQuestion.banca}):
            </span>
            <p className="text-amber-900 dark:text-amber-300 leading-relaxed">
              {currentQuestion.cognitiveAnalysis.commonTrap}
            </p>
          </div>
        </div>
      )}

      {/* Barra de Ações: Salvar Flashcard + Feedback */}
      <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            const correctOpt = currentQuestion.options.find((o) => o.isCorrect);
            onAddFlashcard({
              id: 'fc-' + Date.now(),
              subjectName: currentQuestion.subjectName,
              topicName: currentQuestion.topicName,
              front: '[' + currentQuestion.banca + ' / ' + currentQuestion.subjectName + ']\n' + currentQuestion.statement.slice(0, 180) + '...',
              back:
                'Gabarito: ' +
                (correctOpt ? correctOpt.text : '') +
                '\n\nFundamento: ' +
                currentQuestion.explanation.slice(0, 200) +
                '...\n\nBase Legal: ' +
                (currentQuestion.codeCitation || ''),
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
              ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
              : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white border border-slate-200 dark:border-white/15')
          }
        >
          {zenFlashcardSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Salvo nos Flashcards!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 text-amber-500" />
              <span>+ Salvar no Deck Anki (SRS)</span>
            </>
          )}
        </button>

        <AIFeedbackVote
          questionId={currentQuestion.id}
          banca={currentQuestion.banca}
          subject={currentQuestion.subjectName}
        />
      </div>
    </div>
  );
};
