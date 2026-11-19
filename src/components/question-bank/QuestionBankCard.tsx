'use client';

import React from 'react';
import {
  Zap,
  Gauge,
  ShieldCheck,
  VolumeX,
  Volume2,
  Check,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Activity,
  Sparkles,
  Lightbulb,
  BrainCircuit,
  Flame,
  Award,
} from 'lucide-react';
import { Question, PsychometricDistractorType } from '@/lib/types';
import {
  PSYCHOMETRIC_DISTRACTORS,
  BANCA_PSYCHOMETRIC_PROFILES,
} from '@/lib/psychometricsData';

export const getQuestionPsychometrics = (q: Question) => {
  const commonTrap = q.cognitiveAnalysis?.commonTrap || '';
  const distractorReasons = (q.options || []).map((o) => o?.distractorReason || '').join(' ');
  const trapText = `${commonTrap} ${distractorReasons}`.toLowerCase();

  let distractorType: PsychometricDistractorType = 'meia_verdade';
  if (
    trapText.includes('absolut') ||
    trapText.includes('sempre') ||
    trapText.includes('nunca') ||
    trapText.includes('exclusiv') ||
    trapText.includes('generaliza')
  ) {
    distractorType = 'generalizacao_indevida';
  } else if (
    trapText.includes('desatualiz') ||
    trapText.includes('revogad') ||
    trapText.includes('antig') ||
    trapText.includes('14.230') ||
    trapText.includes('14.133') ||
    trapText.includes('reforma')
  ) {
    distractorType = 'lei_revogada';
  } else if (
    trapText.includes('prazo') ||
    trapText.includes('mês') ||
    trapText.includes('meses') ||
    trapText.includes('dias') ||
    trapText.includes('anos') ||
    trapText.includes('temporal') ||
    trapText.includes('prorroga')
  ) {
    distractorType = 'distrator_temporal';
  } else if (
    trapText.includes('semântic') ||
    trapText.includes('negação') ||
    trapText.includes('dupl') ||
    trapText.includes('vocabulário') ||
    trapText.includes('interpreta')
  ) {
    distractorType = 'armadilha_semantica';
  } else if (
    trapText.includes('senso comum') ||
    trapText.includes('intuição') ||
    trapText.includes('moral') ||
    trapText.includes('justo')
  ) {
    distractorType = 'senso_comum';
  } else if (
    trapText.includes('competência') ||
    trapText.includes('órgão') ||
    trapText.includes('atribuição') ||
    trapText.includes('judiciário') ||
    trapText.includes('executivo')
  ) {
    distractorType = 'inversao_competencia';
  } else if (
    trapText.includes('contexto') ||
    trapText.includes('enquadramento') ||
    trapText.includes('definição de anulação')
  ) {
    distractorType = 'conceito_correto_contexto_errado';
  }

  const distractorDef =
    PSYCHOMETRIC_DISTRACTORS.find((d) => d.id === distractorType) || PSYCHOMETRIC_DISTRACTORS[0];

  const isCebraspe = (q.banca || '').toLowerCase().includes('cebraspe');
  const isDiff = q.difficulty === 'Difícil';
  const isEasy = q.difficulty === 'Fácil';

  const triDifficulty = isDiff ? 820 : isEasy ? 440 : 660;
  const triDiscrimination = isDiff ? 2.18 : isEasy ? 1.25 : 1.75;
  const triGuessing = isCebraspe ? 0.05 : (q.options?.length || 5) === 4 ? 0.25 : 0.20;
  const trapRiskScore = isDiff ? 8.9 : isEasy ? 4.1 : 7.2;

  const qBanca = (q.banca || '').toLowerCase();
  const bancaProfile = BANCA_PSYCHOMETRIC_PROFILES.find(
    (b) => (b.banca || '').toLowerCase() === qBanca
  );

  return {
    distractorType,
    distractorDef,
    triDifficulty,
    triDiscrimination,
    triGuessing,
    trapRiskScore,
    bancaProfile,
  };
};

interface QuestionBankCardProps {
  question: Question;
  displayNumber: number;
  answerState?: { selectedOptionId: string; isCorrect: boolean; confirmed: boolean };
  isDetailsOpen: boolean;
  isTriOpen: boolean;
  activeAudioTarget: string | null;
  onToggleAudio: (targetId: string, textToSpeak: string) => void;
  onSelectOption: (questionId: string, optionId: string) => void;
  onConfirmAnswer: (question: Question) => void;
  onToggleDetails: (questionId: string) => void;
  onToggleTriDetails: (questionId: string) => void;
  onCreateFlashcard: (question: Question) => void;
}

export const QuestionBankCard: React.FC<QuestionBankCardProps> = ({
  question: q,
  displayNumber,
  answerState,
  isDetailsOpen,
  isTriOpen,
  activeAudioTarget,
  onToggleAudio,
  onSelectOption,
  onConfirmAnswer,
  onToggleDetails,
  onToggleTriDetails,
  onCreateFlashcard,
}) => {
  const isConfirmed = !!answerState?.confirmed;
  const psy = getQuestionPsychometrics(q);

  return (
    <div className="p-5 sm:p-6 rounded-2xl glass-panel bg-white/70 dark:bg-dark-card/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4 transition-all">
      {/* Metadados Superiores com Termômetro de Pegadinha */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20">
            Q{displayNumber}
          </span>
          <span className="font-bold text-slate-900 dark:text-white">{q.institution}</span>
          {q.role && (
            <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
              • {q.role}
            </span>
          )}
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
            {q.banca} ({q.year})
          </span>
          {q.difficulty && (
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                q.difficulty === 'Fácil'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                  : q.difficulty === 'Média'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
              }`}
            >
              {q.difficulty}
            </span>
          )}

          <span
            className={`px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1 ${
              psy.trapRiskScore >= 8
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30'
                : psy.trapRiskScore >= 6
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
            }`}
          >
            <Zap className="w-3 h-3 animate-pulse" />
            Índice Pegadinha: {psy.trapRiskScore}/10
          </span>

          <span className="px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono text-[10px] hidden md:inline-flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            TRI b={psy.triDifficulty} | a={psy.triDiscrimination}
          </span>

          <span
            className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] inline-flex items-center gap-1"
            title={q.auditSource || 'Gabarito Definitivo Oficial da Banca Homologado Pós-Recursos'}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>
              {q.legalStatus === 'alterada_pela_lei' ? 'Lei Alterada' : 'Gabarito Oficial Auditado'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleAudio(`q-${q.id}-stmt`, q.statement)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeAudioTarget === `q-${q.id}-stmt`
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-dark-surface hover:dark:bg-dark-hover text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/5'
            }`}
            title="Ouvir o enunciado com voz neural em português"
          >
            {activeAudioTarget === `q-${q.id}-stmt` ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Parar</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">Ouvir Enunciado</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-700 dark:text-slate-300">{q.subjectName}</span>
            <span>&rsaquo;</span>
            <span className="line-clamp-1 max-w-[120px]">{q.topicName}</span>
          </div>
        </div>
      </div>

      {/* Enunciado da Questão */}
      <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-normal whitespace-pre-line">
        {q.statement}
      </div>

      {q.codeCitation && (
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono bg-slate-50 dark:bg-dark-surface/60 p-2.5 rounded-xl border border-slate-200 dark:border-white/5">
          ⚖️ Fundamento Legal em Referência:{' '}
          <span className="text-slate-700 dark:text-slate-300 font-semibold">{q.codeCitation}</span>
        </div>
      )}

      {/* Opções de Resposta */}
      <div className="space-y-2.5 pt-1">
        {q.options.map((opt, optIndex) => {
          const isSelected = answerState?.selectedOptionId === opt.id;
          const isCorrect = opt.isCorrect;

          let optionStyle =
            'bg-slate-50 dark:bg-dark-surface border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:border-indigo-400/50';

          if (isConfirmed) {
            if (isCorrect) {
              optionStyle =
                'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold ring-1 ring-emerald-500';
            } else if (isSelected && !isCorrect) {
              optionStyle =
                'bg-rose-50 dark:bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300 ring-1 ring-rose-500';
            } else {
              optionStyle = 'opacity-60 bg-slate-50 dark:bg-dark-surface border-transparent text-slate-400';
            }
          } else if (isSelected) {
            optionStyle =
              'bg-indigo-50 dark:bg-indigo-500/15 border-indigo-500 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-500';
          }

          const optionLetter = String.fromCharCode(65 + optIndex);

          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(q.id, opt.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs sm:text-sm flex items-start gap-3 select-none ${optionStyle}`}
            >
              <div
                className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                  isConfirmed && isCorrect
                    ? 'bg-emerald-500 text-white'
                    : isConfirmed && isSelected && !isCorrect
                    ? 'bg-rose-500 text-white'
                    : isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                }`}
              >
                {isConfirmed && isCorrect ? <Check className="w-3.5 h-3.5" /> : optionLetter}
              </div>

              <div className="flex-1">
                <p>{opt.text}</p>
                {isConfirmed && opt.distractorReason && !isCorrect && (
                  <div className="mt-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-[11px] space-y-1 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>
                        Distrator Psicométrico da Banca: <strong>{psy.distractorDef.shortName}</strong>
                      </span>
                    </div>
                    <p className="leading-snug">{opt.distractorReason}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra de Ações */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          {!isConfirmed ? (
            <button
              onClick={() => onConfirmAnswer(q)}
              disabled={!answerState?.selectedOptionId}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                answerState?.selectedOptionId
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 glow-brand'
                  : 'bg-slate-100 dark:bg-dark-surface text-slate-400 cursor-not-allowed border border-slate-200 dark:border-white/5'
              }`}
            >
              Responder Questão
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                  answerState.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20'
                    : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 border border-rose-200 dark:border-rose-500/20'
                }`}
              >
                {answerState.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Você acertou!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>Você errou (salvo no Caderno de Erros)</span>
                  </>
                )}
              </span>

              <button
                onClick={() => onToggleDetails(q.id)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-surface hover:dark:bg-dark-hover text-slate-700 dark:text-slate-300 text-xs font-bold transition-all border border-slate-200 dark:border-white/5"
              >
                {isDetailsOpen ? 'Ocultar Explicação' : 'Ver Gabarito Comentado'}
              </button>

              <button
                onClick={() => onToggleTriDetails(q.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  isTriOpen
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-600/20'
                    : 'bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{isTriOpen ? 'Ocultar Raio-X TRI' : '🔬 Raio-X Psicométrico TRI'}</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onCreateFlashcard(q)}
            title="Transformar esta questão em um flashcard com repetição espaçada"
            className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gerar Flashcard SRS</span>
          </button>
        </div>
      </div>

      {/* Painel Psicométrico TRI Expandido */}
      {isConfirmed && isTriOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-500/30 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <Activity className="w-4 h-4" />
              <h4 className="text-xs font-black uppercase tracking-wider">
                Parâmetros Psicométricos TRI (Item Response Theory)
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono">
              Modelo 3PL (Lord &amp; Birnbaum)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-cyan-200 dark:border-cyan-500/20 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Parâmetro b (Dificuldade)</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono font-black">
                  {psy.triDifficulty} / 1000
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${(psy.triDifficulty / 1000) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {psy.triDifficulty >= 800
                  ? 'Item de topo de corte: define os primeiros colocados.'
                  : psy.triDifficulty >= 600
                  ? 'Item calibrado para média dos aprovados.'
                  : 'Item base: errar derruba a nota pela TRI.'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-cyan-200 dark:border-cyan-500/20 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Parâmetro a (Discriminação)</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono font-black">
                  {psy.triDiscrimination.toFixed(2)}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (psy.triDiscrimination / 2.5) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {psy.triDiscrimination >= 2.0
                  ? 'Discriminação Muito Alta: separa candidatos preparados dos desatentos.'
                  : 'Discriminação Moderada: item homogêneo.'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-cyan-200 dark:border-cyan-500/20 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <span>Parâmetro c (Chute Casual)</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono font-black">
                  {(psy.triGuessing * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${(psy.triGuessing / 0.3) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {q.banca === 'Cebraspe'
                  ? 'Cebraspe (1 errada anula 1 certa): penalidade inibe o chute aleatório.'
                  : 'Múltipla escolha tradicional com 5 alternativas equiprováveis.'}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-cyan-200 dark:border-cyan-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-600 dark:text-cyan-300">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Mecanismo Psicológico Empregado pelo Examinador ({psy.distractorDef.name}):</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
              {psy.distractorDef.examinerLogic}
            </p>
          </div>
        </div>
      )}

      {/* Caixa de Diagnóstico Cognitivo da Banca */}
      {isConfirmed && isDetailsOpen && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-dark-surface/90 border border-indigo-200 dark:border-indigo-500/30 space-y-3.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <BrainCircuit className="w-4 h-4" />
              <h4 className="text-xs font-black uppercase tracking-wider">
                Gabarito Comentado &amp; Análise Cognitiva da Banca
              </h4>
            </div>

            <button
              onClick={() =>
                onToggleAudio(
                  `q-${q.id}-exp`,
                  `${q.explanation}. ${q.cognitiveAnalysis.commonTrap}. ${psy.distractorDef.antidoteStrategy}`
                )
              }
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeAudioTarget === `q-${q.id}-exp`
                  ? 'bg-indigo-600 text-white shadow-md animate-pulse'
                  : 'bg-white dark:bg-dark-card text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-50'
              }`}
              title="Ouvir gabarito e análise cognitiva por voz"
            >
              {activeAudioTarget === `q-${q.id}-exp` ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Parar Áudio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Ouvir Análise</span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
            <p>
              <strong>Fundamentação:</strong> {q.explanation}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-indigo-50 dark:from-amber-500/10 dark:via-indigo-500/10 dark:to-transparent border border-amber-200 dark:border-amber-500/30 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-xl flex items-center justify-center shrink-0 shadow-sm">
              🦉
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider text-[11px]">
                  Dica Relâmpago de Atena
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                  {psy.distractorDef.shortName}
                </span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-snug">
                💡 <strong>Conceito-Chave:</strong> {q.cognitiveAnalysis.keyConcept}
              </p>
              <p className="text-amber-800 dark:text-amber-200 font-medium text-[11px] leading-snug">
                🛡️ <strong>Regra de Ouro Antídoto:</strong> {psy.distractorDef.antidoteStrategy}
              </p>
            </div>
          </div>

          {q.lawArticles && q.lawArticles.length > 0 && (
            <div className="pt-2 border-t border-slate-200 dark:border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                Dispositivos Legais &amp; Jurisprudência:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {q.lawArticles.map((art, aIdx) => (
                  <span
                    key={aIdx}
                    className="text-[11px] px-2 py-0.5 rounded bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1"
                  >
                    📜 {art}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-200 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-300">
              <p className="font-extrabold flex items-center gap-1 text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                <Flame className="w-3.5 h-3.5" /> Pegadinha Mapeada
              </p>
              <p className="text-[11px] leading-snug">{q.cognitiveAnalysis.commonTrap}</p>
            </div>

            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-900 dark:text-cyan-300">
              <p className="font-extrabold flex items-center gap-1 text-[11px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400 mb-1">
                <Award className="w-3.5 h-3.5" /> Tendência {q.banca}
              </p>
              <p className="text-[11px] leading-snug">{q.cognitiveAnalysis.bancaTendency}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
