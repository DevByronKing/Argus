import { NextResponse } from 'next/server';
import { assertServerAdmin } from '@/lib/adminAuth';
import { getSupabaseServiceRole, isSupabaseServiceRoleConfigured } from '@/lib/supabase';
import { siemEngine } from '@/lib/siemEngine';

export async function GET(req: Request) {
  const adminCheck = await assertServerAdmin(req, '/api/admin/audit-logs');
  if (!adminCheck.authorized) {
    return NextResponse.json(
      { success: false, error: adminCheck.error || 'Acesso administrativo negado.' },
      { status: adminCheck.status }
    );
  }

  let dbLogs: any[] = [];
  if (isSupabaseServiceRoleConfigured()) {
    const client = getSupabaseServiceRole();
    if (client) {
      const { data } = await client
        .from('security_audit_logs')
        .select('id, event_type, severity, source_ip, user_id, actor_email, route, details, created_at')
        .order('created_at', { ascending: false })
        .limit(50);
      if (Array.isArray(data)) {
        dbLogs = data;
      }
    }
  }

  return NextResponse.json({
    success: true,
    verifiedBy: adminCheck.method,
    adminEmail: adminCheck.email,
    dbLogs,
    liveEvents: siemEngine.getEvents().slice(0, 50),
    activeAlerts: siemEngine.getAlerts(),
  });
}
