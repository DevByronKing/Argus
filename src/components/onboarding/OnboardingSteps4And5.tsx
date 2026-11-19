'use client';

import React from 'react';
import {
  Shield,
  Zap,
  CheckCircle2,
  Flame,
  Sparkles,
  ArrowRight,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Star,
} from 'lucide-react';
import { GUARDIAN_ANIMALS } from '@/lib/guardianAnimals';
import { GuardianAnimal, GuardianAnimalId, SubscriptionPlan } from '@/lib/types';
import { BrandLogo } from '@/components/BrandLogo';
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
  const currentIndex = Math.max(
    0,
    GUARDIAN_ANIMALS.findIndex((g) => g.id === selectedGuardian.id)
  );
  const handleCycle = (delta: number) => {
    const nextIdx = (currentIndex + delta + GUARDIAN_ANIMALS.length) % GUARDIAN_ANIMALS.length;
    onSelectGuardian(GUARDIAN_ANIMALS[nextIdx].id);
  };
  const isCurrentRecommended = recommendedGuardianId === selectedGuardian.id;

  return (
    <div className="space-y-4 pt-1 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto">
        <Badge variant="accent" hasDot icon={<Shield className="w-3.5 h-3.5" />} className="mb-2">
          ARQUÉTIPO DE COMBATE • SEU MENTOR ANIMAL
        </Badge>
        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
          Escolha Seu Guardião de Aprovação
        </h3>
        <p className="text-xs sm:text-sm mt-1 leading-relaxed text-[var(--text-secondary)]">
          Navegue entre os 7 guardiões da fauna brasileira e ative o arquétipo que vai guiar sua rotina:
        </p>
      </div>

      {/* Palco Centralizado do Mentor Animal */}
      <div className="max-w-3xl mx-auto">
        <div
          className="relative p-5 sm:p-6 rounded-[var(--radius-xl)] border-2 bg-[var(--surface-card)] shadow-[var(--shadow-lg)] overflow-hidden"
          style={{ borderColor: selectedGuardian.glowColor || 'var(--brand-primary)' }}
          aria-live="polite"
        >
          {/* Halo de luz suave ao fundo do guardião */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ background: selectedGuardian.glowColor || '#6366f1' }}
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-4">
            {/* Avatar Centralizado em Destaque com Setas de Navegação */}
            <div className="w-full flex items-center justify-center gap-4 sm:gap-8">
              <button
                type="button"
                onClick={() => handleCycle(-1)}
                aria-label="Guardião anterior"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all cursor-pointer shrink-0 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="relative flex flex-col items-center">
                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-1.5 shadow-2xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${selectedGuardian.glowColor || '#6366f1'}, #06b6d4)`,
                  }}
                >
                  <img
                    src={selectedGuardian.avatar3dUrl}
                    alt={selectedGuardian.name}
                    className="w-full h-full rounded-[20px] object-cover bg-slate-950"
                  />
                  {isCurrentRecommended && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                      <Star className="w-3 h-3 fill-slate-950" /> Ideal p/ seu edital
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCycle(1)}
                aria-label="Próximo guardião"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all cursor-pointer shrink-0 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Nome, Arquétipo, Superpoder e Lema */}
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge variant="brand" size="sm">
                  {selectedGuardian.archetype}
                </Badge>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                  ⚡ {selectedGuardian.superpower}
                </span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
                {selectedGuardian.name}
              </h4>
              <p className="text-xs sm:text-sm italic font-medium text-[var(--text-secondary)]">
                {selectedGuardian.motto}
              </p>
            </div>

            {/* Atributos Cognitivos em Grade Limpa */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 w-full max-w-xl pt-1 text-left">
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

            {/* Bônus Estratégico Ativado */}
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--brand-primary-subtle)] border border-[var(--brand-primary)]/30 text-[var(--brand-primary)] text-[11px] sm:text-xs font-mono font-bold">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>Bônus: +18% de Imunidade a Pegadinhas em {weakSubject}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Galeria Tátil de Seleção dos 7 Guardiões */}
      <div className="max-w-3xl mx-auto space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Galeria de Guardiões ({currentIndex + 1}/{GUARDIAN_ANIMALS.length}):
          </p>
          <span className="text-[11px] text-[var(--text-muted)]">
            Toque para comparar atributos
          </span>
        </div>
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
                className={`border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] p-2 rounded-2xl text-center flex flex-col items-center gap-1.5 relative ${
                  isSelected
                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-subtle)] shadow-[var(--shadow-brand)] ring-2 ring-[var(--border-focus)] -translate-y-0.5'
                    : 'bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-[var(--shadow-sm)]'
                }`}
              >
                <img
                  src={animal.avatar3dUrl}
                  alt={animal.name}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 transition-transform ${
                    isSelected
                      ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/30'
                      : 'border-slate-300 dark:border-white/15'
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-[11px] truncate max-w-full ${
                    isSelected ? 'font-black text-[var(--brand-primary)]' : 'font-bold text-[var(--text-secondary)]'
                  }`}
                >
                  {animal.name.split(' ')[0]}
                </span>
                {isRecommended && (
                  <span className="text-[8px] font-mono font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-300">
                    Ideal
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

const COMPILATION_STAGES = [
  { threshold: 20, label: 'Mapeando padrões e pegadinhas da banca examinadora' },
  { threshold: 50, label: 'Construindo matriz de prioridades 80/20 do seu edital' },
  { threshold: 78, label: 'Calibrando Repetição Espaçada SM-2 e bônus do Guardião' },
  { threshold: 95, label: 'Emitindo seu Passaporte Oficial de Aprovação Argus' },
];

export const OnboardingVerdictStep: React.FC<OnboardingVerdictStepProps> = ({
  isCompiling,
  compilationProgress,
  tacticalLogs,
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
  const latestLog = tacticalLogs[tacticalLogs.length - 1] || 'Calibrando plano tático personalizado...';

  return (
    <div className="space-y-4 animate-fadeIn">
      {isCompiling ? (
        <div className="max-w-lg mx-auto py-4 sm:py-6 text-center space-y-5">
          {/* Emblema Central Padronizado Argus AI */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-600 animate-spin" />
            <div className="relative w-22 h-22 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-lg flex items-center justify-center p-2">
              <BrandLogo size={64} showGlow />
            </div>
            <img
              src={selectedGuardian.avatar3dUrl}
              alt={selectedGuardian.name}
              className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full object-cover border-2 border-[var(--surface-card)] shadow-md"
            />
          </div>

          <div className="space-y-1">
            <Badge variant="brand" size="sm">
              MOTOR PSICOMÉTRICO ARGUS • {compilationProgress}%
            </Badge>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)]">
              Preparando Seu Passaporte de Aprovação
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Personalizando sua estratégia para <strong>{detectedBanca}</strong> ({dailyHoursGoal}h/dia)
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <ProgressBar
              value={compilationProgress}
              size="md"
              variant="gradient"
              showPercentage={false}
              showCompleteMessage={false}
            />
          </div>

          {/* Checklist Visual Limpo no Padrão do Design System */}
          <div className="grid grid-cols-1 gap-2 text-left max-w-md mx-auto">
            {COMPILATION_STAGES.map((stage, idx) => {
              const isDone = compilationProgress >= stage.threshold;
              const isActive =
                !isDone &&
                (idx === 0 || compilationProgress >= COMPILATION_STAGES[idx - 1].threshold);
              return (
                <div
                  key={stage.label}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]'
                      : isActive
                      ? 'bg-[var(--brand-primary-subtle)] border-[var(--brand-primary)]/40 text-[var(--text-primary)]'
                      : 'bg-[var(--surface-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] opacity-70'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-[var(--brand-primary)] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[var(--border-strong)] shrink-0" />
                  )}
                  <span className="text-xs font-semibold leading-snug">{stage.label}</span>
                </div>
              );
            })}
          </div>

          <div role="log" aria-live="polite" className="sr-only">
            {latestLog}
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

          {/* Credencial Oficial — Fundo Navy Intencional com Alto Contraste em Light e Dark Mode */}
          <div
            className="relative rounded-[var(--radius-xl)] p-5 sm:p-6 border border-cyan-500/35 shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #070b14 0%, #0f172a 55%, #091224 100%)',
              color: '#ffffff',
            }}
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <Avatar
                  type={selectedGuardian.id as any}
                  size="lg"
                  shape="rounded"
                  showInsignia={true}
                />

                <div className="space-y-1 text-center sm:text-left">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider inline-block border"
                    style={{
                      backgroundColor: 'rgba(251, 191, 36, 0.16)',
                      borderColor: 'rgba(251, 191, 36, 0.45)',
                      color: '#fcd34d',
                    }}
                  >
                    ★ CREDENCIAL OFICIAL
                  </span>
                  <h4
                    className="text-xl sm:text-2xl font-black tracking-tight break-words"
                    style={{ color: '#ffffff' }}
                  >
                    {warName.trim() || 'Concurseiro(a)'}
                  </h4>
                  <p className="text-xs font-semibold" style={{ color: '#a5b4fc' }}>
                    Guardião: {selectedGuardian.name} ({selectedGuardian.archetype})
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right font-mono text-[10px] shrink-0">
                <div
                  className="px-3 py-1.5 rounded-[var(--radius-md)] border"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'rgba(255, 255, 255, 0.16)',
                  }}
                >
                  <span className="font-bold block" style={{ color: '#67e8f9' }}>
                    ARGUS-2026-CERTIFIED
                  </span>
                  <span className="text-[9px] block" style={{ color: '#94a3b8' }}>
                    PADRÃO SHA-256
                  </span>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-4 border-t text-left"
              style={{ borderColor: 'rgba(255, 255, 255, 0.14)' }}
            >
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono block" style={{ color: '#94a3b8' }}>
                  Edital Alvo
                </span>
                <span
                  className="text-xs font-bold truncate block mt-0.5"
                  style={{ color: '#f8fafc' }}
                  title={targetExamTitle}
                >
                  {targetExamTitle}
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono block" style={{ color: '#94a3b8' }}>
                  Banca
                </span>
                <span className="text-xs font-black block truncate mt-0.5" style={{ color: '#38bdf8' }}>
                  {detectedBanca}
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono block" style={{ color: '#94a3b8' }}>
                  Meta Diária
                </span>
                <span className="text-xs font-black block mt-0.5" style={{ color: '#34d399' }}>
                  {dailyHoursGoal}h líquidas/dia
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono block" style={{ color: '#94a3b8' }}>
                  Alvo de Ataque
                </span>
                <span
                  className="text-xs font-black truncate block mt-0.5"
                  style={{ color: '#fbbf24' }}
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

          <div className="p-3.5 rounded-2xl bg-[var(--brand-primary-subtle)] border border-[var(--brand-primary)]/25 text-left space-y-1">
            <p className="text-xs font-black text-[var(--text-primary)]">
              &quot;Gostaria de salvar este ponto cego no seu Caderno de Erros com Repetição Espaçada e garantir que não errará na prova?&quot;
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
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
