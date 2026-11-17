'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu,
  Target,
  Scale,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { GoogleAIEngineBadge } from './GoogleAIEngineBadge';
import {
  BrandLogo,
  BRAND_LOGO_CONCEPTS,
  BrandLogoVariantId,
  getSavedLogoVariant,
  setSavedLogoVariant,
} from './BrandLogo';

interface SplashScreenProps {
  onComplete?: () => void;
  onFinish?: () => void;
  durationMs?: number;
}

const BOOT_MODULES = [
  {
    id: 'bancas',
    title: 'Radar de Bancas & Provas',
    subtitle: 'Cebraspe, FGV, FCC, Vunesp & Cesgranrio (278 questões)',
    metric: '50+ por banca',
    icon: Target,
    threshold: 22,
  },
  {
    id: 'pareto',
    title: 'Matriz Estatística 80/20',
    subtitle: 'Ponderando artigos, súmulas e incidência real de corte',
    metric: '100% calibrado',
    icon: Scale,
    threshold: 48,
  },
  {
    id: 'carbon',
    title: 'Motor Gemini 4 Carbon',
    subtitle: 'Engenharia reversa de distratores e repetição SM-2',
    metric: 'gemini-4-carbon',
    icon: Cpu,
    threshold: 74,
  },
  {
    id: 'cockpit',
    title: 'Cockpit de Aprovação',
    subtitle: 'Arena 60/40, Smart Vade Mecum e Caderno de Erros prontos',
    metric: 'Online',
    icon: Layers,
    threshold: 96,
  },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  onFinish,
  durationMs = 5200,
}) => {
  const [progress, setProgress] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<BrandLogoVariantId>('aegis-prism');
  const completedRef = useRef(false);
  const onDoneCallback = onFinish || onComplete;
  const onCompleteRef = useRef(onDoneCallback);

  useEffect(() => {
    onCompleteRef.current = onFinish || onComplete;
  }, [onComplete, onFinish]);

  useEffect(() => {
    setSelectedLogo(getSavedLogoVariant());
  }, []);

  const finishSplash = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    try {
      sessionStorage.setItem('argus_splash_seen_v4', 'true');
    } catch {}
    setIsFadingOut(true);
    setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 320);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('argus_splash_seen_v4') === 'true') {
        completedRef.current = true;
        if (onCompleteRef.current) onCompleteRef.current();
        return;
      }
    } catch {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishSplash();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Minimum 5.2 seconds smooth boot progression
    const effectiveDuration = Math.max(durationMs, 5200);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / effectiveDuration) * 100));
      setElapsedMs(Math.min(elapsed, effectiveDuration));
      setProgress(pct);

      if (elapsed >= effectiveDuration) {
        clearInterval(interval);
        finishSplash();
      }
    }, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [durationMs, finishSplash]);

  const handleSelectLogo = (variant: BrandLogoVariantId) => {
    setSelectedLogo(variant);
    setSavedLogoVariant(variant);
  };

  const activeConcept =
    BRAND_LOGO_CONCEPTS.find((c) => c.id === selectedLogo) || BRAND_LOGO_CONCEPTS[0];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Inicializando ecossistema Argus AI em Modo Claro Editorial"
      style={{
        backgroundColor: '#F8FAFC',
        color: '#0F172A',
      }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto select-none transition-all duration-300 ease-out ${
        isFadingOut ? 'opacity-0 scale-[1.015] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Fundo Porcelana Editorial Suíço com Malha Arquitetônica e Halos Luminosos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Radial Porcelain Luminance */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 18% 15%, rgba(37, 99, 235, 0.10) 0%, transparent 48%), radial-gradient(circle at 82% 20%, rgba(6, 182, 212, 0.10) 0%, transparent 46%), radial-gradient(circle at 50% 88%, rgba(79, 70, 229, 0.08) 0%, transparent 52%)',
          }}
        />
        {/* Architectural Drafting Grid */}
        <div
          className="absolute inset-0 opacity-65"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Monólito Central de Comando em Porcelana & Cristal (Light Mode Luxury) */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          borderColor: 'rgba(203, 213, 225, 0.9)',
        }}
        className="relative z-10 w-full max-w-3xl rounded-[2.25rem] border shadow-[0_28px_80px_-16px_rgba(37,99,235,0.16)] backdrop-blur-2xl p-6 sm:p-8 md:p-9 transition-all"
      >
        {/* Barra Superior de Telemetria */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200/80">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] text-blue-800">
              Arquitetura Cognitiva • Calibração em Tempo Real
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <GoogleAIEngineBadge variant="compact" modelName="Gemini 4 Carbon" />
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-mono text-[11px] font-black text-slate-700">
              {(elapsedMs / 1000).toFixed(1)}s / {(Math.max(durationMs, 5200) / 1000).toFixed(1)}s
            </span>
          </div>
        </div>

        {/* Seção Hero Central: Emblema com Anéis de Precisão + Tipografia Editorial */}
        <div className="py-6 flex flex-col items-center text-center">
          {/* Emblema com Anéis Orbitais Safira/Ciano */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-4">
            {/* Halo Luminoso Porcelana */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(6,182,212,0.10) 55%, transparent 75%)',
                filter: 'blur(14px)',
                transform: 'scale(1.3)',
              }}
            />

            {/* Anel Orbital Externo */}
            <svg
              className="absolute inset-0 w-full h-full animate-[spin_16s_linear_infinite]"
              viewBox="0 0 128 128"
            >
              <defs>
                <linearGradient id="lightRingGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="1.5"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="url(#lightRingGrad1)"
                strokeWidth="2.5"
                strokeDasharray="64 120"
                strokeLinecap="round"
              />
            </svg>

            {/* Anel Orbital Interno Reverso */}
            <svg
              className="absolute inset-2.5 w-[calc(100%-20px)] h-[calc(100%-20px)] animate-[spin_11s_linear_infinite_reverse]"
              viewBox="0 0 108 108"
            >
              <circle
                cx="54"
                cy="54"
                r="49"
                fill="none"
                stroke="#06B6D4"
                strokeOpacity="0.35"
                strokeWidth="1.5"
                strokeDasharray="18 28"
                strokeLinecap="round"
              />
            </svg>

            {/* Pedestal Circular Porcelana com o Novo Logotipo */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white border-2 border-blue-100 shadow-[0_12px_32px_-6px_rgba(37,99,235,0.25)] flex items-center justify-center p-2.5">
              <BrandLogo size={64} variant={selectedLogo} />
            </div>

            {/* Badge Flutuante 80/20 */}
            <span className="absolute -bottom-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-wider shadow-md">
              {activeConcept.shortName}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[11px] font-extrabold text-indigo-700 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Engenharia Reversa de Bancas Examinadoras</span>
          </div>

          <h1
            style={{ color: '#0F172A' }}
            className="text-3xl sm:text-4xl font-black tracking-tight leading-none"
          >
            Argus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
              AI
            </span>
          </h1>

          <p
            style={{ color: '#475569' }}
            className="mt-2 text-xs sm:text-sm font-medium max-w-lg leading-relaxed"
          >
            Desarmando as pegadinhas psicotécnicas da sua banca antes do dia da prova com
            diagnóstico preditivo 80/20.
          </p>

          {/* Estúdio Interativo dos 5 Novos Logotipos (1-Click Live Switcher) */}
          <div className="mt-4 w-full max-w-xl p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/90">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>Escolha sua Identidade Visual (5 Novos Conceitos):</span>
              </span>
              <span className="text-[10px] font-bold text-blue-700">
                {activeConcept.name}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {BRAND_LOGO_CONCEPTS.map((concept) => {
                const isSelected = selectedLogo === concept.id;
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => handleSelectLogo(concept.id)}
                    className={`flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-blue-600 shadow-sm ring-2 ring-blue-500/20 scale-[1.02]'
                        : 'bg-white/70 hover:bg-white border-slate-200/80 opacity-80 hover:opacity-100'
                    }`}
                    title={`${concept.name} — ${concept.tagline}`}
                  >
                    <img
                      src={concept.imageUrl}
                      alt={concept.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    />
                    <span
                      className={`text-[9px] sm:text-[10px] font-extrabold truncate max-w-full ${
                        isSelected ? 'text-blue-700' : 'text-slate-600'
                      }`}
                    >
                      {concept.shortName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid 2x2 de Módulos Sendo Calibrados em Tempo Real (5.2 segundos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6">
          {BOOT_MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            const isCompleted = progress >= mod.threshold;
            const prevThreshold = idx === 0 ? 0 : BOOT_MODULES[idx - 1].threshold;
            const isActive = progress >= prevThreshold && progress < mod.threshold;

            return (
              <div
                key={mod.id}
                style={{
                  backgroundColor: isCompleted
                    ? '#F0FDF4'
                    : isActive
                    ? '#EFF6FF'
                    : '#F8FAFC',
                  borderColor: isCompleted
                    ? '#BBF7D0'
                    : isActive
                    ? '#BFDBFE'
                    : '#E2E8F0',
                }}
                className="p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3"
              >
                <div
                  className={`p-2 rounded-xl shrink-0 mt-0.5 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isActive
                      ? 'bg-blue-600 text-white shadow-xs animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      style={{ color: '#0F172A' }}
                      className="text-xs font-black truncate"
                    >
                      {mod.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isActive
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200/70 text-slate-600'
                      }`}
                    >
                      {isCompleted ? 'PRONTO' : isActive ? 'CALIBRANDO' : mod.metric}
                    </span>
                  </div>
                  <p
                    style={{ color: '#475569' }}
                    className="text-[11px] font-medium line-clamp-1 mt-0.5"
                  >
                    {mod.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Barra de Progresso de Alta Precisão (5.2s) + Botão de Entrada */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: '#334155' }} className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>
                {progress < 25
                  ? 'Carregando banco auditado das 5 bancas examinadoras...'
                  : progress < 50
                  ? 'Calculando pesos estatísticos 80/20 do edital ativo...'
                  : progress < 80
                  ? 'Sincronizando motor Google Gemini 4 Carbon...'
                  : 'Liberando Cockpit de Aprovação Argus AI...'}
              </span>
            </span>
            <span className="font-mono text-sm font-black text-blue-700">
              {progress}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 border border-slate-200/90 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 transition-all duration-75 ease-out shadow-xs"
              style={{ width: `${Math.max(progress, 4)}%` }}
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>
              Tempo de calibração cognitiva: <strong>5,2 segundos</strong>
            </span>
            <button
              type="button"
              onClick={finishSplash}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
            >
              <span>Pular abertura (ESC)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
