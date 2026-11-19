'use client';

import React from 'react';
import { RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Question, Flashcard } from '@/lib/types';
import { AIFeedbackVote } from '@/components/AIFeedbackVote';

interface QuizAIGeneratorViewProps {
  aiBanca: 'Cebraspe' | 'FGV' | 'FCC' | 'Vunesp';
  setAiBanca: (banca: 'Cebraspe' | 'FGV' | 'FCC' | 'Vunesp') => void;
  aiSubject: string;
  setAiSubject: (subject: string) => void;
  aiDifficulty: string;
  setAiDifficulty: (diff: string) => void;
  isGeneratingAI: boolean;
  generatedQuestion: Question | null;
  aiSelectedOptionId: string | null;
  setAiSelectedOptionId: (id: string | null) => void;
  aiIsAnswered: boolean;
  onGenerateQuestion: () => void;
  onConfirmAIAnswer: () => void;
  onAddFlashcard: (flashcard: Flashcard) => void;
  onBackToQuickQuiz: () => void;
}

export const QuizAIGeneratorView: React.FC<QuizAIGeneratorViewProps> = ({
  aiBanca,
  setAiBanca,
  aiSubject,
  setAiSubject,
  aiDifficulty,
  setAiDifficulty,
  isGeneratingAI,
  generatedQuestion,
  aiSelectedOptionId,
  setAiSelectedOptionId,
  aiIsAnswered,
  onGenerateQuestion,
  onConfirmAIAnswer,
  onAddFlashcard,
  onBackToQuickQuiz,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToQuickQuiz}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Voltar ao Treino Adaptativo</span>
        </button>
      </div>

      {/* AI Generator Control Box */}
      <div className="glass-panel p-6 rounded-[2rem] bg-white/70 dark:bg-dark-card/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400 animate-spin-slow" />
          <span>Simulador de Questões Inéditas com IA Preditiva</span>
        </div>

        <h2 className="text-xl font-black text-slate-900 dark:text-white">
          Gere Questões Nunca Vistas no Estilo Exato da Banca
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Já decorou as questões anteriores? Nossa IA replica a semântica do Cebraspe, os casos práticos da FGV e a literalidade da FCC.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Banca Alvo:</label>
            <select
              value={aiBanca}
              onChange={(e) => setAiBanca(e.target.value as any)}
              className="w-full bg-white dark:bg-dark-bg border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Cebraspe">Cebraspe (Certo / Errado)</option>
              <option value="FGV">FGV (Casos Práticos A-E)</option>
              <option value="FCC">FCC (Literalidade e Prazos)</option>
              <option value="Vunesp">Vunesp (Direito Geral)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Disciplina:</label>
            <select
              value={aiSubject}
              onChange={(e) => setAiSubject(e.target.value)}
              className="w-full bg-white dark:bg-dark-bg border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Direito Constitucional">Direito Constitucional</option>
              <option value="Direito Administrativo">Direito Administrativo</option>
              <option value="Direito Tributário">Direito Tributário</option>
              <option value="Direito Previdenciário">Direito Previdenciário</option>
              <option value="Direito Penal">Direito Penal</option>
              <option value="Informática e Segurança">Informática e Segurança</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Nível de Rigor:</label>
            <select
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(e.target.value)}
              className="w-full bg-white dark:bg-dark-bg border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Moderado (Nível Técnico/Analista)">Moderado (Técnico/Analista)</option>
              <option value="Alta Maldade (Nível Auditor / Juiz)">Alta Maldade (Auditor / Juiz)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onGenerateQuestion}
            disabled={isGeneratingAI}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs tracking-wide shadow-xl shadow-blue-600/25 active:scale-95 transition-all"
          >
            {isGeneratingAI ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Engenharia Reversa da Banca em Execução...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>GERAR QUESTÃO INÉDITA COM IA</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Question Display */}
      {generatedQuestion && (
        <div className="p-6 rounded-3xl bg-white dark:bg-dark-surface border border-blue-500/20 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 dark:border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-500/30">
                QUESTÃO INÉDITA IA
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {generatedQuestion.banca} • {generatedQuestion.subjectName}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">{generatedQuestion.topicName}</span>
          </div>

          {/* Statement */}
          <div className="bg-slate-50 dark:bg-dark-bg p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-inner">
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed font-medium">
              {generatedQuestion.statement}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {generatedQuestion.options.map((option) => {
              const isSelected = aiSelectedOptionId === option.id;
              let style = 'bg-white dark:bg-dark-bg/60 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-white/20 hover:shadow-sm';

              if (aiIsAnswered) {
                if (option.isCorrect) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-500 text-emerald-800 dark:text-emerald-200';
                } else if (isSelected && !option.isCorrect) {
                  style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-500 text-rose-800 dark:text-rose-200';
                }
              } else if (isSelected) {
                style = 'bg-blue-50 dark:bg-blue-600/20 border-blue-400 dark:border-blue-500 text-slate-900 dark:text-white shadow-sm ring-1 ring-blue-300 dark:ring-transparent';
              }

              return (
                <button
                  key={option.id}
                  disabled={aiIsAnswered}
                  onClick={() => setAiSelectedOptionId(option.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs font-medium flex items-center justify-between gap-3 ${style}`}
                >
                  <span>{option.text}</span>
                  {aiIsAnswered && option.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Confirm or Cognitive Feedback */}
          {!aiIsAnswered ? (
            <div className="flex justify-end pt-2">
              <button
                disabled={!aiSelectedOptionId}
                onClick={onConfirmAIAnswer}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-blue-600/25 disabled:opacity-40 text-white font-bold text-xs tracking-wide shadow-lg transition-all"
              >
                Confirmar Resposta
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-indigo-700 dark:text-indigo-300">
                  <span>Fundamentação e Justificativa da IA:</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">{generatedQuestion.codeCitation}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{generatedQuestion.explanation}</p>
                <div className="bg-indigo-100/50 dark:bg-dark-bg/80 p-3 rounded-xl border border-indigo-200 dark:border-indigo-500/10 text-indigo-800 dark:text-indigo-200">
                  💡 <strong>Pegadinha Evitada:</strong> {generatedQuestion.cognitiveAnalysis.commonTrap}
                </div>
              </div>

              <AIFeedbackVote
                questionId={generatedQuestion.id}
                banca={generatedQuestion.banca}
                subject={generatedQuestion.subjectName}
              />

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() =>
                    onAddFlashcard({
                      id: `fc-ai-${Date.now()}`,
                      subjectName: generatedQuestion.subjectName,
                      topicName: generatedQuestion.topicName,
                      front: generatedQuestion.statement,
                      back: generatedQuestion.explanation,
                      nextReviewDate: new Date().toISOString().split('T')[0],
                      intervalDays: 1,
                      repetitions: 0,
                      easeFactor: 2.5,
                    })
                  }
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  + Salvar no Deck Anki (SRS)
                </button>

                <button
                  onClick={onGenerateQuestion}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Gerar Outra Questão
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
