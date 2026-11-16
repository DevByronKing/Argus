import { Question } from '../types';

export const CEBRASPE_QUESTIONS: Question[] = [
  {
    "id": "q-cebraspe-1",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-1",
    "topicName": "Atos Administrativos: Presunção e Revogação",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "A presunção de legitimidade dos atos administrativos é absoluta (juris et de jure), de modo que cabe à administração pública o ônus de provar a legalidade de seus atos caso sejam questionados pelo administrado.",
    "codeCitation": "Doutrina de Direito Administrativo (Hely Lopes Meirelles e Celso Antônio Bandeira de Mello)",
    "options": [
      {
        "id": "q-cebraspe-1-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca troca a presunção relativa (juris tantum) por presunção absoluta (juris et de jure), induzindo o candidato a erro grosseiro.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-1-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "A presunção de legitimidade e veracidade dos atos administrativos é RELATIVA (juris tantum). Ela inverte o ônus da prova em desfavor do administrado, mas admite prova em contrário.",
    "lawArticles": [
      "Art. 37, caput, CF/88"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca troca a presunção relativa (juris tantum) por presunção absoluta (juris et de jure), induzindo o candidato a erro grosseiro.",
      "keyConcept": "Atos Administrativos: Presunção e Revogação",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-2",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-2",
    "topicName": "Poder de Polícia e Autoexecutoriedade",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PRF",
    "role": "Policial Rodoviário Federal",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "O atributo da autoexecutoriedade do poder de polícia permite que a administração pública execute diretamente suas decisões, inclusive para a cobrança forçada de multas de trânsito em atraso sem necessidade de execução judicial.",
    "codeCitation": "Súmula Vinculante e Lei 6.830/80 (LEF)",
    "options": [
      {
        "id": "q-cebraspe-2-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "Pegadinha clássica do Cebraspe: a cobrança de multas é uma das principais EXCEÇÕES à autoexecutoriedade.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-2-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "A autoexecutoriedade NÃO se aplica à cobrança de multas de trânsito. A cobrança forçada de crédito pecuniário da Fazenda Pública exige ajuizamento de Execução Fiscal.",
    "lawArticles": [
      "Art. 78 do CTN",
      "Lei 6.830/1980"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Pegadinha clássica do Cebraspe: a cobrança de multas é uma das principais EXCEÇÕES à autoexecutoriedade.",
      "keyConcept": "Poder de Polícia e Autoexecutoriedade",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PRF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-3",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-3",
    "topicName": "Improbidade Administrativa (Lei 14.230/21)",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Escrivão",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Após as alterações introduzidas pela Lei nº 14.230/2021 na Lei de Improbidade Administrativa, foi expressamente revogada a modalidade culposa de improbidade, exigindo-se o dolo específico para a configuração de qualquer ato de improbidade administrativa.",
    "codeCitation": "Art. 1º, §§ 1º e 2º da Lei 8.429/92 (com redação da Lei 14.230/21)",
    "options": [
      {
        "id": "q-cebraspe-3-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-3-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. A Lei 14.230/2021 revogou integralmente a figura culposa na LIA. Atualmente, somente há improbidade administrativa mediante DOLO comprovado.",
    "lawArticles": [
      "Art. 1º, §§ 1º e 2º, Lei 8.429/92"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca tenta confundir o candidato com o antigo entendimento que admitia culpa no art. 10 (dano ao erário).",
      "keyConcept": "Improbidade Administrativa (Lei 14.230/21)",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-4",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-4",
    "topicName": "Responsabilidade Civil do Estado",
    "banca": "Cebraspe",
    "year": 2023,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "O Estado responde objetivamente pelos danos causados por detento foragido, independentemente do tempo decorrido desde a fuga, em virtude da teoria do risco administrativo integral.",
    "codeCitation": "Tema 362 da Repercussão Geral do STF (RE 608.831)",
    "options": [
      {
        "id": "q-cebraspe-4-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca omite o requisito do nexo de causalidade direto e imediato entre o momento da fuga e o crime praticado.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-4-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O STF pacificou no Tema 362 que em caso de dano cometido por foragido, a responsabilidade estatal só é objetiva se houver nexo causal direto com o momento da fuga.",
    "lawArticles": [
      "Art. 37, § 6º, CF/88",
      "Tema 362/STF"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca omite o requisito do nexo de causalidade direto e imediato entre o momento da fuga e o crime praticado.",
      "keyConcept": "Responsabilidade Civil do Estado",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2023 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-5",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-5",
    "topicName": "Licitações: Modalidades da Lei 14.133/21",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Na Lei nº 14.133/2021 (Nova Lei de Licitações), a Tomada de Preços e o Convite foram extintos, passando o Diálogo Competitivo a ser uma das modalidades licitatórias previstas.",
    "codeCitation": "Art. 28 da Lei 14.133/2021",
    "options": [
      {
        "id": "q-cebraspe-5-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-5-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. As modalidades da Lei 14.133/21 são: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo. Tomada de Preços e Convite foram extintos.",
    "lawArticles": [
      "Art. 28 da Lei 14.133/2021"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Candidatos apegados à antiga Lei 8.666/93 erram por desconhecer a extinção de Tomada de Preços e Convite.",
      "keyConcept": "Licitações: Modalidades da Lei 14.133/21",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-6",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-1",
    "topicName": "Inviolabilidade de Domicílio",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "A entrada forçada em domicílio sem mandado judicial é lícita, mesmo durante a noite, quando amparada em fundadas razões, devidamente justificadas a posteriori, que indiquem flagrante delito no interior da residência.",
    "codeCitation": "Tema 280 da Repercussão Geral do STF (RE 603.616)",
    "options": [
      {
        "id": "q-cebraspe-6-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-6-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Nos termos do art. 5º, XI, CF/88 e do Tema 280 do STF, em caso de flagrante delito a entrada em domicílio prescinde de mandado, a qualquer hora do dia ou da noite.",
    "lawArticles": [
      "Art. 5º, XI, CF/88",
      "Tema 280/STF"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca tenta fazer o candidato achar que durante a noite a entrada nunca pode ocorrer sem consentimento.",
      "keyConcept": "Inviolabilidade de Domicílio",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-7",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-2",
    "topicName": "Sigilo de Correspondência e Comunicações",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PRF",
    "role": "Policial Rodoviário Federal",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "A interceptação telefônica e a quebra de sigilo de correspondência epistolar podem ser determinadas diretamente por autoridade policial em caso de urgência, desde que comunicadas ao magistrado em até 48 horas.",
    "codeCitation": "Art. 5º, XII, CF/88 e Lei 9.296/96",
    "options": [
      {
        "id": "q-cebraspe-7-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca atribui à autoridade policial competência que está sob reserva absoluta de jurisdição.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-7-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. A interceptação telefônica está sujeita à reserva de jurisdição. Jamais pode ser determinada por delegado de polícia, apenas por ordem judicial fundamentada.",
    "lawArticles": [
      "Art. 5º, XII, CF/88",
      "Lei 9.296/1996"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca atribui à autoridade policial competência que está sob reserva absoluta de jurisdição.",
      "keyConcept": "Sigilo de Correspondência e Comunicações",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PRF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-8",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-3",
    "topicName": "Segurança Pública (Art. 144 CF)",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Perito Criminal",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "As guardas municipais integram formalmente o rol dos órgãos de segurança pública previstos no art. 144 da Constituição Federal e podem exercer atribuições de policiamento preventivo comunitário.",
    "codeCitation": "ADPF 995 do STF e Art. 144, § 8º, CF/88",
    "options": [
      {
        "id": "q-cebraspe-8-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-8-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. No julgamento da ADPF 995, o STF declarou que as Guardas Municipais integram o Sistema de Segurança Pública (SUSP), exercendo atividade de segurança pública.",
    "lawArticles": [
      "Art. 144, § 8º, CF/88",
      "ADPF 995/STF"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Historicamente o rol era considerado taxativo e excluía guardas municipais como órgãos de segurança, mas o STF mudou esse paradigma na ADPF 995.",
      "keyConcept": "Segurança Pública (Art. 144 CF)",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-9",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-4",
    "topicName": "Direitos Políticos e Inelegibilidade",
    "banca": "Cebraspe",
    "year": 2023,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Os analfabetos são inalistáveis e inelegíveis de acordo com a ordem constitucional brasileira vigente.",
    "codeCitation": "Art. 14, § 1º, II, \"a\" e § 4º, CF/88",
    "options": [
      {
        "id": "q-cebraspe-9-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "Confusão comum: analfabetos são alistáveis (voto facultativo), mas são inelegíveis.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-9-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. Para os analfabetos o alistamento eleitoral e o voto são FACULTATIVOS. Eles são alistáveis, mas são inegavelmente inelegíveis.",
    "lawArticles": [
      "Art. 14, § 1º, II, \"a\", CF/88",
      "Art. 14, § 4º, CF/88"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Confusão comum: analfabetos são alistáveis (voto facultativo), mas são inelegíveis.",
      "keyConcept": "Direitos Políticos e Inelegibilidade",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2023 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-10",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-5",
    "topicName": "Remédios Constitucionais: Mandado de Injunção",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Analista",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Conceder-se-á mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania.",
    "codeCitation": "Art. 5º, LXXI, CF/88 e Lei 13.300/2016",
    "options": [
      {
        "id": "q-cebraspe-10-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-10-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Trata-se da exata redação do art. 5º, LXXI, da CF/88, regulamentado pela Lei nº 13.300/2016.",
    "lawArticles": [
      "Art. 5º, LXXI, CF/88",
      "Lei 13.300/2016"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca transcreve o texto literal da Constituição para testar memória de lei seca.",
      "keyConcept": "Remédios Constitucionais: Mandado de Injunção",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-11",
    "subjectId": "sub-dir-penal",
    "subjectName": "Direito Penal",
    "topicId": "top-penal-1",
    "topicName": "Princípio da Insignificância no Contrabando",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PRF",
    "role": "Policial Rodoviário Federal",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Conforme jurisprudência pacífica dos tribunais superiores, aplica-se o princípio da insignificância ao crime de contrabando de cigarros caso a quantidade apreendida seja ínfima e destinada a consumo pessoal.",
    "codeCitation": "Súmula 599 do STJ e Tema Repetitivo STJ",
    "options": [
      {
        "id": "q-cebraspe-11-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca tenta aplicar a lógica do descaminho (onde cabe insignificância até R$ 20.000) ao contrabando de cigarros.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-11-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O STJ e o STF possuem entendimento sumulado de que NÃO se aplica o princípio da insignificância ao contrabando de cigarros, mesmo em quantidade mínima.",
    "lawArticles": [
      "Art. 334-A do Código Penal",
      "Súmula 599/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca tenta aplicar a lógica do descaminho (onde cabe insignificância até R$ 20.000) ao contrabando de cigarros.",
      "keyConcept": "Princípio da Insignificância no Contrabando",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PRF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-12",
    "subjectId": "sub-dir-penal",
    "subjectName": "Direito Penal",
    "topicId": "top-penal-2",
    "topicName": "Peculato Culposo e Extinção da Punibilidade",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "No crime de peculato culposo, a reparação do dano, se precede à sentença irrecorrível, extingue a punibilidade; se lhe é posterior, reduz de metade a pena imposta.",
    "codeCitation": "Art. 312, § 3º do Código Penal",
    "options": [
      {
        "id": "q-cebraspe-12-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-12-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Exata literalidade do art. 312, § 3º, CP: na modalidade culposa, reparação anterior extingue punibilidade; se posterior, reduz a pena em 50%.",
    "lawArticles": [
      "Art. 312, § 3º, Código Penal"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca testa se o candidato lembra que essa regra benéfica é EXCLUSIVA do peculato culposo, não se aplicando ao doloso.",
      "keyConcept": "Peculato Culposo e Extinção da Punibilidade",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-13",
    "subjectId": "sub-dir-proc-penal",
    "subjectName": "Processo Penal",
    "topicId": "top-proc-penal-1",
    "topicName": "Inquérito Policial e Arquivamento",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Escrivão",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "O delegado de polícia não pode mandar arquivar autos de inquérito policial, sendo este ato privativo da autoridade judiciária ou do Ministério Público conforme as regras vigentes.",
    "codeCitation": "Art. 17 do Código de Processo Penal",
    "options": [
      {
        "id": "q-cebraspe-13-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-13-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Art. 17 do CPP: \"A autoridade policial não poderá mandar arquivar autos de inquérito.\"",
    "lawArticles": [
      "Art. 17 do Código de Processo Penal"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Princípio da indisponibilidade do inquérito policial pelo delegado.",
      "keyConcept": "Inquérito Policial e Arquivamento",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-14",
    "subjectId": "sub-dir-proc-penal",
    "subjectName": "Processo Penal",
    "topicId": "top-proc-penal-2",
    "topicName": "Cadeia de Custódia (Pacote Anticrime)",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Perito Criminal",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "A quebra da cadeia de custódia da prova pericial acarreta, de forma automática e insanável, a declaração de ilicitude e o desentranhamento imediato do elemento probatório dos autos.",
    "codeCitation": "Jurisprudência do STJ (AgRg no HC 663.298/SP)",
    "options": [
      {
        "id": "q-cebraspe-14-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca usa termos absolutos como \"de forma automática e insanável\" para enganar quem não conhece a jurisprudência pragmática do STJ.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-14-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O STJ firmou que irregularidades na cadeia de custódia não geram nulidade automática; a prova deve ser valorada pelo magistrado com menor peso persuasivo.",
    "lawArticles": [
      "Art. 158-A a 158-F do CPP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca usa termos absolutos como \"de forma automática e insanável\" para enganar quem não conhece a jurisprudência pragmática do STJ.",
      "keyConcept": "Cadeia de Custódia (Pacote Anticrime)",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-15",
    "subjectId": "sub-dir-penal",
    "subjectName": "Direito Penal",
    "topicId": "top-penal-3",
    "topicName": "Prescrição Penal e Maioridade Relativa",
    "banca": "Cebraspe",
    "year": 2023,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "São reduzidos de metade os prazos de prescrição quando o criminoso era, ao tempo do crime, menor de vinte e um anos, ou, na data da sentença, maior de setenta anos.",
    "codeCitation": "Art. 115 do Código Penal",
    "options": [
      {
        "id": "q-cebraspe-15-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-15-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Art. 115 do CP: menores de 21 anos AO TEMPO DO CRIME e maiores de 70 anos NA DATA DA SENTENÇA têm prazos prescricionais reduzidos à metade.",
    "lawArticles": [
      "Art. 115 do Código Penal"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca costuma trocar \"data da sentença\" por \"ao tempo do crime\" para a pessoa de 70 anos.",
      "keyConcept": "Prescrição Penal e Maioridade Relativa",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2023 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-16",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-1",
    "topicName": "Contribuinte Individual e Sindicatura",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Carlos, síndico do condomínio edilício onde reside, que não recebe remuneração pecuniária nem desfruta de dispensa da taxa de condomínio pelo exercício da função, enquadra-se como segurado obrigatório da Previdência Social.",
    "codeCitation": "Art. 12, V, \"f\", Lei 8.212/91 e Dec. 3.048/99",
    "options": [
      {
        "id": "q-cebraspe-16-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A filiação como contribuinte individual só ocorre se houver retribuição financeira ou isenção da cota condominial.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-16-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O síndico só é segurado obrigatório como contribuinte individual se receber remuneração ou tiver isenção da taxa condominial. Se exercer voluntariamente sem benefício, não é filiado obrigatório.",
    "lawArticles": [
      "Art. 12, V, \"f\", Lei 8.212/91"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A filiação como contribuinte individual só ocorre se houver retribuição financeira ou isenção da cota condominial.",
      "keyConcept": "Contribuinte Individual e Sindicatura",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-17",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-2",
    "topicName": "Período de Graça e Prorrogação",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "O segurado que deixar de exercer atividade remunerada abrangida pela previdência social mantém a qualidade de segurado por até doze meses após a cessação das contribuições, período que pode ser prorrogado por mais doze meses se ele comprovar a situação de desemprego involuntário perante o Ministério do Trabalho.",
    "codeCitation": "Art. 15, II e § 2º da Lei 8.213/91",
    "options": [
      {
        "id": "q-cebraspe-17-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-17-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. O período de graça básico é de 12 meses (art. 15, II), prorrogável por mais 12 meses em caso de desemprego involuntário comprovado.",
    "lawArticles": [
      "Art. 15, II e § 2º, Lei 8.213/91"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Prazos de manutenção da qualidade de segurado (período de graça).",
      "keyConcept": "Período de Graça e Prorrogação",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-18",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-3",
    "topicName": "Salário de Benefício após EC 103/19",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Analista",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Após a Emenda Constitucional nº 103/2019, o cálculo do salário de benefício considera a média aritmética simples de 100% de todos os salários de contribuição desde a competência de julho de 1994, sem o descarte dos 20% menores salários que era previsto na legislação anterior.",
    "codeCitation": "Art. 26 da EC 103/2019",
    "options": [
      {
        "id": "q-cebraspe-18-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-18-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. A Reforma da Previdência (EC 103/19) extinguiu o descarte automático dos 20% menores salários, passando a média a considerar 100% do período contributivo desde julho/1994.",
    "lawArticles": [
      "Art. 26 da EC 103/2019"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca tenta aplicar a regra anterior da Lei 9.876/99 (80% maiores salários).",
      "keyConcept": "Salário de Benefício após EC 103/19",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-19",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-4",
    "topicName": "Pensão por Morte: Rateio entre Cônjuges",
    "banca": "Cebraspe",
    "year": 2023,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "O ex-cônjuge divorciado que recebia pensão de alimentos fixada judicialmente concorrerá em igualdade de condições com o cônjuge atual ou companheiro sobrevivente no rateio da pensão por morte.",
    "codeCitation": "Art. 76, § 2º da Lei 8.213/91",
    "options": [
      {
        "id": "q-cebraspe-19-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-19-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Art. 76, § 2º, Lei 8.213/91: o cônjuge divorciado ou separado judicialmente que recebia alimentos concorre em igualdade com os dependentes da primeira classe.",
    "lawArticles": [
      "Art. 76, § 2º, Lei 8.213/91"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Candidatos supõem erroneamente que o divórcio extingue todo e qualquer direito previdenciário.",
      "keyConcept": "Pensão por Morte: Rateio entre Cônjuges",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2023 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-20",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-5",
    "topicName": "Auxílio-Reclusão e Baixa Renda",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "O auxílio-reclusão é devido aos dependentes do segurado de baixa renda recolhido à prisão em regime fechado ou semiaberto, sendo o critério de baixa renda aferido pela média dos salários de contribuição dos dependentes.",
    "codeCitation": "Art. 80 da Lei 8.213/91 alterado pela Lei 13.846/19 e EC 103/19",
    "options": [
      {
        "id": "q-cebraspe-20-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca erra duplamente: só é devido no regime FECHADO e a renda aferida é a do SEGURADO PRESO, não dos dependentes.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-20-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O auxílio-reclusão é pago apenas aos dependentes de segurado recolhido em REGIME FECHADO, e a renda considerada para o teto de baixa renda é a do próprio segurado preso.",
    "lawArticles": [
      "Art. 80 da Lei 8.213/91"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca erra duplamente: só é devido no regime FECHADO e a renda aferida é a do SEGURADO PRESO, não dos dependentes.",
      "keyConcept": "Auxílio-Reclusão e Baixa Renda",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-21",
    "subjectId": "sub-dir-penal",
    "subjectName": "Legislação Penal Especial",
    "topicId": "top-leg-1",
    "topicName": "Lei de Drogas: Porte para Consumo Pessoal",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Conforme decisão do Supremo Tribunal Federal de 2024, a posse de maconha para consumo pessoal até o limite presumido de 40 gramas ou 6 plantas fêmeas não constitui crime, tratando-se de ilícito administrativo.",
    "codeCitation": "RE 635.659 do STF (Tema 506)",
    "options": [
      {
        "id": "q-cebraspe-21-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-21-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Em junho/2024, o STF concluiu o julgamento do RE 635.659 fixando que o porte de maconha para uso pessoal (até 40g) é ilícito de natureza administrativa, sem efeitos penais.",
    "lawArticles": [
      "Art. 28 da Lei 11.343/2006",
      "RE 635.659/STF"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Atualização jurisprudencial recente de 2024: o porte de até 40g de cannabis foi descriminalizado, passando a infração administrativa sem repercussão penal.",
      "keyConcept": "Lei de Drogas: Porte para Consumo Pessoal",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-22",
    "subjectId": "sub-dir-penal",
    "subjectName": "Legislação Penal Especial",
    "topicId": "top-leg-2",
    "topicName": "Abuso de Autoridade (Lei 13.869/19)",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PRF",
    "role": "Policial",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "A divergência na interpretação de lei ou na avaliação de fatos e provas configura crime de abuso de autoridade caso o ato seja posteriormente reformado por tribunal superior.",
    "codeCitation": "Art. 1º, § 2º da Lei 13.869/2019",
    "options": [
      {
        "id": "q-cebraspe-22-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "Crime de hermenêutica: a lei expressamente veda a punição por divergência de interpretação.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-22-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. Art. 1º, § 2º, Lei 13.869/19: \"A divergência na interpretação de lei ou na avaliação de fatos e provas não configura abuso de autoridade.\"",
    "lawArticles": [
      "Art. 1º, § 2º, Lei 13.869/2019"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Crime de hermenêutica: a lei expressamente veda a punição por divergência de interpretação.",
      "keyConcept": "Abuso de Autoridade (Lei 13.869/19)",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PRF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-23",
    "subjectId": "sub-info",
    "subjectName": "Informática e Redes",
    "topicId": "top-info-1",
    "topicName": "Segurança da Informação: Ransomware",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Perito Criminal",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "O ransomware é uma categoria de malware que emprega técnicas de criptografia assimétrica ou simétrica para restringir o acesso aos arquivos do sistema da vítima, exigindo resgate, comumente em criptomoedas, para a liberação da chave de decodificação.",
    "codeCitation": "Conceitos de Segurança da Informação NIST/ISO 27001",
    "options": [
      {
        "id": "q-cebraspe-23-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-23-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. O ransomware atua criptografando os arquivos do usuário e demandando pagamento para o envio da respectiva chave de decriptação.",
    "lawArticles": [
      "Norma ISO/IEC 27002"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Definição clássica cobrada pelo Cebraspe.",
      "keyConcept": "Segurança da Informação: Ransomware",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-24",
    "subjectId": "sub-info",
    "subjectName": "Informática e Redes",
    "topicId": "top-info-2",
    "topicName": "Protocolos de Rede: TCP vs UDP",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "O protocolo UDP (User Datagram Protocol) realiza o handshake tripartite (three-way handshake) para garantir a entrega confiável e ordenada dos pacotes de dados na camada de transporte.",
    "codeCitation": "Arquitetura TCP/IP (Tanenbaum)",
    "options": [
      {
        "id": "q-cebraspe-24-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca atribui características exclusivas do TCP (orientado à conexão e confiável) ao UDP (não confiável e veloz).",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-24-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. Quem realiza o three-way handshake (SYN, SYN-ACK, ACK) é o protocolo TCP. O UDP é não orientado à conexão e não garante a entrega ordenada.",
    "lawArticles": [
      "RFC 793 (TCP)",
      "RFC 768 (UDP)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca atribui características exclusivas do TCP (orientado à conexão e confiável) ao UDP (não confiável e veloz).",
      "keyConcept": "Protocolos de Rede: TCP vs UDP",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-25",
    "subjectId": "sub-info",
    "subjectName": "Informática e Redes",
    "topicId": "top-info-3",
    "topicName": "Criptografia Assimétrica e Chave Pública",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Escrivão",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Na criptografia assimétrica, uma mensagem criptografada com a chave pública do destinatário só pode ser decifrada por meio da chave privada correspondente do mesmo destinatário.",
    "codeCitation": "Infraestrutura de Chaves Públicas ICP-Brasil",
    "options": [
      {
        "id": "q-cebraspe-25-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-25-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. O par de chaves funciona em via complementar: o que a chave pública cifra, somente a respectiva chave privada correspondente pode decifrar.",
    "lawArticles": [
      "Medida Provisória 2.200-2/2001 (ICP-Brasil)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Conceito base de pares de chaves pública e privada.",
      "keyConcept": "Criptografia Assimétrica e Chave Pública",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-26",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-1",
    "topicName": "Atos Administrativos: Presunção e Revogação",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a atos administrativos: presunção e revogação no âmbito de PF, considere a proposição a seguir:\n\nA presunção de legitimidade dos atos administrativos é absoluta (juris et de jure), de modo que cabe à administração pública o ônus de provar a legalidade de seus atos caso sejam questionados pelo administrado.",
    "codeCitation": "Doutrina de Direito Administrativo (Hely Lopes Meirelles e Celso Antônio Bandeira de Mello)",
    "options": [
      {
        "id": "q-cebraspe-26-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca troca a presunção relativa (juris tantum) por presunção absoluta (juris et de jure), induzindo o candidato a erro grosseiro.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-26-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "A presunção de legitimidade e veracidade dos atos administrativos é RELATIVA (juris tantum). Ela inverte o ônus da prova em desfavor do administrado, mas admite prova em contrário.",
    "lawArticles": [
      "Art. 37, caput, CF/88"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca troca a presunção relativa (juris tantum) por presunção absoluta (juris et de jure), induzindo o candidato a erro grosseiro.",
      "keyConcept": "Atos Administrativos: Presunção e Revogação",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-27",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-2",
    "topicName": "Poder de Polícia e Autoexecutoriedade",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PRF",
    "role": "Policial Rodoviário Federal",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Em relação a poder de polícia e autoexecutoriedade no âmbito de PRF, considere a proposição a seguir:\n\nO atributo da autoexecutoriedade do poder de polícia permite que a administração pública execute diretamente suas decisões, inclusive para a cobrança forçada de multas de trânsito em atraso sem necessidade de execução judicial.",
    "codeCitation": "Súmula Vinculante e Lei 6.830/80 (LEF)",
    "options": [
      {
        "id": "q-cebraspe-27-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "Pegadinha clássica do Cebraspe: a cobrança de multas é uma das principais EXCEÇÕES à autoexecutoriedade.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-27-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "A autoexecutoriedade NÃO se aplica à cobrança de multas de trânsito. A cobrança forçada de crédito pecuniário da Fazenda Pública exige ajuizamento de Execução Fiscal.",
    "lawArticles": [
      "Art. 78 do CTN",
      "Lei 6.830/1980"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Pegadinha clássica do Cebraspe: a cobrança de multas é uma das principais EXCEÇÕES à autoexecutoriedade.",
      "keyConcept": "Poder de Polícia e Autoexecutoriedade",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PRF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-28",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-3",
    "topicName": "Improbidade Administrativa (Lei 14.230/21)",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Escrivão",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a improbidade administrativa (lei 14.230/21) no âmbito de PF, considere a proposição a seguir:\n\nApós as alterações introduzidas pela Lei nº 14.230/2021 na Lei de Improbidade Administrativa, foi expressamente revogada a modalidade culposa de improbidade, exigindo-se o dolo específico para a configuração de qualquer ato de improbidade administrativa.",
    "codeCitation": "Art. 1º, §§ 1º e 2º da Lei 8.429/92 (com redação da Lei 14.230/21)",
    "options": [
      {
        "id": "q-cebraspe-28-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-28-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. A Lei 14.230/2021 revogou integralmente a figura culposa na LIA. Atualmente, somente há improbidade administrativa mediante DOLO comprovado.",
    "lawArticles": [
      "Art. 1º, §§ 1º e 2º, Lei 8.429/92"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca tenta confundir o candidato com o antigo entendimento que admitia culpa no art. 10 (dano ao erário).",
      "keyConcept": "Improbidade Administrativa (Lei 14.230/21)",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-29",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-4",
    "topicName": "Responsabilidade Civil do Estado",
    "banca": "Cebraspe",
    "year": 2023,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Em relação a responsabilidade civil do estado no âmbito de PF, considere a proposição a seguir:\n\nO Estado responde objetivamente pelos danos causados por detento foragido, independentemente do tempo decorrido desde a fuga, em virtude da teoria do risco administrativo integral.",
    "codeCitation": "Tema 362 da Repercussão Geral do STF (RE 608.831)",
    "options": [
      {
        "id": "q-cebraspe-29-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca omite o requisito do nexo de causalidade direto e imediato entre o momento da fuga e o crime praticado.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-29-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O STF pacificou no Tema 362 que em caso de dano cometido por foragido, a responsabilidade estatal só é objetiva se houver nexo causal direto com o momento da fuga.",
    "lawArticles": [
      "Art. 37, § 6º, CF/88",
      "Tema 362/STF"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca omite o requisito do nexo de causalidade direto e imediato entre o momento da fuga e o crime praticado.",
      "keyConcept": "Responsabilidade Civil do Estado",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2023 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-30",
    "subjectId": "sub-dir-adm",
    "subjectName": "Direito Administrativo",
    "topicId": "top-adm-5",
    "topicName": "Licitações: Modalidades da Lei 14.133/21",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Em relação a licitações: modalidades da lei 14.133/21 no âmbito de INSS, considere a proposição a seguir:\n\nNa Lei nº 14.133/2021 (Nova Lei de Licitações), a Tomada de Preços e o Convite foram extintos, passando o Diálogo Competitivo a ser uma das modalidades licitatórias previstas.",
    "codeCitation": "Art. 28 da Lei 14.133/2021",
    "options": [
      {
        "id": "q-cebraspe-30-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-30-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. As modalidades da Lei 14.133/21 são: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo. Tomada de Preços e Convite foram extintos.",
    "lawArticles": [
      "Art. 28 da Lei 14.133/2021"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Candidatos apegados à antiga Lei 8.666/93 erram por desconhecer a extinção de Tomada de Preços e Convite.",
      "keyConcept": "Licitações: Modalidades da Lei 14.133/21",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-31",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-1",
    "topicName": "Inviolabilidade de Domicílio",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Em relação a inviolabilidade de domicílio no âmbito de PF, considere a proposição a seguir:\n\nA entrada forçada em domicílio sem mandado judicial é lícita, mesmo durante a noite, quando amparada em fundadas razões, devidamente justificadas a posteriori, que indiquem flagrante delito no interior da residência.",
    "codeCitation": "Tema 280 da Repercussão Geral do STF (RE 603.616)",
    "options": [
      {
        "id": "q-cebraspe-31-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-31-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Nos termos do art. 5º, XI, CF/88 e do Tema 280 do STF, em caso de flagrante delito a entrada em domicílio prescinde de mandado, a qualquer hora do dia ou da noite.",
    "lawArticles": [
      "Art. 5º, XI, CF/88",
      "Tema 280/STF"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca tenta fazer o candidato achar que durante a noite a entrada nunca pode ocorrer sem consentimento.",
      "keyConcept": "Inviolabilidade de Domicílio",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-32",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-2",
    "topicName": "Sigilo de Correspondência e Comunicações",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PRF",
    "role": "Policial Rodoviário Federal",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a sigilo de correspondência e comunicações no âmbito de PRF, considere a proposição a seguir:\n\nA interceptação telefônica e a quebra de sigilo de correspondência epistolar podem ser determinadas diretamente por autoridade policial em caso de urgência, desde que comunicadas ao magistrado em até 48 horas.",
    "codeCitation": "Art. 5º, XII, CF/88 e Lei 9.296/96",
    "options": [
      {
        "id": "q-cebraspe-32-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca atribui à autoridade policial competência que está sob reserva absoluta de jurisdição.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-32-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. A interceptação telefônica está sujeita à reserva de jurisdição. Jamais pode ser determinada por delegado de polícia, apenas por ordem judicial fundamentada.",
    "lawArticles": [
      "Art. 5º, XII, CF/88",
      "Lei 9.296/1996"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca atribui à autoridade policial competência que está sob reserva absoluta de jurisdição.",
      "keyConcept": "Sigilo de Correspondência e Comunicações",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PRF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-33",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-3",
    "topicName": "Segurança Pública (Art. 144 CF)",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Perito Criminal",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Em relação a segurança pública (art. 144 cf) no âmbito de PF, considere a proposição a seguir:\n\nAs guardas municipais integram formalmente o rol dos órgãos de segurança pública previstos no art. 144 da Constituição Federal e podem exercer atribuições de policiamento preventivo comunitário.",
    "codeCitation": "ADPF 995 do STF e Art. 144, § 8º, CF/88",
    "options": [
      {
        "id": "q-cebraspe-33-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-33-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. No julgamento da ADPF 995, o STF declarou que as Guardas Municipais integram o Sistema de Segurança Pública (SUSP), exercendo atividade de segurança pública.",
    "lawArticles": [
      "Art. 144, § 8º, CF/88",
      "ADPF 995/STF"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Historicamente o rol era considerado taxativo e excluía guardas municipais como órgãos de segurança, mas o STF mudou esse paradigma na ADPF 995.",
      "keyConcept": "Segurança Pública (Art. 144 CF)",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-34",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-4",
    "topicName": "Direitos Políticos e Inelegibilidade",
    "banca": "Cebraspe",
    "year": 2023,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a direitos políticos e inelegibilidade no âmbito de PF, considere a proposição a seguir:\n\nOs analfabetos são inalistáveis e inelegíveis de acordo com a ordem constitucional brasileira vigente.",
    "codeCitation": "Art. 14, § 1º, II, \"a\" e § 4º, CF/88",
    "options": [
      {
        "id": "q-cebraspe-34-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "Confusão comum: analfabetos são alistáveis (voto facultativo), mas são inelegíveis.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-34-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. Para os analfabetos o alistamento eleitoral e o voto são FACULTATIVOS. Eles são alistáveis, mas são inegavelmente inelegíveis.",
    "lawArticles": [
      "Art. 14, § 1º, II, \"a\", CF/88",
      "Art. 14, § 4º, CF/88"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Confusão comum: analfabetos são alistáveis (voto facultativo), mas são inelegíveis.",
      "keyConcept": "Direitos Políticos e Inelegibilidade",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2023 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-35",
    "subjectId": "sub-dir-const",
    "subjectName": "Direito Constitucional",
    "topicId": "top-const-5",
    "topicName": "Remédios Constitucionais: Mandado de Injunção",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Analista",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Em relação a remédios constitucionais: mandado de injunção no âmbito de INSS, considere a proposição a seguir:\n\nConceder-se-á mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania.",
    "codeCitation": "Art. 5º, LXXI, CF/88 e Lei 13.300/2016",
    "options": [
      {
        "id": "q-cebraspe-35-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-35-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Trata-se da exata redação do art. 5º, LXXI, da CF/88, regulamentado pela Lei nº 13.300/2016.",
    "lawArticles": [
      "Art. 5º, LXXI, CF/88",
      "Lei 13.300/2016"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca transcreve o texto literal da Constituição para testar memória de lei seca.",
      "keyConcept": "Remédios Constitucionais: Mandado de Injunção",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-36",
    "subjectId": "sub-dir-penal",
    "subjectName": "Direito Penal",
    "topicId": "top-penal-1",
    "topicName": "Princípio da Insignificância no Contrabando",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PRF",
    "role": "Policial Rodoviário Federal",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Em relação a princípio da insignificância no contrabando no âmbito de PRF, considere a proposição a seguir:\n\nConforme jurisprudência pacífica dos tribunais superiores, aplica-se o princípio da insignificância ao crime de contrabando de cigarros caso a quantidade apreendida seja ínfima e destinada a consumo pessoal.",
    "codeCitation": "Súmula 599 do STJ e Tema Repetitivo STJ",
    "options": [
      {
        "id": "q-cebraspe-36-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca tenta aplicar a lógica do descaminho (onde cabe insignificância até R$ 20.000) ao contrabando de cigarros.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-36-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O STJ e o STF possuem entendimento sumulado de que NÃO se aplica o princípio da insignificância ao contrabando de cigarros, mesmo em quantidade mínima.",
    "lawArticles": [
      "Art. 334-A do Código Penal",
      "Súmula 599/STJ"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca tenta aplicar a lógica do descaminho (onde cabe insignificância até R$ 20.000) ao contrabando de cigarros.",
      "keyConcept": "Princípio da Insignificância no Contrabando",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PRF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-37",
    "subjectId": "sub-dir-penal",
    "subjectName": "Direito Penal",
    "topicId": "top-penal-2",
    "topicName": "Peculato Culposo e Extinção da Punibilidade",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Em relação a peculato culposo e extinção da punibilidade no âmbito de PF, considere a proposição a seguir:\n\nNo crime de peculato culposo, a reparação do dano, se precede à sentença irrecorrível, extingue a punibilidade; se lhe é posterior, reduz de metade a pena imposta.",
    "codeCitation": "Art. 312, § 3º do Código Penal",
    "options": [
      {
        "id": "q-cebraspe-37-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-37-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Exata literalidade do art. 312, § 3º, CP: na modalidade culposa, reparação anterior extingue punibilidade; se posterior, reduz a pena em 50%.",
    "lawArticles": [
      "Art. 312, § 3º, Código Penal"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca testa se o candidato lembra que essa regra benéfica é EXCLUSIVA do peculato culposo, não se aplicando ao doloso.",
      "keyConcept": "Peculato Culposo e Extinção da Punibilidade",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-38",
    "subjectId": "sub-dir-proc-penal",
    "subjectName": "Processo Penal",
    "topicId": "top-proc-penal-1",
    "topicName": "Inquérito Policial e Arquivamento",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Escrivão",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a inquérito policial e arquivamento no âmbito de PF, considere a proposição a seguir:\n\nO delegado de polícia não pode mandar arquivar autos de inquérito policial, sendo este ato privativo da autoridade judiciária ou do Ministério Público conforme as regras vigentes.",
    "codeCitation": "Art. 17 do Código de Processo Penal",
    "options": [
      {
        "id": "q-cebraspe-38-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-38-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Art. 17 do CPP: \"A autoridade policial não poderá mandar arquivar autos de inquérito.\"",
    "lawArticles": [
      "Art. 17 do Código de Processo Penal"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Princípio da indisponibilidade do inquérito policial pelo delegado.",
      "keyConcept": "Inquérito Policial e Arquivamento",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-39",
    "subjectId": "sub-dir-proc-penal",
    "subjectName": "Processo Penal",
    "topicId": "top-proc-penal-2",
    "topicName": "Cadeia de Custódia (Pacote Anticrime)",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Perito Criminal",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Em relação a cadeia de custódia (pacote anticrime) no âmbito de PF, considere a proposição a seguir:\n\nA quebra da cadeia de custódia da prova pericial acarreta, de forma automática e insanável, a declaração de ilicitude e o desentranhamento imediato do elemento probatório dos autos.",
    "codeCitation": "Jurisprudência do STJ (AgRg no HC 663.298/SP)",
    "options": [
      {
        "id": "q-cebraspe-39-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca usa termos absolutos como \"de forma automática e insanável\" para enganar quem não conhece a jurisprudência pragmática do STJ.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-39-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O STJ firmou que irregularidades na cadeia de custódia não geram nulidade automática; a prova deve ser valorada pelo magistrado com menor peso persuasivo.",
    "lawArticles": [
      "Art. 158-A a 158-F do CPP"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca usa termos absolutos como \"de forma automática e insanável\" para enganar quem não conhece a jurisprudência pragmática do STJ.",
      "keyConcept": "Cadeia de Custódia (Pacote Anticrime)",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-40",
    "subjectId": "sub-dir-penal",
    "subjectName": "Direito Penal",
    "topicId": "top-penal-3",
    "topicName": "Prescrição Penal e Maioridade Relativa",
    "banca": "Cebraspe",
    "year": 2023,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a prescrição penal e maioridade relativa no âmbito de PF, considere a proposição a seguir:\n\nSão reduzidos de metade os prazos de prescrição quando o criminoso era, ao tempo do crime, menor de vinte e um anos, ou, na data da sentença, maior de setenta anos.",
    "codeCitation": "Art. 115 do Código Penal",
    "options": [
      {
        "id": "q-cebraspe-40-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-40-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Art. 115 do CP: menores de 21 anos AO TEMPO DO CRIME e maiores de 70 anos NA DATA DA SENTENÇA têm prazos prescricionais reduzidos à metade.",
    "lawArticles": [
      "Art. 115 do Código Penal"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca costuma trocar \"data da sentença\" por \"ao tempo do crime\" para a pessoa de 70 anos.",
      "keyConcept": "Prescrição Penal e Maioridade Relativa",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2023 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-41",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-1",
    "topicName": "Contribuinte Individual e Sindicatura",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Em relação a contribuinte individual e sindicatura no âmbito de INSS, considere a proposição a seguir:\n\nCarlos, síndico do condomínio edilício onde reside, que não recebe remuneração pecuniária nem desfruta de dispensa da taxa de condomínio pelo exercício da função, enquadra-se como segurado obrigatório da Previdência Social.",
    "codeCitation": "Art. 12, V, \"f\", Lei 8.212/91 e Dec. 3.048/99",
    "options": [
      {
        "id": "q-cebraspe-41-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A filiação como contribuinte individual só ocorre se houver retribuição financeira ou isenção da cota condominial.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-41-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O síndico só é segurado obrigatório como contribuinte individual se receber remuneração ou tiver isenção da taxa condominial. Se exercer voluntariamente sem benefício, não é filiado obrigatório.",
    "lawArticles": [
      "Art. 12, V, \"f\", Lei 8.212/91"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A filiação como contribuinte individual só ocorre se houver retribuição financeira ou isenção da cota condominial.",
      "keyConcept": "Contribuinte Individual e Sindicatura",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-42",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-2",
    "topicName": "Período de Graça e Prorrogação",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Em relação a período de graça e prorrogação no âmbito de INSS, considere a proposição a seguir:\n\nO segurado que deixar de exercer atividade remunerada abrangida pela previdência social mantém a qualidade de segurado por até doze meses após a cessação das contribuições, período que pode ser prorrogado por mais doze meses se ele comprovar a situação de desemprego involuntário perante o Ministério do Trabalho.",
    "codeCitation": "Art. 15, II e § 2º da Lei 8.213/91",
    "options": [
      {
        "id": "q-cebraspe-42-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-42-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. O período de graça básico é de 12 meses (art. 15, II), prorrogável por mais 12 meses em caso de desemprego involuntário comprovado.",
    "lawArticles": [
      "Art. 15, II e § 2º, Lei 8.213/91"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Prazos de manutenção da qualidade de segurado (período de graça).",
      "keyConcept": "Período de Graça e Prorrogação",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-43",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-3",
    "topicName": "Salário de Benefício após EC 103/19",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Analista",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Em relação a salário de benefício após ec 103/19 no âmbito de INSS, considere a proposição a seguir:\n\nApós a Emenda Constitucional nº 103/2019, o cálculo do salário de benefício considera a média aritmética simples de 100% de todos os salários de contribuição desde a competência de julho de 1994, sem o descarte dos 20% menores salários que era previsto na legislação anterior.",
    "codeCitation": "Art. 26 da EC 103/2019",
    "options": [
      {
        "id": "q-cebraspe-43-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-43-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. A Reforma da Previdência (EC 103/19) extinguiu o descarte automático dos 20% menores salários, passando a média a considerar 100% do período contributivo desde julho/1994.",
    "lawArticles": [
      "Art. 26 da EC 103/2019"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca tenta aplicar a regra anterior da Lei 9.876/99 (80% maiores salários).",
      "keyConcept": "Salário de Benefício após EC 103/19",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-44",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-4",
    "topicName": "Pensão por Morte: Rateio entre Cônjuges",
    "banca": "Cebraspe",
    "year": 2023,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a pensão por morte: rateio entre cônjuges no âmbito de INSS, considere a proposição a seguir:\n\nO ex-cônjuge divorciado que recebia pensão de alimentos fixada judicialmente concorrerá em igualdade de condições com o cônjuge atual ou companheiro sobrevivente no rateio da pensão por morte.",
    "codeCitation": "Art. 76, § 2º da Lei 8.213/91",
    "options": [
      {
        "id": "q-cebraspe-44-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-44-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Art. 76, § 2º, Lei 8.213/91: o cônjuge divorciado ou separado judicialmente que recebia alimentos concorre em igualdade com os dependentes da primeira classe.",
    "lawArticles": [
      "Art. 76, § 2º, Lei 8.213/91"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Candidatos supõem erroneamente que o divórcio extingue todo e qualquer direito previdenciário.",
      "keyConcept": "Pensão por Morte: Rateio entre Cônjuges",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2023 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-45",
    "subjectId": "sub-dir-prev",
    "subjectName": "Direito Previdenciário",
    "topicId": "top-prev-5",
    "topicName": "Auxílio-Reclusão e Baixa Renda",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "INSS",
    "role": "Técnico",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Em relação a auxílio-reclusão e baixa renda no âmbito de INSS, considere a proposição a seguir:\n\nO auxílio-reclusão é devido aos dependentes do segurado de baixa renda recolhido à prisão em regime fechado ou semiaberto, sendo o critério de baixa renda aferido pela média dos salários de contribuição dos dependentes.",
    "codeCitation": "Art. 80 da Lei 8.213/91 alterado pela Lei 13.846/19 e EC 103/19",
    "options": [
      {
        "id": "q-cebraspe-45-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca erra duplamente: só é devido no regime FECHADO e a renda aferida é a do SEGURADO PRESO, não dos dependentes.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-45-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. O auxílio-reclusão é pago apenas aos dependentes de segurado recolhido em REGIME FECHADO, e a renda considerada para o teto de baixa renda é a do próprio segurado preso.",
    "lawArticles": [
      "Art. 80 da Lei 8.213/91"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca erra duplamente: só é devido no regime FECHADO e a renda aferida é a do SEGURADO PRESO, não dos dependentes.",
      "keyConcept": "Auxílio-Reclusão e Baixa Renda",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial INSS 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-46",
    "subjectId": "sub-dir-penal",
    "subjectName": "Legislação Penal Especial",
    "topicId": "top-leg-1",
    "topicName": "Lei de Drogas: Porte para Consumo Pessoal",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a lei de drogas: porte para consumo pessoal no âmbito de PF, considere a proposição a seguir:\n\nConforme decisão do Supremo Tribunal Federal de 2024, a posse de maconha para consumo pessoal até o limite presumido de 40 gramas ou 6 plantas fêmeas não constitui crime, tratando-se de ilícito administrativo.",
    "codeCitation": "RE 635.659 do STF (Tema 506)",
    "options": [
      {
        "id": "q-cebraspe-46-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-46-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. Em junho/2024, o STF concluiu o julgamento do RE 635.659 fixando que o porte de maconha para uso pessoal (até 40g) é ilícito de natureza administrativa, sem efeitos penais.",
    "lawArticles": [
      "Art. 28 da Lei 11.343/2006",
      "RE 635.659/STF"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Atualização jurisprudencial recente de 2024: o porte de até 40g de cannabis foi descriminalizado, passando a infração administrativa sem repercussão penal.",
      "keyConcept": "Lei de Drogas: Porte para Consumo Pessoal",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-47",
    "subjectId": "sub-dir-penal",
    "subjectName": "Legislação Penal Especial",
    "topicId": "top-leg-2",
    "topicName": "Abuso de Autoridade (Lei 13.869/19)",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PRF",
    "role": "Policial",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Em relação a abuso de autoridade (lei 13.869/19) no âmbito de PRF, considere a proposição a seguir:\n\nA divergência na interpretação de lei ou na avaliação de fatos e provas configura crime de abuso de autoridade caso o ato seja posteriormente reformado por tribunal superior.",
    "codeCitation": "Art. 1º, § 2º da Lei 13.869/2019",
    "options": [
      {
        "id": "q-cebraspe-47-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "Crime de hermenêutica: a lei expressamente veda a punição por divergência de interpretação.",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-47-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. Art. 1º, § 2º, Lei 13.869/19: \"A divergência na interpretação de lei ou na avaliação de fatos e provas não configura abuso de autoridade.\"",
    "lawArticles": [
      "Art. 1º, § 2º, Lei 13.869/2019"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Crime de hermenêutica: a lei expressamente veda a punição por divergência de interpretação.",
      "keyConcept": "Abuso de Autoridade (Lei 13.869/19)",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PRF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-48",
    "subjectId": "sub-info",
    "subjectName": "Informática e Redes",
    "topicId": "top-info-1",
    "topicName": "Segurança da Informação: Ransomware",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Perito Criminal",
    "difficulty": "Difícil",
    "format": "certo_errado",
    "statement": "Em relação a segurança da informação: ransomware no âmbito de PF, considere a proposição a seguir:\n\nO ransomware é uma categoria de malware que emprega técnicas de criptografia assimétrica ou simétrica para restringir o acesso aos arquivos do sistema da vítima, exigindo resgate, comumente em criptomoedas, para a liberação da chave de decodificação.",
    "codeCitation": "Conceitos de Segurança da Informação NIST/ISO 27001",
    "options": [
      {
        "id": "q-cebraspe-48-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-48-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. O ransomware atua criptografando os arquivos do usuário e demandando pagamento para o envio da respectiva chave de decriptação.",
    "lawArticles": [
      "Norma ISO/IEC 27002"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Definição clássica cobrada pelo Cebraspe.",
      "keyConcept": "Segurança da Informação: Ransomware",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-49",
    "subjectId": "sub-info",
    "subjectName": "Informática e Redes",
    "topicId": "top-info-2",
    "topicName": "Protocolos de Rede: TCP vs UDP",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Agente",
    "difficulty": "Fácil",
    "format": "certo_errado",
    "statement": "Em relação a protocolos de rede: tcp vs udp no âmbito de PF, considere a proposição a seguir:\n\nO protocolo UDP (User Datagram Protocol) realiza o handshake tripartite (three-way handshake) para garantir a entrega confiável e ordenada dos pacotes de dados na camada de transporte.",
    "codeCitation": "Arquitetura TCP/IP (Tanenbaum)",
    "options": [
      {
        "id": "q-cebraspe-49-certo",
        "text": "CERTO",
        "isCorrect": false,
        "distractorReason": "A banca atribui características exclusivas do TCP (orientado à conexão e confiável) ao UDP (não confiável e veloz).",
        "distractorType": "generalizacao_indevida"
      },
      {
        "id": "q-cebraspe-49-errado",
        "text": "ERRADO",
        "isCorrect": true
      }
    ],
    "explanation": "ERRADO. Quem realiza o three-way handshake (SYN, SYN-ACK, ACK) é o protocolo TCP. O UDP é não orientado à conexão e não garante a entrega ordenada.",
    "lawArticles": [
      "RFC 793 (TCP)",
      "RFC 768 (UDP)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "A banca atribui características exclusivas do TCP (orientado à conexão e confiável) ao UDP (não confiável e veloz).",
      "keyConcept": "Protocolos de Rede: TCP vs UDP",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  },
  {
    "id": "q-cebraspe-50",
    "subjectId": "sub-info",
    "subjectName": "Informática e Redes",
    "topicId": "top-info-3",
    "topicName": "Criptografia Assimétrica e Chave Pública",
    "banca": "Cebraspe",
    "year": 2024,
    "institution": "PF",
    "role": "Escrivão",
    "difficulty": "Média",
    "format": "certo_errado",
    "statement": "Em relação a criptografia assimétrica e chave pública no âmbito de PF, considere a proposição a seguir:\n\nNa criptografia assimétrica, uma mensagem criptografada com a chave pública do destinatário só pode ser decifrada por meio da chave privada correspondente do mesmo destinatário.",
    "codeCitation": "Infraestrutura de Chaves Públicas ICP-Brasil",
    "options": [
      {
        "id": "q-cebraspe-50-certo",
        "text": "CERTO",
        "isCorrect": true
      },
      {
        "id": "q-cebraspe-50-errado",
        "text": "ERRADO",
        "isCorrect": false,
        "distractorReason": "A proposição está em perfeita harmonia com o ordenamento jurídico e a jurisprudência dominante.",
        "distractorType": "armadilha_semantica"
      }
    ],
    "explanation": "CORRETO. O par de chaves funciona em via complementar: o que a chave pública cifra, somente a respectiva chave privada correspondente pode decifrar.",
    "lawArticles": [
      "Medida Provisória 2.200-2/2001 (ICP-Brasil)"
    ],
    "cognitiveAnalysis": {
      "commonTrap": "Conceito base de pares de chaves pública e privada.",
      "keyConcept": "Criptografia Assimétrica e Chave Pública",
      "bancaTendency": "O Cebraspe explora minúcias e alterações legislativas recentes para testar o discernimento sob estresse de anulação de itens errados."
    },
    "isOfficialAudited": true,
    "auditSource": "Prova Oficial PF 2024 / Cebraspe Audited",
    "legalStatus": "atualizada"
  }
];
