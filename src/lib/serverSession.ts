import { getSupabase, getSupabaseServiceRole, isSupabaseConfigured } from './supabase';
import { verifySignedAccessCookie } from './signedAccessToken';
import { assertServerAdmin } from './adminAuth';
import { SubscriptionPlan } from './types';

export interface ServerUserSession {
  authenticated: boolean;
  userId?: string;
  email?: string;
  plan: SubscriptionPlan;
  isPaid: boolean;
  isAdmin: boolean;
}

const PAID_PLANS = new Set<string>(['lancamento', 'pro', 'elite', 'black']);

function parseCookie(cookieHeader: string | null, names: string[]): string | null {
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
 * Resolve de forma autoritativa (server-only) a identidade e o plano ativo do usuário.
 * Nunca confia em `body.userPlan`, `body.role` ou `localStorage`.
 */
export async function resolveServerUserSession(
  req: Request,
  route = '/api'
): Promise<ServerUserSession> {
  const authHeader = req.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const cookieHeader = req.headers.get('cookie');
  const sessionToken =
    bearerToken ||
    parseCookie(cookieHeader, ['argus-session', 'learning-ai-session', 'sb-access-token']);

  // 1. Verifica se é administrador autenticado no servidor
  const adminCheck = await assertServerAdmin(req, route);
  if (adminCheck.authorized) {
    return {
      authenticated: true,
      userId: adminCheck.userId,
      email: adminCheck.email,
      plan: 'black',
      isPaid: true,
      isAdmin: true,
    };
  }

  let userId: string | undefined;
  let email: string | undefined;
  let authenticated = false;
  let plan: SubscriptionPlan = 'aspirante';
  let isPaid = false;

  // 2. Valida JWT real no Supabase + consulta assinatura real em `public.profiles`
  if (sessionToken && isSupabaseConfigured()) {
    const client = getSupabaseServiceRole() || getSupabase();
    if (client) {
      try {
        const { data, error } = await client.auth.getUser(sessionToken);
        if (!error && data?.user) {
          authenticated = true;
          userId = data.user.id;
          email = data.user.email || undefined;

          const serviceClient = getSupabaseServiceRole() || client;
          const { data: profile } = await serviceClient
            .from('profiles')
            .select('subscription_tier, subscription_status')
            .eq('id', data.user.id)
            .maybeSingle();

          if (
            profile &&
            profile.subscription_status === 'active' &&
            profile.subscription_tier &&
            PAID_PLANS.has(profile.subscription_tier)
          ) {
            plan = profile.subscription_tier as SubscriptionPlan;
            isPaid = true;
          }
        }
      } catch {
        // Falha fechada
      }
    }
  }

  // 3. Fallback adicional: cookie HMAC-SHA256 assinado pelo backend pós-pagamento
  if (!isPaid) {
    const signedCookieVal = parseCookie(cookieHeader, [
      'argus_user_access',
      'learning_ai_user_access',
    ]);
    if (signedCookieVal) {
      const verified = await verifySignedAccessCookie(signedCookieVal);
      if (verified && PAID_PLANS.has(verified.planId)) {
        // Se autenticado, exige correspondência de userId quando presente no cookie
        if (!userId || !verified.userId || verified.userId === userId) {
          plan = verified.planId as SubscriptionPlan;
          isPaid = true;
          if (verified.userId && !userId) {
            userId = verified.userId;
          }
        }
      }
    }
  }

  return {
    authenticated,
    userId,
    email,
    plan,
    isPaid,
    isAdmin: false,
  };
}
