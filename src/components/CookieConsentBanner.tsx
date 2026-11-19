'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Cookie, 
  Settings2, 
  Check, 
  X, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'argus_cookie_consent';

export interface CookieConsentBannerProps {
  onConsentGiven?: () => void;
  canShow?: boolean;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onConsentGiven,
  canShow = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(false);
  const onConsentGivenRef = useRef(onConsentGiven);
  onConsentGivenRef.current = onConsentGiven;

  useEffect(() => {
    if (!canShow) {
      setIsVisible(false);
      return;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('argus_lgpd_consent');
      if (!stored) {
        // Exibe imediatamente quando liberado pelo sequenciador
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
      } else {
        onConsentGivenRef.current?.();
      }
    } catch {}
  }, [canShow]);

  if (!isVisible || !canShow) return null;

  const saveConsent = (preferences: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      localStorage.setItem('argus_lgpd_consent', 'true');
    } catch {}
    setIsVisible(false);
    onConsentGiven?.();
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    });
  };

  const handleAcceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      necessary: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <aside 
      aria-label="Aviso de Privacidade e Consentimento de Cookies LGPD"
      className="fixed bottom-[76px] md:bottom-4 inset-x-0 z-[95] px-3 sm:px-5 animate-slide-up pointer-events-none"
    >
      <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/15 shadow-2xl backdrop-blur-xl p-3.5 sm:p-5 pointer-events-auto text-slate-900 dark:text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Mensagem e Ícone */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
              <Cookie className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                  Privacidade &amp; LGPD
                </span>
                <span className="hidden sm:inline text-xs font-bold text-slate-500 dark:text-slate-400">
                  Lei Geral de Proteção de Dados
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                Valorizamos sua privacidade e segurança dos seus dados
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Usamos cookies essenciais para sua sessão segura e métricas para calibrar sua precisão. Veja nossa{' '}
                <Link 
                  href="/privacidade" 
                  className="font-bold text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700"
                >
                  Política de Privacidade
                </Link>.
              </p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-end pt-1 md:pt-0">
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="px-2.5 py-2 text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Opções</span>
              {showPreferences ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>

            <button
              onClick={handleAcceptNecessary}
              className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center"
            >
              Só Necessários
            </button>

            <button
              onClick={handleAcceptAll}
              className="col-span-2 sm:col-span-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-black shadow-lg shadow-indigo-600/25 transition-all cursor-pointer text-center"
            >
              Aceitar e Continuar
            </button>
          </div>
        </div>

        {/* Painel Acordeão de Preferências */}
        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
            {/* 1. Essenciais */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black">Estritamente Necessários</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  Obrigatório
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Sessão segura, autenticação criptográfica e prevenção de ataques CSRF e SQLi.
              </p>
            </div>

            {/* 2. Analíticos */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black">Métricas & Diagnóstico</span>
                <input 
                  type="checkbox" 
                  checked={analyticsAllowed} 
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Análise de tempo por questão e calibração da curva do esquecimento do SRS.
              </p>
            </div>

            {/* 3. Marketing */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black">Comunicação & Editais</span>
                <input 
                  type="checkbox" 
                  checked={marketingAllowed} 
                  onChange={(e) => setMarketingAllowed(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Alertas personalizados sobre novas vagas de concursos do seu interesse.
              </p>
            </div>

            <div className="sm:col-span-3 flex justify-end pt-1">
              <button
                onClick={handleSaveCustom}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black cursor-pointer hover:opacity-90"
              >
                Salvar Preferências Selecionadas
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
