'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Target,
  Clock,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Highlighter,
  Scissors,
  AlertTriangle,
  Swords,
} from 'lucide-react';
import {
  Question,
  QuestionAttempt,
  Flashcard,
  UserMetrics,
  StudentProfile,
  ExamNotice,
  SubscriptionPlan,
} from '@/lib/types';
import { MOCK_QUESTIONS } from '@/lib/mockData';
import { FullMockExamSimulator } from './FullMockExamSimulator';
import { useStudyStore } from '@/store/useStudyStore';
import { nativeHaptics } from '@/lib/nativeHaptics';
import { HardPaywallGate } from './HardPaywallGate';
import { buildGeneratedAIQuestion } from './quiz-simulator/aiQuestionTemplates';
import { QuizAIGeneratorView } from './quiz-simulator/QuizAIGeneratorView';
import { QuizExplanationPanel } from './quiz-simulator/QuizExplanationPanel';
import { QuizPsychometricSidebar } from './quiz-simulator/QuizPsychometricSidebar';
import { QuizZenModeOverlay } from './quiz-simulator/QuizZenModeOverlay';

interface QuizSimulatorProps {
  onAddFlashcard: (flashcard: Flashcard) => void;
  onAddFlashcardsBatch?: (flashcards: Flashcard[]) => void;
  onRecordAttempt: (attempt: QuestionAttempt) => void;
  metrics: UserMetrics;
  exams?: ExamNotice[];
  selectedExam?: ExamNotice;
  onSelectExam?: (exam: ExamNotice) => void;
  userPlan?: SubscriptionPlan;
  dailyAiCount?: number;
  onOpenPricing?: () => void;
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  onGoHome?: () => void;
  studentProfile?: StudentProfile;
}

const FONT_CLASSES: Record<'sm' | 'base' | 'lg' | 'xl', { statement: string; option: string }> = {
  sm: { statement: 'text-xs sm:text-sm', option: 'text-xs' },
  base: { statement: 'text-sm sm:text-base', option: 'text-xs sm:text-sm' },
  lg: { statement: 'text-base sm:text-lg', option: 'text-sm sm:text-base' },
  xl: { statement: 'text-lg sm:text-xl', option: 'text-base sm:text-lg' },
};

export const QuizSimulator: React.FC<QuizSimulatorProps> = ({
  onAddFlashcard,
  onAddFlashcardsBatch,
  onRecordAttempt,
  exams = [],
  selectedExam,
  onSelectExam,
  userPlan = 'aspirante',
  onOpenPricing,
  onSelectPlan,
  onGoHome,
  studentProfile,
}) => {
  const [simulatorMode, setSimulatorMode] = useState<'quick' | 'full_mock' | 'ai_generator'>('quick');
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data?.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
        }
      })
      .catch(() => {});
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<'alta' | 'media' | 'chute'>('alta');
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('todas');

  const [isZenMode, setIsZenMode] = useState(false);
  const [zenFlashcardSaved, setZenFlashcardSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isZenMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZenMode]);

  const [highlightedSnippets, setHighlightedSnippets] = useState<string[]>([]);
  const [strikethroughSnippets, setStrikethroughSnippets] = useState<string[]>([]);
  const [personalNotes, setPersonalNotes] = useState<string>('');
  const [eliminatedOptionIds, setEliminatedOptionIds] = useState<string[]>([]);
  const [fontSizeLevel, setFontSizeLevel] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');

  const toggleEliminateOption = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEliminatedOptionIds((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const [aiBanca, setAiBanca] = useState<'Cebraspe' | 'FGV' | 'FCC' | 'Vunesp'>('Cebraspe');
  const [aiSubject, setAiSubject] = useState<string>('Direito Constitucional');
  const [aiDifficulty, setAiDifficulty] = useState<string>('Alta Maldade (Nível Auditor / Juiz)');
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [generatedQuestion, setGeneratedQuestion] = useState<Question | null>(null);
  const [aiSelectedOptionId, setAiSelectedOptionId] = useState<string | null>(null);
  const [aiIsAnswered, setAiIsAnswered] = useState<boolean>(false);

  useEffect(() => {
    if (selectedExam) {
      const validBancas: Array<'Cebraspe' | 'FGV' | 'FCC' | 'Vunesp'> = ['Cebraspe', 'FGV', 'FCC', 'Vunesp'];
      const matchedBanca = validBancas.find((b) => b.toLowerCase() === selectedExam.banca.toLowerCase());
      if (matchedBanca) {
        setAiBanca(matchedBanca);
      }
      if (selectedExam.subjects && selectedExam.subjects.length > 0) {
        setAiSubject(selectedExam.subjects[0].name);
      }
    }
  }, [selectedExam]);

  const filteredByExam =
    selectedExam && questions.some((q) => q.banca.toLowerCase() === selectedExam.banca.toLowerCase())
      ? questions.filter((q) => q.banca.toLowerCase() === selectedExam.banca.toLowerCase())
      : questions;

  const filteredQuestions =
    selectedSubjectFilter === 'todas'
      ? filteredByExam
      : filteredByExam.filter(
          (q) =>
            q.subjectId === selectedSubjectFilter ||
            q.subjectName.toLowerCase().includes(selectedSubjectFilter.toLowerCase())
        );

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  useEffect(() => {
    if (isAnswered) return;
    const interval = setInterval(() => {
      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAnswered, currentIndex]);

  const handleConfirmAnswer = () => {
    if (!selectedOptionId || !currentQuestion) return;

    const selectedOpt = currentQuestion.options.find((o) => o.id === selectedOptionId);
    const isCorrect = !!selectedOpt?.isCorrect;

    setIsAnswered(true);

    if (isCorrect) {
      nativeHaptics.success();
    } else {
      nativeHaptics.warning();
    }

    const attempt: QuestionAttempt = {
      id: `attempt-${Date.now()}`,
      questionId: currentQuestion.id,
      selectedOptionId,
      isCorrect,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds,
      diagnostic: {
        confidenceLevel: confidence,
        feedback: isCorrect ? 'Acerto consistente' : 'Erro diagnosticado pela IA',
        actionableAdvice: currentQuestion.cognitiveAnalysis.commonTrap,
        suggestedReviewTopic: currentQuestion.topicName,
        flashcardFront: currentQuestion.statement,
        flashcardBack: currentQuestion.explanation,
      },
    };

    onRecordAttempt(attempt);

    const store = useStudyStore.getState();
    store.selectAnswer(currentQuestion.id, selectedOptionId);
    store.revealAnswer(currentQuestion.id);
    store.addStudyMinutes(Math.max(1, Math.round(timeSpentSeconds / 60)));
    store.updateAccuracy(1, isCorrect ? 1 : 0);

    if (!isCorrect) {
      store.addMistake({
        id: `mistake-${Date.now()}`,
        question: currentQuestion,
        attemptDate: new Date().toISOString().split('T')[0],
        userSelectedOptionId: selectedOptionId,
        errorType: 'pegadinha_banca',
        confidenceLevel: confidence,
        feedback: 'Erro registrado durante o treino cognitivo',
        actionableAdvice: currentQuestion.cognitiveAnalysis.commonTrap,
        userPersonalNote: '',
        isOvercome: false,
        revancheAttemptsCount: 0,
      });
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOptionId(null);
    setZenFlashcardSaved(false);
    setEliminatedOptionIds([]);
    setTimeSpentSeconds(0);
    setConfidence('alta');
    setHighlightedSnippets([]);
    setStrikethroughSnippets([]);
    setPersonalNotes('');
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleConfirmAnswerRef = useRef(handleConfirmAnswer);
  handleConfirmAnswerRef.current = handleConfirmAnswer;
  const handleNextRef = useRef(handleNext);
  handleNextRef.current = handleNext;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      const key = e.key.toUpperCase();

      if (key === 'F' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsZenMode((prev) => !prev);
        return;
      }

      if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
        return;
      }

      if (isAnswered) {
        if (e.key === 'Enter' || e.key === 'ArrowRight' || key === 'N') {
          e.preventDefault();
          handleNextRef.current();
        }
        return;
      }

      if (currentQuestion) {
        const optionKeys = ['A', 'B', 'C', 'D', 'E'];
        const numberKeys = ['1', '2', '3', '4', '5'];

        let optIdx = optionKeys.indexOf(key);
        if (optIdx === -1) optIdx = numberKeys.indexOf(key);

        if (optIdx !== -1 && optIdx < currentQuestion.options.length) {
          e.preventDefault();
          setSelectedOptionId(currentQuestion.options[optIdx].id);
          return;
        }

        if (e.key === 'Enter' && selectedOptionId) {
          e.preventDefault();
          handleConfirmAnswerRef.current();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentQuestion, selectedOptionId, isZenMode]);

  const handleHighlightSelection = (type: 'mark' | 'strike') => {
    const selection = window.getSelection()?.toString().trim();
    if (!selection || selection.length < 2) return;

    if (type === 'mark') {
      setHighlightedSnippets((prev) => Array.from(new Set([...prev, selection])));
    } else {
      setStrikethroughSnippets((prev) => Array.from(new Set([...prev, selection])));
    }
  };

  const handleClearHighlights = () => {
    setHighlightedSnippets([]);
    setStrikethroughSnippets([]);
  };

  const handleGenerateQuestion = () => {
    setIsGeneratingAI(true);
    setGeneratedQuestion(null);
    setAiSelectedOptionId(null);
    setAiIsAnswered(false);

    setTimeout(() => {
      setGeneratedQuestion(buildGeneratedAIQuestion(aiBanca, aiSubject));
      setIsGeneratingAI(false);
    }, 900);
  };

  const handleConfirmAIAnswer = () => {
    if (!aiSelectedOptionId || !generatedQuestion) return;

    setAiIsAnswered(true);
    const selectedOpt = generatedQuestion.options.find((o) => o.id === aiSelectedOptionId);
    const isCorrect = !!selectedOpt?.isCorrect;

    const attempt: QuestionAttempt = {
      id: `ai-attempt-${Date.now()}`,
      questionId: generatedQuestion.id,
      selectedOptionId: aiSelectedOptionId,
      isCorrect,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds: 30,
      diagnostic: {
        confidenceLevel: 'alta',
        feedback: isCorrect ? 'Acerto na questão gerada por IA' : 'Erro na questão inédita',
        actionableAdvice: generatedQuestion.cognitiveAnalysis.commonTrap,
        suggestedReviewTopic: generatedQuestion.topicName,
        flashcardFront: generatedQuestion.statement,
        flashcardBack: generatedQuestion.explanation,
      },
    };

    onRecordAttempt(attempt);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <HardPaywallGate
      moduleTitle="Simulador de Questões & Modo Foco"
      moduleSubtitle="Treine baterias comentadas no formato oficial da sua banca (Cebraspe, FGV, FCC, Vunesp), com explicação passo a passo por IA e modo foco sem distrações."
      features={[
        'Questões comentadas no estilo exato da sua banca',
        'Explicação automática dos erros pela IA',
        'Modo Foco Tela Cheia + atalhos rápidos',
        'Registro automático das questões erradas para revisão',
      ]}
      userPlan={userPlan}
      onOpenPricing={onOpenPricing}
      onSelectPlan={onSelectPlan}
      onGoHome={onGoHome}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 animate-fadeIn">
        {simulatorMode === 'full_mock' ? (
          <FullMockExamSimulator
            onAddFlashcardsBatch={onAddFlashcardsBatch}
            onGoBackToQuickQuiz={() => setSimulatorMode('quick')}
            userPlan={userPlan}
            onOpenPricing={onOpenPricing}
          />
        ) : simulatorMode === 'ai_generator' ? (
          <QuizAIGeneratorView
            aiBanca={aiBanca}
            setAiBanca={setAiBanca}
            aiSubject={aiSubject}
            setAiSubject={setAiSubject}
            aiDifficulty={aiDifficulty}
            setAiDifficulty={setAiDifficulty}
            isGeneratingAI={isGeneratingAI}
            generatedQuestion={generatedQuestion}
            aiSelectedOptionId={aiSelectedOptionId}
            setAiSelectedOptionId={setAiSelectedOptionId}
            aiIsAnswered={aiIsAnswered}
            onGenerateQuestion={handleGenerateQuestion}
            onConfirmAIAnswer={handleConfirmAIAnswer}
            onAddFlashcard={onAddFlashcard}
            onBackToQuickQuiz={() => setSimulatorMode('quick')}
          />
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Header Intuitivo da Arena de Combate */}
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

            {/* Unified Compact Controls: Modes + Filters in a Single High-Density Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-200 dark:border-white/10">
              <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs shadow-2xs gap-1">
                <button
                  onClick={() => setSimulatorMode('quick')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
                    simulatorMode === 'quick'
                      ? 'bg-blue-600 text-white shadow-xs shadow-blue-600/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Micro-Sessão Tática (10-15q)</span>
                </button>

                <button
                  onClick={() => setSimulatorMode('ai_generator')}
                  className="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 text-xs cursor-pointer text-blue-600 dark:text-cyan-400 hover:text-blue-700 hover:bg-slate-200/60 dark:hover:bg-white/5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Inéditas IA</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {exams.length > 0 && onSelectExam && (
                  <select
                    value={selectedExam?.id || ''}
                    onChange={(e) => {
                      const exam = exams.find((ex) => ex.id === e.target.value);
                      if (exam) onSelectExam(exam);
                      setCurrentIndex(0);
                      setIsAnswered(false);
                      setSelectedOptionId(null);
                    }}
                    className="w-full sm:w-auto max-w-full sm:max-w-xs truncate px-2.5 py-1.5 rounded-xl glass-input text-xs text-slate-800 dark:text-white font-medium cursor-pointer border border-slate-200 dark:border-white/10"
                  >
                    {exams.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.title}
                      </option>
                    ))}
                  </select>
                )}

                <select
                  value={selectedSubjectFilter}
                  onChange={(e) => {
                    setSelectedSubjectFilter(e.target.value);
                    setCurrentIndex(0);
                    setIsAnswered(false);
                    setSelectedOptionId(null);
                  }}
                  className="w-full sm:w-auto max-w-full sm:max-w-xs truncate px-2.5 py-1.5 rounded-xl glass-input text-xs text-slate-800 dark:text-white font-medium cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  <option value="todas">Todas as Disciplinas</option>
                  {selectedExam &&
                    selectedExam.subjects.map((sub) => (
                      <option key={sub.id} value={sub.name}>
                        ⭐ {sub.name} (Peso {sub.weight || 1})
                      </option>
                    ))}
                  {Array.from(new Set(questions.map((q) => q.subjectName)))
                    .filter((sName) => !selectedExam?.subjects.some((sub) => sub.name.toLowerCase() === sName.toLowerCase()))
                    .map((sName) => (
                      <option key={sName} value={sName}>
                        {sName}
                      </option>
                    ))}
                </select>

                {studentProfile?.weakSubject && (
                  <button
                    onClick={() => {
                      const targetSub = selectedSubjectFilter.toLowerCase().includes((studentProfile.weakSubject || '').toLowerCase())
                        ? 'todas'
                        : studentProfile.weakSubject || 'todas';
                      setSelectedSubjectFilter(targetSub);
                      setCurrentIndex(0);
                      setIsAnswered(false);
                      setSelectedOptionId(null);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all border cursor-pointer ${
                      selectedSubjectFilter.toLowerCase().includes((studentProfile.weakSubject || '').toLowerCase())
                        ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                        : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20 hover:bg-rose-100'
                    }`}
                    title="Filtrar disciplina do seu Calcanhar de Aquiles"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    <span>Foco: {studentProfile.weakSubject}</span>
                  </button>
                )}
              </div>
            </div>

            {currentQuestion ? (
              <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* COLUNA ESQUERDA: ARENA DE COMBATE & ENUNCIADO (60% - 7 COLS) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-2xs">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-500/30">
                          {currentQuestion.banca} • {currentQuestion.year}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-dark-card text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
                          {currentQuestion.subjectName}
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-white dark:bg-dark-card text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {currentQuestion.topicName}
                        </span>

                        <div className="flex items-center gap-1 ml-1 border-l border-slate-200 dark:border-white/10 pl-2">
                          <button
                            type="button"
                            onClick={() => handleHighlightSelection('mark')}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 dark:bg-dark-surface dark:hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 font-bold text-[11px] border border-slate-200 dark:border-white/10 flex items-center gap-1 transition-all"
                            title="Selecione o texto e clique para grifar"
                          >
                            <Highlighter className="w-3 h-3 text-amber-500" />
                            <span className="hidden sm:inline">Grifar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleHighlightSelection('strike')}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-rose-100 dark:bg-dark-surface dark:hover:bg-rose-500/20 text-slate-700 dark:text-slate-300 font-bold text-[11px] border border-slate-200 dark:border-white/10 flex items-center gap-1 transition-all"
                            title="Selecione o texto e clique para riscar trecho"
                          >
                            <Scissors className="w-3 h-3 text-rose-500" />
                            <span className="hidden sm:inline">Riscar</span>
                          </button>
                          {(highlightedSnippets.length > 0 || strikethroughSnippets.length > 0) && (
                            <button
                              type="button"
                              onClick={handleClearHighlights}
                              className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline ml-1"
                            >
                              Limpar
                            </button>
                          )}

                          <div className="flex items-center gap-0.5 ml-1 border-l border-slate-200 dark:border-white/10 pl-1.5" title="Ajustar tamanho da fonte">
                            <button
                              type="button"
                              onClick={() => {
                                const levels: Array<'sm' | 'base' | 'lg' | 'xl'> = ['sm', 'base', 'lg', 'xl'];
                                const currentIdx = levels.indexOf(fontSizeLevel);
                                if (currentIdx > 0) setFontSizeLevel(levels[currentIdx - 1]);
                              }}
                              disabled={fontSizeLevel === 'sm'}
                              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-black text-slate-600 dark:text-slate-300 disabled:opacity-30 border border-slate-200 dark:border-white/10"
                              title="Diminuir fonte (A-)"
                            >
                              A-
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const levels: Array<'sm' | 'base' | 'lg' | 'xl'> = ['sm', 'base', 'lg', 'xl'];
                                const currentIdx = levels.indexOf(fontSizeLevel);
                                if (currentIdx < levels.length - 1) setFontSizeLevel(levels[currentIdx + 1]);
                              }}
                              disabled={fontSizeLevel === 'xl'}
                              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-dark-surface hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-black text-slate-600 dark:text-slate-300 disabled:opacity-30 border border-slate-200 dark:border-white/10"
                              title="Aumentar fonte (A+)"
                            >
                              A+
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-mono font-bold bg-white dark:bg-dark-surface px-2.5 py-1 rounded-xl border border-slate-200 dark:border-white/5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{formatTimer(timeSpentSeconds)}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsZenMode(true)}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
                          title="Modo Foco Zen (Atalho: F)"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Foco [F]</span>
                        </button>

                        {filteredQuestions.length > 0 && (currentIndex + 1) / filteredQuestions.length >= 0.75 && (
                          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] animate-pulse">
                            ⚡ Falta pouco!
                          </span>
                        )}

                        <span className="text-slate-500 dark:text-slate-400 font-semibold text-xs">
                          {currentIndex + 1}/{filteredQuestions.length}
                        </span>
                      </div>
                    </div>

                    {/* Statement Box */}
                    <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-slate-300 dark:border-white/10 space-y-3 relative shadow-sm">
                      {currentQuestion.codeCitation && (
                        <div className="text-[11px] font-mono text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
                          <span>Artigo / Referência:</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
                            {currentQuestion.codeCitation}
                          </span>
                        </div>
                      )}

                      <div className={`${FONT_CLASSES[fontSizeLevel].statement} text-slate-800 dark:text-slate-100 font-normal leading-relaxed whitespace-pre-line select-text`}>
                        {currentQuestion.statement.split(/(\s+)/).map((word, idx) => {
                          const clean = word.replace(/[.,;?!:()]/g, '');
                          const isMarked = clean.length > 1 && highlightedSnippets.some((s) => s.toLowerCase().includes(clean.toLowerCase()));
                          const isStriked = clean.length > 1 && strikethroughSnippets.some((s) => s.toLowerCase().includes(clean.toLowerCase()));

                          if (isStriked) {
                            return (
                              <span key={idx} className="line-through decoration-rose-500 decoration-2 text-rose-500/80 font-medium">
                                {word}
                              </span>
                            );
                          }
                          if (isMarked) {
                            return (
                              <mark key={idx} className="bg-amber-200 dark:bg-yellow-400/30 text-slate-900 dark:text-yellow-200 px-0.5 rounded font-medium border-b-2 border-amber-400">
                                {word}
                              </mark>
                            );
                          }
                          return <React.Fragment key={idx}>{word}</React.Fragment>;
                        })}
                      </div>

                      <div className="mt-8 space-y-3">
                        {currentQuestion.options.map((option, idx) => {
                          const isSelected = selectedOptionId === option.id;
                          const isEliminated = eliminatedOptionIds.includes(option.id);
                          const letter = String.fromCharCode(65 + idx);
                          let optionStyle =
                            'bg-white dark:bg-dark-surface/80 border-slate-200 dark:border-white/5 hover:border-indigo-400 dark:hover:border-indigo-500/50 text-slate-700 dark:text-slate-200 shadow-sm';

                          if (isEliminated && !isAnswered) {
                            optionStyle =
                              'opacity-40 bg-slate-100/70 dark:bg-slate-900/40 border-dashed border-rose-300 dark:border-rose-900/50 text-slate-400 select-none';
                          } else if (isSelected && !isAnswered) {
                            optionStyle =
                              'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-indigo-900 dark:text-white ring-2 ring-indigo-500/30 shadow-md';
                          } else if (isAnswered) {
                            if (option.isCorrect) {
                              optionStyle =
                                'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30 font-bold';
                            } else if (isSelected && !option.isCorrect) {
                              optionStyle =
                                'bg-rose-50 dark:bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/30';
                            } else {
                              optionStyle = 'opacity-40 bg-white dark:bg-dark-surface/40 border-transparent text-slate-400';
                            }
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
                              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 group ${optionStyle}`}
                            >
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 transition-all ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:border-indigo-400'
                                }`}
                              >
                                <span>{letter}</span>
                              </div>
                              <span className={`${FONT_CLASSES[fontSizeLevel].option} leading-relaxed flex-1 pt-1 ${isEliminated ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                                {option.text}
                              </span>

                              {!isAnswered && (
                                <button
                                  type="button"
                                  onClick={(e) => toggleEliminateOption(option.id, e)}
                                  className={`p-1.5 rounded-lg border transition-all text-xs flex items-center justify-center shrink-0 ${
                                    isEliminated
                                      ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                                      : 'opacity-30 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                                  }`}
                                  title={isEliminated ? 'Restaurar alternativa eliminada' : 'Riscar alternativa (Eliminar opção)'}
                                  aria-label={isEliminated ? 'Restaurar alternativa' : 'Riscar alternativa'}
                                >
                                  <Scissors className="w-3.5 h-3.5" />
                                </button>
                              )}

                              <kbd className="hidden sm:inline px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700">
                                {letter}
                              </kbd>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-300 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {!isAnswered ? (
                          <>
                            <div>
                              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                                Grau de Convicção (Calibragem da IA):
                              </label>
                              <div className="flex flex-wrap items-center gap-2">
                                {[
                                  { id: 'alta', label: 'Alta Convicção' },
                                  { id: 'media', label: 'Dúvida Parcial' },
                                  { id: 'chute', label: 'Palpite / Intuição' },
                                ].map((c) => (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => setConfidence(c.id as any)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                                      confidence === c.id
                                        ? 'bg-indigo-100 dark:bg-indigo-600/30 border border-indigo-400 dark:border-indigo-500 text-indigo-700 dark:text-indigo-300'
                                        : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700'
                                    }`}
                                  >
                                    {c.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={handleConfirmAnswer}
                              disabled={!selectedOptionId}
                              className={`min-h-[48px] w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                                selectedOptionId
                                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-600/25 active:scale-95'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Confirmar Resposta</span>
                              <kbd className={`hidden sm:inline px-1.5 py-0.5 rounded text-[10px] font-mono ${selectedOptionId ? 'bg-black/30 text-white/90' : 'bg-slate-200 text-slate-600 dark:bg-black/30 dark:text-white/90'}`}>
                                Enter ↵
                              </kbd>
                            </button>
                          </>
                        ) : (
                          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              Resposta registrada. Fundamentação e análise abaixo.
                            </span>
                            <button
                              onClick={handleNext}
                              className="min-h-[48px] w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
                            >
                              <span>Próxima Questão</span>
                              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/30 text-[10px] text-white font-mono">
                                → ou Enter
                              </kbd>
                            </button>
                          </div>
                        )}
                      </div>

                      {isAnswered && (
                        <QuizExplanationPanel
                          currentQuestion={currentQuestion}
                          selectedOptionId={selectedOptionId}
                          zenFlashcardSaved={zenFlashcardSaved}
                          setZenFlashcardSaved={setZenFlashcardSaved}
                          onAddFlashcard={onAddFlashcard}
                        />
                      )}
                    </div>
                  </div>

                  {/* COLUNA DIREITA: STATS, COGNITIVE COPILOT & VADE MECUM (40% - 5 COLS) */}
                  <QuizPsychometricSidebar
                    currentQuestion={currentQuestion}
                    isAnswered={isAnswered}
                    personalNotes={personalNotes}
                    setPersonalNotes={setPersonalNotes}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 dark:text-slate-400">
                Nenhuma questão encontrada para este filtro.
              </div>
            )}

            {/* OVERLAY DO MODO FOCO TOTAL (ZEN MODE) */}
            {isZenMode && currentQuestion && (
              <QuizZenModeOverlay
                currentQuestion={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={filteredQuestions.length}
                timeSpentSeconds={timeSpentSeconds}
                selectedOptionId={selectedOptionId}
                setSelectedOptionId={setSelectedOptionId}
                isAnswered={isAnswered}
                zenFlashcardSaved={zenFlashcardSaved}
                setZenFlashcardSaved={setZenFlashcardSaved}
                onCloseZenMode={() => setIsZenMode(false)}
                onConfirmAnswer={handleConfirmAnswer}
                onNext={handleNext}
                onAddFlashcard={onAddFlashcard}
                formatTimer={formatTimer}
              />
            )}
          </div>
        )}
      </div>
    </HardPaywallGate>
  );
};
