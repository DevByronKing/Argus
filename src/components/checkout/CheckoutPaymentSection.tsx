'use client';

import React from 'react';
import {
  CreditCard,
  QrCode,
  Clock,
  Check,
  Copy,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';

interface CheckoutPaymentSectionProps {
  selectedPlan: SubscriptionPlan;
  billingCycle: 'mensal' | 'trimestral' | 'anual' | 'vitalicio';
  paymentMethod: 'pix' | 'cartao';
  setPaymentMethod: (method: 'pix' | 'cartao') => void;
  pixTimeRemaining: number;
  realQrCodeImg: string | null;
  isLoadingPix: boolean;
  pixCode: string;
  pixCopied: boolean;
  onCopyPix: () => void;
  paymentPendingNotice: string | null;
  isProcessing: boolean;
  onConfirmPayment: () => void;
  finalPrice: number;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardHolder: string;
  setCardHolder: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvv: string;
  setCardCvv: (val: string) => void;
  installments: number;
  setInstallments: (val: number) => void;
  formatTime: (secs: number) => string;
}

export const CheckoutPaymentSection: React.FC<CheckoutPaymentSectionProps> = ({
  selectedPlan,
  billingCycle,
  paymentMethod,
  setPaymentMethod,
  pixTimeRemaining,
  realQrCodeImg,
  isLoadingPix,
  pixCode,
  pixCopied,
  onCopyPix,
  paymentPendingNotice,
  isProcessing,
  onConfirmPayment,
  finalPrice,
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
  installments,
  setInstallments,
  formatTime,
}) => {
  return (
    <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
      <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        3. Forma de Pagamento
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setPaymentMethod('pix')}
          className={`p-3.5 rounded-2xl border text-center transition-all flex items-center justify-center gap-2 font-bold text-sm ${
            paymentMethod === 'pix'
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
          }`}
        >
          <QrCode className="w-4 h-4 text-emerald-500" />
          <span>Pix Instantâneo</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500 uppercase font-black">
            Imediato
          </span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('cartao')}
          className={`p-3.5 rounded-2xl border text-center transition-all flex items-center justify-center gap-2 font-bold text-sm ${
            paymentMethod === 'cartao'
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
          }`}
        >
          <CreditCard className="w-4 h-4 text-blue-500" />
          <span>Cartão de Crédito</span>
        </button>
      </div>

      {/* OPÇÃO PIX */}
      {paymentMethod === 'pix' && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>
                QR Code Pix expira em: <strong>{formatTime(pixTimeRemaining)}</strong>
              </span>
            </div>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              Liberação em 5 segundos
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="w-36 h-36 bg-white p-2 rounded-2xl border-2 border-emerald-500 shadow-md shrink-0 flex items-center justify-center">
              {realQrCodeImg ? (
                <img
                  src={realQrCodeImg}
                  alt="QR Code Pix Oficial Asaas"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : isLoadingPix ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-3 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin" />
                  <span className="text-[10px] font-bold text-slate-500">Gerando QR...</span>
                </div>
              ) : (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCode)}`}
                  alt="QR Code Pix"
                  className="w-full h-full object-contain rounded-xl"
                />
              )}
            </div>

            <div className="flex-1 space-y-2 w-full">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Chave Pix Copia e Cola:
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={pixCode}
                  className="w-full text-xs font-mono px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 select-all"
                />
                <button
                  onClick={onCopyPix}
                  className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm transition-all active:scale-95"
                >
                  {pixCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{pixCopied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Abra o aplicativo do seu banco, escolha <strong>Pix Copia e Cola</strong> e cole o código acima.
              </p>
            </div>
          </div>

          {paymentPendingNotice && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-bold leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>{paymentPendingNotice}</span>
            </div>
          )}

          <button
            type="button"
            disabled={isProcessing}
            onClick={onConfirmPayment}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verificando Pix no Banco Central...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Já Realizei o Pagamento Pix</span>
              </>
            )}
          </button>

          <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5 mt-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Condições da Assinatura (Art. 39 CDC / Transparência):</span>
            </div>
            <p className="leading-relaxed">
              <strong>Preço &amp; Periodicidade:</strong>{' '}
              {selectedPlan === 'black' && billingCycle === 'vitalicio'
                ? 'R$ 1.497 à vista ou 12x de R$ 124,75 (pagamento único com vigência vitalícia até a posse).'
                : billingCycle === 'mensal'
                ? `R$ ${finalPrice.toFixed(2)}/mês cobrado a cada 30 dias com renovação automática.`
                : `12x de R$ ${(finalPrice / 12).toFixed(2)} (Total de R$ ${finalPrice.toFixed(2)}/ano) com renovação anual.`}
            </p>
            {billingCycle !== 'vitalicio' && selectedPlan !== 'lancamento' && (
              <p className="leading-relaxed">
                <strong>Regra de Renovação &amp; Aviso Prévio:</strong> O plano renova automaticamente ao final do ciclo contratado. Você receberá <strong>aviso prévio formal por e-mail com 30 dias e 7 dias de antecedência</strong> antes de cada renovação para decidir se deseja continuar ou pausar o plano. O cancelamento pode ser efetuado com 1 clique a qualquer momento no seu painel sem multas residuais.
              </p>
            )}
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              🛡️ Garantia incondicional de 7 dias com devolução de 100% do valor pago (Art. 49 CDC).
            </p>
          </div>
        </div>
      )}

      {/* OPÇÃO CARTÃO DE CRÉDITO */}
      {paymentMethod === 'cartao' && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Número do Cartão
            </label>
            <input
              type="text"
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
              data-clarity-mask="true"
              data-mask="true"
              data-private="true"
              autoComplete="cc-number"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Nome Impresso no Cartão
            </label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Ex: CARLOS E SOUZA"
              data-clarity-mask="true"
              data-mask="true"
              data-private="true"
              autoComplete="cc-name"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm uppercase focus:outline-none focus:border-blue-500 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Validade
              </label>
              <input
                type="text"
                maxLength={5}
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                placeholder="MM/AA"
                data-clarity-mask="true"
                data-mask="true"
                data-private="true"
                autoComplete="cc-exp"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Código CVV
              </label>
              <input
                type="password"
                maxLength={4}
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                placeholder="123"
                data-clarity-mask="true"
                data-mask="true"
                data-private="true"
                autoComplete="cc-csc"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Parcelamento sem juros
            </label>
            <select
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold focus:outline-none focus:border-blue-500"
            >
              {selectedPlan === 'black' && billingCycle === 'vitalicio' ? (
                <>
                  <option value={1}>1x de R$ {finalPrice.toFixed(2)} à vista (sem juros)</option>
                  <option value={3}>3x de R$ {(finalPrice / 3).toFixed(2)} (sem juros)</option>
                  <option value={6}>6x de R$ {(finalPrice / 6).toFixed(2)} (sem juros)</option>
                  <option value={10}>10x de R$ {(finalPrice / 10).toFixed(2)} (sem juros)</option>
                  <option value={12}>12x de R$ 149,70 (sem juros • Até a Posse)</option>
                </>
              ) : (
                <>
                  <option value={1}>1x de R$ {finalPrice.toFixed(2)} (sem juros)</option>
                  <option value={2}>2x de R$ {(finalPrice / 2).toFixed(2)} (sem juros)</option>
                  <option value={3}>3x de R$ {(finalPrice / 3).toFixed(2)} (sem juros)</option>
                  <option value={6}>6x de R$ {(finalPrice / 6).toFixed(2)} (sem juros)</option>
                  <option value={12}>12x de R$ {(finalPrice / 12).toFixed(2)} (sem juros)</option>
                </>
              )}
            </select>
          </div>

          {paymentPendingNotice && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-bold leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>{paymentPendingNotice}</span>
            </div>
          )}

          <button
            type="button"
            disabled={isProcessing}
            onClick={onConfirmPayment}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-95 transition-all"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processando Transação Segura...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pagar R$ {finalPrice.toFixed(2)} no Cartão</span>
              </>
            )}
          </button>

          <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5 mt-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Condições da Assinatura (Art. 39 CDC / Transparência):</span>
            </div>
            <p className="leading-relaxed">
              <strong>Preço &amp; Periodicidade:</strong>{' '}
              {selectedPlan === 'black' && billingCycle === 'vitalicio'
                ? 'R$ 1.497 à vista ou até 12x de R$ 149,70 (pagamento único sem renovação).'
                : billingCycle === 'mensal'
                ? `R$ ${finalPrice.toFixed(2)}/mês com renovação mensal recorrente.`
                : `12x de R$ ${(finalPrice / 12).toFixed(2)} (Total de R$ ${finalPrice.toFixed(2)}/ano) com renovação anual.`}
            </p>
            {billingCycle !== 'vitalicio' && selectedPlan !== 'lancamento' && (
              <p className="leading-relaxed">
                <strong>Regra de Renovação &amp; Aviso Prévio:</strong> Renovação automática ao término de cada período. Em cumprimento ao CDC, você receberá <strong>aviso prévio formal por e-mail com 30 dias e 7 dias de antecedência</strong> da data de renovação. O cancelamento pode ser efetuado com 1 clique a qualquer momento no seu painel de usuário sem taxas residuais.
              </p>
            )}
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              🛡️ Garantia incondicional de 7 dias com devolução de 100% do valor pago (Art. 49 CDC).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
