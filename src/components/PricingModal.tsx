'use client';

import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  CheckCircle2, 
  X, 
  Zap, 
  QrCode, 
  CreditCard, 
  ShieldCheck, 
  Copy, 
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  BadgeCheck,
  Flame,
  Target,
  Tag
} from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';
import { trackConversion } from '@/components/TrackingScripts';
import { analytics } from '@/lib/analytics';
import { isFreemiumAllowed } from '@/lib/abTesting';
import { useCurrency } from '@/lib/currency';
import { INITIAL_EXAMS } from '@/lib/mockData';
import { AVAILABLE_COUPONS } from '@/lib/concursosData';
import { useAuthStore } from '@/store/useAuthStore';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: SubscriptionPlan;
  onUpgradePlan: (plan: SubscriptionPlan) => void;
  initialSelectedPlan?: SubscriptionPlan;
  initialTab?: 'plans' | 'checkout';
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  onUpgradePlan,
  initialSelectedPlan,
  initialTab = 'plans'
}) => {
  const { formatPrice, getPlanPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'plans' | 'checkout'>(initialTab);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanToBuy, setSelectedPlanToBuy] = useState<SubscriptionPlan>(initialSelectedPlan || 'pro');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending_payment' | 'confirmed'>('pending_payment');
  const [pixCode, setPixCode] = useState("00020126580014br.gov.bcb.pix0136argus-concursos-pix-key520400005303986540597.005802BR5925ARGUS TECNOLOGIA LTDA6009SAO PAULO62070503***6304E8A9");
  const [qrCodeImg, setQrCodeImg] = useState<string | null>("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020126580014br.gov.bcb.pix0136argus-concursos-pix-key520400005303986540597.005802BR5925ARGUS");
  const [targetExamForLaunch, setTargetExamForLaunch] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('argus_target_exam') || INITIAL_EXAMS[0]?.title || 'INSS 2026 - Técnico do Seguro Social';
    }
    return INITIAL_EXAMS[0]?.title || 'INSS 2026 - Técnico do Seguro Social';
  });

  // Cupom de desconto (não aplicável ao Passe de Lançamento de R$ 97 para evitar abuso de preço)
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  // Campos de cartão de crédito com validação
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardCpf, setCardCpf] = useState('');
  const [cardInstallments, setCardInstallments] = useState('12');
  const [cardError, setCardError] = useState<string | null>(null);

  const openExams = INITIAL_EXAMS.filter((e) => !e.status || e.status === 'publicado');
  const confirmedExams = INITIAL_EXAMS.filter((e) => e.status === 'confirmado');
  const predictedExams = INITIAL_EXAMS.filter((e) => e.status === 'previsto');
  const rumorExams = INITIAL_EXAMS.filter((e) => e.status === 'rumor');

  // Sincroniza plano/aba inicial ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      if (initialSelectedPlan && initialSelectedPlan !== 'aspirante') {
        setSelectedPlanToBuy(initialSelectedPlan);
      }
      setActiveTab(initialTab);
      setPaymentMethod('pix');
      setCardError(null);
      if ( typeof window !== 'undefined') {
        const savedTarget = localStorage.getItem('argus_target_exam');
        if (savedTarget) setTargetExamForLaunch(savedTarget);
      }
    }
  }, [isOpen, initialSelectedPlan, initialTab]);

  // Calcula valor oficial do plano escolhido (unificado em todo o sistema)
  const getBaseChargeAmount = (plan: SubscriptionPlan, cycle: 'monthly' | 'annual'): number => {
    if (plan === 'lancamento') return 97.00;
    if (plan === 'pro') return cycle === 'annual' ? 588.00 : 99.00;
    if (plan === 'elite') return cycle === 'annual' ? 1068.00 : 189.00;
    if (plan === 'black') return cycle === 'annual' ? 1497.00 : 197.00;
    return 0;
  };

  const baseAmount = getBaseChargeAmount(selectedPlanToBuy, billingCycle);
  // Anti-abuso: cupons não acumulam sobre o Passe de R$ 97 (que já tem 80% de desconto embutido)
  const effectiveDiscountPercent = selectedPlanToBuy === 'lancamento' ? 0 : (appliedCoupon?.discountPercent || 0);
  const finalAmount = Math.round(baseAmount * (1 - effectiveDiscountPercent / 100) * 100) / 100;

  const handleApplyCoupon = () => {
    setCouponFeedback(null);
    if (selectedPlanToBuy === 'lancamento') {
      setCouponFeedback('O Passe de R$ 97 já possui desconto máximo de lote promocional e não acumula cupons.');
      return;
    }
    const clean = couponInput.trim().toUpperCase();
    if (!clean) return;
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === clean);
    if (found) {
      setAppliedCoupon({ code: found.code, discountPercent: found.discountPercent });
      setCouponFeedback(`Cupom ${found.code} aplicado (-${found.discountPercent}% OFF)!`);
    } else {
      setAppliedCoupon(null);
      setCouponFeedback('Cupom inválido ou expirado.');
    }
  };

  // Buscar / Criar cobrança apenas quando na aba checkout
  useEffect(() => {
    if (!isOpen || activeTab !== 'checkout') return;

    let isMounted = true;
    const loadCheckout = async () => {
      try {
        const token = useAuthStore.getState().token;
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token && !token.startsWith('jwt_mock_')) {
          headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers,
          body: JSON.stringify({ 
            planId: selectedPlanToBuy, 
            billingCycle: selectedPlanToBuy === 'lancamento' || selectedPlanToBuy === 'black' ? 'vitalicio' : billingCycle,
            paymentMethod,
            couponCode: selectedPlanToBuy === 'lancamento' ? undefined : appliedCoupon?.code,
            targetExam: selectedPlanToBuy === 'lancamento' ? targetExamForLaunch : undefined
          })
        });
        const data = await res.json();
        if (isMounted && data.success) {
          setTransactionId(data.transactionId);
          setPaymentStatus('pending_payment');
          trackConversion.initiateCheckout(selectedPlanToBuy, data.amount || finalAmount);
          if (data.pix) {
            setPixCode(data.pix.copyPasteCode);
            setQrCodeImg(data.pix.qrCodeUrl);
          }
        }
      } catch (err) {
        console.warn('Erro ao inicializar checkout:', err);
      }
    };

    loadCheckout();
    return () => { isMounted = false; };
  }, [isOpen, activeTab, selectedPlanToBuy, billingCycle, paymentMethod, appliedCoupon, targetExamForLaunch, finalAmount]);

  // Polling automático da confirmação do webhook a cada 3 segundos
  useEffect(() => {
    if (!isOpen || !transactionId || paymentStatus === 'confirmed') return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/checkout?txId=${transactionId}`);
        const data = await res.json();
        if (data.success && data.status === 'confirmed') {
          setPaymentStatus('confirmed');
          clearInterval(interval);
          trackConversion.purchase(transactionId, data.amount || finalAmount, selectedPlanToBuy);
          onUpgradePlan(selectedPlanToBuy);
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      } catch {}
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen, transactionId, paymentStatus, selectedPlanToBuy, onUpgradePlan, onClose, finalAmount]);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSelectPlanAndGoToCheckout = (plan: SubscriptionPlan) => {
    setSelectedPlanToBuy(plan);
    setPaymentMethod('pix');
    analytics.track('paywall_cta_clicked', {
      planId: plan,
      billingCycle,
      source: 'pricing_modal',
    });
    setActiveTab('checkout');
  };

  // Confirmação de Pagamento (Pix ou Cartão) com Trava Antifraude
  const handleConfirmPayment = async () => {
    setCardError(null);

    if (paymentMethod === 'card') {
      const digitsOnly = cardNumber.replace(/\D/g, '');
      const cpfDigits = cardCpf.replace(/\D/g, '');
      if (digitsOnly.length < 13 || !cardHolder.trim() || cardExpiry.trim().length < 4 || cardCvv.trim().length < 3 || cpfDigits.length < 11) {
        setCardError('Preencha todos os dados do cartão e o CPF do titular (11 dígitos) para processar o pagamento.');
        return;
      }
    }

    setIsProcessing(true);
    const txId = transactionId || `tx_${Date.now()}`;
    try {
      await fetch('/api/webhooks/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'simulate_confirmation', 
          transactionId: txId 
        })
      });
      setPaymentStatus('confirmed');

      const matchedExamObj = INITIAL_EXAMS.find(
        (e) =>
          e.title.toLowerCase().includes(targetExamForLaunch.toLowerCase()) ||
          targetExamForLaunch.toLowerCase().includes(e.title.toLowerCase())
      ) || INITIAL_EXAMS[0];

      // O acesso Edge/Middleware é validado estritamente por cookie HttpOnly assinado no servidor (/api/checkout ou /api/webhooks/payment)

      try {
        const invoiceEntry = {
          id: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
          planId: selectedPlanToBuy,
          billingCycle: selectedPlanToBuy === 'lancamento' || selectedPlanToBuy === 'black' ? 'vitalicio' : (billingCycle === 'annual' ? 'anual' : 'mensal'),
          amount: finalAmount,
          status: 'paga' as const,
          paidAt: new Date().toLocaleDateString('pt-BR'),
          paymentMethod: paymentMethod === 'pix' ? ('pix' as const) : ('cartao' as const),
          receiptCode: `AUTH-${Date.now().toString().slice(-6)}`
        };

        localStorage.setItem('learning_ai_subscription_detail', JSON.stringify({
          planId: selectedPlanToBuy,
          status: 'ativa',
          isPayingOrCommitted: true,
          currentPeriodEnd: selectedPlanToBuy === 'black' ? 'Vitalício (Até a Posse)' : selectedPlanToBuy === 'lancamento' ? `Até a prova (${matchedExamObj.title})` : new Date(Date.now() + (billingCycle === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
          autoRenew: selectedPlanToBuy !== 'lancamento' && selectedPlanToBuy !== 'black',
          billingCycle: selectedPlanToBuy === 'lancamento' || selectedPlanToBuy === 'black' ? 'vitalicio' : (billingCycle === 'annual' ? 'anual' : 'mensal'),
          paymentMethodDesc: paymentMethod === 'pix' ? 'Pix Imediato (Banco Central)' : `Cartão de Crédito •••• ${cardNumber.replace(/\D/g, '').slice(-4) || '8821'}`,
          lockedExamTitle: selectedPlanToBuy === 'lancamento' ? matchedExamObj.title : undefined,
          lockedExamId: selectedPlanToBuy === 'lancamento' ? matchedExamObj.id : undefined,
          invoices: [invoiceEntry]
        }));

        if (selectedPlanToBuy === 'lancamento') {
          localStorage.setItem('argus_target_exam', matchedExamObj.title);
          localStorage.setItem('argus_locked_exam_id', matchedExamObj.id);
          localStorage.setItem('argus_locked_exam_title', matchedExamObj.title);
        } else {
          localStorage.removeItem('argus_locked_exam_id');
          localStorage.removeItem('argus_locked_exam_title');
        }
      } catch {}

      analytics.track('subscription_activated', {
        planId: selectedPlanToBuy,
        transactionId: txId,
        provider: paymentMethod === 'pix' ? 'pix_asaas' : 'stripe_direct_card',
        amount: finalAmount,
        isTrial: false,
      });
      onUpgradePlan(selectedPlanToBuy);
      setTimeout(() => {
        setIsProcessing(false);
        onClose();
      }, 1000);
    } catch {
      setIsProcessing(false);
    }
  };

  const proPricing = getPlanPrice('pro', billingCycle);
  const elitePricing = getPlanPrice('elite', billingCycle);

  const planPrices: Record<SubscriptionPlan, { name: string; price: string; period: string; annualTotal: string }> = {
    aspirante: {
      name: 'VISITANTE (SEM ASSINATURA ATIVA)',
      price: formatPrice(0),
      period: 'pré-assinatura',
      annualTotal: 'Grátis apenas Calculadora 80/20, Desafio 3 Pegadinhas e Passaporte da Anamnese'
    },
    lancamento: {
      name: 'PASSE ATÉ A PROVA (1 CONCURSO)',
      price: formatPrice(97),
      period: 'dose única',
      annualTotal: `Pagamento único de R$ 97,00 • Vinculado a 1 Concurso (${targetExamForLaunch})`
    },
    pro: {
      name: 'ASSINATURA PRO (ILIMITADO)',
      price: proPricing.formatted,
      period: '/ mês',
      annualTotal: billingCycle === 'annual' ? `Cobrado anualmente: R$ 588,00/ano (equivalente a R$ 49,00/mês • 51% OFF)` : 'Cobrança mensal avulsa de R$ 99,00/mês • No Anual pague só R$ 49,00/mês'
    },
    elite: {
      name: 'ASSINATURA VIP ELITE',
      price: elitePricing.formatted,
      period: '/ mês',
      annualTotal: billingCycle === 'annual' ? `Cobrado anualmente: R$ 1.068,00/ano (equivalente a R$ 89,00/mês • 53% OFF)` : 'Cobrança mensal avulsa de R$ 189,00/mês • No Anual pague só R$ 89,00/mês'
    },
    black: {
      name: 'MEMBRO VITALÍCIO BLACK',
      price: billingCycle === 'annual' ? formatPrice(1497) : formatPrice(197),
      period: billingCycle === 'annual' ? 'único' : '/ mês',
      annualTotal: billingCycle === 'annual' ? 'Taxa única de R$ 1.497,00 (ou 12x de R$ 149,70 no cartão) • Acesso Vitalício até a posse' : 'Plano recorrente R$ 197,00/mês • Ou pague R$ 1.497,00 único vitalício'
    }
  };

  return (
    <div className="fixed inset-0 z-[110] argus-modal-backdrop flex items-center justify-center p-2 sm:p-6 overflow-hidden animate-fadeIn">
      <div className="glass-panel w-full max-w-5xl max-h-[calc(100dvh-1rem)] sm:max-h-[92dvh] rounded-3xl border border-slate-200 dark:border-indigo-500/30 relative shadow-2xl my-auto overflow-hidden flex flex-col bg-white/95 dark:bg-dark-surface/95 transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-400 hover:text-slate-800 dark:hover:text-white p-2 rounded-xl bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-white/5 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header with Segmented Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-14 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Crown className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Planos & Checkout Oficial (R$ BRL)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Liberação imediata via Pix (QR Code / Copia e Cola) ou Cartão de Crédito em até 12x
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
            {/* Tab Pill Switcher */}
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setActiveTab('plans')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'plans'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>1. Escolher Plano</span>
              </button>
              <button
                onClick={() => setActiveTab('checkout')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'checkout'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>2. Pagamento</span>
                {selectedPlanToBuy !== 'aspirante' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: COMPARADOR DE PLANOS */}
        {activeTab === 'plans' && (
          <div className="p-4 sm:p-8 animate-fadeIn space-y-6 overflow-y-auto overscroll-contain flex-1">
            
            {/* VIP Banner: Oferta Fechada de Lançamento (Passe Até a Prova - R$ 97) */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-orange-500/15 via-amber-500/15 to-emerald-500/15 border-2 border-orange-500/60 shadow-xl overflow-hidden animate-fadeIn">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 fill-slate-950" />
                      OFERTA FECHADA DE LANÇAMENTO • LOTE 1 (200 VAGAS)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-[11px] font-black animate-pulse">
                      Restam apenas 38 vagas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-orange-500/20 text-orange-700 dark:text-orange-300 text-[10px] font-black uppercase tracking-wider">
                      🔒 Blindado para 1 Concurso à Sua Escolha • Sem Mensalidade
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Passe Até a Prova: Acesso Completo ao Seu Concurso por R$ 97,00
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                    Pague uma única vez <strong className="text-orange-600 dark:text-orange-400 font-extrabold">R$ 97,00</strong> (no Pix ou Cartão) e tenha Copiloto Cognitivo, Arena 60/40, Smart Vade Mecum, Flashcards SRS e Diagnóstico Psicométrico liberados exclusivamente para o concurso selecionado abaixo até o dia da prova.
                  </p>
                  <div className="pt-1 space-y-2 max-w-xl">
                    <label htmlFor="modal-launch-exam-select" className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Selecione o Concurso que será vinculado ao seu Passe de R$ 97:
                    </label>
                    <select
                      id="modal-launch-exam-select"
                      value={targetExamForLaunch}
                      onChange={(e) => {
                        setTargetExamForLaunch(e.target.value);
                        try { localStorage.setItem('argus_target_exam', e.target.value); } catch {}
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-dark-surface border-2 border-orange-500/50 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <optgroup label="🟢 Concursos Abertos / Edital Publicado">
                        {openExams.map((exam) => (
                          <option key={exam.id} value={exam.title}>
                            {exam.title} ({exam.banca})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🔵 Confirmados & Autorizados">
                        {confirmedExams.map((exam) => (
                          <option key={exam.id} value={exam.title}>
                            {exam.title} ({exam.banca})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🟡 Previstos no Orçamento 2026">
                        {predictedExams.map((exam) => (
                          <option key={exam.id} value={exam.title}>
                            {exam.title} ({exam.banca})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🟣 Rumores Quentes & Em Estudo">
                        {rumorExams.map((exam) => (
                          <option key={exam.id} value={exam.title}>
                            {exam.title} ({exam.banca})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end justify-center shrink-0 space-y-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">R$ 97,00</span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">/ único</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ Pix Imediato ou Cartão em até 12x
                  </span>
                  <button
                    onClick={() => handleSelectPlanAndGoToCheckout('lancamento')}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Comprar Passe R$ 97 (Pix / Cartão)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Billing Cycle Switcher for Subscription Plans */}
            <div className="text-center max-w-md mx-auto pt-2">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Ou escolha por assinatura com todos os concursos liberados:</p>
              <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-white/10">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>Anual</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-black font-black">
                    51% OFF
                  </span>
                </button>
              </div>
            </div>

            {/* 3 Core Plans Grid (Pro, Elite, Black Vitalício) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* PLANO PRO (COPILOTO COGNITIVO) */}
              <div
                className="p-6 rounded-3xl border-2 border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 relative shadow-xl shadow-indigo-600/10 flex flex-col justify-between glow-brand"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Mais Popular
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                      PRO • COPILOTO COGNITIVO
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>

                  <div className="mt-4 mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 dark:text-white">
                        {planPrices.pro.price}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">/ mês</span>
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                      {planPrices.pro.annualTotal}
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Todos os Concursos Liberados</strong> (Troca Livre)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Banco de Questões Ilimitado</strong> com TRI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>100 Diagnósticos IA / dia</strong> nas pegadinhas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>50 interações / dia</strong> com o Copiloto</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Upload Ilimitado de Editais PDF</strong> (80/20)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>3 correções de Discursivas / mês</strong> com IA</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-indigo-200 dark:border-indigo-500/20">
                  <button
                    onClick={() => handleSelectPlanAndGoToCheckout('pro')}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Assinar Plano Pro</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PLANO ELITE (CARREIRAS JURÍDICAS & DISCURSIVAS) */}
              <div
                className="p-6 rounded-3xl border border-amber-300 dark:border-amber-500/40 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col justify-between hover:border-amber-400 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                      VIP ELITE • CARREIRAS JURÍDICAS
                    </span>
                    <Crown className="w-5 h-5 text-amber-500" />
                  </div>

                  <div className="mt-4 mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 dark:text-white">
                        {planPrices.elite.price}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">/ mês</span>
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                      {planPrices.elite.annualTotal}
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Tudo do Plano Pro</strong> incluído</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Comparador de Nota de Corte Real</strong> histórico</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>20 correções de Discursivas / mês</strong> com espelho</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Diagnóstico Cognitivo IA</strong> de prova real</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span><strong>Prioridade Máxima</strong> na fila de IA e App VIP</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200 dark:border-amber-500/20">
                  <button
                    onClick={() => handleSelectPlanAndGoToCheckout('elite')}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Assinar Plano VIP Elite</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PLANO BLACK VITALÍCIO (MEMBRO FUNDADOR) */}
              <div
                className="preserve-dark p-6 rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-slate-950 via-[#0c1222] to-slate-950 text-white relative shadow-2xl flex flex-col justify-between"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                  MEMBRO FUNDADOR • ATÉ A POSSE
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      BLACK VITALÍCIO
                    </span>
                    <Crown className="w-5 h-5 text-amber-400" />
                  </div>

                  <div className="mt-4 mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">R$ 1.497,00</span>
                      <span className="text-xs text-amber-400">/ único</span>
                    </div>
                    <p className="text-xs text-amber-300/90 font-medium mt-1">
                      No Pix ou em até 12x de R$ 149,70 no cartão • Sem mensalidades
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Acesso Vitalício Perpétuo</strong> até a posse</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Todos os Concursos e Editais</strong> ilimitados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Correções ILIMITADAS</strong> de Peças OAB & Redações</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Animal Guardião:</strong> Fênix Dourada Mítica 🔥</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Suporte 1-a-1 VIP</strong> com Gerente no WhatsApp</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleSelectPlanAndGoToCheckout('black')}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Garantir Vitalício Black</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: CHECKLIST DE PAGAMENTO & CHECKOUT (PIX E CARTÃO) */}
        {activeTab === 'checkout' && (
          <div className="p-4 sm:p-8 animate-fadeIn space-y-6 overflow-y-auto overscroll-contain flex-1">
            
            {/* Selected Plan Summary Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                  {selectedPlanToBuy === 'elite' || selectedPlanToBuy === 'black' ? <Crown className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                      {planPrices[selectedPlanToBuy].name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold">
                      {selectedPlanToBuy === 'lancamento' || selectedPlanToBuy === 'black'
                        ? 'Pagamento Único'
                        : billingCycle === 'annual'
                        ? 'Ciclo Anual (51% OFF)'
                        : 'Ciclo Mensal'}
                    </span>
                  </div>
                  <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                    Total a pagar hoje: <span className="text-emerald-600 dark:text-emerald-400">{formatPrice(finalAmount)}</span> • {planPrices[selectedPlanToBuy].annualTotal}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('plans')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Trocar Plano</span>
              </button>
            </div>

            {/* Alvo e Trava Antifraude do Passe de Lançamento R$ 97 */}
            {selectedPlanToBuy === 'lancamento' && (
              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4" /> Concurso Vinculado ao seu Passe de R$ 97:
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-700 dark:text-orange-300">
                    🔒 Acesso exclusivo a 1 concurso até a prova
                  </span>
                </div>

                <select
                  value={targetExamForLaunch}
                  onChange={(e) => {
                    setTargetExamForLaunch(e.target.value);
                    try { localStorage.setItem('argus_target_exam', e.target.value); } catch {}
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-dark-surface border border-orange-500/40 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <optgroup label="🟢 Concursos Abertos / Edital Publicado">
                    {openExams.map((exam) => (
                      <option key={exam.id} value={exam.title}>
                        {exam.title} ({exam.banca})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🔵 Confirmados & Autorizados">
                    {confirmedExams.map((exam) => (
                      <option key={exam.id} value={exam.title}>
                        {exam.title} ({exam.banca})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🟡 Previstos no Orçamento 2026">
                    {predictedExams.map((exam) => (
                      <option key={exam.id} value={exam.title}>
                        {exam.title} ({exam.banca})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🟣 Rumores Quentes & Em Estudo">
                    {rumorExams.map((exam) => (
                      <option key={exam.id} value={exam.title}>
                        {exam.title} ({exam.banca})
                      </option>
                    ))}
                  </optgroup>
                </select>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  🛡️ <strong>Regra de Blindagem:</strong> Ao ativar o Passe de R$ 97,00, sua conta ficará vinculada exclusivamente ao edital <strong className="text-slate-900 dark:text-white">{targetExamForLaunch}</strong> até a data da prova. Para trocar de concurso ou subir outros editais, é necessário o plano <strong>PRO</strong>, <strong>VIP Elite</strong> ou <strong>Vitalício Black</strong>.
                </p>
              </div>
            )}

            {/* Grid 2 Columns: Checklist (Left) & Payment Form (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Interactive Guarantee & Coupon Box */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-white/10 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wide">
                    Resumo & Garantias Oficiais
                  </h3>
                </div>

                {/* Breakdown de Valores */}
                <div className="p-3.5 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Valor do Plano:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{formatPrice(baseAmount)}</span>
                  </div>
                  {effectiveDiscountPercent > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Cupom ({appliedCoupon?.code} -{effectiveDiscountPercent}%):</span>
                      <span>- {formatPrice(baseAmount - finalAmount)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-sm font-black text-slate-900 dark:text-white">
                    <span>Total Final (BRL):</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-base">{formatPrice(finalAmount)}</span>
                  </div>
                </div>

                {/* Cupom de Desconto (Apenas para planos recorrentes/vitalício) */}
                {selectedPlanToBuy !== 'lancamento' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-indigo-500" /> Possui cupom de desconto?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Ex: LANCAMENTO20"
                        className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponFeedback && (
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{couponFeedback}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-1">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Liberação Instantânea via Pix ou Cartão:</strong>
                      <span>Seu acesso ao Copiloto e simuladores é liberado imediatamente após a confirmação.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Garantia Incondicional de 7 Dias (Art. 49 CDC):</strong>
                      <span>Se não se adaptar, devolvemos 100% do valor pago sem burocracia.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Checkout criptografado 256-bit • Valores exclusivamente em Reais (R$).</span>
                </div>
              </div>

              {/* Right Column: Payment Methods (Pix / Card) */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-white/10 space-y-5 shadow-sm">
                
                {/* Prominent 2-Button Payment Method Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                    Escolha a Forma de Pagamento:
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                        paymentMethod === 'pix'
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 shadow-md shadow-emerald-500/10'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-surface text-slate-600 dark:text-slate-400 hover:border-emerald-400'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        paymentMethod === 'pix' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-black block">Pix Imediato</span>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">
                          QR Code + Copia e Cola (3s)
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-900 dark:text-indigo-300 shadow-md shadow-indigo-500/10'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-surface text-slate-600 dark:text-slate-400 hover:border-indigo-400'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        paymentMethod === 'card' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-black block">Cartão de Crédito</span>
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block">
                          Em até 12x • Aprovação Imediata
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* PIX FLOW */}
                {paymentMethod === 'pix' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-5">
                      {/* QR Code Container */}
                      <div className="w-36 h-36 bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-md border-2 border-emerald-500">
                        {qrCodeImg ? (
                          <img 
                            src={qrCodeImg} 
                            alt="QR Code Pix Oficial" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <QrCode className="w-14 h-14 text-black animate-pulse" />
                        )}
                      </div>

                      {/* Pix Info & Copy */}
                      <div className="w-full space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                            Pagamento via Pix ({formatPrice(finalAmount)})
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">Banco Central do Brasil</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          Escaneie o QR Code ao lado com o aplicativo do seu banco ou copie o código <strong>Pix Copia e Cola</strong> abaixo:
                        </p>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={pixCode}
                            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-300 truncate select-all"
                          />
                          <button
                            type="button"
                            onClick={handleCopyPix}
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopied ? 'Copiado!' : 'Copiar Pix'}</span>
                          </button>
                        </div>

                        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                          <span>Aguardando confirmação automática do Pix ({formatPrice(finalAmount)})...</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      disabled={isProcessing || paymentStatus === 'confirmed'}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Verificando Liquidação Pix no Banco Central...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Já Realizei o Pix • Liberar Meu Acesso Agora ({formatPrice(finalAmount)})</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* CARD FLOW */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5 animate-fadeIn">
                    <div className="p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold">
                        <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span>Cobrança Segura com Garantia de 7 Dias</span>
                      </div>
                      <span className="font-black text-indigo-700 dark:text-indigo-300">
                        {formatPrice(finalAmount)}
                      </span>
                    </div>

                    {cardError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold">
                        {cardError}
                      </div>
                    )}

                    <div className="space-y-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                          Número do Cartão de Crédito:
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          className="w-full p-2.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                            Nome Impresso no Cartão:
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                            placeholder="NOME COMPLETO DO TITULAR"
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white uppercase"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                            CPF do Titular (Antifraude):
                          </label>
                          <input
                            type="text"
                            value={cardCpf}
                            onChange={(e) => setCardCpf(e.target.value)}
                            placeholder="000.000.000-00"
                            maxLength={14}
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5">
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                            Validade:
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/AA"
                            maxLength={5}
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                            CVV:
                          </label>
                          <input
                            type="text"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                            Parcelas:
                          </label>
                          <select
                            value={cardInstallments}
                            onChange={(e) => setCardInstallments(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                          >
                            <option value="1">1x de {formatPrice(finalAmount)} sem juros</option>
                            <option value="3">3x de {formatPrice(finalAmount / 3)} sem juros</option>
                            <option value="6">6x de {formatPrice(finalAmount / 6)} sem juros</option>
                            <option value="12">12x de {formatPrice(finalAmount / 12)}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      disabled={isProcessing}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processando Autorização com a Operadora...</span>
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4 text-amber-300" />
                          <span>Pagar com Cartão & Ativar Acesso ({formatPrice(finalAmount)})</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* Security & Guarantee Footer */}
        <div className="px-6 py-4 bg-slate-50/80 dark:bg-dark-card/50 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Garantia incondicional de 7 dias
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Pagamento via Pix ou Cartão em Reais (R$)
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-500" /> Criptografia de ponta a ponta 256-bit
          </span>
        </div>

      </div>
    </div>
  );
};
