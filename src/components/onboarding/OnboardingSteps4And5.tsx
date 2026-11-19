'use client';

import React from 'react';
import {
  Shield,
  Zap,
  BrainCircuit,
  CheckCircle2,
  Flame,
  Sparkles,
  ArrowRight,
  CreditCard,
} from 'lucide-react';
import { GUARDIAN_ANIMALS } from '@/lib/guardianAnimals';
import { GuardianAnimal, GuardianAnimalId, SubscriptionPlan } from '@/lib/types';
import { Button, Badge, ProgressBar, Avatar } from '@/components/ui';

interface OnboardingGuardianStepProps {
  selectedGuardian: GuardianAnimal;
  selectedGuardianId: GuardianAnimalId | null;
  recommendedGuardianId: GuardianAnimalId | null;
  weakSubject: string;
  onSelectGuardian: (id: GuardianAnimalId) => void;
}

export const OnboardingGuardianStep: React.FC<OnboardingGuardianStepProps> = ({
  selectedGuardian,
  selectedGuardianId,
  recommendedGuardianId,
  weakSubject,
  onSelectGuardian,
}) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto mb-1">
        <Badge variant="accent" hasDot icon={<Shield className="w-3.5 h-3.5" />} className="mb-2">
          ARQUÉTIPO DE COMBATE • SEU MENTOR ANIMAL
        </Badge>
        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          Desperte Seu Guardião de Aprovação
        </h3>
        <p className="text-xs sm:text-sm mt-1 leading-relaxed text-[var(--text-secondary)]">
          Cada guardião personifica uma força cognitiva da fauna brasileira com bônus estratégicos reais:
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div
          className="relative p-4 sm:p-5 rounded-[var(--radius-xl)] border-2 bg-[var(--surface-card)] shadow-[var(--shadow-lg)] overflow-hidden"
          style={{ borderColor: selectedGuardian.glowColor || 'var(--brand-primary)' }}
          aria-live="polite"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10">
            <div className="relative shrink-0">
              <Avatar
                type={selectedGuardian.id as any}
                size="xl"
                shape="rounded"
                showInsignia={true}
              />
            </div>

            <div className="flex-1 space-y-2.5 text-center sm:text-left w-full">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <Badge variant="brand" size="sm">
                    {selectedGuardian.archetype}
                  </Badge>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Superpoder: {selectedGuardian.superpower}
                  </span>
                </div>
                <h4 className="text-xl font-black tracking-tight mt-0.5 text-[var(--text-primary)]">
                  {selectedGuardian.name}
                </h4>
                <p className="text-xs italic font-medium text-[var(--text-secondary)]">
                  {selectedGuardian.motto}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                <ProgressBar
                  value={selectedGuardian.stats.foco}
                  label="Foco Mental"
                  size="sm"
                  variant="brand"
                  showPercentage={true}
                  showCompleteMessage={false}
                />
                <ProgressBar
                  value={selectedGuardian.stats.velocidade}
                  label="Velocidade"
                  size="sm"
                  variant="gradient"
                  showPercentage={true}
                  showCompleteMessage={false}
                />
                <ProgressBar
                  value={selectedGuardian.stats.resiliencia}
                  label="Resiliência"
                  size="sm"
                  variant="accent"
                  showPercentage={true}
                  showCompleteMessage={false}
                />
                <ProgressBar
                  value={selectedGuardian.stats.estrategia}
                  label="Estratégia"
                  size="sm"
                  variant="brand"
                  showPercentage={true}
                  showCompleteMessage={false}
                />
              </div>

              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-md)] bg-[var(--brand-primary-subtle)] border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] text-[11px] font-mono font-bold text-left">
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>Bônus: +18% de Imunidade a Pegadinhas em {weakSubject}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-1.5 pt-1">
        <p className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          Alternar Guardião Cognitivo:
        </p>
        <div role="group" aria-label="Escolha seu guardião" className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {GUARDIAN_ANIMALS.map((animal) => {
            const isSelected = selectedGuardianId === animal.id;
            const isRecommended = recommendedGuardianId === animal.id;
            return (
              <button
                key={animal.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectGuardian(animal.id)}
                className={`border text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] p-2 rounded-[var(--radius-md)] text-center flex flex-col items-center gap-1 relative ${
                  isSelected
                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-subtle)] shadow-[var(--shadow-brand)] ring-2 ring-[var(--border-focus)]'
                    : 'bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-[var(--shadow-sm)]'
                }`}
              >
                <img
                  src={animal.avatar3dUrl}
                  alt={animal.name}
                  className={`w-10 h-10 rounded-full object-cover border-2 transition-transform ${
                    isSelected
                      ? 'border-indigo-500 scale-110 shadow-md shadow-indigo-500/30'
                      : 'border-slate-300 dark:border-white/20'
                  }`}
                />
                <span
                  className={`text-[10px] truncate max-w-full ${
                    isSelected ? 'font-black text-[var(--brand-primary)]' : 'font-bold text-[var(--text-secondary)]'
                  }`}
                >
                  {animal.name.split(' ')[0]}
                </span>
                {isRecommended && (
                  <span className="text-[8px] font-mono font-black uppercase tracking-wide text-[var(--brand-accent)]">
                    Ideal p/ seu edital
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface OnboardingVerdictStepProps {
  isCompiling: boolean;
  compilationProgress: number;
  tacticalLogs: string[];
  isDark: boolean;
  warName: string;
  selectedGuardian: GuardianAnimal;
  targetExamTitle: string;
  detectedBanca: string;
  dailyHoursGoal: number;
  weakSubject: string;
  projectedQuestionsPerDay: number;
  projectedFlashcardsPerDay: number;
  selectedPainSolution: string;
  onFinalSubmit: (
    destinationTab?: 'cycle' | 'simulator' | 'pricing' | 'checkout',
    ctaChosen?: 'pro' | 'lancamento' | 'elite' | 'black' | 'close',
    selectedPlan?: SubscriptionPlan
  ) => void;
}

export const OnboardingVerdictStep: React.FC<OnboardingVerdictStepProps> = ({
  isCompiling,
  compilationProgress,
  tacticalLogs,
  isDark,
  warName,
  selectedGuardian,
  targetExamTitle,
  detectedBanca,
  dailyHoursGoal,
  weakSubject,
  projectedQuestionsPerDay,
  projectedFlashcardsPerDay,
  selectedPainSolution,
  onFinalSubmit,
}) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      {isCompiling ? (
        <div className="max-w-xl mx-auto py-6 text-center space-y-5">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-[var(--brand-primary)] rounded-full animate-ping opacity-25 motion-reduce:animate-none" />
            <div className="relative w-full h-full rounded-[var(--radius-xl)] bg-[var(--brand-primary)] flex items-center justify-center shadow-[var(--shadow-brand)]">
              <BrainCircuit className="w-10 h-10 text-[var(--text-on-brand)] animate-pulse motion-reduce:animate-none" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)]">
              Compilando Plano Tático &amp; Passaporte...
            </h3>
            <p className="text-xs text-[var(--brand-primary)] font-mono font-bold">
              Engenharia reversa em execução • {compilationProgress}%
            </p>
          </div>

          <ProgressBar
            value={compilationProgress}
            size="md"
            variant="gradient"
            showPercentage={false}
            showCompleteMessage={false}
          />

          <div
            role="log"
            aria-live="polite"
            className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-strong)] text-[var(--text-secondary)] font-mono text-[11px] text-left space-y-1 shadow-inner max-h-40 overflow-y-auto"
          >
            {tacticalLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.startsWith('> [OK]')
                    ? 'text-[var(--status-success)] font-bold'
                    : log.startsWith('> [PASSAPORTE')
                    ? 'text-[var(--status-warning)] font-bold'
                    : 'text-[var(--text-muted)]'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4 animate-fadeIn">
          <div className="text-center space-y-1">
            <Badge variant="success" hasDot icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              PLANO TÁTICO CERTIFICADO
            </Badge>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)]">
              Seu Plano de Guerra Está Pronto, {warName.trim() || 'Futuro(a) Servidor(a)'}!
            </h3>
          </div>

          <div
            className={`passport-card relative rounded-[var(--radius-xl)] p-5 sm:p-6 border shadow-2xl overflow-hidden ${
              isDark
                ? 'bg-gradient-to-br from-[#070b14] via-[#0d1426] to-[#080d1a] border-cyan-500/40 text-white'
                : 'bg-gradient-to-br from-white via-indigo-50/70 to-blue-50/80 border-indigo-200 text-slate-900'
            }`}
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="flex items-center sm:items-start gap-4">
                <Avatar
                  type={selectedGuardian.id as any}
                  size="lg"
                  shape="rounded"
                  showInsignia={true}
                />

                <div className="space-y-1 text-center sm:text-left">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider inline-block border ${
                      isDark
                        ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                        : 'bg-amber-100 border-amber-300 text-amber-800'
                    }`}
                  >
                    ★ CREDENCIAL OFICIAL
                  </span>
                  <h4
                    className={`text-xl sm:text-2xl font-black tracking-tight break-words ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {warName.trim() || 'Concurseiro(a)'}
                  </h4>
                  <p className={`text-xs font-semibold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                    Guardião: {selectedGuardian.name} ({selectedGuardian.archetype})
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right font-mono text-[10px] shrink-0">
                <div
                  className={`px-3 py-1.5 rounded-[var(--radius-md)] border ${
                    isDark ? 'bg-white/5 border-white/15' : 'bg-white/90 border-indigo-200 shadow-sm'
                  }`}
                >
                  <span className={`font-bold block ${isDark ? 'text-cyan-300' : 'text-indigo-700'}`}>
                    ARGUS-2026-CERTIFIED
                  </span>
                  <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    PADRÃO SHA-256
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 mt-4 border-t text-left ${
                isDark ? 'border-white/15' : 'border-indigo-200/80'
              }`}
            >
              <div className="min-w-0">
                <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Edital Alvo
                </span>
                <span
                  className={`text-xs font-bold truncate block ${isDark ? 'text-white' : 'text-slate-900'}`}
                  title={targetExamTitle}
                >
                  {targetExamTitle}
                </span>
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Banca
                </span>
                <span className={`text-xs font-black block truncate ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}>
                  {detectedBanca}
                </span>
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Meta Diária
                </span>
                <span className={`text-xs font-black block ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  {dailyHoursGoal}h líquidas/dia
                </span>
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Alvo de Ataque
                </span>
                <span
                  className={`text-xs font-black truncate block ${isDark ? 'text-amber-300' : 'text-amber-700'}`}
                  title={weakSubject}
                >
                  {weakSubject}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--brand-primary)] flex items-center justify-center text-[var(--text-on-brand)]">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs font-black uppercase tracking-wider text-[var(--text-primary)]">
                Plano Tático das Primeiras 24 Horas
              </p>
            </div>

            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-start gap-2.5 p-2.5 rounded-[var(--radius-md)] bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                <div className="w-5 h-5 rounded-[var(--radius-xs)] bg-[var(--brand-primary)] flex items-center justify-center shrink-0 text-[var(--text-on-brand)] font-mono font-black text-[10px]">
                  1
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Ataque ({dailyHoursGoal}h):</strong>{' '}
                  {projectedQuestionsPerDay} Questões de {weakSubject} filtradas na banca {detectedBanca}.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-[var(--radius-md)] bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                <div className="w-5 h-5 rounded-[var(--radius-xs)] bg-[var(--brand-primary)] flex items-center justify-center shrink-0 text-[var(--text-on-brand)] font-mono font-black text-[10px]">
                  2
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Vacina Mnemônica:</strong>{' '}
                  {projectedFlashcardsPerDay} Flashcards com Repetição Espaçada SM-2.
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-[var(--radius-md)] bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                <div className="w-5 h-5 rounded-[var(--radius-xs)] bg-[var(--brand-accent)] flex items-center justify-center shrink-0 text-white font-mono font-black text-[10px]">
                  3
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Sua Dor Principal:</strong>{' '}
                  {selectedPainSolution}
                </p>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-[var(--radius-md)] bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                <div className="w-5 h-5 rounded-[var(--radius-xs)] bg-[var(--status-success)] flex items-center justify-center shrink-0 text-white font-mono font-black text-[10px]">
                  4
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Meta:</strong> Elevação de +15.4% de Precisão em {weakSubject} na primeira semana.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-blue-500/10 border border-blue-500/30 text-left space-y-1">
            <p className="text-xs font-black text-blue-900 dark:text-cyan-300">
              &quot;Gostaria de salvar este ponto cego no seu Caderno de Erros com Repetição Espaçada e garantir que não errará na prova?&quot;
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Sua anamnese mapeou o ponto vulnerável em <strong>{weakSubject}</strong> contra a banca <strong>{detectedBanca}</strong>. O algoritmo SM-2 agenda sua primeira blindagem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onFinalSubmit('pricing', 'pro', 'pro')}
              leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full uppercase tracking-wider"
            >
              Escolher Plano (PRO / ELITE / BLACK)
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => onFinalSubmit('checkout', 'lancamento', 'lancamento')}
              leftIcon={<CreditCard className="w-4 h-4 text-[var(--brand-accent)]" />}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full uppercase tracking-wider"
            >
              Garantir Passe R$ 97 (Checkout)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
