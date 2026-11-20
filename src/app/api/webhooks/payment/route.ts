import { NextRequest, NextResponse } from 'next/server';
import { TransactionManager } from '@/lib/transactions';
import { analytics } from '@/lib/analytics';
import { siemEngine } from '@/lib/siemEngine';
import '@/lib/auditLogger';
import { getClientIp } from '@/lib/rateLimiter';
import { constantTimeEqualStrings } from '@/lib/signedAccessToken';

const STRIPE_TOLERANCE_SECONDS = 300;

async function computeHmacSha256Hex(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await globalThis.crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyStripeWebhookSignature(
  signatureHeader: string | null,
  rawBody: string,
  secret: string
): Promise<{ valid: boolean; reason?: string }> {
  if (!signatureHeader) {
    return { valid: false, reason: 'Missing stripe-signature header' };
  }

  const parts = signatureHeader.split(',').map((p) => p.trim());
  let timestampStr: string | null = null;
  const v1Signatures: string[] = [];

  for (const part of parts) {
    const eqIdx = part.indexOf('=');
    if (eqIdx <= 0) continue;
    const k = part.slice(0, eqIdx).trim();
    const v = part.slice(eqIdx + 1).trim();
    if (k === 't') timestampStr = v;
    if (k === 'v1') v1Signatures.push(v);
  }

  if (!timestampStr || v1Signatures.length === 0) {
    return { valid: false, reason: 'Malformed stripe-signature header' };
  }

  const timestampSec = Number(timestampStr);
  if (!Number.isFinite(timestampSec)) {
    return { valid: false, reason: 'Invalid stripe timestamp' };
  }

  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - timestampSec) > STRIPE_TOLERANCE_SECONDS) {
    return { valid: false, reason: 'Expired stripe webhook timestamp' };
  }

  const signedPayload = `${timestampStr}.${rawBody}`;
  const expectedHmac = await computeHmacSha256Hex(signedPayload, secret);

  const anyMatch = v1Signatures.some((sig) =>
    constantTimeEqualStrings(sig.toLowerCase(), expectedHmac.toLowerCase())
  );
  if (!anyMatch) {
    return { valid: false, reason: 'Invalid stripe HMAC signature' };
  }

  return { valid: true };
}

function rejectWebhook(sourceIp: string, reason: string, status = 401, extra?: Record<string, unknown>) {
  siemEngine.logEvent({
    eventType: 'WEBHOOK_REJECTED',
    severity: status === 401 || status === 403 ? 'CRITICAL' : 'HIGH',
    sourceIp,
    details: {
      route: '/api/webhooks/payment',
      reason,
      ...extra,
    },
  });
  return NextResponse.json({ success: false, error: reason }, { status });
}

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);

  try {
    const rawBody = await req.text();
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ success: false, error: 'Payload JSON inválido' }, { status: 400 });
    }

    // 1. Simulação exclusiva de desenvolvimento local (bloqueada em produção)
    if (body.action === 'simulate_confirmation' && body.transactionId) {
      if (process.env.NODE_ENV === 'production') {
        return rejectWebhook(
          clientIp,
          'Simulações de pagamento desativadas em ambiente de produção por segurança.',
          403
        );
      }

      const eventId = `sim_${body.transactionId}`;
      if (await TransactionManager.isEventProcessedAsync(eventId)) {
        return NextResponse.json({
          success: true,
          duplicate: true,
          message: 'Evento já processado anteriormente (idempotência preservada).',
        });
      }

      const existingTx = await TransactionManager.getAsync(body.transactionId);
      if (!existingTx) {
        return rejectWebhook(clientIp, 'Transação simulada inexistente.', 404, {
          txId: body.transactionId,
        });
      }

      const claimed = await TransactionManager.tryClaimWebhookEventAsync(eventId, 'simulated', existingTx.id);
      if (!claimed) {
        return NextResponse.json({
          success: true,
          duplicate: true,
          message: 'Evento já processado anteriormente (idempotência preservada).',
        });
      }

      const confirmedTx = await TransactionManager.confirmAsync(existingTx.id, 'simulated');
      analytics.track('subscription_activated', { provider: 'simulated', plan: confirmedTx?.planId });

      return NextResponse.json({
        success: true,
        message: 'Webhook simulado com sucesso: Pagamento Pix Confirmado!',
        transaction: confirmedTx,
      });
    }

    // 2. Webhook Oficial Asaas
    if (body.event && body.payment) {
      const asaasToken = req.headers.get('asaas-access-token') || '';
      const expectedToken = (
        process.env.ASAAS_WEBHOOK_SECRET ||
        process.env.ASAAS_WEBHOOK_TOKEN ||
        ''
      ).trim();
      const mustVerifyAsaas = process.env.NODE_ENV === 'production' || Boolean(expectedToken);

      if (mustVerifyAsaas) {
        if (!expectedToken || !asaasToken || !constantTimeEqualStrings(asaasToken, expectedToken)) {
          return rejectWebhook(clientIp, 'Assinatura de webhook Asaas não autorizada.', 401, {
            provider: 'asaas',
          });
        }
      }

      const { event, payment } = body;
      const txId = payment.externalReference || payment.id;
      const eventId = body.id || `asaas_${txId}_${event}`;
      console.log(`[Asaas Webhook] Evento recebido: ${event} para pagamento ${txId} (EventID: ${eventId})`);

      if (await TransactionManager.isEventProcessedAsync(eventId)) {
        return NextResponse.json({
          success: true,
          duplicate: true,
          message: 'Asaas: Evento já processado anteriormente (idempotência preservada).',
        });
      }

      if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') {
        const existingTx = await TransactionManager.getAsync(txId);
        if (!existingTx) {
          return rejectWebhook(clientIp, 'Transação Asaas não encontrada para liberação.', 404, {
            provider: 'asaas',
            txId,
            eventId,
          });
        }

        if (existingTx.status === 'confirmed') {
          await TransactionManager.tryClaimWebhookEventAsync(eventId, 'asaas', existingTx.id);
          return NextResponse.json({
            success: true,
            duplicate: true,
            message: 'Asaas: Evento já processado anteriormente (idempotência preservada).',
          });
        }

        if (existingTx.status !== 'pending_payment') {
          return rejectWebhook(clientIp, `Transação Asaas em estado inválido (${existingTx.status}).`, 400, {
            provider: 'asaas',
            txId,
            status: existingTx.status,
          });
        }

        const paidValue = Number(payment.value);
        if (!Number.isFinite(paidValue) || paidValue + 0.01 < existingTx.amount) {
          return rejectWebhook(
            clientIp,
            `Valor pago (${paidValue}) inferior ao valor oficial do plano (${existingTx.amount}).`,
            400,
            { provider: 'asaas', txId, paidValue, expectedAmount: existingTx.amount }
          );
        }

        const claimed = await TransactionManager.tryClaimWebhookEventAsync(eventId, 'asaas', existingTx.id, {
          event,
          paidValue,
        });
        if (!claimed) {
          return NextResponse.json({
            success: true,
            duplicate: true,
            message: 'Asaas: Evento já processado anteriormente (idempotência preservada).',
          });
        }

        const confirmedTx = await TransactionManager.confirmAsync(existingTx.id, 'asaas', payment.id);
        analytics.track('subscription_activated', { provider: 'asaas', plan: confirmedTx?.planId });

        return NextResponse.json({
          success: true,
          message: 'Asaas: Pagamento confirmado e acesso liberado!',
          transactionId: existingTx.id,
        });
      }

      await TransactionManager.tryClaimWebhookEventAsync(eventId, 'asaas', txId, { event });
      return NextResponse.json({ success: true, message: `Evento ${event} registrado` });
    }

    // 3. Webhook Oficial Stripe (HMAC-SHA256 `t=...,v1=...`)
    if (body.type && body.data?.object) {
      const stripeSig = req.headers.get('stripe-signature');
      const expectedStripeSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
      const mustVerifyStripe = process.env.NODE_ENV === 'production' || Boolean(expectedStripeSecret);

      if (mustVerifyStripe) {
        if (!expectedStripeSecret) {
          return rejectWebhook(clientIp, 'STRIPE_WEBHOOK_SECRET não configurado em produção.', 401, {
            provider: 'stripe',
          });
        }
        const sigCheck = await verifyStripeWebhookSignature(stripeSig, rawBody, expectedStripeSecret);
        if (!sigCheck.valid) {
          return rejectWebhook(clientIp, 'Assinatura de webhook Stripe não autorizada.', 401, {
            provider: 'stripe',
            reasonDetail: sigCheck.reason,
          });
        }
      }

      const eventType = body.type;
      const session = body.data.object;
      const txId = session.client_reference_id || session.metadata?.transactionId || session.id;
      const eventId = body.id || `stripe_${session.id}_${eventType}`;
      console.log(`[Stripe Webhook] Evento recebido: ${eventType} para sessão ${session.id} (EventID: ${eventId})`);

      if (await TransactionManager.isEventProcessedAsync(eventId)) {
        return NextResponse.json({
          success: true,
          duplicate: true,
          message: 'Stripe: Evento já processado anteriormente (idempotência preservada).',
        });
      }

      if (eventType === 'checkout.session.completed' || eventType === 'payment_intent.succeeded') {
        const existingTx = await TransactionManager.getAsync(txId);
        if (!existingTx) {
          return rejectWebhook(clientIp, 'Transação Stripe não encontrada para liberação.', 404, {
            provider: 'stripe',
            txId,
            eventId,
          });
        }

        if (existingTx.status === 'confirmed') {
          await TransactionManager.tryClaimWebhookEventAsync(eventId, 'stripe', existingTx.id);
          return NextResponse.json({
            success: true,
            duplicate: true,
            message: 'Stripe: Evento já processado anteriormente (idempotência preservada).',
          });
        }

        if (existingTx.status !== 'pending_payment') {
          return rejectWebhook(clientIp, `Transação Stripe em estado inválido (${existingTx.status}).`, 400, {
            provider: 'stripe',
            txId,
            status: existingTx.status,
          });
        }

        const rawCents = session.amount_total ?? session.amount_received;
        if (rawCents === undefined || rawCents === null) {
          return rejectWebhook(clientIp, 'Valor pago ausente no payload Stripe.', 400, {
            provider: 'stripe',
            txId,
          });
        }
        const paidAmount = Number(rawCents) / 100;
        if (!Number.isFinite(paidAmount) || paidAmount + 0.01 < existingTx.amount) {
          return rejectWebhook(
            clientIp,
            `Valor pago no Stripe (${paidAmount}) inferior ao valor da transação (${existingTx.amount}).`,
            400,
            { provider: 'stripe', txId, paidAmount, expectedAmount: existingTx.amount }
          );
        }

        const claimed = await TransactionManager.tryClaimWebhookEventAsync(eventId, 'stripe', existingTx.id, {
          eventType,
          paidAmount,
        });
        if (!claimed) {
          return NextResponse.json({
            success: true,
            duplicate: true,
            message: 'Stripe: Evento já processado anteriormente (idempotência preservada).',
          });
        }

        const confirmedTx = await TransactionManager.confirmAsync(existingTx.id, 'stripe', session.id);
        analytics.track('subscription_activated', { provider: 'stripe', plan: confirmedTx?.planId });

        return NextResponse.json({
          success: true,
          message: 'Stripe: Pagamento confirmado!',
          transactionId: existingTx.id,
        });
      }

      await TransactionManager.tryClaimWebhookEventAsync(eventId, 'stripe', txId, { eventType });
      return NextResponse.json({ success: true, message: `Evento ${eventType} registrado` });
    }

    return NextResponse.json({ success: false, error: 'Formato de webhook não reconhecido' }, { status: 400 });
  } catch (error: any) {
    console.error('Erro no processamento do webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao processar webhook de pagamento.' },
      { status: 500 }
    );
  }
}
