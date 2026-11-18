'use client';

import React, { useState, useEffect } from 'react';
import {
  Target,
  Clock,
  ChevronRight,
  ArrowLeft,
  Home,
  Check,
  Sparkles,
  X,
  Plus,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
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
  onUpdateProfile?: (updatedProfile: StudentProfile) => void;
}

const EXTRA_TAB_TITLES: Record<string, string> = {
  questions: 'Banco de Questões Comentadas',
  summaries: 'Resumos Direto ao Ponto',
  resumos: 'Resumos Direto ao Ponto',
  psychometrics: 'Análise de Pegadinhas da Banca',
  dashboard: 'Meu Desempenho',
  settings: 'Configurações & Meu Perfil',
  subscription: 'Minha Assinatura',
  'pricing-plans': 'Planos & Preços',
  checkout: 'Finalizar Assinatura Segura',
  'welcome-success': 'Assinatura Confirmada',
  help: 'Central de Ajuda & Suporte',
};

const DEFAULT_FOCUS_SUBJECTS = [
  { name: 'Direito Constitucional', desc: 'Direitos fundamentais, organização do Estado e STF' },
  { name: 'Direito Administrativo', desc: 'Licitações (14.133), Improbidade, Servidores (8.112) e Atos' },
  { name: 'Língua Portuguesa', desc: 'Interpretação de texto, crase, pontuação e reescrita' },
  { name: 'Raciocínio Lógico & Matemática', desc: 'Tabela-verdade, proporção, probabilidade e conjuntos' },
  { name: 'Informática & TI', desc: 'Segurança da informação, redes, nuvem e sistemas' },
  { name: 'Direito Penal & Processual', desc: 'Teoria do crime, inquérito policial, prisões e leis penais' },
  { name: 'Direito do Trabalho & Processo (TRT)', desc: 'CLT, súmulas do TST, contrato de trabalho e recursos' },
  { name: 'Seguridade Social (INSS)', desc: 'Benefícios previdenciários, custeio e Lei 8.213/91' },
  { name: 'Direito Civil & Processual Civil', desc: 'Contratos, responsabilidade civil, prazos e recursos' },
  { name: 'Direito Tributário & Contabilidade', desc: 'CTN, impostos, imunidades, balanço e DRE' },
  { name: 'Redação & Peças Práticas', desc: 'Texto dissertativo, estudos de caso e 2ª Fase OAB' },
];

export const GlobalExamContextBar: React.FC<GlobalExamContextBarProps> = ({
  selectedExam,
  studentProfile,
  activeTab,
  onNavigateTab,
  onOpenEditalSelector,
  onGoBack,
  onGoHome,
  onUpdateProfile,
}) => {
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [selectedFocuses, setSelectedFocuses] = useState<string[]>([]);
  const [customSubjectInput, setCustomSubjectInput] = useState('');
  const [isDistractionFreeMode, setIsDistractionFreeMode] = useState(false);

  // Sincroniza a lista de focos a partir do perfil do aluno ou localStorage
  useEffect(() => {
    const rawFocus =
      studentProfile?.focusSubjects && studentProfile.focusSubjects.length > 0
        ? studentProfile.focusSubjects
        : (studentProfile?.weakSubject || 'Informática & TI')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

    try {
      const savedLocal = localStorage.getItem('argus_multi_focus_subjects');
      if (savedLocal) {
        const parsed = JSON.parse(savedLocal);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedFocuses(parsed);
          return;
        }
      }
    } catch {}

    setSelectedFocuses(rawFocus.length > 0 ? rawFocus : ['Informática & TI']);
  }, [studentProfile?.weakSubject, studentProfile?.focusSubjects]);

  // Permite abrir o seletor de focos de qualquer lugar do sistema (inclusive da Navbar)
  useEffect(() => {
    const handleOpenFocusModal = () => setIsFocusModalOpen(true);
    window.addEventListener('open-focus-selector', handleOpenFocusModal);
    return () => window.removeEventListener('open-focus-selector', handleOpenFocusModal);
  }, []);

  // Aplica classe de Modo Foco Sem Distrações no body quando ativado
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isDistractionFreeMode) {
      document.body.classList.add('argus-distraction-free');
    } else {
      document.body.classList.remove('argus-distraction-free');
    }
  }, [isDistractionFreeMode]);

  const toggleFocusSubject = (subjectName: string) => {
    setSelectedFocuses((prev) => {
      let next: string[];
      if (prev.includes(subjectName)) {
        next = prev.filter((item) => item !== subjectName);
        if (next.length === 0) next = [subjectName]; // Mantém pelo menos 1 foco
      } else {
        next = [...prev, subjectName];
      }
      return next;
    });
  };

  const handleAddCustomFocus = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customSubjectInput.trim();
    if (!clean) return;
    if (!selectedFocuses.includes(clean)) {
      setSelectedFocuses((prev) => [...prev, clean]);
    }
    setCustomSubjectInput('');
  };

  const handleSaveFocusChanges = () => {
    const joined = selectedFocuses.join(', ');
    try {
      localStorage.setItem('argus_multi_focus_subjects', JSON.stringify(selectedFocuses));
    } catch {}

    if (onUpdateProfile && studentProfile) {
      onUpdateProfile({
        ...studentProfile,
        weakSubject: joined,
        focusSubjects: selectedFocuses,
        updatedAt: new Date().toISOString(),
      });
    }
    setIsFocusModalOpen(false);
  };

  const toggleDistractionFree = () => {
    const nextState = !isDistractionFreeMode;
    setIsDistractionFreeMode(nextState);
    if (nextState && typeof document !== 'undefined' && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (!nextState && typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Combina matérias do edital atual com as matérias gerais para o aluno escolher quantas quiser
  const availableSubjects = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const sub of selectedExam.subjects || []) {
      map.set(sub.name, `Matéria do seu edital (${sub.relevancePercentage}% da prova • Peso ${sub.weight})`);
    }
    for (const item of DEFAULT_FOCUS_SUBJECTS) {
      if (!map.has(item.name)) {
        map.set(item.name, item.desc);
      }
    }
    for (const custom of selectedFocuses) {
      if (!map.has(custom)) {
        map.set(custom, 'Matéria personalizada adicionada por você');
      }
    }
    return Array.from(map.entries()).map(([name, desc]) => ({ name, desc }));
  }, [selectedExam.subjects, selectedFocuses]);

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

  const focusSummaryText =
    selectedFocuses.length === 1
      ? selectedFocuses[0]
      : `${selectedFocuses[0]} +${selectedFocuses.length - 1}`;

  return (
    <>
      {activeTab !== 'landing' && (
        <div className="w-full bg-white/95 dark:bg-gradient-to-r dark:from-slate-900/95 dark:via-indigo-950/85 dark:to-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-indigo-500/20 text-slate-800 dark:text-white py-2 px-3 sm:px-6 relative z-15 shadow-xs transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs overflow-x-auto no-scrollbar">
            
            {/* Lado Esquerdo: Botão Voltar, Início e Página Atual */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={handleBackClick}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 font-bold text-xs transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
                title="Voltar para a tela anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                onClick={handleHomeClick}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 font-bold text-xs transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
                title="Voltar para a Página Inicial"
              >
                <Home className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span className="hidden sm:inline">Início</span>
              </button>

              {/* Indicador Claro de Onde o Aluno Está */}
              <div className="hidden md:flex items-center gap-1.5 pl-1 text-xs min-w-0">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-extrabold text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/70 dark:border-indigo-500/30 px-2.5 py-1 rounded-lg truncate max-w-[240px]">
                  {currentModuleTitle}
                </span>
              </div>
            </div>

            {/* Lado Direito: Seletor de Múltiplos Focos + Modo Foco + Concurso Ativo */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
              
              {/* Botão Interativo: Escolher 1 ou Mais Focos de Estudo a Qualquer Hora */}
              <button
                type="button"
                onClick={() => setIsFocusModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/15 dark:hover:bg-rose-500/25 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-extrabold transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95"
                title="Clique para escolher uma ou mais matérias em foco a qualquer momento"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                <span className="truncate max-w-[160px] sm:max-w-[210px]">
                  Foco ({selectedFocuses.length}): {focusSummaryText}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-rose-200/70 dark:bg-rose-500/30 text-[10px] font-black">
                  Alterar
                </span>
              </button>

              {/* Botão Direto: Modo Foco (Tela Cheia / Sem Distrações) */}
              <button
                type="button"
                onClick={toggleDistractionFree}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95 ${
                  isDistractionFreeMode
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-white/10'
                }`}
                title="Ativar ou desativar o Modo Foco em tela cheia sem distrações"
              >
                {isDistractionFreeMode ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Sair do Modo Foco</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                    <span className="hidden sm:inline">Modo Foco</span>
                  </>
                )}
              </button>

              {/* Concurso Ativo */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 min-w-0">
                <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span
                  className="font-black text-slate-900 dark:text-slate-100 text-xs truncate max-w-[160px]"
                  title={selectedExam.title}
                >
                  {selectedExam.title}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-cyan-300 shrink-0">
                  {selectedExam.banca}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] pl-1 shrink-0 ${
                    isUrgent
                      ? 'text-amber-700 dark:text-amber-300 font-bold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>{days}d</span>
                </span>
              </div>

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
                title="Trocar de concurso ou enviar novo edital em PDF"
              >
                <span className="hidden sm:inline">Trocar Concurso</span>
                <span className="inline sm:hidden">Concurso</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL PADRONIZADO (ESTILO ANAMNESE): ESCOLHER MÚLTIPLOS FOCOS & MODO FOCO A QUALQUER HORA */}
      {isFocusModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Escolher Matérias em Foco e Modo Foco"
          className="fixed inset-0 z-[130] argus-modal-backdrop flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setIsFocusModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0b1022] border border-slate-200 dark:border-indigo-500/30 shadow-2xl p-5 sm:p-7 my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra de topo com destaque */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Personalização Livre • Mude Quando Quiser</span>
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Quais Matérias Você Quer Focar Agora?
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Marque <strong>quantas matérias quiser</strong> (1, 2, 3 ou mais). O sistema adaptará seus treinos, resumos e dicas imediatamente.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFocusModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Opção de Modo Foco Sem Distrações */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>Modo Foco de Estudo (Tela Limpa Sem Distrações)</span>
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                  Ative para estudar em tela cheia ou abrir o Simulador de Questões em modo foco total.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleDistractionFree}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isDistractionFreeMode
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white hover:bg-slate-100'
                  }`}
                >
                  {isDistractionFreeMode ? '✓ Tela Cheia Ativa' : 'Ativar Tela Cheia'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFocusModalOpen(false);
                    onNavigateTab('simulator');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all cursor-pointer shadow-xs"
                >
                  Ir para Questões em Foco
                </button>
              </div>
            </div>

            {/* Resumo das Matérias Selecionadas */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
                Selecionadas ({selectedFocuses.length}):
              </span>
              {selectedFocuses.map((foc) => (
                <span
                  key={foc}
                  onClick={() => toggleFocusSubject(foc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold cursor-pointer hover:bg-blue-700 transition-colors"
                  title="Clique para remover"
                >
                  <span>{foc}</span>
                  <X className="w-3 h-3" />
                </span>
              ))}
            </div>

            {/* Grid de Matérias (Múltipla Escolha) */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[290px] overflow-y-auto pr-1 custom-scrollbar">
              {availableSubjects.map((item) => {
                const isChecked = selectedFocuses.includes(item.name);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => toggleFocusSubject(item.name)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isChecked
                        ? 'bg-blue-50/90 dark:bg-blue-500/20 border-blue-500 ring-1 ring-blue-500/30 shadow-2xs'
                        : 'bg-white dark:bg-slate-900/70 hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                        isChecked
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Adicionar Outra Matéria Personalizada */}
            <form onSubmit={handleAddCustomFocus} className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={customSubjectInput}
                onChange={(e) => setCustomSubjectInput(e.target.value)}
                placeholder="Quer adicionar outra matéria específica? Digite aqui (ex: Legislação Aduaneira, ECA...)"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            </form>

            {/* Rodapé Salvar */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Você pode alterar esses focos a qualquer hora na barra superior.
              </span>
              <button
                type="button"
                onClick={handleSaveFocusChanges}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-black shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Salvar Meus Focos ({selectedFocuses.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
