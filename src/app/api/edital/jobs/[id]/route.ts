import { NextResponse } from 'next/server';
import { AsyncJobManager } from '@/lib/queue/jobManager';
import { resolveServerUserSession } from '@/lib/serverSession';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await resolveServerUserSession(req, '/api/edital/jobs/[id]');
    if (process.env.NODE_ENV === 'production' && !session.authenticated && !session.isPaid) {
      return NextResponse.json(
        { success: false, code: 'UNAUTHORIZED', error: 'Autenticação necessária para consultar status do job.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const job = AsyncJobManager.getJob(id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job não encontrado ou expirado.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        status: job.status,
        progress: job.progressPercentage,
        message: job.currentStepMessage,
        createdAt: job.createdAt,
        completedAt: job.completedAt,
        result: job.result || null,
        error: job.error || null,
      },
    });
  } catch (error) {
    console.error('Erro em GET /api/edital/jobs/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno ao consultar status do job.' },
      { status: 500 }
    );
  }
}
