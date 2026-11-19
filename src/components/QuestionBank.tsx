'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  BrainCircuit,
  Award,
  Check,
  Volume2,
  VolumeX,
  Zap,
  ShieldAlert,
  Gauge,
  Activity,
  Lightbulb,
  Info,
  ShieldCheck,
  Download,
  FileText,
  Target
} from 'lucide-react';
import { Question, QuestionAttempt, Flashcard, QuestionBankFilter, PsychometricDistractorType, StudentProfile, SubscriptionPlan } from '@/lib/types';
import { MOCK_QUESTIONS, MASCOTS_DATA } from '@/lib/mockData';
import { PSYCHOMETRIC_DISTRACTORS, BANCA_PSYCHOMETRIC_PROFILES } from '@/lib/psychometricsData';
import { HardPaywallGate } from './HardPaywallGate';
import { QuestionBankCard } from './question-bank/QuestionBankCard';

interface QuestionBankProps {
  onAddFlashcard: (flashcard: Flashcard) => void;
  onRecordAttempt: (attempt: QuestionAttempt) => void;
  onGoToSimulator?: () => void;
  onGoToMistakes?: () => void;
  studentProfile?: StudentProfile;
  userPlan?: SubscriptionPlan;
  onOpenPricing?: () => void;
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  onGoHome?: () => void;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({
  onAddFlashcard,
  onRecordAttempt,
  onGoToSimulator,
  onGoToMistakes,
  studentProfile,
  userPlan = 'aspirante',
  onOpenPricing,
  onSelectPlan,
  onGoHome
}) => {
  const [selectedExamPack, setSelectedExamPack] = useState<string>('todos');
  const [filter, setFilter] = useState<QuestionBankFilter>(() => ({
    searchQuery: '',
    banca: 'todas',
    subject: 'todas',
    topic: 'todos',
    year: 'todos',
    difficulty: 'todas',
    status: 'todas'
  }));

  // Respostas locais para o banco
  const [userAnswers, setUserAnswers] = useState<Record<string, { selectedOptionId: string; isCorrect: boolean; confirmed: boolean }>>({});
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [showTriDetails, setShowTriDetails] = useState<Record<string, boolean>>({});
  const [activeAudioTarget, setActiveAudioTarget] = useState<string | null>(null);
  const [questionsList, setQuestionsList] = useState<Question[]>(MOCK_QUESTIONS);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Carrega questões do banco de dados PostgreSQL do Supabase (com fallback)
  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data?.questions) && data.questions.length > 0) {
          setQuestionsList(data.questions);
        }
      })
      .catch(() => {});
  }, []);
  const itemsPerPage = 5;

  // Cleanup de áudio
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleAudio = (targetId: string, textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (activeAudioTarget === targetId) {
      window.speechSynthesis.cancel();
      setActiveAudioTarget(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = textToSpeak
      .replace(/[#*`_~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => setActiveAudioTarget(null);
    utterance.onerror = () => setActiveAudioTarget(null);

    setActiveAudioTarget(targetId);
    window.speechSynthesis.speak(utterance);
  };

  // Extrair listas únicas para os seletores de filtros
  const availableBancas = useMemo(() => {
    const set = new Set(questionsList.map(q => q.banca));
    return ['todas', ...Array.from(set)];
  }, [questionsList]);

  const availableSubjects = useMemo(() => {
    const set = new Set(questionsList.map(q => q.subjectName));
    return ['todas', ...Array.from(set)];
  }, [questionsList]);

  const availableYears = useMemo(() => {
    const set = new Set(questionsList.map(q => q.year.toString()));
    return ['todos', ...Array.from(set).sort((a, b) => Number(b) - Number(a))];
  }, [questionsList]);

  const handleDownloadBooklet = () => {
    const listToExport = filteredQuestions.slice(0, 60);
    const header = `====================================================================\nARGUS AI — CADERNO DE QUESTÕES OFICIAIS COMENTADAS\nTotal exportado: ${listToExport.length} questões auditadas\nData: ${new Date().toLocaleDateString('pt-BR')}\n====================================================================\n\n`;
    const body = listToExport
      .map((q, idx) => {
        const opts = q.options
          .map((o, i) => `  (${String.fromCharCode(65 + i)}) ${o.text}`)
          .join('\n');
        const correctIdx = q.options.findIndex((o) => o.isCorrect);
        const correctLetter = String.fromCharCode(65 + Math.max(0, correctIdx));
        return `QUESTÃO ${idx + 1} [${q.banca} • ${q.year} • ${q.institution || q.subjectName}]\nDisciplina: ${q.subjectName} — ${q.topicName}\n\n${q.statement}\n\n${opts}\n\n✔ GABARITO OFICIAL: ${correctLetter}\n💡 COMENTÁRIO & FUNDAMENTAÇÃO: ${q.explanation}\n⚠️ PEGADINHA DA BANCA: ${q.cognitiveAnalysis?.commonTrap || ''}\n--------------------------------------------------------------------\n`;
      })
      .join('\n');

    try {
      const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Caderno_Questoes_Argus_${filter.banca !== 'todas' ? filter.banca : 'Completo'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {}
  };

  // Filtragem dinâmica das questões
  const filteredQuestions = useMemo(() => {
    return questionsList.filter(q => {
      // Busca textual
      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase();
        const matchesStatement = q.statement.toLowerCase().includes(query);
        const matchesSubject = q.subjectName.toLowerCase().includes(query);
        const matchesTopic = q.topicName.toLowerCase().includes(query);
        const matchesLaw = q.lawArticles?.some(l => l.toLowerCase().includes(query));
        if (!matchesStatement && !matchesSubject && !matchesTopic && !matchesLaw) {
          return false;
        }
      }

      // Filtro de Banca
      if (filter.banca !== 'todas' && q.banca !== filter.banca) {
        return false;
      }

      // Filtro de Disciplina
      if (filter.subject !== 'todas' && q.subjectName !== filter.subject) {
        return false;
      }

      // Filtro de Dificuldade
      if (filter.difficulty !== 'todas' && q.difficulty !== filter.difficulty) {
        return false;
      }

      // Filtro de Ano
      if (filter.year !== 'todos' && q.year.toString() !== filter.year) {
        return false;
      }

      // Filtro de Status
      if (filter.status !== 'todas') {
        const ans = userAnswers[q.id];
        if (filter.status === 'nao_resolvidas' && ans?.confirmed) return false;
        if (filter.status === 'acertos' && (!ans?.confirmed || !ans.isCorrect)) return false;
        if (filter.status === 'erros' && (!ans?.confirmed || ans.isCorrect)) return false;
      }

      return true;
    });
  }, [filter, userAnswers, questionsList]);

  // Paginação
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / itemsPerPage));
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(start, start + itemsPerPage);
  }, [filteredQuestions, currentPage]);

  // Estatísticas de resolução
  const stats = useMemo(() => {
    const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k].confirmed).length;
    const correctCount = Object.values(userAnswers).filter(a => a.confirmed && a.isCorrect).length;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    return {
      totalQuestions: questionsList.length,
      filteredCount: filteredQuestions.length,
      answeredCount,
      correctCount,
      wrongCount: answeredCount - correctCount,
      accuracy
    };
  }, [userAnswers, filteredQuestions, questionsList.length]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (userAnswers[questionId]?.confirmed) return; // já confirmou
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: {
        selectedOptionId: optionId,
        isCorrect: false,
        confirmed: false
      }
    }));
  };

  const handleConfirmAnswer = (question: Question) => {
    const ans = userAnswers[question.id];
    if (!ans || !ans.selectedOptionId) return;

    const selectedOption = question.options.find(o => o.id === ans.selectedOptionId);
    const isCorrect = !!selectedOption?.isCorrect;

    setUserAnswers(prev => ({
      ...prev,
      [question.id]: {
        selectedOptionId: ans.selectedOptionId,
        isCorrect,
        confirmed: true
      }
    }));

    setExpandedDetails(prev => ({
      ...prev,
      [question.id]: true
    }));

    // Notificar pai para métricas e caderno de erros
    onRecordAttempt({
      id: `attempt-${Date.now()}`,
      questionId: question.id,
      selectedOptionId: ans.selectedOptionId,
      isCorrect,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds: 45,
      diagnostic: {
        errorType: isCorrect ? undefined : 'pegadinha_banca',
        confidenceLevel: 'alta',
        feedback: isCorrect ? 'Excelente! Resposta correta com fundamentação.' : question.explanation,
        actionableAdvice: question.cognitiveAnalysis.commonTrap,
        suggestedReviewTopic: question.topicName,
        flashcardFront: question.statement,
        flashcardBack: question.explanation
      }
    });
  };

  const handleCreateFlashcardFromQuestion = (question: Question) => {
    const correctOpt = question.options.find(o => o.isCorrect);
    const flashcard: Flashcard = {
      id: `fc-qb-${Date.now()}`,
      subjectName: question.subjectName,
      topicName: question.topicName,
      front: `${question.statement.slice(0, 180)}... (${question.banca} / ${question.year})`,
      back: `Gabarito: ${correctOpt?.text}\n\nFundamentação: ${question.explanation}\n\nPegadinha da Banca: ${question.cognitiveAnalysis.commonTrap}`,
      errorOriginQuestionId: question.id,
      nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      intervalDays: 1,
      repetitions: 0,
      easeFactor: 2.5
    };
    onAddFlashcard(flashcard);
  };

  const handleResetFilter = () => {
    setFilter({
      searchQuery: '',
      banca: 'todas',
      subject: 'todas',
      topic: 'todos',
      year: 'todos',
      difficulty: 'todas',
      status: 'todas'
    });
    setCurrentPage(1);
  };

  return (
    <HardPaywallGate
      moduleTitle="Banco de Questões Comentadas & Últimas Provas"
      moduleSubtitle="Resolva e baixe cadernos das últimas provas famosas (PF, PRF, INSS, TRT, OAB, TJ-SP, CNU) com comentários por IA e filtros por banca."
      features={[
        'Cadernos das últimas provas oficiais (50+ questões por banca)',
        'Download de cadernos comentados em arquivo',
        'Filtros por banca, matéria, ano e dificuldade',
        'Explicação em áudio e vínculo automático com Meus Erros',
      ]}
      userPlan={userPlan}
      onOpenPricing={onOpenPricing}
      onSelectPlan={onSelectPlan}
      onGoHome={onGoHome}
    >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-fadeIn">
      
      {/* Header com Apresentação */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              Módulo de Treinamento
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {stats.filteredCount} {stats.filteredCount === 1 ? 'questão disponível' : 'questões disponíveis'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5">
            Banco de Questões Inteligente
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Pratique com questões reais comentadas das principais bancas, com diagnóstico imediato de pegadinhas, fundamentação em lei e integração automática com o Caderno de Erros.
          </p>
        </div>

        {/* Resumo de Desempenho Rápido */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl glass-panel bg-white/70 dark:bg-dark-card/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Taxa de Acerto</p>
              <p className="text-base font-black text-slate-900 dark:text-white">{stats.accuracy}%</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl glass-panel bg-white/70 dark:bg-dark-card/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Resolvidas</p>
              <p className="text-base font-black text-slate-900 dark:text-white">{stats.answeredCount} / {stats.totalQuestions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vitrine das Últimas Provas Oficiais dos Concursos Mais Famosos */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/85 dark:bg-dark-card/70 backdrop-blur-md border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Cadernos de Últimas Provas Oficiais (Concursos Mais Famosos)
            </h2>
          </div>

          <button
            type="button"
            onClick={handleDownloadBooklet}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-sm shadow-indigo-600/20 transition-all cursor-pointer active:scale-95"
            title="Baixar caderno com as questões filtradas comentadas"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Caderno de Prova ({stats.filteredCount}q)</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { id: 'todos', label: 'Acervo Completo', sub: 'Todas as 5 Bancas', banca: 'todas', query: '' },
            { id: 'pf_prf', label: 'PF & PRF 2024/25', sub: 'Cebraspe • 52q', banca: 'Cebraspe', query: '' },
            { id: 'inss', label: 'INSS Seguro Social', sub: 'Cebraspe • 52q', banca: 'Cebraspe', query: '' },
            { id: 'oab_fgv', label: 'OAB & Receita', sub: 'FGV • 52q', banca: 'FGV', query: '' },
            { id: 'trt_fcc', label: 'TRTs & Tribunais', sub: 'FCC • 52q', banca: 'FCC', query: '' },
            { id: 'tjsp_vunesp', label: 'TJ-SP & PC-SP', sub: 'Vunesp • 52q', banca: 'Vunesp', query: '' },
            { id: 'cnu_cesgranrio', label: 'CNU, Caixa & BB', sub: 'Cesgranrio • 52q', banca: 'Cesgranrio', query: '' },
          ].map((pack) => {
            const isPackActive = selectedExamPack === pack.id;
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => {
                  setSelectedExamPack(pack.id);
                  setFilter((prev) => ({
                    ...prev,
                    banca: pack.banca as any,
                    searchQuery: pack.query,
                    subject: 'todas',
                  }));
                  setCurrentPage(1);
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                  isPackActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 dark:bg-dark-surface hover:bg-indigo-50/60 dark:hover:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className={`text-xs font-black leading-tight ${isPackActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {pack.label}
                </span>
                <span className={`text-[10px] font-mono font-bold ${isPackActive ? 'text-indigo-100' : 'text-indigo-600 dark:text-cyan-400'}`}>
                  {pack.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Banner de Calibração Pessoal do Aluno */}
      {studentProfile && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 flex flex-wrap items-center justify-between gap-3 text-xs backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-slate-900 dark:text-white">
                Filtros Calibrados para {studentProfile.warName || studentProfile.name}
              </span>
              <span className="text-slate-600 dark:text-slate-400 ml-2">
                • Alvo: <strong className="text-blue-600 dark:text-blue-400">{studentProfile.targetExamTitle}</strong> ({studentProfile.targetBanca || 'Geral'})
              </span>
            </div>
          </div>

          {studentProfile.weakSubject && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setFilter(prev => ({
                    ...prev,
                    searchQuery: prev.searchQuery === studentProfile.weakSubject ? '' : studentProfile.weakSubject || ''
                  }));
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                  filter.searchQuery === studentProfile.weakSubject
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md shadow-rose-600/30'
                    : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Isolar Calcanhar de Aquiles: {studentProfile.weakSubject}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Barra de Busca e Filtros Multicritério */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel bg-white/70 dark:bg-dark-card/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
        
        {/* Campo de Busca Livre */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquise por termo no enunciado, artigo de lei, pegadinha ou tema (ex: 'dano moral', 'art. 37', 'improbidade')..."
            value={filter.searchQuery}
            onChange={(e) => {
              setFilter(prev => ({ ...prev, searchQuery: e.target.value }));
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        {/* Dropdowns de Filtro */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          
          {/* Banca */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Banca
            </label>
            <select
              value={filter.banca}
              onChange={(e) => {
                setFilter(prev => ({ ...prev, banca: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="todas">Todas as Bancas</option>
              {availableBancas.filter(b => b !== 'todas').map(banca => (
                <option key={banca} value={banca}>{banca}</option>
              ))}
            </select>
          </div>

          {/* Disciplina */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Disciplina
            </label>
            <select
              value={filter.subject}
              onChange={(e) => {
                setFilter(prev => ({ ...prev, subject: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="todas">Todas as Matérias</option>
              {availableSubjects.filter(s => s !== 'todas').map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>

          {/* Dificuldade */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Dificuldade
            </label>
            <select
              value={filter.difficulty}
              onChange={(e) => {
                setFilter(prev => ({ ...prev, difficulty: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="todas">Todas</option>
              <option value="Fácil">Fácil</option>
              <option value="Média">Média</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>

          {/* Ano */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Ano
            </label>
            <select
              value={filter.year}
              onChange={(e) => {
                setFilter(prev => ({ ...prev, year: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="todos">Todos os Anos</option>
              {availableYears.filter(y => y !== 'todos').map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Status
            </label>
            <select
              value={filter.status}
              onChange={(e) => {
                setFilter(prev => ({ ...prev, status: e.target.value as any }));
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white font-medium focus:outline-none"
            >
              <option value="todas">Todas</option>
              <option value="nao_resolvidas">Não Resolvidas</option>
              <option value="acertos">Acertos</option>
              <option value="erros">Erros</option>
            </select>
          </div>

          {/* Botão Limpar Filtros */}
          <div className="flex items-end">
            <button
              onClick={handleResetFilter}
              className="w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-dark-surface hover:dark:bg-dark-hover text-slate-600 dark:text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200 dark:border-white/5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>

        </div>

      </div>

      {/* Lista de Questões */}
      <div className="space-y-5">
        {paginatedQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl glass-panel bg-white/70 dark:bg-dark-card/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Nenhuma questão encontrada</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Tente alterar os termos da busca ou redefinir os filtros de banca e disciplina.
            </p>
            <button
              onClick={handleResetFilter}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
            >
              Redefinir Filtros
            </button>
          </div>
        ) : (
          paginatedQuestions.map((q, qIndex) => (
            <QuestionBankCard
              key={q.id}
              question={q}
              displayNumber={(currentPage - 1) * itemsPerPage + qIndex + 1}
              answerState={userAnswers[q.id]}
              isDetailsOpen={!!expandedDetails[q.id]}
              isTriOpen={!!showTriDetails[q.id]}
              activeAudioTarget={activeAudioTarget}
              onToggleAudio={handleToggleAudio}
              onSelectOption={handleSelectOption}
              onConfirmAnswer={handleConfirmAnswer}
              onToggleDetails={(id) =>
                setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }))
              }
              onToggleTriDetails={(id) =>
                setShowTriDetails((prev) => ({ ...prev, [id]: !prev[id] }))
              }
              onCreateFlashcard={handleCreateFlashcardFromQuestion}
            />
          ))
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-sm text-xs font-bold">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-dark-surface dark:hover:bg-dark-hover disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 dark:border-white/5 transition-all text-slate-700 dark:text-slate-300"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <span className="text-slate-500 dark:text-slate-400">
            Página <strong className="text-slate-900 dark:text-white">{currentPage}</strong> de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-dark-surface dark:hover:bg-dark-hover disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 dark:border-white/5 transition-all text-slate-700 dark:text-slate-300"
          >
            <span>Próxima</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
    </HardPaywallGate>
  );
};
