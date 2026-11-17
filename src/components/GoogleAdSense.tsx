'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { SubscriptionPlan } from '@/lib/types';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface GoogleAdSenseProps {
  currentPlan?: SubscriptionPlan;
  publisherId?: string;
}

/**
 * Módulo Estratégico de Google AdSense:
 * - Exibido no Radar Público de Concursos & TRTs para visitantes (aspirante).
 * - Assinantes PRO, Lançamento, VIP Elite e Black Vitalício têm experiência 100% Ad-Free (Sem Anúncios).
 */
export const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
  currentPlan = 'aspirante',
  publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID,
}) => {
  const isPaying = currentPlan !== 'aspirante';

  if (isPaying || !publisherId) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

interface AdBannerSlotProps {
  currentPlan?: SubscriptionPlan;
  slotId?: string;
  onOpenPricing?: () => void;
  className?: string;
}

/**
 * Slot de Anúncio Nativo Google AdSense com Alavanca de Upgrade PRO (Zero Anúncios)
 */
export const AdBannerSlot: React.FC<AdBannerSlotProps> = ({
  currentPlan = 'aspirante',
  slotId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID,
  onOpenPricing,
  className = '',
}) => {
  const isPaying = currentPlan !== 'aspirante';
  const adClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    if (!isPaying && adClient && slotId && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {}
    }
  }, [isPaying, adClient, slotId]);

  if (isPaying) return null;

  return (
    <div className={`p-4 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 shadow-xs my-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100 dark:border-white/5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
            Ad
          </span>
          <span>Patrocinado &bull; Google AdSense</span>
        </span>
        {onOpenPricing && (
          <button
            type="button"
            onClick={onOpenPricing}
            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Navegar sem anúncios no Plano PRO</span>
          </button>
        )}
      </div>

      {adClient && slotId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 dark:from-slate-800/60 dark:via-indigo-950/30 dark:to-slate-800/60 border border-slate-200/70 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5 text-left">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Preparação Acelerada para Tribunais do Trabalho (TRT 2, TRT 15, TRT 4 e TRT 1)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Desarme as pegadinhas da FCC e FGV em Direito do Trabalho, Processo do Trabalho e CLT com o Edital Verticalizado 80/20.
            </p>
          </div>
          {onOpenPricing && (
            <button
              type="button"
              onClick={onOpenPricing}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer transition-all"
            >
              <span>Liberar Preparação TRT</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
