import { Question } from '@/lib/types';

export function buildGeneratedAIQuestion(
  aiBanca: 'Cebraspe' | 'FGV' | 'FCC' | 'Vunesp',
  aiSubject: string
): Question {
  if (aiBanca === 'Cebraspe') {
    return {
      id: `ai-gen-${Date.now()}`,
      subjectId: 'sub-ai',
      subjectName: aiSubject,
      topicId: 'top-ai',
      topicName: `${aiSubject} — Tópico Preditivo`,
      banca: 'Cebraspe',
      year: 2026,
      institution: 'Inédita por IA',
      statement: `Julgue o item subsequente à luz da jurisprudência consolidada dos Tribunais Superiores e da ordem constitucional vigente:\n\nA nulidade decorrente da ausência de intimação do investigado para prestar esclarecimentos prévios à instauração formal de processo disciplinar administrativo possui natureza absoluta, invalidando ab initio qualquer ato punitivo subsequente, independentemente de demonstração de prejuízo concreto à ampla defesa.`,
      codeCitation: 'Súmula Vinculante 5 do STF e Princípio do Pas de Nullité Sans Grief',
      options: [
        { id: 'opt-c', text: 'CERTO', isCorrect: false, distractorReason: 'Achar que qualquer falta procedimental prévia acarreta nulidade absoluta automática.' },
        { id: 'opt-e', text: 'ERRADO', isCorrect: true },
      ],
      explanation: `GABARITO: ERRADO. No direito processual e administrativo sancionador, vige o princípio pás de nullité sans grief (não há nulidade sem prejuízo). Ademais, a fase prévia de sindicância ou investigação preliminar possui natureza meramente inquisitorial, na qual não é obrigatório o contraditório prévio pleno (Súmula Vinculante 5 do STF e jurisprudência pacificada do STJ).`,
      lawArticles: ['Súmula Vinculante 5/STF', 'Art. 5º, LV da CF/88'],
      cognitiveAnalysis: {
        commonTrap: 'O Cebraspe adora afirmar categoricamente "possui natureza absoluta e prescinde de demonstração de prejuízo". Quase sempre que o Cebraspe usa termos absolutos em nulidades administrativas, o item está ERRADO.',
        keyConcept: 'Natureza inquisitorial da investigação preliminar e necessidade de prova de prejuízo.',
        bancaTendency: 'Cobrança da relativização das nulidades formais pela banca examinadora.',
      },
    };
  }

  if (aiBanca === 'FGV') {
    return {
      id: `ai-gen-${Date.now()}`,
      subjectId: 'sub-ai',
      subjectName: aiSubject,
      topicId: 'top-ai',
      topicName: `${aiSubject} — Caso Hipotético FGV`,
      banca: 'FGV',
      year: 2026,
      institution: 'Inédita por IA',
      statement: `Determinada concessionária de serviço público federal celebrou aditivo contratual para reequilíbrio econômico-financeiro em razão de oscilações cambiais extraordinárias e imprevisíveis decorrentes de conflito geopolítico internacional. O Tribunal de Contas da União (TCU) expediu medida cautelar monocrática determinando a imediata retenção de pagamentos das faturas mensais devidas à concessionária.\n\nInconformada, a empresa contratada impetrou Mandado de Segurança perante o Supremo Tribunal Federal.\n\nCom base na jurisprudência vinculante do STF e no regime jurídico das concessões de serviço público, assinale a opção correta:`,
      codeCitation: 'Súmula Vinculante 3 do STF e Art. 71 da CF/88',
      options: [
        { id: 'opt-a', text: 'O TCU possui competência cautelar implícita para determinar retenções patrimoniais cautelares sem prévio contraditório quando demonstrado perigo de dano irreparável ao erário.', isCorrect: true },
        { id: 'opt-b', text: 'A decisão do TCU é nula, visto que a Corte de Contas não integra o Poder Judiciário e é desprovida de qualquer poder geral de cautela constitucional.', isCorrect: false },
        { id: 'opt-c', text: 'O mandado de segurança deveria ter sido impetrado perante o Superior Tribunal de Justiça, órgão competente para atos do TCU.', isCorrect: false },
        { id: 'opt-d', text: 'O reequilíbrio econômico-financeiro por variação cambial é vedado em qualquer hipótese pelas normas gerais de direito financeiro.', isCorrect: false },
        { id: 'opt-e', text: 'A retenção de pagamentos exige prévia autorização judicial do juiz federal da seção judiciária da sede da concessionária.', isCorrect: false },
      ],
      explanation: `GABARITO: A. O STF fixou (MS 24.510 e MS 26.547) que o Tribunal de Contas da União possui PODER GERAL DE CAUTELA com assento implícito no art. 71 da CF/88 (Teoria dos Poderes Implícitos), podendo determinar medidas cautelares inaudita altera parte para resguardar o erário contra danos irreparáveis.`,
      lawArticles: ['Art. 71 da CF/88', 'MS 24.510/STF'],
      cognitiveAnalysis: {
        commonTrap: 'Assumir que por não ser Judiciário, o Tribunal de Contas não pode deferir cautelares restritivas.',
        keyConcept: 'Poder Geral de Cautela do Tribunal de Contas da União e Teoria dos Poderes Implícitos.',
        bancaTendency: 'A FGV constrói enunciados com conflitos entre direito regulatório, contratos administrativos e controle externo.',
      },
    };
  }

  return {
    id: `ai-gen-${Date.now()}`,
    subjectId: 'sub-ai',
    subjectName: aiSubject,
    topicId: 'top-ai',
    topicName: `${aiSubject} — Literalidade FCC`,
    banca: aiBanca,
    year: 2026,
    institution: 'Inédita por IA',
    statement: `Nos termos da Nova Lei de Licitações e Contratos Administrativos (Lei nº 14.133/2021), a vigência dos contratos de serviços e fornecimentos contínuos poderá ser prorrogada sucessivamente, respeitada a vigência máxima decenal (10 anos), desde que:`,
    codeCitation: 'Art. 106 e Art. 107 da Lei 14.133/2021',
    options: [
      { id: 'opt-a', text: 'Haja autorização expressa do Tribunal de Contas respectivo em cada exercício financeiro.', isCorrect: false },
      { id: 'opt-b', text: 'A autoridade competente ateste que as condições e os preços permanecem vantajosos para a Administração, permitida a negociação com o contratado.', isCorrect: true },
      { id: 'opt-c', text: 'O valor total acumulado não ultrapasse 20% do orçamento anual do órgão licitante.', isCorrect: false },
      { id: 'opt-d', text: 'O contratado seja microempresa ou empresa de pequeno porte sediada no local da prestação.', isCorrect: false },
      { id: 'opt-e', text: 'O prazo inicial de contratação tenha sido de no mínimo 60 meses ininterruptos.', isCorrect: false },
    ],
    explanation: `GABARITO: B. Conforme o Art. 106 e 107 da Lei nº 14.133/2021, a prorrogação sucessiva de contratos de serviços e fornecimentos contínuos até o limite de 10 anos depende de atesto da autoridade de que os preços e condições permanecem vantajosos, admitida expressamente a negociação contratual.`,
    lawArticles: ['Art. 106 da Lei 14.133/2021', 'Art. 107 da Lei 14.133/2021'],
    cognitiveAnalysis: {
      commonTrap: 'Confundir o regramento antigo da Lei 8.666/93 (limite de 60 meses + 12 extraordinários) com a nova regra decenal (até 10 anos da Lei 14.133).',
      keyConcept: 'Duração dos contratos de serviços contínuos na Lei 14.133.',
      bancaTendency: 'A FCC cobra com rigor literal as novidades da Nova Lei de Licitações.',
    },
  };
}
