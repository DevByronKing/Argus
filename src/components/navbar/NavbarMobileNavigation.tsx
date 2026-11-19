'use client';

import React from 'react';
import Link from 'next/link';
import {
  BrainCircuit,
  Moon,
  Sun,
  X,
  ChevronRight,
  Zap,
  Gift,
  Sparkles,
  ExternalLink,
  Crown,
  Compass,
  Crosshair,
  BookOpen,
  Activity,
  Menu,
} from 'lucide-react';
import { StudentProfile, GuardianAnimal } from '@/lib/types';
import { GoogleIcon } from '@/components/GoogleSignInButton';
import { buildNavTabs } from './navbarConfig';

interface NavbarMobileNavigationProps {
  activeTab: string;
  isLight: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isGoogleConnected: boolean;
  currentGuardian: GuardianAnimal;
  studentProfile?: StudentProfile;
  selectedExamTitle?: string;
  navTabs: ReturnType<typeof buildNavTabs>;
  onToggleTheme?: () => void;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
  onOpenFlashChallenge?: () => void;
  onOpenReferral?: () => void;
  onOpenPricing: () => void;
  onTabClick: (tabId: string) => void;
}

export const NavbarMobileNavigation: React.FC<NavbarMobileNavigationProps> = ({
  activeTab,
  isLight,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isGoogleConnected,
  currentGuardian,
  studentProfile,
  selectedExamTitle,
  navTabs,
  onToggleTheme,
  onOpenAuth,
  onOpenProfile,
  onOpenFlashChallenge,
  onOpenReferral,
  onOpenPricing,
  onTabClick,
}) => {
  return (
    <>
      {/* Menu Mobile Completo (Drawer Slide-Over Lateral) */}
      {isMobileMenuOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[80] md:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className={`relative w-full max-w-xs sm:max-w-sm h-full p-5 sm:p-6 overflow-y-auto flex flex-col justify-between shadow-2xl z-10 border-l transition-colors ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'bg-[#0c1322] border-slate-800 dark:border-white/10 text-white'
            }`}
          >
            <div>
              {/* Cabeçalho do Drawer */}
              <div
                className={`flex items-center justify-between pb-4 border-b mb-5 ${
                  isLight ? 'border-slate-200' : 'border-slate-800 dark:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-black">Argus AI</span>
                    <span className={`block text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Navegação Completa
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onToggleTheme && (
                    <button
                      onClick={onToggleTheme}
                      className={`p-1.5 rounded-lg border ${
                        isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-slate-800 border-slate-700 dark:border-white/10 text-slate-300'
                      }`}
                      title={isLight ? 'Modo Escuro' : 'Modo Claro'}
                    >
                      {isLight ? <Moon className="w-4 h-4 text-blue-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-1.5 rounded-lg ${
                      isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Login Mobile */}
              {!isGoogleConnected && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth();
                    else window.dispatchEvent(new CustomEvent('open-auth-modal'));
                  }}
                  className="w-full mb-3 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-white transition-all active:scale-95 cursor-pointer"
                >
                  <GoogleIcon className="w-4 h-4" />
                  <span>Entrar / Criar Conta</span>
                </button>
              )}

              {/* Perfil do Aluno Mobile */}
              {onOpenProfile && (
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className={`p-3.5 mb-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isLight
                      ? 'bg-gradient-to-r from-blue-50 to-slate-50 border-blue-200 hover:border-blue-300'
                      : 'bg-gradient-to-r from-blue-950/40 to-slate-900/40 border-blue-500/30 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={currentGuardian.avatar3dUrl}
                      alt={currentGuardian.name}
                      className="w-11 h-11 rounded-xl object-cover border border-blue-500/40 shrink-0 shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block">
                        Passaporte Cognitivo
                      </span>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {studentProfile?.name || 'Concurseiro'}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {currentGuardian.name} • {currentGuardian.archetype}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-500 shrink-0" />
                </div>
              )}

              {/* Edital Ativo */}
              {selectedExamTitle && (
                <div
                  className={`p-3 mb-4 rounded-2xl border ${
                    isLight
                      ? 'bg-blue-50 border-blue-200 text-blue-900'
                      : 'bg-blue-500/10 border-blue-500/25 text-blue-300'
                  }`}
                >
                  <span className="text-[10px] font-bold block mb-0.5">
                    Edital em Foco
                  </span>
                  <span className="text-xs font-extrabold line-clamp-1">
                    {selectedExamTitle}
                  </span>
                </div>
              )}

              {/* Ações de Retenção Rápida Mobile (Paridade com Web) */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-focus-selector'));
                }}
                className="w-full mb-2.5 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-black cursor-pointer hover:bg-rose-500/20 transition-all"
              >
                <Crosshair className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Escolher Meus Focos &amp; Modo Foco</span>
              </button>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenFlashChallenge) onOpenFlashChallenge();
                  }}
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-cyan-400 text-xs font-black cursor-pointer hover:bg-blue-500/20 transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>3 Pegadinhas</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenReferral) onOpenReferral();
                  }}
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-black cursor-pointer hover:bg-emerald-500/20 transition-all"
                >
                  <Gift className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span>Indicar (+7d PRO)</span>
                </button>
              </div>

              {/* Módulos Estruturados nos 4 Pilares da Aprovação */}
              <div className="space-y-4">
                {['Geral', 'Praticar', 'Conteúdo', 'Planejar', 'Evolução', 'Conta & Sistema'].map((pillar) => {
                  const itemsInPillar = navTabs.filter((t) => t.category === pillar);
                  if (itemsInPillar.length === 0) return null;
                  return (
                    <div key={pillar} className="space-y-1.5">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 block ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        {pillar}
                      </span>

                      {itemsInPillar.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => onTabClick(tab.id)}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                              isActive
                                ? isLight
                                  ? 'bg-blue-50 border border-blue-200 text-blue-900 font-bold shadow-xs'
                                  : 'bg-blue-600/25 border border-blue-500/40 text-white font-bold'
                                : isLight
                                ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent'
                                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800/50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`p-1.5 rounded-lg shrink-0 ${
                                  isActive
                                    ? 'bg-blue-600 text-white'
                                    : isLight
                                    ? 'bg-slate-200 text-slate-600'
                                    : 'bg-white/5 text-slate-400'
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold truncate">{tab.label}</span>
                                  {tab.badge && (
                                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-rose-500 text-white shrink-0">
                                      {tab.badge}
                                    </span>
                                  )}
                                </div>
                                <span
                                  className={`text-[10px] block truncate ${
                                    isLight ? 'text-slate-500' : 'text-slate-400'
                                  }`}
                                >
                                  {tab.desc}
                                </span>
                              </div>
                            </div>

                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-500' : 'opacity-40'}`} />
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rodapé do Menu Mobile */}
            <div className={`mt-6 pt-4 border-t space-y-2 ${isLight ? 'border-slate-200' : 'border-slate-800 dark:border-white/10'}`}>
              <Link
                href="/edital/inss-tecnico-seguro-social-2026"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Páginas de Editais (SEO)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenPricing();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Crown className="w-4 h-4 fill-black" />
                <span>Assinar / Gerenciar Plano</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior Nativa para Mobile */}
      <nav
        aria-label="Navegação móvel inferior por abas"
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t py-1.5 px-2 flex items-center justify-around transition-colors shadow-2xl safe-area-bottom ${
          isLight
            ? 'bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-600 shadow-slate-300/70'
            : 'bg-[#090e1d]/95 backdrop-blur-2xl border-white/10 text-slate-400 shadow-black/95'
        }`}
      >
        <button
          type="button"
          onClick={() => onTabClick('landing')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'landing'
              ? isLight
                ? 'bg-blue-50 text-blue-700 font-black shadow-2xs'
                : 'bg-blue-500/20 text-blue-300 font-black'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Compass className={`w-5 h-5 ${activeTab === 'landing' ? 'text-blue-600 dark:text-blue-400 scale-105' : ''}`} />
          <span className="text-[10px] tracking-tight">Início</span>
        </button>

        <button
          type="button"
          onClick={() => onTabClick('simulator')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'simulator'
              ? isLight
                ? 'bg-blue-50 text-blue-700 font-black shadow-2xs'
                : 'bg-blue-500/20 text-blue-300 font-black'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Crosshair className={`w-5 h-5 ${activeTab === 'simulator' ? 'text-blue-600 dark:text-blue-400 scale-105' : ''}`} />
          <span className="text-[10px] tracking-tight">Simulador</span>
        </button>

        <button
          type="button"
          onClick={() => onTabClick('flashcards')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'flashcards'
              ? isLight
                ? 'bg-blue-50 text-blue-700 font-black shadow-2xs'
                : 'bg-blue-500/20 text-blue-300 font-black'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'flashcards' ? 'text-blue-600 dark:text-blue-400 scale-105' : ''}`} />
          <span className="text-[10px] tracking-tight">Flashcards</span>
        </button>

        <button
          type="button"
          onClick={() => onTabClick('dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'dashboard' || activeTab === 'analytics'
              ? isLight
                ? 'bg-emerald-50 text-emerald-700 font-black shadow-2xs'
                : 'bg-emerald-500/20 text-emerald-300 font-black'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className={`w-5 h-5 ${activeTab === 'dashboard' || activeTab === 'analytics' ? 'text-emerald-600 dark:text-emerald-400 scale-105' : ''}`} />
          <span className="text-[10px] tracking-tight">Evolução</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            isMobileMenuOpen
              ? isLight
                ? 'bg-blue-50 text-blue-700 font-black'
                : 'bg-blue-500/20 text-blue-300 font-black'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5 text-blue-500" />
          <span className="text-[10px] tracking-tight">Menu</span>
        </button>
      </nav>
    </>
  );
};
