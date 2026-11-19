import {
  MOCK_QUESTIONS,
  INITIAL_VADE_MECUM,
  INITIAL_MICRO_SUMMARIES,
  INITIAL_EXAMS,
} from '@/lib/mockData';
import { ALL_OFFICIAL_QUESTIONS } from '@/lib/questions';

const ALL_QUESTIONS = Array.from(
  new Map([...MOCK_QUESTIONS, ...ALL_OFFICIAL_QUESTIONS].map((q) => [q.id, q])).values()
);

export interface CopilotQuickAction {
  label: string;
  actionTab: string;
}

export interface CopilotAnswer {
  text: string;
  quickAction: CopilotQuickAction;
}

export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function extractKeywords(query: string): string[] {
  const stopWords = new Set([
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na',
    'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre', 'que', 'qual', 'quais',
    'como', 'onde', 'quando', 'porque', 'por que', 'quem', 'se', 'ou', 'e', 'mas', 'me',
    'explique', 'explica', 'fale', 'diga', 'ajude', 'duvida', 'pergunta', 'sobre', 'sao',
    'ser', 'esta', 'este', 'isso', 'isto', 'aquele', 'aquela', 'tem', 'ter', 'pode',
    'funciona', 'significa', 'diferenca', 'entre', 'cai', 'prova', 'concurso', 'edital',
  ]);

  return normalizeText(query)
    .replace(/[^a-z0-9\s./-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !stopWords.has(w));
}

export function buildCopilotPrompt(
  query: string,
  targetExam: string,
  banca: string,
  focusList: string[],
  history: any[]
): string {
  const systemPrompt = `Você é o Tutor IA oficial do Argus, professor especialista em Direito, Concursos Públicos Brasileiros e Exame da OAB, conectado ao Google Gemini.

DIRETRIZES OBRIGATÓRIAS:
1. Responda DIRETAMENTE, COM PROFUNDIDADE E CLAREZA a QUALQUER pergunta feita pelo aluno: "${query}".
2. NUNCA recuse uma dúvida de estudo, NUNCA desvie o assunto para falar do perfil do aluno e NUNCA dê respostas genéricas ou evasivas.
3. Estruture sua resposta em Markdown limpo e didático:
   - **Resposta Direta** logo na primeira frase (objetiva e precisa).
   - **Fundamentação Legal / Doutrinária / Jurisprudencial** (cite artigos, leis, súmulas ou regras gramaticais/matemáticas reais — ex.: CF/88, Lei 9.784/99, Lei 8.112/90, Lei 14.133/21, CTN, CP, CPP, CPC, CLT, STF/STJ). Nunca invente número de artigo se não tiver certeza.
   - **Como cai na prova / Pegadinha da banca (${banca})**: um alerta prático de 1-2 linhas.
4. Use o contexto do aluno apenas para calibrar o exemplo (Concurso: "${targetExam}", Banca: "${banca}", Focos: "${focusList.join(', ')}").
5. Na ÚLTIMA linha da resposta, adicione exatamente uma tag de ação recomendada no formato:
   [[ACTION:simulator|Treinar Questões sobre o Tema]]
   (escolha a aba mais útil entre: simulator, vademecum, mistakes, cycle, summaries, questions).`;

  const recentHistoryText = Array.isArray(history)
    ? history
        .slice(-6)
        .map((h: any) => `${h.sender === 'user' ? 'Aluno' : 'Tutor IA'}: ${h.text}`)
        .join('\n')
    : '';

  return `${systemPrompt}\n\n${recentHistoryText ? `HISTÓRICO RECENTE:\n${recentHistoryText}\n\n` : ''}PERGUNTA DO ALUNO:\n${query}`;
}

function parseCopilotRawOutput(rawText: string): CopilotAnswer {
  const trimmed = rawText.trim();

  // Suporte caso o modelo devolva JSON mesmo em modo livre
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed.text === 'string' && parsed.text.trim()) {
        return {
          text: parsed.text.trim(),
          quickAction: parsed.quickAction || {
            label: 'Treinar no Simulador de Questões',
            actionTab: 'simulator',
          },
        };
      }
    } catch {
      // Continua para extração direta de Markdown
    }
  }

  let cleanText = trimmed;
  let quickAction: CopilotQuickAction = {
    label: 'Treinar no Simulador de Questões',
    actionTab: 'simulator',
  };

  const actionMatch = cleanText.match(/\[\[ACTION:([a-z]+)\|([^\]]+)\]\]\s*$/i);
  if (actionMatch) {
    const validTabs = new Set(['simulator', 'vademecum', 'mistakes', 'cycle', 'summaries', 'questions']);
    const tab = actionMatch[1].toLowerCase();
    const label = actionMatch[2].trim();
    if (validTabs.has(tab) && label) {
      quickAction = { label, actionTab: tab };
    }
    cleanText = cleanText.replace(actionMatch[0], '').trim();
  }

  return {
    text: cleanText || 'Aqui está a explicação solicitada.',
    quickAction,
  };
}

export async function queryGeminiCopilot(
  apiKey: string,
  model: string,
  prompt: string
): Promise<CopilotAnswer | null> {
  const candidateModels = Array.from(
    new Set(
      [
        model,
        'gemini-2.5-flash',
        'gemini-2.0-flash',
        'gemini-2.0-flash-lite',
        'gemini-1.5-flash-latest',
      ].filter((m): m is string => Boolean(m && m.trim()))
    )
  );

  for (const candidateModel of candidateModels) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14000);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${candidateModel}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.25,
              maxOutputTokens: 2048,
            },
          }),
        }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const parts = data?.candidates?.[0]?.content?.parts;
        const rawText = Array.isArray(parts)
          ? parts.map((p: any) => p?.text || '').join('').trim()
          : '';
        if (rawText) {
          return parseCopilotRawOutput(rawText);
        }
      } else {
        const errBody = await response.text().catch(() => '');
        console.warn(`Gemini model ${candidateModel} returned ${response.status}:`, errBody.slice(0, 200));
      }
    } catch (apiErr) {
      clearTimeout(timeoutId);
      console.warn(`Gemini model ${candidateModel} failed:`, apiErr);
    }
  }

  return null;
}

export function answerStudentQueryDirectly(
  query: string,
  warName: string,
  targetExam: string,
  banca: string,
  focusList: string[],
  examContext: any
): CopilotAnswer {
  const qNorm = normalizeText(query);
  const keywords = extractKeywords(query);

  // Referência jurídica rápida offline: Art. 54 da Lei 9.784/99 (Decadência Administrativa)
  if (
    qNorm.includes('9.784') ||
    qNorm.includes('9784') ||
    (qNorm.includes('decadencia') && (qNorm.includes('54') || qNorm.includes('administrativ')))
  ) {
    return {
      text: `### Prazo de Decadência no Art. 54 da Lei 9.784/1999\n\n**Resposta Direta:** O direito da Administração Pública de anular os atos administrativos de que decorram efeitos favoráveis para os destinatários decai em **5 (cinco) anos**, contados da data em que foram praticados, **salvo comprovada má-fé**.\n\n**Pontos essenciais da Lei 9.784/99 (Art. 54):**\n- **Regra geral (caput):** 5 anos a partir da prática do ato favorável ao administrado.\n- **Exceção absoluta:** Se houver **comprovada má-fé** do beneficiário, o prazo decadencial não corre.\n- **Efeitos patrimoniais contínuos (§ 1º):** O prazo conta-se da percepção do **primeiro pagamento**.\n- **Impedimento da decadência (§ 2º):** Considera-se exercício do direito de anular **qualquer medida de autoridade administrativa que importe impugnação à validade do ato** (exigindo notificação válida do interessado; sindicância sigilosa não basta).\n\n⚠️ **Pegadinha clássica (${banca}):** As bancas costumam confundir esse prazo com **prescrição** (é *decadência*) ou afirmar que vale mesmo com má-fé (falso — a má-fé afasta a decadência).`,
      quickAction: {
        label: 'Consultar no Smart Vade Mecum',
        actionTab: 'vademecum',
      },
    };
  }

  const matchedExam = INITIAL_EXAMS.find((e) => {
    const titleNorm = normalizeText(`${e.title} ${e.institution} ${e.role}`);
    if (qNorm.includes('trt') && titleNorm.includes('trt')) return true;
    if ((qNorm.includes('tjsp') || qNorm.includes('tj-sp') || qNorm.includes('escrevente')) && titleNorm.includes('tj')) return true;
    if (qNorm.includes('prf') && titleNorm.includes('prf')) return true;
    if ((qNorm.includes('policia federal') || /\bpf\b/.test(qNorm)) && titleNorm.includes('federal') && !titleNorm.includes('rodoviaria')) return true;
    if (qNorm.includes('inss') && titleNorm.includes('inss')) return true;
    if (qNorm.includes('receita') && titleNorm.includes('receita')) return true;
    if (qNorm.includes('oab') && titleNorm.includes('oab')) return true;
    if (qNorm.includes('tcu') && titleNorm.includes('tcu')) return true;
    if (qNorm.includes('bacen') && titleNorm.includes('bacen')) return true;
    return false;
  });

  if (
    matchedExam &&
    (qNorm.includes('edital') ||
      qNorm.includes('salario') ||
      qNorm.includes('remuneracao') ||
      qNorm.includes('vaga') ||
      qNorm.includes('materia') ||
      qNorm.includes('disciplina') ||
      qNorm.includes('data') ||
      qNorm.includes('quando') ||
      qNorm.includes('como funciona') ||
      qNorm.includes('o que cai'))
  ) {
    const subjectsList = matchedExam.subjects
      .map((s) => `• **${s.name}** — Peso ${s.weight} (${s.relevancePercentage}% da prova)`)
      .join('\n');
    return {
      text: `📋 **Resumo Direto do Concurso: ${matchedExam.title}**\n\n• **Cargo:** ${matchedExam.role} (${matchedExam.institution})\n• **Banca Examinadora:** ${matchedExam.banca}\n• **Salário Inicial:** ${matchedExam.salary}\n• **Vagas:** ${matchedExam.vacancies} vagas\n• **Data da Prova:** ${matchedExam.examDate} (faltam ${matchedExam.daysRemaining} dias)\n\n**O que mais cai na prova (por ordem de importância):**\n${subjectsList}\n\n💡 **Dica prática:** Comece estudando as duas primeiras matérias da lista, pois elas concentram a maior parte dos pontos da sua prova.`,
      quickAction: {
        label: 'Ver Meu Edital Organizado',
        actionTab: 'edital',
      },
    };
  }

  const activeSubjects = Array.isArray(examContext?.subjects) && examContext.subjects.length > 0
    ? examContext.subjects
    : INITIAL_EXAMS[0].subjects;

  if (qNorm.includes('elimin') || qNorm.includes('minima') || qNorm.includes('minimo') || qNorm.includes('nota de corte')) {
    return {
      text: `🎯 **Regras de Pontuação e Nota Mínima (${targetExam} • Banca ${banca}):**\n\n• **Como não ser eliminado:** Você precisa acertar pelo menos **50% da prova** no geral e **não pode zerar** nenhuma matéria de peso alto (especialmente **${activeSubjects[0]?.name}**).\n• **Cuidado com a banca ${banca}:** ${
        banca === 'Cebraspe'
          ? 'No formato Certo/Errado do Cebraspe, **1 questão errada anula 1 questão certa**. Se você não tiver nenhuma ideia da resposta, é melhor deixar em branco do que chutar no escuro.'
          : `Na banca ${banca} (múltipla escolha de A a E), **não há perda de pontos por questão errada**. Portanto, nunca deixe questões em branco no cartão-resposta!`
      }\n• **Meta segura para aprovação:** Busque atingir entre **78% e 84% de acertos** nos simulados.`,
      quickAction: {
        label: 'Treinar no Simulador de Questões',
        actionTab: 'simulator',
      },
    };
  }

  if (qNorm.includes('salario') || qNorm.includes('remuneracao') || qNorm.includes('quanto ganha') || qNorm.includes('beneficio')) {
    const sal = examContext?.salary || 'R$ 8.500,00 a R$ 14.000,00';
    const vac = examContext?.vacancies || 200;
    return {
      text: `💰 **Salário e Benefícios (${targetExam}):**\n\n• **Salário Inicial no Edital:** **${sal}**\n• **Total de Vagas:** **${vac} vagas** (mais cadastro de reserva)\n• **Benefícios extras comuns na carreira:** Auxílio-alimentação (em média R$ 1.100 a R$ 1.400 livres de imposto), auxílio-saúde, adicional de qualificação (se você tiver pós-graduação, mestrado ou doutorado) e progressão anual na carreira.`,
      quickAction: {
        label: 'Ver Radar de Concursos Abertos',
        actionTab: 'radar',
      },
    };
  }

  if (qNorm.includes('discursiva') || qNorm.includes('redacao') || qNorm.includes('peca pratica')) {
    return {
      text: `✍️ **Como Funciona a Redação / Prova Discursiva (${banca}):**\n\n1. **O que a banca avalia:** Metade da nota vem do **conteúdo** (responder exatamente aos tópicos pedidos no tema) e a outra metade vem do **português e organização do texto** (parágrafos claros, sem erros de gramática).\n2. **Estrutura simples que funciona sempre (4 parágrafos):**\n   • **1º Parágrafo (Introdução):** Apresente o tema principal em 4 a 5 linhas.\n   • **2º Parágrafo (Tópico 1):** Responda à primeira pergunta da banca com fundamento na lei.\n   • **3º Parágrafo (Tópico 2):** Responda à segunda pergunta da banca com exemplos ou jurisprudência.\n   • **4º Parágrafo (Conclusão):** Feche o texto retomando a ideia central.\n\nVocê pode escrever um texto de treino agora mesmo na aba **Treino de Redação & Discursivas** para receber nota linha por linha.`,
      quickAction: {
        label: 'Abrir Treino de Redação & Discursivas',
        actionTab: 'discursivas',
      },
    };
  }

  if (
    qNorm.includes('peso') ||
    qNorm.includes('o que estudar') ||
    qNorm.includes('mais importante') ||
    qNorm.includes('maior peso') ||
    qNorm.includes('80/20')
  ) {
    const sorted = [...activeSubjects].sort((a: any, b: any) => (b.relevancePercentage || 0) - (a.relevancePercentage || 0));
    const listText = sorted
      .map((s: any, i: number) => `${i + 1}. **${s.name}** — representa **${s.relevancePercentage}%** da prova (Peso ${s.weight})`)
      .join('\n');
    return {
      text: `📊 **Matérias Mais Importantes do Seu Edital (${targetExam}):**\n\n${listText}\n\n💡 **Como dividir seu tempo de forma simples:**\nDedique cerca de **60% do seu tempo** para as 2 primeiras matérias acima e **para os seus focos escolhidos (${focusList.join(', ')})**, e use os outros **40%** para revisar as demais matérias resolvendo questões.`,
      quickAction: {
        label: 'Abrir Meu Plano de Estudos Diário',
        actionTab: 'cycle',
      },
    };
  }

  if (keywords.length > 0) {
    const scoredArticles = INITIAL_VADE_MECUM.map((art) => {
      const artNorm = normalizeText(
        `${art.diploma} ${art.numberStr} ${art.title} ${art.text} ${art.bancaTrapNote || ''} ${(art.tags || []).join(' ')}`
      );
      let score = 0;
      for (const kw of keywords) {
        if (artNorm.includes(kw)) score += 3;
      }
      return { article: art, score };
    })
      .filter((x) => x.score >= 3)
      .sort((a, b) => b.score - a.score);

    const scoredSummaries = INITIAL_MICRO_SUMMARIES.map((sum) => {
      const sumNorm = normalizeText(
        `${sum.subjectName} ${sum.topicName} ${sum.title} ${sum.coreConcept || ''} ${(sum.keyPoints || []).join(' ')} ${sum.mnemonic || ''} ${sum.bancaTrapAlert}`
      );
      let score = 0;
      for (const kw of keywords) {
        if (sumNorm.includes(kw)) score += 3;
      }
      return { sum, score };
    })
      .filter((x) => x.score >= 3)
      .sort((a, b) => b.score - a.score);

    const scoredQuestions = ALL_QUESTIONS.map((q) => {
      const qTextNorm = normalizeText(
        `${q.subjectName} ${q.topicName} ${q.statement} ${q.explanation || ''} ${q.cognitiveAnalysis?.commonTrap || ''} ${q.cognitiveAnalysis?.keyConcept || ''} ${q.codeCitation || ''} ${(q.lawArticles || []).join(' ')}`
      );
      let score = 0;
      for (const kw of keywords) {
        if (qTextNorm.includes(kw)) score += 2;
      }
      return { q, score };
    })
      .filter((x) => x.score >= 4)
      .sort((a, b) => b.score - a.score);

    if (scoredArticles.length > 0 || scoredSummaries.length > 0 || scoredQuestions.length > 0) {
      const parts: string[] = [`📚 **Resposta Direta sobre: "${query}"**`];

      if (scoredSummaries.length > 0) {
        const topSum = scoredSummaries[0].sum;
        const mainRule = topSum.coreConcept || (topSum.keyPoints || []).join('; ');
        parts.push(
          `\n**Resumo Simples (${topSum.subjectName} — ${topSum.topicName}):**\n• **Regra Principal:** ${mainRule}${
            topSum.mnemonic ? `\n• **Como não esquecer (Macete):** *${topSum.mnemonic}*` : ''
          }\n• **Pegadinha clássica de prova:** ${topSum.bancaTrapAlert}`
        );
      }

      if (scoredArticles.length > 0) {
        const topArt = scoredArticles[0].article;
        parts.push(
          `\n**O que diz a Lei (${topArt.diploma} — ${topArt.numberStr}):**\n> *"${topArt.text}"*${
            topArt.bancaTrapNote ? `\n⚠️ **Atenção na prova:** ${topArt.bancaTrapNote}` : ''
          }`
        );
      }

      if (scoredQuestions.length > 0) {
        const topQ = scoredQuestions[0].q;
        parts.push(
          `\n**Como as bancas cobram isso (${topQ.banca} • ${topQ.year}):**\n• **Tema:** ${topQ.subjectName} (${topQ.topicName})\n• **Explicação prática:** ${topQ.explanation}${
            topQ.cognitiveAnalysis?.commonTrap
              ? `\n• **Armadilha recorrente:** ${topQ.cognitiveAnalysis.commonTrap}`
              : ''
          }`
        );
      }

      return {
        text: parts.join('\n'),
        quickAction: {
          label: scoredArticles.length > 0 ? 'Ver Lei Completa no Vade Mecum' : 'Treinar Questões Desse Tema',
          actionTab: scoredArticles.length > 0 ? 'vademecum' : 'questions',
        },
      };
    }
  }

  if (qNorm.includes('8.112') || qNorm.includes('posse') || qNorm.includes('exercicio') || qNorm.includes('estagio probatorio')) {
    return {
      text: `📌 **Resumo Simples da Lei 8.112/90 (Servidores Públicos):**\n\n• **Prazo para Posse:** **30 dias** a partir da nomeação. Se não tomar posse no prazo, a nomeação fica sem efeito.\n• **Prazo para entrar em Exercício (começar a trabalhar):** **15 dias** após a posse. Se não entrar em exercício, o servidor é **exonerado** (cuidado: não é demitido!).\n• **Estágio Probatório e Estabilidade:** Ambos duram **3 anos (36 meses)** de efetivo exercício (Art. 41 da Constituição Federal).`,
      quickAction: { label: 'Consultar Leis Mais Cobradas', actionTab: 'vademecum' },
    };
  }

  if (qNorm.includes('improbidade') || qNorm.includes('14.230') || qNorm.includes('8.429') || qNorm.includes('dolo')) {
    return {
      text: `⚖️ **Lei de Improbidade Administrativa (Atualizada pela Lei 14.230/21):**\n\n1. **Só existe improbidade com DOLO (intenção consciente):** Acabou a improbidade por culpa (imprudência ou negligência). Se o agente apenas errou sem má-fé específica, não é improbidade.\n2. **Lista Fechada no Art. 11:** Os atos que violam princípios da administração agora formam uma lista taxativa (fechada).\n3. **Prescrição Unificada:** O prazo para punir é de **8 anos** contados da data do fato.`,
      quickAction: { label: 'Praticar Questões de Direito Administrativo', actionTab: 'questions' },
    };
  }

  if (qNorm.includes('licitac') || qNorm.includes('14.133') || qNorm.includes('pregao') || qNorm.includes('dialogo competitivo')) {
    return {
      text: `🏛️ **Nova Lei de Licitações (Lei 14.133/2021) — O que você precisa saber:**\n\n• **5 Modalidades Oficiais:** Pregão, Concorrência, Concurso, Leilão e a novidade **Diálogo Competitivo**.\n• **Modalidades que deixaram de existir:** Convite, Tomada de Preços e RDC foram extintos!\n• **Regra de ouro:** Primeiro ocorre o **julgamento das propostas** e só depois a **habilitação** do vencedor (salvo decisão motivada).`,
      quickAction: { label: 'Treinar Questões de Licitações', actionTab: 'questions' },
    };
  }

  if (qNorm.includes('habeas') || qNorm.includes('mandado de seguranca') || qNorm.includes('remedios constitucionais') || qNorm.includes('art. 5') || qNorm.includes('artigo 5')) {
    return {
      text: `🛡️ **Remédios Constitucionais (Art. 5º da CF/88) de Forma Simples:**\n\n• **Habeas Corpus (HC):** Protege a **liberdade de locomoção** (ir e vir). É gratuito e não precisa de advogado.\n• **Habeas Data (HD):** Serve para **ver ou corrigir dados pessoais seus** em bancos de dados públicos. Também é gratuito.\n• **Mandado de Segurança (MS):** Protege **direito líquido e certo** (comprovado de plano por documentos) quando não cabe HC nem HD. Prazo: **120 dias**.\n• **Ação Popular:** Qualquer **cidadão (com título de eleitor)** pode propor para anular ato lesivo ao patrimônio público ou meio ambiente.`,
      quickAction: { label: 'Ver Constituição no Vade Mecum', actionTab: 'vademecum' },
    };
  }

  if (qNorm.includes('crase') || qNorm.includes('portugues') || qNorm.includes('concordancia') || qNorm.includes('regencia') || qNorm.includes('pontuacao')) {
    return {
      text: `✍️ **Dicas Diretas de Língua Portuguesa para Provas:**\n\n• **Regra Prática da Crase:** Substitua a palavra feminina por uma masculina equivalente. Se aparecer **"ao"**, há crase (**à**). Nunca use crase antes de verbo, palavras masculinas ou pronomes pessoais (*a ela*, *a mim*).\n• **Crase Facultativa (Opcional):** Antes de nome próprio feminino (*Refiro-me a/à Ana*), pronome possessivo feminino (*a/à minha pasta*) e depois da preposição **"até"**.\n• **Pontuação:** Jamais separe o **Sujeito** do **Verbo** com uma única vírgula!`,
      quickAction: { label: 'Resolver Questões de Português', actionTab: 'questions' },
    };
  }

  if (qNorm.includes('informatica') || qNorm.includes('seguranca') || qNorm.includes('phishing') || qNorm.includes('ransomware') || qNorm.includes('malware')) {
    return {
      text: `💻 **Resumo de Informática & Segurança da Informação para Concursos:**\n\n• **Ransomware:** Programa malicioso que **sequestra seus arquivos** (por criptografia) e cobra resgate financeiro.\n• **Phishing:** E-mail ou página falsa que imita bancos/órgãos públicos para **pescar suas senhas**.\n• **Worm vs Vírus:** O **Vírus** precisa que você execute um arquivo infectado; o **Worm** se espalha sozinho pela rede explorando falhas automaticamente.`,
      quickAction: { label: 'Treinar Questões de Informática', actionTab: 'questions' },
    };
  }

  if (qNorm.includes('como estudar') || qNorm.includes('organizar') || qNorm.includes('cronograma') || qNorm.includes('foco') || qNorm.includes('comecar')) {
    return {
      text: `🧭 **Passo a Passo Simples para Organizar seu Estudo Hoje:**\n\n1. **Escolha suas Matérias em Foco:** Na barra superior do sistema, clique em **Meus Focos** e marque 1 ou mais disciplinas que você quer priorizar agora (atualmente: **${focusList.join(', ')}**).\n2. **Divida sua sessão em 2 partes:**\n   • **Primeiros 30 minutos:** Leia os artigos destacados em **Leis & Artigos** ou **Resumos Direto ao Ponto**.\n   • **Últimos 30 minutos:** Resolva 10 a 15 questões no **Simulador de Questões**.\n3. **Errou uma questão?** Ela vai automaticamente para **Meus Erros para Revisar**, para você refazê-la até acertar.`,
      quickAction: { label: 'Abrir Meu Plano de Estudos Diário', actionTab: 'cycle' },
    };
  }

  return {
    text: `💡 **Sobre sua pergunta ("${query}"):**\n\nNo contexto do seu estudo para **${targetExam}** (Banca **${banca}**):\n• As bancas cobram esse tema exigindo atenção especial à **letra da lei atualizada** e às exceções previstas nos tribunais superiores (STF e STJ).\n• Suas matérias prioritárias selecionadas no momento são: **${focusList.join(', ')}**.\n\n**O que você quer fazer agora?**\n• Digite o **nome da lei, artigo ou matéria** específica (ex: *"Art. 5º da CF"*, *"Lei 8.112"*, *"Crase"*, *"Licitações"*, *"Salário do TRT"*) para eu te mostrar o resumo exato e como cai na prova;\n• Ou clique abaixo para praticar questões comentadas desse assunto!`,
    quickAction: {
      label: 'Pesquisar no Banco de Questões',
      actionTab: 'questions',
    },
  };
}
