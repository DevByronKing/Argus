import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as unsubscribeGet } from '@/app/api/auth/unsubscribe/route';
import { POST as logoutPost } from '@/app/api/auth/logout/route';
import { GET as supportGet, PATCH as supportPatch } from '@/app/api/support/route';
import { POST as welcomeEmailPost } from '@/app/api/welcome-email/route';
import { GET as editalJobsGet } from '@/app/api/edital/jobs/route';
import { POST as renewalNoticePost } from '@/app/api/subscription/renewal-notice/route';
import { GET as inactivityGet } from '@/app/api/retention/inactivity-check/route';
import { POST as webhookPost } from '@/app/api/webhooks/payment/route';
import { TransactionManager } from '@/lib/transactions';

describe('Suite de Blindagem Pós-Auditoria (Hardening Front + Back)', () => {
  const originalAsaasSecret = process.env.ASAAS_WEBHOOK_SECRET;
  const originalAsaasToken = process.env.ASAAS_WEBHOOK_TOKEN;

  beforeEach(() => {
    delete process.env.ASAAS_WEBHOOK_SECRET;
    delete process.env.ASAAS_WEBHOOK_TOKEN;
  });

  afterEach(() => {
    if (originalAsaasSecret !== undefined) process.env.ASAAS_WEBHOOK_SECRET = originalAsaasSecret;
    else delete process.env.ASAAS_WEBHOOK_SECRET;
    if (originalAsaasToken !== undefined) process.env.ASAAS_WEBHOOK_TOKEN = originalAsaasToken;
    else delete process.env.ASAAS_WEBHOOK_TOKEN;
  });

  it('1. Bloqueia XSS / HTML Injection no /api/auth/unsubscribe', async () => {
    const req = new Request(
      'http://localhost:3000/api/auth/unsubscribe?email=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E@test.com'
    );
    const res = await unsubscribeGet(req);
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).not.toContain('<img');
    expect(html).not.toContain('onerror=');
  });

  it('2. Bloqueia vazamento de PII e alteração não autenticada em /api/support', async () => {
    const getRes = await supportGet(new NextRequest('http://localhost:3000/api/support'));
    expect(getRes.status).toBe(401);

    const patchRes = await supportPatch(
      new NextRequest('http://localhost:3000/api/support', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId: 'ticket-1', status: 'resolvido', adminNotes: 'hacked' }),
      })
    );
    expect([401, 403]).toContain(patchRes.status);
  });

  it('3. Bloqueia Open Email Relay anônimo em /api/welcome-email', async () => {
    const res = await welcomeEmailPost(
      new Request('http://localhost:3000/api/welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'vitima@example.com', name: 'Spam' }),
      })
    );
    expect(res.status).toBe(401);
  });

  it('4. Logout limpa todos os cookies de sessão e acesso pago (argus_user_access)', async () => {
    const res = await logoutPost();
    const setCookieHeader = res.headers.get('set-cookie') || '';
    expect(res.status).toBe(200);
    expect(setCookieHeader).toContain('argus-session=');
    expect(setCookieHeader).toContain('argus_user_access=');
    expect(setCookieHeader).toContain('argus_checkout_tx=');
  });

  it('5. Bloqueia listagem global de jobs de editais e rotas operacionais sem autenticação', async () => {
    const jobsRes = await editalJobsGet(new Request('http://localhost:3000/api/edital/jobs'));
    expect([401, 403]).toContain(jobsRes.status);

    const renewalRes = await renewalNoticePost(
      new Request('http://localhost:3000/api/subscription/renewal-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: 'test@example.com' }),
      })
    );
    expect([401, 403]).toContain(renewalRes.status);

    const inactRes = await inactivityGet(new Request('http://localhost:3000/api/retention/inactivity-check'));
    expect(inactRes.status).toBe(401);
  });

  it('6. Webhook Asaas aceita ASAAS_WEBHOOK_TOKEN (compatibilidade Vercel) e rejeita token inválido', async () => {
    process.env.ASAAS_WEBHOOK_TOKEN = 'whsec_argus_test_token_2026';
    const txId = `tx_audit_${Date.now()}`;
    await TransactionManager.createAsync({
      id: txId,
      planId: 'pro',
      billingCycle: 'monthly',
      amount: 99,
      paymentMethod: 'pix',
      status: 'pending_payment',
      provider: 'asaas',
      userEmail: 'audit@argus.app.br',
      userName: 'Audit',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 600000).toISOString(),
    });

    const badRes = await webhookPost(
      new NextRequest('http://localhost:3000/api/webhooks/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'asaas-access-token': 'wrong_token',
        },
        body: JSON.stringify({
          id: `evt_bad_${Date.now()}`,
          event: 'PAYMENT_RECEIVED',
          payment: { id: txId, value: 99 },
        }),
      })
    );
    expect(badRes.status).toBe(401);

    const okRes = await webhookPost(
      new NextRequest('http://localhost:3000/api/webhooks/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'asaas-access-token': 'whsec_argus_test_token_2026',
        },
        body: JSON.stringify({
          id: `evt_ok_${Date.now()}`,
          event: 'PAYMENT_RECEIVED',
          payment: { id: txId, value: 99 },
        }),
      })
    );
    expect(okRes.status).toBe(200);
  });
});
