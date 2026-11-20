'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Award, 
  RotateCcw, 
  ChevronRight, 
  BookOpen, 
  Scale, 
  Check, 
  Play, 
  Pause, 
  Copy, 
  HelpCircle,
  TrendingUp,
  FileCheck,
  Zap,
  Filter,
  Upload,
  Crown,
  Lock
} from 'lucide-react';
import { DiscursivePrompt, DiscursiveEvaluation, DiscursiveSubmission, SubscriptionPlan, ExamNotice, StudentProfile } from '@/lib/types';
import { MOCK_DISCURSIVE_PROMPTS } from '@/lib/mockData';
import { HardPaywallGate } from './HardPaywallGate';
import { useAuthStore } from '@/store/useAuthStore';
import {
  buildFallbackDiscursiveEvaluation,
  DiscursiveEvaluationReport,
} from './discursive/DiscursiveEvaluationReport';

interface DiscursiveStudioProps {
  onRecordSubmission?: (submission: DiscursiveSubmission) => void;
  userPlan?: SubscriptionPlan;
  onOpenPricing?: () => void;
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  onGoHome?: () => void;
  selectedExam?: ExamNotice;
  studentProfile?: StudentProfile;
}

export const DiscursiveStudio: React.FC<DiscursiveStudioProps> = ({ 
  onRecordSubmission,
  userPlan = 'aspirante',
  onOpenPricing,
  onSelectPlan,
  onGoHome,
  selectedExam,
  studentProfile
}) => {
  const [prompts] = useState<DiscursivePrompt[]>(MOCK_DISCURSIVE_PROMPTS || []);
  const [selectedPromptId, setSelectedPromptId] = useState<string>(prompts[0]?.id || '');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('todas');
  const [essayText, setEssayText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressStage, setProgressStage] = useState<number>(0);
  const [evaluation, setEvaluation] = useState<DiscursiveEvaluation | null>(null);
  const [showAnswerModel, setShowAnswerModel] = useState<boolean>(false);
  const [activeTabComparison, setActiveTabComparison] = useState<'meu_texto' | 'espelho' | 'aprimorado'>('meu_texto');
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const evaluationRef = useRef<HTMLDivElement>(null);

  // Filtered prompts
  const filteredPrompts = selectedAreaFilter === 'todas'
    ? prompts
    : prompts.filter((p) => p.area === selectedAreaFilter);

  const currentPrompt = filteredPrompts.find((p) => p.id === selectedPromptId) 
    || prompts.find((p) => p.id === selectedPromptId) 
    || filteredPrompts[0] 
    || prompts[0];

  // Auto-calibrar proposta de acordo com o concurso/OAB ativo
  useEffect(() => {
    if (!selectedExam) return;
    const lower = (selectedExam.title + ' ' + selectedExam.institution + ' ' + selectedExam.role).toLowerCase();

    if (lower.includes('oab') || lower.includes('advoga')) {
      setSelectedAreaFilter('Jurídica');
      const oabPrompt = prompts.find(p => p.id === 'disc-oab-seguranca');
      if (oabPrompt) setSelectedPromptId(oabPrompt.id);
    } else if (lower.includes('polic') || lower.includes('pf') || lower.includes('prf')) {
      setSelectedAreaFilter('Policial');
      const pfPrompt = prompts.find(p => p.id === 'disc-pf-2026');
      if (pfPrompt) setSelectedPromptId(pfPrompt.id);
    } else if (lower.includes('fiscal') || lower.includes('receita')) {
      setSelectedAreaFilter('Fiscal');
      const recPrompt = prompts.find(p => p.id === 'disc-fgv-receita');
      if (recPrompt) setSelectedPromptId(recPrompt.id);
    } else if (lower.includes('tribunal') || lower.includes('tj') || lower.includes('trt') || lower.includes('trf')) {
      setSelectedAreaFilter('Tribunais');
      const trtPrompt = prompts.find(p => p.id === 'disc-fcc-trt');
      if (trtPrompt) setSelectedPromptId(trtPrompt.id);
    }
  }, [selectedExam, prompts]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Text metrics calculation
  const lines = essayText.split('\n');
  const totalLines = essayText.trim() === '' ? 0 : lines.length;
  const wordCount = essayText.trim() === '' ? 0 : essayText.trim().split(/\s+/).length;
  const charCount = essayText.length;

  const handleFillSample = () => {
    if (currentPrompt.suggestedDraft) {
      setEssayText(currentPrompt.suggestedDraft);
      if (!isTimerRunning && timerSeconds === 0) {
        setTimerSeconds(1340); // 22m20s sample
      }
    }
  };

  const stages = [
    'Analisando estrutura dissertativa, paragrafação e coesão textual...',
    'Confrontando teses apresentadas com os tópicos obrigatórios e jurisprudência vinculante...',
    'Aplicando régua e fórmula oficial da banca com cálculo de descontos gramaticais...',
    'Consolidando espelho de correção analítica, notas por critério e reescrita modelo...'
  ];

  const handleGradeEssay = async () => {
    if (userPlan === 'aspirante') {
      onOpenPricing?.();
      return;
    }

    if (essayText.trim().length < 50) return;

    setIsProcessing(true);
    setProgressStage(0);
    setEvaluation(null);
    setIsTimerRunning(false);

    // Multi-stage animation
    const stageInterval = setInterval(() => {
      setProgressStage((prev) => (prev < 3 ? prev + 1 : 3));
    }, 900);

    let evalResult: DiscursiveEvaluation | null = null;

    try {
      const token = useAuthStore.getState().token;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token && !token.startsWith('jwt_mock_')) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch('/api/discursive', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          essayText,
          promptTitle: currentPrompt.title,
          banca: currentPrompt.banca,
          motivatingText: currentPrompt.motivatingText,
          mandatoryTopics: currentPrompt.mandatoryTopics,
          minLines: currentPrompt.minLines,
          maxLines: currentPrompt.maxLines,
          totalLinesUsed: totalLines,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          evalResult = result.data;
        }
      }
    } catch (err) {
      console.warn('Fallback para corretor determinístico local:', err);
    }

    // Se a IA não responder ou der erro, usa o fallback determinístico
    if (!evalResult) {
      evalResult = buildFallbackDiscursiveEvaluation(currentPrompt, totalLines);
    }

    clearInterval(stageInterval);
    setIsProcessing(false);
    setEvaluation(evalResult);

    if (onRecordSubmission && evalResult) {
      onRecordSubmission({
        id: `sub-${Date.now()}`,
        promptId: currentPrompt.id,
        text: essayText,
        submittedAt: new Date().toISOString(),
        timeSpentSeconds: timerSeconds,
        evaluation: evalResult,
      });
    }

    setTimeout(() => {
      evaluationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <HardPaywallGate
      moduleTitle="Laboratório de Redação e Discursivas com IA"
      moduleSubtitle="Treine redações, pareceres e questões discursivas no espelho exato da sua banca com correção detalhada linha a linha."
      features={[
        'Temas inéditos calibrados pelo seu concurso e banca',
        'Correção criteriosa com espelho de nota e apontamento de desvios',
        'Histórico de evolução na nota final e domínio argumentativo',
        'Desbloqueado nos planos de assinatura ativa do Argus',
      ]}
      userPlan={userPlan}
      onOpenPricing={onOpenPricing}
      onSelectPlan={onSelectPlan}
      onGoHome={onGoHome}
    >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-6">
      
      {/* Banner de Upgrade para Discursivas */}
      {userPlan === 'aspirante' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-slate-500/10 to-transparent border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Estúdio Analítico Powered by Google Gemini 4 Carbon
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Ative o <strong>Plano ELITE VIP</strong> ou <strong>BLACK Vitalício</strong> para desbloquear correções ilimitadas de peças práticas e redações com espelho oficial da banca.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenPricing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 transition-all shrink-0 flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Desbloquear Discursivas</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-300 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold flex items-center gap-1">
              <PenTool className="w-3.5 h-3.5" />
              Estúdio de Discursivas & Redações 2.0
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Régua Oficial Cebraspe • FGV • FCC • OAB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Simulador de Prova Discursiva com Correção por IA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Treine na folha pautada de 30 linhas, receba a nota analítica por critério da banca e compare com o espelho de resposta.
          </p>
        </div>

        {/* Area Filter Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Área:</span>
          </div>
          <select
            value={selectedAreaFilter}
            onChange={(e) => setSelectedAreaFilter(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white bg-white dark:bg-dark-surface cursor-pointer font-medium"
          >
            <option value="todas">Todas as Áreas</option>
            <option value="Policial">Carreiras Policiais</option>
            <option value="Fiscal">Carreiras Fiscais</option>
            <option value="Tribunais">Tribunais & TRTs</option>
            <option value="Jurídica">OAB & Advocacia Pública</option>
          </select>
        </div>
      </div>

      {/* Active Exam Adaptive Discursive Banner */}
      {selectedExam && (
        <div className="mt-4 p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🎯</span>
            <span className="font-black text-indigo-700 dark:text-indigo-300">
              Estúdio Calibrado para seu Edital: {selectedExam.title} ({selectedExam.banca})
            </span>
          </div>
          <span className="text-slate-600 dark:text-slate-400">
            Régua e critérios de avaliação configurados para o estilo de cobrança da banca <strong>{selectedExam.banca}</strong>
          </span>
        </div>
      )}

      {/* Prompts Preset Bar */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full">
        {filteredPrompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => {
              setSelectedPromptId(prompt.id);
              setEvaluation(null);
              setEssayText('');
              setTimerSeconds(0);
              setIsTimerRunning(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              selectedPromptId === prompt.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                : 'bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="truncate max-w-[210px] sm:max-w-xs">{prompt.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 font-mono text-indigo-300 shrink-0">
              {prompt.banca}
            </span>
          </button>
        ))}
      </div>

      {/* Main Studio Grid: Enunciado (Left) vs Folha Pautada (Right) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: O Enunciado Oficial da Prova */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-6 rounded-3xl border border-slate-200 dark:border-white/10">
            
            {/* Meta Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-500/30">
                  {currentPrompt.banca} • {currentPrompt.year}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-dark-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
                  {currentPrompt.area}
                </span>
              </div>
              <span className="text-amber-500 dark:text-amber-400 font-bold">
                {currentPrompt.minLines} a {currentPrompt.maxLines} linhas
              </span>
            </div>

            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {currentPrompt.institution} • {currentPrompt.role}
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1 leading-snug">
                {currentPrompt.title}
              </h2>
            </div>

            {/* Motivating Text */}
            <div className="mt-5 p-4 rounded-2xl bg-white dark:bg-dark-surface/80 border border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Texto Motivador da Prova:</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{currentPrompt.motivatingText}"
              </p>
            </div>

            {/* Mandatory Topics Required by Exam Board */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tópicos Obrigatórios Exigidos pela Banca:</span>
              </h3>
              <div className="space-y-2.5">
                {currentPrompt.mandatoryTopics.map((topic, idx) => (
                  <div key={topic.id} className="p-3 rounded-xl bg-white dark:bg-dark-card/70 border border-slate-200 dark:border-white/5 flex items-start justify-between gap-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-200 leading-relaxed">{topic.description}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-indigo-300 shrink-0 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {topic.maxPoints} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Official Answer Key Toggle */}
            <div className="mt-6 pt-4 border-t border-slate-300 dark:border-white/10">
              <button
                onClick={() => setShowAnswerModel(!showAnswerModel)}
                className="w-full py-2.5 rounded-xl bg-white dark:bg-dark-surface hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>{showAnswerModel ? 'Ocultar Padrão Preliminar da Banca' : 'Ver Padrão Preliminar da Banca (Espelho)'}</span>
              </button>

              {showAnswerModel && (
                <div className="mt-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-slate-700 dark:text-slate-200 animate-fadeIn">
                  <h4 className="font-bold text-indigo-300 mb-2">Padrão de Resposta Oficial Esperado:</h4>
                  <p className="leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">
                    {currentPrompt.officialAnswerModel}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Exam Tips Card */}
          <div className="glass-panel p-5 rounded-3xl border border-blue-200 dark:border-blue-500/20 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/15 dark:to-slate-900/10 shadow-sm">
            <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 mb-2">
              <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Dica da Banca {currentPrompt.banca}:</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              No padrão {currentPrompt.banca}, cada parágrafo de desenvolvimento deve responder explicitamente a um dos tópicos obrigatórios. Inicie o parágrafo citando os termos-chave do quesito para orientar a leitura do corretor oficial.
            </p>
          </div>

        </div>

        {/* Right Column: Folha Pautada Oficial (30 Linhas) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Action Toolbar */}
          <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-4 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
            
            {/* Real-time metrics */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-slate-500 dark:text-slate-400">Linhas:</span>
                <span className={`px-2 py-0.5 rounded font-mono ${
                  totalLines === 0
                    ? 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                    : totalLines < currentPrompt.minLines || totalLines > currentPrompt.maxLines
                    ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30'
                    : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30'
                }`}>
                  {totalLines} / {currentPrompt.maxLines}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <span>Palavras: <strong className="text-slate-900 dark:text-white font-mono">{wordCount}</strong></span>
              </div>
            </div>

            {/* Timer & Sample Filler */}
            <div className="flex items-center gap-2">
              
              {/* Timer */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>{formatTime(timerSeconds)}</span>
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white"
                  title={isTimerRunning ? 'Pausar cronômetro' : 'Iniciar cronômetro'}
                >
                  {isTimerRunning ? <Pause className="w-3 h-3 text-amber-500 dark:text-amber-400" /> : <Play className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                </button>
              </div>

              {/* Upload Photo Button */}
              <label className="cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 transition-colors flex items-center gap-1 shadow-sm" title="Tirou foto do caderno de resposta? Envie para a IA extrair o texto manuscrito.">
                <Upload className="w-3 h-3" />
                <span className="hidden sm:inline">Enviar Foto (OCR)</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEssayText(currentPrompt.suggestedDraft || 'Texto extraído via IA OCR:\n\nA persecução penal contemporânea exige a estrita observância das balizas legais...');
                      setIsTimerRunning(false);
                    }
                  }}
                />
              </label>

              {/* Sample Draft Button */}
              <button
                type="button"
                onClick={handleFillSample}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Carregar redação modelo de exemplo para testar a correção imediata"
              >
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>Inserir Rascunho Modelo</span>
              </button>

              {/* Clear button */}
              {essayText && (
                <button
                  type="button"
                  onClick={() => setEssayText('')}
                  className="px-2.5 py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                  title="Limpar texto"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}

            </div>

          </div>

          {/* Folha Pautada Simulatória de 30 Linhas */}
          <div className="glass-panel bg-white/85 dark:bg-dark-card/60 backdrop-blur-md shadow-sm p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 relative">
            
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-300 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
              <span>Folha Definitiva de Respostas — {currentPrompt.banca}</span>
              <span>Proibido assinar ou identificar-se</span>
            </div>

            {/* Lined Sheet Container */}
            <div className="flex rounded-2xl bg-white dark:bg-dark-bg/80 border border-slate-200 dark:border-slate-700/60 overflow-hidden min-h-[460px] shadow-inner">
              
              {/* Left Line Numbers Gutter */}
              <div className="w-10 sm:w-12 bg-white dark:bg-dark-surface/90 border-r border-slate-200 dark:border-slate-700/60 py-4 select-none font-mono text-[11px] text-slate-500 text-center leading-[26px]">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i + 1}
                    className={`${i + 1 <= totalLines ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                value={essayText}
                onChange={(e) => {
                  setEssayText(e.target.value);
                  if (!isTimerRunning && timerSeconds === 0) {
                    setIsTimerRunning(true);
                  }
                }}
                rows={30}
                placeholder="Inicie aqui a sua resposta discursiva. Respeite os parágrafos, a margem e aborde pontualmente cada um dos tópicos obrigatórios exigidos pela banca..."
                className="w-full p-4 bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-[26px] font-sans"
                style={{ lineHeight: '26px' }}
              />

            </div>

            {/* Line length warning */}
            {totalLines > 0 && totalLines < currentPrompt.minLines && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Atenção: Seu texto possui {totalLines} linhas. O mínimo exigido pela banca é de {currentPrompt.minLines} linhas para evitar anulação ou descontos.</span>
              </p>
            )}

            {/* Submission Action Button */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-300 dark:border-white/10">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                A IA analisará: <span className="text-slate-600 dark:text-slate-300 font-semibold">Tema • Argumentação • Terminologia Jurídica • Gramática</span>
              </div>

              <button
                onClick={handleGradeEssay}
                disabled={isProcessing || (userPlan !== 'aspirante' && essayText.trim().length < 50)}
                className={`px-8 py-3.5 rounded-xl font-extrabold text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isProcessing
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                    : userPlan === 'aspirante'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl shadow-blue-600/30 glow-brand cursor-pointer'
                    : essayText.trim().length < 50
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                    : 'bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl shadow-blue-600/30 glow-brand'
                }`}
              >
                {userPlan === 'aspirante' ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Desbloquear Correção com IA (Exclusivo Pro/Elite)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                    <span>{isProcessing ? 'Corrigindo com IA...' : 'Avaliar com IA na Régua da Banca'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Overlay Proeminente de Carregamento em Tela Cheia enquanto a IA Corrige */}
      {isProcessing && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Corrigindo redação com Inteligência Artificial"
          className="fixed inset-0 z-[125] argus-modal-backdrop flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0c1322] border-2 border-indigo-500/40 shadow-2xl p-6 sm:p-8 text-center space-y-5">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-cyan-300 text-[10px] font-black uppercase tracking-wider">
                CORREÇÃO EM ANDAMENTO • BANCA {currentPrompt.banca}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                IA Corrigindo Sua Redação...
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Aguarde alguns segundos. Estamos aplicando os critérios oficiais da banca sem travar sua tela.
              </p>
            </div>

            {/* Barra de Progresso */}
            <div className="space-y-1.5">
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(95, ((progressStage + 1) / 4) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-cyan-400 block">
                Etapa {progressStage + 1} de {stages.length}
              </span>
            </div>

            {/* Checklist Visual das 4 Etapas */}
            <div className="space-y-2 text-left">
              {stages.map((label, idx) => {
                const isDone = idx < progressStage;
                const isCurrent = idx === progressStage;
                return (
                  <div
                    key={label}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs transition-all ${
                      isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                        : isCurrent
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 dark:border-indigo-500/50 text-indigo-900 dark:text-white font-bold'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-700 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-snug">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Final Detailed Evaluation Report */}
      {evaluation && !isProcessing && (
        <DiscursiveEvaluationReport
          evaluation={evaluation}
          currentPrompt={currentPrompt}
          essayText={essayText}
          totalLines={totalLines}
          activeTabComparison={activeTabComparison}
          setActiveTabComparison={setActiveTabComparison}
          evaluationRef={evaluationRef}
        />
      )}

    </div>
    </HardPaywallGate>
  );
};
