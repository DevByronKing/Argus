import { Capacitor } from '@capacitor/core';

export const NATIVE_APP_SCHEME = 'br.com.argus.app';
export const NATIVE_OAUTH_REDIRECT = `${NATIVE_APP_SCHEME}://auth/callback`;

export function isNativeMobileApp(): boolean {
  try {
    return typeof window !== 'undefined' && Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

export function getNativePlatform(): 'ios' | 'android' | 'web' {
  try {
    const platform = Capacitor.getPlatform();
    if (platform === 'ios' || platform === 'android') return platform;
    return 'web';
  } catch {
    return 'web';
  }
}

export function getOAuthCallbackUrl(customRedirect?: string): string | undefined {
  if (customRedirect) return customRedirect;
  if (isNativeMobileApp()) {
    return NATIVE_OAUTH_REDIRECT;
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback`;
  }
  return undefined;
}

/**
 * Abre URL de OAuth ou pagamento externo em Chrome Custom Tabs (Android) / ASWebAuthenticationSession (iOS),
 * evitando o bloqueio `disallowed_useragent` do Google dentro de WebViews.
 */
export async function openNativeBrowserUrl(url: string): Promise<boolean> {
  if (!isNativeMobileApp()) {
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
    return false;
  }
  try {
    const { Browser } = await import('@capacitor/browser');
    await Browser.open({
      url,
      presentationStyle: 'popover',
      toolbarColor: '#060913',
    });
    return true;
  } catch {
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
    return false;
  }
}

export async function closeNativeBrowser(): Promise<void> {
  if (!isNativeMobileApp()) return;
  try {
    const { Browser } = await import('@capacitor/browser');
    await Browser.close();
  } catch {}
}

export async function syncNativeStatusBar(theme: 'dark' | 'light'): Promise<void> {
  if (!isNativeMobileApp()) return;
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({
      style: theme === 'dark' ? Style.Dark : Style.Light,
    });
    if (getNativePlatform() === 'android') {
      await StatusBar.setBackgroundColor({
        color: theme === 'dark' ? '#060913' : '#FFFFFF',
      });
    }
  } catch {}
}

export async function hideNativeSplashScreen(): Promise<void> {
  if (!isNativeMobileApp()) return;
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide({ fadeOutDuration: 300 });
  } catch {}
}

/**
 * Agenda lembrete diário local de estudos (sem depender de servidor push pago).
 */
export async function scheduleDailyStudyReminder(hour = 19, minute = 0): Promise<boolean> {
  if (!isNativeMobileApp()) return false;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== 'granted') return false;

    await LocalNotifications.cancel({ notifications: [{ id: 1001 }] }).catch(() => {});
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1001,
          title: '⚡ Hora do seu Ciclo Argus!',
          body: 'Resolva 5 questões rápidas ou revise seus flashcards para manter sua ofensiva viva.',
          schedule: {
            on: { hour, minute },
            repeats: true,
            allowWhileIdle: true,
          },
          sound: undefined,
        },
      ],
    });
    return true;
  } catch {
    return false;
  }
}

export async function cancelStudyReminders(): Promise<void> {
  if (!isNativeMobileApp()) return;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.cancel({ notifications: [{ id: 1001 }] });
  } catch {}
}
