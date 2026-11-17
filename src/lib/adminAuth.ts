import { getSupabase, getSupabaseServiceRole, isSupabaseConfigured, isSupabaseServiceRoleConfigured } from './supabase';
import { constantTimeEqualStrings } from './signedAccessToken';
import { siemEngine } from './siemEngine';
import { persistSecurityAuditEvent } from './auditLogger';
import { getClientIp } from './rateLimiter';

export interface ServerAdminResult {
  authorized: boolean;
  status: 200 | 401 | 403;
  method?: 'api_key' | 'server_allowlist_env' | 'server_allowlist_db';
  userId?: string;
  email?: string;
  error?: string;
}

function parseAllowlistEnv(raw?: string): Set<string> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

function parseCookieValue(cookieHeader: string | null, names: string[]): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';');
  for (const name of names) {
    const found = parts.find((p) => p.trim().startsWith(`${name}=`));
    if (found) {
      const value = found.trim().slice(name.length + 1);
      try {
        return decodeURIComponent(value);
      } catch {
        return value;
      }
    }
  }
  return null;
}

/**
 * Helper server-only de autorização administrativa.
 * Regra absoluta: nunca lê `body.role`, `localStorage`, cookie editável, `profiles` editável
 * ou `auth.users.raw_user_meta_data`.
 */
export async function assertServerAdmin(req: Request, route = '/api/admin'): Promise<ServerAdminResult> {
  const clientIp = getClientIp(req);
  const authHeader = req.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const adminKeyHeader = req.headers.get('x-admin-key')?.trim() || null;

  // 1. Verificação por ADMIN_API_KEY em tempo constante (integrações CLI/backend/scripts)
  const configuredAdminKey = process.env.ADMIN_API_KEY?.trim();
  const providedKey = adminKeyHeader || bearerToken;
  if (configuredAdminKey && providedKey && constantTimeEqualStrings(providedKey, configuredAdminKey)) {
    return {
      authorized: true,
      status: 200,
      method: 'api_key',
    };
  }

  // 2. Verificação real do JWT com Supabase Auth + allowlist server-only
  const sessionToken =
    bearerToken ||
    parseCookieValue(req.headers.get('cookie'), ['argus-session', 'learning-ai-session', 'sb-access-token']);

  if (!sessionToken) {
    return {
      authorized: false,
      status: 401,
      error: 'Acesso administrativo negado: credenciais ausentes.',
    };
  }

  const supabaseClient = isSupabaseServiceRoleConfigured() ? getSupabaseServiceRole() : getSupabase();
  if (!isSupabaseConfigured() || !supabaseClient) {
    return {
      authorized: false,
      status: 401,
      error: 'Acesso administrativo requer autenticação Supabase válida ou chave ADMIN_API_KEY configurada no servidor.',
    };
  }

  const { data, error } = await supabaseClient.auth.getUser(sessionToken);
  if (error || !data?.user) {
    const evt = siemEngine.logEvent({
      eventType: 'AUTH_FAILED',
      severity: 'HIGH',
      sourceIp: clientIp,
      details: { route, reason: 'Invalid or expired admin JWT' },
    });
    void persistSecurityAuditEvent(evt, { route });

    return {
      authorized: false,
      status: 401,
      error: 'Sessão inválida ou expirada para operação administrativa.',
    };
  }

  const verifiedUser = data.user;
  const userId = verifiedUser.id;
  const email = (verifiedUser.email || '').trim().toLowerCase();

  // 2a. Checa allowlist via variáveis de ambiente exclusivas do servidor
  const allowedUserIds = parseAllowlistEnv(process.env.ADMIN_USER_IDS);
  const allowedEmails = parseAllowlistEnv(process.env.ADMIN_EMAILS);

  if (allowedUserIds.has(userId.toLowerCase())) {
    return {
      authorized: true,
      status: 200,
      method: 'server_allowlist_env',
      userId,
      email: verifiedUser.email || undefined,
    };
  }

  // Exige e-mail confirmado no Supabase antes de confiar no match por e-mail
  const emailConfirmed = Boolean(verifiedUser.email_confirmed_at || verifiedUser.confirmed_at);
  if (email && emailConfirmed && allowedEmails.has(email)) {
    return {
      authorized: true,
      status: 200,
      method: 'server_allowlist_env',
      userId,
      email: verifiedUser.email || undefined,
    };
  }

  // 2b. Checa tabela server-only `public.admin_allowlist` via service_role
  const serviceClient = getSupabaseServiceRole();
  if (serviceClient) {
    try {
      const { data: allowRow } = await serviceClient
        .from('admin_allowlist')
        .select('id, role, is_active')
        .eq('is_active', true)
        .or(email && emailConfirmed ? `user_id.eq.${userId},email.eq.${email}` : `user_id.eq.${userId}`)
        .limit(1)
        .maybeSingle();

      if (allowRow && allowRow.is_active) {
        return {
          authorized: true,
          status: 200,
          method: 'server_allowlist_db',
          userId,
          email: verifiedUser.email || undefined,
        };
      }
    } catch {
      // Falha fechada em erro de consulta
    }
  }

  const escalationEvt = siemEngine.logEvent({
    eventType: 'PRIVILEGE_ESCALATION_ATTEMPT',
    severity: 'CRITICAL',
    sourceIp: clientIp,
    userId,
    details: { route, attemptedEmail: email, reason: 'Authenticated non-admin user attempted admin access' },
  });
  void persistSecurityAuditEvent(escalationEvt, { route, actorEmail: email });

  return {
    authorized: false,
    status: 403,
    userId,
    email: verifiedUser.email || undefined,
    error: 'Acesso proibido: este usuário não pertence à lista de administradores do servidor.',
  };
}
