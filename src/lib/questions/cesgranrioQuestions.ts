import { Question } from '../types';

export const CESGRANRIO_QUESTIONS: Question[] = [
  {
    "id": "q-cesgranrio-1",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "No âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-1-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-1-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-1-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-1-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-1-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-2",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "Um cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-2-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-2-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-2-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-2-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-2-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-3",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Escriturário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "O crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-3-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-3-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-3-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-3-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-3-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-4",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "Determinado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-4-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-4-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-4-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-4-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-4-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-5",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "No Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-5-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-5-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-5-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-5-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-5-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-6",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 2]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-6-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-6-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-6-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-6-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-6-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-7",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 2]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-7-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-7-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-7-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-7-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-7-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-8",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Escriturário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 2]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-8-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-8-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-8-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-8-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-8-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-9",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 2]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-9-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-9-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-9-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-9-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-9-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-10",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 2]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-10-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-10-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-10-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-10-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-10-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-11",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 3]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-11-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-11-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-11-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-11-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-11-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-12",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 3]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-12-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-12-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-12-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-12-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-12-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-13",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Escriturário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 3]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-13-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-13-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-13-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-13-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-13-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-14",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 3]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-14-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-14-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-14-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-14-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-14-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-15",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 3]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-15-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-15-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-15-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-15-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-15-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-16",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 4]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-16-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-16-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-16-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-16-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-16-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-17",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 4]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-17-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-17-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-17-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-17-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-17-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-18",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Escriturário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 4]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-18-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-18-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-18-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-18-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-18-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-19",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 4]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-19-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-19-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-19-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-19-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-19-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-20",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 4]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-20-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-20-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-20-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-20-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-20-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-21",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 5]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-21-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-21-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-21-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-21-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-21-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-22",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 5]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-22-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-22-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-22-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-22-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-22-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-23",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Escriturário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 5]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-23-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-23-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-23-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-23-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-23-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-24",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 5]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-24-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-24-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-24-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-24-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-24-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-25",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 5]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-25-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-25-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-25-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-25-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-25-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-26",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 6]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-26-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-26-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-26-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-26-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-26-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-27",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 6]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-27-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-27-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-27-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-27-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-27-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-28",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Escriturário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 6]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-28-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-28-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-28-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-28-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-28-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-29",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 6]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-29-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-29-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-29-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-29-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-29-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-30",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 6]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-30-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-30-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-30-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-30-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-30-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-31",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 7]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-31-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-31-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-31-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-31-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-31-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-32",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 7]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-32-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-32-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-32-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-32-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-32-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-33",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Escriturário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 7]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-33-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-33-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-33-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-33-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-33-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-34",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 7]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-34-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-34-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-34-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-34-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-34-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-35",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 7]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-35-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-35-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-35-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-35-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-35-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-36",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 8]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-36-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-36-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-36-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-36-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-36-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-37",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 8]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-37-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-37-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-37-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-37-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-37-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-38",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Escriturário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 8]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-38-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-38-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-38-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-38-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-38-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-39",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 8]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-39-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-39-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-39-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-39-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-39-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-40",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 8]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-40-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-40-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-40-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-40-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-40-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-41",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 9]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-41-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-41-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-41-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-41-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-41-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-42",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 9]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-42-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-42-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-42-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-42-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-42-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-43",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Escriturário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 9]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-43-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-43-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-43-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-43-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-43-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-44",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 9]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-44-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-44-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-44-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-44-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-44-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-45",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Caixa Econômica Federal (Edital Novo)",
    "role": "Técnico Bancário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Caixa Econômica Federal (Edital Novo) - Simulado Rodada 9]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-45-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-45-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-45-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-45-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-45-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Caixa Econômica Federal (Edital Novo) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-46",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-1",
    "topicName": "Sistema Financeiro Nacional: CMN e BACEN",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 10]\n\nNo âmbito da estrutura do Sistema Financeiro Nacional (SFN), o Conselho Monetário Nacional (CMN) e o Banco Central do Brasil (BACEN) desempenham papéis fundamentais. A respeito de suas respectivas atribuições legais, assinale a afirmativa correta:",
    "codeCitation": "Lei nº 4.595/1964 (Lei do Sistema Financeiro Nacional)",
    "options": [
      {
        "id": "q-cesgranrio-46-opt-a",
        "text": "(A) O Conselho Monetário Nacional (CMN) é órgão normativo máximo do SFN, cabendo ao Banco Central do Brasil (BACEN) a função de órgão supervisor e executivo das diretrizes monetárias.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-46-opt-b",
        "text": "(B) O BACEN tem competência para fixar a meta anual de inflação do país por meio de decreto próprio.",
        "isCorrect": false,
        "distractorReason": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-46-opt-c",
        "text": "(C) O CMN executa diretamente operações de redesconto e fiscaliza as cooperativas de crédito no dia a dia.",
        "isCorrect": false,
        "distractorReason": "A execução e fiscalização cabem ao BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-46-opt-d",
        "text": "(D) A emissão de papel-moeda e moeda metálica é privativa do Conselho Monetário Nacional.",
        "isCorrect": false,
        "distractorReason": "A emissão é executada pelo Banco Central nas condições fixadas pelo CMN.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-46-opt-e",
        "text": "(E) O CMN é composto por todos os presidentes dos bancos públicos federais.",
        "isCorrect": false,
        "distractorReason": "O CMN é composto pelo Ministro da Fazenda, Ministro do Planejamento e Presidente do BACEN.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O CMN é o órgão deliberativo/normativo máximo da política monetária e de crédito. O BACEN é a autarquia supervisora e executora da política traçada pelo CMN.",
    "lawArticles": [
      "Lei 4.595/1964",
      "Decreto 3.088/1999"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Quem fixa a meta de inflação é o CMN, e não o BACEN!",
      "keyConcept": "Sistema Financeiro Nacional: CMN e BACEN",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-47",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-banco-2",
    "topicName": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 10]\n\nUm cliente investidor com perfil conservador procurou uma agência bancária buscando opções de aplicação financeira garantidas pelo Fundo Garantidor de Créditos (FGC) e com isenção de Imposto de Renda para pessoa física. O empregado da Caixa deverá orientá-lo a aplicar em:",
    "codeCitation": "Lei 10.931/2004 (LCI), Lei 11.076/2004 (LCA) e Estatuto do FGC",
    "options": [
      {
        "id": "q-cesgranrio-47-opt-a",
        "text": "(A) Letras de Crédito Imobiliário (LCI) ou Letras de Crédito do Agronegócio (LCA).",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-47-opt-b",
        "text": "(B) Certificado de Depósito Bancário (CDB) pré-fixado de liquidez diária.",
        "isCorrect": false,
        "distractorReason": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-47-opt-c",
        "text": "(C) Debêntures incentivadas de infraestrutura de concessionária de rodovias.",
        "isCorrect": false,
        "distractorReason": "Debêntures possuem isenção de IR, mas NÃO contam com garantia do FGC!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-47-opt-d",
        "text": "(D) Cotas de Fundos de Investimento em Ações (FIA) com foco em dividendos.",
        "isCorrect": false,
        "distractorReason": "Fundos de ações não têm garantia do FGC nem isenção de IR na modalidade padrão.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-47-opt-e",
        "text": "(E) Certificados de Recebíveis Imobiliários (CRI) emitidos por securitizadoras.",
        "isCorrect": false,
        "distractorReason": "CRI e CRA são isentos de IR, mas NÃO têm cobertura do FGC.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "Apenas LCI e LCA reúnem simultaneamente a garantia ordinária do FGC (até R$ 250 mil) e a isenção de Imposto de Renda sobre rendimentos auferidos por pessoa física.",
    "lawArticles": [
      "Lei 10.931/2004",
      "Resolução CMN 4.222/2013 (FGC)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "CDB tem garantia do FGC, mas NÃO tem isenção de Imposto de Renda (tabela regressiva).",
      "keyConcept": "Produtos de Renda Fixa: CDB, LCI, LCA e FGC",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-48",
    "subjectId": "sub-bancarios",
    "subjectName": "Conhecimentos Bancários",
    "topicId": "top-pld-1",
    "topicName": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
    "banca": "Cesgranrio",
    "year": 2023,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Escriturário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 10]\n\nO crime de lavagem de capitais (Lei nº 9.613/1998 com alterações da Lei nº 12.683/2012) caracteriza-se por três fases clássicas: Colocação (Placement), Ocultação/Dissimulação (Layering) e Integração (Integration). A respeito desse delito e das obrigações das instituições financeiras, assinale a afirmativa correta:",
    "codeCitation": "Art. 1º e Art. 10 da Lei 9.613/1998 (com redação da Lei 12.683/2012)",
    "options": [
      {
        "id": "q-cesgranrio-48-opt-a",
        "text": "(A) A caracterização do crime de lavagem de dinheiro exige que a infração penal antecedente conste de rol taxativo expressamente previsto em lei.",
        "isCorrect": false,
        "distractorReason": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-48-opt-b",
        "text": "(B) Qualquer infração penal (crime ou contravenção penal) pode figurar como antecedente do delito de lavagem de dinheiro.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-48-opt-c",
        "text": "(C) As operações financeiras suspeitas só devem ser comunicadas ao COAF caso o cliente já esteja formalmente indiciado em inquérito policial.",
        "isCorrect": false,
        "distractorReason": "A comunicação ao COAF é preventiva e não depende de indiciamento ou certeza.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-48-opt-d",
        "text": "(D) A instituição bancária deve dar ciência imediata ao cliente de que seus dados foram encaminhados para averiguação do COAF.",
        "isCorrect": false,
        "distractorReason": "É expressamente vedado dar ciência ao cliente da comunicação de operação suspeita (sigilo absoluto).",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-48-opt-e",
        "text": "(E) A tentativa no crime de lavagem de capitais não é admitida pela legislação penal brasileira.",
        "isCorrect": false,
        "distractorReason": "A tentativa é plenamente punível com redução de pena de 1 a 2 terços.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "A Lei 12.683/2012 adotou o modelo de 3ª geração de combate à lavagem de dinheiro, admitindo QUALQUER infração penal (incluindo contravenções como jogo do bicho) como antecedente.",
    "lawArticles": [
      "Art. 1º, Lei 9.613/1998",
      "Circular BACEN 3.978/2020"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A Lei 12.683/12 extinguiu o rol taxativo de crimes antecedentes; agora QUALQUER infração penal antecedente pode gerar lavagem.",
      "keyConcept": "Prevenção à Lavagem de Dinheiro (Lei 9.613/98)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-49",
    "subjectId": "sub-vendas",
    "subjectName": "Atendimento e Vendas",
    "topicId": "top-vendas-1",
    "topicName": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 10]\n\nDeterminado cliente compareceu à agência bancária para contratar crédito pessoal e foi informado pelo funcionário de que a concessão do empréstimo estava estritamente condicionada à contratação de um seguro de vida e de um título de capitalização. Essa conduta da instituição financeira:",
    "codeCitation": "Art. 39, I do Código de Defesa do Consumidor (CDC) e Súmula 297 do STJ",
    "options": [
      {
        "id": "q-cesgranrio-49-opt-a",
        "text": "(A) Configura a prática abusiva de \"venda casada\", expressamente vedada pelo Código de Defesa do Consumidor e repudiada pela Súmula 297 do STJ.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-49-opt-b",
        "text": "(B) É lícita, pois os bancos possuem liberdade contratual plena para exigir garantias cruzadas em operações de mútuo.",
        "isCorrect": false,
        "distractorReason": "O CDC prevalece sobre a conveniência da instituição financeira.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-49-opt-c",
        "text": "(C) É permitida desde que o valor total do seguro não ultrapasse 5% do montante emprestado.",
        "isCorrect": false,
        "distractorReason": "A venda casada é ilícita qualquer que seja o valor envolvido.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-49-opt-d",
        "text": "(D) Só pode ser considerada ilegal se o cliente comprovar que não possui restrição prévia em cadastros de proteção ao crédito (Serasa/SPC).",
        "isCorrect": false,
        "distractorReason": "Prática abusiva objetiva independente de cadastro.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-49-opt-e",
        "text": "(E) É regulamentada expressamente como obrigatória pelo Conselho Monetário Nacional para amortização de inadimplência.",
        "isCorrect": false,
        "distractorReason": "O BACEN veda terminantemente a venda casada.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "O art. 39, I, do CDC proíbe condicionar o fornecimento de produto ou de serviço ao fornecimento de outro produto ou serviço (venda casada). A Súmula 297 do STJ pacificou que o CDC incide sobre as instituições financeiras.",
    "lawArticles": [
      "Art. 39, I, Lei 8.078/1990 (CDC)",
      "Súmula 297/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "O CDC prevalece sobre a conveniência da instituição financeira.",
      "keyConcept": "Código de Defesa do Consumidor e Bancos (Súmula 297 STJ)",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cesgranrio-50",
    "subjectId": "sub-rlm",
    "subjectName": "Matemática Financeira",
    "topicId": "top-fin-cesgranrio",
    "topicName": "Sistemas de Amortização: SAC vs Price",
    "banca": "Cesgranrio",
    "year": 2024,
    "institution": "Banco do Brasil (Agente Comercial)",
    "role": "Técnico Bancário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Cesgranrio - Concurso Banco do Brasil (Agente Comercial) - Simulado Rodada 10]\n\nNo Sistema de Amortização Constante (SAC), ao longo de um financiamento imobiliário contraído perante a Caixa Econômica Federal:",
    "codeCitation": "Conceitos Oficiais de Matemática Financeira e Financiamentos Imobiliários CEF",
    "options": [
      {
        "id": "q-cesgranrio-50-opt-a",
        "text": "(A) O valor da amortização mensal permanece constante, fazendo com que o saldo devedor, os juros e o valor total das prestações sejam decrescentes ao longo do tempo.",
        "isCorrect": true
      },
      {
        "id": "q-cesgranrio-50-opt-b",
        "text": "(B) O valor das prestações mensais é constante e invariável durante toda a vigência do contrato.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-50-opt-c",
        "text": "(C) A amortização mensal é crescente, enquanto a parcela de juros permanece inalterada.",
        "isCorrect": false,
        "distractorReason": "Na Price a amortização é crescente; no SAC a amortização é constante.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-50-opt-d",
        "text": "(D) Não há cobrança de juros compostos, incidindo apenas correção monetária pela TR.",
        "isCorrect": false,
        "distractorReason": "Há incidência regular de juros remuneratórios compostos.",
        "distractorType": "conceito_correto_contexto_errado"
      },
      {
        "id": "q-cesgranrio-50-opt-e",
        "text": "(E) O saldo devedor só começa a ser amortizado a partir da metade do prazo total contratado.",
        "isCorrect": false,
        "distractorReason": "A amortização se inicia logo no pagamento da 1ª parcela.",
        "distractorType": "conceito_correto_contexto_errado"
      }
    ],
    "explanation": "No SAC, a quota de amortização é rigorosamente constante (A = Saldo / n). Como o saldo devedor diminui mês a mês, a parcela de juros decresce, resultando em prestações periódicas decrescentes.",
    "lawArticles": [
      "Matemática Financeira: Tabela SAC vs Tabela Price"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito da Tabela Price (Sistema Francês de Amortização)!",
      "keyConcept": "Sistemas de Amortização: SAC vs Price",
      "bancaTendency": "A Cesgranrio costuma apresentar cenários de agência bancária exigindo aplicação direta das resoluções do CMN/BACEN e do CDC."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Cesgranrio Banco do Brasil (Agente Comercial) / Prova Auditada",
    "legalStatus": "atualizada"
  }
];
