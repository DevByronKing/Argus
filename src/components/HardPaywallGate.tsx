'use client';

import React from 'react';
import {
  Lock,
  Crown,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Home,
  Compass,
  Zap,
} from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';
import { isFreemiumAllowed } from '@/lib/abTesting';

interface HardPaywallGateProps {
  moduleTitle: string;
  moduleSubtitle: string;
  features: string[];
  badgeText?: string;
  userPlan?: SubscriptionPlan;
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  onOpenPricing?: () => void;
  onStartOnboarding?: () => void;
  onGoHome?: () => void;
  children: React.ReactNode;
}

export const HardPaywallGate: React.FC<HardPaywallGateProps> = ({
  moduleTitle,
  moduleSubtitle,
  features,
  badgeText = 'Acesso Exclusivo para Assinantes',
  userPlan = 'aspirante',
  onSelectPlan,
  onOpenPricing,
  onStartOnboarding,
  onGoHome,
  children,
}) => {
  const isLocked = !isFreemiumAllowed() && userPlan === 'aspirante';

  if (!isLocked) {
    return <>{children}</>;
  }

  const handleSelectPlan = (targetPlan: SubscriptionPlan) => {
    if (onSelectPlan) {
      onSelectPlan(targetPlan);
      return;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('argus-open-pricing', {
          detail: { plan: targetPlan, tab: 'checkout' },
        })
      );
    }
  };

  const handleOpenAllPlans = () => {
    if (onOpenPricing) {
      onOpenPricing();
      return;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('argus-open-pricing', {
          detail: { plan: 'pro', tab: 'plans' },
        })
      );
    }
  };

  const handleStartAnamnesis = () => {
    if (onStartOnboarding) {
      onStartOnboarding();
      return;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('argus-open-onboarding'));
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
      return;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('argus-go-home'));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      <div className="relative overflow-hidden rounded-[2rem] bg-white/95 dark:bg-[#0b1022]/95 border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/10 p-6 sm:p-10 backdrop-blur-xl">
        {/* Glows sutis de fundo alinhados ao Design System */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Topo: Cadeado + Selo Zero Freemium */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-white/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{badgeText}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Garantia Incondicional 7 Dias (CDC)</span>
            </div>
          </div>

          {/* Título e Explicação Direta */}
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/25 shrink-0">
              <Crown className="w-8 h-8" />
            </div>

            <div className="space-y-2 flex-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {moduleTitle}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {moduleSubtitle}
              </p>
            </div>
          </div>

          {/* Lista do que o aluno desbloqueia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Cards Resumidos dos 4 Planos Pagos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => handleSelectPlan('lancamento')}
              className="p-4 rounded-2xl border-2 border-orange-400/80 bg-orange-50/70 dark:bg-orange-950/25 text-left hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 dark:text-orange-300">
                  1 Concurso
                </span>
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white">Passe Até a Prova</p>
              <p className="text-lg font-black text-orange-600 dark:text-orange-400 mt-0.5">
                R$ 97 <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">único</span>
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                Sem mensalidade • Gemini 3.8 Flash
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPlan('pro')}
              className="p-4 rounded-2xl border-2 border-blue-600 bg-blue-50/80 dark:bg-blue-950/30 text-left hover:shadow-md transition-all cursor-pointer group ring-2 ring-blue-500/20"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-cyan-300">
                  Mais Escolhido
                </span>
                <Zap className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white">Plano PRO</p>
              <p className="text-lg font-black text-blue-700 dark:text-cyan-400 mt-0.5">
                R$ 49<span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">/mês (anual)</span>
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                Todos os concursos • Flash + Deep
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPlan('elite')}
              className="p-4 rounded-2xl border border-amber-300 dark:border-amber-500/40 bg-amber-50/60 dark:bg-amber-950/20 text-left hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  IA Frontier
                </span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white">ELITE VIP</p>
              <p className="text-lg font-black text-amber-700 dark:text-amber-400 mt-0.5">
                R$ 89<span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">/mês (anual)</span>
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                Gemini 4 Carbon + Discursivas + TRI
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPlan('black')}
              className="preserve-dark p-4 rounded-2xl border-2 border-amber-400 bg-slate-950 text-white text-left hover:brightness-110 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                  Até a Posse
                </span>
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-sm font-black text-white">BLACK Vitalício</p>
              <p className="text-lg font-black text-amber-400 mt-0.5">
                R$ 1.497 <span className="text-[11px] font-bold text-slate-300">único</span>
              </p>
              <p className="text-[11px] text-slate-300 mt-1">
                Acesso perpétuo + Prova Oral IA
              </p>
            </button>
          </div>

          {/* CTAs Principais */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleSelectPlan('lancamento')}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Liberar Agora — Passe R$ 97</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleOpenAllPlans}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              <span>Comparar Planos (PRO / ELITE / BLACK)</span>
            </button>
          </div>

          {/* Ações Gratuitas Permitidas (Anamnese até Passaporte & Página Inicial) */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={handleStartAnamnesis}
              className="inline-flex items-center gap-1.5 font-bold text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Fazer Anamnese Cognitiva Gratuita até o Passaporte</span>
            </button>

            <button
              type="button"
              onClick={handleGoHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Voltar à Página Inicial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardPaywallGate;
