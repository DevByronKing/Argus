'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { SubscriptionPlan } from '@/lib/types';
import { Sparkles } from 'lucide-react';

interface GoogleAdSenseProps {
  currentPlan?: SubscriptionPlan;
  publisherId?: string;
}

/**
 * Módulo Estratégico de Google AdSense:
 * - Exibido EXCLUSIVAMENTE para usuários do Plano Aspirante (Gratuito).
 * - Usuários pagantes (PRO, Lançamento R$ 97, VIP Elite e Vitalício) têm experiência 100% Ad-Free (Sem Anúncios).
 * - Serve como alavanca de conversão para o plano PRO ("Remover anúncios por R$ 49/mês").
 */
export const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
  currentPlan = 'aspirante',
  publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID,
}) => {
  // Usuários pagantes nunca veem anúncios
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
 * Slot de Anúncio Discreto com Alavanca de Upgrade PRO
 */
export const AdBannerSlot: React.FC<AdBannerSlotProps> = ({
  currentPlan = 'aspirante',
  slotId,
  onOpenPricing,
  className = '',
}) => {
  const isPaying = currentPlan !== 'aspirante';

  useEffect(() => {
    if (!isPaying && slotId && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {}
    }
  }, [isPaying, slotId]);

  if (isPaying) return null;

  return (
    <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 text-center my-4 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Publicidade</span>
        {onOpenPricing && (
          <button
            type="button"
            onClick={onOpenPricing}
            className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Remover anúncios com o Plano PRO</span>
          </button>
        )}
      </div>

      {slotId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="py-6 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-300">Espaço Reservado Google AdSense</p>
          <p className="text-[11px] mt-1">Configure `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` nas variáveis de ambiente da Vercel para ativar anúncios aos usuários do plano gratuito.</p>
        </div>
      )}
    </div>
  );
};
