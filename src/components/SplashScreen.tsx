'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { GoogleAIEngineBadge } from './GoogleAIEngineBadge';

interface SplashScreenProps {
  onFinish: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  minDurationMs = 850,
}) => {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');
  const [progress, setProgress] = useState(18);
  const [statusLabel, setStatusLabel] = useState('Inicializando Motor Cognitivo Argus...');

  const handleSkip = useCallback(() => {
    setPhase('done');
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(56);
      setStatusLabel('Sincronizando Bancas: Cebraspe, FGV, FCC, Vunesp & OAB...');
    }, Math.round(minDurationMs * 0.32));

    const t2 = setTimeout(() => {
      setProgress(92);
      setStatusLabel('Calibrando Psicometria TRI & Detector de Pegadinhas...');
    }, Math.round(minDurationMs * 0.68));

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusLabel('Visão Onisciente Calibrada.');
      setPhase('fading');
    }, minDurationMs);

    const t4 = setTimeout(() => {
      setPhase('done');
      onFinish();
    }, minDurationMs + 240);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [minDurationMs, onFinish]);

  if (phase === 'done') return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando Argus AI"
      onClick={handleSkip}
      style={{ backgroundColor: '#040711', color: '#ffffff' }}
      className={`preserve-dark force-white fixed inset-0 z-[200] flex flex-col items-center justify-between select-none cursor-pointer transition-opacity duration-300 ease-out py-10 px-6 ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient Radial Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(99,102,241,0.16) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* Top Subtle Pill */}
      <div className="relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-wider">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span style={{ color: '#cbd5e1' }}>SISTEMA COGNITIVO DE ALTA PRECISÃO</span>
      </div>

      {/* Center Emblem & Identity */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md space-y-6 my-auto">
        {/* Official Circular Neural Iris with Dual Orbital Rings */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <svg
            className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="76"
              fill="none"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />
            <circle
              cx="80"
              cy="80"
              r="76"
              fill="none"
              stroke="rgba(99, 102, 241, 0.85)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="36 140"
            />
          </svg>

          {/* Inner Counter-Rotating Ring */}
          <svg
            className="absolute inset-2.5 w-[140px] h-[140px] animate-[spin_7s_linear_infinite_reverse]"
            viewBox="0 0 140 140"
          >
            <circle
              cx="70"
              cy="70"
              r="66"
              fill="none"
              stroke="rgba(16, 185, 129, 0.75)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="24 110"
            />
          </svg>

          {/* Official Circular Neural Eye Image */}
          <div className="relative w-28 h-28 sm:w-30 sm:h-30 rounded-full overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.45)] border-2 border-cyan-400/50 bg-[#060b18] flex items-center justify-center">
            <img
              src="/argus-iris-circle.png"
              alt="Argus AI — Íris Neural Oficial"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Brand Title & Tagline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-[11px] font-bold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span style={{ color: '#67e8f9' }}>Engenharia Reversa de Bancas Examinadoras</span>
          </div>

          <h1
            style={{ color: '#ffffff' }}
            className="text-4xl sm:text-5xl font-black tracking-tight flex items-center justify-center gap-2.5 pt-1"
          >
            <span style={{ color: '#ffffff' }}>Argus</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
              AI
            </span>
          </h1>

          <p style={{ color: '#94a3b8' }} className="text-xs sm:text-sm font-medium max-w-xs mx-auto">
            Desarmando as pegadinhas da banca antes do dia da sua prova
          </p>
        </div>

        {/* Sleek Progress Bar */}
        <div className="w-72 sm:w-80 space-y-2 pt-2">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span style={{ color: '#93c5fd' }} className="truncate max-w-[235px] font-medium">
              {statusLabel}
            </span>
            <span style={{ color: '#ffffff' }} className="font-bold">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Official Google AI Engine Seal */}
      <div className="relative z-10 flex flex-col items-center gap-2.5">
        <GoogleAIEngineBadge variant="hero" modelName="Gemini 4 Carbon" />
        <span style={{ color: '#64748b' }} className="text-[10px] font-mono tracking-wider">
          Toque em qualquer lugar ou pressione ESC para entrar imediatamente
        </span>
      </div>
    </div>
  );
};

export default SplashScreen;
