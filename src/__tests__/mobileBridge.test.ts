import { describe, it, expect } from 'vitest';
import {
  NATIVE_APP_SCHEME,
  NATIVE_OAUTH_REDIRECT,
  isNativeMobileApp,
  getNativePlatform,
  getOAuthCallbackUrl,
} from '@/lib/mobileBridge';

describe('Mobile Native Bridge (Capacitor 8 — Android & iOS)', () => {
  it('define scheme e deep link OAuth oficiais para Android e iOS', () => {
    expect(NATIVE_APP_SCHEME).toBe('br.com.argus.app');
    expect(NATIVE_OAUTH_REDIRECT).toBe('br.com.argus.app://auth/callback');
  });

  it('detecta ambiente web em jsdom sem quebrar SSR ou navegador', () => {
    expect(isNativeMobileApp()).toBe(false);
    expect(getNativePlatform()).toBe('web');
  });

  it('retorna callback web padrão no navegador e respeita redirect customizado', () => {
    expect(getOAuthCallbackUrl()).toContain('/auth/callback');
    expect(getOAuthCallbackUrl('https://argus.app.br/auth/callback')).toBe(
      'https://argus.app.br/auth/callback'
    );
  });
});
