'use client';

import React from 'react';
import {
  Crown,
  Zap,
  ArrowLeft,
  Target,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Lock,
  QrCode,
  CreditCard,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { ExamNotice, SubscriptionPlan } from '@/lib/types';

interface PricingCheckoutViewProps {
  selectedPlanToBuy: SubscriptionPlan;
  billingCycle: 'monthly' | 'annual';
  planPrices: Record<string, { name: string; annualTotal: string; price: string | number; period?: string }>;
  baseAmount: number;
  finalAmount: number;
  effectiveDiscountPercent: number;
  appliedCoupon: { code: string; discountPercent: number } | null;
  couponInput: string;
  setCouponInput: (val: string) => void;
  couponFeedback: string | null;
  onApplyCoupon: () => void;
  targetExamForLaunch: string;
  setTargetExamForLaunch: (val: string) => void;
  openExams: ExamNotice[];
  confirmedExams: ExamNotice[];
  predictedExams: ExamNotice[];
  rumorExams: ExamNotice[];
  paymentMethod: 'pix' | 'card';
  setPaymentMethod: (method: 'pix' | 'card') => void;
  qrCodeImg: string | null;
  pixCode: string;
  isCopied: boolean;
  onCopyPix: () => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardHolder: string;
  setCardHolder: (val: string) => void;
  cardCpf: string;
  setCardCpf: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvv: string;
  setCardCvv: (val: string) => void;
  cardInstallments: string;
  setCardInstallments: (val: string) => void;
  cardError: string | null;
  isProcessing: boolean;
  paymentStatus: 'pending_payment' | 'confirmed';
  onConfirmPayment: () => void;
  onBackToPlans: () => void;
  formatPrice: (val: number) => string;
}

export const PricingCheckoutView: React.FC<PricingCheckoutViewProps> = ({
  selectedPlanToBuy,
  billingCycle,
  planPrices,
  baseAmount,
  finalAmount,
  effectiveDiscountPercent,
  appliedCoupon,
  couponInput,
  setCouponInput,
  couponFeedback,
  onApplyCoupon,
  targetExamForLaunch,
  setTargetExamForLaunch,
  openExams,
  confirmedExams,
  predictedExams,
  rumorExams,
  paymentMethod,
  setPaymentMethod,
  qrCodeImg,
  pixCode,
  isCopied,
  onCopyPix,
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  cardCpf,
  setCardCpf,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
  cardInstallments,
  setCardInstallments,
  cardError,
  isProcessing,
  paymentStatus,
  onConfirmPayment,
  onBackToPlans,
  formatPrice,
}) => {
  return (
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
          onClick={onBackToPlans}
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
              try {
                localStorage.setItem('argus_target_exam', e.target.value);
              } catch {}
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
              Resumo &amp; Garantias Oficiais
            </h3>
          </div>

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
                  onClick={onApplyCoupon}
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
                <div className={`p-2.5 rounded-xl shrink-0 ${paymentMethod === 'pix' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
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
                <div className={`p-2.5 rounded-xl shrink-0 ${paymentMethod === 'card' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
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
                      onClick={onCopyPix}
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

                  {cardError && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-bold leading-relaxed">
                      {cardError}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onConfirmPayment}
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
                onClick={onConfirmPayment}
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
                    <span>Pagar com Cartão &amp; Ativar Acesso ({formatPrice(finalAmount)})</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
