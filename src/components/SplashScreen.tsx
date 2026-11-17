'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { BrandLogo } from './BrandLogo';
import { GoogleAIEngineBadge } from './GoogleAIEngineBadge';

interface SplashScreenProps {
  onComplete?: () => void;
  onFinish?: () => void;
  durationMs?: number;
}

const STATUS_STEPS = [
  'Inicializando a Lente Cognitiva Argus...',
  'Sincronizando editais, leis e últimas provas comentadas...',
  'Calibrando seu plano diário e caderno de revisão...',
  'Ambiente de estudos pronto. Bem-vindo ao Argus AI!',
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  onFinish,
  durationMs = 5200,
}) => {
  const [phase, setPhase] = useState<'enter' | 'scan' | 'converge' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const onDoneCallback = onFinish || onComplete;
  const onCompleteRef = useRef(onDoneCallback);

  useEffect(() => {
    onCompleteRef.current = onFinish || onComplete;
  }, [onComplete, onFinish]);

  // Partículas determinísticas alinhadas às cores do Design System (Indigo, Royal Blue e Cyan)
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: ((i * 37 + 13) % 92) + 4,
        y: ((i * 61 + 29) % 88) + 6,
        size: ((i * 7) % 4) + 2.5,
        duration: ((i * 11) % 4) + 3.5,
        delay: ((i * 5) % 20) / 10,
        opacity: ((i * 9) % 35) / 100 + 0.18,
      })),
    []
  );

  const triggerExit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    try {
      sessionStorage.setItem('argus_splash_seen_v5', 'true');
    } catch {}
    setPhase('exit');
    setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 750);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('argus_splash_seen_v5') === 'true') {
        completedRef.current = true;
        if (onCompleteRef.current) onCompleteRef.current();
        return;
      }
    } catch {}

    const effectiveDuration = Math.max(durationMs, 5200);
    const activeProgressDuration = effectiveDuration - 750;
    const startTime = Date.now();

    const scanTimer = setTimeout(() => {
      if (!completedRef.current) setPhase('scan');
    }, 900);

    const convergeTimer = setTimeout(() => {
      if (!completedRef.current) setPhase('converge');
    }, activeProgressDuration - 900);

    const exitTimer = setTimeout(() => {
      triggerExit();
    }, activeProgressDuration);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / activeProgressDuration) * 100));
      setProgress(pct);
      if (elapsed >= activeProgressDuration) {
        clearInterval(interval);
      }
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(convergeTimer);
      clearTimeout(exitTimer);
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [durationMs, triggerExit]);

  const statusIndex =
    progress < 28 ? 0 : progress < 62 ? 1 : progress < 90 ? 2 : 3;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando plataforma Argus AI"
      onClick={triggerExit}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer argus-modal-backdrop ${
        phase === 'exit' ? 'argus-splash-curtain-exit pointer-events-none' : ''
      }`}
    >
      {/* ═══ Coreografia CSS Integrada ao Design System Argus ═══ */}
      <style>{`
        @keyframes argusIrisAwaken {
          0% {
            opacity: 0;
            transform: scale(0.62) translateY(12px);
            filter: blur(18px);
          }
          65% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
            filter: blur(0px);
          }
        }

        @keyframes argusIrisPortalExit {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          45% {
            opacity: 0.92;
            transform: scale(1.06);
            filter: blur(2px);
          }
          100% {
            opacity: 0;
            transform: scale(1.22);
            filter: blur(20px);
          }
        }

        @keyframes argusLogoZoomThrough {
          0% {
            transform: scale(1);
            filter: blur(0px);
          }
          40% {
            transform: scale(0.94);
          }
          100% {
            transform: scale(1.45);
            opacity: 0;
            filter: blur(14px);
          }
        }

        @keyframes argusRippleWave {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.68);
          }
          35% {
            opacity: 0.48;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.45);
          }
        }

        @keyframes argusLaserSweep {
          0%, 100% {
            transform: translateY(-68px) scaleX(0.75);
            opacity: 0;
          }
          20%, 80% {
            opacity: 0.85;
            transform: translateY(0px) scaleX(1.05);
          }
          50% {
            transform: translateY(68px) scaleX(0.75);
            opacity: 0.9;
          }
        }

        @keyframes argusAuroraBreath {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.55;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.16) rotate(6deg);
            opacity: 0.85;
          }
        }

        @keyframes argusParticleDrift {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(8px, -18px, 0);
          }
        }

        @keyframes argusTextStaggerUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        .argus-splash-curtain-exit {
          animation: argusIrisPortalExit 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .argus-iris-enter {
          animation: argusIrisAwaken 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .argus-iris-exit {
          animation: argusLogoZoomThrough 0.72s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }
        .argus-stagger-1 {
          animation: argusTextStaggerUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }
        .argus-stagger-2 {
          animation: argusTextStaggerUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
        }
        .argus-stagger-3 {
          animation: argusTextStaggerUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
        }
      `}</style>

      {/* ═══ CAMADA 1: Iluminação Volumétrica do Design System (Mesma da Anamnese) ═══ */}
      <div
        className="absolute top-1/2 left-1/2 w-[540px] h-[540px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(6, 182, 212, 0.12) 45%, transparent 72%)',
          animation: 'argusAuroraBreath 4.5s ease-in-out infinite',
          filter: 'blur(24px)',
        }}
      />

      {/* ═══ CAMADA 2: Partículas Ópticas Flutuantes ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background:
                p.id % 3 === 0
                  ? 'rgba(37, 99, 235, 0.5)'
                  : p.id % 3 === 1
                  ? 'rgba(6, 182, 212, 0.55)'
                  : 'rgba(79, 70, 229, 0.48)',
              boxShadow: `0 0 ${p.size * 2.5}px rgba(6, 182, 212, 0.3)`,
              opacity: p.opacity,
              animation: `argusParticleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ═══ CAMADA 3: Núcleo Animado da Íris Neural Oficial + Tipografia do Design System ═══ */}
      <div
        className={`relative z-10 flex flex-col items-center px-6 max-w-lg w-full ${
          phase === 'exit' ? 'argus-iris-exit' : 'argus-iris-enter'
        }`}
      >
        {/* Sistema Óptico Central com Anéis de Ressonância e Feixe de Leitura */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
          {/* Ondas de Pulso Expansivas (Sonar Cognitivo) */}
          <div
            className="absolute top-1/2 left-1/2 w-36 h-36 rounded-full border border-blue-500/30 dark:border-cyan-400/30 pointer-events-none"
            style={{
              animation: 'argusRippleWave 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-36 h-36 rounded-full border border-cyan-500/25 dark:border-indigo-400/25 pointer-events-none"
            style={{
              animation: 'argusRippleWave 2.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-36 h-36 rounded-full border border-indigo-500/20 pointer-events-none"
            style={{
              animation: 'argusRippleWave 2.8s cubic-bezier(0.16, 1, 0.3, 1) 1.8s infinite',
            }}
          />

          {/* Anel SVG Orbital Externo com Progresso Circular Sincronizado */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 192 192"
          >
            <defs>
              <linearGradient id="argusOpticalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="50%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            {/* Trilha Sutil do Anel */}
            <circle
              cx="96"
              cy="96"
              r="84"
              fill="none"
              stroke="currentColor"
              className="text-slate-300/60 dark:text-slate-800/80"
              strokeWidth="2"
            />
            {/* Arco Dinâmico que Preenche de 0% a 100% */}
            <circle
              cx="96"
              cy="96"
              r="84"
              fill="none"
              stroke="url(#argusOpticalGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 84}
              strokeDashoffset={2 * Math.PI * 84 * (1 - progress / 100)}
              className="transition-all duration-100 ease-out"
            />
          </svg>

          {/* Anel Orbital Tracejado em Rotação Contínua */}
          <svg
            className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] animate-[spin_14s_linear_infinite]"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="#06B6D4"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="10 14"
              strokeLinecap="round"
            />
          </svg>

          {/* Feixe Óptico de Escaneamento sobre a Íris */}
          <div
            className="absolute w-32 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] z-20 pointer-events-none"
            style={{
              animation: 'argusLaserSweep 2.4s ease-in-out infinite',
            }}
          />

          {/* LOGOTIPO ORIGINAL DA ÍRIS NEURAL ARGUS */}
          <div
            className={`relative z-10 rounded-full p-1.5 bg-white/90 dark:bg-slate-900/90 shadow-[0_20px_50px_-10px_rgba(37,99,235,0.35)] border border-white/80 dark:border-indigo-500/30 transition-transform duration-700 ${
              phase === 'converge' ? 'scale-105 ring-4 ring-cyan-400/30' : 'scale-100'
            }`}
          >
            <BrandLogo size={128} showGlow />
          </div>
        </div>

        {/* Tipografia Central do Design System */}
        <div className="mt-7 text-center argus-stagger-1">
          <div className="inline-flex items-center justify-center mb-3">
            <GoogleAIEngineBadge variant="compact" modelName="Gemini 4 Carbon" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <span>Argus</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
              AI
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-indigo-600 dark:text-cyan-400">
            A Lente Cognitiva da Aprovação
          </p>
        </div>

        {/* Pílula Minimalista de Progresso & Status (Glass Pill do Design System) */}
        <div className="mt-8 w-full max-w-sm argus-stagger-2">
          <div className="glass-pill bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-blue-500/5">
            <div className="flex items-center justify-between gap-2 text-xs mb-2">
              <span className="font-bold text-slate-700 dark:text-slate-200 truncate">
                {STATUS_STEPS[statusIndex]}
              </span>
              <span className="font-mono font-black text-blue-600 dark:text-cyan-400 shrink-0">
                {progress}%
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-75 ease-out"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] font-medium text-slate-400 dark:text-slate-500 argus-stagger-3">
            Toque na tela ou pressione <strong className="font-semibold">ESC</strong> para avançar
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
