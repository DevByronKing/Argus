'use client';

import React from 'react';
import { Tag, Check, Shield } from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';

interface CheckoutOrderSummaryProps {
  selectedPlan: SubscriptionPlan;
  billingCycle: 'mensal' | 'trimestral' | 'anual' | 'vitalicio';
  planName: string;
  rawTotal: number;
  cycleDiscountPercent: number;
  cycleDiscountValue: number;
  appliedCoupon: { code: string; percent: number } | null;
  couponDiscountValue: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  couponError: string | null;
  onApplyCoupon: (e: React.FormEvent) => void;
  finalPrice: number;
}

export const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  selectedPlan,
  billingCycle,
  planName,
  rawTotal,
  cycleDiscountPercent,
  cycleDiscountValue,
  appliedCoupon,
  couponDiscountValue,
  couponCode,
  setCouponCode,
  couponError,
  onApplyCoupon,
  finalPrice,
}) => {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-6 sticky top-28">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Resumo do Pedido
        </h3>

        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p className="font-black text-sm text-slate-900 dark:text-white">{planName}</p>
            <p className="text-xs text-slate-400 capitalize">
              {selectedPlan === 'lancamento' ? 'Acesso Até o Dia da Sua Prova' : `Ciclo ${billingCycle}`}
            </p>
          </div>
          <p className="font-bold text-sm text-slate-900 dark:text-white">
            R$ {rawTotal.toFixed(2)}
          </p>
        </div>

        {cycleDiscountPercent > 0 && (
          <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            <span>Desconto de Ciclo ({cycleDiscountPercent}% OFF)</span>
            <span>- R$ {cycleDiscountValue.toFixed(2)}</span>
          </div>
        )}

        {appliedCoupon && (
          <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            <span>Cupom ({appliedCoupon.code} - {appliedCoupon.percent}%)</span>
            <span>- R$ {couponDiscountValue.toFixed(2)}</span>
          </div>
        )}

        <form onSubmit={onApplyCoupon} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
            Possui um cupom de desconto?
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Ex: LANCAMENTO20"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs uppercase font-bold focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-all shrink-0 active:scale-95"
            >
              Aplicar
            </button>
          </div>
          {couponError && <p className="text-[11px] text-rose-500 font-bold">{couponError}</p>}
          {appliedCoupon && (
            <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Cupom ativado com sucesso!
            </p>
          )}
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Total a Pagar</span>
            <div className="text-right">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                R$ {finalPrice.toFixed(2)}
              </span>
              <span className="block text-[10px] text-slate-400">
                {selectedPlan === 'lancamento'
                  ? 'Pagamento único com acesso completo até o dia da sua prova'
                  : billingCycle === 'vitalicio'
                  ? 'Pagamento único com acesso vitalício até a posse'
                  : billingCycle === 'mensal'
                  ? 'Cobrança mensal recorrente'
                  : `Valor único para ${billingCycle === 'trimestral' ? '3 meses' : '1 ano'}`}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <p className="font-bold text-slate-900 dark:text-white">
              Garantia Incondicional de 7 Dias
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Conforme o Art. 49 do Código de Defesa do Consumidor, teste a plataforma sem riscos. Se não acelerar seus estudos, solicite o cancelamento e devolvemos 100% do seu dinheiro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
