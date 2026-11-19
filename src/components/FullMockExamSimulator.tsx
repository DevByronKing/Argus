'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Clock,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Lock,
  History,
} from 'lucide-react';
import {
  MockExam,
  MockExamAnswer,
  MockExamResult,
  Question,
  Flashcard,
  SubscriptionPlan,
} from '@/lib/types';
import { calculateExamScore } from '@/lib/examScoring';
import { MOCK_FULL_EXAMS } from '@/lib/mockData';
import { MockExamInProgressView } from './mock-exam/MockExamInProgressView';
import { MockExamResultView } from './mock-exam/MockExamResultView';

interface FullMockExamSimulatorProps {
  onAddFlashcardsBatch?: (flashcards: Flashcard[]) => void;
  onGoBackToQuickQuiz?: () => void;
  userPlan?: SubscriptionPlan;
  onOpenPricing?: () => void;
}

export const FullMockExamSimulator: React.FC<FullMockExamSimulatorProps> = ({
  onAddFlashcardsBatch,
  onGoBackToQuickQuiz,
  userPlan = 'aspirante',
  onOpenPricing,
}) => {
  const [exams] = useState<MockExam[]>(MOCK_FULL_EXAMS);
  const [selectedExam, setSelectedExam] = useState<MockExam>(exams[0]);
  const [viewMode, setViewMode] = useState<'select' | 'in_progress' | 'result'>('select');

  const [examTab, setExamTab] = useState<'all' | 'past_exams' | 'simulados'>('past_exams');
  const [careerFilter, setCareerFilter] = useState<string>('all');
  const [bancaFilter, setBancaFilter] = useState<string>('all');

  const [answers, setAnswers] = useState<Record<string, MockExamAnswer>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(45 * 60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [result, setResult] = useState<MockExamResult | null>(null);

  const [resultFilter, setResultFilter] = useState<'all' | 'wrong' | 'blank' | 'correct'>('all');
  const [visibleResultsCount, setVisibleResultsCount] = useState<number>(15);
  const [addedToSRS, setAddedToSRS] = useState<boolean>(false);

  const handleFinishExamRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (viewMode === 'in_progress' && isTimerActive) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            handleFinishExamRef.current?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [viewMode, isTimerActive]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = (exam: MockExam) => {
    setSelectedExam(exam);
    const initialAnswers: Record<string, MockExamAnswer> = {};
    exam.questions.forEach((q) => {
      initialAnswers[q.id] = {
        questionId: q.id,
        selectedOptionId: null,
        isFlaggedForReview: false,
      };
    });
    setAnswers(initialAnswers);
    setCurrentQuestionIndex(0);
    setRemainingSeconds(exam.durationMinutes * 60);
    setIsTimerActive(true);
    setViewMode('in_progress');
    setResult(null);
    setAddedToSRS(false);
  };

  const currentQuestion: Question | undefined = selectedExam.questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        selectedOptionId: optionId,
      },
    }));
  };

  const handleClearAnswer = (questionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        selectedOptionId: null,
      },
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        isFlaggedForReview: !prev[questionId]?.isFlaggedForReview,
      },
    }));
  };

  const handleFinishExam = () => {
    setIsTimerActive(false);
    setShowConfirmModal(false);

    const scoreOutput = calculateExamScore({
      examId: selectedExam.id,
      examTitle: selectedExam.title,
      banca: selectedExam.banca,
      totalQuestions: selectedExam.questions.length,
      scoringRule: selectedExam.scoringRule,
      cutoffScore: selectedExam.estimatedCutoffScore,
      answers: selectedExam.questions.map((q) => {
        const ans = answers[q.id];
        const correctOption = q.options.find((o) => o.isCorrect);
        return {
          questionId: q.id,
          subjectName: q.subjectName,
          selectedOption: ans?.selectedOptionId || null,
          officialAnswer: correctOption?.id || '',
        };
      }),
    });

    const {
      totalQuestions,
      answeredCount,
      correctCount,
      wrongCount,
      blankCount,
      grossScore,
      penaltyDeductions,
      netScore,
      percentage,
      isAboveCutoff,
      subjectBreakdown,
    } = scoreOutput;

    const totalCandidates = 1420;
    let simulatedRank = 14;
    const rankJitter = Math.round(percentage) % 7;
    if (percentage >= 90) simulatedRank = rankJitter + 1;
    else if (percentage >= 80) simulatedRank = rankJitter * 3 + 9;
    else if (percentage >= 70) simulatedRank = rankJitter * 10 + 35;
    else if (percentage >= 50) simulatedRank = rankJitter * 40 + 150;
    else simulatedRank = rankJitter * 80 + 600;

    const examResult: MockExamResult = {
      mockExamId: selectedExam.id,
      mockExamTitle: selectedExam.title,
      banca: selectedExam.banca,
      scoringRule: selectedExam.scoringRule,
      totalQuestions,
      answeredCount,
      correctCount,
      wrongCount,
      blankCount,
      grossScore,
      penaltyDeductions,
      netScore,
      percentage,
      simulatedRank,
      totalCandidates,
      isAboveCutoff,
      cutoffScore: selectedExam.estimatedCutoffScore,
      timeSpentSeconds: selectedExam.durationMinutes * 60 - remainingSeconds,
      completedAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      subjectBreakdown,
    };

    setResult(examResult);
    setViewMode('result');
  };

  useEffect(() => {
    handleFinishExamRef.current = handleFinishExam;
  });

  const handleAddWrongQuestionsToSRS = () => {
    if (!result || !onAddFlashcardsBatch) return;

    const wrongQuestions = selectedExam.questions.filter((q) => {
      const ans = answers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect);
      return ans && ans.selectedOptionId !== null && ans.selectedOptionId !== correctOption?.id;
    });

    if (wrongQuestions.length === 0) return;

    const newCards: Flashcard[] = wrongQuestions.map((q) => {
      const correctOpt = q.options.find((o) => o.isCorrect);
      return {
        id: `fc-sim-${Date.now()}-${q.id}`,
        subjectName: q.subjectName,
        topicName: q.topicName,
        front: `[${q.banca} / ${q.subjectName}] ${q.statement}`,
        back: `GABARITO: ${correctOpt?.text}\n\nFUNDAMENTO: ${q.explanation}\n\nARTIGOS: ${q.lawArticles?.join(', ') || 'Jurisprudência oficial'}`,
        errorOriginQuestionId: q.id,
        intervalDays: 1,
        repetitions: 0,
        easeFactor: 2.5,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      };
    });

    onAddFlashcardsBatch(newCards);
    setAddedToSRS(true);
  };

  const answeredCount = Object.values(answers).filter((a) => a.selectedOptionId !== null).length;
  const blankCount = selectedExam.questions.length - answeredCount;
  const flaggedCount = Object.values(answers).filter((a) => a.isFlaggedForReview).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* VIEW MODE 1: SELECT EXAM */}
      {viewMode === 'select' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-300 dark:border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  Acervo de Provas Anteriores &amp; Simulados Oficiais
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                  Cebraspe • FGV • Vunesp • FCC
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5">
                Provas Anteriores Oficiais &amp; Simulados Cronometrados
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
                Treine com as <strong>provas reais dos concursos anteriores na íntegra</strong> sob condições de prova (tempo oficial e regra da banca). Compare seu resultado líquido com a <strong>nota de corte histórica que realmente aprovou</strong>.
              </p>
            </div>

            {onGoBackToQuickQuiz && (
              <button
                onClick={onGoBackToQuickQuiz}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-2 self-start md:self-auto shrink-0 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar ao Treino Avulso</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setExamTab('past_exams')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  examTab === 'past_exams'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Provas Anteriores Oficiais ({exams.filter((e) => e.isOfficialPastExam).length})</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-black font-extrabold ml-1">
                  PRO &amp; ELITE
                </span>
              </button>

              <button
                onClick={() => setExamTab('simulados')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  examTab === 'simulados'
                    ? 'bg-indigo-600 text-white shadow-md font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulados Inéditos ({exams.filter((e) => !e.isOfficialPastExam).length})</span>
              </button>

              <button
                onClick={() => setExamTab('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  examTab === 'all'
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todas ({exams.length})
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <div className="flex items-center gap-1 bg-white dark:bg-dark-surface px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10">
                <span className="text-slate-400 text-[11px] font-bold">Carreira:</span>
                <select
                  value={careerFilter}
                  onChange={(e) => setCareerFilter(e.target.value)}
                  className="bg-transparent text-slate-800 dark:text-slate-200 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Todas as Carreiras</option>
                  <option value="policial">Policial (PF, PRF)</option>
                  <option value="fiscal">Fiscal (Receita Federal)</option>
                  <option value="tribunais">Tribunais (TJ-SP)</option>
                  <option value="administrativa">Administrativa (INSS)</option>
                  <option value="juridica">Jurídica (OAB)</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-white dark:bg-dark-surface px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10">
                <span className="text-slate-400 text-[11px] font-bold">Banca:</span>
                <select
                  value={bancaFilter}
                  onChange={(e) => setBancaFilter(e.target.value)}
                  className="bg-transparent text-slate-800 dark:text-slate-200 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Todas as Bancas</option>
                  <option value="Cebraspe">Cebraspe</option>
                  <option value="FGV">FGV</option>
                  <option value="Vunesp">Vunesp</option>
                  <option value="FCC">FCC</option>
                </select>
              </div>
            </div>
          </div>

          {(() => {
            const filteredExams = exams.filter((exam) => {
              if (examTab === 'past_exams' && !exam.isOfficialPastExam) return false;
              if (examTab === 'simulados' && exam.isOfficialPastExam) return false;
              if (careerFilter !== 'all' && exam.careerCategory !== careerFilter) return false;
              if (bancaFilter !== 'all' && exam.banca !== bancaFilter) return false;
              return true;
            });

            if (filteredExams.length === 0) {
              return (
                <div className="text-center py-16 px-6 glass-panel rounded-3xl border border-indigo-500/30 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md space-y-5 max-w-2xl mx-auto shadow-2xl animate-fadeIn">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <ShieldAlert className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-amber-500 uppercase">
                      Nenhum Simulado com os Filtros Selecionados
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      A FGV não descansa. Crie o seu primeiro simulado focado em Direito Constitucional e identifique as suas vulnerabilidades.
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                      Não espere o edital sair para descobrir onde você erra. Redefina os filtros ou inicie um simulado imediato de alta intensidade.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setExamTab('all');
                        setCareerFilter('all');
                        setBancaFilter('all');
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                      <span>Limpar Filtros &amp; Iniciar Simulado Agora</span>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredExams.map((exam) => {
                  const isLocked = userPlan === 'aspirante';

                  return (
                    <div
                      key={exam.id}
                      className={`glass-panel bg-white/80 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between group relative overflow-hidden ${
                        isLocked
                          ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50'
                          : 'border-slate-200 dark:border-white/10 hover:border-indigo-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-4 border-b border-slate-300 dark:border-white/10 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                              Banca {exam.banca}
                            </span>
                            {exam.isOfficialPastExam ? (
                              <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-400 font-black border border-amber-500/30 flex items-center gap-1">
                                <History className="w-3 h-3" />
                                PROVA OFICIAL {exam.examYear || ''}
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/30">
                                SIMULADO INÉDITO
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{exam.durationMinutes} min</span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                            {exam.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {exam.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 p-3 mt-5 rounded-2xl bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5 text-center text-xs">
                          <div>
                            <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Questões</span>
                            <strong className="text-slate-900 dark:text-white font-mono font-bold">
                              {exam.questions.length}
                            </strong>
                          </div>
                          <div>
                            <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Nota de Corte</span>
                            <strong className="text-amber-400 font-mono font-bold">
                              {exam.historicalCutoffScore ? `${exam.historicalCutoffScore} pts` : `${exam.estimatedCutoffScore || 70}%`}
                            </strong>
                          </div>
                          <div>
                            <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Regra</span>
                            <strong className="text-indigo-400 font-mono font-bold text-[10px]">
                              {exam.scoringRule === 'cebraspe_uma_anula_uma' ? '1 Errada Anula 1' : 'Padrão'}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-300 dark:border-white/10">
                        {isLocked ? (
                          <div className="space-y-2">
                            <button
                              onClick={onOpenPricing}
                              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
                            >
                              <Lock className="w-4 h-4" />
                              <span>Desbloquear Prova Oficial (Assine PRO)</span>
                            </button>
                            <p className="text-[10px] text-center text-slate-500 dark:text-slate-400">
                              Exclusivo para assinantes Concurseiro PRO e Carreiras Elite.
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartExam(exam)}
                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                          >
                            <span>{exam.isOfficialPastExam ? 'Iniciar Caderno de Prova Oficial' : 'Iniciar Prova Simulada'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW MODE 2: IN PROGRESS (MODO PROVA REAL) */}
      {viewMode === 'in_progress' && currentQuestion && (
        <MockExamInProgressView
          selectedExam={selectedExam}
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentAnswer={currentAnswer}
          answers={answers}
          remainingSeconds={remainingSeconds}
          answeredCount={answeredCount}
          blankCount={blankCount}
          flaggedCount={flaggedCount}
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
          formatTime={formatTime}
          onSelectOption={handleSelectOption}
          onClearAnswer={handleClearAnswer}
          onToggleFlag={handleToggleFlag}
          onFinishExam={handleFinishExam}
        />
      )}

      {/* VIEW MODE 3: OFFICIAL RESULT & SIMULATED RANKING */}
      {viewMode === 'result' && result && (
        <MockExamResultView
          selectedExam={selectedExam}
          result={result}
          answers={answers}
          userPlan={userPlan}
          resultFilter={resultFilter}
          setResultFilter={setResultFilter}
          visibleResultsCount={visibleResultsCount}
          setVisibleResultsCount={setVisibleResultsCount}
          addedToSRS={addedToSRS}
          onAddWrongQuestionsToSRS={handleAddWrongQuestionsToSRS}
          onBackToSelect={() => setViewMode('select')}
          onRetakeExam={() => handleStartExam(selectedExam)}
          onOpenPricing={onOpenPricing}
        />
      )}
    </div>
  );
};
