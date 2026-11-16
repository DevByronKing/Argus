import { 
  ConcursoRadarItem, 
  OABCalendarEntry, 
  ENEMCalendarEntry,
  CouponDiscount,
  SubscriptionDetail 
} from './types';

// ==============================================================================
// RADAR NACIONAL DE CONCURSOS (ABERTOS, PREVISTOS E RUMORES)
// ==============================================================================

export const CONCURSOS_RADAR_DATA: ConcursoRadarItem[] = [
  // --- EDITAIS PUBLICADOS (ABERTOS) ---
  {
    id: 'inss-tecnico-2026',
    title: 'INSS - Técnico do Seguro Social',
    institution: 'Instituto Nacional do Seguro Social',
    banca: 'Cebraspe',
    role: 'Técnico do Seguro Social',
    salary: 'R$ 6.596,52',
    vacancies: '1.000 + 2.000 CR',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'administrativa',
    registrationPeriod: '10/02 a 15/03/2026',
    examDate: '18/05/2026',
    officialNoticeUrl: 'https://cebraspe.org.br',
    location: 'Nacional',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-inss-2026',
    keyHighlights: [
      'Direito Previdenciário representa 60% do total de pontos da prova',
      'Banca Cebraspe: modelo Certo ou Errado (uma errada anula uma certa)',
      'Lotação prioritária em agências com déficit de atendimento no país'
    ]
  },
  {
    id: 'tjsp-escrevente-2026',
    title: 'TJ-SP - Escrevente Técnico Judiciário',
    institution: 'Tribunal de Justiça de São Paulo',
    banca: 'Vunesp',
    role: 'Escrevente Técnico Judiciário',
    salary: 'R$ 7.260,00 + Auxílios',
    vacancies: '572 Vagas',
    educationLevel: 'Médio',
    status: 'publicado',
    category: 'tribunais',
    registrationPeriod: '05/01 a 20/02/2026',
    examDate: '26/04/2026',
    officialNoticeUrl: 'https://vunesp.com.br',
    location: 'São Paulo - SP',
    scope: 'Estadual',
    region: 'Sudeste',
    stateCode: 'SP',
    matchedEditalId: 'exam-tjsp-2026',
    keyHighlights: [
      'Maior tribunal do mundo com nomeações históricas acima das vagas',
      'Português e Normas da Corregedoria decidem a nota de corte (85%+)',
      '2ª Fase: Prova prática de formatação e digitação eliminatória'
    ]
  },
  {
    id: 'prf-policial-2026',
    title: 'PRF - Policial Rodoviário Federal',
    institution: 'Polícia Rodoviária Federal',
    banca: 'Cebraspe',
    role: 'Policial Rodoviário Federal',
    salary: 'R$ 10.742,00 + Benefícios',
    vacancies: '1.500 Vagas',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'policial',
    registrationPeriod: '15/02 a 30/03/2026',
    examDate: '28/06/2026',
    officialNoticeUrl: 'https://cebraspe.org.br',
    location: 'Nacional',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-prf-2026',
    keyHighlights: [
      'Legislação de Trânsito (CTB e Resoluções CONTRAN) é a matéria-chave',
      'Física aplicada a colisões e Direitos Humanos com peso estratégico',
      'Exige TAF rigoroso (barra fixa, shuttle run, salto e corrida 2.400m)'
    ]
  },
  {
    id: 'sefaz-sp-auditor-2026',
    title: 'SEFAZ-SP - Auditor Fiscal Tributário (AFRE)',
    institution: 'Secretaria da Fazenda de São Paulo',
    banca: 'FGV',
    role: 'Auditor Fiscal de Rendas Estaduais',
    salary: 'R$ 31.850,00',
    vacancies: '120 Vagas',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'fiscal',
    registrationPeriod: '20/01 a 02/03/2026',
    examDate: '10/05/2026',
    officialNoticeUrl: 'https://conhecimento.fgv.br',
    location: 'São Paulo - SP',
    scope: 'Estadual',
    region: 'Sudeste',
    stateCode: 'SP',
    matchedEditalId: 'exam-sefaz-sp-2026',
    keyHighlights: [
      'Contabilidade Avançada, TI e Direito Tributário somam 70% da prova',
      'Estilo FGV: enunciados densos e situações-problema complexas',
      'Um dos maiores salários iniciais do funcionalismo público estadual'
    ]
  },
  {
    id: 'pcdf-delegado-2026',
    title: 'PCDF - Delegado de Polícia Civil',
    institution: 'Polícia Civil do Distrito Federal',
    banca: 'Cebraspe',
    role: 'Delegado de Polícia Civil',
    salary: 'R$ 22.450,00',
    vacancies: '80 + 120 CR',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'juridica',
    registrationPeriod: '01/02 a 12/03/2026',
    examDate: '17/05/2026',
    officialNoticeUrl: 'https://cebraspe.org.br',
    location: 'Distrito Federal - DF',
    scope: 'Estadual',
    region: 'Centro-Oeste',
    stateCode: 'DF',
    matchedEditalId: 'exam-pcdf-2026',
    keyHighlights: [
      'Exige bacharelado em Direito e 3 anos de prática jurídica/policial',
      'Fase discursiva com 3 questões e elaboração de Peça Cautelar/Prisão',
      'Prova Oral perante banca examinadora com arguição individual'
    ]
  },

  // --- CONCURSOS REGIONAIS DESTAQUE (SUL, NORDESTE, NORTE, CENTRO-OESTE, SUDESTE) ---
  {
    id: 'tjpr-tecnico-2026',
    title: 'TJ-PR - Técnico e Analista Judiciário',
    institution: 'Tribunal de Justiça do Paraná',
    banca: 'FGV',
    role: 'Técnico Judiciário',
    salary: 'R$ 8.420,00 + Auxílios',
    vacancies: '180 Vagas + CR',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'tribunais',
    registrationPeriod: 'Previsão: Junho/2026',
    location: 'Curitiba e Comarcas - PR',
    scope: 'Estadual',
    region: 'Sul',
    stateCode: 'PR',
    keyHighlights: [
      'FGV selecionada como banca organizadora',
      'Direito Processual Civil e Penal têm peso dobrado no edital',
      'Excelente plano de carreiras e gratificação por produtividade'
    ]
  },
  {
    id: 'trt4-rs-2026',
    title: 'TRT-4 (RS) - Analista Judiciário',
    institution: 'Tribunal Regional do Trabalho da 4ª Região',
    banca: 'FCC',
    role: 'Analista Judiciário - Área Judiciária',
    salary: 'R$ 15.200,00',
    vacancies: '45 Vagas + Amplo CR',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'tribunais',
    registrationPeriod: '15/03 a 20/04/2026',
    examDate: '14/06/2026',
    officialNoticeUrl: 'https://concursosfcc.com.br',
    location: 'Porto Alegre e Interior - RS',
    scope: 'Estadual',
    region: 'Sul',
    stateCode: 'RS',
    keyHighlights: [
      'Banca Fundação Carlos Chagas (FCC): cobrança literal da CLT e Súmulas TST',
      'Redação técnica discursiva com caso concreto de Direito do Trabalho'
    ]
  },
  {
    id: 'trt2-sp-2026',
    title: 'TRT-2 (SP) - Técnico e Analista Judiciário',
    institution: 'Tribunal Regional do Trabalho da 2ª Região (São Paulo)',
    banca: 'FCC',
    role: 'Técnico e Analista Judiciário (Área Judiciária & Administrativa)',
    salary: 'R$ 9.052,00 a R$ 15.200,00 + Auxílios',
    vacancies: '130 Vagas + Amplo CR',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'tribunais',
    registrationPeriod: '10/02 a 25/03/2026',
    examDate: '24/05/2026',
    officialNoticeUrl: 'https://concursosfcc.com.br',
    location: 'São Paulo Capital e Grande SP',
    scope: 'Nacional',
    region: 'Sudeste',
    stateCode: 'SP',
    matchedEditalId: 'exam-trt-2026',
    keyHighlights: [
      'Maior tribunal trabalhista do país com histórico de milhares de convocações',
      'Direito do Trabalho e Processo do Trabalho representam mais de 50% dos pontos',
      'Cobrança massiva de Jurisprudência Uniformizada e Súmulas Vinculantes do TST'
    ]
  },
  {
    id: 'trt15-campinas-2026',
    title: 'TRT-15 (Campinas) - Analista Judiciário',
    institution: 'Tribunal Regional do Trabalho da 15ª Região',
    banca: 'FCC',
    role: 'Analista Judiciário - Área Judiciária',
    salary: 'R$ 15.200,00',
    vacancies: 'Edital Iminente (Comissão Formada)',
    educationLevel: 'Superior',
    status: 'confirmado',
    category: 'tribunais',
    registrationPeriod: 'Em breve',
    examDate: 'Segundo Semestre 2026',
    officialNoticeUrl: 'https://trt15.jus.br',
    location: 'Campinas e Interior de SP',
    scope: 'Nacional',
    region: 'Sudeste',
    stateCode: 'SP',
    matchedEditalId: 'exam-trt-2026',
    keyHighlights: [
      'Concurso confirmado pelo Órgão Especial do Tribunal com dotação garantida',
      'Foco em execução trabalhista, recursos para o TST e normas de teletrabalho'
    ]
  },
  {
    id: 'trt1-rj-2026',
    title: 'TRT-1 (RJ) - Técnico e Analista',
    institution: 'Tribunal Regional do Trabalho da 1ª Região (Rio de Janeiro)',
    banca: 'FGV',
    role: 'Técnico e Analista Judiciário',
    salary: 'R$ 9.052,00 a R$ 15.200,00',
    vacancies: 'Previstas 80 + CR',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'tribunais',
    registrationPeriod: 'Segundo Semestre 2026',
    examDate: 'A definir',
    officialNoticeUrl: 'https://trt1.jus.br',
    location: 'Rio de Janeiro - RJ',
    scope: 'Nacional',
    region: 'Sudeste',
    stateCode: 'RJ',
    matchedEditalId: 'exam-trt-2026',
    keyHighlights: [
      'Incluso na proposta orçamentária do CSJT para reposição urgente de vacâncias',
      'FGV cotada para organização: foco em casos práticos e peças processuais'
    ]
  },
  {
    id: 'trt10-df-to-2026',
    title: 'TRT-10 (DF/TO) - Analista Judiciário',
    institution: 'Tribunal Regional do Trabalho da 10ª Região (Distrito Federal e Tocantins)',
    banca: 'Cebraspe',
    role: 'Analista Judiciário - Área Judiciária',
    salary: 'R$ 15.200,00',
    vacancies: 'Estudos de Comissão',
    educationLevel: 'Superior',
    status: 'rumor',
    category: 'tribunais',
    registrationPeriod: 'Estudos em andamento',
    examDate: 'A definir 2026',
    officialNoticeUrl: 'https://trt10.jus.br',
    location: 'Brasília - DF e Palmas - TO',
    scope: 'Nacional',
    region: 'Centro-Oeste',
    stateCode: 'DF',
    matchedEditalId: 'exam-trt-2026',
    keyHighlights: [
      'Rumor aquecido após auditoria do TCU apontar deficit de servidores',
      'Estilo Cebraspe Certo/Errado com fator de correção negativo'
    ]
  },
  {
    id: 'trt3-mg-2026',
    title: 'TRT-3 (MG) - Tribunal Regional do Trabalho de Minas Gerais',
    institution: 'Tribunal Regional do Trabalho da 3ª Região',
    banca: 'FCC',
    role: 'Técnico Judiciário e Oficial de Justiça Avaliador',
    salary: 'R$ 9.052,00 a R$ 17.500,00',
    vacancies: 'Previsto no CSJT 2026',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'tribunais',
    registrationPeriod: 'Aguardando publicação',
    examDate: 'Previsão 2026',
    officialNoticeUrl: 'https://trt3.jus.br',
    location: 'Belo Horizonte e Interior - MG',
    scope: 'Nacional',
    region: 'Sudeste',
    stateCode: 'MG',
    matchedEditalId: 'exam-trt-2026',
    keyHighlights: [
      'Tradicional tribunal mineiro com chamamento expressivo de aprovados',
      'FCC como banca histórica: questões literais da CLT e CPC aplicado'
    ]
  },
  {
    id: 'sefaz-pe-auditor-2026',
    title: 'SEFAZ-PE - Auditor Fiscal do Tesouro Estadual',
    institution: 'Secretaria da Fazenda de Pernambuco',
    banca: 'FCC',
    role: 'Auditor Fiscal do Tesouro Estadual (AFTE)',
    salary: 'R$ 24.500,00',
    vacancies: '50 Vagas',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'fiscal',
    registrationPeriod: 'Previsão: Agosto/2026',
    location: 'Recife - PE',
    scope: 'Estadual',
    region: 'Nordeste',
    stateCode: 'PE',
    keyHighlights: [
      'Legislação Tributária Estadual de PE (ICMS/IPVA) com maior peso',
      'Contabilidade de Custos e Auditoria Fiscal Avançada'
    ]
  },
  {
    id: 'pcce-inspetor-2026',
    title: 'PC-CE - Inspetor e Escrivão de Polícia',
    institution: 'Polícia Civil do Ceará',
    banca: 'Idecan',
    role: 'Inspetor de Polícia Civil',
    salary: 'R$ 6.850,00',
    vacancies: '500 Vagas',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'policial',
    registrationPeriod: '01/03 a 10/04/2026',
    examDate: '21/06/2026',
    officialNoticeUrl: 'https://idecan.org.br',
    location: 'Fortaleza - CE',
    scope: 'Estadual',
    region: 'Nordeste',
    stateCode: 'CE',
    keyHighlights: [
      'Legislação Específica da PC-CE e Direito Penal Militar',
      'TAF eliminatório na Academia Estadual de Segurança Pública (AESP)'
    ]
  },
  {
    id: 'tjam-analista-2026',
    title: 'TJ-AM - Analista Judiciário & Oficial de Justiça',
    institution: 'Tribunal de Justiça do Amazonas',
    banca: 'Cebraspe',
    role: 'Analista Judiciário',
    salary: 'R$ 11.900,00 + Gratificações',
    vacancies: '120 Vagas + CR',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'tribunais',
    registrationPeriod: 'Previsão: 2º Semestre/2026',
    location: 'Manaus - AM',
    scope: 'Estadual',
    region: 'Norte',
    stateCode: 'AM',
    keyHighlights: [
      'Vagas para Polo Capital Manaus e Comarcas do Interior',
      'Direito Constitucional, Administrativo e Regimento Interno do TJAM'
    ]
  },
  {
    id: 'pcpa-investigador-2026',
    title: 'PC-PA - Investigador e Escrivão',
    institution: 'Polícia Civil do Pará',
    banca: 'FGV',
    role: 'Investigador de Polícia Civil',
    salary: 'R$ 8.950,00',
    vacancies: '350 Vagas',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'policial',
    registrationPeriod: '10/02 a 25/03/2026',
    examDate: '31/05/2026',
    officialNoticeUrl: 'https://conhecimento.fgv.br',
    location: 'Belém - PA',
    scope: 'Estadual',
    region: 'Norte',
    stateCode: 'PA',
    matchedEditalId: 'exam-pcpa-2026',
    keyHighlights: [
      'Banca FGV: interpretação de texto pesada e Direito Processual Penal',
      'Adicional de interiorização atrativo para delegacias regionais'
    ]
  },
  {
    id: 'tjgo-analista-2026',
    title: 'TJ-GO - Analista Judiciário',
    institution: 'Tribunal de Justiça de Goiás',
    banca: 'FGV',
    role: 'Analista Judiciário - Área Judiciária',
    salary: 'R$ 12.300,00',
    vacancies: '70 Vagas + CR',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'tribunais',
    registrationPeriod: '15/01 a 28/02/2026',
    examDate: '03/05/2026',
    officialNoticeUrl: 'https://conhecimento.fgv.br',
    location: 'Goiânia - GO',
    scope: 'Estadual',
    region: 'Centro-Oeste',
    stateCode: 'GO',
    keyHighlights: [
      'Tribunal reconhecido pelo CNJ com selo Diamante em produtividade',
      'Estrutura moderna e alto percentual de teletrabalho pós-estágio probatório'
    ]
  },
  {
    id: 'tjrj-tecnico-2026',
    title: 'TJRJ - Técnico de Atividade Judiciária',
    institution: 'Tribunal de Justiça do Rio de Janeiro',
    banca: 'Cebraspe',
    role: 'Técnico de Atividade Judiciária',
    salary: 'R$ 7.800,00 + Auxílios',
    vacancies: '220 Vagas Previstas',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'tribunais',
    registrationPeriod: 'Previsão: Setembro/2026',
    location: 'Rio de Janeiro - RJ',
    scope: 'Estadual',
    region: 'Sudeste',
    stateCode: 'RJ',
    keyHighlights: [
      'Concurso histórico muito aguardado para recomposição de quadros',
      'CODJERJ e Consolidação Normativa da Corregedoria do RJ'
    ]
  },

  // --- CONCURSOS PREVISTOS NACIONAIS ---
  {
    id: 'rfb-novo-concurso-2026',
    title: 'Receita Federal - Novo Concurso (AFRFB / ATRFB)',
    institution: 'Receita Federal do Brasil',
    banca: 'FGV (Prevista)',
    role: 'Auditor-Fiscal e Analista-Tributário',
    salary: 'R$ 13.500,00 a R$ 24.500,00',
    vacancies: '1.200 Vagas Solicitadas',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'fiscal',
    registrationPeriod: 'Previsão: 2º Semestre/2026',
    examDate: 'Previsão: Novembro/2026',
    location: 'Nacional (Fronteiras e Capitais)',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-receita-2026',
    keyHighlights: [
      'Pedido formalizado junto ao MGI para reforço urgente aduaneiro',
      'Disciplinas críticas: Legislação Tributária, Aduaneira e Fluência em Dados',
      'Curso de Formação Profissional (CFP) realizado em Brasília-DF'
    ]
  },
  {
    id: 'pf-agente-escrivao-2026',
    title: 'Polícia Federal - Agente, Escrivão e Delegado',
    institution: 'Departamento de Polícia Federal',
    banca: 'Cebraspe',
    role: 'Agente, Escrivão e Papiloscopista',
    salary: 'R$ 14.800,00',
    vacancies: '2.000 Vagas Autorizadas',
    educationLevel: 'Superior',
    status: 'confirmado',
    category: 'policial',
    registrationPeriod: 'Confirmado: 2026',
    examDate: '2º Semestre/2026',
    location: 'Nacional',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-pf-2026',
    keyHighlights: [
      'TI (Redes, Banco de Dados e Python) e Contabilidade Geral decidem vagas',
      '120 questões estilo Certo/Errado + Redação de Atualidades de Segurança',
      'TAF eliminatório na Academia Nacional de Polícia (ANP)'
    ]
  },
  {
    id: 'mpu-2026',
    title: 'MPU 2026 - Técnico e Analista do Ministério Público da União',
    institution: 'Ministério Público da União (MPU)',
    banca: 'FGV',
    role: 'Técnico e Analista do MPU',
    salary: 'R$ 13.994,78',
    vacancies: '420 Vagas + Amplo CR',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'juridica',
    registrationPeriod: 'Inscrições Abertas 2026',
    examDate: '11/10/2026',
    officialNoticeUrl: 'https://conhecimento.fgv.br',
    location: 'Nacional (Todas as Capitais)',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-mpu-2026',
    keyHighlights: [
      'Lei Complementar nº 75/93 e Direito Constitucional somam mais de 35% da prova',
      'Forte histórico de convocações além das vagas imediatas em todos os estados'
    ]
  },
  {
    id: 'bb-escriturario-2026',
    title: 'Banco do Brasil 2026 - Escriturário (Agente Comercial & TI)',
    institution: 'Banco do Brasil S.A.',
    banca: 'Cesgranrio',
    role: 'Escriturário - Agente Comercial e Tecnologia',
    salary: 'R$ 5.864,00 + PLR',
    vacancies: '4.000 Vagas Confirmadas',
    educationLevel: 'Médio',
    status: 'confirmado',
    category: 'administrativa',
    registrationPeriod: 'Banca Contratada (Cesgranrio)',
    examDate: '22/11/2026',
    location: 'Nacional',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-bb-2026',
    keyHighlights: [
      'Vendas e Negociação + Conhecimentos Bancários representam 70% da pontuação',
      'Participação nos Lucros (PLR) semestral + Vale-Alimentação de R$ 1.980,00'
    ]
  },
  {
    id: 'caixa-tbn-2026',
    title: 'Caixa Econômica Federal 2026 - Técnico Bancário Novo',
    institution: 'Caixa Econômica Federal (CEF)',
    banca: 'Cesgranrio',
    role: 'Técnico Bancário Novo (Geral e TI)',
    salary: 'R$ 5.798,00 + Benefícios',
    vacancies: '3.200 Vagas Confirmadas',
    educationLevel: 'Médio',
    status: 'confirmado',
    category: 'administrativa',
    registrationPeriod: 'Confirmado 2026',
    examDate: '06/12/2026',
    location: 'Nacional',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-caixa-2026',
    keyHighlights: [
      'Conhecimentos Bancários, Atendimento Digital e Cibersegurança com alto peso',
      'Carreira com ascensão rápida para funções gerenciais e de tecnologia'
    ]
  },
  {
    id: 'ibama-icmbio-2026',
    title: 'IBAMA & ICMBio 2026 - Analista Ambiental e Administrativo',
    institution: 'IBAMA / Ministério do Meio Ambiente',
    banca: 'Cebraspe',
    role: 'Analista Ambiental e Administrativo',
    salary: 'R$ 10.850,00',
    vacancies: '810 Vagas Autorizadas',
    educationLevel: 'Superior',
    status: 'confirmado',
    category: 'administrativa',
    registrationPeriod: 'Autorizado pelo MGI',
    examDate: '29/11/2026',
    location: 'Nacional (Foco Amazônia Legal e Capitais)',
    scope: 'Nacional',
    region: 'Norte',
    matchedEditalId: 'exam-ibama-2026',
    keyHighlights: [
      'Legislação Ambiental (Lei 9.605/98), Licenciamento e Geoprocessamento',
      'Lotação estratégica na Região Norte, Centro-Oeste e Brasília'
    ]
  },
  {
    id: 'cnu-2-edicao-2026',
    title: 'CNU 2ª Edição 2026 - Concurso Nacional Unificado',
    institution: 'Ministério da Gestão e Inovação (MGI)',
    banca: 'Cesgranrio / FGV',
    role: 'Diversos Cargos Federais (Nível Médio e Superior)',
    salary: 'R$ 7.400,00 a R$ 22.900,00',
    vacancies: '6.640 Vagas Previstas',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'administrativa',
    registrationPeriod: 'Previsão: 2º Semestre/2026',
    examDate: '28/11/2026',
    location: 'Nacional (228 Cidades)',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-cnu-2026',
    keyHighlights: [
      'Inscrição única para concorrer a dezenas de órgãos federais simultaneamente',
      'Foco em Políticas Públicas, Estado de Direito, Ética e Realidade Brasileira'
    ]
  },
  {
    id: 'tse-unificado-segunda-etapa',
    title: 'TSE Unificado & TREs - Técnico e Analista Judiciário',
    institution: 'Tribunal Superior Eleitoral & TREs',
    banca: 'Cebraspe',
    role: 'Analista e Técnico Judiciário',
    salary: 'R$ 9.050,00 a R$ 14.850,00',
    vacancies: '520 Imediatas + Amplo CR',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'tribunais',
    registrationPeriod: 'Edital Nacional e Regionais',
    location: 'Nacional (Todos os TREs aderentes)',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-tse-2026',
    keyHighlights: [
      'Direito Eleitoral aprofundado com jurisprudência recente do TSE',
      'Estabilidade integral da Lei 8.112/90 com regime próprio judiciário'
    ]
  },
  {
    id: 'tcu-auditor-2026',
    title: 'TCU - Auditor Federal de Controle Externo',
    institution: 'Tribunal de Contas da União',
    banca: 'FGV',
    role: 'Auditor Federal de Controle Externo (AUFC)',
    salary: 'R$ 26.159,00',
    vacancies: '100 Vagas + CR',
    educationLevel: 'Superior',
    status: 'previsto',
    category: 'fiscal',
    registrationPeriod: 'Previsão: 2º Semestre/2026',
    location: 'Brasília - DF e Estados',
    scope: 'Nacional',
    region: 'Nacional',
    stateCode: 'DF',
    matchedEditalId: 'exam-tcu-2026',
    keyHighlights: [
      'Auditoria Governamental, Análise de Dados e Licitações (Lei 14.133/21)',
      'Duas peças de auditoria técnica exigidas na fase discursiva',
      'Reconhecido como o concurso mais exigente da área de controle do país'
    ]
  },

  // --- RUMORES E COMISSÕES FORMADAS ---
  {
    id: 'bacen-analista-rumor',
    title: 'BACEN 2026 - Analista do Banco Central do Brasil',
    institution: 'Banco Central do Brasil',
    banca: 'Cebraspe',
    role: 'Analista do Banco Central',
    salary: 'R$ 22.920,00',
    vacancies: '300 Vagas Solicitadas',
    educationLevel: 'Superior',
    status: 'rumor',
    category: 'fiscal',
    location: 'Brasília, SP, RJ, BH, Curitiba, Belém',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-bacen-2026',
    keyHighlights: [
      'Foco maciço em Economia Monetária, Regulação do Sistema Financeiro e IA',
      'Pressão sindical por reposição de quadros pré-aposentadorias'
    ]
  },
  {
    id: 'cgu-auditor-rumor-2026',
    title: 'CGU 2026 - Auditor Federal de Finanças e Controle',
    institution: 'Controladoria-Geral da União',
    banca: 'FGV',
    role: 'Auditor Federal de Finanças e Controle (AFFC)',
    salary: 'R$ 23.504,96',
    vacancies: '375 Vagas em Estudo',
    educationLevel: 'Superior',
    status: 'rumor',
    category: 'fiscal',
    location: 'Brasília e Capitais',
    scope: 'Nacional',
    region: 'Nacional',
    matchedEditalId: 'exam-cgu-2026',
    keyHighlights: [
      'Auditoria Interna Governamental, Lei Anticorrupção (12.846/13) e AFO',
      'Comissão de estudos para recomposição da carreira de Finanças e Controle'
    ]
  },
  {
    id: 'magistratura-enam-2026',
    title: 'ENAM - Exame Nacional da Magistratura (CNJ)',
    institution: 'Conselho Nacional de Justiça',
    banca: 'FGV',
    role: 'Habilitação para Juiz de Direito e Federal',
    salary: 'Habilitação Obrigatória',
    vacancies: 'Sem limite de vagas (Habilitação)',
    educationLevel: 'Superior',
    status: 'publicado',
    category: 'juridica',
    registrationPeriod: 'Edital Permanente / Duas edições anuais',
    examDate: '19/04/2026 (1ª Edição)',
    officialNoticeUrl: 'https://conhecimento.fgv.br/concursos/enam',
    location: 'Todas as Capitais',
    scope: 'Nacional',
    region: 'Nacional',
    keyHighlights: [
      'Passaporte obrigatório para prestar qualquer concurso de Magistratura',
      'Exige acerto mínimo de 70% (50 questões das 80) para candidatos gerais',
      'Foco extremo em Direitos Humanos, Direito Humanitário e Filosofia do Direito'
    ]
  }
];

// ==============================================================================
// CALENDÁRIO OFICIAL DO EXAME DE ORDEM (OAB / CFOAB)
// ==============================================================================

export const OAB_CALENDAR_DATA: OABCalendarEntry[] = [
  {
    edition: '41º Exame de Ordem Unificado',
    year: 2026,
    editalDate: '06/05/2026',
    registrationPeriod: '13/05 a 21/05/2026',
    phase1Date: '28/07/2026',
    phase2Date: '22/09/2026',
    status: 'aberto',
    fee: 'R$ 320,00',
    details: {
      banca: 'Fundação Getulio Vargas (FGV Conhecimento)',
      phase1Structure: '80 questões de múltipla escolha com 4 alternativas (A, B, C, D). Exige 50% de acertos (40 pontos) sem anulação por erro.',
      phase2Structure: '1 Peça Prático-Profissional (5,0 pontos) + 4 Questões Discursivas (1,25 ponto cada). Nota mínima 6,0. Consulta a Vade Mecum sem comentários.',
      repescagemInfo: 'Candidatos aprovados na 1ª fase do 40º Exame têm direito à repescagem direta na 2ª fase do 41º mediante taxa reduzida.',
      criticalSubjects: [
        'Ética e Estatuto da OAB (8 questões - 20% da nota de corte)',
        'Direito Constitucional (6 questões)',
        'Direito Civil & Processo Civil (12 questões somadas)',
        'Direito Penal & Processo Penal (12 questões somadas)',
        'Direito do Trabalho & Processo do Trabalho (10 questões somadas)'
      ]
    }
  },
  {
    edition: '42º Exame de Ordem Unificado',
    year: 2026,
    editalDate: '02/09/2026',
    registrationPeriod: '09/09 a 17/09/2026',
    phase1Date: '15/11/2026',
    phase2Date: '17/01/2027',
    status: 'previsto',
    fee: 'R$ 320,00',
    details: {
      banca: 'FGV Conhecimento',
      phase1Structure: '80 questões objetivas cobrindo as 20 disciplinas obrigatórias do currículo de Direito.',
      phase2Structure: 'Escolha da área da peça na inscrição: Constitucional, Administrativo, Civil, Penal, Trabalho, Tributário ou Empresarial.',
      repescagemInfo: 'Inscrições para reaproveitamento da 1ª fase do 41º Exame abrem após a divulgação do resultado preliminar.',
      criticalSubjects: [
        'Ética Profissional (Garantia de 8 acertos com leitura concentrada da Lei 8.906/94)',
        'Direito Previdenciário e Eleitoral (Novas disciplinas consolidadas)'
      ]
    }
  },
  {
    edition: '43º Exame de Ordem Unificado',
    year: 2027,
    editalDate: 'Janeiro/2027',
    registrationPeriod: 'Fevereiro/2027',
    phase1Date: 'Abril/2027',
    phase2Date: 'Junho/2027',
    status: 'previsto',
    fee: 'R$ 320,00 (Previsão)',
    details: {
      banca: 'FGV Conhecimento',
      phase1Structure: 'Calendário anual mantido com 3 edições por ano pelo Conselho Federal da OAB.',
      phase2Structure: 'Aplicação presencial em mais de 160 polos em todo o território nacional.',
      repescagemInfo: 'Garantido pelo Provimento nº 144/2011 do CFOAB.',
      criticalSubjects: [
        'Prática de Peças: Petição Inicial, Recursos, Mandado de Segurança e Defesas'
      ]
    }
  }
];

// ==============================================================================
// CALENDÁRIO OFICIAL DO ENEM (EXAME NACIONAL DO ENSINO MÉDIO)
// ==============================================================================

export const ENEM_CALENDAR_DATA: ENEMCalendarEntry = {
  edition: 'ENEM 2026',
  year: 2026,
  exemptionPeriod: '15/04 a 26/04/2026',
  registrationPeriod: '27/05 a 07/06/2026',
  day1Date: '01/11/2026 (Domingo)',
  day2Date: '08/11/2026 (Domingo)',
  resultDate: '12/01/2027',
  sisuDate: '20/01 a 23/01/2027',
  fee: 'R$ 85,00 (Isenção concedida para alunos de escola pública e CadÚnico)',
  details: {
    day1Subjects: 'Linguagens, Códigos e suas Tecnologias (45 questões) + Ciências Humanas e suas Tecnologias (45 questões) + Redação Dissertativo-Argumentativa (5h30 de duração).',
    day2Subjects: 'Ciências da Natureza e suas Tecnologias (45 questões) + Matemática e suas Tecnologias (45 questões) (5h de duração).',
    triMechanism: 'Teoria de Resposta ao Item (TRI): Valoriza a consistência pedagógica. Acertar questões difíceis errando as fáceis reduz a pontuação (penalidade por chute aleatório).',
    redacaoCriteria: [
      'Competência 1: Domínio da norma culta da língua escrita (200 pts)',
      'Competência 2: Compreensão da proposta e aplicação de conceitos de várias áreas do conhecimento (200 pts)',
      'Competência 3: Capacidade de selecionar, relacionar, organizar e interpretar informações em defesa de um ponto de vista (200 pts)',
      'Competência 4: Demonstração de conhecimento dos mecanismos linguísticos de argumentação e coesão (200 pts)',
      'Competência 5: Elaboração de proposta de intervenção detalhada para o problema com respeito aos direitos humanos (200 pts)'
    ]
  }
};

// ==============================================================================
// CUPONS DE DESCONTO DISPONÍVEIS NO CHECKOUT
// ==============================================================================

export const AVAILABLE_COUPONS: CouponDiscount[] = [
  {
    code: 'LANCAMENTO20',
    discountPercent: 20,
    description: '20% OFF Especial de Lançamento da Plataforma Argus',
    validUntil: '31/12/2026'
  },
  {
    code: 'APROVA50',
    discountPercent: 50,
    description: '50% OFF exclusivo para novos assinantes no plano PRO ou ELITE',
    validUntil: '31/10/2026'
  },
  {
    code: 'PRIMEIROS100',
    discountPercent: 30,
    description: '30% OFF para os 100 primeiros alunos cadastrados',
    validUntil: '30/11/2026'
  },
  {
    code: 'PIRATARIANAO',
    discountPercent: 40,
    description: '40% de incentivo ao estudo ético e legal sem rateios ilegais',
    validUntil: '31/12/2026'
  }
];

// ==============================================================================
// ESTADO INICIAL DE GERENCIAMENTO DE ASSINATURA
// ==============================================================================

export const INITIAL_SUBSCRIPTION_DETAIL: SubscriptionDetail = {
  planId: 'pro',
  status: 'ativa',
  currentPeriodEnd: '18/10/2026',
  autoRenew: true,
  billingCycle: 'mensal',
  paymentMethodDesc: 'Pix Instantâneo (Asaas Gateway)',
  invoices: [
    {
      id: 'inv_89412',
      planId: 'pro',
      billingCycle: 'mensal',
      amount: 47.00,
      status: 'paga',
      paidAt: '18/09/2026 13:20',
      paymentMethod: 'pix',
      receiptCode: 'REC-2026-09-ASAAS-89412'
    },
    {
      id: 'inv_78201',
      planId: 'pro',
      billingCycle: 'mensal',
      amount: 47.00,
      status: 'paga',
      paidAt: '18/08/2026 11:15',
      paymentMethod: 'pix',
      receiptCode: 'REC-2026-08-ASAAS-78201'
    }
  ]
};
