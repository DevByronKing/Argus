/**
 * Argus - Motor de Precificação Oficial em Real Brasileiro (BRL)
 * Todos os valores são unificados em R$ em todas as telas e no checkout.
 */

'use client';

export type SupportedCurrency = 'BRL';

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  flag: string;
  locale: string;
}

export const CURRENCIES_REGISTRY: Record<SupportedCurrency, CurrencyConfig> = {
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    name: 'Real Brasileiro',
    flag: '🇧🇷',
    locale: 'pt-BR',
  },
};

export interface PlanTierPricing {
  monthly: number;
  annual: number;
  lifetime?: number;
}

export const PLAN_PRICES: Record<SupportedCurrency, Record<string, PlanTierPricing>> = {
  BRL: {
    aspirante: { monthly: 0, annual: 0 },
    lancamento: { monthly: 97.00, annual: 97.00, lifetime: 97.00 },
    pro: { monthly: 99.00, annual: 49.00 },
    elite: { monthly: 189.00, annual: 89.00 },
    black: { monthly: 197.00, annual: 124.75, lifetime: 1497.00 },
  },
};

/**
 * Formata um valor numérico para Real Brasileiro (R$)
 */
export function formatCurrencyValue(value: number, _currency: SupportedCurrency = 'BRL'): string {
  const formattedNumber = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `R$ ${formattedNumber}`;
}

/**
 * Obtém o preço correspondente a um plano e ciclo de faturamento em BRL
 */
export function getLocalizedPlanPrice(
  planId: string,
  billingCycle: 'monthly' | 'annual' = 'monthly',
  _currency: SupportedCurrency = 'BRL'
): { value: number; formatted: string; rawMonthly: number } {
  const planData = PLAN_PRICES.BRL[planId.toLowerCase()] || { monthly: 0, annual: 0 };
  const value = billingCycle === 'annual' ? planData.annual : planData.monthly;
  return {
    value,
    formatted: formatCurrencyValue(value, 'BRL'),
    rawMonthly: planData.monthly,
  };
}

/**
 * Hook React para precificação oficial em BRL (sem dólar/euro)
 */
export function useCurrency() {
  const currency: SupportedCurrency = 'BRL';

  return {
    currency,
    setCurrency: (_newCurrency: SupportedCurrency) => {},
    currencies: [CURRENCIES_REGISTRY.BRL],
    formatPrice: (val: number) => formatCurrencyValue(val, 'BRL'),
    getPlanPrice: (planId: string, cycle: 'monthly' | 'annual' = 'monthly') =>
      getLocalizedPlanPrice(planId, cycle, 'BRL'),
  };
}
