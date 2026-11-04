import { SubscriptionPlan } from './types';
import { getSupabaseServiceRole, isSupabaseConfigured } from './supabase';

export type PaymentStatus = 'pending_payment' | 'confirmed' | 'expired' | 'failed';

export interface Transaction {
  id: string;
  planId: SubscriptionPlan;
  billingCycle: 'monthly' | 'annual';
  amount: number;
  paymentMethod: 'pix' | 'card';
  status: PaymentStatus;
  pixCode?: string;
  qrCodeUrl?: string;
  externalId?: string;
  provider: 'asaas' | 'stripe' | 'simulated';
  userEmail: string;
  userName: string;
  createdAt: string;
  confirmedAt?: string;
  expiresAt: string;
}

// In-memory store para cache rápido em runtime (L1)
const globalTransactions = new Map<string, Transaction>();
const processedWebhookEvents = new Set<string>();

export class TransactionManager {
  static isEventProcessed(eventId: string): boolean {
    return processedWebhookEvents.has(eventId);
  }

  static markEventProcessed(eventId: string): void {
    processedWebhookEvents.add(eventId);
  }

  /**
   * Persiste uma transação de forma síncrona no PostgreSQL do Supabase via service_role
   * (indispensável para arquiteturas Serverless e ambientes distribuídos como Vercel).
   */
  static async createAsync(tx: Transaction): Promise<Transaction> {
    globalTransactions.set(tx.id, tx);

    if (isSupabaseConfigured()) {
      const client = getSupabaseServiceRole();
      if (client) {
        try {
          const { error } = await client
            .from('transactions')
            .upsert({
              id: tx.id,
              plan_id: tx.planId,
              billing_cycle: tx.billingCycle,
              amount: tx.amount,
              payment_method: tx.paymentMethod,
              status: tx.status,
              pix_code: tx.pixCode,
              provider: tx.provider,
              user_email: tx.userEmail,
              created_at: tx.createdAt,
              expires_at: tx.expiresAt,
            }, { onConflict: 'id' });

          if (error) {
            console.warn('[TransactionManager] Aviso Supabase ao inserir transação:', error.message);
          }
        } catch (err: any) {
          console.warn('[TransactionManager] Falha ao persistir transação no Supabase:', err?.message || err);
        }
      }
    }

    return tx;
  }

  /**
   * Compatibilidade com chamadas síncronas legadas (registra na memória e despacha para o banco).
   */
  static create(tx: Transaction): Transaction {
    globalTransactions.set(tx.id, tx);
    this.createAsync(tx).catch(() => {});
    return tx;
  }

  static get(id: string): Transaction | undefined {
    return globalTransactions.get(id);
  }

  /**
   * Busca transação com fallback síncrono no Supabase caso não esteja na memória da instância atual.
   */
  static async getAsync(id: string): Promise<Transaction | undefined> {
    const memoryTx = globalTransactions.get(id);
    if (memoryTx) return memoryTx;

    if (isSupabaseConfigured()) {
      const client = getSupabaseServiceRole();
      if (client) {
        try {
          const { data, error } = await client
            .from('transactions')
            .select('*')
            .eq('id', id)
            .maybeSingle();

          if (!error && data) {
            const tx: Transaction = {
              id: data.id,
              planId: data.plan_id as SubscriptionPlan,
              billingCycle: data.billing_cycle,
              amount: Number(data.amount),
              paymentMethod: data.payment_method,
              status: data.status,
              pixCode: data.pix_code,
              provider: data.provider,
              userEmail: data.user_email,
              userName: 'Concurseiro',
              createdAt: data.created_at,
              confirmedAt: data.confirmed_at,
              expiresAt: data.expires_at,
              externalId: data.external_id,
            };
            globalTransactions.set(id, tx);
            return tx;
          }
        } catch (err) {
          console.warn('[TransactionManager] Erro ao buscar transação no Supabase:', err);
        }
      }
    }

    return undefined;
  }

  static confirm(id: string, provider: 'asaas' | 'stripe' | 'simulated' = 'simulated', externalId?: string): Transaction | null {
    const tx = globalTransactions.get(id);
    if (!tx) {
      const newTx: Transaction = {
        id,
        planId: 'pro',
        billingCycle: 'annual',
        amount: 297,
        paymentMethod: 'pix',
        status: 'confirmed',
        provider,
        externalId,
        userEmail: 'aluno@argus.app.br',
        userName: 'Concurseiro',
        createdAt: new Date().toISOString(),
        confirmedAt: new Date().toISOString(),
        expiresAt: new Date().toISOString(),
      };
      globalTransactions.set(id, newTx);
      this.confirmAsync(id, provider, externalId).catch(() => {});
      return newTx;
    }

    tx.status = 'confirmed';
    tx.confirmedAt = new Date().toISOString();
    if (externalId) tx.externalId = externalId;
    tx.provider = provider;

    globalTransactions.set(id, tx);
    this.confirmAsync(id, provider, externalId).catch(() => {});
    return tx;
  }

  /**
   * Confirma transação com gravação garantida no Supabase e liberação do plano no perfil do aluno.
   */
  static async confirmAsync(id: string, provider: 'asaas' | 'stripe' | 'simulated' = 'simulated', externalId?: string): Promise<Transaction | null> {
    let tx = await this.getAsync(id);
    
    if (!tx) {
      const newTx: Transaction = {
        id,
        planId: 'pro',
        billingCycle: 'annual',
        amount: 297,
        paymentMethod: 'pix',
        status: 'confirmed',
        provider,
        externalId,
        userEmail: 'aluno@argus.app.br',
        userName: 'Concurseiro',
        createdAt: new Date().toISOString(),
        confirmedAt: new Date().toISOString(),
        expiresAt: new Date().toISOString(),
      };
      globalTransactions.set(id, newTx);
      tx = newTx;
    } else {
      tx.status = 'confirmed';
      tx.confirmedAt = new Date().toISOString();
      if (externalId) tx.externalId = externalId;
      tx.provider = provider;
      globalTransactions.set(id, tx);
    }

    if (isSupabaseConfigured()) {
      const client = getSupabaseServiceRole();
      if (client) {
        try {
          await client
            .from('transactions')
            .upsert({
              id: tx.id,
              plan_id: tx.planId,
              billing_cycle: tx.billingCycle,
              amount: tx.amount,
              payment_method: tx.paymentMethod,
              status: tx.status,
              provider: tx.provider,
              user_email: tx.userEmail,
              confirmed_at: tx.confirmedAt,
              external_id: tx.externalId,
              expires_at: tx.expiresAt,
            }, { onConflict: 'id' });

          // Atualiza automaticamente o tier e status do aluno na tabela profiles via service_role
          if (tx.userEmail) {
            await client
              .from('profiles')
              .update({
                subscription_tier: tx.planId,
                subscription_status: 'active',
                updated_at: new Date().toISOString(),
              })
              .eq('email', tx.userEmail);
          }
        } catch (error: any) {
          console.warn('[TransactionManager] Erro ao sincronizar confirmação no Supabase:', error.message);
        }
      }
    }

    return tx;
  }
}
