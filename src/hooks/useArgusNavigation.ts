'use client';

import { useState, useEffect, useCallback } from 'react';
import { analytics } from '@/lib/analytics';

const PAGE_TITLES: Record<string, string> = {
  landing: 'Argus — O Copiloto Cognitivo para Concursos, OAB e Carreiras Jurídicas',
  dashboard: 'Cockpit de Dados & Heatmap 365d | Argus',
  simulator: 'Arena de Combate (Simulador 60/40) | Argus',
  flashcards: 'SRS Flashcards 3D (Repetição Espaçada) | Argus',
  mistakes: 'Caderno de Erros Inteligente & Revanche | Argus',
  vademecum: 'Smart Vade Mecum & Lei Seca | Argus',
  questions: 'Banco de Questões Comentadas | Argus',
  edital: 'Edital Verticalizado por IA | Argus',
  cycle: 'Ciclos de Estudo Adaptativos (Meirelles) | Argus',
  discursivas: 'Estúdio de Redação & Peças OAB | Argus',
  summaries: 'Resumos Inteligentes 80/20 | Argus',
  resumos: 'Resumos Inteligentes 80/20 | Argus',
  psychometrics: 'Psicometria TRI da Banca | Argus',
  radar: 'Radar de Concursos 2026 | Argus',
  'pricing-plans': 'Planos & Assinaturas | Argus',
  settings: 'Configurações do Aluno | Argus',
  checkout: 'Checkout Seguro | Argus',
  'welcome-success': 'Bem-vindo(a) ao Argus! Matrícula Confirmada',
  subscription: 'Gerenciar Assinatura | Argus',
  help: 'Ajuda & Suporte | Argus',
};

export function useArgusNavigation(initialTab = 'landing') {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [tabHistory, setTabHistory] = useState<string[]>([]);

  const handleNavigateWithHistory = useCallback(
    (nextTab: string) => {
      if (nextTab !== activeTab) {
        setTabHistory((prev) => [...prev.slice(-15), activeTab]);
        setActiveTab(nextTab);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    },
    [activeTab]
  );

  const handleGoBack = useCallback(() => {
    if (tabHistory.length > 0) {
      const prev = tabHistory[tabHistory.length - 1];
      setTabHistory((h) => h.slice(0, -1));
      setActiveTab(prev);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveTab('landing');
    }
  }, [tabHistory]);

  const handleGoHome = useCallback(() => {
    handleNavigateWithHistory('landing');
  }, [handleNavigateWithHistory]);

  // Transição de abas: Rolagem suave automática para o topo e atualização dinâmica do título da página
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
      }
      const pageTitle = PAGE_TITLES[activeTab] || 'Argus — Copiloto Cognitivo';
      document.title = pageTitle;
      analytics.track('pageview', {
        tab: activeTab,
        title: pageTitle,
      });
    }
  }, [activeTab]);

  // Suavização global de rolagem para âncoras internas (ex: links #pricing)
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (target) {
        const hash = target.getAttribute('href');
        if (hash && hash.length > 1) {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            try {
              window.history.pushState(null, '', hash);
            } catch {}
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return {
    activeTab,
    setActiveTab,
    tabHistory,
    setTabHistory,
    handleNavigateWithHistory,
    handleGoBack,
    handleGoHome,
  };
}
