import { NextResponse } from 'next/server';
import { AsyncJobManager } from '@/lib/queue/jobManager';
import { assertServerAdmin } from '@/lib/adminAuth';
import { resolveServerUserSession } from '@/lib/serverSession';
import { checkDistributedRateLimit, getClientIp } from '@/lib/rateLimiter';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateCheck = await checkDistributedRateLimit({
      key: `edital_jobs:ip:${ip}`,
      limit: 10,
      windowMs: 60000,
      ip,
    });
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Muitas submissões de editais. Aguarde 1 minuto.' },
        { status: 429 }
      );
    }

    const session = await resolveServerUserSession(req, '/api/edital/jobs');
    if (process.env.NODE_ENV === 'production' && !session.isPaid) {
      return NextResponse.json(
        { success: false, code: 'PAYMENT_REQUIRED', error: 'Envio de editais exige assinatura ativa.' },
        { status: 402 }
      );
    }

    let body: Record<string, any>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Payload JSON inválido.' }, { status: 400 });
    }

    const examTitle = String(body.examTitle || 'Edital Analisado por IA').slice(0, 180);
    const role = String(body.role || 'Analista / Técnico').slice(0, 120);
    const banca = String(body.banca || 'Cebraspe').slice(0, 40);
    const salary = String(body.salary || 'R$ 8.520,00').slice(0, 40);
    const vacancies = Math.min(100000, Math.max(0, Number(body.vacancies) || 150));
    const editalText = String(body.editalText || '').slice(0, 50000);
    const pdfFileName = String(body.pdfFileName || 'Edital_Upload.pdf').slice(0, 160);

    const job = AsyncJobManager.createJob({
      examTitle,
      role,
      banca,
      salary,
      vacancies,
      editalText,
      pdfFileName,
    });

    return NextResponse.json({
      success: true,
      jobId: job.id,
      status: job.status,
      progress: job.progressPercentage,
      message: 'Edital enfileirado com sucesso para processamento em segundo plano.',
    });
  } catch (error) {
    console.error('Erro em POST /api/edital/jobs:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao enfileirar processamento do edital.' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const adminCheck = await assertServerAdmin(req, '/api/edital/jobs');
  if (!adminCheck.authorized) {
    return NextResponse.json(
      { success: false, error: 'Listagem global de jobs restrita a administradores.' },
      { status: adminCheck.status }
    );
  }

  const jobs = AsyncJobManager.getAllJobs();
  return NextResponse.json({
    success: true,
    total: jobs.length,
    jobs: jobs.slice(0, 20),
  });
}
