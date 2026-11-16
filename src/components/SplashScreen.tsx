'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, Cpu } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  minDurationMs = 1250,
}) => {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');
  const [progress, setProgress] = useState(12);
  const [telemetryText, setTelemetryText] = useState('Inicializando Kernel Neural v4.5...');
  const [telemetrySub, setTelemetrySub] = useState('Alocando tensores cognitivos');

  useEffect(() => {
    // Sequência de telemetria de alta tecnologia
    const t1 = setTimeout(() => {
      setProgress(38);
      setTelemetryText('Carregando Google AI Engine (Gemini 4 Carbon)...');
      setTelemetrySub('Parâmetros de raciocínio profundo ativados');
    }, 280);

    const t2 = setTimeout(() => {
      setProgress(74);
      setTelemetryText('Sincronizando Banco Oficial: Cebraspe, FGV, FCC, Vunesp & Cesgranrio...');
      setTelemetrySub('250+ questões auditadas com psicometria TRI');
    }, 620);

    const t3 = setTimeout(() => {
      setProgress(98);
      setTelemetryText('Calibrando detector de pegadinhas psicométricas...');
      setTelemetrySub('Algoritmo de repetição SM-2 engatilhado');
    }, 980);

    const t4 = setTimeout(() => {
      setProgress(100);
      setTelemetryText('Visão Onisciente Calibrada. Acesso Autorizado.');
      setTelemetrySub('Pronto para desarmar a banca');
      setPhase('fading');
    }, minDurationMs);

    const t5 = setTimeout(() => {
      setPhase('done');
      onFinish();
    }, minDurationMs + 380);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [minDurationMs, onFinish]);

  // Permite pular com 1 clique se o usuário desejar entrar imediatamente
  const handleSkip = () => {
    setPhase('fading');
    setTimeout(() => {
      setPhase('done');
      onFinish();
    }, 180);
  };

  if (phase === 'done') return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando Argus AI"
      onClick={handleSkip}
      className={`preserve-dark force-white fixed inset-0 z-[200] flex flex-col items-center justify-between bg-[#050811] text-white select-none cursor-pointer transition-all duration-400 ease-out py-10 px-4 ${
        phase === 'fading' ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ═══ EFEITOS DE ILUMINAÇÃO HOLOGRÁFICA & NEBULOSA DE FUNDO ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow Central Ciano */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/10 rounded-full blur-[130px] animate-pulse" />
        
        {/* Linhas de Grade Cibernética com fade out */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ═══ TOPO: HUD DE TELEMETRIA SUPERIOR ═══ */}
      <header className="relative z-10 w-full max-w-md flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-bold">ARGUS OS v4.5</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>GEMINI 4 CARBON</span>
        </div>
      </header>

      {/* ═══ CENTRO: ÍRIS NEURAL CIBERNÉTICA HOLOGRÁFICA ═══ */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-sm space-y-7">
        
        {/* A Íris do Argus em SVG Dinâmico de Alta Tecnologia */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          
          {/* Anel Orbital 1: Externo com Marcadores (Rotação Horária) */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="68"
              fill="none"
              stroke="rgba(6, 182, 212, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            <circle
              cx="72"
              cy="72"
              r="68"
              fill="none"
              stroke="rgba(59, 130, 246, 0.7)"
              strokeWidth="2"
              strokeDasharray="24 120"
            />
          </svg>

          {/* Anel Orbital 2: Médio com Dentes e Nós (Rotação Anti-Horária) */}
          <svg className="absolute inset-2 w-[128px] h-[128px] animate-[spin_8s_linear_infinite_reverse]" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="none"
              stroke="rgba(147, 51, 234, 0.3)"
              strokeWidth="1"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="none"
              stroke="rgba(6, 182, 212, 0.9)"
              strokeWidth="2.5"
              strokeDasharray="16 80"
            />
            {/* Marcadores de nós cardeais */}
            <circle cx="64" cy="6" r="2.5" fill="#06b6d4" />
            <circle cx="122" cy="64" r="2.5" fill="#3b82f6" />
            <circle cx="64" cy="122" r="2.5" fill="#a855f7" />
            <circle cx="6" cy="64" r="2.5" fill="#06b6d4" />
          </svg>

          {/* Anel Orbital 3: Interno Fino com Pulso */}
          <div className="absolute w-24 h-24 rounded-full border border-cyan-400/40 bg-slate-950/80 backdrop-blur-md shadow-2xl shadow-cyan-500/40 flex items-center justify-center overflow-hidden">
            
            {/* Feixe de Varredura Laser Horizontal */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_8px_#06b6d4]" />
            
            {/* Pupila Central / Íris Argus com reflexo */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-600 via-indigo-600 to-fuchsia-600 p-[2px] shadow-lg shadow-cyan-500/50 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#050811] flex items-center justify-center overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_16px_rgba(6,182,212,0.8)] animate-pulse flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                </div>
              </div>
            </div>

            {/* Brilho de lente oblíquo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ═══ TIPOGRAFIA & BRANDING ═══ */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono tracking-widest uppercase">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>Copiloto Cognitivo de Alta Precisão</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white !text-white flex items-center justify-center gap-2">
            <span className="text-white !text-white">Argus</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
              AI
            </span>
          </h1>

          <p className="text-xs text-slate-300 font-medium tracking-wide">
            Desarmando a banca examinadora antes da prova
          </p>
        </div>

        {/* ═══ TELEMETRIA & BARRA DE PROGRESSO NEON ═══ */}
        <div className="w-72 sm:w-80 space-y-2.5 pt-1">
          {/* Barra de Progresso com Brilho Neon */}
          <div className="relative w-full h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status em Tempo Real + Porcentagem */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-0.5">
            <span className="text-cyan-300 font-semibold truncate max-w-[220px]">
              {telemetryText}
            </span>
            <span className="text-white font-bold ml-2">{progress}%</span>
          </div>

          <p className="text-[10px] text-slate-300 font-sans tracking-wide">
            {telemetrySub}
          </p>
        </div>

      </main>

      {/* ═══ RODAPÉ: SELO OFICIAL POWERED BY GOOGLE AI ENGINE ═══ */}
      <footer className="relative z-10 flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white/[0.07] to-white/[0.03] border border-white/15 shadow-lg backdrop-blur-md">
          {/* Ícone de 4 cores do Google AI / Gemini */}
          <div className="flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
          </div>

          <span className="text-[11px] font-bold tracking-wide text-slate-200">
            Powered by <strong className="text-white font-extrabold">Google AI Engine</strong>
          </span>

          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
            Gemini 4 Carbon
          </span>
        </div>

        <span className="text-[10px] text-slate-400 font-mono tracking-widest opacity-60">
          CLIQUE EM QUALQUER LUGAR PARA ENTRAR &bull; ESC PARA PULAR
        </span>
      </footer>
    </div>
  );
};
