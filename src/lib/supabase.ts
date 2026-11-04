import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Verifica se as credenciais do Supabase foram informadas e são válidas.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('seu-projeto') &&
    !supabaseAnonKey.includes('sua-chave')
  );
};

/**
 * Verifica se a chave de serviço (service_role) está informada para operações privilegiadas de backend.
 */
export const isSupabaseServiceRoleConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseServiceRoleKey &&
    !supabaseUrl.includes('seu-projeto') &&
    !supabaseServiceRoleKey.includes('sua-chave')
  );
};

let supabaseInstance: SupabaseClient | null = null;
let supabaseServiceRoleInstance: SupabaseClient | null = null;

/**
 * Retorna o cliente Supabase configurado (anônimo) ou null se estiver em modo offline/mock.
 */
export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return supabaseInstance;
};

/**
 * Retorna o cliente Supabase com chave de serviço (service_role) para operações privilegiadas no backend
 * (ex: confirmação de pagamentos, bypass de RLS no cadastro de transações e atualização de assinaturas).
 */
export const getSupabaseServiceRole = (): SupabaseClient | null => {
  if (isSupabaseServiceRoleConfigured()) {
    if (!supabaseServiceRoleInstance) {
      supabaseServiceRoleInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    }
    return supabaseServiceRoleInstance;
  }

  // Fallback para cliente anônimo caso service_role ainda não tenha sido cadastrado
  return getSupabase();
};

export const supabase = isSupabaseConfigured() ? getSupabase() : null;
