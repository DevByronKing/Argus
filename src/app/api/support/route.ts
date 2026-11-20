import { NextRequest, NextResponse } from 'next/server';
import { assertServerAdmin } from '@/lib/adminAuth';
import { resolveServerUserSession } from '@/lib/serverSession';
import { checkDistributedRateLimit, getClientIp } from '@/lib/rateLimiter';
import { inspectSafeInput } from '@/lib/securitySanitizer';

export const dynamic = 'force-dynamic';

export interface SupportTicket {
  id: string;
  userId?: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  category: string;
  message: string;
  rating?: number;
  currentTab?: string;
  targetExam?: string;
  status: 'aberto' | 'em_atendimento' | 'resolvido';
  prioritySla: 'alta_prioridade_1h' | 'normal_24h' | 'baixa_48h';
  isPayingOrCommitted: boolean;
  createdAt: string;
  resolvedAt?: string;
  adminNotes?: string;
}

// Store em memória zerado (sem dados PII fictícios expostos)
let globalTickets: SupportTicket[] = [];
const MAX_TICKETS_MEMORY = 200;

export async function GET(req: NextRequest) {
  const adminCheck = await assertServerAdmin(req, '/api/support');

  if (adminCheck.authorized) {
    return NextResponse.json({
      success: true,
      tickets: globalTickets,
      stats: {
        total: globalTickets.length,
        abertos: globalTickets.filter((t) => t.status === 'aberto').length,
        emAtendimento: globalTickets.filter((t) => t.status === 'em_atendimento').length,
        resolvidos: globalTickets.filter((t) => t.status === 'resolvido').length,
      },
    });
  }

  // Usuário autenticado comum visualiza APENAS os próprios chamados (sem vazar PII ou notas internas)
  const session = await resolveServerUserSession(req, '/api/support');
  if (!session.authenticated || !session.email) {
    return NextResponse.json(
      { success: false, code: 'UNAUTHORIZED', error: 'Autenticação necessária para consultar chamados.' },
      { status: 401 }
    );
  }

  const ownTickets = globalTickets
    .filter(
      (t) =>
        (session.userId && t.userId === session.userId) ||
        t.studentEmail.toLowerCase() === session.email!.toLowerCase()
    )
    .map(({ adminNotes: _hidden, ...publicTicket }) => publicTicket);

  return NextResponse.json({
    success: true,
    tickets: ownTickets,
    stats: {
      total: ownTickets.length,
      abertos: ownTickets.filter((t) => t.status === 'aberto').length,
      emAtendimento: ownTickets.filter((t) => t.status === 'em_atendimento').length,
      resolvidos: ownTickets.filter((t) => t.status === 'resolvido').length,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = await checkDistributedRateLimit({
      key: `support:ip:${ip}`,
      limit: 5,
      windowMs: 60000,
      ip,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, code: 'RATE_LIMIT_EXCEEDED', error: 'Muitos chamados enviados em sequência. Aguarde 1 minuto.' },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Payload JSON inválido.' }, { status: 400 });
    }

    const safety = inspectSafeInput(body);
    if (!safety.isSafe) {
      return NextResponse.json(
        { success: false, code: 'PAYLOAD_UNSAFE', error: `Conteúdo rejeitado por segurança (${safety.threatType}).` },
        { status: 400 }
      );
    }

    const session = await resolveServerUserSession(req, '/api/support');
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : '';
    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Descreva sua solicitação com pelo menos 5 caracteres.' },
        { status: 400 }
      );
    }

    const studentName =
      typeof body.studentName === 'string' && body.studentName.trim()
        ? body.studentName.trim().slice(0, 100)
        : 'Aluno Argus';
    const studentEmail =
      session.email ||
      (typeof body.studentEmail === 'string' && body.studentEmail.includes('@')
        ? body.studentEmail.trim().toLowerCase().slice(0, 120)
        : '');

    if (!studentEmail) {
      return NextResponse.json(
        { success: false, error: 'Informe um e-mail válido para retorno do suporte.' },
        { status: 400 }
      );
    }

    // SLA e status pagante são derivados exclusivamente da sessão verificada no servidor
    const isPaying = session.isPaid;
    const prioritySla: SupportTicket['prioritySla'] = isPaying ? 'alta_prioridade_1h' : 'normal_24h';

    const newTicket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      userId: session.userId,
      studentName,
      studentEmail,
      studentPhone: typeof body.studentPhone === 'string' ? body.studentPhone.trim().slice(0, 25) : '',
      category: typeof body.category === 'string' ? body.category.trim().slice(0, 60) : 'Dúvida Geral',
      message,
      rating: typeof body.rating === 'number' ? Math.min(5, Math.max(1, Math.round(body.rating))) : 5,
      currentTab: typeof body.currentTab === 'string' ? body.currentTab.trim().slice(0, 40) : 'Geral',
      targetExam: typeof body.targetExam === 'string' ? body.targetExam.trim().slice(0, 100) : 'Concurso Público',
      status: 'aberto',
      prioritySla,
      isPayingOrCommitted: isPaying,
      createdAt: new Date().toISOString(),
    };

    globalTickets = [newTicket, ...globalTickets].slice(0, MAX_TICKETS_MEMORY);

    return NextResponse.json({
      success: true,
      ticket: newTicket,
      message: 'Chamado de suporte aberto com sucesso! Nossa equipe entrará em contato.',
    });
  } catch (error) {
    console.error('Erro ao criar chamado de suporte:', error);
    return NextResponse.json({ success: false, error: 'Falha interna ao abrir chamado.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminCheck = await assertServerAdmin(req, '/api/support');
    if (!adminCheck.authorized) {
      return NextResponse.json(
        { success: false, error: adminCheck.error || 'Acesso administrativo negado.' },
        { status: adminCheck.status }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Payload JSON inválido.' }, { status: 400 });
    }

    const ticketId = typeof body.ticketId === 'string' ? body.ticketId.trim() : '';
    const status = body.status;
    const adminNotes = typeof body.adminNotes === 'string' ? body.adminNotes.trim().slice(0, 1000) : undefined;

    if (!ticketId) {
      return NextResponse.json({ success: false, error: 'ticketId é obrigatório' }, { status: 400 });
    }

    const ticket = globalTickets.find((t) => t.id === ticketId);
    if (!ticket) {
      return NextResponse.json({ success: false, error: 'Chamado não encontrado' }, { status: 404 });
    }

    if (status === 'aberto' || status === 'em_atendimento' || status === 'resolvido') {
      ticket.status = status;
      if (status === 'resolvido') {
        ticket.resolvedAt = new Date().toISOString();
      }
    }

    if (adminNotes !== undefined) {
      ticket.adminNotes = adminNotes;
    }

    return NextResponse.json({
      success: true,
      ticket,
      message: 'Chamado atualizado com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    return NextResponse.json({ success: false, error: 'Falha interna ao atualizar chamado.' }, { status: 500 });
  }
}
