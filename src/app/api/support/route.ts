import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export interface SupportTicket {
  id: string;
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

// In-memory persistent ticket store for the running instance
let globalTickets: SupportTicket[] = [
  {
    id: 'ticket-1001',
    studentName: 'Mariana Duarte',
    studentEmail: 'mariana.duarte@gmail.com',
    studentPhone: '(91) 98122-3344',
    category: 'Dúvida no Edital',
    message: 'Gostaria de saber se o simulador de psicometria TRI já cobre todas as disciplinas do edital da OAB 1ª Fase 2026.',
    rating: 5,
    currentTab: 'edital',
    targetExam: 'OAB 1ª Fase (FGV)',
    status: 'aberto',
    prioritySla: 'alta_prioridade_1h',
    isPayingOrCommitted: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'ticket-1002',
    studentName: 'Rodrigo Medeiros',
    studentEmail: 'rodrigo.concurseiro@outlook.com',
    studentPhone: '(91) 98455-6677',
    category: 'Financeiro / Assinatura',
    message: 'Acabei de efetuar o pagamento do Passe R$ 97 via Pix e gostaria de confirmar a liberação do meu edital INSS.',
    rating: 5,
    currentTab: 'checkout',
    targetExam: 'INSS (Cebraspe)',
    status: 'em_atendimento',
    prioritySla: 'alta_prioridade_1h',
    isPayingOrCommitted: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    adminNotes: 'Comprovante Pix validado no Asaas, acesso ativo.',
  },
  {
    id: 'ticket-1003',
    studentName: 'Felipe Albuquerque',
    studentEmail: 'felipe.albuquerque@yahoo.com.br',
    studentPhone: '(11) 99123-4567',
    category: 'Sugestão de Funcionalidade',
    message: 'Seria excelente adicionar opção de exportar o Caderno de Erros diretamente para o Anki.',
    rating: 4,
    currentTab: 'mistakes',
    targetExam: 'PRF - Policial Rodoviário Federal',
    status: 'resolvido',
    prioritySla: 'normal_24h',
    isPayingOrCommitted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    adminNotes: 'Encaminhado para a equipe de produto na sprint de exportações.',
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    tickets: globalTickets,
    stats: {
      total: globalTickets.length,
      abertos: globalTickets.filter(t => t.status === 'aberto').length,
      emAtendimento: globalTickets.filter(t => t.status === 'em_atendimento').length,
      resolvidos: globalTickets.filter(t => t.status === 'resolvido').length,
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentName = 'Aluno Argus',
      studentEmail = 'aluno@argus.app.br',
      studentPhone = '',
      category = 'Dúvida Geral',
      message = '',
      rating = 5,
      currentTab = 'Geral',
      targetExam = 'Concurso Público',
      isPayingOrCommitted = false,
      prioritySla = isPayingOrCommitted ? 'alta_prioridade_1h' : 'normal_24h'
    } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Mensagem é obrigatória' }, { status: 400 });
    }

    const newTicket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim(),
      studentPhone: studentPhone.trim(),
      category,
      message: message.trim(),
      rating,
      currentTab,
      targetExam,
      status: 'aberto',
      prioritySla,
      isPayingOrCommitted: Boolean(isPayingOrCommitted),
      createdAt: new Date().toISOString(),
    };

    globalTickets = [newTicket, ...globalTickets];

    return NextResponse.json({
      success: true,
      ticket: newTicket,
      message: 'Chamado de suporte aberto com sucesso! Nossa equipe entrará em contato.'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticketId, status, adminNotes } = body;

    if (!ticketId) {
      return NextResponse.json({ success: false, error: 'ticketId é obrigatório' }, { status: 400 });
    }

    const ticket = globalTickets.find(t => t.id === ticketId);
    if (!ticket) {
      return NextResponse.json({ success: false, error: 'Chamado não encontrado' }, { status: 404 });
    }

    if (status) {
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
      message: 'Status do chamado atualizado com sucesso.'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
