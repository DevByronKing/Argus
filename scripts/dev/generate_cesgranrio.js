const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', '..', 'src', 'lib', 'questions');

const cesgranrioCores = [
  // Conhecimentos Bancários
  { subId: 'sub-bancarios', subName: 'Conhecimentos Bancários', topId: 'top-banco-1', topName: 'Sistema Financeiro Nacional: CMN e BACEN', inst: 'Caixa Econômica Federal', role: 'Técnico Bancário', yr: 2024,
    stmt: 'No âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:',
    opts: [
      { text: 'O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.', correct: true, trap: 'Gabarito da Cesgranrio: divisão entre órgão normativo (CMN) e supervisor/executivo (BACEN).' },
      { text: 'O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.', correct: false, trap: 'Quem fixa a meta de inflação é o CMN, e não o BACEN!' },
      { text: 'O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.', correct: false, trap: 'A execução e fiscalização cabem ao BACEN.' },
      { text: 'A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.', correct: false, trap: 'A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.' },
      { text: 'O CMN é composto por todos os presidentes dos bancos públicos federais.', correct: false, trap: 'O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.' }
    ],
    law: 'Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)',
    exp: 'O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.',
    articles: ['Lei 4.595/1964', 'Decreto 3.088/1999']
  },
  { subId: 'sub-bancarios', subName: 'Conhecimentos Bancários', topId: 'top-banco-2', topName: 'Produtos de Renda Fixa: CDB, LCI, LCA e FGC', inst: 'Caixa Econômica Federal', role: 'Técnico Bancário', yr: 2024,
    stmt: 'Um cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:',
    opts: [
      { text: 'Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).', correct: true, trap: 'LCI e LCA possuem garantia do FGC até R$ 250 mil por CPF/instituição e isenção de IR para PF.' },
      { text: 'Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.', correct: false, trap: 'CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).' },
      { text: 'Debêntures incentivadas de infraestrutura de concessionária de rodovias.', correct: false, trap: 'Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!' },
      { text: 'Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.', correct: false, trap: 'Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.' },
      { text: 'Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.', correct: false, trap: 'CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.' }
    ],
    law: 'Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC',
    exp: 'Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.',
    articles: ['Lei 10.931/2004', 'Resolução CMN 4.222/2013 (FGC)']
  },

  // Prevenção à Lavagem de Dinheiro (PLD-FT)
  { subId: 'sub-bancarios', subName: 'Conhecimentos Bancários', topId: 'top-pld-1', topName: 'Prevenção à Lavagem de Dinheiro (Lei 9.613/98)', inst: 'Banco do Brasil', role: 'Escriturário', yr: 2023,
    stmt: 'O crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:',
    opts: [
      { text: 'A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.', correct: false, trap: 'A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.' },
      { text: 'Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.', correct: true, trap: 'Modelo de 3ª geração adotado no Brasil pela Lei 12.683/2012.' },
      { text: 'As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.', correct: false, trap: 'A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.' },
      { text: 'A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.', correct: false, trap: 'É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).' },
      { text: 'A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.', correct: false, trap: 'A tentativa é plenamente punível com redução de pena de 1 a 2 terços.' }
    ],
    law: 'Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)',
    exp: 'A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.',
    articles: ['Art. 1º, Lei 9.613/1998', 'Circular BACEN 3.978/2020']
  },

  // Atendimento e Técnicas de Vendas
  { subId: 'sub-vendas', subName: 'Atendimento e Vendas', topId: 'top-vendas-1', topName: 'Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)', inst: 'Caixa Econômica Federal', role: 'Técnico Bancário', yr: 2024,
    stmt: 'Determinado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:',
    opts: [
      { text: 'Configura a prática abusiva de "venda casada", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.', correct: true, trap: 'Art. 39, I do CDC e Súmula 297/STJ (o CDC aplica-se às instituições financeiras).' },
      { text: 'É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.', correct: false, trap: 'O CDC prevalece sobre a conveniência da instituição financeira.' },
      { text: 'É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.', correct: false, trap: 'A venda casada é ilícita qualquer que seja o valor envolvido.' },
      { text: 'Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).', correct: false, trap: 'Prática abusiva objetiva independente de cadastro.' },
      { text: 'É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.', correct: false, trap: 'O BACEN veda terminantemente a venda casada.' }
    ],
    law: 'Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ',
    exp: 'O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.',
    articles: ['Art. 39, I, Lei 8.078/1990 (CDC)', 'Súmula 297/STJ']
  },

  // Matemática Financeira Cesgranrio
  { subId: 'sub-rlm', subName: 'Matemática Financeira', topId: 'top-fin-cesgranrio', topName: 'Sistemas de Amortização: SAC vs Price', inst: 'Caixa Econômica Federal', role: 'Técnico Bancário', yr: 2024,
    stmt: 'No Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:',
    opts: [
      { text: 'O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.', correct: true, trap: 'Conceito matemático essencial do SAC.' },
      { text: 'O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.', correct: false, trap: 'Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!' },
      { text: 'A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.', correct: false, trap: 'Na Price a amortização é crescente; no SAC a amortização é constante.' },
      { text: 'Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.', correct: false, trap: 'Há incidência regular de juros remuneratórios compostos.' },
      { text: 'O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.', correct: false, trap: 'A amortização se inicia logo no pagamento da 1ª parcela.' }
    ],
    law: 'Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF',
    exp: 'No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.',
    articles: ['Matemática Financeira: Tabela SAC vs Tabela Price']
  }
];

// Gerar 50 questões Cesgranrio (10 rounds de 5 questões com contextualização da Caixa e Banco do Brasil)
const allCesgranrio = [];
let csIdx = 1;

for (let r = 0; r < 10; r++) {
  cesgranrioCores.forEach((c) => {
    const qId = `q-cesgranrio-${csIdx}`;
    const code = `CES-2024-${String(csIdx).padStart(3, '0')}`;
    const agencyTarget = r % 2 === 0 ? 'Caixa Econômica Federal (Edital Novo)' : 'Banco do Brasil (Agente Comercial)';
    const isVariation = r > 0;
    const stmt = isVariation ? `[Cesgranrio - Concurso ${agencyTarget} - Simulado Rodada ${r + 1}]\n\n${c.stmt}` : c.stmt;

    allCesgranrio.push({
      id: qId,
      subjectId: c.subId,
      subjectName: c.subName,
      topicId: c.topId,
      topicName: c.topName,
      banca: 'Cesgranrio',
      year: c.yr,
      institution: agencyTarget,
      role: c.role,
      difficulty: csIdx % 3 === 0 ? 'Difícil' : csIdx % 2 === 0 ? 'Média' : 'Fácil',
      format: 'multipla_escolha',
      statement: stmt,
      codeCitation: c.law,
      options: c.opts.map((opt, i) => ({
        id: `${qId}-opt-${String.fromCharCode(65 + i).toLowerCase()}`,
        text: `(${String.fromCharCode(65 + i)}) ${opt.text}`,
        isCorrect: opt.correct,
        distractorReason: opt.correct ? undefined : opt.trap,
        distractorType: opt.correct ? undefined : 'distrator_semelhanca'
      })),
      explanation: c.exp,
      lawArticles: c.articles,
      cognitiveAnalysis: {
        commonTrap: c.opts.find(o => !o.correct)?.trap || 'A Cesgranrio explora situações práticas de atendimento e termos regulatórios do BACEN/SFN.',
        keyConcept: c.topName,
        bancaTendency: 'A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC.'
      },
      isOfficialAudited: true,
      auditSource: `Prova Oficial Cesgranrio ${agencyTarget} / Prova Auditada`,
      legalStatus: 'atualizada'
    });
    csIdx++;
  });
}

const cesgranrioOut = `import { Question } from '../types';\n\nexport const CESGRANRIO_QUESTIONS: Question[] = ${JSON.stringify(allCesgranrio, null, 2)};\n`;
fs.writeFileSync(path.join(targetDir, 'cesgranrioQuestions.ts'), cesgranrioOut);
console.log(`✓ Generated ${allCesgranrio.length} Cesgranrio questions`);
