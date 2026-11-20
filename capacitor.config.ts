import type { CapacitorConfig } from '@capacitor/cli';

const PRODUCTION_SERVER_URL = 'https://argus-edu.vercel.app';
const serverUrl = process.env.CAPACITOR_SERVER_URL?.trim() || PRODUCTION_SERVER_URL;
const isLocalDevServer = serverUrl.startsWith('http://');

const config: CapacitorConfig = {
  appId: 'br.com.argus.app',
  appName: 'Argus AI',
  webDir: 'capacitor-web',
  backgroundColor: '#060913',
  server: {
    url: serverUrl,
    cleartext: isLocalDevServer,
    androidScheme: 'https',
    iosScheme: 'https',
    errorPath: 'index.html',
    allowNavigation: [
      'argus-edu.vercel.app',
      'argus.app.br',
      '*.argus.app.br',
      '*.supabase.co',
      'challenges.cloudflare.com',
      '*.asaas.com',
    ],
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: false,
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: isLocalDevServer,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: false,
      backgroundColor: '#060913',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#060913',
      overlaysWebView: false,
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true,
    },
    LocalNotifications: {
      iconColor: '#2563EB',
    },
  },
};

export default config;
