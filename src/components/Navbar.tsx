'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Compass,
  ScrollText,
  CalendarClock,
  Crosshair,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Feather,
  Activity,
  Sun,
  Moon,
  Flame, 
  Crown,
  Zap,
  Sparkles,
  BrainCircuit,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  BookCheck,
  Smartphone,
  Microscope,
  Layers,
  Database,
  Radar,
  Settings,
  HelpCircle,
  CreditCard,
  BookOpen,
  Search,
  Check,
  Sparkle,
  Gift
} from 'lucide-react';
import { SubscriptionPlan, StudentProfile } from '@/lib/types';
import { GUARDIAN_ANIMALS } from '@/lib/guardianAnimals';
import { MobileAppModal } from './MobileAppModal';
import { BrandLogo } from './BrandLogo';
import { GoogleIcon } from './GoogleSignInButton';
import { useAuthStore } from '@/store/useAuthStore';
import { GoogleAIEngineBadge } from './GoogleAIEngineBadge';
import { buildNavTabs, buildPillarsConfig } from './navbar/navbarConfig';
import { NavbarMobileNavigation } from './navbar/NavbarMobileNavigation';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakDays: number;
  plan: SubscriptionPlan;
  onOpenPricing: () => void;
  selectedExamTitle?: string;
  pendingMistakesCount?: number;
  onOpenCopilot?: () => void;
  isSupabaseConfigured?: boolean;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  studentProfile?: StudentProfile;
  onOpenProfile?: () => void;
  onOpenAuth?: () => void;
  onOpenAdminIngest?: () => void;
  isServerVerifiedAdmin?: boolean;
  onOpenSettings?: () => void;
  onOpenMobileModal?: () => void;
  onOpenFlashChallenge?: () => void;
  onOpenReferral?: () => void;
  navMode?: 'sidebar' | 'megamenu' | 'dock';
  setNavMode?: (mode: 'sidebar' | 'megamenu' | 'dock') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakDays,
  plan,
  onOpenPricing,
  selectedExamTitle,
  pendingMistakesCount = 0,
  onOpenCopilot,
  isSupabaseConfigured = false,
  theme = 'dark',
  onToggleTheme,
  studentProfile,
  onOpenProfile,
  onOpenAuth,
  onOpenAdminIngest,
  isServerVerifiedAdmin = false,
  onOpenSettings,
  onOpenMobileModal,
  onOpenFlashChallenge,
  onOpenReferral,
  navMode = 'dock',
  setNavMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openPillar, setOpenPillar] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, logout } = useAuthStore();
  const isGoogleConnected = Boolean(user && user.id !== 'usr_default_demo' && !user.email.includes('argus.app.br') && !user.email.includes('learningai.com.br'));

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pillarMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentGuardian = GUARDIAN_ANIMALS.find((a) => a.id === studentProfile?.guardianAnimalId) || GUARDIAN_ANIMALS[0];

  const navTabs = buildNavTabs(pendingMistakesCount);
  const activeTabInfo = navTabs.find((t) => t.id === activeTab) || navTabs[0];
  const PILLARS_CONFIG = buildPillarsConfig(pendingMistakesCount);
  const currentPillar = PILLARS_CONFIG.find((p) => p.items.some((i) => i.id === activeTab));

  // Fechar Menus ao clicar fora ou ao apertar Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pillarMenuRef.current && !pillarMenuRef.current.contains(e.target as Node)) {
        setOpenPillar(null);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsMegaMenuOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpenPillar(null);
        setIsMegaMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Focar o campo de busca quando o mega-menu for aberto
  useEffect(() => {
    if (isMegaMenuOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isMegaMenuOpen]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLight = theme === 'light';

  const planMeta = (() => {
    switch (plan) {
      case 'lancamento':
        return {
          shortLabel: 'PASSE R$ 97',
          fullLabel: 'PASSE R$ 97 (ATÉ A PROVA)',
          badgeClass: isLight
            ? 'bg-orange-50 text-orange-700 border-orange-300'
            : 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        };
      case 'pro':
        return {
          shortLabel: 'PRO',
          fullLabel: 'ASSINATURA PRO ATIVA',
          badgeClass: isLight
            ? 'bg-blue-50 text-blue-700 border-blue-200'
            : 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        };
      case 'elite':
        return {
          shortLabel: 'VIP',
          fullLabel: 'ASSINATURA VIP ELITE',
          badgeClass: isLight
            ? 'bg-amber-50 text-amber-800 border-amber-300'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'black':
        return {
          shortLabel: 'VITALÍCIO',
          fullLabel: 'VITALÍCIO BLACK',
          badgeClass: isLight
            ? 'bg-slate-900 text-amber-300 border-amber-500/60'
            : 'bg-amber-500/25 text-amber-200 border-amber-400/50',
        };
      default:
        return {
          shortLabel: 'VISITANTE',
          fullLabel: 'SELECIONE SEU PLANO',
          badgeClass: isLight
            ? 'bg-slate-100 text-slate-700 border-slate-300'
            : 'bg-slate-800 text-slate-300 border-slate-700',
        };
    }
  })();

  const filteredTabs = navTabs.filter((t) => 
    t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highPerfTabs = filteredTabs.filter((t) => t.category === 'Alta Performance');
  const prepTabs = filteredTabs.filter((t) => t.category === 'Preparação & Editais');
  const systemTabs = filteredTabs.filter((t) => t.category === 'Sistema' || t.category === 'Geral');

  return (
    <>
      <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 overflow-visible ${
        isLight 
          ? 'bg-white/95 border-slate-200 backdrop-blur-xl shadow-xs' 
          : 'bg-[#090D16]/95 border-slate-800 dark:border-white/10 backdrop-blur-2xl'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Altura calibrada de 64px, zero transbordamento horizontal */}
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-3 min-w-0">
            
            {/* Lado Esquerdo: Marca Argus */}
            <div className="flex items-center gap-2 shrink-0">
              <div 
                className="flex items-center gap-2 cursor-pointer shrink-0 select-none" 
                onClick={() => handleTabClick('landing')}
                title="Ir para o início"
              >
                <BrandLogo size={36} showGlow />
                <div className="flex items-center gap-1.5">
                  <span className={`text-base sm:text-lg font-black tracking-tight whitespace-nowrap transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Argus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">AI</span>
                  </span>
                  <div className="hidden 2xl:block ml-1">
                    <GoogleAIEngineBadge variant="compact" />
                  </div>
                </div>
              </div>
            </div>

            {/* Centro: Navegação Completa dos 4 Pilares da Aprovação (Desktop & Tablet) */}
            <div className="hidden md:flex items-center gap-1 shrink-0" ref={pillarMenuRef}>
              
              {/* Os 4 Pilares da Aprovação - Seletor Segmentado Polido e de Alto Contraste */}
              <nav className="flex items-center gap-1 bg-slate-200/90 dark:bg-slate-900/90 p-1.5 rounded-2xl border-2 border-slate-300/80 dark:border-white/15 shadow-sm backdrop-blur-md" aria-label="Navegação Principal dos Pilares da Aprovação">
                
                {/* Botão Início Integrado ao Seletor Segmentado */}
                <button
                  type="button"
                  onClick={() => handleTabClick('landing')}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                    activeTab === 'landing'
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/35 ring-1 ring-blue-500 font-black'
                      : isLight
                        ? 'text-slate-800 hover:text-slate-950 hover:bg-white hover:shadow-2xs'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                  title="Página Inicial"
                  aria-label="Ir para Página Inicial"
                >
                  <Compass className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'landing' ? 'text-white' : isLight ? 'text-slate-700' : 'text-slate-300'}`} />
                  <span>Início</span>
                </button>

                <div className="w-px h-4 bg-slate-300 dark:bg-white/15 mx-0.5" />

                {PILLARS_CONFIG.map((pillar) => {
                  const isPillarActive = currentPillar?.key === pillar.key;
                  const isDropdownOpen = openPillar === pillar.key;
                  const PillarIcon = pillar.icon;
                  const hasPendingErrors = pillar.key.toLowerCase() === 'praticar' && pendingMistakesCount > 0;

                  return (
                    <div 
                      key={pillar.key} 
                      className="relative"
                      onMouseEnter={() => setOpenPillar(pillar.key)}
                      onMouseLeave={() => setOpenPillar(null)}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleTabClick(pillar.items[0].id);
                          setOpenPillar(null);
                        }}
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                          isPillarActive
                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/35 ring-1 ring-blue-500 font-black'
                            : isDropdownOpen
                              ? isLight 
                                ? 'bg-white text-blue-700 shadow-2xs font-extrabold border border-slate-300' 
                                : 'bg-slate-800 text-cyan-300 font-extrabold border border-slate-700'
                              : isLight
                                ? 'text-slate-800 hover:text-slate-950 hover:bg-white hover:shadow-2xs'
                                : 'text-slate-200 hover:text-white hover:bg-white/10'
                        }`}
                        aria-expanded={isDropdownOpen}
                        aria-label={`Menu do pilar ${pillar.name}`}
                      >
                        <PillarIcon className={`w-3.5 h-3.5 shrink-0 ${isPillarActive ? 'text-white' : isLight ? 'text-slate-700' : 'text-slate-300'}`} />
                        <span className="tracking-tight">{pillar.name}</span>
                        
                        {/* Dot indicador de pendências (ex: Caderno de Erros) */}
                        {hasPendingErrors && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" title={`${pendingMistakesCount} erros para revisar`} />
                        )}

                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 shrink-0 ${
                          isPillarActive ? 'text-white/90' : isLight ? 'text-slate-600' : 'text-slate-400'
                        } ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu do Pilar (Card Sólido 100% Opaco, Alto Contraste) */}
                      {isDropdownOpen && (
                        <div className="absolute left-0 top-full pt-2 z-50 animate-fadeIn">
                          <div
                            className={`w-72 sm:w-80 rounded-2xl border-2 shadow-2xl p-3 z-50 ${
                              isLight
                                ? 'bg-white border-slate-300 text-slate-900 shadow-2xl shadow-slate-400/50'
                                : 'bg-[#0c1322] border-slate-700 text-white shadow-2xl shadow-black/95'
                            }`}
                          >
                            <div className="px-2.5 py-2 border-b border-slate-200 dark:border-white/10 mb-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                                  {pillar.name}
                                </span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold">
                                  {pillar.items.length} módulos
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug mt-1 font-semibold">
                                {pillar.tagline}
                              </p>
                            </div>

                            <div className="space-y-1">
                              {pillar.items.map((subItem) => {
                                const SubIcon = subItem.icon;
                                const isItemActive = activeTab === subItem.id;
                                return (
                                  <button
                                    key={subItem.id}
                                    type="button"
                                    onClick={() => {
                                      setOpenPillar(null);
                                      handleTabClick(subItem.id);
                                    }}
                                    className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                                      isItemActive
                                        ? isLight
                                          ? 'bg-blue-50 text-blue-900 border-2 border-blue-400 font-black shadow-xs'
                                          : 'bg-blue-600/30 text-white border-2 border-blue-400 font-black'
                                        : isLight
                                          ? 'hover:bg-slate-100 text-slate-800 hover:text-slate-950 border border-transparent hover:border-slate-200'
                                          : 'hover:bg-white/10 text-slate-200 hover:text-white border border-transparent hover:border-white/10'
                                    }`}
                                  >
                                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                                      isItemActive
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-slate-300'
                                    }`}>
                                      <SubIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-black truncate">{subItem.label}</span>
                                        {subItem.badge && (
                                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-rose-500 text-white shadow-2xs">
                                            {subItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 leading-snug mt-0.5 font-medium">
                                        {subItem.desc}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Lado Direito: Status e Ações Globais (Compactos e 100% Responsivos) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              

              {/* Alternador de Tema (Modo Claro / Modo Escuro - Visível em Mobile e Desktop para gravações rápidas) */}
              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className={`flex p-2 rounded-xl border transition-all items-center justify-center shrink-0 cursor-pointer active:scale-95 ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-amber-600 border-slate-200 shadow-xs' 
                      : 'bg-white/5 hover:bg-white/10 text-amber-400 border-white/10'
                  }`}
                  title={isLight ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro'}
                  aria-label="Alternar tema de cores"
                >
                  {isLight ? (
                    <Moon className="w-4 h-4 text-blue-600 transition-transform rotate-0 hover:-rotate-12" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
                  )}
                </button>
              )}

              {/* Botão Rápido: Escolher Focos de Estudo & Modo Foco (Visível em Web e Mobile) */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-focus-selector'))}
                className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer shrink-0 active:scale-95 ${
                  isLight
                    ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700 shadow-2xs'
                    : 'bg-rose-500/15 hover:bg-rose-500/25 border-rose-400/35 text-rose-300'
                }`}
                title="Escolher suas matérias em foco (uma ou mais) e ativar Modo Foco a qualquer hora"
                aria-label="Escolher Meus Focos de Estudo"
              >
                <Crosshair className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                <span className="hidden sm:inline">Meus Focos</span>
                <span className="inline sm:hidden">Focos</span>
              </button>

              {/* Tutor IA (Tire Dúvidas - Visível também no mobile de forma compacta) */}
              {onOpenCopilot && (
                <button
                  onClick={onOpenCopilot}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer active:scale-95 ${
                    isLight 
                      ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700' 
                      : 'bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-blue-500/15 border-blue-400/35 text-blue-200 hover:border-blue-400 hover:bg-blue-500/25'
                  }`}
                  title="Abrir Tutor IA para tirar dúvidas de qualquer matéria"
                  aria-label="Abrir Tutor IA"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-cyan-400'} animate-pulse`} />
                  <span className="hidden xl:inline whitespace-nowrap">
                    Tutor IA
                  </span>
                  <span className="inline xl:hidden whitespace-nowrap text-[11px] font-black">
                    IA
                  </span>
                </button>
              )}

              {/* Fogo de Ofensiva (Streak Diário - Visível a partir de tablet sm:) */}
              <div 
                className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold shrink-0 select-none ${
                  isLight 
                    ? 'bg-amber-50 border-amber-200 text-amber-800' 
                    : 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                }`}
                title="Sequência de dias consecutivos de estudo"
                aria-label={`Sequência de estudo: ${streakDays} dias`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30 animate-bounce" />
                <span className="whitespace-nowrap">{streakDays}d</span>
              </div>

              {/* Botão Direto de Login (Quando não autenticado) */}
              {!isGoogleConnected && (!user || user.id === 'usr_default_demo') && (
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenAuth) onOpenAuth();
                    else window.dispatchEvent(new CustomEvent('open-auth-modal'));
                  }}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    isLight
                      ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700 shadow-2xs'
                      : 'bg-indigo-500/15 hover:bg-indigo-500/25 border-indigo-400/35 text-indigo-200'
                  }`}
                  title="Entrar na sua conta ou cadastrar-se"
                >
                  <span>Entrar</span>
                </button>
              )}

              {/* Menu da Conta & Perfil do Estudante (Visível a partir de tablet sm:) */}
              <div className="hidden sm:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs group shrink-0 cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-slate-50 border-slate-300/80 text-slate-900 shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                  }`}
                  title={`Conta de ${studentProfile?.warName || studentProfile?.name || 'Estudante'}`}
                  aria-label="Abrir menu da conta e configurações"
                  aria-expanded={isUserMenuOpen}
                >
                  <img
                    src={currentGuardian.avatar3dUrl}
                    alt={currentGuardian.name}
                    className="w-6 h-6 rounded-full object-cover border border-indigo-500/40 shrink-0 transition-transform group-hover:scale-105"
                  />
                  <div className="hidden 2xl:flex flex-col text-left leading-tight">
                    <span className="text-xs font-black truncate max-w-[95px] text-slate-900 dark:text-white">
                      {studentProfile?.warName || studentProfile?.name || 'Futuro Servidor'}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-bold truncate max-w-[95px]">
                      {currentGuardian.archetype}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : ''}`} />
                </button>

                {/* Dropdown Menu da Conta */}
                {isUserMenuOpen && (
                  <div className={`absolute right-0 top-full mt-2 w-72 rounded-2xl border shadow-2xl p-2.5 z-50 animate-fadeIn ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 shadow-2xl shadow-slate-300/70'
                      : 'bg-[#0b1329] border-slate-700/80 text-white shadow-2xl shadow-black/95'
                  }`}>
                    {/* User Header */}
                    <div className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 mb-2">
                      <div className="text-sm font-black text-slate-900 dark:text-white truncate">
                        {studentProfile?.warName || studentProfile?.name || 'Futuro Servidor'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                        {user?.email || 'concurseiro@argus.app.br'}
                      </div>
                      <div className={`mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-black border ${planMeta.badgeClass}`}>
                        <span>{planMeta.fullLabel}</span>
                      </div>
                    </div>

                    {/* Destaque Login se não conectado */}
                    {!isGoogleConnected && (
                      <div className="mb-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            if (onOpenAuth) onOpenAuth();
                            else window.dispatchEvent(new CustomEvent('open-auth-modal'));
                          }}
                          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/90 border-2 border-blue-500/40 dark:border-blue-400/50 text-slate-800 dark:text-white shadow-xs hover:border-blue-600"
                        >
                          <GoogleIcon className="w-4 h-4 shrink-0" />
                          <span className="text-slate-800 dark:text-white font-black">Entrar / Criar Conta</span>
                        </button>
                      </div>
                    )}

                    {/* Navigation Actions */}
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          window.dispatchEvent(new CustomEvent('open-focus-selector'));
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isLight ? 'bg-rose-50/70 hover:bg-rose-100 text-rose-800' : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        <Crosshair className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Escolher Meus Focos & Modo Foco</span>
                      </button>

                      {onOpenProfile && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenProfile();
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isLight ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/10 text-slate-100'
                          }`}
                        >
                          <img
                            src={currentGuardian.avatar3dUrl}
                            alt={currentGuardian.name}
                            className="w-5 h-5 rounded-full object-cover border border-indigo-500/40 shrink-0"
                          />
                          <span>Meu Perfil de Estudos</span>
                        </button>
                      )}

                      {onOpenReferral && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenReferral();
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isLight ? 'hover:bg-emerald-50 text-slate-800 hover:text-emerald-900' : 'hover:bg-emerald-500/10 text-slate-100 hover:text-emerald-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Gift className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>Indicar Colega</span>
                          </div>
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                            +7d PRO
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setActiveTab('settings');
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                        }`}
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Configurações</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setActiveTab('subscription');
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        <span>Minha Assinatura</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setActiveTab('help');
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                        }`}
                      >
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <span>Suporte & Central de Chamados</span>
                      </button>

                      {isServerVerifiedAdmin && (
                        <>
                          <a
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              isLight
                                ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                                : 'bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25'
                            }`}
                          >
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span>Painel Admin & Segurança (/admin)</span>
                          </a>
                          {onOpenAdminIngest && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsUserMenuOpen(false);
                                onOpenAdminIngest();
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                              }`}
                            >
                              <Zap className="w-4 h-4 text-indigo-500 shrink-0" />
                              <span>Ingestão de Provas (Admin)</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    {/* Sair / Logout */}
                    {user && (
                      <div className="pt-1 mt-1 border-t border-slate-100 dark:border-white/5">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                        >
                          <X className="w-4 h-4" />
                          <span>Desconectar Conta</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Botão de Assinatura */}
              {plan === 'aspirante' ? (
                <button
                  onClick={onOpenPricing}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black tracking-wide transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0 cursor-pointer"
                  title="Conhecer Planos e Preços"
                  aria-label="Conhecer Planos e Assinar Pro"
                >
                  <Crown className="w-3.5 h-3.5 fill-black shrink-0" />
                  <span className="hidden sm:inline">ASSINAR PRO</span>
                  <span className="inline sm:hidden">PRO</span>
                </button>
              ) : (
                <button
                  onClick={onOpenPricing}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer ${planMeta.badgeClass}`}
                  aria-label={`Plano ativo: ${planMeta.shortLabel}`}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>{planMeta.shortLabel}</span>
                </button>
              )}

              {/* Botão Menu Mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-xl border transition-colors ${
                  isLight 
                    ? 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900' 
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
                aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>

          {/* Barra Unificada Mobile dos 4 Pilares (Paridade Total com Web) */}
          <div className={`md:hidden border-t py-1.5 -mx-3 px-3 ${isLight ? 'border-slate-200/80 bg-slate-50/70' : 'border-white/10 bg-slate-900/50'}`}>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {PILLARS_CONFIG.map((pillar) => {
                const PillarIcon = pillar.icon;
                const isActivePillar = pillar.items.some((item) => item.id === activeTab);
                const isOpen = openPillar === pillar.key;
                return (
                  <button
                    key={pillar.key}
                    type="button"
                    onClick={() => setOpenPillar(isOpen ? null : pillar.key)}
                    aria-expanded={isOpen}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActivePillar || isOpen
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isLight
                        ? 'bg-white text-slate-700 border border-slate-200'
                        : 'bg-white/5 text-slate-200 border border-white/10'
                    }`}
                  >
                    <PillarIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{pillar.name}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                );
              })}
            </div>

            {/* Submenu Expansível do Pilar Selecionado no Mobile (Idêntico ao Web) */}
            {openPillar && (() => {
              const activeGroup = PILLARS_CONFIG.find((p) => p.key === openPillar);
              if (!activeGroup) return null;
              return (
                <div className={`mt-2 p-2 rounded-2xl border shadow-xl grid grid-cols-1 gap-1 animate-fadeIn ${
                  isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0b1329] border-slate-700 text-white'
                }`}>
                  {activeGroup.items.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isItemActive = activeTab === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        type="button"
                        onClick={() => {
                          setOpenPillar(null);
                          handleTabClick(subItem.id);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                          isItemActive
                            ? isLight
                              ? 'bg-blue-50 text-blue-900 border border-blue-300 font-black'
                              : 'bg-blue-600/30 text-white border border-blue-400 font-black'
                            : isLight
                            ? 'hover:bg-slate-100 text-slate-800'
                            : 'hover:bg-white/10 text-slate-200'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                          isItemActive ? 'bg-blue-600 text-white' : isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-slate-300'
                        }`}>
                          <SubIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-extrabold block truncate">{subItem.label}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">{subItem.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>

        </div>
      </header>

      <NavbarMobileNavigation
        activeTab={activeTab}
        isLight={isLight}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isGoogleConnected={isGoogleConnected}
        currentGuardian={currentGuardian}
        studentProfile={studentProfile}
        selectedExamTitle={selectedExamTitle}
        navTabs={navTabs}
        onToggleTheme={onToggleTheme}
        onOpenAuth={onOpenAuth}
        onOpenProfile={onOpenProfile}
        onOpenFlashChallenge={onOpenFlashChallenge}
        onOpenReferral={onOpenReferral}
        onOpenPricing={onOpenPricing}
        onTabClick={handleTabClick}
      />

      {/* Modal de Onboarding Multimodal (fallback local se não controlado pelo pai) */}
      {!onOpenMobileModal && (
        <MobileAppModal 
          isOpen={isMobileModalOpen} 
          onClose={() => setIsMobileModalOpen(false)} 
        />
      )}
    </>
  );
};
