'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookMarked, 
  Search, 
  Filter, 
  Sparkles, 
  Flame, 
  AlertCircle, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Layers, 
  ChevronRight,
  BookOpen,
  ArrowRight,
  Volume2,
  VolumeX,
  Swords,
  Trophy,
  RotateCcw,
  Zap,
  Check,
  X,
  Crosshair,
  Star
} from 'lucide-react';
import { VadeMecumArticle, ExamNotice, StudentProfile, SubscriptionPlan, MistakeEntry } from '@/lib/types';
import { INITIAL_VADE_MECUM } from '@/lib/mockData';
import { HardPaywallGate } from './HardPaywallGate';
import {
  TRAP_CHALLENGES,
  getMissedQuestionsForArticle,
  isCorrectWord,
  ArticleMissedQuestion,
} from './vade-mecum/vadeMecumData';
import { VadeMecumBacklinkDrawer } from './vade-mecum/VadeMecumBacklinkDrawer';

export type { ArticleMissedQuestion };

interface SmartVadeMecumProps {
  onGoToQuestion?: (questionId: string) => void;
  onGoToSimulator: (queryOrTopic?: string) => void;
  selectedExam?: ExamNotice;
  studentProfile?: StudentProfile;
  mistakes?: MistakeEntry[];
  userPlan?: SubscriptionPlan;
  onOpenPricing?: () => void;
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  onGoHome?: () => void;
}

export const SmartVadeMecum: React.FC<SmartVadeMecumProps> = ({
  onGoToQuestion,
  onGoToSimulator,
  selectedExam,
  studentProfile,
  mistakes = [],
  userPlan = 'aspirante',
  onOpenPricing,
  onSelectPlan,
  onGoHome
}) => {
  const [articles] = useState<VadeMecumArticle[]>(INITIAL_VADE_MECUM);
  const [selectedDiploma, setSelectedDiploma] = useState<string>('all');
  const [selectedIncidence, setSelectedIncidence] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterOnlyActiveExam, setFilterOnlyActiveExam] = useState<boolean>(false);

  // Helper para verificar se um artigo faz parte do escopo do concurso/OAB ativo
  const isArticleInActiveExam = (art: VadeMecumArticle): boolean => {
    if (!selectedExam) return false;
    const examLower = (selectedExam.title + ' ' + selectedExam.institution + ' ' + selectedExam.role).toLowerCase();
    const artText = (art.diploma + ' ' + art.title + ' ' + art.tags.join(' ')).toLowerCase();

    if (examLower.includes('oab') || examLower.includes('advoga')) {
      if (artText.includes('oab') || artText.includes('ética') || artText.includes('8.906') || artText.includes('jurídica')) return true;
    }
    if (examLower.includes('polic') || examLower.includes('prf') || examLower.includes('pf')) {
      if (artText.includes('policial') || artText.includes('penal') || artText.includes('8.112') || art.diploma.includes('CP')) return true;
    }
    if (examLower.includes('inss') || examLower.includes('previd')) {
      if (artText.includes('previd') || artText.includes('8.213') || artText.includes('8.112') || art.diploma.includes('8.213')) return true;
    }
    if (examLower.includes('fiscal') || examLower.includes('receita')) {
      if (artText.includes('tributár') || artText.includes('fiscal') || artText.includes('ctn') || artText.includes('8.112')) return true;
    }
    if (examLower.includes('tribunal') || examLower.includes('tj') || examLower.includes('trt') || examLower.includes('trf')) {
      if (artText.includes('tribuna') || artText.includes('cpc') || artText.includes('processual') || artText.includes('8.429') || artText.includes('8.112')) return true;
    }

    if (selectedExam.subjects) {
      for (const sub of selectedExam.subjects) {
        if (art.tags.some(t => sub.name.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(sub.name.toLowerCase()))) {
          return true;
        }
        if (sub.topics) {
          for (const top of sub.topics) {
            if (top.articlesOrLaws && top.articlesOrLaws.some(law => artText.includes(law.toLowerCase()) || law.toLowerCase().includes(art.numberStr.toLowerCase()))) {
              return true;
            }
          }
        }
      }
    }

    return false;
  };

  // Audio Speech state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Backlinks Bidirecionais Drawer State (Obsidian / Notion style)
  const [selectedBacklinkArticle, setSelectedBacklinkArticle] = useState<VadeMecumArticle | null>(null);

  // Gamification Trap Hunter Mode
  const [isTrapModeActive, setIsTrapModeActive] = useState<boolean>(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userSelectedWord, setUserSelectedWord] = useState<string | null>(null);
  const [challengeResult, setChallengeResult] = useState<'correct' | 'wrong' | null>(null);
  const [trapStreak, setTrapStreak] = useState<number>(0);
  const [trapScore, setTrapScore] = useState<number>(0);

  // Stop audio if component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const currentChallenge = TRAP_CHALLENGES[currentChallengeIndex];

  // Diplomas available
  const diplomas = [
    { id: 'all', name: 'Todos os Diplomas' },
    { id: 'CF/88', name: 'CF/88' },
    { id: 'Lei 8.112/90', name: 'Lei 8.112/90 (Servidores)' },
    { id: 'Lei 14.230/21 (LIA)', name: 'Lei 14.230/21 (Improbidade)' },
    { id: 'Lei 14.133/21 (Licitações)', name: 'Lei 14.133/21 (Licitações)' },
    { id: 'Lei 8.213/91 (Previdência)', name: 'Lei 8.213/91 (Previdência)' }
  ];

  // Filtering
  const filteredArticles = articles.filter(art => {
    if (filterOnlyActiveExam && !isArticleInActiveExam(art)) return false;
    if (selectedDiploma !== 'all' && art.diploma !== selectedDiploma) return false;
    if (selectedIncidence !== 'all' && art.incidence !== selectedIncidence) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = art.text.toLowerCase().includes(q);
      const matchNum = art.numberStr.toLowerCase().includes(q);
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchTags = art.tags.some(t => t.toLowerCase().includes(q));
      if (!matchText && !matchNum && !matchTitle && !matchTags) return false;
    }
    return true;
  });

  const handleCopyText = (art: VadeMecumArticle) => {
    navigator.clipboard.writeText(`${art.diploma} - ${art.numberStr}: ${art.text}`);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Web Speech API Native Audio Reader
  const handleToggleAudio = (art: VadeMecumArticle) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Seu navegador não possui suporte para síntese de voz nativa.');
      return;
    }

    if (playingAudioId === art.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${art.diploma}, ${art.numberStr}. ${art.title}. ${art.text}. Dica da banca: ${art.bancaTrapNote}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => setPlayingAudioId(null);
    utterance.onerror = () => setPlayingAudioId(null);

    setPlayingAudioId(art.id);
    window.speechSynthesis.speak(utterance);
  };

  // Helper to highlight trap keywords in the text (safe string matching without dynamic RegExp)
  const renderHighlightedText = (text: string, keywords: string[]) => {
    if (!text) return '';
    const validKeywords = (keywords || [])
      .filter((k) => typeof k === 'string' && k.trim().length > 0)
      .sort((a, b) => b.length - a.length);
    if (validKeywords.length === 0) return text;

    const lowerText = text.toLowerCase();
    const lowerKeywords = validKeywords.map((k) => k.toLowerCase());
    const nodes: React.ReactNode[] = [];
    let cursor = 0;

    while (cursor < text.length) {
      let bestIdx = -1;
      let bestLen = 0;

      for (const kw of lowerKeywords) {
        const idx = lowerText.indexOf(kw, cursor);
        if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
          bestIdx = idx;
          bestLen = kw.length;
        }
      }

      if (bestIdx === -1 || bestLen === 0) {
        nodes.push(text.slice(cursor));
        break;
      }

      if (bestIdx > cursor) {
        nodes.push(text.slice(cursor, bestIdx));
      }

      const matchedPart = text.slice(bestIdx, bestIdx + bestLen);
      nodes.push(
        <mark
          key={`${bestIdx}-${bestLen}`}
          className="bg-amber-100 dark:bg-amber-400/25 text-amber-800 dark:text-amber-300 font-bold px-1 py-0.5 rounded border-b-2 border-amber-400 inline-block"
          title="Palavra com altíssimo índice de adulteração pelas bancas!"
        >
          {matchedPart}
        </mark>
      );
      cursor = bestIdx + bestLen;
    }

    return nodes;
  };

  // Trap Hunter Interactive Word Click
  const handleWordClickInChallenge = (cleanWord: string) => {
    if (challengeResult !== null) return;

    setUserSelectedWord(cleanWord);
    const targetWord = currentChallenge.trapWord.toUpperCase();
    const isCorrect = cleanWord.toUpperCase() === targetWord;

    if (isCorrect) {
      setChallengeResult('correct');
      setTrapStreak(prev => prev + 1);
      setTrapScore(prev => prev + 25);
    } else {
      setChallengeResult('wrong');
      setTrapStreak(0);
    }
  };

  const handleNextChallenge = () => {
    setUserSelectedWord(null);
    setChallengeResult(null);
    setCurrentChallengeIndex((prev) => (prev + 1) % TRAP_CHALLENGES.length);
  };

  return (
    <HardPaywallGate
      moduleTitle="Leis & Artigos Mais Cobrados"
      moduleSubtitle="Acesse a lei seca com marcações do que realmente cai na prova, alertas de alterações pelas bancas e leitura em áudio."
      features={[
        'Artigos de lei seca com maior índice de cobrança',
        'Comparação direta entre texto legal e pegadinha de prova',
        'Conexão automática com questões reais da banca',
        'Narração em áudio para estudar em qualquer lugar',
      ]}
      userPlan={userPlan}
      onOpenPricing={onOpenPricing}
      onSelectPlan={onSelectPlan}
      onGoHome={onGoHome}
    >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-white dark:bg-transparent dark:bg-gradient-to-r dark:from-amber-950/30 dark:via-dark-surface dark:to-indigo-950/30 bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200 dark:border-amber-500/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <BookMarked className="w-3.5 h-3.5" />
              Lei Seca Esquematizada com IA
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Vade Mecum Inteligente & Grifos de Risco
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Mais de <strong>75% das questões</strong> em concursos federais, estaduais e OAB são resolvidas exclusivamente pela literalidade da lei. O Argus destaca os termos exatos que os examinadores adulteram para te induzir ao erro.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Toggle Caçador de Pegadinhas */}
            <button
              onClick={() => setIsTrapModeActive(!isTrapModeActive)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-xs tracking-wide transition-all shadow-lg active:scale-95 ${
                isTrapModeActive
                  ? 'bg-rose-600 text-white shadow-rose-600/30 ring-2 ring-rose-400/40'
                  : 'bg-gradient-to-r from-rose-500 to-amber-500 text-black hover:from-rose-400 hover:to-amber-400 shadow-rose-500/20'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>{isTrapModeActive ? 'FECHAR MODO DESAFIO' : '🎯 JOGAR CAÇADOR DE PEGADINHAS'}</span>
            </button>

            <button
              onClick={() => onGoToSimulator?.()}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-dark-card dark:hover:bg-dark-hover border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-bold text-xs tracking-wide transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>SIMULADOR DE QUESTÕES</span>
            </button>
          </div>
        </div>

        {/* Highlight Key Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-700 dark:text-slate-300">Legenda Inteligente:</span>
          <div className="flex items-center gap-1.5">
            <mark className="bg-amber-100 dark:bg-amber-400/25 text-amber-800 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded border-b-2 border-amber-400 text-[11px]">
              Palavra de Armadilha
            </mark>
            <span>= Termos com risco de troca (*"salvo", "sempre", "vedado"*)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
              🔥 ALTA INCIDÊNCIA
            </span>
            <span>= Cobrado em mais de 60% dos editais</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>= Áudio Copiloto em Português nativo</span>
          </div>
        </div>
      </div>

      {/* PAINEL DO CAÇADOR DE PEGADINHAS (GAMIFICAÇÃO DE LEI SECA) */}
      {isTrapModeActive && (
        <div className="rounded-3xl bg-gradient-to-br from-rose-50 via-slate-100 to-indigo-50 dark:from-rose-950/40 dark:via-slate-900 dark:to-indigo-950/40 border-2 border-rose-200 dark:border-rose-500/40 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200 dark:border-rose-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/20 border border-rose-300 dark:border-rose-500/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <Swords className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    Duelo de Lei Seca: Ache a Adulteração da Banca!
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-[10px] font-black border border-rose-300 dark:border-rose-500/30">
                    Nível Banca {currentChallenge.banca}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Clique diretamente na palavra que a banca adulterou para induzir o concurseiro ao erro.
                </p>
              </div>
            </div>

            {/* Score & Streak Counters */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 font-extrabold text-xs">
                <Flame className="w-4 h-4 text-amber-600 dark:text-amber-500 fill-amber-500/20" />
                <span>Streak: {trapStreak}🔥</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
                <Trophy className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Score: {trapScore} XP</span>
              </div>
            </div>
          </div>

          {/* Target Article Card with Clickable Words */}
          <div className="bg-white dark:bg-dark-bg/90 border border-rose-200 dark:border-rose-500/20 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-black">
                {currentChallenge.diploma} — {currentChallenge.numberStr}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Tópico: <strong className="text-slate-800 dark:text-slate-200">{currentChallenge.topic}</strong>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 text-[10px] font-bold">
                {currentChallenge.frequency}
              </span>
            </div>

            {/* Interactive Text */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/5 font-serif text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-200">
              {currentChallenge.adulteratedText.split(' ').map((rawWord, idx) => {
                const cleanWord = rawWord.replace(/[,.;:()]/g, '');
                const punctuation = rawWord.replace(/[a-zA-Z0-9À-ÿ]/g, '');
                const isSelected = userSelectedWord?.toUpperCase() === cleanWord.toUpperCase();
                const isTrapWord = currentChallenge.trapWord.toUpperCase() === cleanWord.toUpperCase();
                
                let highlightClass = 'hover:bg-indigo-100 dark:hover:bg-indigo-500/30 hover:text-indigo-700 dark:hover:text-white transition-colors cursor-pointer rounded px-0.5';
                if (challengeResult !== null) {
                  if (isTrapWord) {
                    highlightClass = 'bg-emerald-100 dark:bg-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-black ring-2 ring-emerald-300 dark:ring-emerald-400 rounded px-1';
                  } else if (isSelected && !isCorrectWord(cleanWord, currentChallenge.trapWord)) {
                    highlightClass = 'bg-rose-100 dark:bg-rose-500/30 text-rose-800 dark:text-rose-300 line-through rounded px-1';
                  } else {
                    highlightClass = 'opacity-60';
                  }
                }

                return (
                  <React.Fragment key={idx}>
                    <span 
                      onClick={() => handleWordClickInChallenge(cleanWord)}
                      className={highlightClass}
                      title={challengeResult === null ? "Clique para indicar como pegadinha" : undefined}
                    >
                      {cleanWord}
                    </span>
                    <span>{punctuation} </span>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Instruction Tip */}
            {challengeResult === null && (
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                Dica: Há 1 palavra adulterada no texto acima que torna a assertiva falsa. Clique nela!
              </p>
            )}

            {/* Resolution Card */}
            {challengeResult !== null && (
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all animate-in zoom-in-95 duration-200 shadow-sm ${
                challengeResult === 'correct'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-black text-sm mb-2">
                  {challengeResult === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>EXCELENTE! VOCÊ DESARMOU A PEGADINHA! (+25 XP)</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      <span>ATENÇÃO! VOCÊ CAIU NA ARMADILHA DA BANCA!</span>
                    </>
                  )}
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <p>
                    <strong className="text-slate-900 dark:text-white">Palavra adulterada: </strong>
                    <span className="line-through text-rose-600 dark:text-rose-400 font-bold">{currentChallenge.trapWord}</span>
                    <span className="text-slate-500 dark:text-slate-400"> ➔ Correto na lei: </span>
                    <strong className="text-emerald-600 dark:text-emerald-400 uppercase font-black">{currentChallenge.originalWord}</strong>
                  </p>
                  <p className="leading-relaxed bg-slate-100 dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
                    {currentChallenge.explanation}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <button
                    onClick={handleNextChallenge}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs shadow-lg transition-all"
                  >
                    <span>PRÓXIMO DESAFIO</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Exam Quick Filter & Diploma Filter Navigation */}
      <div className="space-y-3">
        {selectedExam && (
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
            <span className="font-black text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
              <span>🎯</span>
              <span>Concurso Ativo: {selectedExam.title}</span>
            </span>
            <button
              onClick={() => setFilterOnlyActiveExam(!filterOnlyActiveExam)}
              className={`ml-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                filterOnlyActiveExam
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25 font-black ring-2 ring-amber-400/50'
                  : 'bg-white dark:bg-dark-surface text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/10 hover:border-amber-400'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{filterOnlyActiveExam ? 'Exibindo apenas Leis do seu Edital (Ativo)' : 'Filtrar Leis Cobradas no seu Edital'}</span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {diplomas.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiploma(d.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDiploma === d.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 shadow-sm'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-dark-surface/70 border border-slate-200 dark:border-white/5 p-4 rounded-2xl backdrop-blur-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por artigo (ex: Art. 5º, Art. 37) ou palavra-chave..."
            className="w-full bg-white dark:bg-dark-bg border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">Incidência:</span>
          <select
            value={selectedIncidence}
            onChange={(e) => setSelectedIncidence(e.target.value)}
            className="bg-white dark:bg-dark-bg border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 shadow-sm cursor-pointer"
          >
            <option value="all">Todas as Frequências</option>
            <option value="Alta">🔥 Alta Incidência</option>
            <option value="Média">⚡ Média Incidência</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Articles Stream */}
      <div className="space-y-6">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-dark-surface/40 border border-slate-200 dark:border-white/5 rounded-3xl space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Nenhum artigo encontrado</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tente buscar por outro termo ou selecione todos os diplomas.</p>
          </div>
        ) : (
          filteredArticles.map((art) => {
            const isSpeakingThis = playingAudioId === art.id;
            return (
              <div
                key={art.id}
                className="rounded-2xl bg-white dark:bg-dark-surface/90 border border-slate-200 dark:border-white/5 hover:border-amber-500/30 p-6 space-y-4 transition-all shadow-lg"
              >
                {/* Article Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/5 pb-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-black text-xs">
                      {art.diploma}
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {art.numberStr}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {art.title}
                    </span>
                    {selectedExam && isArticleInActiveExam(art) && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <span>📌</span>
                        <span>Cobrado em {selectedExam.title}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Bidirectional Backlink Badge (Somente com erros reais do aluno) */}
                    {(() => {
                      const missedForArticle = getMissedQuestionsForArticle(art, mistakes);
                      if (missedForArticle.length === 0) return null;
                      return (
                        <button
                          type="button"
                          onClick={() => setSelectedBacklinkArticle(art)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 transition-all hover:scale-105 active:scale-95 shadow-sm group cursor-pointer"
                          title="Abrir Caderno de Erros vinculado a este artigo"
                        >
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          <span className="font-mono font-bold">[ {missedForArticle.length} {missedForArticle.length === 1 ? 'Questão Errada' : 'Questões Erradas'} ]</span>
                          <ChevronRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      );
                    })()}

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300">
                      🔥 {art.incidence.toUpperCase()} INCIDÊNCIA
                    </span>

                    {/* Audio Reader Button */}
                    <button
                      onClick={() => handleToggleAudio(art)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        isSpeakingThis
                          ? 'bg-indigo-600 text-white border-indigo-500 animate-pulse shadow-md shadow-indigo-600/30'
                          : 'bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/30'
                      }`}
                      title={isSpeakingThis ? 'Parar leitura de áudio' : 'Ouvir artigo lido pelo Copiloto'}
                    >
                      {isSpeakingThis ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeakingThis ? 'Pausar Áudio' : 'Ouvir Artigo'}</span>
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopyText(art)}
                      className="p-1.5 rounded-lg bg-slate-50 dark:bg-dark-bg hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-all text-xs"
                      title="Copiar artigo formatado"
                    >
                      {copiedId === art.id ? <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Literal Text with Hybrid Typography (font-serif, line-height 1.6, reduced eye-strain contrast) */}
                <div className="bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-white/5 rounded-2xl p-5 sm:p-6 shadow-inner">
                  <p className="text-base sm:text-[17px] font-serif leading-[1.6] text-slate-700 dark:text-zinc-300 antialiased selection:bg-amber-400/30">
                    {renderHighlightedText(art.text, art.trapKeywords)}
                  </p>
                </div>

                {/* Banca Trap Golden Note */}
                <div className="bg-amber-50 dark:bg-transparent dark:bg-gradient-to-r dark:from-amber-950/25 dark:via-dark-bg dark:to-dark-surface border border-amber-200 dark:border-amber-500/25 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span>Dica de Ouro da Banca (Como você é testado)</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {art.bancaTrapNote}
                  </p>
                </div>

                {/* Footer Tags & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {art.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-transparent">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {art.relatedQuestionId && onGoToQuestion && (
                      <button
                        onClick={() => onGoToQuestion(art.relatedQuestionId!)}
                        className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                      >
                        <span>Resolver Questão Deste Artigo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onGoToSimulator(`${art.diploma} ${art.numberStr}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 transition-all cursor-pointer"
                      title="Treinar questões deste tema no Simulador"
                    >
                      <Crosshair className="w-3.5 h-3.5" />
                      <span>Treinar na Arena</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* SLIDE-OVER DRAWER DE BACKLINKS BIDIRECIONAIS (ESTILO OBSIDIAN / NOTION) */}
      {selectedBacklinkArticle && (
        <VadeMecumBacklinkDrawer
          article={selectedBacklinkArticle}
          mistakes={mistakes}
          onClose={() => setSelectedBacklinkArticle(null)}
          onGoToSimulator={onGoToSimulator}
        />
      )}

    </div>
    </HardPaywallGate>
  );
};
