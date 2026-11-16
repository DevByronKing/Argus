const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../src/components/QuizSimulator.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add Header above Unified Compact Controls
const targetControlStart = '          {/* Unified Compact Controls: Modes + Filters in a Single High-Density Bar */}';

const replacementHeader = `          {/* Header Intuitivo da Arena de Combate */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-black uppercase tracking-wider">
                <Swords className="w-3.5 h-3.5" />
                <span>Arena de Combate 60/40 • Treino Adaptativo</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Simulador de Questões Reais &amp; Desarme de Pegadinhas
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl font-medium">
                Baterias oficiais com 25.000+ questões Cebraspe, FGV, FCC e Vunesp. Cronometre seu tempo (60s), use atalhos de teclado (<kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-[10px] font-mono">A-E</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-[10px] font-mono">Enter</kbd>) e receba a engenharia reversa das bancas examinadoras.
              </p>
            </div>

            {/* Ação Rápida: Ativar Modo Foco Zen */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsZenMode(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer"
                title="Ativar Modo Foco Zen sem distrações (Atalho: tecla F)"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Ativar Modo Foco Zen [F]</span>
              </button>
            </div>
          </div>

          {/* Unified Compact Controls: Modes + Filters in a Single High-Density Bar */}`;

if (code.includes(targetControlStart)) {
  code = code.replace(targetControlStart, replacementHeader);
  console.log('Header added successfully!');
} else {
  console.log('targetControlStart not found directly, attempting fuzzy search...');
  code = code.replace(/\{\/\* Unified Compact Controls: Modes \+ Filters in a Single High-Density Bar \*\/\}/, replacementHeader.trim());
}

// 2. Replace the Left Column explanation with the complete, full AI breakdown
const oldInlineExpStart = '{/* Comentário Inline, Lei Seca & Telemetria Imediata (Ergonomia Mobile & Jakob) */}';
const oldInlineExpEnd = '{/* COLUNA DIREITA: STATS, COGNITIVE COPILOT & VADE MECUM (40% - 5 COLS) */}';

const idxStart = code.indexOf(oldInlineExpStart);
const idxEnd = code.indexOf(oldInlineExpEnd);

if (idxStart !== -1 && idxEnd !== -1) {
  const replacementLeftExp = `{/* Explicação Completa & Diagnóstico Cognitivo da IA (Alinhamento Perfeito Sem Cortes) */}
                {isAnswered && (
                  <div className="mt-6 p-6 sm:p-7 rounded-3xl bg-white dark:bg-dark-card border border-indigo-500/30 shadow-md space-y-5 animate-fadeIn">
                    
                    {/* Header de Gabarito & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-2.5">
                        {selectedOptionId && currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect ? (
                          <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 px-3.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-500/30">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            Gabarito Correto!
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs font-black text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-500/20 px-3.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-500/30">
                            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                            Resposta Incorreta
                          </span>
                        )}
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Gabarito Oficial: Letra {String.fromCharCode(65 + Math.max(0, currentQuestion.options.findIndex(o => o.isCorrect)))}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        Banca: {currentQuestion.banca} • {currentQuestion.year}
                      </span>
                    </div>

                    {/* Mecanismo do Distrator (Caso tenha errado) */}
                    {selectedOptionId && !currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect && (
                      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 space-y-1">
                        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Mecanismo do Distrator Explorado pela Banca</span>
                        </div>
                        <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
                          {currentQuestion.options.find(o => o.id === selectedOptionId)?.distractorReason || 'A alternativa foi redigida para induzir o candidato ao erro através de inversão semântica ou confusão de conceitos correlatos.'}
                        </p>
                      </div>
                    )}

                    {/* Explicação da Banca / Comentário do Especialista */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Comentário do Especialista &amp; Fundamentação:</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                        {currentQuestion.explanation}
                      </p>
                    </div>

                    {/* Citação Direta da Lei Seca */}
                    {currentQuestion.codeCitation && (
                      <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-xs flex items-start gap-3">
                        <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="font-bold text-indigo-950 dark:text-indigo-200 block">
                            Legislação / Lei Seca Vinculada:
                          </span>
                          <span className="font-mono text-indigo-700 dark:text-indigo-300 text-xs">
                            {currentQuestion.codeCitation}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Raio-X da Pegadinha */}
                    {currentQuestion.cognitiveAnalysis?.commonTrap && (
                      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-xs flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="font-bold text-amber-950 dark:text-amber-200 block">
                            Pegadinha Detectada pela Banca ({currentQuestion.banca}):
                          </span>
                          <p className="text-amber-900 dark:text-amber-300 leading-relaxed">
                            {currentQuestion.cognitiveAnalysis.commonTrap}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Barra de Ações: Salvar Flashcard + Feedback */}
                    <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const correctOpt = currentQuestion.options.find(o => o.isCorrect);
                          onAddFlashcard({
                            id: 'fc-' + Date.now(),
                            subjectName: currentQuestion.subjectName,
                            topicName: currentQuestion.topicName,
                            front: '[' + currentQuestion.banca + ' / ' + currentQuestion.subjectName + ']\\n' + currentQuestion.statement.slice(0, 180) + '...',
                            back: 'Gabarito: ' + (correctOpt ? correctOpt.text : '') + '\\n\\nFundamento: ' + currentQuestion.explanation.slice(0, 200) + '...\\n\\nBase Legal: ' + (currentQuestion.codeCitation || ''),
                            errorOriginQuestionId: currentQuestion.id,
                            nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                            intervalDays: 1,
                            repetitions: 0,
                            easeFactor: 2.5
                          });
                          setZenFlashcardSaved(true);
                        }}
                        className={'px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ' + (
                          zenFlashcardSaved
                            ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
                            : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white border border-slate-200 dark:border-white/15'
                        )}
                      >
                        {zenFlashcardSaved ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Salvo nos Flashcards!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-amber-500" />
                            <span>+ Salvar no Deck Anki (SRS)</span>
                          </>
                        )}
                      </button>

                      <AIFeedbackVote
                        questionId={currentQuestion.id}
                        banca={currentQuestion.banca}
                        subject={currentQuestion.subjectName}
                      />
                    </div>

                  </div>
                )}

              </div>

            </div>

            `;

  code = code.slice(0, idxStart) + replacementLeftExp + code.slice(idxEnd);
  console.log('Left Column explanation updated successfully!');
} else {
  console.error('Indices for left column not found:', idxStart, idxEnd);
}

// 3. Update the Right Column: Remove max-h cutoff and prevent trap spoiler
const oldRightColStart = '{/* COLUNA DIREITA: STATS, COGNITIVE COPILOT & VADE MECUM (40% - 5 COLS) */}';
const oldRightColEnd = '{/* OVERLAY DO MODO FOCO TOTAL (ZEN MODE) */}';

const rStart = code.indexOf(oldRightColStart);
const rEnd = code.indexOf(oldRightColEnd);

if (rStart !== -1 && rEnd !== -1) {
  const replacementRightCol = `{/* COLUNA DIREITA: STATS, COGNITIVE COPILOT & VADE MECUM (40% - 5 COLS - SEM CORTES) */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
              
              {/* Card 1: Raio-X Psicométrico da Questão */}
              <div className="glass-panel p-5 rounded-3xl bg-white/80 dark:bg-dark-card/70 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      Raio-X Psicométrico da Banca
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 text-[10px] font-black">
                    TRI Nível B
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Taxa de Acerto</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">52%</span>
                    <span className="text-[10px] text-amber-500 block">Pegadinha Frequente</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Tempo Médio</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">1m 45s</span>
                    <span className="text-[10px] text-emerald-500 block">Ritmo Recomendado</span>
                  </div>
                </div>

                {/* Armadilha: Oculta antes de responder (evita dar spoiler da questão) */}
                {isAnswered ? (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 text-xs space-y-1 animate-fadeIn">
                    <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Armadilha Mapeada da Banca ({currentQuestion.banca}):</span>
                    </span>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentQuestion.cognitiveAnalysis?.commonTrap || 'Atenção aos distratores sutis da banca.'}
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-surface/60 border border-slate-200 dark:border-white/5 text-xs space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Armadilha da Banca Oculta</span>
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Selecione sua alternativa e confirme para a IA desbloquear a armadilha e a fundamentação legal.
                    </p>
                  </div>
                )}
              </div>

              {/* Card 2: Guia de Atalhos & Ergonomia Cognitiva */}
              <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-dark-card/50 border border-slate-200 dark:border-white/10 text-xs space-y-2.5">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                  <Keyboard className="w-4 h-4 text-blue-500" />
                  <span>Atalhos de Alta Velocidade</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">A-E</kbd> Selecionar
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">Enter</kbd> Confirmar
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">F</kbd> Modo Foco
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border font-mono">→</kbd> Próxima
                  </span>
                </div>
              </div>

              {/* Card 3: Anotações Táticas do Concurseiro */}
              <div className="p-5 rounded-3xl bg-white/80 dark:bg-dark-card/70 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    Anotação Pessoal da Questão:
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Auto-save</span>
                </div>
                <textarea
                  value={personalNotes}
                  onChange={(e) => setPersonalNotes(e.target.value)}
                  placeholder="Escreva seu mnemônico, pegadinha anotada ou artigo relacionado..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

            </div>

          </div>

        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400">
          Nenhuma questão encontrada para este filtro.
        </div>
      )}

      `;

  code = code.slice(0, rStart) + replacementRightCol + code.slice(rEnd);
  console.log('Right Column updated successfully without cuts!');
} else {
  console.error('Indices for right column not found:', rStart, rEnd);
}

// 4. Update the Zen Mode Overlay
const zenStart = code.indexOf('{/* OVERLAY DO MODO FOCO TOTAL (ZEN MODE) */}');
if (zenStart !== -1) {
  const replacementZen = `{/* OVERLAY DO MODO FOCO TOTAL (ZEN MODE) */}
      {isZenMode && currentQuestion && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="fixed inset-0 z-[999] text-white p-4 sm:p-8 md:p-12 overflow-y-auto flex flex-col justify-between animate-fadeIn preserve-dark force-white"
          style={{ backgroundColor: '#050811', color: '#ffffff' }}
        >
          {/* Zen Mode Header */}
          <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5 text-xs font-black tracking-wider text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white">MODO FOCO TOTAL ZEN • ARENA DE COMBATE</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline text-slate-400">Pressione [F] ou [ESC] para sair</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-mono text-xs text-amber-300 font-bold bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{formatTimer(timeSpentSeconds)}</span>
              </div>
              <div className="hidden sm:block text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/10">
                {currentIndex + 1}/{filteredQuestions.length}
              </div>
              <button
                type="button"
                onClick={() => setIsZenMode(false)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                title="Sair do Modo Zen [ESC]"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sair [ESC]</span>
              </button>
            </div>
          </div>

          {/* Zen Mode Body */}
          <div className="max-w-3xl w-full mx-auto my-auto py-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                {currentQuestion.banca} • {currentQuestion.year}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10">
                {currentQuestion.subjectName}
              </span>
              <span className="text-slate-400">{currentQuestion.topicName}</span>
            </div>

            <p className="text-lg sm:text-xl text-slate-100 font-normal leading-relaxed whitespace-pre-line">
              {currentQuestion.statement}
            </p>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOptionId === option.id;
                const letter = String.fromCharCode(65 + idx);
                let optionStyle = 'bg-white/5 border-white/10 hover:border-indigo-400/50 hover:bg-white/10 text-slate-200';

                if (isAnswered) {
                  if (option.isCorrect) {
                    optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40 font-bold';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-100 ring-2 ring-rose-500/40';
                  } else {
                    optionStyle = 'opacity-35 bg-white/5 border-transparent text-slate-400';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-600/30 border-indigo-400 text-white ring-2 ring-indigo-400/40 shadow-lg';
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      if (!isAnswered) {
                        setSelectedOptionId(option.id);
                        nativeHaptics.lightImpact();
                      }
                    }}
                    className={'p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ' + optionStyle}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={'w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ' + (
                        isAnswered && option.isCorrect
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : isAnswered && isSelected && !option.isCorrect
                          ? 'bg-rose-500 text-white'
                          : isSelected
                          ? 'bg-indigo-500 text-white'
                          : 'bg-white/10 text-slate-300'
                      )}>
                        {letter}
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed break-words">{option.text}</span>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isAnswered && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && isSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-400 border border-white/10">
                        {letter}
                      </kbd>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FULL AI EXPLANATION IN MODO ZEN */}
            {isAnswered && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/15 space-y-4 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    {selectedOptionId && currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect ? (
                      <span className="flex items-center gap-1.5 text-xs font-black text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-xl border border-emerald-500/40">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Gabarito Correto!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-black text-rose-300 bg-rose-500/20 px-3 py-1 rounded-xl border border-rose-500/40">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        Resposta Incorreta
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-200">
                      Gabarito Oficial: Letra {String.fromCharCode(65 + Math.max(0, currentQuestion.options.findIndex(o => o.isCorrect)))}
                    </span>
                  </div>
                </div>

                {/* Distrator Se Errou */}
                {selectedOptionId && !currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200">
                    <strong className="text-rose-300">Pegadinha / Distrator explorado pela banca: </strong>
                    {currentQuestion.options.find(o => o.id === selectedOptionId)?.distractorReason || 'Alternativa construída para induzir o candidato ao erro conceitual.'}
                  </div>
                )}

                {/* Fundamentação & Comentário */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Comentário do Especialista &amp; Fundamentação:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                    {currentQuestion.explanation}
                  </p>
                </div>

                {/* Lei Seca Vinculada */}
                {currentQuestion.codeCitation && (
                  <div className="p-3.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-xs flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-indigo-200 block mb-0.5">
                        Legislação / Lei Seca Vinculada:
                      </span>
                      <span className="font-mono text-indigo-300">
                        {currentQuestion.codeCitation}
                      </span>
                    </div>
                  </div>
                )}

                {/* Flashcard 1-Click Action */}
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const correctOpt = currentQuestion.options.find(o => o.isCorrect);
                      onAddFlashcard({
                        id: 'fc-zen-' + Date.now(),
                        subjectName: currentQuestion.subjectName,
                        topicName: currentQuestion.topicName,
                        front: '[' + currentQuestion.banca + ' / ' + currentQuestion.subjectName + ']\\n' + currentQuestion.statement.slice(0, 180) + '...',
                        back: 'Gabarito Correto: ' + (correctOpt ? correctOpt.text : '') + '\\n\\nFundamento: ' + currentQuestion.explanation.slice(0, 200) + '...\\n\\nBase Legal: ' + (currentQuestion.codeCitation || currentQuestion.lawArticles?.join(', ') || ''),
                        errorOriginQuestionId: currentQuestion.id,
                        nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                        intervalDays: 1,
                        repetitions: 0,
                        easeFactor: 2.5
                      });
                      setZenFlashcardSaved(true);
                    }}
                    className={'px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ' + (
                      zenFlashcardSaved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                    )}
                  >
                    {zenFlashcardSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Salvo no Deck de Flashcards!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        <span>+ Salvar no Baralho de Flashcards SRS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Zen Bottom Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <span className="text-xs text-slate-400">
                Navegação: [A-E] seleciona &bull; [Enter] confirma &bull; [→] avança
              </span>

              {!isAnswered ? (
                <button
                  type="button"
                  onClick={handleConfirmAnswer}
                  disabled={!selectedOptionId}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmar Resposta [Enter ↵]</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                >
                  <span>Próxima Questão</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-500 max-w-4xl mx-auto w-full pt-4 border-t border-white/10 shrink-0">
            Arena de Combate Zen &bull; Argus AI
          </div>
        </div>
      )}

    </div>
  );
};
`;

  code = code.slice(0, zenStart) + replacementZen;
  console.log('Zen Mode updated successfully!');
} else {
  console.error('Zen Mode start not found');
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('All QuizSimulator updates applied cleanly!');
