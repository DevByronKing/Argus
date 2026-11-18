'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/components/LandingPage';
import { PricingModal } from '@/components/PricingModal';
import { AICopilotDrawer } from '@/components/AICopilotDrawer';
import { StudentProfileModal } from '@/components/StudentProfileModal';
import { AuthModal } from '@/components/AuthModal';
import { UserOnboardingModal } from '@/components/UserOnboardingModal';
import {
  ONBOARDING_COMPLETED_KEY,
  ONBOARDING_PROFILE_KEY,
  ONBOARDING_SKIPPED_KEY,
  shouldAutoOpenOnboarding,
} from '@/components/onboarding/onboardingData';
import { getSyncUserId } from '@/lib/authIdentity';
import { SeanEllisSurveyModal } from '@/components/SeanEllisSurveyModal';
import { TabLoadingSkeleton } from '@/components/TabLoadingSkeleton';
import { ScrollToTop } from '@/components/ScrollToTop';
import { MobileAppModal } from '@/components/MobileAppModal';
import { useAuthStore } from '@/store/useAuthStore';
import { Sparkles, ArrowLeft, Home, Target, ChevronRight } from 'lucide-react';
import { CANONICAL_MODULES } from '@/lib/types';
import { GlobalExamContextBar } from '@/components/GlobalExamContextBar';
import { FloatingContactSupport } from '@/components/FloatingContactSupport';
import { FlashChallengeModal } from '@/components/FlashChallengeModal';
import { InactivityRecoveryBanner } from '@/components/InactivityRecoveryBanner';
import { ReferralProgramModal } from '@/components/ReferralProgramModal';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';
import { SplashScreen } from '@/components/SplashScreen';
import { GoogleAdSense } from '@/components/GoogleAdSense';
import { analytics } from '@/lib/analytics';
import { isFreemiumAllowed } from '@/lib/abTesting';

// Code Splitting Dinâmico de Abas Pesadas (Performance Otimizada)
const EditalParser = dynamic(
  () => import('@/components/EditalParser').then((m) => m.EditalParser),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const StudyCycleManager = dynamic(
  () => import('@/components/StudyCycleManager').then((m) => m.StudyCycleManager),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const QuizSimulator = dynamic(
  () => import('@/components/QuizSimulator').then((m) => m.QuizSimulator),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const AnalyticsDashboard = dynamic(
  () => import('@/components/AnalyticsDashboard').then((m) => m.AnalyticsDashboard),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const DiscursiveStudio = dynamic(
  () => import('@/components/DiscursiveStudio').then((m) => m.DiscursiveStudio),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const MistakesNotebook = dynamic(
  () => import('@/components/MistakesNotebook').then((m) => m.MistakesNotebook),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const SmartVadeMecum = dynamic(
  () => import('@/components/SmartVadeMecum').then((m) => m.SmartVadeMecum),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const QuestionBank = dynamic(
  () => import('@/components/QuestionBank').then((m) => m.QuestionBank),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const BancaPsychometrics = dynamic(
  () => import('@/components/BancaPsychometrics').then((m) => m.BancaPsychometrics),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const SRSFlashcardPlayer = dynamic(
  () => import('@/components/SRSFlashcardPlayer').then((m) => m.SRSFlashcardPlayer),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const UserSettingsTab = dynamic(
  () => import('@/components/UserSettingsTab').then((m) => m.UserSettingsTab),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const CheckoutCartTab = dynamic(
  () => import('@/components/CheckoutCartTab').then((m) => m.CheckoutCartTab),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const SubscriptionManagementTab = dynamic(
  () => import('@/components/SubscriptionManagementTab').then((m) => m.SubscriptionManagementTab),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const ConcursosRadarTab = dynamic(
  () => import('@/components/ConcursosRadarTab').then((m) => m.ConcursosRadarTab),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const HelpAndAboutTab = dynamic(
  () => import('@/components/HelpAndAboutTab').then((m) => m.HelpAndAboutTab),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const PricingPlansTab = dynamic(
  () => import('@/components/PricingPlansTab').then((m) => m.PricingPlansTab),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const SmartSubjectSummaries = dynamic(
  () => import('@/components/SmartSubjectSummaries').then((m) => m.SmartSubjectSummaries),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const PostPaymentWelcomeTab = dynamic(
  () => import('@/components/PostPaymentWelcomeTab').then((m) => m.PostPaymentWelcomeTab),
  { loading: () => <TabLoadingSkeleton />, ssr: false }
);
const AdminQuestionIngestModal = dynamic(
  () => import('@/components/AdminQuestionIngestModal').then((m) => m.AdminQuestionIngestModal),
  { ssr: false }
);

import { 
  ExamNotice, 
  QuestionAttempt, 
  UserMetrics, 
  Flashcard, 
  SubscriptionPlan,
  MistakeEntry,
  StudentProfile,
  ParsedExamQuestion
} from '@/lib/types';
import { GUARDIAN_ANIMALS, DEFAULT_STUDENT_PROFILE } from '@/lib/guardianAnimals';
import { SupabaseService } from '@/lib/supabaseService';
import { isSupabaseConfigured, getSupabase } from '@/lib/supabase';
import { 
  INITIAL_EXAMS, 
  INITIAL_METRICS, 
  INITIAL_FLASHCARDS,
  INITIAL_MISTAKES, 
  MOCK_QUESTIONS 
} from '@/lib/mockData';

export function ArgusApp() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [tabHistory, setTabHistory] = useState<string[]>([]);

  const handleNavigateWithHistory = (nextTab: string) => {
    if (nextTab !== activeTab) {
      setTabHistory((prev) => [...prev.slice(-15), activeTab]);
      setActiveTab(nextTab);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleGoBack = () => {
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
  };

  const handleGoHome = () => {
    handleNavigateWithHistory('landing');
  };

  const handleOpenPricing = () => {
    setPricingModalInitialTab('plans');
    setIsPricingOpen(true);
  };

  const handleSelectPlanForPaywall = (targetPlan: SubscriptionPlan) => {
    const safePlan: SubscriptionPlan =
      targetPlan === 'aspirante' && !isFreemiumAllowed() ? 'lancamento' : targetPlan;
    setPendingCheckoutPlan(safePlan);
    setPricingModalInitialTab('checkout');
    setIsPricingOpen(true);
  };
  const [exams, setExams] = useState<ExamNotice[]>(INITIAL_EXAMS);
  const [selectedExam, setSelectedExam] = useState<ExamNotice>(INITIAL_EXAMS[0]);
  const [metrics, setMetrics] = useState<UserMetrics>(INITIAL_METRICS);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [plan, setPlan] = useState<SubscriptionPlan>('aspirante');
  const [pendingCheckoutPlan, setPendingCheckoutPlan] = useState<SubscriptionPlan>('pro');
  const [pricingModalInitialTab, setPricingModalInitialTab] = useState<'plans' | 'checkout'>('plans');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isAdminIngestOpen, setIsAdminIngestOpen] = useState(false);
  const [isServerVerifiedAdmin, setIsServerVerifiedAdmin] = useState(false);
  const [isOnboardingTerminalOpen, setIsOnboardingTerminalOpen] = useState(false);
  const [isSeanEllisSurveyOpen, setIsSeanEllisSurveyOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Student Profile & Daily AI Quota tracking
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(DEFAULT_STUDENT_PROFILE);
  const [defaultExamId, setDefaultExamId] = useState<string>(INITIAL_EXAMS[0].id);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Retenção & Aquisição Viral (Pilar 1 e Pilar 2)
  const [isFlashChallengeOpen, setIsFlashChallengeOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isInactivityBannerForceOpen, setIsInactivityBannerForceOpen] = useState(false);

  const [dailyAiCount, setDailyAiCount] = useState<number>(0);
  // Navigation Style Mode: 'sidebar' (Opção 1) | 'megamenu' (Opção 2) | 'dock' (Opção 3)
  const [navMode, setNavMode] = useState<'sidebar' | 'megamenu' | 'dock'>('dock');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // O dock flutuante é ocultado quando qualquer overlay/gaveta/modal estiver ativo
  const isAnyOverlayOpen = Boolean(
    isCopilotOpen ||
    isPricingOpen ||
    isAdminIngestOpen ||
    isOnboardingTerminalOpen ||
    isSeanEllisSurveyOpen ||
    isProfileModalOpen ||
    isAuthModalOpen ||
    isMobileModalOpen ||
    isFlashChallengeOpen ||
    isReferralModalOpen
  );

  // Sequência de entrada ordenada e sem poluição: 1) Splash Screen -> 2) LGPD -> 3) Anamnese Cognitiva -> 4) App liberado
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [hasLgpdConsent, setHasLgpdConsent] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('argus_cookie_consent') || localStorage.getItem('argus_lgpd_consent');
      if (consent) setHasLgpdConsent(true);
    } catch {}
  }, []);

  const checkAndTriggerOnboarding = () => {
    const isTestEnv = typeof window !== 'undefined' && Boolean(
      window.navigator.webdriver ||
      window.location.search.includes('test=1') ||
      (window as any).__E2E__
    );
    if (isTestEnv) return;

    try {
      const shouldOpen = shouldAutoOpenOnboarding({
        completed: Boolean(localStorage.getItem(ONBOARDING_COMPLETED_KEY)),
        hasSavedProfile: Boolean(localStorage.getItem(ONBOARDING_PROFILE_KEY)),
        skippedAt: localStorage.getItem(ONBOARDING_SKIPPED_KEY),
      });
      if (shouldOpen) {
        setIsOnboardingTerminalOpen(true);
      }
    } catch {}
  };

  const handleSplashFinish = () => {
    setIsSplashDone(true);
    // Passo 2: Verifica se LGPD já foi aceito. Se sim, passa diretamente para o Passo 3 (Anamnese)
    const consent = typeof window !== 'undefined'
      ? (localStorage.getItem('argus_cookie_consent') || localStorage.getItem('argus_lgpd_consent'))
      : null;
    if (consent) {
      setHasLgpdConsent(true);
      setTimeout(() => {
        checkAndTriggerOnboarding();
      }, 350);
    }
  };

  const handleLgpdConsentGiven = () => {
    setHasLgpdConsent(true);
    // Passo 3: Imediatamente após aceitar LGPD, abre a Anamnese se ainda pendente
    setTimeout(() => {
      checkAndTriggerOnboarding();
    }, 400);
  };

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      // Limpeza automática única de mocks legados (14d streak, 48 questões, erros e faturas fictícias)
      if (!localStorage.getItem('argus_clean_slate_v1')) {
        localStorage.removeItem('argus_metrics');
        localStorage.removeItem('aprovalens_metrics');
        localStorage.removeItem('argus_mistakes');
        localStorage.removeItem('aprovalens_mistakes');
        localStorage.removeItem('argus_achievements');
        localStorage.removeItem('argus_daily_missions');
        localStorage.removeItem('learning_ai_subscription_detail');
        localStorage.setItem('argus_clean_slate_v1', 'true');
      }

      const savedPlan = localStorage.getItem('argus_plan') || localStorage.getItem('aprovalens_plan');
      if (savedPlan) setPlan(savedPlan as SubscriptionPlan);

      const savedMetrics = localStorage.getItem('argus_metrics') || localStorage.getItem('aprovalens_metrics');
      if (savedMetrics) setMetrics(JSON.parse(savedMetrics));

      const savedMistakes = localStorage.getItem('argus_mistakes') || localStorage.getItem('aprovalens_mistakes');
      if (savedMistakes) setMistakes(JSON.parse(savedMistakes));

      // Carregar Passaporte Cognitivo do Estudante
      const savedProfile = localStorage.getItem('argus_student_profile') || localStorage.getItem('aprovalens_student_profile');
      if (savedProfile) {
        try {
          setStudentProfile(JSON.parse(savedProfile));
        } catch {}
      }

      // Carregar editais personalizados salvos pelo estudante
      let combinedExams = INITIAL_EXAMS;
      const savedCustomExams = localStorage.getItem('argus_custom_exams') || localStorage.getItem('aprovalens_custom_exams');
      if (savedCustomExams) {
        try {
          const parsedCustom = JSON.parse(savedCustomExams);
          if (Array.isArray(parsedCustom) && parsedCustom.length > 0) {
            combinedExams = [...parsedCustom, ...INITIAL_EXAMS];
            setExams(combinedExams);
          }
        } catch {}
      }

      // Carregar edital padrão preferido
      const savedDefaultExamId = localStorage.getItem('argus_default_exam_id') || localStorage.getItem('aprovalens_default_exam_id');
      if (savedDefaultExamId) {
        const matched = combinedExams.find(e => e.id === savedDefaultExamId);
        if (matched) {
          setSelectedExam(matched);
          setDefaultExamId(matched.id);
        }
      }

      // Carregar cota de IA diária utilizada hoje
      const todayKey = `argus_ai_count_${new Date().toISOString().split('T')[0]}`;
      const savedCount = localStorage.getItem(todayKey) || localStorage.getItem(`aprovalens_ai_count_${new Date().toISOString().split('T')[0]}`);
      if (savedCount) {
        setDailyAiCount(parseInt(savedCount, 10) || 0);
      }

      // Carregar preferência de tema (Claro / Escuro - Padrão: Claro)
      const rawTheme = localStorage.getItem('argus_theme') || localStorage.getItem('learning_ai_theme');
      const savedTheme: 'dark' | 'light' = rawTheme === 'dark' ? 'dark' : 'light';
      setTheme(savedTheme);
      // Aplica classes de tema: 'dark' para Tailwind dark: + CSS vars, 'light' para CSS vars html.light
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(savedTheme);
      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(savedTheme);
      }

      // Carregar preferência de estilo de navegação (Padrão: Dock Flutuante)
      const savedNavMode = (localStorage.getItem('learning_ai_nav_mode') as 'sidebar' | 'megamenu' | 'dock') || 'dock';
      setNavMode(savedNavMode);

      // Captura de parâmetros de URL originados de Landing Pages de SEO (?edital=...&tab=...)
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const editalSlug = params.get('edital');
        const tabParam = params.get('tab');
        const checkoutSuccess = params.get('checkout') === 'success' || params.get('payment') === 'success' || params.get('status') === 'approved';

        if (tabParam) {
          setActiveTab(tabParam);
        } else if (checkoutSuccess) {
          setActiveTab('welcome-success');
        }

        if (editalSlug) {
          const matchingExam = INITIAL_EXAMS.find(e => 
            e.id.toLowerCase().includes(editalSlug.toLowerCase()) || 
            e.title.toLowerCase().includes(editalSlug.toLowerCase())
          );
          if (matchingExam) {
            setSelectedExam(matchingExam);
            showToast(`Edital carregado: ${matchingExam.title}`);
          }
        }

        // Parâmetros de URL para campanhas, retenção e indicação
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('paywall') === 'required') {
          setIsPricingOpen(true);
          showToast('Acesso exclusivo: Escolha seu Passe ou Plano PRO para liberar todas as ferramentas.');
        }

        if (urlParams.get('auth') === 'required') {
          setIsAuthModalOpen(true);
          showToast('Faça login com sua conta autorizada para continuar.');
        }

        if (urlParams.get('ref')) {
          const refCode = urlParams.get('ref');
          localStorage.setItem('argus_referrer_code', refCode || '');
          showToast(`Indicação ativada (${refCode})! Benefício PRO aplicado na sua conta.`);
        }

        if (urlParams.get('desafio') === '1' || urlParams.get('flash') === '1') {
          setIsFlashChallengeOpen(true);
        }

        if (urlParams.get('inactivity') === '1' || urlParams.get('test_inactivity') === '1') {
          setIsInactivityBannerForceOpen(true);
        }
      }

      // Listener para abertura manual da pesquisa de PMF (via Configurações/Ajuda)
      const handleOpenSurvey = () => setIsSeanEllisSurveyOpen(true);
      window.addEventListener('open-pmf-survey', handleOpenSurvey);

      // Listener para abertura do modal de autenticação / login com Google
      const handleOpenAuth = () => setIsAuthModalOpen(true);
      window.addEventListener('open-auth-modal', handleOpenAuth);
      window.addEventListener('argus_open_auth', handleOpenAuth);

      // Listeners de Retenção, Paywall & Viral Loops
      const handleOpenFlash = () => setIsFlashChallengeOpen(true);
      window.addEventListener('open-flash-challenge', handleOpenFlash);

      const handleOpenReferral = () => setIsReferralModalOpen(true);
      window.addEventListener('open-referral-modal', handleOpenReferral);

      const handleOpenPricingEvent = (e: Event) => {
        const detail = (e as CustomEvent<{ plan?: SubscriptionPlan; tab?: 'plans' | 'checkout' }>).detail;
        if (detail?.plan && detail.plan !== 'aspirante') {
          setPendingCheckoutPlan(detail.plan);
        }
        setPricingModalInitialTab(detail?.tab === 'checkout' ? 'checkout' : 'plans');
        setIsPricingOpen(true);
      };
      window.addEventListener('argus-open-pricing', handleOpenPricingEvent);

      const handleOpenOnboardingEvent = () => setIsOnboardingTerminalOpen(true);
      window.addEventListener('argus-open-onboarding', handleOpenOnboardingEvent);

      const handleGoHomeEvent = () => {
        setTabHistory((prev) => [...prev.slice(-15), 'landing']);
        setActiveTab('landing');
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };
      window.addEventListener('argus-go-home', handleGoHomeEvent);

      return () => {
        window.removeEventListener('open-pmf-survey', handleOpenSurvey);
        window.removeEventListener('open-auth-modal', handleOpenAuth);
        window.removeEventListener('argus_open_auth', handleOpenAuth);
        window.removeEventListener('open-flash-challenge', handleOpenFlash);
        window.removeEventListener('open-referral-modal', handleOpenReferral);
        window.removeEventListener('argus-open-pricing', handleOpenPricingEvent);
        window.removeEventListener('argus-open-onboarding', handleOpenOnboardingEvent);
        window.removeEventListener('argus-go-home', handleGoHomeEvent);
      };
    } catch {}
  }, []);

  // Sincronização em tempo real da Sessão Supabase Auth + Plano Ativo com o Zustand useAuthStore
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    const syncAuthAndPlan = async (
      u: { id: string; email?: string; user_metadata?: Record<string, unknown> },
      accessToken: string
    ) => {
      const fullName = typeof u.user_metadata?.full_name === 'string' ? u.user_metadata.full_name : undefined;
      const metaName = typeof u.user_metadata?.name === 'string' ? u.user_metadata.name : undefined;
      const name = fullName || metaName || u.email?.split('@')[0] || 'Aluno Concurseiro';

      useAuthStore.getState().setAuth(
        {
          id: u.id,
          email: u.email || '',
          name,
          role: 'student',
        },
        accessToken
      );

      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('subscription_tier, subscription_status')
          .eq('id', u.id)
          .single();

        if (
          profileData &&
          profileData.subscription_status === 'active' &&
          ['lancamento', 'pro', 'elite', 'black'].includes(profileData.subscription_tier)
        ) {
          setPlan(profileData.subscription_tier as SubscriptionPlan);
        }
      } catch {
        // Perfil sem assinatura paga confirmada mantém plano Visitante
      }

      // Verifica privilégio administrativo estritamente no backend (/api/admin/session)
      try {
        const admRes = await fetch('/api/admin/session', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const admData = await admRes.json().catch(() => null);
        setIsServerVerifiedAdmin(Boolean(admRes.ok && admData?.isAdmin === true));
      } catch {
        setIsServerVerifiedAdmin(false);
      }
    };

    // Carrega sessão atual ativa no Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        syncAuthAndPlan(session.user, session.access_token);
      }
    });

    // Monitora eventos de login/logout em tempo real
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        syncAuthAndPlan(session.user, session.access_token);
      } else if (event === 'SIGNED_OUT') {
        useAuthStore.getState().logout();
        setIsServerVerifiedAdmin(false);
        if (!isFreemiumAllowed()) {
          setPlan('aspirante');
        }
      }
    });
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleSetNavMode = (mode: 'sidebar' | 'megamenu' | 'dock') => {
    setNavMode(mode);
    try {
      localStorage.setItem('learning_ai_nav_mode', mode);
    } catch {}
    const label = mode === 'sidebar' ? 'Sidebar Lateral (Opção 1)' : mode === 'megamenu' ? 'Mega-Menu Topo (Opção 2)' : 'Dock Flutuante (Opção 3)';
    showToast(`Estilo alterado para: ${label}`);
  };

  // Transição de abas: Rolagem suave automática para o topo e atualização dinâmica do título da página
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        });
      }
      const titles: Record<string, string> = {
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
      const pageTitle = titles[activeTab] || 'Argus — Copiloto Cognitivo';
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

  const applyThemeClasses = (t: 'dark' | 'light') => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(t);
    document.documentElement.setAttribute('data-theme', t);
    if (document.body) {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(t);
      document.body.setAttribute('data-theme', t);
    }
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('learning_ai_theme', nextTheme);
      localStorage.setItem('argus_theme', nextTheme);
    } catch {}
    applyThemeClasses(nextTheme);
    showToast(nextTheme === 'light' ? '☀️ Modo Claro ativado!' : '🌙 Modo Escuro ativado!');
  };

  const handleSelectExam = (exam: ExamNotice) => {
    if (plan === 'lancamento') {
      const lockedTitle = typeof window !== 'undefined' ? localStorage.getItem('argus_locked_exam_title') : null;
      const lockedId = typeof window !== 'undefined' ? localStorage.getItem('argus_locked_exam_id') : null;
      if (lockedTitle && exam.title !== lockedTitle && exam.id !== lockedId) {
        showToast(`🔒 Seu Passe de R$ 97 é exclusivo para "${lockedTitle}". Para estudar múltiplos editais, faça upgrade para o Plano PRO, ELITE ou BLACK.`);
        setPendingCheckoutPlan('pro');
        setPricingModalInitialTab('plans');
        setIsPricingOpen(true);
        return;
      }
    }
    setSelectedExam(exam);
    showToast(`Edital selecionado: ${exam.title}`);
  };

  const handleSetDefaultExam = (exam: ExamNotice) => {
    if (plan === 'lancamento') {
      const lockedTitle = typeof window !== 'undefined' ? localStorage.getItem('argus_locked_exam_title') : null;
      const lockedId = typeof window !== 'undefined' ? localStorage.getItem('argus_locked_exam_id') : null;
      if (lockedTitle && exam.title !== lockedTitle && exam.id !== lockedId) {
        showToast(`🔒 Seu Passe de R$ 97 é exclusivo para "${lockedTitle}". Faça upgrade para alterar o edital padrão.`);
        setPendingCheckoutPlan('pro');
        setPricingModalInitialTab('plans');
        setIsPricingOpen(true);
        return;
      }
    }
    setSelectedExam(exam);
    setDefaultExamId(exam.id);
    try {
      localStorage.setItem('argus_default_exam_id', exam.id);
    } catch {}

    const careerDetected = 
      (exam.title + ' ' + exam.role).toLowerCase().includes('polic') || (exam.title + ' ' + exam.role).toLowerCase().includes('prf') || (exam.title + ' ' + exam.role).toLowerCase().includes('pf')
        ? 'policial'
        : (exam.title + ' ' + exam.role).toLowerCase().includes('fiscal') || (exam.title + ' ' + exam.role).toLowerCase().includes('receita')
        ? 'fiscal'
        : (exam.title + ' ' + exam.role).toLowerCase().includes('tribunal') || (exam.title + ' ' + exam.role).toLowerCase().includes('tj') || (exam.title + ' ' + exam.role).toLowerCase().includes('trf')
        ? 'tribunais'
        : (exam.title + ' ' + exam.role).toLowerCase().includes('oab') || (exam.title + ' ' + exam.role).toLowerCase().includes('advoga')
        ? 'juridica'
        : studentProfile.targetCareer;

    setStudentProfile((prev) => {
      const updated: StudentProfile = {
        ...prev,
        targetExamTitle: exam.title,
        targetBanca: (exam.banca === 'Cebraspe' || exam.banca === 'FGV' || exam.banca === 'FCC' || exam.banca === 'Vunesp' || exam.banca === 'Outra') 
          ? exam.banca 
          : 'Outra',
        targetCareer: careerDetected,
        updatedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('argus_student_profile', JSON.stringify(updated));
      } catch {}

      try {
        useAuthStore.getState().updateProfile(updated);
        const authUser = useAuthStore.getState().user;
        if (authUser?.id) {
          SupabaseService.syncStudentProfile(authUser.id, updated);
        }
      } catch {}

      return updated;
    });

    showToast(`⭐ "${exam.title}" definido como seu Edital Padrão! Ciclo de estudos, simulados e banco calibrados.`);
  };

  const handleGenerateCycle = (exam: ExamNotice) => {
    setSelectedExam(exam);
    setActiveTab('cycle');
    showToast(`Ciclo de estudos gerado para ${exam.title}!`);
  };

  const handleAddCustomExam = (newExam: ExamNotice) => {
    setExams((prev) => {
      const updated = [newExam, ...prev.filter(e => e.id !== newExam.id)];
      try {
        const customExams = updated.filter(e => !INITIAL_EXAMS.some(ie => ie.id === e.id));
        localStorage.setItem('argus_custom_exams', JSON.stringify(customExams));
      } catch {}
      return updated;
    });
    setSelectedExam(newExam);
    setDefaultExamId(newExam.id);
    try {
      localStorage.setItem('argus_target_exam', newExam.title);
      localStorage.setItem('argus_locked_exam_title', newExam.title);
      localStorage.setItem('argus_default_exam_id', newExam.id);
    } catch {}
    showToast(`Edital "${newExam.title}" importado e verticalizado com sucesso!`);
  };

  const handleAddFlashcard = (newFlashcard: Flashcard) => {
    setFlashcards((prev) => {
      const updated = [newFlashcard, ...prev];
      SupabaseService.syncFlashcards('user-demo', updated);
      return updated;
    });
    showToast('Flashcard salvo no Deck de Repetição Espaçada!');
  };

  const handleAddFlashcardsBatch = (newCards: Flashcard[]) => {
    setFlashcards((prev) => {
      const updated = [...newCards, ...prev];
      SupabaseService.syncFlashcards('user-demo', updated);
      return updated;
    });
    showToast(`${newCards.length} flashcards adicionados ao Deck de Repetição Espaçada!`);
  };

  const handleUpdateMistakeNote = (mistakeId: string, note: string) => {
    setMistakes((prev) => {
      const updated = prev.map((m) => (m.id === mistakeId ? { ...m, userPersonalNote: note } : m));
      try {
        localStorage.setItem('argus_mistakes', JSON.stringify(updated));
      } catch {}
      SupabaseService.syncMistakes('user-demo', updated);
      return updated;
    });
    showToast('Anotação pessoal salva no Caderno de Erros!');
  };

  const handleResolveMistakeInRevanche = (mistakeId: string, isCorrect: boolean) => {
    setMistakes((prev) => {
      const updated = prev.map((m) => {
        if (m.id !== mistakeId) return m;
        return {
          ...m,
          isOvercome: isCorrect ? true : m.isOvercome,
          overcomeAt: isCorrect ? new Date().toISOString() : m.overcomeAt,
          revancheAttemptsCount: m.revancheAttemptsCount + 1
        };
      });
      try {
        localStorage.setItem('argus_mistakes', JSON.stringify(updated));
      } catch {}
      SupabaseService.syncMistakes('user-demo', updated);
      return updated;
    });
    if (isCorrect) {
      showToast('🎉 Erro superado com sucesso no Modo Revanche!');
    }
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    setStudentProfile(updated);
    try {
      localStorage.setItem('argus_student_profile', JSON.stringify(updated));
    } catch {}
    const passportSyncId = getSyncUserId();
    if (passportSyncId) SupabaseService.syncStudentProfile(passportSyncId, updated);
    showToast(`Passaporte Cognitivo atualizado: Guardião ${GUARDIAN_ANIMALS.find(a => a.id === updated.guardianAnimalId)?.name}!`);
  };

  const handleRecordAttempt = (attempt: QuestionAttempt) => {
    SupabaseService.recordAttempt('user-demo', attempt);

    // Track daily AI request count
    const todayKey = `argus_ai_count_${new Date().toISOString().split('T')[0]}`;
    setDailyAiCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(todayKey, String(next));
      } catch {}
      return next;
    });

    setMetrics((prev) => {
      const newTotal = prev.totalAnswered + 1;
      const newCorrect = attempt.isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect;
      const newAccuracy = Math.round((newCorrect / newTotal) * 1000) / 10;
      
      const newDistribution = { ...prev.errorDistribution };
      if (!attempt.isCorrect && attempt.diagnostic?.errorType) {
        newDistribution[attempt.diagnostic.errorType] = (newDistribution[attempt.diagnostic.errorType] || 0) + 1;
      }

      const updated = {
        ...prev,
        totalAnswered: newTotal,
        totalCorrect: newCorrect,
        globalAccuracy: newAccuracy,
        probabilityOfPassing: Math.min(96, Math.max(30, Math.round(newAccuracy * 0.95))),
        errorDistribution: newDistribution
      };

      try {
        localStorage.setItem('argus_metrics', JSON.stringify(updated));
      } catch {}
      SupabaseService.syncMetrics('user-demo', updated);

      // Gatilho automático da pesquisa de satisfação desativado para gravação limpa e foco do aluno

      return updated;
    });

    // If incorrect, record into Mistakes Notebook automatically
    if (!attempt.isCorrect) {
      const questionData = MOCK_QUESTIONS.find((q) => q.id === attempt.questionId) || {
        id: attempt.questionId,
        subjectId: 'sub-geral',
        subjectName: 'Conhecimentos Específicos',
        topicId: 'top-geral',
        topicName: attempt.diagnostic?.suggestedReviewTopic || 'Tópico da Questão',
        banca: selectedExam?.banca || 'Cebraspe',
        year: 2026,
        institution: selectedExam?.institution || 'Banca Examinadora',
        statement: attempt.diagnostic?.flashcardFront || 'Questão do Simulado',
        options: [
          { id: 'opt-c', text: 'Opção Marcada', isCorrect: false },
          { id: 'opt-e', text: 'Gabarito Oficial', isCorrect: true }
        ],
        explanation: attempt.diagnostic?.feedback || 'Explicação do gabarito.',
        lawArticles: [],
        cognitiveAnalysis: {
          commonTrap: attempt.diagnostic?.actionableAdvice || 'Atenção aos distratores.',
          keyConcept: 'Revisão Necessária',
          bancaTendency: 'Frequente'
        }
      };

      const newMistake: MistakeEntry = {
        id: `mistake-${Date.now()}`,
        question: questionData,
        attemptDate: new Date().toISOString().split('T')[0],
        userSelectedOptionId: attempt.selectedOptionId,
        errorType: attempt.diagnostic?.errorType || 'pegadinha_banca',
        confidenceLevel: attempt.diagnostic?.confidenceLevel || 'media',
        feedback: attempt.diagnostic?.feedback || 'Atenção à regra cobrada pela banca.',
        actionableAdvice: attempt.diagnostic?.actionableAdvice || 'Revise o artigo de lei correlato.',
        isOvercome: false,
        revancheAttemptsCount: 0
      };

      setMistakes((prev) => {
        const existing = prev.find((m) => m.question.id === attempt.questionId);
        if (existing) return prev;
        const updated = [newMistake, ...prev];
        try {
          localStorage.setItem('argus_mistakes', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }

    // Also update the topic accuracy in the current exam
    if (selectedExam) {
      setExams((prevExams) =>
        prevExams.map((exam) => {
          if (exam.id !== selectedExam.id) return exam;
          return {
            ...exam,
            subjects: exam.subjects.map((sub) => ({
              ...sub,
              topics: sub.topics.map((top) => {
                if (attempt.isCorrect) {
                  return {
                    ...top,
                    accuracyRate: Math.min(100, (top.accuracyRate || 50) + 5),
                    status: (top.accuracyRate || 50) + 5 >= 75 ? 'Dominado' : 'Instável'
                  };
                } else {
                  return {
                    ...top,
                    accuracyRate: Math.max(10, (top.accuracyRate || 50) - 8),
                    status: (top.accuracyRate || 50) - 8 < 50 ? 'Ponto Cego' : 'Instável'
                  };
                }
              })
            }))
          };
        })
      );
    }
  };

  const handleReviewFlashcard = (flashcardId: string, rating: 'facil' | 'bom' | 'dificil' | 'errei') => {
    setFlashcards((prev) =>
      prev.map((fc) => {
        if (fc.id !== flashcardId) return fc;
        const multiplier = rating === 'facil' ? 2.5 : rating === 'bom' ? 1.8 : 1.2;
        const newInterval = Math.max(1, Math.round(fc.intervalDays * multiplier));
        return {
          ...fc,
          intervalDays: newInterval,
          repetitions: fc.repetitions + 1,
          nextReviewDate: new Date(Date.now() + newInterval * 86400000).toISOString().split('T')[0]
        };
      })
    );
    showToast(`Flashcard revisado! Próxima revisão em dias calibrados.`);
  };

  const handleUpgradePlan = (newPlan: SubscriptionPlan, openWelcome: boolean = true) => {
    setPlan(newPlan);
    try {
      localStorage.setItem('argus_plan', newPlan);
      localStorage.setItem('argus_last_order_id', `ARG-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch {}
    if (newPlan === 'lancamento') {
      const savedTarget = typeof window !== 'undefined' ? localStorage.getItem('argus_target_exam') : null;
      const matched = INITIAL_EXAMS.find(e => e.title === savedTarget) || INITIAL_EXAMS[0];
      try {
        localStorage.setItem('argus_locked_exam_id', matched.id);
        localStorage.setItem('argus_locked_exam_title', matched.title);
      } catch {}
      setSelectedExam(matched);
      setDefaultExamId(matched.id);
    }
    if (openWelcome && newPlan !== 'aspirante') {
      setIsPricingOpen(false);
      setActiveTab('welcome-success');
      showToast(`🎉 Matrícula confirmada no plano ${newPlan.toUpperCase()}!`);
    } else {
      showToast(`🎉 Parabéns! Plano ${newPlan.toUpperCase()} ativado com sucesso!`);
    }
  };

  const pendingMistakesCount = mistakes.filter((m) => !m.isOvercome).length;

  return (
    <div className={`min-h-screen flex flex-col items-center w-full selection:bg-blue-500/25 selection:text-blue-900 dark:selection:bg-blue-500/30 dark:selection:text-blue-100 transition-colors duration-300 relative overflow-x-hidden ${
      theme === 'light' ? 'app-bg-light text-slate-900' : 'app-bg-dark text-slate-100'
    }`}>
      
      {/* Ambient Background Glow Mesh Layer (Visível em ambos os modos) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
        {theme === 'dark' ? (
          <>
            <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-blue-600/18 blur-[140px] animate-pulse-slow" />
            <div className="absolute top-10 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-500/12 blur-[150px]" />
            <div className="absolute bottom-10 left-1/3 w-[700px] h-[500px] rounded-full bg-emerald-600/10 blur-[160px]" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.025)_1px,transparent_1px)] [background-size:24px_24px]" />
          </>
        )}
      </div>

      {/* Wrapper Constraint for Ultra-wide screens */}
      <div className="w-full max-w-[1920px] mx-auto flex flex-row flex-1 relative z-10 min-w-0">

        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Global Navbar com alternância de tema */}
          <div className="relative z-20">
            <Navbar
              activeTab={activeTab}
              setActiveTab={handleNavigateWithHistory}
              streakDays={metrics.streakDays}
              plan={plan}
              onOpenPricing={() => setActiveTab('pricing-plans')}
              selectedExamTitle={selectedExam?.title}
              pendingMistakesCount={pendingMistakesCount}
              onOpenCopilot={() => setIsCopilotOpen(true)}
              isSupabaseConfigured={isSupabaseConfigured()}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              studentProfile={studentProfile}
              onOpenProfile={() => setIsProfileModalOpen(true)}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onOpenSettings={() => setActiveTab('settings')}
              onOpenAdminIngest={() => setIsAdminIngestOpen(true)}
              isServerVerifiedAdmin={isServerVerifiedAdmin}
              onOpenMobileModal={() => setIsMobileModalOpen(true)}
              onOpenFlashChallenge={() => setIsFlashChallengeOpen(true)}
              onOpenReferral={() => setIsReferralModalOpen(true)}
            />
          </div>

          {/* Global Exam Context Bar - Barra Unificada de Navegação, Histórico & Edital Ativo */}
          <GlobalExamContextBar
            selectedExam={selectedExam}
            studentProfile={studentProfile}
            activeTab={activeTab}
            onNavigateTab={handleNavigateWithHistory}
            onOpenEditalSelector={() => handleNavigateWithHistory('edital')}
            onGoBack={handleGoBack}
            onGoHome={handleGoHome}
            onUpdateProfile={handleSaveProfile}
          />

          {/* Alerta de Resgate por Inatividade - Modo Pílula (Pilar 3: Anti-Churn) - Exibido apenas em abas de estudo para assinantes */}
          {activeTab !== 'landing' && (isFreemiumAllowed() || plan !== 'aspirante') && isSplashDone && hasLgpdConsent && !isOnboardingTerminalOpen && (
            <InactivityRecoveryBanner
              studentName={studentProfile?.warName || studentProfile?.name || 'Guerreiro(a)'}
              streakDays={metrics.streakDays}
              forceShowForTesting={isInactivityBannerForceOpen}
              onStartPillMode={() => {
                handleNavigateWithHistory('flashcards');
                showToast('Modo Pílula ativado! 3 flashcards rápidos hoje para blindar sua ofensiva.');
                setMetrics(prev => ({
                  ...prev,
                  streakDays: Math.max(prev.streakDays, 1),
                  lastStudyDate: new Date().toISOString()
                }));
              }}
            />
          )}

      {/* Main Content Area (sem z-index próprio para não prender overlays fixed como o Modo Foco Zen abaixo da Navbar) */}
      <main className={`flex-1 relative ${activeTab === 'landing' ? 'pb-20 md:pb-0' : 'pb-24 md:pb-16'}`}>
        <div key={activeTab} className="tab-page-wrapper">
          {activeTab === 'landing' && (
          <LandingPage
            onStartEdital={() => {
              analytics.track('cta_clicked', { location: 'landing_hero', cta_label: 'Desarmar Meu Edital' });
              setIsOnboardingTerminalOpen(true);
            }}
            onStartDiscursivas={() => handleNavigateWithHistory('discursivas')}
            onOpenPricing={() => {
              setPricingModalInitialTab('plans');
              setIsPricingOpen(true);
            }}
            onSelectPlan={(p) => handleSelectPlanForPaywall(p)}
            onOpenPsychometrics={() => handleNavigateWithHistory('psychometrics')}
            onNavigateTab={(tab) => handleNavigateWithHistory(tab)}
            onOpenFlashChallenge={() => setIsFlashChallengeOpen(true)}
          />
        )}

        {activeTab === 'edital' && (
          <EditalParser
            exams={exams}
            selectedExam={selectedExam}
            defaultExamId={defaultExamId}
            onSelectExam={handleSelectExam}
            onSetDefaultExam={handleSetDefaultExam}
            onGenerateCycle={handleGenerateCycle}
            onAddCustomExam={handleAddCustomExam}
            userPlan={plan}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
          />
        )}

        {activeTab === 'cycle' && (
          <StudyCycleManager
            selectedExam={selectedExam}
            onGoToSimulator={() => handleNavigateWithHistory('simulator')}
            studentProfile={studentProfile}
            userPlan={plan}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
          />
        )}

        {activeTab === 'simulator' && (
          <QuizSimulator
            onAddFlashcard={handleAddFlashcard}
            onAddFlashcardsBatch={handleAddFlashcardsBatch}
            onRecordAttempt={handleRecordAttempt}
            metrics={metrics}
            exams={exams}
            selectedExam={selectedExam}
            onSelectExam={handleSelectExam}
            userPlan={plan}
            dailyAiCount={dailyAiCount}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
            studentProfile={studentProfile}
          />
        )}

        {activeTab === 'flashcards' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <SRSFlashcardPlayer
              flashcards={flashcards}
              onReviewCard={handleReviewFlashcard}
              onAddNewCard={handleAddFlashcard}
              userPlan={plan}
              onOpenPricing={handleOpenPricing}
              onSelectPlan={handleSelectPlanForPaywall}
              onGoHome={handleGoHome}
            />
          </div>
        )}

        {activeTab === 'mistakes' && (
          <MistakesNotebook
            mistakes={mistakes}
            onUpdateMistakeNote={handleUpdateMistakeNote}
            onResolveMistakeInRevanche={handleResolveMistakeInRevanche}
            onGoToSimulator={() => handleNavigateWithHistory('simulator')}
            selectedExam={selectedExam}
            onGoToVadeMecum={(query) => {
              handleNavigateWithHistory('vademecum');
              if (query) showToast(`Buscando no Vade Mecum: ${query}`);
            }}
            onGoToEdital={() => handleNavigateWithHistory('edital')}
            userPlan={plan}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
          />
        )}

        {activeTab === 'vademecum' && (
          <SmartVadeMecum
            selectedExam={selectedExam}
            studentProfile={studentProfile}
            onGoToSimulator={() => handleNavigateWithHistory('simulator')}
            onGoToQuestion={(qid) => {
              handleNavigateWithHistory('simulator');
              showToast(`Carregando questão de prova vinculada: ${qid}`);
            }}
            userPlan={plan}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
          />
        )}

        {(activeTab === 'summaries' || activeTab === 'resumos') && (
          <SmartSubjectSummaries
            selectedExam={selectedExam}
            studentProfile={studentProfile}
            onAddFlashcard={handleAddFlashcard}
            onGoToVadeMecum={(query) => {
              handleNavigateWithHistory('vademecum');
              if (query) showToast(`Buscando no Vade Mecum: ${query}`);
            }}
            onGoToSimulator={(subj) => {
              handleNavigateWithHistory('simulator');
              if (subj) showToast(`Iniciando bateria de questões: ${subj}`);
            }}
            userPlan={plan}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
            showToast={showToast}
          />
        )}

        {activeTab === 'discursivas' && (
          <DiscursiveStudio
            selectedExam={selectedExam}
            studentProfile={studentProfile}
            userPlan={plan}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
            onRecordSubmission={(sub) => {
              showToast(`Redação avaliada! Nota: ${sub.evaluation.finalScore.toFixed(1)} pts`);
            }}
          />
        )}

        {(activeTab === 'analytics' || activeTab === 'dashboard') && (
          <AnalyticsDashboard
            metrics={metrics}
            selectedExam={selectedExam}
            flashcards={flashcards}
            studentProfile={studentProfile}
            userPlan={plan}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
            onReviewFlashcard={handleReviewFlashcard}
            onAddNewFlashcard={handleAddFlashcard}
            onGoToSimulator={(subj) => {
              handleNavigateWithHistory('simulator');
              if (subj) showToast(`Atacando vulnerabilidade na Arena: ${subj}`);
            }}
            onNavigateTab={(tab) => handleNavigateWithHistory(tab)}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionBank
            onAddFlashcard={handleAddFlashcard}
            onRecordAttempt={handleRecordAttempt}
            onGoToSimulator={() => handleNavigateWithHistory('simulator')}
            onGoToMistakes={() => handleNavigateWithHistory('mistakes')}
            studentProfile={studentProfile}
            userPlan={plan}
            onOpenPricing={handleOpenPricing}
            onSelectPlan={handleSelectPlanForPaywall}
            onGoHome={handleGoHome}
          />
        )}

          {activeTab === 'psychometrics' && (
            <BancaPsychometrics
              onGoToSimulator={(banca) => {
                handleNavigateWithHistory('simulator');
                if (banca) showToast(`Carregando simulado calibrado para a banca: ${banca}`);
              }}
              userPlan={plan}
              onOpenPricing={handleOpenPricing}
              onSelectPlan={handleSelectPlanForPaywall}
              onGoHome={handleGoHome}
            />
          )}

          {activeTab === 'radar' && (
            <ConcursosRadarTab
              selectedExam={selectedExam}
              onSetDefaultExam={handleSetDefaultExam}
              exams={exams}
              currentPlan={plan}
              onOpenPricing={() => handleNavigateWithHistory('pricing-plans')}
              onSelectExamNotice={(noticeId) => {
                const matched = exams.find((e) => e.id === noticeId);
                if (matched) {
                  handleSetDefaultExam(matched);
                  handleNavigateWithHistory('edital');
                } else {
                  handleNavigateWithHistory('edital');
                }
              }}
              onGoToDiscursivas={() => handleNavigateWithHistory('discursivas')}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <UserSettingsTab
              studentProfile={studentProfile}
              onSaveProfile={handleSaveProfile}
              currentPlan={plan}
              onOpenPricing={() => handleNavigateWithHistory('pricing-plans')}
              onOpenCheckout={(p) => {
                setPendingCheckoutPlan(p);
                handleNavigateWithHistory('checkout');
              }}
              onRestartOnboarding={() => setIsOnboardingTerminalOpen(true)}
              showToast={showToast}
            />
          )}

          {activeTab === 'checkout' && (
            <CheckoutCartTab
              initialPlan={pendingCheckoutPlan}
              onPaymentSuccess={(newPlan) => {
                handleUpgradePlan(newPlan, true);
              }}
              onGoBack={() => handleNavigateWithHistory('pricing-plans')}
              showToast={showToast}
            />
          )}

          {activeTab === 'welcome-success' && (
            <PostPaymentWelcomeTab
              plan={plan}
              onNavigateTab={(tab) => handleNavigateWithHistory(tab)}
              showToast={showToast}
            />
          )}

          {activeTab === 'subscription' && (
            <SubscriptionManagementTab
              currentPlan={plan}
              onUpgradePlan={(newPlan) => {
                setPendingCheckoutPlan(newPlan);
                handleNavigateWithHistory('checkout');
              }}
              onOpenPricing={() => handleNavigateWithHistory('pricing-plans')}
              showToast={showToast}
            />
          )}

          {activeTab === 'help' && (
            <HelpAndAboutTab
              showToast={showToast}
            />
          )}

          {activeTab === 'pricing-plans' && (
            <PricingPlansTab
              currentPlan={plan}
              onSelectPlanForCheckout={(selected) => {
                setPendingCheckoutPlan(selected);
                handleNavigateWithHistory('checkout');
              }}
              showToast={showToast}
            />
          )}
        </div>
      </main>

      {/* Omnipresent AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        metrics={metrics}
        selectedExam={selectedExam}
        pendingMistakesCount={pendingMistakesCount}
        profile={studentProfile}
        onNavigateTab={(tab) => handleNavigateWithHistory(tab)}
      />

      {/* Pricing & Checkout Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        currentPlan={plan}
        initialSelectedPlan={pendingCheckoutPlan}
        initialTab={pricingModalInitialTab}
        onUpgradePlan={handleUpgradePlan}
      />

      {/* Student Profile & Guardian Animal Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={studentProfile}
        onSaveProfile={handleSaveProfile}
        userPlan={plan}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* Auth & Google Sign-In Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Modal de App Mobile (Onboarding Multimodal) */}
      <MobileAppModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
      />

      {/* Admin Question Ingestion & Audit Pipeline Modal */}
      <AdminQuestionIngestModal
        isOpen={isAdminIngestOpen}
        onClose={() => setIsAdminIngestOpen(false)}
        onQuestionsIngested={(newQuestions) => {
          showToast(`🚀 ${newQuestions.length} questões auditadas carregadas com sucesso!`);
        }}
      />

      {/* Premium Gamified Cognitive Onboarding Modal */}
      <UserOnboardingModal
        isOpen={isOnboardingTerminalOpen}
        onClose={() => setIsOnboardingTerminalOpen(false)}
        currentProfile={studentProfile}
        onOpenPricing={handleOpenPricing}
        theme={theme}
        onComplete={(partialProfile, destinationTab, selectedPlan) => {
          setIsOnboardingTerminalOpen(false);
          const newProfile: StudentProfile = {
            ...studentProfile,
            ...partialProfile,
            updatedAt: new Date().toISOString()
          };
          setStudentProfile(newProfile);
          try {
            localStorage.setItem('argus_student_profile', JSON.stringify(newProfile));
            localStorage.setItem('argus_onboarding_completed', 'true');
          } catch {}

          // Atualizar Zustand store
          try {
            useAuthStore.getState().updateProfile(newProfile);
          } catch {}

          // Sincronizar com Supabase se houver usuário autenticado
          try {
            const syncUserId = getSyncUserId();
            if (syncUserId) {
              SupabaseService.syncStudentProfile(syncUserId, newProfile);
            }
          } catch {}

          // Sincronizar Edital Alvo com os exames disponíveis e torná-lo o edital padrão
          if (partialProfile.targetExamTitle) {
            const matchedExam = exams.find(e => 
              e.title.toLowerCase().includes((partialProfile.targetExamTitle || '').toLowerCase()) ||
              (partialProfile.targetExamTitle || '').toLowerCase().includes(e.title.toLowerCase())
            );
            if (matchedExam) {
              handleSetDefaultExam(matchedExam);
            }
          }

          // Modelo Zero Freemium / Hard Paywall:
          // Após o Passaporte da Anamnese, direciona o visitante para escolha de plano ou checkout sem liberar acesso gratuito ao simulador
          if (!isFreemiumAllowed() && plan === 'aspirante') {
            const targetPlan: SubscriptionPlan =
              selectedPlan && selectedPlan !== 'aspirante'
                ? selectedPlan
                : destinationTab === 'checkout'
                  ? 'lancamento'
                  : 'pro';
            setPendingCheckoutPlan(targetPlan);
            setPricingModalInitialTab(destinationTab === 'checkout' ? 'checkout' : 'plans');
            setIsPricingOpen(true);
            showToast(
              destinationTab === 'checkout'
                ? '🎯 Passaporte concluído! Finalize o pagamento para liberar todos os módulos do seu edital.'
                : '🎯 Passaporte concluído! Escolha seu plano (Passe R$ 97, PRO, ELITE ou BLACK) para começar.'
            );
          } else if (destinationTab === 'pricing' || destinationTab === 'checkout') {
            const targetPlan: SubscriptionPlan =
              selectedPlan && selectedPlan !== 'aspirante' ? selectedPlan : 'pro';
            setPendingCheckoutPlan(targetPlan);
            setPricingModalInitialTab(destinationTab === 'checkout' ? 'checkout' : 'plans');
            setIsPricingOpen(true);
            showToast('🎯 Diagnóstico concluído! Conheça os recursos do seu plano.');
          } else {
            setActiveTab('simulator');
            showToast(`🎯 Diagnóstico concluído! Sua primeira bateria personalizada de ${partialProfile.targetExamTitle || 'questões'} está pronta.`);
          }
        }}
      />

      

      {/* Pesquisa de PMF In-App - Sean Ellis Test */}
      <SeanEllisSurveyModal
        isOpen={isSeanEllisSurveyOpen}
        onClose={() => setIsSeanEllisSurveyOpen(false)}
        onSubmitted={() => {
          showToast('❤️ Muito obrigado por ajudar a calibrar o Argus!');
        }}
      />

      {/* 1. Splash Screen de Carregamento Cognitivo Inicial */}
      {!isSplashDone && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      {/* 2. Banner de Consentimento de Cookies & LGPD (Passo 2 do fluxo: exibido sozinho após a Splash) */}
      <CookieConsentBanner
        canShow={isSplashDone && !hasLgpdConsent}
        onConsentGiven={handleLgpdConsentGiven}
      />

      {/* 3. Google AdSense Estratégico (Apenas Plano Gratuito / Zero Ad para Assinantes) */}
      <GoogleAdSense currentPlan={plan} />

      {/* Botão Flutuante de Rolagem Suave para o Topo */}
      <ScrollToTop />

      {/* Suporte Direto 1-a-1 & Floating WhatsApp (Pilar 2: Qualificação com is_paying_or_committed) */}
      <FloatingContactSupport
        currentTab={activeTab}
        targetExam={selectedExam?.title || studentProfile?.targetExamTitle || 'Concurso Público'}
        studentName={studentProfile?.warName || studentProfile?.name || 'Estudante'}
        theme={theme}
        isPayingOrCommitted={plan !== 'aspirante'}
      />

      {/* Desafio Relâmpago das 3 Pegadinhas (D0 Instant Retention Aha Moment) */}
      <FlashChallengeModal
        isOpen={isFlashChallengeOpen}
        onClose={() => setIsFlashChallengeOpen(false)}
        targetBanca={selectedExam?.banca || 'FGV'}
        targetRole={selectedExam?.title || studentProfile?.targetExamTitle || 'Carreiras Públicas / OAB'}
        warName={studentProfile?.warName || studentProfile?.name || 'Guerreiro(a)'}
        onRecordAttempt={handleRecordAttempt}
        onOpenMistakes={() => {
          setIsFlashChallengeOpen(false);
          setActiveTab('mistakes');
        }}
        onOpenPricing={() => {
          setIsFlashChallengeOpen(false);
          setIsPricingOpen(true);
        }}
      />

      {/* Programa de Indicação Viral Member-Get-Member (Pilar 1: Captação Ativa) */}
      <ReferralProgramModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        studentProfile={studentProfile}
        onRewardClaimed={(reward) => {
          showToast(`🎉 Recompensa liberada: ${reward}`);
        }}
      />

      {/* Botão Flutuante de Onboarding: Apenas para testes com flag explícita na URL (?dev=1) */}
      {typeof window !== 'undefined' && window.location.search.includes('dev=1') && (
        <div className="fixed top-20 right-4 sm:top-22 sm:right-6 z-[60] flex items-center gap-2">
          <button
            onClick={() => setIsOnboardingTerminalOpen(true)}
            className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-black text-xs tracking-wide shadow-xl shadow-blue-500/30 border border-white/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            title="Clique para testar e abrir o Onboarding do Usuário a qualquer momento"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Testar Onboarding</span>
            <span className="px-1.5 py-0.2 rounded bg-white/20 text-[9px] font-mono font-bold uppercase tracking-wider">
              DEV
            </span>
          </button>
        </div>
      )}


        </div>
      </div>
    </div>
  );
}
export const AprovaLensApp = ArgusApp;
export default ArgusApp;
