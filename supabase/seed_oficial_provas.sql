-- ==============================================================================
-- ARGUS - CARGA OFICIAL DE PROVAS (CEBRASPE, FGV OAB, VUNESP & FCC)
-- Questões Oficiais Homologadas com Gabaritos Definitivos Pós-Recursos
-- ==============================================================================

-- 1. CEBRASPE - POLÍCIA FEDERAL (Agente de Polícia Federal)
INSERT INTO public.questions (
  subject_name, topic_name, banca, year, institution, statement, code_citation, options, explanation, law_articles, cognitive_analysis, created_at
) VALUES 
(
  'Direito Penal',
  'Crimes Contra a Administração Pública',
  'Cebraspe',
  2021,
  'Polícia Federal',
  'Considere que Paulo, funcionário público, tenha subtraído para si determinado bem móvel público de que tinha a posse em razão do cargo. Nessa situação hipotética, Paulo praticou o crime de peculato-apropriação.',
  'Art. 312, caput, primeira parte, do Código Penal',
  '[{"id":"opt-pf-1-c","text":"CERTO","isCorrect":true,"distractorReason":null},{"id":"opt-pf-1-e","text":"ERRADO","isCorrect":false,"distractorReason":"A banca tenta induzir o candidato ao peculato-furto, mas a posse prévia em razão do cargo tipifica o peculato-apropriação."}]'::jsonb,
  'Correto. O funcionário que se apropria de dinheiro, valor ou qualquer outro bem móvel, público ou particular, de que tem a posse em razão do cargo comete peculato-apropriação (Art. 312, 1ª parte, do CP).',
  ARRAY['Art. 312 do Código Penal'],
  '{"commonTrap":"Confusão clássica entre peculato-apropriação (posse prévia) e peculato-furto (§ 1º, sem a posse).","keyConcept":"Peculato-Apropriação","bancaTendency":"O Cebraspe explora a relação de causalidade entre a posse do bem e a função pública do agente."}'::jsonb,
  NOW()
),
(
  'Direito Constitucional',
  'Aplicabilidade e Eficácia das Normas Constitucionais',
  'Cebraspe',
  2021,
  'Polícia Federal',
  'As normas constitucionais de eficácia contida são aquelas em que o legislador constituinte regulou suficientemente os interesses relativos a determinada matéria, mas deixou margem à atuação restritiva por parte da competência discricionária do poder público, nos termos que a lei estabelecer ou nos conceitos gerais que ela enunciar.',
  'Classificação de José Afonso da Silva',
  '[{"id":"opt-pf-2-c","text":"CERTO","isCorrect":true,"distractorReason":null},{"id":"opt-pf-2-e","text":"ERRADO","isCorrect":false,"distractorReason":"A banca costuma trocar a definição de eficácia contida com a de eficácia limitada."}]'::jsonb,
  'Correto. As normas de eficácia contida têm aplicabilidade direta e imediata, mas não integral, pois podem ter seu alcance restringido pela legislação infraconstitucional superveniente ou conceitos gerais.',
  ARRAY['Art. 5º, XIII, da CF/88'],
  '{"commonTrap":"Inversão da terminologia entre norma contida (restringível) e norma limitada (depende de integração regulamentar).","keyConcept":"Eficácia Contida","bancaTendency":"Cobrança doutrinária literal dos conceitos consagrados por José Afonso da Silva."}'::jsonb,
  NOW()
),
(
  'Direito Administrativo',
  'Improbidade Administrativa (Lei 14.230/2021)',
  'Cebraspe',
  2024,
  'Polícia Federal',
  'A conduta do servidor público federal que, por mera negligência ou imperícia na condução de processo licitatório, causa dano patrimonial involuntário ao erário configura ato de improbidade administrativa sancionável com a perda da função pública.',
  'Art. 1º, §§ 1º e 2º, e Art. 10 da Lei 8.429/92 (com redação da Lei 14.230/2021)',
  '[{"id":"opt-pf-3-c","text":"CERTO","isCorrect":false,"distractorReason":"Indução ao erro baseada na redação antiga do Art. 10 (que admitia culpa culposa antes da Lei 14.230/21)."},{"id":"opt-pf-3-e","text":"ERRADO","isCorrect":true,"distractorReason":null}]'::jsonb,
  'Errado. Com a reforma promovida pela Lei nº 14.230/2021, foi extinta a modalidade culposa de improbidade administrativa. Atualmente, todos os atos de improbidade (Arts. 9º, 10 e 11) exigem a presença de dolo específico.',
  ARRAY['Lei 14.230/2021', 'Art. 10 da Lei 8.429/92'],
  '{"commonTrap":"Cobrança da redação revogada da Lei 8.429/92 que admitia ato de improbidade culposo no prejuízo ao erário.","keyConcept":"Dolo Específico Obrigatório na LIA","bancaTendency":"Explorar o lapso de candidatos desatualizados que ainda estudam materiais anteriores a outubro de 2021."}'::jsonb,
  NOW()
);

-- 2. CEBRASPE - INSS (Técnico do Seguro Social)
INSERT INTO public.questions (
  subject_name, topic_name, banca, year, institution, statement, code_citation, options, explanation, law_articles, cognitive_analysis, created_at
) VALUES 
(
  'Direito Previdenciário',
  'Segurados Obrigatórios do RGPS',
  'Cebraspe',
  2024,
  'INSS',
  'Carlos, eleito síndico do condomínio residencial em que reside, não recebe remuneração em dinheiro pela função, mas é isento do pagamento da quota condominial mensal. Nessa situação, Carlos é considerado segurado obrigatório da Previdência Social como contribuinte individual.',
  'Art. 12, V, "f", da Lei 8.212/91 e Art. 9º, V, "j", do Decreto 3.048/99',
  '[{"id":"opt-inss-1-c","text":"CERTO","isCorrect":true,"distractorReason":null},{"id":"opt-inss-1-e","text":"ERRADO","isCorrect":false,"distractorReason":"Candidatos confundem ausência de salário com ausência de remuneração, ignorando que a isenção de cota condominial possui natureza remuneratória."}]'::jsonb,
  'Correto. O síndico que recebe remuneração ou que é dispensado do pagamento da taxa de condomínio é segurado obrigatório do RGPS na qualidade de contribuinte individual.',
  ARRAY['Lei 8.212/91, Art. 12, V, f', 'Decreto 3.048/99, Art. 9º, V, j'],
  '{"commonTrap":"O candidato assume que a isenção de taxa condominial não gera vínculo previdenciário obrigatório.","keyConcept":"Síndico Remunerado / Isento como Contribuinte Individual","bancaTendency":"O Cebraspe adora hipóteses de enquadramento de segurados em situações cotidianas sem carteira assinada."}'::jsonb,
  NOW()
),
(
  'Direito Previdenciário',
  'Princípios da Seguridade Social',
  'Cebraspe',
  2024,
  'INSS',
  'O princípio da universalidade da cobertura e do atendimento prescreve que o atendimento previdenciário deve ser concedido indistintamente a qualquer pessoa que dele necessite no território nacional, independentemente de filiação prévia ou de contribuição.',
  'Art. 194, parágrafo único, I, e Art. 201 da CF/88',
  '[{"id":"opt-inss-2-c","text":"CERTO","isCorrect":false,"distractorReason":"Confusão entre a Seguridade Social (gênero) e a Previdência Social (espécie contributiva)."},{"id":"opt-inss-2-e","text":"ERRADO","isCorrect":true,"distractorReason":null}]'::jsonb,
  'Errado. Embora a Assistência Social e a Saúde independam de contribuição, a Previdência Social tem caráter estritamente contributivo e de filiação obrigatória (Art. 201, caput, da CF/88).',
  ARRAY['Art. 194 e 201 da CF/88'],
  '{"commonTrap":"Misturar as regras da Saúde/Assistência (não contributivas) com as regras da Previdência (contributiva).","keyConcept":"Caráter Contributivo da Previdência","bancaTendency":"Generalizar regras da Seguridade Social como se fossem válidas para a Previdência."}'::jsonb,
  NOW()
);

-- 3. FGV - OAB (Exame de Ordem Unificado - 1ª Fase)
INSERT INTO public.questions (
  subject_name, topic_name, banca, year, institution, statement, code_citation, options, explanation, law_articles, cognitive_analysis, created_at
) VALUES 
(
  'Ética Profissional da OAB',
  'Incompatibilidades e Impedimentos',
  'FGV',
  2024,
  'Ordem dos Advogados do Brasil (OAB)',
  'Lucas, advogado regularmente inscrito na OAB, foi nomeado para exercer cargo em comissão de Diretor-Geral de Autarquia de Trânsito municipal. Preocupado com seus clientes, consulta seu colega de escritório sobre a possibilidade de continuar advogando nas causas que já patrocina.
À luz do Estatuto da Advocacia e da OAB (Lei 8.906/94):',
  'Art. 28, III, da Lei 8.906/1994',
  '[{"id":"opt-oab-1-a","text":"Lucas sofre apenas impedimento para advogar contra a fazenda pública municipal que o remunera.","isCorrect":false,"distractorReason":"O cargo de direção em autarquia gera incompatibilidade total, não mero impedimento."},{"id":"opt-oab-1-b","text":"O exercício da função de direção em autarquia de trânsito acarreta incompatibilidade absoluta com o exercício da advocacia, devendo Lucas licenciar-se.","isCorrect":true,"distractorReason":null},{"id":"opt-oab-1-c","text":"Lucas poderá continuar advogando em causas cíveis e trabalhistas, vedada apenas a advocacia na esfera penal.","isCorrect":false,"distractorReason":"A incompatibilidade do art. 28 é total e irrestrita a qualquer ramo do direito."},{"id":"opt-oab-1-d","text":"A advocacia é livre, sendo necessária apenas a renúncia aos processos em que o município seja parte contrária.","isCorrect":false,"distractorReason":"Distrator clássico que minimiza as proibições do Estatuto da OAB."}]'::jsonb,
  'Correto. O Art. 28, III, da Lei 8.906/94 dispõe que a advocacia é incompatível, mesmo em causa própria, com o exercício de cargos de direção e gerência em autarquias, fundações e empresas públicas.',
  ARRAY['Lei 8.906/94, Art. 28, III'],
  '{"commonTrap":"Distinção entre incompatibilidade (proibição total) e impedimento (proibição parcial restrita à Fazenda Pública).","keyConcept":"Incompatibilidade em Cargos de Direção","bancaTendency":"A FGV sempre traz casos práticos com advogados ocupando cargos de gerência em empresas públicas ou autarquias."}'::jsonb,
  NOW()
),
(
  'Ética Profissional da OAB',
  'Publicidade e Propaganda na Advocacia',
  'FGV',
  2024,
  'Ordem dos Advogados do Brasil (OAB)',
  'A sociedade de advogados "Silva & Associados" decide impulsionar publicações no Instagram com anúncios pagos. Em um dos vídeos, afirma ter "98% de vitórias no Tribunal Regional do Trabalho" e oferece consulta gratuita via WhatsApp aos trabalhadores demitidos.
Considerando o Código de Ética e Disciplina da OAB e o Provimento nº 205/2021:
',
  'Art. 39 e 40 do Código de Ética e Provimento 205/2021 do CFOAB',
  '[{"id":"opt-oab-2-a","text":"A publicidade é lícita, pois o Provimento 205/2021 autorizou expressamente o impulsionamento em redes sociais e a garantia de resultados.","isCorrect":false,"distractorReason":"A promessa de resultado e a garantia percentual continuam terminantemente vedadas."},{"id":"opt-oab-2-b","text":"A publicidade é ilícita, pois embora o impulsionamento seja admitido para fins informativos, é vedada a promessa de resultados, a captação mercantil e a oferta de gratuidade como isca de clientela.","isCorrect":true,"distractorReason":null},{"id":"opt-oab-2-c","text":"O impulsionamento na internet é proibido sob qualquer pretexto pelo Código de Ética da OAB.","isCorrect":false,"distractorReason":"O impulsionamento de conteúdo meramente informativo é permitido pelo Provimento 205/2021."},{"id":"opt-oab-2-d","text":"Apenas a consulta gratuita é proibida, sendo plenamente válida a divulgação de percentual de vitórias judiciais anteriores.","isCorrect":false,"distractorReason":"Divulgação de percentual de êxito é expressamente vedada por mercantilizar a profissão."}]'::jsonb,
  'Correto. O Provimento 205/2021 autorizou o marketing jurídico e impulsionamento, mas manteve estritamente vedada a veiculação de percentual de êxito, garantia de resultados, ostentação ou mercantilização da advocacia.',
  ARRAY['Provimento 205/2021 CFOAB', 'Art. 39 do CED'],
  '{"commonTrap":"Achar que a liberação do impulsionamento no Provimento 205/21 autorizou a promessa de vitória ou mercantilismo.","keyConcept":"Limites do Marketing Jurídico (Provimento 205/21)","bancaTendency":"A FGV formula enunciados sobre publicidade nas redes sociais em quase todos os Exames de Ordem recentes."}'::jsonb,
  NOW()
);

-- 4. VUNESP - TJSP (Escrevente Técnico Judiciário)
INSERT INTO public.questions (
  subject_name, topic_name, banca, year, institution, statement, code_citation, options, explanation, law_articles, cognitive_analysis, created_at
) VALUES 
(
  'Direito Processual Civil',
  'Atos Processuais e Prazos (CPC/2015)',
  'Vunesp',
  2024,
  'Tribunal de Justiça de São Paulo (TJSP)',
  'Nos termos do Código de Processo Civil de 2015 (Lei nº 13.105/2015), a contagem dos prazos processuais computar-se-á:',
  'Art. 219 do Código de Processo Civil',
  '[{"id":"opt-tjsp-1-a","text":"Em dias corridos, suspendendo-se apenas nos feriados forenses e no recesso de fim de ano.","isCorrect":false,"distractorReason":"Regra do antigo CPC/73 que foi superada pelo CPC/15."},{"id":"opt-tjsp-1-b","text":"Somente em dias úteis, para a prática de qualquer ato processual, inclusive prazos de direito material.","isCorrect":false,"distractorReason":"A contagem em dias úteis aplica-se somente aos prazos processuais, não de direito material."},{"id":"opt-tjsp-1-c","text":"Somente os dias úteis, na contagem de prazo em dias, estabelecido por lei ou pelo juiz, para a prática de ato processual.","isCorrect":true,"distractorReason":null},{"id":"opt-tjsp-1-d","text":"Em dias corridos se o prazo for superior a 15 dias e em dias úteis se for inferior a 15 dias.","isCorrect":false,"distractorReason":"Invenção de regra mista que não existe no CPC."},{"id":"opt-tjsp-1-e","text":"Continuamente, não se interrompendo aos sábados, domingos e feriados em nenhuma hipótese.","isCorrect":false,"distractorReason":"Confusão com o processo penal (CPP, art. 798)."}]'::jsonb,
  'Correto. Art. 219 do CPC: "Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão somente os dias úteis. Parágrafo único. O disposto neste artigo aplica-se somente aos prazos processuais."',
  ARRAY['Art. 219 do CPC/2015'],
  '{"commonTrap":"A banca Vunesp adora cobrar a literalidade do CPC confrontando a contagem de prazo processual (dias úteis) com direito material.","keyConcept":"Prazos Processuais em Dias Úteis","bancaTendency":"A Vunesp cobra texto de lei seca quase sem alterações doutrinárias."}'::jsonb,
  NOW()
);

-- 5. FGV - RECEITA FEDERAL (Auditor-Fiscal)
INSERT INTO public.questions (
  subject_name, topic_name, banca, year, institution, statement, code_citation, options, explanation, law_articles, cognitive_analysis, created_at
) VALUES 
(
  'Direito Tributário',
  'Decadência e Homologação Tributária',
  'FGV',
  2023,
  'Receita Federal do Brasil',
  'A sociedade empresária Alfa realizou a importação de insumos e efetuou o pagamento antecipado do tributo devido por homologação com base em cálculo próprio. Quatro anos após o fato gerador, o Fisco constatou erro no cálculo e ausência de recolhimento de parcela devida, não havendo comprovação de dolo, fraude ou simulação do contribuinte.
Nessa situação, o prazo decadencial para a autoridade fazendária constituir o crédito tributário remanescente:',
  'Art. 150, § 4º, do Código Tributário Nacional (CTN)',
  '[{"id":"opt-rf-1-a","text":"Inicia-se no primeiro dia do exercício seguinte àquele em que o lançamento poderia ter sido efetuado (Art. 173, I, do CTN).","isCorrect":false,"distractorReason":"A regra do Art. 173, I aplica-se quando NÃO HÁ pagamento antecipado ou em caso de fraude/dolo."},{"id":"opt-rf-1-b","text":"Extingue-se em 5 anos a contar da data da ocorrência do fato gerador, operando-se a homologação tácita caso o Fisco não lance o suplementar até o prazo.","isCorrect":true,"distractorReason":null},{"id":"opt-rf-1-c","text":"É imprescritível por se tratar de tributo aduaneiro sujeito à soberania fiscal.","isCorrect":false,"distractorReason":"Não existe crédito tributário imprescritível nessa hipótese."},{"id":"opt-rf-1-d","text":"Conta-se a partir da intimação do auto de infração ao sujeito passivo.","isCorrect":false,"distractorReason":"Confusão entre constituição de crédito e suspensão da prescrição."},{"id":"opt-rf-1-e","text":"Prescreve em 1 ano caso tenha havido despacho aduaneiro regular sem ressalvas.","isCorrect":false,"distractorReason":"O prazo decadencial geral do CTN é quinquenal."}]'::jsonb,
  'Correto. Nos tributos sujeitos a lançamento por homologação, havendo pagamento antecipado (mesmo que a menor) e inexistindo dolo, fraude ou simulação, o prazo decadencial de 5 anos conta-se da ocorrência do fato gerador (Art. 150, § 4º, do CTN).',
  ARRAY['Art. 150, § 4º do CTN', 'Súmula 555 do STJ'],
  '{"commonTrap":"Conflito clássico entre a regra geral do Art. 173, I (1º dia do exercício seguinte) e a regra do Art. 150, § 4º (fato gerador quando há antecipação).","keyConcept":"Decadência nos Tributos por Homologação","bancaTendency":"A FGV formula casos concretos densos para testar se o aluno sabe identificar se houve ou não pagamento antecipado."}'::jsonb,
  NOW()
);
