'use client';

import React from 'react';
import {
  Target,
  Clock,
  ShieldAlert,
  ChevronRight,
  ArrowLeft,
  Home,
} from 'lucide-react';
import { ExamNotice, StudentProfile, CANONICAL_MODULES } from '@/lib/types';

interface GlobalExamContextBarProps {
  selectedExam: ExamNotice;
  studentProfile?: StudentProfile;
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onOpenEditalSelector?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
}

const EXTRA_TAB_TITLES: Record<string, string> = {
  questions: 'Banco de Questões Auditadas',
  summaries: 'Resumos Inteligentes 80/20',
  resumos: 'Resumos Inteligentes 80/20',
  psychometrics: 'Psicometria TRI das Bancas',
  dashboard: 'Cockpit de Desempenho (TRI)',
  settings: 'Configurações & Perfil',
  subscription: 'Minha Assinatura',
  'pricing-plans': 'Planos & Assinaturas',
  checkout: 'Finalizar Matrícula Segura',
  'welcome-success': 'Matrícula Confirmada',
  help: 'Central de Ajuda & Suporte',
};

export const GlobalExamContextBar: React.FC<GlobalExamContextBarProps> = ({
  selectedExam,
  studentProfile,
  activeTab,
  onNavigateTab,
  onOpenEditalSelector,
  onGoBack,
  onGoHome,
}) => {
  // Não exibir na landing page para manter a apresentação limpa
  if (activeTab === 'landing') {
    return null;
  }

  const days = selectedExam.daysRemaining || 85;
  const isUrgent = days <= 60;

  const currentModuleTitle =
    CANONICAL_MODULES[activeTab as keyof typeof CANONICAL_MODULES]?.title ||
    EXTRA_TAB_TITLES[activeTab] ||
    activeTab;

  const handleBackClick = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      onNavigateTab('landing');
    }
  };

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      onNavigateTab('landing');
    }
  };

  return (
    <div className="w-full bg-white/95 dark:bg-gradient-to-r dark:from-slate-900/95 dark:via-indigo-950/85 dark:to-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-indigo-500/20 text-slate-800 dark:text-white py-2 px-3 sm:px-6 relative z-15 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Lado Esquerdo: Botão Voltar, Início e Trilha de Navegação (Breadcrumb) */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <button
            type="button"
            onClick={handleBackClick}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 font-bold text-xs transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
            title="Voltar para a página anterior"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Voltar</span>
          </button>

          <button
            type="button"
            onClick={handleHomeClick}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 font-bold text-xs transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
            title="Ir para a Página Inicial"
          >
            <Home className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Página Inicial</span>
          </button>

          {/* Trilha Breadcrumb do Módulo Atual */}
          <div className="hidden md:flex items-center gap-1.5 pl-1.5 text-xs min-w-0">
            <span
              onClick={handleHomeClick}
              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors"
            >
              Início
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-extrabold text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 px-2.5 py-0.5 rounded-lg truncate max-w-[260px]">
              {currentModuleTitle}
            </span>
          </div>
        </div>

        {/* Lado Direito: Identidade do Concurso Ativo + Ação Rápida de Trocar */}
        <div className="flex items-center gap-2 min-w-0 ml-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 min-w-0">
            <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span
              className="font-black text-slate-900 dark:text-slate-100 text-xs truncate max-w-[140px] sm:max-w-[240px]"
              title={selectedExam.title}
            >
              {selectedExam.title}
            </span>
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-cyan-300 shrink-0">
              {selectedExam.banca}
            </span>
            <span
              className={`hidden lg:inline-flex items-center gap-1 text-[11px] pl-1 shrink-0 ${
                isUrgent
                  ? 'text-amber-700 dark:text-amber-300 font-bold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Clock className="w-3 h-3 text-amber-500" />
              <span>{days}d</span>
            </span>
          </div>

          {studentProfile?.weakSubject && (
            <div className="hidden xl:flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/25 text-rose-700 dark:text-rose-300 text-[10px] font-bold shrink-0">
              <ShieldAlert className="w-3 h-3 text-rose-500 dark:text-rose-400" />
              <span>Foco: {studentProfile.weakSubject}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              if (onOpenEditalSelector) {
                onOpenEditalSelector();
              } else {
                onNavigateTab('edital');
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-500/30 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 whitespace-nowrap shrink-0"
            title="Alternar edital em foco ou carregar novo edital oficial"
          >
            <span className="hidden sm:inline">Trocar Edital</span>
            <span className="inline sm:hidden">Trocar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
