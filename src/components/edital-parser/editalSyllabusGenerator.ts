import { ExamNotice, ExamSubject } from '@/lib/types';

export const getExamArea = (exam: ExamNotice): string => {
  const combined = (exam.title + ' ' + exam.institution + ' ' + exam.role).toLowerCase();
  if (combined.includes('tribunal') || combined.includes('tj') || combined.includes('trt') || combined.includes('trf')) return 'Tribunais';
  if (combined.includes('polic') || combined.includes('pf') || combined.includes('prf') || combined.includes('depen')) return 'Policial';
  if (combined.includes('fiscal') || combined.includes('sefaz') || combined.includes('receita') || combined.includes('iss')) return 'Fiscal';
  if (combined.includes('oab') || combined.includes('advoga')) return 'Jurídica / OAB';
  return 'Geral / Administrativo';
};

export const generateSyllabusByArea = (
  title: string,
  role: string,
  rawText: string
): ExamSubject[] => {
  const combined = (title + ' ' + role + ' ' + rawText).toLowerCase();

  if (
    combined.includes('polic') ||
    combined.includes('prf') ||
    combined.includes('pf') ||
    combined.includes('seguranc') ||
    combined.includes('penal') ||
    combined.includes('agente') ||
    combined.includes('escriv') ||
    combined.includes('delegad')
  ) {
    return [
      {
        id: `sub-${Date.now()}-1`,
        name: 'Direito Penal & Legislação Especial Extravagante',
        weight: 3,
        relevancePercentage: 40,
        totalTopics: 4,
        topics: [
          { id: 't-pol-1', name: 'Crimes Contra o Patrimônio e a Administração Pública', frequencyInBanca: 'Alta', accuracyRate: 52, status: 'Ponto Cego', articlesOrLaws: ['Arts. 155-180, 312-327 do CP'] },
          { id: 't-pol-2', name: 'Lei de Drogas (Lei 11.343/06) & Tráfico Privilegiado', frequencyInBanca: 'Alta', accuracyRate: 75, status: 'Dominado', articlesOrLaws: ['Lei 11.343/06'] },
          { id: 't-pol-3', name: 'Estatuto do Desarmamento & Posse/Porte de Arma', frequencyInBanca: 'Alta', accuracyRate: 64, status: 'Instável', articlesOrLaws: ['Lei 10.826/03'] },
          { id: 't-pol-4', name: 'Abuso de Autoridade & Pacote Anticrime', frequencyInBanca: 'Média', accuracyRate: 48, status: 'Ponto Cego', articlesOrLaws: ['Lei 13.869/19', 'Lei 13.964/19'] },
        ],
      },
      {
        id: `sub-${Date.now()}-2`,
        name: 'Direito Processual Penal & Perícia',
        weight: 3,
        relevancePercentage: 30,
        totalTopics: 3,
        topics: [
          { id: 't-pol-5', name: 'Inquérito Policial (Características e Sigilo)', frequencyInBanca: 'Alta', accuracyRate: 80, status: 'Dominado', articlesOrLaws: ['Arts. 4º a 23 do CPP'] },
          { id: 't-pol-6', name: 'Prisão em Flagrante, Preventiva e Liberdade Provisória', frequencyInBanca: 'Alta', accuracyRate: 55, status: 'Instável', articlesOrLaws: ['Arts. 310-313 do CPP'] },
          { id: 't-pol-7', name: 'Cadeia de Custódia e Teoria Geral das Provas', frequencyInBanca: 'Alta', accuracyRate: 40, status: 'Ponto Cego', articlesOrLaws: ['Art. 158-A do CPP'] },
        ],
      },
      {
        id: `sub-${Date.now()}-3`,
        name: combined.includes('prf') ? 'Legislação de Trânsito (CTB)' : 'Informática Aplicada & Segurança Cibernética',
        weight: 2,
        relevancePercentage: 18,
        totalTopics: 2,
        topics: [
          { id: 't-pol-8', name: combined.includes('prf') ? 'Normas Gerais de Circulação e Conduta no CTB' : 'Redes de Comunicação, Ransomware e Criptografia', frequencyInBanca: 'Alta', accuracyRate: 60, status: 'Instável', articlesOrLaws: combined.includes('prf') ? ['Arts. 26 a 67 do CTB'] : undefined },
          { id: 't-pol-9', name: combined.includes('prf') ? 'Crimes de Trânsito e Embriaguez ao Volante' : 'Bancos de Dados, SQL e Python Básico', frequencyInBanca: 'Média', accuracyRate: 70, status: 'Dominado', articlesOrLaws: combined.includes('prf') ? ['Art. 306 do CTB'] : undefined },
        ],
      },
      {
        id: `sub-${Date.now()}-4`,
        name: 'Língua Portuguesa & Redação Oficial',
        weight: 1,
        relevancePercentage: 12,
        totalTopics: 2,
        topics: [
          { id: 't-pol-10', name: 'Interpretação e Inferência Textual (Padrão da Banca)', frequencyInBanca: 'Alta', accuracyRate: 65, status: 'Instável' },
          { id: 't-pol-11', name: 'Sintaxe de Concordância, Regência e Crase', frequencyInBanca: 'Alta', accuracyRate: 85, status: 'Dominado' },
        ],
      },
    ];
  }

  if (
    combined.includes('fiscal') ||
    combined.includes('receita') ||
    combined.includes('tribut') ||
    combined.includes('sefaz') ||
    combined.includes('iss') ||
    combined.includes('auditor')
  ) {
    return [
      {
        id: `sub-${Date.now()}-1`,
        name: 'Direito Tributário & Sistema Constitucional Tributário',
        weight: 3,
        relevancePercentage: 35,
        totalTopics: 3,
        topics: [
          { id: 't-fis-1', name: 'Competência Tributária e Limitações ao Poder de Tributar', frequencyInBanca: 'Alta', accuracyRate: 58, status: 'Instável', articlesOrLaws: ['Arts. 145 a 156 da CF/88'] },
          { id: 't-fis-2', name: 'Obrigação Tributária e Hipótese de Incidência', frequencyInBanca: 'Alta', accuracyRate: 72, status: 'Dominado', articlesOrLaws: ['Arts. 113 a 127 do CTN'] },
          { id: 't-fis-3', name: 'Suspensão, Extinção e Exclusão do Crédito Tributário', frequencyInBanca: 'Alta', accuracyRate: 44, status: 'Ponto Cego', articlesOrLaws: ['Arts. 151 a 182 do CTN'] },
        ],
      },
      {
        id: `sub-${Date.now()}-2`,
        name: 'Contabilidade Geral & Avançada',
        weight: 3,
        relevancePercentage: 35,
        totalTopics: 3,
        topics: [
          { id: 't-fis-4', name: 'Pronunciamento Técnico CPC 00 (Estrutura Conceitual)', frequencyInBanca: 'Alta', accuracyRate: 46, status: 'Ponto Cego' },
          { id: 't-fis-5', name: 'Balanço Patrimonial e Avaliação de Investimentos', frequencyInBanca: 'Alta', accuracyRate: 68, status: 'Instável' },
          { id: 't-fis-6', name: 'Demonstração dos Fluxos de Caixa (DFC) e DVA', frequencyInBanca: 'Média', accuracyRate: 82, status: 'Dominado' },
        ],
      },
      {
        id: `sub-${Date.now()}-3`,
        name: 'Auditoria & Legislação Tributária Aduaneira',
        weight: 2,
        relevancePercentage: 18,
        totalTopics: 2,
        topics: [
          { id: 't-fis-7', name: 'Procedimentos de Auditoria e Testes Substantivos', frequencyInBanca: 'Alta', accuracyRate: 60, status: 'Instável' },
          { id: 't-fis-8', name: 'Infrações e Penalidades Fiscais Aduaneiras', frequencyInBanca: 'Média', accuracyRate: 50, status: 'Ponto Cego' },
        ],
      },
      {
        id: `sub-${Date.now()}-4`,
        name: 'Língua Portuguesa & RLM',
        weight: 1,
        relevancePercentage: 12,
        totalTopics: 2,
        topics: [
          { id: 't-fis-9', name: 'Lógica Proposicional e Equivalências Lógicas', frequencyInBanca: 'Alta', accuracyRate: 70, status: 'Instável' },
          { id: 't-fis-10', name: 'Coesão Textual e Reescritura de Frases', frequencyInBanca: 'Alta', accuracyRate: 88, status: 'Dominado' },
        ],
      },
    ];
  }

  if (
    combined.includes('tribunal') ||
    combined.includes('tj') ||
    combined.includes('trt') ||
    combined.includes('trf') ||
    combined.includes('tre') ||
    combined.includes('judic') ||
    combined.includes('oab') ||
    combined.includes('direito')
  ) {
    return [
      {
        id: `sub-${Date.now()}-1`,
        name: 'Direito Processual Civil (CPC/2015)',
        weight: 3,
        relevancePercentage: 35,
        totalTopics: 3,
        topics: [
          { id: 't-jud-1', name: 'Tutelas Provisórias de Urgência e Evidência', frequencyInBanca: 'Alta', accuracyRate: 48, status: 'Ponto Cego', articlesOrLaws: ['Arts. 294 a 311 do CPC'] },
          { id: 't-jud-2', name: 'Atos Processuais, Prazos e Citações', frequencyInBanca: 'Alta', accuracyRate: 75, status: 'Dominado', articlesOrLaws: ['Arts. 212 a 250 do CPC'] },
          { id: 't-jud-3', name: 'Sistema Recursal: Apelação e Agravo de Instrumento', frequencyInBanca: 'Alta', accuracyRate: 58, status: 'Instável', articlesOrLaws: ['Arts. 994 a 1.044 do CPC'] },
        ],
      },
      {
        id: `sub-${Date.now()}-2`,
        name: 'Direito Constitucional Aplicado',
        weight: 2,
        relevancePercentage: 25,
        totalTopics: 2,
        topics: [
          { id: 't-jud-4', name: 'Controle de Constitucionalidade (Difuso e Concentrado)', frequencyInBanca: 'Alta', accuracyRate: 45, status: 'Ponto Cego', articlesOrLaws: ['Art. 102 da CF/88'] },
          { id: 't-jud-5', name: 'Funções Essenciais à Justiça e Poder Judiciário', frequencyInBanca: 'Alta', accuracyRate: 82, status: 'Dominado', articlesOrLaws: ['Arts. 92 a 135 da CF/88'] },
        ],
      },
      {
        id: `sub-${Date.now()}-3`,
        name: 'Direito Administrativo & Legislação dos Tribunais',
        weight: 2,
        relevancePercentage: 25,
        totalTopics: 2,
        topics: [
          { id: 't-jud-6', name: 'Nova Lei de Licitações e Contratos Administrativos', frequencyInBanca: 'Alta', accuracyRate: 52, status: 'Instável', articlesOrLaws: ['Lei 14.133/21'] },
          { id: 't-jud-7', name: 'Regime Disciplinar dos Servidores e Lei de Improbidade', frequencyInBanca: 'Alta', accuracyRate: 70, status: 'Instável', articlesOrLaws: ['Lei 8.112/90', 'Lei 8.429/92'] },
        ],
      },
      {
        id: `sub-${Date.now()}-4`,
        name: 'Língua Portuguesa & Redação Oficial',
        weight: 1,
        relevancePercentage: 15,
        totalTopics: 2,
        topics: [
          { id: 't-jud-8', name: 'Interpretação Textual & Redação Oficial Forense', frequencyInBanca: 'Alta', accuracyRate: 78, status: 'Dominado' },
          { id: 't-jud-9', name: 'Crase, Regência e Pontuação Estilística', frequencyInBanca: 'Alta', accuracyRate: 64, status: 'Instável' },
        ],
      },
    ];
  }

  return [
    {
      id: `sub-${Date.now()}-1`,
      name: 'Conhecimentos Específicos & Legislação Aplicada',
      weight: 3,
      relevancePercentage: 45,
      totalTopics: 3,
      topics: [
        { id: 't-gen-1', name: 'Normas Específicas do Órgão e Legislação Setorial', frequencyInBanca: 'Alta', accuracyRate: 50, status: 'Ponto Cego', articlesOrLaws: ['Legislação do Edital'] },
        { id: 't-gen-2', name: 'Processo Administrativo e Acesso à Informação', frequencyInBanca: 'Alta', accuracyRate: 68, status: 'Instável', articlesOrLaws: ['Lei 9.784/99', 'Lei 12.527/11'] },
        { id: 't-gen-3', name: 'Ética no Serviço Público e Decretos Regulamentares', frequencyInBanca: 'Média', accuracyRate: 85, status: 'Dominado', articlesOrLaws: ['Decreto 1.171/94'] },
      ],
    },
    {
      id: `sub-${Date.now()}-2`,
      name: 'Direito Constitucional & Administrativo',
      weight: 2,
      relevancePercentage: 30,
      totalTopics: 3,
      topics: [
        { id: 't-gen-4', name: 'Direitos e Garantias Fundamentais (Art. 5º da CF)', frequencyInBanca: 'Alta', accuracyRate: 82, status: 'Dominado', articlesOrLaws: ['Art. 5º, CF/88'] },
        { id: 't-gen-5', name: 'Regime Jurídico Único dos Servidores Públicos', frequencyInBanca: 'Alta', accuracyRate: 62, status: 'Instável', articlesOrLaws: ['Lei 8.112/90'] },
        { id: 't-gen-6', name: 'Atos Administrativos e Poderes da Administração', frequencyInBanca: 'Alta', accuracyRate: 48, status: 'Ponto Cego', articlesOrLaws: ['Doutrina Administrativa'] },
      ],
    },
    {
      id: `sub-${Date.now()}-3`,
      name: 'Língua Portuguesa & Redação Oficial',
      weight: 1,
      relevancePercentage: 15,
      totalTopics: 2,
      topics: [
        { id: 't-gen-7', name: 'Compreensão e Interpretação de Textos da Banca', frequencyInBanca: 'Alta', accuracyRate: 72, status: 'Instável' },
        { id: 't-gen-8', name: 'Morfossintaxe, Pontuação e Crase', frequencyInBanca: 'Alta', accuracyRate: 86, status: 'Dominado' },
      ],
    },
    {
      id: `sub-${Date.now()}-4`,
      name: 'Raciocínio Lógico & Noções de Tecnologia',
      weight: 1,
      relevancePercentage: 10,
      totalTopics: 2,
      topics: [
        { id: 't-gen-9', name: 'Lógica Sentencial e Proposições Compostas', frequencyInBanca: 'Média', accuracyRate: 58, status: 'Instável' },
        { id: 't-gen-10', name: 'Segurança da Informação e Ferramentas Digitais', frequencyInBanca: 'Média', accuracyRate: 75, status: 'Dominado' },
      ],
    },
  ];
};
