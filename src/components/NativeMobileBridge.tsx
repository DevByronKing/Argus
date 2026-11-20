'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import {
  isNativeMobileApp,
  syncNativeStatusBar,
  hideNativeSplashScreen,
  closeNativeBrowser,
  NATIVE_APP_SCHEME,
} from '@/lib/mobileBridge';
import { getSupabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';

interface NativeMobileBridgeProps {
  theme: 'dark' | 'light';
  activeTab: string;
  onGoBack: () => void;
  onNavigateTab: (tab: string) => void;
  onNotify?: (message: string) => void;
}

/**
 * Ponte nativa unificada para iOS e Android (Capacitor 8).
 * No navegador Web comum, não executa overhead nem renderiza nada.
 */
export const NativeMobileBridge: React.FC<NativeMobileBridgeProps> = ({
  theme,
  activeTab,
  onGoBack,
  onNavigateTab,
  onNotify,
}) => {
  const [isOffline, setIsOffline] = useState(false);

  // 1. Esconde a Splash Screen nativa assim que o React monta
  useEffect(() => {
    if (!isNativeMobileApp()) return;
    void hideNativeSplashScreen();
  }, []);

  // 2. Sincroniza cor e contraste da StatusBar nativa (iOS e Android) com o tema
  useEffect(() => {
    if (!isNativeMobileApp()) return;
    void syncNativeStatusBar(theme);
  }, [theme]);

  // 3. Hardware Back Button (Android) + Deep Link OAuth (`br.com.argus.app://auth/callback`)
  useEffect(() => {
    if (!isNativeMobileApp()) return;

    let removeBackListener: (() => Promise<void>) | undefined;
    let removeUrlListener: (() => Promise<void>) | undefined;

    const setupAppListeners = async () => {
      try {
        const { App } = await import('@capacitor/app');

        const backHandle = await App.addListener('backButton', () => {
          if (activeTab && activeTab !== 'landing') {
            onGoBack();
          } else {
            App.minimizeApp().catch(() => {});
          }
        });
        removeBackListener = () => backHandle.remove();

        const urlHandle = await App.addListener('appUrlOpen', async (event) => {
          const incomingUrl = event?.url || '';
          if (!incomingUrl) return;

          // Deep link de retorno do Google OAuth (`br.com.argus.app://auth/callback?code=...`)
          if (
            incomingUrl.startsWith(`${NATIVE_APP_SCHEME}://auth/callback`) ||
            incomingUrl.includes('/auth/callback')
          ) {
            await closeNativeBrowser();
            try {
              const parsed = new URL(incomingUrl);
              const code = parsed.searchParams.get('code');
              if (code) {
                const supabase = getSupabase();
                if (supabase) {
                  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
                  if (!error && data?.session?.user) {
                    const u = data.session.user;
                    const name =
                      (typeof u.user_metadata?.full_name === 'string' && u.user_metadata.full_name) ||
                      (typeof u.user_metadata?.name === 'string' && u.user_metadata.name) ||
                      u.email?.split('@')[0] ||
                      'Aluno Argus';
                    useAuthStore.getState().setAuth(
                      {
                        id: u.id,
                        email: u.email || '',
                        name,
                        role: 'student',
                      },
                      data.session.access_token
                    );
                    onNotify?.(`Bem-vindo(a), ${name}! Login realizado no app.`);
                    onNavigateTab('landing');
                  }
                }
              }
            } catch (err) {
              console.warn('Falha ao processar deep link OAuth:', err);
            }
          }
        });
        removeUrlListener = () => urlHandle.remove();
      } catch {}
    };

    void setupAppListeners();

    return () => {
      void removeBackListener?.();
      void removeUrlListener?.();
    };
  }, [activeTab, onGoBack, onNavigateTab, onNotify]);

  // 4. Monitor de conectividade nativo (iOS/Android)
  useEffect(() => {
    if (!isNativeMobileApp()) return;

    let removeNetworkListener: (() => Promise<void>) | undefined;

    const setupNetwork = async () => {
      try {
        const { Network } = await import('@capacitor/network');
        const status = await Network.getStatus();
        setIsOffline(!status.connected);

        const handle = await Network.addListener('networkStatusChange', (nextStatus) => {
          setIsOffline(!nextStatus.connected);
          if (nextStatus.connected) {
            onNotify?.('Conexão restabelecida!');
          }
        });
        removeNetworkListener = () => handle.remove();
      } catch {}
    };

    void setupNetwork();

    return () => {
      void removeNetworkListener?.();
    };
  }, [onNotify]);

  if (!isOffline) return null;

  return (
    <div
      role="status"
      aria-live="assertive"
      className="fixed top-3 inset-x-3 z-[200] flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white border border-amber-500/40 shadow-2xl backdrop-blur-md animate-fadeIn"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-xs font-bold truncate">
          Você está sem internet. Reconectando automaticamente...
        </span>
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-black shrink-0 cursor-pointer"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Atualizar</span>
      </button>
    </div>
  );
};
