'use client';

import React, { useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

interface TurnstileFieldProps {
  onTokenChange: (token: string) => void;
  resetTrigger?: number;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'auto' | 'light' | 'dark';
        }
      ) => string;
      remove?: (widgetId: string) => void;
      reset?: (widgetId: string) => void;
    };
  }
}

export const TurnstileField: React.FC<TurnstileFieldProps> = ({
  onTokenChange,
  resetTrigger = 0,
}) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current && window.turnstile.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'auto',
        callback: (token) => onTokenChange(token),
        'expired-callback': () => onTokenChange(''),
        'error-callback': () => onTokenChange(''),
      });
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const scriptId = 'cf-turnstile-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', renderWidget);
      return () => script?.removeEventListener('load', renderWidget);
    }
  }, [siteKey, onTokenChange]);

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile?.reset && resetTrigger > 0) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {}
    }
  }, [resetTrigger]);

  if (!siteKey) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-300">
        <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
        <span>
          Proteção anti-bot Cloudflare Turnstile aguardando{' '}
          <code className="font-mono font-bold">NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> no ambiente.
        </span>
      </div>
    );
  }

  return <div ref={containerRef} className="min-h-[65px] flex items-center justify-center" />;
};
