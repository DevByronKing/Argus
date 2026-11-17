import { describe, it, expect, afterEach } from 'vitest';
import { POST as webhookHandler } from '@/app/api/webhooks/payment/route';
import { TransactionManager } from '@/lib/transactions';
import { NextRequest } from 'next/server';
import crypto from 'node:crypto';

describe('Regras Críticas de Negócio: Ciclo de Vida de Pagamento & Idempotência de Webhooks', () => {
  afterEach(() => {
    delete process.env.ASAAS_WEBHOOK_SECRET;
    delete process.env.STRIPE_WEBHOOK_SECRET;
  });
  it('deve processar webhook Asaas PAYMENT_RECEIVED e liberar acesso', async () => {
    const paymentId = `pay_test_${Date.now()}`;
    const txId = `tx_${Date.now()}`;

    // Pré-criar transação pendente
    TransactionManager.create({
      id: txId,
      planId: 'pro',
      billingCycle: 'annual',
      amount: 478.8,
      paymentMethod: 'pix',
      status: 'pending_payment',
      provider: 'asaas',
      userEmail: 'aluno@concurso.com',
      userName: 'Futuro Auditor',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    });

    const req = new NextRequest('http://localhost:3000/api/webhooks/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: `evt_asaas_${Date.now()}`,
        event: 'PAYMENT_RECEIVED',
        payment: {
          id: txId,
          value: 478.8,
          status: 'RECEIVED',
        },
      }),
    });

    const res = await webhookHandler(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.message).toContain('confirmado');

    // Transação deve estar com status confirmado
    const updatedTx = TransactionManager.get(txId);
    expect(updatedTx?.status).toBe('confirmed');
  });

  it('deve garantir idempotência estrita ao receber o mesmo evento Asaas repetido', async () => {
    const eventId = `evt_dup_${Date.now()}`;
    const txId = `tx_dup_${Date.now()}`;

    TransactionManager.create({
      id: txId,
      planId: 'pro',
      billingCycle: 'monthly',
      amount: 59.9,
      paymentMethod: 'pix',
      status: 'pending_payment',
      provider: 'asaas',
      userEmail: 'repetido@teste.com',
      userName: 'Candidato',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    });

    const makeRequest = () =>
      new NextRequest('http://localhost:3000/api/webhooks/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: eventId,
          event: 'PAYMENT_CONFIRMED',
          payment: {
            id: txId,
            value: 59.9,
          },
        }),
      });

    // 1º Envio
    const res1 = await webhookHandler(makeRequest());
    expect(res1.status).toBe(200);
    const data1 = await res1.json();
    expect(data1.duplicate).toBeUndefined();

    // 2º Envio com o MESMO eventId (simulando reenvio de rede da gateway)
    const res2 = await webhookHandler(makeRequest());
    expect(res2.status).toBe(200);
    const data2 = await res2.json();
    expect(data2.duplicate).toBe(true);
    expect(data2.message).toContain('idempotência');
  });

  it('deve rejeitar payload com formato de webhook desconhecido', async () => {
    const req = new NextRequest('http://localhost:3000/api/webhooks/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unknownField: 'valor_invalido',
      }),
    });

    const res = await webhookHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('não reconhecido');
  });

  it('deve rejeitar assinatura Asaas inválida com status 401', async () => {
    process.env.ASAAS_WEBHOOK_SECRET = 'segredo-asaas-super-forte-2026';

    const req = new NextRequest('http://localhost:3000/api/webhooks/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'asaas-access-token': 'token-forjado-atacante',
      },
      body: JSON.stringify({
        id: `evt_bad_asaas_${Date.now()}`,
        event: 'PAYMENT_RECEIVED',
        payment: { id: 'tx_inexistente', value: 97 },
      }),
    });

    const res = await webhookHandler(req);
    expect(res.status).toBe(401);
  });

  it('deve validar assinatura HMAC-SHA256 do Stripe, rejeitar inválida e barrar valor divergente', async () => {
    const stripeSecret = 'whsec_test_stripe_secret_key_2026';
    process.env.STRIPE_WEBHOOK_SECRET = stripeSecret;
    const txId = `tx_stripe_${Date.now()}`;

    TransactionManager.create({
      id: txId,
      planId: 'pro',
      billingCycle: 'annual',
      amount: 588.0,
      paymentMethod: 'card',
      status: 'pending_payment',
      provider: 'stripe',
      userEmail: 'stripe@teste.com',
      userName: 'Candidato Stripe',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
    });

    // 1. Assinatura Stripe inválida -> 401
    const badReq = new NextRequest('http://localhost:3000/api/webhooks/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': `t=${Math.floor(Date.now() / 1000)},v1=deadbeef`,
      },
      body: JSON.stringify({
        id: `evt_stripe_bad_${Date.now()}`,
        type: 'checkout.session.completed',
        data: { object: { id: 'cs_1', client_reference_id: txId, amount_total: 58800 } },
      }),
    });
    expect((await webhookHandler(badReq)).status).toBe(401);

    // 2. Valor inferior ao da transação -> 400
    const ts = Math.floor(Date.now() / 1000);
    const underpaidBody = JSON.stringify({
      id: `evt_stripe_under_${Date.now()}`,
      type: 'checkout.session.completed',
      data: { object: { id: 'cs_2', client_reference_id: txId, amount_total: 100 } }, // R$ 1,00 vs R$ 588,00
    });
    const underSig = crypto.createHmac('sha256', stripeSecret).update(`${ts}.${underpaidBody}`).digest('hex');
    const underReq = new NextRequest('http://localhost:3000/api/webhooks/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'stripe-signature': `t=${ts},v1=${underSig}` },
      body: underpaidBody,
    });
    expect((await webhookHandler(underReq)).status).toBe(400);
    expect(TransactionManager.get(txId)?.status).toBe('pending_payment');

    // 3. Assinatura válida + valor integral -> 200 e replay posterior -> duplicate: true
    const validEventId = `evt_stripe_ok_${Date.now()}`;
    const validBody = JSON.stringify({
      id: validEventId,
      type: 'checkout.session.completed',
      data: { object: { id: 'cs_3', client_reference_id: txId, amount_total: 58800 } },
    });
    const validSig = crypto.createHmac('sha256', stripeSecret).update(`${ts}.${validBody}`).digest('hex');
    const makeValidStripeReq = () =>
      new NextRequest('http://localhost:3000/api/webhooks/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'stripe-signature': `t=${ts},v1=${validSig}` },
        body: validBody,
      });

    const okRes = await webhookHandler(makeValidStripeReq());
    expect(okRes.status).toBe(200);
    expect(TransactionManager.get(txId)?.status).toBe('confirmed');

    const replayRes = await webhookHandler(makeValidStripeReq());
    expect(replayRes.status).toBe(200);
    expect((await replayRes.json()).duplicate).toBe(true);
  });
});
