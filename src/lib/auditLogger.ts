import { getSupabaseServiceRole, isSupabaseServiceRoleConfigured } from './supabase';
import { logger } from './logger';
import { SiemEvent, siemEngine } from './siemEngine';

const HIGH_RISK_PERSISTENT_EVENTS = new Set([
  'AUTH_FAILED',
  'BRUTE_FORCE_DETECTED',
  'PRIVILEGE_ESCALATION_ATTEMPT',
  'WEBHOOK_REJECTED',
  'CHECKOUT_ABUSE',
  'IP_JAILED',
  'CAPTCHA_FAILED',
  'SQLI_ATTEMPT',
  'XSS_ATTEMPT',
  'CSRF_VIOLATION',
  'WAF_IP_BANNED',
]);

/**
 * Persiste eventos críticos de segurança no Supabase (`public.security_audit_logs`)
 * e emite alerta estruturado sanitizado via `logger`.
 */
export async function persistSecurityAuditEvent(
  event: SiemEvent,
  extra?: { route?: string; actorEmail?: string }
): Promise<void> {
  if (HIGH_RISK_PERSISTENT_EVENTS.has(event.eventType) || event.severity === 'HIGH' || event.severity === 'CRITICAL') {
    const context = {
      eventId: event.id,
      eventType: event.eventType,
      severity: event.severity,
      sourceIp: event.sourceIp,
      userId: event.userId,
      actorEmail: extra?.actorEmail,
      route: extra?.route,
      ...event.details,
    };

    if (event.severity === 'CRITICAL') {
      logger.error(`SECURITY_AUDIT:${event.eventType}`, undefined, context);
    } else {
      logger.warn(`SECURITY_AUDIT:${event.eventType}`, context);
    }
  }

  // Não executa persistência Supabase dentro de Edge Runtime puro
  if (typeof (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime !== 'undefined') {
    return;
  }

  if (!isSupabaseServiceRoleConfigured()) {
    return;
  }

  const client = getSupabaseServiceRole();
  if (!client) return;

  try {
    await client.from('security_audit_logs').insert({
      id: event.id,
      event_type: event.eventType,
      severity: event.severity,
      source_ip: event.sourceIp,
      user_id: event.userId || null,
      actor_email: extra?.actorEmail || null,
      route: extra?.route || null,
      details: event.details || {},
      created_at: event.timestamp,
    });
  } catch {
    // Nunca quebra a requisição principal se o log assíncrono falhar
  }
}

// Registra persistência automática no Supabase para todo evento emitido no runtime Node.js
if (typeof (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime === 'undefined') {
  siemEngine.setPersistenceHook((event) => persistSecurityAuditEvent(event));
}
