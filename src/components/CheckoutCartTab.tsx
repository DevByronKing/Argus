'use client';

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Lock, 
  Check, 
  Copy, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Zap, 
  Crown, 
  AlertCircle, 
  CheckCircle2, 
  ShoppingBag,
  Gift,
  Flame,
  UserCheck,
  Mail,
  Phone,
  FileText,
  Shield
} from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';
import { AVAILABLE_COUPONS } from '@/lib/concursosData';
import { INITIAL_EXAMS } from '@/lib/mockData';
import { trackConversion } from '@/components/TrackingScripts';
import { useAuthStore } from '@/store/useAuthStore';
import { GoogleIcon } from './GoogleSignInButton';
import { CheckoutPaymentSection } from './checkout/CheckoutPaymentSection';
import { CheckoutOrderSummary } from './checkout/CheckoutOrderSummary';

interface CheckoutCartTabProps {
  initialPlan?: SubscriptionPlan;
  onPaymentSuccess: (plan: SubscriptionPlan) => void;
  onGoBack?: () => void;
  showToast: (msg: string) => void;
}

export const CheckoutCartTab: React.FC<CheckoutCartTabProps> = ({
  initialPlan = 'pro',
  onPaymentSuccess,
  onGoBack,
  showToast
}) => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(initialPlan === 'aspirante' ? 'pro' : initialPlan);
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'trimestral' | 'anual' | 'vitalicio'>(
    initialPlan === 'black' ? 'vitalicio' : 'anual'
  );
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix');
  const [targetExam, setTargetExam] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('argus_target_exam');
      if (saved && INITIAL_EXAMS.some((e) => e.title === saved)) return saved;
    }
    return INITIAL_EXAMS[0]?.title || 'INSS - Técnico do Seguro Social';
  });

  const groupedExams = React.useMemo(() => ({
    publicado: INITIAL_EXAMS.filter((e) => e.status === 'publicado'),
    confirmado: INITIAL_EXAMS.filter((e) => e.status === 'confirmado'),
    previsto: INITIAL_EXAMS.filter((e) => e.status === 'previsto' || !e.status),
    rumor: INITIAL_EXAMS.filter((e) => e.status === 'rumor'),
  }), []);
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Pix State
  const [pixCopied, setPixCopied] = useState(false);
  const [pixTimeRemaining, setPixTimeRemaining] = useState(900); // 15 minutos

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState(1);

  // Customer Identification State
  const { user } = useAuthStore();
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerCpf, setCustomerCpf] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerError, setCustomerError] = useState<string | null>(null);

  const formatCpf = (val: string) => {
    return val
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatPhone = (val: string) => {
    return val
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d{4})$/, '$1-$2');
  };

  // Status
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  // Preços Base Reposicionados
  const baseMonthlyPrices: Record<'pro' | 'elite' | 'black' | 'lancamento', number> = {
    pro: 99.00,
    elite: 189.00,
    black: 249.00,
    lancamento: 97.00
  };

  const planName = 
    selectedPlan === 'lancamento' ? 'Oferta Fechada: Passe Até a Prova (200 Vagas)' :
    selectedPlan === 'black' ? 'Plano BLACK VITALÍCIO (Até a Posse)' :
    selectedPlan === 'elite' ? 'Plano ELITE VIP' : 'Plano PRO';

  // Cálculos de Ciclo e Pacotes
  let rawTotal = 0;
  let cycleDiscountPercent = 0;
  let cycleDiscountValue = 0;

  if (selectedPlan === 'lancamento') {
    rawTotal = 97.00;
    cycleDiscountPercent = 0;
    cycleDiscountValue = 0;
  } else if (selectedPlan === 'black') {
    if (billingCycle === 'vitalicio') {
      rawTotal = 1497.00;
      cycleDiscountPercent = 0;
      cycleDiscountValue = 0;
    } else {
      rawTotal = 197.00;
      cycleDiscountPercent = 0;
      cycleDiscountValue = 0;
    }
  } else {
    const basePrice = baseMonthlyPrices[selectedPlan as 'pro' | 'elite'] || 99.00;
    if (billingCycle === 'trimestral') {
      rawTotal = basePrice * 3;
      cycleDiscountPercent = 15; // 15% OFF
      cycleDiscountValue = rawTotal * 0.15;
    } else if (billingCycle === 'anual') {
      // PRO: R$ 39,90/mês (R$ 478,80/ano) | ELITE: R$ 89,90/mês (R$ 1.078,80/ano)
      rawTotal = basePrice * 12;
      const targetAnual = selectedPlan === 'elite' ? 1068.00 : 588.00;
      cycleDiscountValue = rawTotal - targetAnual;
      cycleDiscountPercent = Math.round((cycleDiscountValue / rawTotal) * 100);
    } else {
      rawTotal = basePrice;
      cycleDiscountPercent = 0;
      cycleDiscountValue = 0;
    }
  }

  const totalAfterCycle = rawTotal - cycleDiscountValue;
  const couponDiscountValue = appliedCoupon ? totalAfterCycle * (appliedCoupon.percent / 100) : 0;
  const finalPrice = Math.max(0, totalAfterCycle - couponDiscountValue);

  // Pix Code Real via Asaas ou Bacen EMVCo
  const [realPixCode, setRealPixCode] = useState<string>('');
  const [realQrCodeImg, setRealQrCodeImg] = useState<string | null>(null);
  const [pixTransactionId, setPixTransactionId] = useState<string>('');
  const [paymentPendingNotice, setPaymentPendingNotice] = useState<string | null>(null);
  const [isLoadingPix, setIsLoadingPix] = useState(false);

  // Pix Code Simulado de contingência
  const fallbackPixCode = `00020126580014br.gov.bcb.pix0136argus-pagamentos-asaas-2026520400005303986540${finalPrice.toFixed(2).replace('.', '')}5802BR5920ARGUS SAAS LTDA6009SAO PAULO62070503***6304E8A9`;
  const pixCode = realPixCode || fallbackPixCode;

  // Carregar Cobrança Pix Real via Asaas (com debounce e validação de CPF/e-mail para evitar spam de cobranças)
  useEffect(() => {
    if (paymentMethod !== 'pix') return;
    const cpfDigits = customerCpf.replace(/\D/g, '');
    const emailClean = (customerEmail || '').trim();
    if (cpfDigits.length < 11 || !emailClean.includes('@')) {
      return;
    }

    let isMounted = true;
    const debounceTimer = setTimeout(async () => {
      setIsLoadingPix(true);
      setPaymentPendingNotice(null);
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
            planId: selectedPlan,
            billingCycle,
            paymentMethod: 'pix',
            couponCode: selectedPlan === 'lancamento' ? undefined : appliedCoupon?.code,
            userEmail: emailClean,
            userName: customerName || 'Aluno Argus',
            cpfCnpj: cpfDigits,
          }),
        });
        const data = await res.json();
        if (isMounted && data.success && data.pix) {
          setPixTransactionId(data.transactionId || '');
          setRealPixCode(data.pix.copyPasteCode);
          setRealQrCodeImg(data.pix.qrCodeUrl);
        } else if (isMounted && !data.success && data.error) {
          setPaymentPendingNotice(data.error);
        }
      } catch (err) {
        console.warn('Erro ao carregar Pix real do Asaas:', err);
      } finally {
        if (isMounted) setIsLoadingPix(false);
      }
    }, 850);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [paymentMethod, selectedPlan, billingCycle, appliedCoupon, customerEmail, customerName, customerCpf]);

  // Polling automático a cada 4 segundos para liberar o plano assim que o Pix for pago no Asaas
  useEffect(() => {
    if (paymentMethod !== 'pix' || !pixTransactionId || isPaymentConfirmed) return;

    const interval = setInterval(async () => {
      try {
        const token = useAuthStore.getState().token;
        const headers: Record<string, string> = {};
        if (token && !token.startsWith('jwt_mock_')) {
          headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`/api/checkout?txId=${encodeURIComponent(pixTransactionId)}`, {
          headers,
          cache: 'no-store',
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data?.success && data?.status === 'confirmed') {
          clearInterval(interval);
          setIsPaymentConfirmed(true);
          if (selectedPlan === 'lancamento') {
            const matched = INITIAL_EXAMS.find((e) => e.title === targetExam) || INITIAL_EXAMS[0];
            try {
              localStorage.setItem('argus_locked_exam_id', matched.id);
              localStorage.setItem('argus_locked_exam_title', matched.title);
              localStorage.setItem('argus_target_exam', matched.title);
            } catch {}
          }
          trackConversion.purchase(pixTransactionId, finalPrice, selectedPlan);
          showToast(`Pagamento do ${planName} confirmado pelo Banco Central!`);
          onPaymentSuccess(selectedPlan);
        }
      } catch {}
    }, 4000);

    return () => clearInterval(interval);
  }, [paymentMethod, pixTransactionId, isPaymentConfirmed, selectedPlan, targetExam, finalPrice, planName, showToast, onPaymentSuccess]);

  // Disparo de InitiateCheckout de Anúncios
  useEffect(() => {
    trackConversion.initiateCheckout(selectedPlan, finalPrice);
  }, [selectedPlan, finalPrice]);

  // Timer Pix
  useEffect(() => {
    if (paymentMethod !== 'pix' || pixTimeRemaining <= 0) return;
    const interval = setInterval(() => {
      setPixTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [paymentMethod, pixTimeRemaining]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (selectedPlan === 'lancamento') {
      setCouponError('O Passe de R$ 97,00 já possui valor promocional de custo fixo e não aceita cupom adicional.');
      return;
    }
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    const found = AVAILABLE_COUPONS.find((c) => c.code === clean);
    if (found) {
      setAppliedCoupon({ code: found.code, percent: found.discountPercent });
      setCouponError(null);
      showToast(`Cupom ${found.code} aplicado com sucesso! (${found.discountPercent}% OFF)`);
    } else {
      setCouponError('Cupom inválido ou expirado.');
    }
  };

  const handleCopyPix = () => {
    try {
      navigator.clipboard.writeText(pixCode);
      setPixCopied(true);
      showToast('Código Pix copiado com sucesso!');
      setTimeout(() => setPixCopied(false), 3000);
    } catch {
      showToast('Erro ao copiar Pix.');
    }
  };

  const handleConfirmPayment = async () => {
    setCustomerError(null);
    setPaymentPendingNotice(null);

    if (!customerEmail || !customerEmail.includes('@')) {
      setCustomerError('Por favor, informe um e-mail válido para receber o acesso.');
      showToast('Informe seu e-mail de acesso antes de continuar.');
      return;
    }
    if (!customerName || customerName.trim().length < 3) {
      setCustomerError('Por favor, informe seu nome completo.');
      showToast('Informe seu nome completo.');
      return;
    }

    if (!pixTransactionId) {
      setPaymentPendingNotice('Aguarde a geração do QR Code Pix oficial antes de verificar o pagamento.');
      return;
    }

    setIsProcessing(true);
    try {
      const token = useAuthStore.getState().token;
      const headers: Record<string, string> = {};
      if (token && !token.startsWith('jwt_mock_')) {
        headers.Authorization = `Bearer ${token}`;
      }
      const res = await fetch(`/api/checkout?txId=${encodeURIComponent(pixTransactionId)}`, {
        method: 'GET',
        headers,
        cache: 'no-store',
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success || data?.status !== 'confirmed') {
        setIsProcessing(false);
        setPaymentPendingNotice(
          '⏳ Pagamento Pix ainda não confirmado pelo Banco Central / Asaas. Escaneie o QR Code ou copie o código Pix acima no aplicativo do seu banco e aguarde alguns segundos.'
        );
        showToast('⏳ Pix ainda aguarda confirmação do banco.');
        return;
      }

      setIsProcessing(false);
      setIsPaymentConfirmed(true);
      if (selectedPlan === 'lancamento') {
        const matched = INITIAL_EXAMS.find((e) => e.title === targetExam) || INITIAL_EXAMS[0];
        try {
          localStorage.setItem('argus_locked_exam_id', matched.id);
          localStorage.setItem('argus_locked_exam_title', matched.title);
          localStorage.setItem('argus_target_exam', matched.title);
        } catch {}
      }
      trackConversion.purchase(pixTransactionId, finalPrice, selectedPlan);
      showToast(`Pagamento do ${planName} confirmado! Bem-vindo(a) ao topo.`);
      onPaymentSuccess(selectedPlan);
    } catch {
      setIsProcessing(false);
      setPaymentPendingNotice('Não foi possível consultar o status da cobrança agora. Tente novamente em instantes.');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner de Checkout Seguro */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-black text-sm text-slate-900 dark:text-white">
              Ambiente de Pagamento Blindado & Criptografado
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Processamento seguro via Asaas Pagamentos S.A. (Autorizada pelo Banco Central).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 shadow-sm">
          <Lock className="w-3.5 h-3.5" />
          <span>SSL 256-Bit Ativo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUNA ESQUERDA: CONFIGURAÇÃO DO PLANO & PAGAMENTO (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Seletor do Plano */}
          <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              1. Escolha o Seu Nível de Preparação
            </h2>

            <div className="space-y-3">
              {/* OFERTA FECHADA DE LANÇAMENTO (R$ 97) */}
              <div 
                onClick={() => {
                  setSelectedPlan('lancamento');
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
                  selectedPlan === 'lancamento'
                    ? 'border-orange-500 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent ring-2 ring-orange-500/30 shadow-md'
                    : 'border-orange-300/60 dark:border-orange-500/30 bg-orange-50/40 dark:bg-orange-950/15 hover:border-orange-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-700 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Flame className="w-3 h-3 fill-current" /> Lote 1 • Exclusivo 200 Vagas
                    </span>
                    <span className="text-xs text-orange-600 dark:text-orange-400 font-extrabold">
                      Restam apenas 38 vagas
                    </span>
                  </div>
                  {selectedPlan === 'lancamento' && <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" />}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      Passe Até a Prova (Acesso Total Anti-Pegadinha)
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Vade Mecum Radar, IAs Especialistas, Caderno SM-2 e Arena até o dia do seu concurso/exame.
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-2xl font-black text-orange-600 dark:text-orange-400">R$ 97,00</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Dose Única • Sem Mensalidade</p>
                  </div>
                </div>

                {/* Seletor do Edital Vinculado ao Passe R$ 97 */}
                {selectedPlan === 'lancamento' && (
                  <div className="mt-3 pt-3 border-t border-orange-200/60 dark:border-orange-500/20 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                    <label htmlFor="checkout-pass-exam-select" className="text-xs font-bold text-orange-900 dark:text-orange-200 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      <span>Concurso Exclusivo Vinculado ao seu Passe:</span>
                    </label>
                    <select
                      id="checkout-pass-exam-select"
                      value={targetExam}
                      onChange={(e) => {
                        setTargetExam(e.target.value);
                        try { localStorage.setItem('argus_target_exam', e.target.value); } catch {}
                      }}
                      aria-label="Concurso vinculado ao Passe de R$ 97"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-orange-300 dark:border-orange-500/40 text-slate-900 dark:text-white font-bold text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-sm"
                    >
                      <optgroup label="🟢 Editais Abertos / Publicados">
                        {groupedExams.publicado.map((exam) => (
                          <option key={exam.id} value={exam.title}>
                            {exam.title} ({exam.banca})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🔵 Concursos Confirmados & Autorizados">
                        {groupedExams.confirmado.map((exam) => (
                          <option key={exam.id} value={exam.title}>
                            {exam.title} ({exam.banca})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🟡 Concursos Previstos 2026">
                        {groupedExams.previsto.map((exam) => (
                          <option key={exam.id} value={exam.title}>
                            {exam.title} ({exam.banca})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🟣 Rumores Quentes & Comissões">
                        {groupedExams.rumor.map((exam) => (
                          <option key={exam.id} value={exam.title}>
                            {exam.title} ({exam.banca})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <p className="text-[11px] text-orange-800 dark:text-orange-300 font-medium">
                      🔒 O Passe de R$ 97 dá direito a 1 edital completo até o dia da prova. Para ter acesso irrestrito a todos os concursos do Brasil ao mesmo tempo, selecione os planos PRO, ELITE ou BLACK.
                    </p>
                  </div>
                )}
              </div>

              {/* DEMAIS PLANOS CONTÍNUOS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Plano PRO */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan('pro');
                    if (billingCycle === 'vitalicio') setBillingCycle('mensal');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    selectedPlan === 'pro'
                      ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-500/10 ring-2 ring-blue-500/20 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <Zap className="w-4 h-4" /> Plano PRO
                    </span>
                    {selectedPlan === 'pro' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">R$ 49,00 <span className="text-xs font-normal text-slate-400">/mês no anual</span></p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold mt-0.5">51% OFF • De R$ 99/mês no avulso</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">IA Flash Ilimitada + Caderno SM-2 + até 4 Editais.</p>
                </button>

                {/* Plano ELITE */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan('elite');
                    if (billingCycle === 'vitalicio') setBillingCycle('mensal');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    selectedPlan === 'elite'
                      ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-500/10 ring-2 ring-indigo-500/20 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Crown className="w-4 h-4" /> ELITE VIP
                    </span>
                    {selectedPlan === 'elite' && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">R$ 89,00 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/mês no anual</span></p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold mt-0.5">53% OFF • De R$ 189/mês no avulso</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Psicometria TRI + 10 Peças OAB/mês + Gemini Pro.</p>
                </button>

                {/* Plano BLACK VITALÍCIO */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan('black');
                    setBillingCycle('vitalicio');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    selectedPlan === 'black'
                      ? 'border-amber-500 bg-slate-900 text-white ring-2 ring-amber-500/40 shadow-lg preserve-dark'
                      : 'border-slate-200 dark:border-slate-800 hover:border-amber-400/50 dark:hover:border-amber-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> BLACK VIP
                    </span>
                    {selectedPlan === 'black' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className={`text-xl font-black ${selectedPlan === 'black' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    R$ 1.497 <span className={`text-xs font-normal ${selectedPlan === 'black' ? 'text-amber-300' : 'text-amber-700 dark:text-amber-400'}`}>único</span>
                  </p>
                  <p className="text-[11px] text-amber-400 font-bold mt-0.5">12x R$ 149,70 ou R$ 197/mês</p>
                  <p className={`text-xs mt-1 ${selectedPlan === 'black' ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    Acesso Até a Posse + Todas Ferramentas + Fênix Dourada.
                  </p>
                </button>
              </div>
            </div>

            {/* Seletor de Ciclos */}
            {selectedPlan === 'lancamento' ? (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-orange-900 dark:text-orange-200 font-bold">
                    <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>Oferta Fechada Lote 1: R$ 97,00 valor único válido até o dia da sua prova.</span>
                  </div>
                  <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md shrink-0">
                    Sem Mensalidade
                  </span>
                </div>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {selectedPlan === 'black' ? 'Formato de Pagamento' : 'Frequência de Cobrança (Economize até 33%)'}
                </label>

                {selectedPlan === 'black' ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('vitalicio')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        billingCycle === 'vitalicio'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>Vitalício (Até a Posse)</span>
                      <span className="block text-[9px] text-amber-900 dark:text-amber-200 font-extrabold">12x R$ 149,70 • Acesso Perpétuo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBillingCycle('mensal')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        billingCycle === 'mensal'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>Mensal Recorrente</span>
                      <span className="block text-[9px] text-slate-400 font-extrabold">R$ 197,00/mês</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('mensal')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        billingCycle === 'mensal'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Mensal
                    </button>

                    <button
                      type="button"
                      onClick={() => setBillingCycle('trimestral')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all relative ${
                        billingCycle === 'trimestral'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>Trimestral</span>
                      <span className={`block text-[9px] font-extrabold ${billingCycle === 'trimestral' ? 'text-emerald-200' : 'text-emerald-700 dark:text-emerald-400'}`}>-15% OFF</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBillingCycle('anual')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all relative ${
                        billingCycle === 'anual'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>Anual</span>
                      <span className={`block text-[9px] font-extrabold ${billingCycle === 'anual' ? 'text-amber-200' : 'text-amber-700 dark:text-amber-300'}`}>-51% OFF</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Etapa 2: Identificação do Aluno & Envio do Acesso */}
          <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                2. Seus Dados de Acesso & Emissão
              </h2>
              {user && user.id !== 'usr_default_demo' && !user.email.includes('argus.app.br') && !user.email.includes('learningai.com.br') && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-bold flex items-center gap-1.5">
                  <GoogleIcon className="w-3 h-3" />
                  Conta Google
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo de Souza"
                  data-clarity-mask="true"
                  data-mask="true"
                  data-private="true"
                  autoComplete="name"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  E-mail para Liberação do Acesso
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  data-clarity-mask="true"
                  data-mask="true"
                  data-private="true"
                  autoComplete="email"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  CPF do Titular (Obrigatório Asaas / Pix)
                </label>
                <input
                  type="text"
                  maxLength={14}
                  value={customerCpf}
                  onChange={(e) => setCustomerCpf(formatCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  data-clarity-mask="true"
                  data-mask="true"
                  data-private="true"
                  autoComplete="off"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  WhatsApp com DDD (Comprovante Instantâneo)
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(formatPhone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  data-clarity-mask="true"
                  data-mask="true"
                  data-private="true"
                  autoComplete="tel"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {customerError && (
              <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{customerError}</span>
              </p>
            )}

            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed pt-1">
              🔒 Seus dados cadastrais são tratados de acordo com a LGPD (Lei nº 13.709/2018) e processados pela infraestrutura certificada Asaas & Banco Central do Brasil.
            </p>
          </div>

          {/* Seletor de Forma de Pagamento */}
          <CheckoutPaymentSection
            selectedPlan={selectedPlan}
            billingCycle={billingCycle}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            pixTimeRemaining={pixTimeRemaining}
            realQrCodeImg={realQrCodeImg}
            isLoadingPix={isLoadingPix}
            pixCode={pixCode}
            pixCopied={pixCopied}
            onCopyPix={handleCopyPix}
            paymentPendingNotice={paymentPendingNotice}
            isProcessing={isProcessing}
            onConfirmPayment={handleConfirmPayment}
            finalPrice={finalPrice}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardHolder={cardHolder}
            setCardHolder={setCardHolder}
            cardExpiry={cardExpiry}
            setCardExpiry={setCardExpiry}
            cardCvv={cardCvv}
            setCardCvv={setCardCvv}
            installments={installments}
            setInstallments={setInstallments}
            formatTime={formatTime}
          />
        </div>

        {/* COLUNA DIREITA: RESUMO DO PEDIDO & CUPONS (5 COLS) */}
        <CheckoutOrderSummary
          selectedPlan={selectedPlan}
          billingCycle={billingCycle}
          planName={planName}
          rawTotal={rawTotal}
          cycleDiscountPercent={cycleDiscountPercent}
          cycleDiscountValue={cycleDiscountValue}
          appliedCoupon={appliedCoupon}
          couponDiscountValue={couponDiscountValue}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          couponError={couponError}
          onApplyCoupon={handleApplyCoupon}
          finalPrice={finalPrice}
        />

      </div>

    </div>
  );
};
