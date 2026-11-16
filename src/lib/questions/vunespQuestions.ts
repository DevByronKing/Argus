import { Question } from '../types';

export const VUNESP_QUESTIONS: Question[] = [
  {
    "id": "q-vunesp-1",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "Nos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-1-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-1-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-1-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-1-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-1-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-2",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "De acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-2-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-2-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-2-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-2-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-2-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-3",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "Conforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-3-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-3-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-3-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-3-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-3-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-4",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "De acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-4-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-4-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-4-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-4-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-4-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-5",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "Assinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-5-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-5-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-5-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-5-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-5-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-6",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 2]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-6-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-6-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-6-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-6-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-6-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-7",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 2]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-7-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-7-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-7-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-7-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-7-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-8",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 2]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-8-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-8-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-8-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-8-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-8-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-9",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 2]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-9-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-9-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-9-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-9-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-9-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-10",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 2]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-10-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-10-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-10-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-10-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-10-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-11",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 3]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-11-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-11-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-11-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-11-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-11-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-12",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 3]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-12-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-12-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-12-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-12-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-12-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-13",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 3]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-13-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-13-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-13-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-13-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-13-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-14",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 3]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-14-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-14-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-14-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-14-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-14-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-15",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 3]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-15-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-15-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-15-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-15-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-15-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-16",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 4]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-16-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-16-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-16-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-16-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-16-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-17",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 4]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-17-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-17-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-17-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-17-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-17-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-18",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 4]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-18-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-18-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-18-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-18-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-18-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-19",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 4]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-19-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-19-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-19-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-19-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-19-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-20",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 4]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-20-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-20-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-20-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-20-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-20-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-21",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 5]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-21-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-21-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-21-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-21-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-21-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-22",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 5]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-22-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-22-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-22-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-22-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-22-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-23",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 5]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-23-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-23-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-23-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-23-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-23-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-24",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 5]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-24-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-24-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-24-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-24-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-24-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-25",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 5]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-25-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-25-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-25-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-25-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-25-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-26",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Capital (São Paulo) - Simulado Rodada 6]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-26-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-26-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-26-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-26-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-26-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-27",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Capital (São Paulo) - Simulado Rodada 6]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-27-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-27-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-27-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-27-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-27-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-28",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Capital (São Paulo) - Simulado Rodada 6]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-28-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-28-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-28-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-28-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-28-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-29",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Capital (São Paulo) - Simulado Rodada 6]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-29-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-29-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-29-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-29-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-29-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-30",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Capital (São Paulo) - Simulado Rodada 6]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-30-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-30-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-30-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-30-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-30-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-31",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 7]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-31-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-31-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-31-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-31-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-31-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-32",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 7]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-32-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-32-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-32-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-32-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-32-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-33",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 7]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-33-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-33-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-33-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-33-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-33-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-34",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 7]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-34-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-34-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-34-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-34-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-34-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-35",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Campinas - Simulado Rodada 7]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-35-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-35-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-35-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-35-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-35-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-36",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 8]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-36-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-36-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-36-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-36-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-36-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-37",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 8]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-37-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-37-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-37-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-37-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-37-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-38",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 8]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-38-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-38-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-38-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-38-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-38-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-39",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 8]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-39-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-39-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-39-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-39-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-39-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-40",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Ribeirão Preto - Simulado Rodada 8]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-40-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-40-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-40-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-40-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-40-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-41",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 9]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-41-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-41-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-41-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-41-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-41-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-42",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 9]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-42-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-42-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-42-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-42-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-42-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-43",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 9]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-43-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-43-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-43-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-43-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-43-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-44",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 9]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-44-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-44-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-44-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-44-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-44-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-45",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de Santos - Simulado Rodada 9]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-45-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-45-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-45-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-45-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-45-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-46",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-1",
    "topicName": "Atos Processuais e Contagem de Prazos Úteis",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 10]\n\nNos termos do Código de Processo Civil (Lei nº 13.105/2015), na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de ato processual:",
    "codeCitation": "Art. 219 do Código de Processo Civil (CPC/15)",
    "options": [
      {
        "id": "q-vunesp-46-opt-a",
        "text": "(A) Computar-se-ão somente os dias úteis, aplicando-se essa regra exclusivamente aos prazos processuais.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-46-opt-b",
        "text": "(B) Computar-se-ão os dias corridos, incluindo-se sábados, domingos e feriados, salvo recesso forense.",
        "isCorrect": false,
        "distractorReason": "Regra anterior do CPC de 1973.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-46-opt-c",
        "text": "(C) Computar-se-ão os dias úteis para prazos de direito processual e também para os prazos de direito material, como a prescrição e decadência.",
        "isCorrect": false,
        "distractorReason": "Prazos de direito material computam-se em dias corridos (art. 219, parágrafo único).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-46-opt-d",
        "text": "(D) O dia do começo e o dia do vencimento são ambos incluídos na contagem do prazo processual.",
        "isCorrect": false,
        "distractorReason": "Exclui-se o dia do começo e inclui-se o do vencimento (art. 224).",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-46-opt-e",
        "text": "(E) Os prazos processuais para a Defensoria Pública são contados em quádruplo e em dias úteis.",
        "isCorrect": false,
        "distractorReason": "Defensoria Pública tem prazo em dobro (art. 186), não em quádruplo.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 219, CPC: \"Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único: O disposto neste artigo aplica-se somente aos prazos processuais.\"",
    "lawArticles": [
      "Art. 219, CPC/15",
      "Art. 224, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Regra anterior do CPC de 1973.",
      "keyConcept": "Atos Processuais e Contagem de Prazos Úteis",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-47",
    "subjectId": "sub-proc-civil",
    "subjectName": "Direito Processual Civil",
    "topicId": "top-proc-civ-2",
    "topicName": "Tutela Provisória de Urgência e Evidência",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 10]\n\nDe acordo com o CPC/15, a tutela de evidência será concedida, independentemente da demonstração de perigo de dano ou de risco ao resultado útil do processo, quando:",
    "codeCitation": "Art. 311, II do Código de Processo Civil",
    "options": [
      {
        "id": "q-vunesp-47-opt-a",
        "text": "(A) As alegações de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em súmula vinculante.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-47-opt-b",
        "text": "(B) Houver fundado receio de que uma das partes cause ao direito da outra lesão grave e de difícil reparação.",
        "isCorrect": false,
        "distractorReason": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-47-opt-c",
        "text": "(C) O autor for beneficiário da justiça gratuita e o réu for pessoa jurídica de direito público.",
        "isCorrect": false,
        "distractorReason": "Não há essa correlação legal.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-47-opt-d",
        "text": "(D) A petição inicial for instruída com prova testemunhal colhida em audiência de justificação prévia.",
        "isCorrect": false,
        "distractorReason": "Tutela de evidência do inciso II exige prova DOCUMENTAL robusta.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-47-opt-e",
        "text": "(E) O magistrado entender por mera equidade que o autor possui maior vulnerabilidade financeira.",
        "isCorrect": false,
        "distractorReason": "As hipóteses do art. 311 são taxativas.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "A tutela de evidência prescinde do perigo de dano (periculum in mora). No inciso II do art. 311, ela é concedida quando houver prova documental + tese em repetitivo ou súmula vinculante.",
    "lawArticles": [
      "Art. 311, II, CPC/15"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Esse é o conceito de perigo da demora da TUTELA DE URGÊNCIA (art. 300), não de evidência!",
      "keyConcept": "Tutela Provisória de Urgência e Evidência",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-48",
    "subjectId": "sub-normas-tjsp",
    "subjectName": "Normas da Corregedoria TJ-SP",
    "topicId": "top-normas-1",
    "topicName": "Livros e Classificadores Obrigatórios nas Varas",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente Técnico Judiciário",
    "difficulty": "Difícil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 10]\n\nConforme as Normas da Corregedoria Geral da Justiça do Estado de São Paulo (Tomo I), os atos praticados pelos escreventes e chefes de seção em cumprimento a despachos judiciais devem conter:",
    "codeCitation": "Art. 91 e seguintes das Normas da Corregedoria Geral da Justiça do TJ-SP",
    "options": [
      {
        "id": "q-vunesp-48-opt-a",
        "text": "(A) Data, rubrica e o número de matrícula do servidor responsável pela elaboração do expediente.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-48-opt-b",
        "text": "(B) Apenas a assinatura do juiz titular da vara, sendo dispensada a identificação do escrevente.",
        "isCorrect": false,
        "distractorReason": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-48-opt-c",
        "text": "(C) O carimbo de recebimento do Ministério Público em todos os despachos sem exceção.",
        "isCorrect": false,
        "distractorReason": "Apenas processos com intervenção obrigatória do MP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-48-opt-d",
        "text": "(D) A chancela digital emitida exclusivamente pela OAB Seccional de São Paulo.",
        "isCorrect": false,
        "distractorReason": "A certificação é institucional do TJ-SP.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-48-opt-e",
        "text": "(E) O recolhimento prévio de emolumentos notariais em favor do tabelião de notas da comarca.",
        "isCorrect": false,
        "distractorReason": "Atos judiciais do ofício de justiça não recolhem emolumentos notariais.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "As Normas da Corregedoria do TJ-SP determinam que qualquer termo, certidão ou ato lavrado nos autos judiciais deve conter a data, rubrica e o número de matrícula do servidor que o praticou.",
    "lawArticles": [
      "Art. 91, Tomo I, NSCGJ/SP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "As normas exigem expressamente a rubrica e matrícula do funcionário.",
      "keyConcept": "Livros e Classificadores Obrigatórios nas Varas",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-49",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo Estadual",
    "topicId": "top-estatuto-sp",
    "topicName": "Penalidades Disciplinares e Demissão",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Fácil",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 10]\n\nDe acordo com o Estatuto dos Funcionários Públicos Civis do Estado de São Paulo (Lei nº 10.261/1968), será aplicada a pena de DEMISSÃO A BEM DO SERVIÇO PÚBLICO ao funcionário que:",
    "codeCitation": "Art. 257, I da Lei Estadual nº 10.261/1968",
    "options": [
      {
        "id": "q-vunesp-49-opt-a",
        "text": "(A) Praticar ato de insubordinação grave no serviço.",
        "isCorrect": false,
        "distractorReason": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-49-opt-b",
        "text": "(B) Cometer crime contra a boa ordem da administração pública, a fé pública ou a Fazenda do Estado.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-49-opt-c",
        "text": "(C) Faltar ao serviço sem causa justificável por mais de dez dias consecutivos.",
        "isCorrect": false,
        "distractorReason": "Abandono de cargo exige mais de 30 dias consecutivos.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-49-opt-d",
        "text": "(D) Apresentar atestado médico de clínica particular sem prévia homologação pelo DPME.",
        "isCorrect": false,
        "distractorReason": "Não é hipótese capitulada como demissão a bem do serviço público.",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-49-opt-e",
        "text": "(E) Chegar com atraso injustificado por três vezes no mesmo mês de exercício.",
        "isCorrect": false,
        "distractorReason": "Falta leve que gera repreensão ou perda pecuniária do dia.",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Art. 257, I, Lei 10.261/68: Será aplicada a pena de demissão a bem do serviço público ao funcionário que cometer crime contra a administração pública, a fé pública ou a Fazenda do Estado.",
    "lawArticles": [
      "Art. 257, I, Lei 10.261/1968"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Insubordinação grave acarreta demissão simples (art. 256, II), e não demissão a bem do serviço público.",
      "keyConcept": "Penalidades Disciplinares e Demissão",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-vunesp-50",
    "subjectId": "sub-portugues",
    "subjectName": "Língua Portuguesa",
    "topicId": "top-port-vunesp-1",
    "topicName": "Crase e Regência na Vunesp",
    "banca": "Vunesp",
    "year": 2024,
    "institution": "TJ-SP",
    "role": "Escrevente",
    "difficulty": "Média",
    "format": "multipla_escolha",
    "statement": "[Vunesp - Concurso TJ-SP Escrevente - Comarca de São José dos Campos - Simulado Rodada 10]\n\nAssinale a alternativa em que o sinal indicativo de crase está empregado em estrita conformidade com a norma-padrão da língua portuguesa:",
    "codeCitation": "Gramática Normativa: Regras de Ocorrência da Crase",
    "options": [
      {
        "id": "q-vunesp-50-opt-a",
        "text": "(A) O escrevente encaminhou os mandados de citação àquele oficial de justiça designado pelo juiz.",
        "isCorrect": true
      },
      {
        "id": "q-vunesp-50-opt-b",
        "text": "(B) O magistrado solicitou a presença de todos os interessados à comparecerem ao fórum.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de verbos (\"comparecerem\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-50-opt-c",
        "text": "(C) A decisão foi redigida à lápis pelo juiz leigo durante a audiência de conciliação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de palavras masculinas (\"lápis\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-50-opt-d",
        "text": "(D) O réu permaneceu calado e recusou-se a responder à qualquer pergunta da acusação.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase antes de pronomes indefinidos (\"qualquer\").",
        "distractorType": "distrator_temporal"
      },
      {
        "id": "q-vunesp-50-opt-e",
        "text": "(E) Os processos foram digitalizados um à um pelos estagiários da vara judicial.",
        "isCorrect": false,
        "distractorReason": "É vedada a crase entre palavras repetidas (\"um a um\").",
        "distractorType": "distrator_temporal"
      }
    ],
    "explanation": "Haverá crase diante dos pronomes demonstrativos aquele(s), aquela(s), aquilo quando o termo regente exigir preposição \"a\" (quem encaminha, encaminha algo A alguém: encaminhou ÀQUELE oficial).",
    "lawArticles": [
      "Sintaxe de Regência e Emprego do Sinal Indicativo de Crase"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "É vedada a crase antes de verbos (\"comparecerem\").",
      "keyConcept": "Crase e Regência na Vunesp",
      "bancaTendency": "A banca Vunesp testa rigorosamente a memorização dos dispositivos dos Códigos e das Normas da Corregedoria."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial Vunesp TJ-SP Escrevente / Prova Auditada",
    "legalStatus": "atualizada"
  }
];
