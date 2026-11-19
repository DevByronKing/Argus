import { VadeMecumArticle } from '@/lib/types';

export interface TrapChallenge {
  id: string;
  diploma: string;
  numberStr: string;
  topic: string;
  banca: string;
  adulteratedText: string;
  trapWord: string;
  originalWord: string;
  explanation: string;
  frequency: string;
}

export const TRAP_CHALLENGES: TrapChallenge[] = [
  {
    id: 'trap-1',
    diploma: 'CF/88',
    numberStr: 'Art. 5º, XLII',
    topic: 'Direitos e Garantias Fundamentais',
    banca: 'Cebraspe',
    adulteratedText: 'A prática do racismo constitui crime inafiançável e PRESCRITÍVEL, sujeito à pena de reclusão, nos termos da lei.',
    trapWord: 'PRESCRITÍVEL',
    originalWord: 'imprescritível',
    explanation: 'Pegadinha clássica do Cebraspe e FGV! O racismo é INAFIANÇÁVEL e IMPRESCRITÍVEL (Art. 5º, XLII, CF/88). A banca retirou o prefixo "im" para induzir ao erro em leitura desatenta.',
    frequency: '92% de incidência',
  },
  {
    id: 'trap-2',
    diploma: 'Lei 8.112/90',
    numberStr: 'Art. 13, § 1º',
    topic: 'Regime Jurídico dos Servidores',
    banca: 'FGV',
    adulteratedText: 'A posse ocorrerá no prazo de QUINZE dias contados da publicação do ato de provimento no Diário Oficial.',
    trapWord: 'QUINZE',
    originalWord: 'trinta (30)',
    explanation: 'A FGV troca frequentemente os prazos de posse e exercício! A posse ocorre em até 30 (trinta) dias contados da publicação. Já o exercício ocorre no prazo de 15 (quinze) dias após a posse.',
    frequency: '88% de incidência',
  },
  {
    id: 'trap-3',
    diploma: 'Lei 14.230/21 (LIA)',
    numberStr: 'Art. 1º, § 1º',
    topic: 'Improbidade Administrativa',
    banca: 'FCC',
    adulteratedText: 'Consideram-se atos de improbidade administrativa as condutas dolosas ou CULPOSAS tipificadas nos artigos 9º, 10 e 11 desta Lei.',
    trapWord: 'CULPOSAS',
    originalWord: 'exclusivamente dolosas (com dolo específico)',
    explanation: 'Com a Nova LIA (Lei 14.230/21), foi EXTINTA a modalidade culposa em qualquer ato de improbidade. Agora exige-se SEMPRE dolo específico com comprovação de fim ilícito!',
    frequency: '95% de incidência',
  },
  {
    id: 'trap-4',
    diploma: 'Lei 8.213/91',
    numberStr: 'Art. 15, II',
    topic: 'Previdenciário (Período de Graça)',
    banca: 'Cebraspe',
    adulteratedText: 'Mantém a qualidade de segurado, independentemente de contribuições, até SEIS meses após a cessação das contribuições, o segurado empregado que deixar de exercer atividade remunerada.',
    trapWord: 'SEIS',
    originalWord: '12 (doze)',
    explanation: 'Para o segurado obrigatório que cessa as contribuições, o período de graça básico é de 12 (doze) meses, e NÃO 6 meses. O prazo de 6 meses aplica-se exclusivamente ao segurado facultativo (Art. 15, IV).',
    frequency: '84% de incidência',
  },
  {
    id: 'trap-5',
    diploma: 'Lei 14.133/21',
    numberStr: 'Art. 28',
    topic: 'Nova Lei de Licitações',
    banca: 'Vunesp / FGV',
    adulteratedText: 'São modalidades de licitação: pregão, concorrência, concurso, leilão, diálogo competitivo e TOMADA de preços.',
    trapWord: 'TOMADA',
    originalWord: 'extinta na nova lei',
    explanation: 'A Lei 14.133/21 extinguiu expressamente as modalidades "Tomada de Preços" e "Convite", inserindo o "Diálogo Competitivo". As bancas inserem Tomada de Preços para reprovar quem estuda por material antigo!',
    frequency: '91% de incidência',
  },
];

export interface ArticleMissedQuestion {
  id: string;
  banca: 'FGV' | 'Cebraspe' | 'FCC' | 'Vunesp';
  exam: string;
  year: number;
  snippet: string;
  userChose: string;
  correctAnswer: string;
  distractorType: string;
  explanation: string;
}

export const SAMPLE_MISSED_QUESTIONS: Record<string, ArticleMissedQuestion[]> = {
  'vade-1': [
    {
      id: 'mq-5-1',
      banca: 'FGV',
      exam: 'Exame de Ordem OAB 40º',
      year: 2024,
      snippet: 'Sobre a dissolução compulsória de associações, a assertiva afirmava ser bastante decisão administrativa fundamentada.',
      userChose: 'Opção B (Basta ato administrativo com contraditório)',
      correctAnswer: 'Opção D (Exige decisão judicial transitada em julgado - Art. 5º, XIX)',
      distractorType: 'Inversão de Requisito Constitucional',
      explanation: 'A FGV frequentemente testa a diferença entre suspensão (decisão judicial simples) e dissolução compulsória (somente com trânsito em julgado).',
    },
    {
      id: 'mq-5-2',
      banca: 'Cebraspe',
      exam: 'Polícia Rodoviária Federal (PRF)',
      year: 2023,
      snippet: 'Ingresso forçado em domicílio durante o período noturno em hipótese de flagrante delito sem mandado.',
      userChose: 'Errado (Marcou que à noite exige sempre mandado judicial)',
      correctAnswer: 'Certo (Em caso de flagrante ou desastre, pode entrar de dia ou de noite - Art. 5º, XI)',
      distractorType: 'Generalização Indevida de Horário',
      explanation: 'A regra do mandado judicial é apenas durante o dia. Em flagrante delito, desastre ou socorro, o ingresso independe do consentimento a qualquer hora.',
    },
    {
      id: 'mq-5-3',
      banca: 'FGV',
      exam: 'Auditor Fiscal da Receita Estadual',
      year: 2023,
      snippet: 'Direito de reunião pacífica em locais abertos ao público e a exigência de aviso prévio.',
      userChose: 'Opção A (Exige autorização prévia da autoridade competente)',
      correctAnswer: 'Opção C (Independe de autorização, exigindo apenas prévio aviso - Art. 5º, XVI)',
      distractorType: 'Troca de Vocabulário Normativo (Autorização x Aviso)',
      explanation: 'O STF pacificou que o aviso prévio não é condição de validade absoluta quando a autoridade já tiver conhecimento por outros meios.',
    },
    {
      id: 'mq-5-4',
      banca: 'Cebraspe',
      exam: 'Auditor Federal de Controle Externo (TCU)',
      year: 2023,
      snippet: 'Imprescritibilidade e inafiançabilidade da prática do racismo e ação de grupos armados.',
      userChose: 'Errado (Confundiu prescrição com graça/anistia)',
      correctAnswer: 'Certo (Racismo é inafiançável e imprescritível - Art. 5º, XLII)',
      distractorType: 'Armadilha de Rótulos Penais',
      explanation: 'Memorize o mnemônico RA-GA: Racismo e Ação de Grupos Armados são os únicos IMPRESCRITÍVEIS.',
    },
  ],
  'vade-2': [
    {
      id: 'mq-8112-1',
      banca: 'FGV',
      exam: 'Analista Judiciário - TRT',
      year: 2024,
      snippet: 'Prazos legais para posse e entrada em exercício após nomeação em cargo público efetivo.',
      userChose: 'Opção C (Posse em 15 dias e exercício em 30 dias)',
      correctAnswer: 'Opção A (Posse em até 30 dias da publicação; exercício em até 15 dias da posse)',
      distractorType: 'Inversão Numérica de Prazos',
      explanation: 'Pegadinha clássica da FGV invertendo os números 30 e 15 da Lei 8.112/90.',
    },
    {
      id: 'mq-8112-2',
      banca: 'Cebraspe',
      exam: 'Técnico Administrativo - INSS',
      year: 2022,
      snippet: 'Consequência jurídica quando o candidato nomeado não toma posse no prazo legal.',
      userChose: 'Certo (Marcou que o servidor será exonerado do cargo)',
      correctAnswer: 'Errado (O ato de provimento é tornado SEM EFEITO, pois posse ainda não ocorreu)',
      distractorType: 'Falsa Equivalência de Institutos',
      explanation: 'Só há exoneração se houve posse mas não houve exercício. Se nem tomou posse, o ato é tornado sem efeito.',
    },
  ],
  'vade-3': [
    {
      id: 'mq-37-1',
      banca: 'FGV',
      exam: 'TJ-SP - Escrevente Técnico Judiciário',
      year: 2023,
      snippet: 'Hipóteses constitucionais permitidas de acumulação remunerada de cargos públicos.',
      userChose: 'Opção B (Dois cargos técnicos se houver compatibilidade)',
      correctAnswer: 'Opção D (Dois de professor, um de professor com outro técnico/científico, ou dois da saúde - Art. 37, XVI)',
      distractorType: 'Adição de Exceção Não Prevista',
      explanation: 'Não existe permissão para dois cargos técnicos puros; exige-se professor + técnico/científico.',
    },
    {
      id: 'mq-37-2',
      banca: 'FCC',
      exam: 'Analista Judiciário - TRF',
      year: 2023,
      snippet: 'Teto remuneratório constitucional e incidência sobre acumulações lícitas.',
      userChose: 'Opção A (Aplica-se sobre a soma total das duas remunerações)',
      correctAnswer: 'Opção C (O teto incide isoladamente sobre cada um dos vínculos - Tema 377 STF)',
      distractorType: 'Jurisprudência Superada',
      explanation: 'Nas acumulações lícitas, a remuneração de cada cargo é considerada isoladamente para fins de teto.',
    },
  ],
};

export function getMissedQuestionsForArticle(art: VadeMecumArticle): ArticleMissedQuestion[] {
  if (SAMPLE_MISSED_QUESTIONS[art.id]) {
    return SAMPLE_MISSED_QUESTIONS[art.id];
  }
  return [
    {
      id: `mq-${art.id}-1`,
      banca: 'FGV',
      exam: 'Concurso Nacional Unificado (CNU)',
      year: 2024,
      snippet: `Aplicação prática dos preceitos do ${art.numberStr} (${art.diploma}) em caso hipotético de atuação administrativa.`,
      userChose: 'Opção A (Induzido por exceção aparente)',
      correctAnswer: `Opção C (Aplicação literal do ${art.numberStr})`,
      distractorType: 'Distorção da Literalidade Legal',
      explanation: `A FGV cobrou a regra expressa de ${art.title}, testando se o candidato conhecia as restrições normativas do dispositivo.`,
    },
    {
      id: `mq-${art.id}-2`,
      banca: 'Cebraspe',
      exam: 'Polícia Federal (Escrivão)',
      year: 2023,
      snippet: `Interpretação restritiva versus extensiva dos efeitos do ${art.numberStr} da ${art.diploma}.`,
      userChose: 'Certo (Considerou a interpretação extensiva válida)',
      correctAnswer: 'Errado (O dispositivo exige interpretação estrita conforme a banca)',
      distractorType: 'Interpretação Hermenêutica Indevida',
      explanation: 'O Cebraspe explorou a literalidade estrita da norma para derrubar os candidatos que extrapolaram o texto da lei.',
    },
  ];
}

export function isCorrectWord(word: string, target: string): boolean {
  return word.toUpperCase() === target.toUpperCase();
}
