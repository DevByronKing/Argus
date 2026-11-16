'use client';

import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  minDurationMs = 1350,
}) => {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');
  const [progress, setProgress] = useState(15);
  const [loadingText, setLoadingText] = useState('Inicializando neurônios cognitivos...');

  useEffect(() => {
    // Sequência de status da IA
    const t1 = setTimeout(() => {
      setProgress(55);
      setLoadingText('Sincronizando editais e psicometria TRI...');
    }, 450);

    const t2 = setTimeout(() => {
      setProgress(95);
      setLoadingText('Calibrando visão onisciente do Argus...');
    }, 900);

    const t3 = setTimeout(() => {
      setProgress(100);
      setLoadingText('Pronto para desarmar a banca.');
      setPhase('fading');
    }, minDurationMs);

    const t4 = setTimeout(() => {
      setPhase('done');
      onFinish();
    }, minDurationMs + 400);

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
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-400 ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Halo de luz ciano de fundo */}
      <div className="absolute w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none -bottom-10" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm space-y-6">
        {/* Ícone Pulsante da Íris do Argus */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-cyan-500/20 blur-xl animate-ping opacity-40" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/30 flex items-center justify-center overflow-hidden">
            <img
              src="/favicon.svg"
              alt="Logo Argus AI"
              width={64}
              height={64}
              className="w-14 h-14 object-contain animate-pulse"
              loading="eager"
            />
          </div>
        </div>

        {/* Marca & Tipografia */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
            <span>Argus</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              AI
            </span>
          </h1>
          <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
            O Copiloto Cognitivo da Aprovação
          </p>
        </div>

        {/* Barra de Progresso Fina e Elegante */}
        <div className="w-60 space-y-2 pt-2">
          <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] font-medium text-slate-400 tracking-wide transition-all h-4">
            {loadingText}
          </p>
        </div>
      </div>
    </div>
  );
};
