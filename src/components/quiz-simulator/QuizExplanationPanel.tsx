'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Scale,
  Check,
  Plus,
  BrainCircuit,
  Loader2,
  Sparkles,
  Target,
  ShieldAlert,
} from 'lucide-react';
import { Question, Flashcard } from '@/lib/types';
import { AIFeedbackVote } from '@/components/AIFeedbackVote';

interface CognitiveDiagnosisResult {
  diagnosisTitle?: string;
  errorType?: string;
  cognitiveSummary?: string;
  bancaTrapAnalysis?: string;
  actionableAdvice?: string;
  suggestedReviewTopic?: string;
}

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
  const [isGeneratingDiagnosis, setIsGeneratingDiagnosis] = useState(false);
  const [diagnosis, setDiagnosis] = useState<CognitiveDiagnosisResult | null>(null);

  useEffect(() => {
    setDiagnosis(null);
    setIsGeneratingDiagnosis(false);
  }, [currentQuestion.id]);

  const selectedOption = selectedOptionId
    ? currentQuestion.options.find((o) => o.id === selectedOptionId)
    : null;
  const isCorrect = Boolean(selectedOption?.isCorrect);

  const handleGenerateDiagnosis = async () => {
    setIsGeneratingDiagnosis(true);
    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          questionStatement: currentQuestion.statement,
          banca: currentQuestion.banca,
          subject: currentQuestion.subjectName,
          topic: currentQuestion.topicName,
          selectedOptionText: selectedOption?.text || '',
          isCorrect,
          knownLawArticle: currentQuestion.codeCitation,
          knownExplanation: currentQuestion.explanation,
          knownTrap: currentQuestion.cognitiveAnalysis?.commonTrap,
          userPlan: 'pro',
        }),
      });
      const json = await response.json();
      const data = json?.data || json;
      if (data && (data.cognitiveSummary || data.actionableAdvice || data.diagnosisTitle || data.explanation)) {
        setDiagnosis({
          diagnosisTitle:
            data.diagnosisTitle ||
            (isCorrect
              ? 'Acerto Consolidado • Memória Ativa Validada'
              : `Vulnerabilidade Detectada em ${currentQuestion.topicName}`),
          errorType: data.errorType || (isCorrect ? 'Domínio Validado' : 'Pegadinha de Banca'),
          cognitiveSummary:
            data.cognitiveSummary ||
            data.explanation ||
            (isCorrect
              ? `Você neutralizou o distrator da banca ${currentQuestion.banca} com leitura técnica precisa.`
              : `A banca ${currentQuestion.banca} explorou uma inversão conceitual clássica em ${currentQuestion.topicName}.`),
          bancaTrapAnalysis:
            data.bancaTrapAnalysis ||
            selectedOption?.distractorReason ||
            currentQuestion.cognitiveAnalysis?.commonTrap ||
            'Atenção a palavras absolutas, exceções legais e inversões de prazo.',
          actionableAdvice:
            data.actionableAdvice ||
            'Salve esta questão como Flashcard SRS e revise o dispositivo legal vinculado em 24h.',
          suggestedReviewTopic: data.suggestedReviewTopic || currentQuestion.topicName,
        });
      } else {
        throw new Error('Empty diagnosis');
      }
    } catch {
      setDiagnosis({
        diagnosisTitle: isCorrect
          ? 'Acerto Consistente • Blindagem Ativa'
          : `Ponto Cego Mapeado: ${currentQuestion.topicName}`,
        errorType: isCorrect ? 'Domínio Confirmado' : 'Pegadinha de Banca',
        cognitiveSummary: isCorrect
          ? `Você identificou corretamente o comando da banca ${currentQuestion.banca} em ${currentQuestion.subjectName}.`
          : `Você marcou "${selectedOption?.text?.slice(0, 90) || 'alternativa incorreta'}", caindo no distrator construído pela banca ${currentQuestion.banca}.`,
        bancaTrapAnalysis:
          selectedOption?.distractorReason ||
          currentQuestion.cognitiveAnalysis?.commonTrap ||
          'A banca substituiu um termo-chave da lei seca para induzir leitura apressada.',
        actionableAdvice:
          'Crie um Flashcard SRS agora para revisar este gatilho amanhã e fixar a exceção na memória de longo prazo.',
        suggestedReviewTopic: currentQuestion.topicName,
      });
    } finally {
      setIsGeneratingDiagnosis(false);
    }
  };

  return (
    <div className="mt-6 p-5 sm:p-7 rounded-3xl bg-white dark:bg-dark-card border border-indigo-500/30 shadow-md space-y-5 animate-fadeIn">
      {/* Header de Gabarito & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2.5 flex-wrap">
          {isCorrect ? (
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
      {selectedOptionId && !isCorrect && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 space-y-1">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Mecanismo do Distrator Explorado pela Banca</span>
          </div>
          <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
            {selectedOption?.distractorReason ||
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

      {/* Card do Diagnóstico Cognitivo Gerado por IA */}
      {diagnosis && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50/70 to-cyan-50/70 dark:from-indigo-950/50 dark:via-slate-900 dark:to-cyan-950/40 border-2 border-indigo-400/50 space-y-3 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-cyan-300 font-black text-xs sm:text-sm">
              <BrainCircuit className="w-4 h-4 shrink-0" />
              <span>{diagnosis.diagnosisTitle}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-600/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-[10px] font-black uppercase">
              {diagnosis.errorType}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {diagnosis.cognitiveSummary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10">
              <span className="font-black text-rose-600 dark:text-rose-400 flex items-center gap-1 mb-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Raio-X da Banca
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-snug">{diagnosis.bancaTrapAnalysis}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10">
              <span className="font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1">
                <Target className="w-3.5 h-3.5" /> Ação Recomendada ({diagnosis.suggestedReviewTopic})
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-snug">{diagnosis.actionableAdvice}</p>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Ações: Gerar Diagnóstico Cognitivo + Criar Flashcard + Feedback */}
      <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isGeneratingDiagnosis}
            onClick={handleGenerateDiagnosis}
            className="px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-600/20 disabled:opacity-60"
          >
            {isGeneratingDiagnosis ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Gerando Diagnóstico Cognitivo...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{diagnosis ? 'Atualizar Diagnóstico Cognitivo' : 'Gerar Diagnóstico Cognitivo'}</span>
              </>
            )}
          </button>

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
                <span>Flashcard Criado!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-amber-500" />
                <span>Criar Flashcard</span>
              </>
            )}
          </button>
        </div>

        <AIFeedbackVote
          questionId={currentQuestion.id}
          banca={currentQuestion.banca}
          subject={currentQuestion.subjectName}
        />
      </div>
    </div>
  );
};
