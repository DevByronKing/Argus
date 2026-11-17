'use client';

import React from 'react';
import { Cpu } from 'lucide-react';

interface GoogleAIEngineBadgeProps {
  variant?: 'compact' | 'hero' | 'footer' | 'card';
  className?: string;
  showModel?: boolean;
  modelName?: string;
}

export const GoogleAIEngineBadge: React.FC<GoogleAIEngineBadgeProps> = ({
  variant = 'compact',
  className = '',
  showModel = true,
  modelName = 'Gemini 4 Carbon',
}) => {
  if (variant === 'hero') {
    return (
      <div
        style={{ backgroundColor: '#090e1a', color: '#ffffff' }}
        className={`preserve-dark inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950 border border-slate-700/80 dark:border-cyan-500/35 shadow-xl shadow-cyan-500/10 backdrop-blur-md transition-all hover:scale-[1.02] cursor-default select-none ${className}`}
        aria-label={`Selo Oficial: Powered by Google AI Engine com ${modelName}`}
      >
        {/* As 4 Cores Icônicas do Google */}
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#4285F4] shadow-[0_0_6px_#4285F4]" />
          <span className="w-2 h-2 rounded-full bg-[#EA4335] shadow-[0_0_6px_#EA4335]" />
          <span className="w-2 h-2 rounded-full bg-[#FBBC05] shadow-[0_0_6px_#FBBC05]" />
          <span className="w-2 h-2 rounded-full bg-[#34A853] shadow-[0_0_6px_#34A853]" />
        </div>

        <span style={{ color: '#ffffff' }} className="text-xs sm:text-sm font-bold text-white tracking-wide">
          Powered by{' '}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Google AI Engine
          </span>
        </span>

        {showModel && (
          <span
            style={{ color: '#67e8f9' }}
            className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 font-bold"
          >
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span style={{ color: '#67e8f9' }}>{modelName}</span>
          </span>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-800 dark:text-cyan-300 text-[11px] font-bold select-none ${className}`}>
        <div className="flex items-center gap-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
        </div>
        <span>Powered by Google AI Engine</span>
        {showModel && (
          <span className="font-mono text-[10px] text-indigo-700 dark:text-cyan-300 font-extrabold">
            &bull; {modelName}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none ${className}`}>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
        </div>
        <span>
          Arquitetura de IA oficial: <strong className="text-slate-800 dark:text-slate-200">Google AI Engine ({modelName})</strong>
        </span>
      </div>
    );
  }

  // Padrão: Compact (Navbar e cabeçalhos) - Sempre legível em Modo Claro e Modo Escuro
  return (
    <div
      style={{ backgroundColor: '#090e1a', color: '#ffffff' }}
      className={`preserve-dark inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-700/70 dark:border-cyan-500/35 text-[11px] font-bold text-white shadow-xs select-none ${className}`}
      title={`Motor de Inteligência Artificial Oficial: Google AI Engine (${modelName})`}
    >
      <div className="flex items-center gap-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
      </div>
      <span style={{ color: '#e2e8f0' }} className="tracking-tight text-slate-200 text-[10px] sm:text-[11px]">
        Powered by <strong style={{ color: '#ffffff' }} className="text-white font-extrabold">Google AI</strong>
      </span>
      {showModel && (
        <span
          style={{ color: '#67e8f9' }}
          className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/35"
        >
          Carbon
        </span>
      )}
    </div>
  );
};

export default GoogleAIEngineBadge;
