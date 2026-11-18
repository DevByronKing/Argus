'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { BrandLogo } from './BrandLogo';

interface SplashScreenProps {
  onComplete?: () => void;
  onFinish?: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  onFinish,
  durationMs = 5000,
}) => {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const onDoneCallback = onFinish || onComplete;
  const onCompleteRef = useRef(onDoneCallback);

  useEffect(() => {
    onCompleteRef.current = onFinish || onComplete;
  }, [onComplete, onFinish]);

  const triggerExit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    try {
      sessionStorage.setItem('argus_splash_seen_v6', 'true');
    } catch {}
    setPhase('exit');
    setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 550);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('argus_splash_seen_v6') === 'true') {
        completedRef.current = true;
        if (onCompleteRef.current) onCompleteRef.current();
        return;
      }
    } catch {}

    const effectiveDuration = Math.max(durationMs, 5000);
    const activeDuration = effectiveDuration - 550;
    const startTime = Date.now();

    const exitTimer = setTimeout(() => {
      triggerExit();
    }, activeDuration);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / activeDuration) * 100));
      setProgress(pct);
      if (elapsed >= activeDuration) {
        clearInterval(interval);
      }
    }, 35);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(exitTimer);
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [durationMs, triggerExit]);

  const ringRadius = 72;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - progress / 100);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando Argus AI"
      onClick={triggerExit}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer argus-modal-backdrop transition-all duration-500 ease-out ${
        phase === 'exit'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      <style>{`
        @keyframes argusCleanFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.015);
          }
        }
        @keyframes argusCleanReveal {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }
        .argus-clean-reveal {
          animation: argusCleanReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .argus-clean-float {
          animation: argusCleanFloat 3.6s ease-in-out infinite;
        }
      `}</style>

      {/* Halo Radial Suave e Limpo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.14) 0%, rgba(6, 182, 212, 0.06) 50%, transparent 75%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Centro Minimalista: Logo + Nome + Linha Sutil */}
      <div className="relative z-10 flex flex-col items-center argus-clean-reveal">
        <div className="relative w-40 h-40 flex items-center justify-center argus-clean-float">
          {/* Anel Circular Fino e Elegante */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 160 160"
          >
            <defs>
              <linearGradient id="argusCleanRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r={ringRadius}
              fill="none"
              stroke="currentColor"
              className="text-slate-200/70 dark:text-white/10"
              strokeWidth="2.5"
            />
            <circle
              cx="80"
              cy="80"
              r={ringRadius}
              fill="none"
              stroke="url(#argusCleanRing)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringOffset}
              className="transition-all duration-100 ease-out"
            />
          </svg>

          {/* Medalhão da Logo Oficial */}
          <div className="relative z-10 rounded-full p-2 bg-white dark:bg-slate-900 shadow-[0_16px_40px_-10px_rgba(37,99,235,0.28)] border border-slate-100 dark:border-white/10">
            <BrandLogo size={108} showGlow />
          </div>
        </div>

        {/* Marca Limpa Sem Excesso de Texto */}
        <h1 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
          <span>Argus</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            AI
          </span>
        </h1>

        {/* Barra Ultrafina Minimalista */}
        <div className="mt-5 w-32 h-1 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-75 ease-out"
            style={{ width: `${Math.max(progress, 6)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
