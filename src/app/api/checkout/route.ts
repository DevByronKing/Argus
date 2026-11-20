import { NextRequest, NextResponse } from 'next/server';
import { TransactionManager } from '@/lib/transactions';
import { PaymentGateway } from '@/lib/paymentGateways';
import { SubscriptionPlan } from '@/lib/types';
import { isFreemiumAllowed } from '@/lib/abTesting';
import { measureLatency } from '@/lib/logger';
import { getSupabase, getSupabaseServiceRole, isSupabaseConfigured } from '@/lib/supabase';
import { checkDualRateLimit, getClientIp } from '@/lib/rateLimiter';
import { verifyTurnstileToken } from '@/lib/captcha';
import { siemEngine } from '@/lib/siemEngine';
import '@/lib/auditLogger';
import {
  constantTimeEqualStrings,
  getCookieSigningSecret,
  signAccessCookiePayload,
} from '@/lib/signedAccessToken';

export const dynamic = 'force-dynamic';

async function getAuthenticatedRequestUser(req: NextRequest): Promise<{ id: string; email?: string } | null> {
  if (!isSupabaseConfigured()) return null;

  const authHeader = req.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const cookieToken =
    req.cookies.get('argus-session')?.value ||
    req.cookies.get('learning-ai-session')?.value ||
    req.cookies.get('sb-access-token')?.value ||
    null;

  const token = bearerToken || cookieToken;
  if (!token) return null;

  const client = getSupabaseServiceRole() || getSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client.auth.getUser(token);
    if (error || !data?.user) return null;
    return {
      id: data.user.id,
      email: data.user.email || undefined,
    };
  } catch {
    return null;
  }
}

async function signPollingToken(txId: string): Promise<string> {
  const secret = getCookieSigningSecret() || 'argus-poll-ephemeral';
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await globalThis.crypto.subtle.sign('HMAC', key, enc.encode(txId));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${txId}.${hex}`;
}

async function verifyPollingToken(cookieVal: string | undefined, expectedTxId: string): Promise<boolean> {
  if (!cookieVal) return false;
  const expected = await signPollingToken(expectedTxId);
  return constantTimeEqualStrings(cookieVal, expected);
}

export async function POST(req: NextRequest) {
  return measureLatency('/api/checkout', async () => {
    try {
      const clientIp = getClientIp(req);
      let body: Record<string, any>;
      try {
        body = await req.json();
      } catch {
        return NextResponse.json(
          { success: false, error: 'Payload JSON inválido.' },
          { status: 400 }
        );
      }

      const {
        planId = 'pro',
        billingCycle = 'annual',
        paymentMethod = 'pix',
        userEmail = 'aluno@argus.app.br',
        userName = 'Concurseiro',
        cpfCnpj,
        customerCpf,
        turnstileToken,
        captchaToken,
      } = body;

      const verifiedUser = await getAuthenticatedRequestUser(req);
      const effectiveEmail = (verifiedUser?.email || String(userEmail || '')).trim().toLowerCase();

      // 1. Rate Limit distribuído duplo por IP e por e-mail/usuário (perfil 'checkout': 5 req/min)
      const rateCheck = await checkDualRateLimit({
        ip: clientIp,
        identifier: verifiedUser?.id || effectiveEmail,
        profile: 'checkout',
        namespace: 'checkout',
      });

      if (!rateCheck.allowed) {
        siemEngine.logEvent({
          eventType: 'CHECKOUT_ABUSE',
          severity: 'HIGH',
          sourceIp: clientIp,
          userId: verifiedUser?.id,
          details: { route: '/api/checkout', scope: rateCheck.scope || 'ip', planId },
        });
        const retryAfter = Math.max(1, Math.ceil((rateCheck.resetTime - Date.now()) / 1000));
        return NextResponse.json(
          {
            success: false,
            code: 'CHECKOUT_RATE_LIMIT',
            error: 'Muitas tentativas de checkout em sequência. Aguarde antes de tentar novamente.',
            retryAfterSeconds: retryAfter,
          },
          { status: 429, headers: { 'Retry-After': String(retryAfter) } }
        );
      }

      // 2. Exige sessão autenticada real OU verificação anti-bot Cloudflare Turnstile (trava criação em massa anônima)
      if (!verifiedUser) {
        const captchaCheck = await verifyTurnstileToken({
          token: turnstileToken || captchaToken || body['cf-turnstile-response'],
          remoteIp: clientIp,
        });

        if (!captchaCheck.valid) {
          siemEngine.logEvent({
            eventType: 'CHECKOUT_ABUSE',
            severity: 'HIGH',
            sourceIp: clientIp,
            details: {
              route: '/api/checkout',
              reason: captchaCheck.code || 'CAPTCHA_REQUIRED',
              attemptedEmail: effectiveEmail,
            },
          });
          return NextResponse.json(
            {
              success: false,
              code: captchaCheck.code || 'CHECKOUT_AUTH_OR_CAPTCHA_REQUIRED',
              error: captchaCheck.error || 'Faça login ou conclua a verificação anti-bot para iniciar o pagamento.',
            },
            { status: captchaCheck.code === 'CAPTCHA_REQUIRED' ? 400 : 403 }
          );
        }
      }

      // 3. Tabela de Preços Unificada e Blindada no servidor (ignora qualquer amount/status do cliente)
      const prices: Record<string, { name: string; monthly: number; trimestral: number; annual: number; vitalicio: number }> = {
        aspirante: { name: 'Visitante (Sem Assinatura Ativa)', monthly: 0, trimestral: 0, annual: 0, vitalicio: 0 },
        lancamento: { name: 'Oferta Fechada: Passe Até a Prova (Lote 1)', monthly: 97.00, trimestral: 97.00, annual: 97.00, vitalicio: 97.00 },
        pro: { name: 'Concurseiro PRO (Copiloto Cognitivo)', monthly: 99.00, trimestral: 252.45, annual: 588.00, vitalicio: 588.00 },
        elite: { name: 'Carreiras Elite & Discursivas com IA', monthly: 189.00, trimestral: 481.95, annual: 1068.00, vitalicio: 1068.00 },
        black: { name: 'Black Vitalício (Até a Posse)', monthly: 197.00, trimestral: 502.35, annual: 1497.00, vitalicio: 1497.00 },
      };

      const planConfig = prices[planId];
      if (!planConfig) {
        return NextResponse.json(
          { success: false, code: 'INVALID_PLAN', error: 'Plano selecionado não encontrado no catálogo oficial.' },
          { status: 400 }
        );
      }

      let amount = planConfig.monthly;
      if (planId === 'lancamento') {
        amount = 97.00;
      } else if (billingCycle === 'annual' || billingCycle === 'anual') {
        amount = planConfig.annual;
      } else if (billingCycle === 'trimestral') {
        amount = planConfig.trimestral;
      } else if (billingCycle === 'vitalicio') {
        amount = planConfig.vitalicio;
      } else {
        amount = planConfig.monthly;
      }

      // Cupons oficiais validados estritamente no servidor (nunca acumula no Passe R$ 97)
      const SERVER_COUPONS: Record<string, number> = {
        LANCAMENTO20: 20,
        ARGUS15: 15,
        APROVACAO10: 10,
      };
      const rawCoupon = typeof body.couponCode === 'string' ? body.couponCode.trim().toUpperCase() : '';
      const serverDiscountPercent =
        planId !== 'lancamento' && rawCoupon && SERVER_COUPONS[rawCoupon]
          ? SERVER_COUPONS[rawCoupon]
          : 0;
      if (serverDiscountPercent > 0) {
        amount = Math.round(amount * (1 - serverDiscountPercent / 100) * 100) / 100;
      }

      if (!isFreemiumAllowed() && (planId === 'aspirante' || amount <= 0)) {
        return NextResponse.json(
          {
            success: false,
            code: 'PAID_PLAN_REQUIRED',
            error: 'O acesso gratuito (Freemium) foi desativado. Selecione Passe Até a Prova (R$ 97), PRO, ELITE ou BLACK para continuar.',
          },
          { status: 400 }
        );
      }

      // Garante e-mail minimamente válido
      if (!effectiveEmail || !effectiveEmail.includes('@')) {
        return NextResponse.json(
          { success: false, code: 'INVALID_EMAIL', error: 'Informe um e-mail válido para emissão da cobrança.' },
          { status: 400 }
        );
      }

      // Gerar Cobrança Pix via Asaas ou EmvCo (sem bypass em produção quando gateway falhar)
      const pixData = await PaymentGateway.createPixCharge({
        planId,
        amount,
        userEmail: effectiveEmail,
        userName: String(userName || 'Concurseiro').slice(0, 120),
        cpfCnpj: cpfCnpj || customerCpf,
        description: `Argus - Assinatura ${planConfig.name} (${billingCycle === 'annual' || billingCycle === 'anual' ? 'Anual' : 'Mensal'})`,
      });

      const normalizedBillingCycle: 'monthly' | 'annual' =
        billingCycle === 'monthly' || billingCycle === 'mensal' ? 'monthly' : 'annual';

      await TransactionManager.createAsync({
        id: pixData.transactionId,
        userId: verifiedUser?.id,
        planId: planId as SubscriptionPlan,
        billingCycle: normalizedBillingCycle,
        amount,
        paymentMethod: paymentMethod === 'card' ? 'card' : 'pix',
        status: 'pending_payment',
        pixCode: pixData.pixCopyPaste,
        qrCodeUrl: pixData.qrCodeUrl,
        provider: pixData.provider,
        userEmail: effectiveEmail,
        userName: String(userName || 'Concurseiro').slice(0, 120),
        createdAt: new Date().toISOString(),
        expiresAt: pixData.expiresAt,
      });

      const response = NextResponse.json({
        success: true,
        transactionId: pixData.transactionId,
        planName: planConfig.name,
        amount,
        billingCycle,
        paymentMethod,
        provider: pixData.provider,
        pix: {
          copyPasteCode: pixData.pixCopyPaste,
          qrCodeUrl: pixData.qrCodeUrl,
          expiresAt: pixData.expiresAt,
        },
        status: 'pending_payment',
      });

      const signedPoll = await signPollingToken(pixData.transactionId);
      response.cookies.set('argus_checkout_tx', signedPoll, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hora para polling de pagamento
        path: '/',
      });

      return response;
    } catch (error: any) {
      console.error('Erro na API de checkout:', error);
      const safeClientMsg =
        typeof error?.message === 'string' &&
        (error.message.includes('CPF') || error.message.includes('Gateway') || error.message.includes('Asaas'))
          ? error.message
          : 'Falha ao processar checkout. Tente novamente em instantes.';
      return NextResponse.json(
        { success: false, error: safeClientMsg },
        { status: safeClientMsg.includes('CPF') ? 400 : 503 }
      );
    }
  });
}

export async function GET(req: NextRequest) {
  return measureLatency('/api/checkout', async () => {
    try {
      const { searchParams } = new URL(req.url);
      const txId = searchParams.get('txId');

      if (!txId) {
        return NextResponse.json({ success: false, error: 'txId é obrigatório' }, { status: 400 });
      }

      let tx = await TransactionManager.getAsync(txId);

      // Caso o Serverless tenha sofrido cold start mas o paymentId seja uma cobrança oficial Asaas (pay_...)
      if (!tx && txId.startsWith('pay_')) {
        const verifiedUser = await getAuthenticatedRequestUser(req);
        const pollCookie = req.cookies.get('argus_checkout_tx')?.value;
        const hasValidPollCookie = await verifyPollingToken(pollCookie, txId);
        if (!hasValidPollCookie && !verifiedUser) {
          return NextResponse.json(
            { success: false, code: 'FORBIDDEN_TX_ACCESS', error: 'Acesso não autorizado a esta transação.' },
            { status: 403 }
          );
        }
        const liveStatus = await PaymentGateway.checkAsaasPaymentStatus(txId);
        return NextResponse.json({
          success: true,
          transactionId: txId,
          status: liveStatus,
        });
      }

      if (!tx) {
        return NextResponse.json(
          { success: false, code: 'TRANSACTION_NOT_FOUND', error: 'Transação não encontrada.' },
          { status: 404 }
        );
      }

      const verifiedUser = await getAuthenticatedRequestUser(req);
      const pollCookie = req.cookies.get('argus_checkout_tx')?.value;
      const hasValidPollCookie = await verifyPollingToken(pollCookie, tx.id);

      const isOwner = Boolean(
        hasValidPollCookie ||
          (verifiedUser &&
            ((tx.userId && tx.userId === verifiedUser.id) ||
              (verifiedUser.email && verifiedUser.email.toLowerCase() === tx.userEmail.toLowerCase())))
      );

      if (!isOwner) {
        return NextResponse.json(
          { success: false, code: 'FORBIDDEN_TX_ACCESS', error: 'Acesso não autorizado a esta transação.' },
          { status: 403 }
        );
      }

      // Se ainda consta como pendente localmente, consulta em tempo real no Asaas para cobrir latência de webhook
      if (tx.status !== 'confirmed' && (tx.provider === 'asaas' || tx.id.startsWith('pay_'))) {
        const liveStatus = await PaymentGateway.checkAsaasPaymentStatus(tx.id);
        if (liveStatus === 'confirmed') {
          const confirmedTx = await TransactionManager.confirmAsync(tx.id);
          if (confirmedTx) tx = confirmedTx;
        }
      }

      const response = NextResponse.json({
        success: true,
        transactionId: tx.id,
        status: tx.status,
        planId: tx.planId,
        confirmedAt: tx.confirmedAt,
      });

      if (tx.status === 'confirmed') {
        const signedAccess = await signAccessCookiePayload({
          status: 'ativa',
          isPayingOrCommitted: true,
          planId: tx.planId,
          userId: tx.userId,
        });
        if (signedAccess) {
          response.cookies.set('argus_user_access', signedAccess, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60,
            path: '/',
          });
        }
      }

      return response;
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  });
}
