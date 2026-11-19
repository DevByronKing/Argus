'use client';

import React from 'react';
import {
  BrainCircuit,
  AlertTriangle,
  Lock,
  Keyboard,
  BookOpen,
} from 'lucide-react';
import { Question } from '@/lib/types';

interface QuizPsychometricSidebarProps {
  currentQuestion: Question;
  isAnswered: boolean;
  personalNotes: string;
  setPersonalNotes: (notes: string) => void;
}

export const QuizPsychometricSidebar: React.FC<QuizPsychometricSidebarProps> = ({
  currentQuestion,
  isAnswered,
  personalNotes,
  setPersonalNotes,
}) => {
  return (
    <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
      {/* Card 1: Raio-X Psicométrico da Questão */}
      <div className="glass-panel p-5 rounded-3xl bg-white/80 dark:bg-dark-card/70 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-cyan-500" />
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Raio-X Psicométrico da Banca
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 text-[10px] font-black">
            TRI Nível B
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Taxa de Acerto</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">52%</span>
            <span className="text-[10px] text-amber-500 block">Pegadinha Frequente</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Tempo Médio</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">1m 45s</span>
            <span className="text-[10px] text-emerald-500 block">Ritmo Recomendado</span>
          </div>
        </div>

        {/* Armadilha: Oculta antes de responder (evita dar spoiler da questão) */}
        {isAnswered ? (
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 text-xs space-y-1 animate-fadeIn">
            <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Armadilha Mapeada da Banca ({currentQuestion.banca}):</span>
            </span>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentQuestion.cognitiveAnalysis?.commonTrap || 'Atenção aos distratores sutis da banca.'}
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-surface/60 border border-slate-200 dark:border-white/5 text-xs space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Armadilha da Banca Oculta</span>
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Selecione sua alternativa e confirme para a IA desbloquear a armadilha e a fundamentação legal.
            </p>
          </div>
        )}
      </div>

      {/* Card 2: Guia de Atalhos & Ergonomia Cognitiva */}
      <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-dark-card/50 border border-slate-200 dark:border-white/10 text-xs space-y-2.5">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
          <Keyboard className="w-4 h-4 text-blue-500" />
          <span>Atalhos de Alta Velocidade</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">A-E</kbd> Selecionar
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">Enter</kbd> Confirmar
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">F</kbd> Modo Foco
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">→</kbd> Próxima
          </span>
        </div>
      </div>

      {/* Card 3: Anotações Táticas do Concurseiro */}
      <div className="p-5 rounded-3xl bg-white/80 dark:bg-dark-card/70 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            Anotação Pessoal da Questão:
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Auto-save</span>
        </div>
        <textarea
          value={personalNotes}
          onChange={(e) => setPersonalNotes(e.target.value)}
          placeholder="Escreva seu mnemônico, pegadinha anotada ou artigo relacionado..."
          rows={3}
          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
};
