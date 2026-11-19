'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';
import {
  ExamNotice,
  QuestionAttempt,
  UserMetrics,
  SubscriptionPlan,
  StudentProfile,
} from '@/lib/types';
import { ScrollToTop } from '@/components/ScrollToTop';
import { FloatingContactSupport } from '@/components/FloatingContactSupport';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';
import { SplashScreen } from '@/components/SplashScreen';
import { GoogleAdSense } from '@/components/GoogleAdSense';
import { useAuthStore } from '@/store/useAuthStore';
import { getSyncUserId } from '@/lib/authIdentity';
import { SupabaseService } from '@/lib/supabaseService';
import { isFreemiumAllowed } from '@/lib/abTesting';

const PricingModal = dynamic(
  () => import('@/components/PricingModal').then((m) => m.PricingModal),
  { ssr: false }
);
const AICopilotDrawer = dynamic(
  () => import('@/components/AICopilotDrawer').then((m) => m.AICopilotDrawer),
  { ssr: false }
);
const StudentProfileModal = dynamic(
  () => import('@/components/StudentProfileModal').then((m) => m.StudentProfileModal),
  { ssr: false }
);
const AuthModal = dynamic(
  () => import('@/components/AuthModal').then((m) => m.AuthModal),
  { ssr: false }
);
const UserOnboardingModal = dynamic(
  () => import('@/components/UserOnboardingModal').then((m) => m.UserOnboardingModal),
  { ssr: false }
);
const SeanEllisSurveyModal = dynamic(
  () => import('@/components/SeanEllisSurveyModal').then((m) => m.SeanEllisSurveyModal),
  { ssr: false }
);
const MobileAppModal = dynamic(
  () => import('@/components/MobileAppModal').then((m) => m.MobileAppModal),
  { ssr: false }
);
const FlashChallengeModal = dynamic(
  () => import('@/components/FlashChallengeModal').then((m) => m.FlashChallengeModal),
  { ssr: false }
);
const ReferralProgramModal = dynamic(
  () => import('@/components/ReferralProgramModal').then((m) => m.ReferralProgramModal),
  { ssr: false }
);
const AdminQuestionIngestModal = dynamic(
  () => import('@/components/AdminQuestionIngestModal').then((m) => m.AdminQuestionIngestModal),
  { ssr: false }
);

interface ArgusGlobalModalsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleNavigateWithHistory: (tab: string) => void;
  theme: 'dark' | 'light';
  plan: SubscriptionPlan;
  metrics: UserMetrics;
  selectedExam: ExamNotice;
  exams: ExamNotice[];
  pendingMistakesCount: number;
  studentProfile: StudentProfile;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  handleSaveProfile: (profile: StudentProfile) => void;
  handleSetDefaultExam: (exam: ExamNotice) => void;
  handleRecordAttempt: (attempt: QuestionAttempt) => void;
  handleOpenPricing: () => void;
  handleUpgradePlan: (newPlan: SubscriptionPlan, openWelcome?: boolean) => void;
  showToast: (msg: string) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isPricingOpen: boolean;
  setIsPricingOpen: (open: boolean) => void;
  pendingCheckoutPlan: SubscriptionPlan;
  setPendingCheckoutPlan: (plan: SubscriptionPlan) => void;
  pricingModalInitialTab: 'plans' | 'checkout';
  setPricingModalInitialTab: (tab: 'plans' | 'checkout') => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isMobileModalOpen: boolean;
  setIsMobileModalOpen: (open: boolean) => void;
  isAdminIngestOpen: boolean;
  setIsAdminIngestOpen: (open: boolean) => void;
  isOnboardingTerminalOpen: boolean;
  setIsOnboardingTerminalOpen: (open: boolean) => void;
  isSeanEllisSurveyOpen: boolean;
  setIsSeanEllisSurveyOpen: (open: boolean) => void;
  isFlashChallengeOpen: boolean;
  setIsFlashChallengeOpen: (open: boolean) => void;
  isReferralModalOpen: boolean;
  setIsReferralModalOpen: (open: boolean) => void;
  isSplashDone: boolean;
  handleSplashFinish: () => void;
  hasLgpdConsent: boolean;
  handleLgpdConsentGiven: () => void;
}

export const ArgusGlobalModals: React.FC<ArgusGlobalModalsProps> = ({
  activeTab,
  setActiveTab,
  handleNavigateWithHistory,
  theme,
  plan,
  metrics,
  selectedExam,
  exams,
  pendingMistakesCount,
  studentProfile,
  setStudentProfile,
  handleSaveProfile,
  handleSetDefaultExam,
  handleRecordAttempt,
  handleOpenPricing,
  handleUpgradePlan,
  showToast,
  isCopilotOpen,
  setIsCopilotOpen,
  isPricingOpen,
  setIsPricingOpen,
  pendingCheckoutPlan,
  setPendingCheckoutPlan,
  pricingModalInitialTab,
  setPricingModalInitialTab,
  isProfileModalOpen,
  setIsProfileModalOpen,
  isAuthModalOpen,
  setIsAuthModalOpen,
  isMobileModalOpen,
  setIsMobileModalOpen,
  isAdminIngestOpen,
  setIsAdminIngestOpen,
  isOnboardingTerminalOpen,
  setIsOnboardingTerminalOpen,
  isSeanEllisSurveyOpen,
  setIsSeanEllisSurveyOpen,
  isFlashChallengeOpen,
  setIsFlashChallengeOpen,
  isReferralModalOpen,
  setIsReferralModalOpen,
  isSplashDone,
  handleSplashFinish,
  hasLgpdConsent,
  handleLgpdConsentGiven,
}) => {
  return (
    <>
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        metrics={metrics}
        selectedExam={selectedExam}
        pendingMistakesCount={pendingMistakesCount}
        profile={studentProfile}
        onNavigateTab={(tab) => handleNavigateWithHistory(tab)}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        currentPlan={plan}
        initialSelectedPlan={pendingCheckoutPlan}
        initialTab={pricingModalInitialTab}
        onUpgradePlan={handleUpgradePlan}
      />

      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={studentProfile}
        onSaveProfile={handleSaveProfile}
        userPlan={plan}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <MobileAppModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
      />

      <AdminQuestionIngestModal
        isOpen={isAdminIngestOpen}
        onClose={() => setIsAdminIngestOpen(false)}
        onQuestionsIngested={(newQuestions) => {
          showToast(`🚀 ${newQuestions.length} questões auditadas carregadas com sucesso!`);
        }}
      />

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
            updatedAt: new Date().toISOString(),
          };
          setStudentProfile(newProfile);
          try {
            localStorage.setItem('argus_student_profile', JSON.stringify(newProfile));
            localStorage.setItem('argus_onboarding_completed', 'true');
          } catch {}

          try {
            useAuthStore.getState().updateProfile(newProfile);
          } catch {}

          try {
            const syncUserId = getSyncUserId();
            if (syncUserId) {
              SupabaseService.syncStudentProfile(syncUserId, newProfile);
            }
          } catch {}

          if (partialProfile.targetExamTitle) {
            const matchedExam = exams.find(
              (e) =>
                e.title.toLowerCase().includes((partialProfile.targetExamTitle || '').toLowerCase()) ||
                (partialProfile.targetExamTitle || '').toLowerCase().includes(e.title.toLowerCase())
            );
            if (matchedExam) {
              handleSetDefaultExam(matchedExam);
            }
          }

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
            showToast(
              `🎯 Diagnóstico concluído! Sua primeira bateria personalizada de ${
                partialProfile.targetExamTitle || 'questões'
              } está pronta.`
            );
          }
        }}
      />

      <SeanEllisSurveyModal
        isOpen={isSeanEllisSurveyOpen}
        onClose={() => setIsSeanEllisSurveyOpen(false)}
        onSubmitted={() => {
          showToast('❤️ Muito obrigado por ajudar a calibrar o Argus!');
        }}
      />

      {!isSplashDone && <SplashScreen onFinish={handleSplashFinish} />}

      <CookieConsentBanner
        canShow={isSplashDone && !hasLgpdConsent}
        onConsentGiven={handleLgpdConsentGiven}
      />

      <GoogleAdSense currentPlan={plan} />

      <ScrollToTop />

      <FloatingContactSupport
        currentTab={activeTab}
        targetExam={selectedExam?.title || studentProfile?.targetExamTitle || 'Concurso Público'}
        studentName={studentProfile?.warName || studentProfile?.name || 'Estudante'}
        theme={theme}
        isPayingOrCommitted={plan !== 'aspirante'}
      />

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

      <ReferralProgramModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        studentProfile={studentProfile}
        onRewardClaimed={(reward) => {
          showToast(`🎉 Recompensa liberada: ${reward}`);
        }}
      />

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
    </>
  );
};
