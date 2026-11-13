import { NextRequest, NextResponse } from 'next/server';
import { TransactionManager } from '@/lib/transactions';
import { PaymentGateway } from '@/lib/paymentGateways';
import { SubscriptionPlan } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      planId = 'pro', 
      billingCycle = 'annual', 
      paymentMethod = 'pix', 
      userEmail = 'aluno@argus.app.br', 
      userName = 'Concurseiro',
      cpfCnpj,
      customerCpf,
    } = body;

    // Tabela de Preços Unificada e Blindada
    const prices: Record<string, { name: string; monthly: number; trimestral: number; annual: number; vitalicio: number }> = {
      aspirante: { name: 'Aspirante (Gratuito)', monthly: 0, trimestral: 0, annual: 0, vitalicio: 0 },
      lancamento: { name: 'Oferta Fechada: Passe Até a Prova (Lote 1)', monthly: 97.00, trimestral: 97.00, annual: 97.00, vitalicio: 97.00 },
      pro: { name: 'Concurseiro PRO (Copiloto Cognitivo)', monthly: 99.00, trimestral: 252.45, annual: 588.00, vitalicio: 588.00 },
      elite: { name: 'Carreiras Elite & Discursivas com IA', monthly: 189.00, trimestral: 481.95, annual: 1068.00, vitalicio: 1068.00 },
      black: { name: 'Black Vitalício (Até a Posse)', monthly: 197.00, trimestral: 502.35, annual: 1497.00, vitalicio: 1497.00 },
    };

    const planConfig = prices[planId] || prices.pro;
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

    if (amount === 0) {
      return NextResponse.json({
        success: true,
        planId,
        status: 'confirmed',
        message: 'Plano gratuito ativado com sucesso!',
      });
    }

    // Gerar Cobrança Pix via Asaas ou EmvCo
    const pixData = await PaymentGateway.createPixCharge({
      planId,
      amount,
      userEmail,
      userName,
      cpfCnpj: cpfCnpj || customerCpf,
      description: `Argus - Assinatura ${planConfig.name} (${billingCycle === 'annual' ? 'Anual' : 'Mensal'})`,
    });

    // Registrar no TransactionManager
    await TransactionManager.createAsync({
      id: pixData.transactionId,
      planId: planId as SubscriptionPlan,
      billingCycle,
      amount,
      paymentMethod,
      status: 'pending_payment',
      pixCode: pixData.pixCopyPaste,
      qrCodeUrl: pixData.qrCodeUrl,
      provider: pixData.provider,
      userEmail,
      userName,
      createdAt: new Date().toISOString(),
      expiresAt: pixData.expiresAt,
    });

    return NextResponse.json({
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
  } catch (error: any) {
    console.error('Erro na API de checkout:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Falha ao processar checkout' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const txId = searchParams.get('txId');

    if (!txId) {
      return NextResponse.json({ success: false, error: 'txId é obrigatório' }, { status: 400 });
    }

    const tx = await TransactionManager.getAsync(txId);
    if (!tx) {
      return NextResponse.json({
        success: true,
        transactionId: txId,
        status: 'pending_payment', // Mantém polling se em modo mock
      });
    }

    return NextResponse.json({
      success: true,
      transactionId: tx.id,
      status: tx.status,
      planId: tx.planId,
      confirmedAt: tx.confirmedAt,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
