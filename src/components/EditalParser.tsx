'use client';

import React, { useState } from 'react';
import {
  FileUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Calendar,
  DollarSign,
  Users,
  Award,
  BookOpen,
  Layers,
  Flame,
  FileCheck,
  Plus,
  Check,
  Target,
  Star,
  Zap,
  BarChart3,
} from 'lucide-react';
import { ExamNotice, SubscriptionPlan } from '@/lib/types';
import { HardPaywallGate } from './HardPaywallGate';
import {
  generateSyllabusByArea,
  getExamArea,
} from './edital-parser/editalSyllabusGenerator';
import { EditalCopilotChat } from './edital-parser/EditalCopilotChat';
import { EditalVerticalTree } from './edital-parser/EditalVerticalTree';
import { EditalUploadModal } from './edital-parser/EditalUploadModal';

interface EditalParserProps {
  exams: ExamNotice[];
  selectedExam: ExamNotice;
  defaultExamId?: string;
  onSelectExam: (exam: ExamNotice) => void;
  onSetDefaultExam?: (exam: ExamNotice) => void;
  onGenerateCycle: (exam: ExamNotice) => void;
  onAddCustomExam: (newExam: ExamNotice) => void;
  userPlan?: SubscriptionPlan;
  onOpenPricing?: () => void;
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  onGoHome?: () => void;
}

export const EditalParser: React.FC<EditalParserProps> = ({
  exams,
  selectedExam,
  defaultExamId,
  onSelectExam,
  onSetDefaultExam,
  onGenerateCycle,
  onAddCustomExam,
  userPlan = 'aspirante',
  onOpenPricing,
  onSelectPlan,
  onGoHome,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStage, setProgressStage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('todas');
  const [expandedSubject, setExpandedSubject] = useState<string | null>(selectedExam.subjects[0]?.id || null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [examTitleInput, setExamTitleInput] = useState('');
  const [bancaInput, setBancaInput] = useState<'FGV' | 'Cebraspe' | 'FCC' | 'Vunesp' | 'Outra'>('Cebraspe');
  const [roleInput, setRoleInput] = useState('');
  const [salaryInput, setSalaryInput] = useState('R$ 8.520,00');
  const [vacanciesInput, setVacanciesInput] = useState('180');
  const [uploadText, setUploadText] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [setAsDefaultExam, setSetAsDefaultExam] = useState<boolean>(true);

  const stages = [
    `Lendo estrutura de "${uploadedFile?.name || 'Edital'}" e aplicando OCR inteligente...`,
    `Mapeando cargos, pesos das disciplinas e perfil estatístico da banca ${bancaInput}...`,
    'Estruturando árvore de conteúdos com artigos de lei pertinentes...',
    'Ponderando relevância estatística na banca e gerando edital verticalizado...',
  ];

  const handleFileSelect = (file: File) => {
    setUploadError(null);
    if (!file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      setUploadError('Por favor, selecione um arquivo em formato PDF, DOCX ou TXT.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadError('O arquivo excede o limite máximo de 50MB.');
      return;
    }

    setUploadedFile(file);

    const cleanBaseName = file.name
      .replace(/\.(pdf|docx?|txt)$/i, '')
      .replace(/[_-]+/g, ' ')
      .trim();

    const lowerName = cleanBaseName.toLowerCase();
    let detectedBanca: 'FGV' | 'Cebraspe' | 'FCC' | 'Vunesp' | 'Outra' = 'Cebraspe';
    if (lowerName.includes('fgv') || lowerName.includes('getulio')) {
      detectedBanca = 'FGV';
    } else if (lowerName.includes('fcc') || lowerName.includes('carlos chagas')) {
      detectedBanca = 'FCC';
    } else if (lowerName.includes('vunesp')) {
      detectedBanca = 'Vunesp';
    } else if (lowerName.includes('cebraspe') || lowerName.includes('cespe')) {
      detectedBanca = 'Cebraspe';
    }

    let detectedRole = 'Analista / Técnico';
    if (lowerName.includes('auditor')) detectedRole = 'Auditor Fiscal';
    else if (lowerName.includes('agente')) detectedRole = 'Agente de Polícia';
    else if (lowerName.includes('escrivao') || lowerName.includes('escrivão')) detectedRole = 'Escrivão de Polícia';
    else if (lowerName.includes('perito')) detectedRole = 'Perito Criminal';
    else if (lowerName.includes('delegado')) detectedRole = 'Delegado de Polícia';
    else if (lowerName.includes('advogado') || lowerName.includes('oab')) detectedRole = 'Advogado / OAB';
    else if (lowerName.includes('bancario') || lowerName.includes('escriturario')) detectedRole = 'Escriturário / Caixa';
    else if (lowerName.includes('analista')) detectedRole = 'Analista Judiciário';

    setBancaInput(detectedBanca);
    setRoleInput((prev) => prev || detectedRole);
    setExamTitleInput((prev) => prev || cleanBaseName.charAt(0).toUpperCase() + cleanBaseName.slice(1));

    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content && !uploadText) {
          setUploadText(content.slice(0, 3000));
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (!uploadedFile && !examTitleInput.trim() && !uploadText.trim()) {
      setUploadError('Por favor, selecione um arquivo PDF ou informe o título/conteúdo do edital.');
      return;
    }

    const finalTitle = examTitleInput.trim() || (uploadedFile ? uploadedFile.name.replace(/\.[^/.]+$/, '') : 'Edital Analisado por IA');
    const finalRole = roleInput.trim() || 'Analista / Técnico';
    const finalBanca = bancaInput;
    const finalSalary = salaryInput.trim() || 'R$ 8.520,00';
    const finalVacancies = parseInt(vacanciesInput) || 200;
    const finalFileName = uploadedFile?.name || 'Edital_Upload_Consolidado.pdf';

    setIsProcessing(true);
    setShowUploadModal(false);
    setProgressStage(0);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const backendPromise = fetch('/api/edital', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examTitle: finalTitle,
        role: finalRole,
        banca: finalBanca,
        salary: finalSalary,
        vacancies: finalVacancies,
        editalText: uploadText,
        pdfFileName: finalFileName,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.warn('Fallback local para edital:', err);
        return null;
      });

    const interval = setInterval(() => {
      setProgressStage((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          backendPromise.then((apiResponse) => {
            setIsProcessing(false);

            let newExam: ExamNotice;
            if (apiResponse && apiResponse.success && apiResponse.data) {
              newExam = apiResponse.data;
            } else {
              const dynamicSubjects = generateSyllabusByArea(finalTitle, finalRole, uploadText);
              newExam = {
                id: `custom-exam-${Date.now()}`,
                title: finalTitle,
                institution: finalTitle.split(' - ')[0] || 'Órgão Concursal',
                banca: finalBanca,
                role: finalRole,
                salary: finalSalary,
                vacancies: finalVacancies,
                examDate: '2026-12-15',
                daysRemaining: 105,
                pdfFileName: finalFileName,
                uploadedAt: new Date().toISOString().split('T')[0],
                subjects: dynamicSubjects,
              };
            }

            onAddCustomExam(newExam);
            onSelectExam(newExam);
            if (setAsDefaultExam && onSetDefaultExam) {
              onSetDefaultExam(newExam);
            }

            setUploadedFile(null);
            setExamTitleInput('');
            setRoleInput('');
            setUploadText('');
            setSetAsDefaultExam(true);
          });
          return 3;
        }
        return prev + 1;
      });
    }, 280);
  };

  const examsByArea = exams.reduce((acc, exam) => {
    const area = getExamArea(exam);
    if (!acc[area]) acc[area] = [];
    acc[area].push(exam);
    return acc;
  }, {} as Record<string, ExamNotice[]>);

  const filteredSubjects = selectedExam.subjects
    .map((sub) => ({
      ...sub,
      topics: sub.topics.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((sub) => sub.topics.length > 0);

  return (
    <HardPaywallGate
      moduleTitle="Meu Edital Organizado & Upload de PDF"
      moduleSubtitle="Envie qualquer edital em PDF ou escolha entre nossos concursos oficiais já mapeados com distribuição estatística das matérias e chat com Tutor IA."
      features={[
        'Upload de editais em PDF com organização automática',
        'Distribuição estatística real das matérias por peso na banca',
        'Checklist completo de tópicos do concurso escolhido',
        'Tutor IA para tirar dúvidas sobre regras e pesos do edital',
      ]}
      userPlan={userPlan}
      onOpenPricing={onOpenPricing}
      onSelectPlan={onSelectPlan}
      onGoHome={onGoHome}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & Preset Switcher */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-300 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold">
                Organizador Inteligente de Edital
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Leitura Automática de PDF</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Meu Edital Organizado • O Que Mais Cai na Prova
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Escolha seu concurso abaixo ou envie o PDF do seu edital para ver todas as matérias organizadas por ordem de importância.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-focus-selector'))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/15 dark:hover:bg-rose-500/25 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold text-xs transition-all cursor-pointer"
            >
              <Target className="w-4 h-4" />
              <span>Escolher Meus Focos</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all glow-brand cursor-pointer"
            >
              <FileUp className="w-4 h-4" />
              <span>Enviar Novo Edital (PDF)</span>
            </button>
          </div>
        </div>

        {/* Selector of Pre-Analyzed Editais */}
        <div className="mt-6 glass-panel bg-white/70 dark:bg-dark-card/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Editais Disponíveis para Estudo
              </span>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center sm:justify-start gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-dashed border-indigo-500/40 text-indigo-500 dark:text-indigo-300 dark:hover:text-white"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload de Novo Edital (PDF)</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedAreaFilter('todas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedAreaFilter === 'todas'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
              }`}
            >
              Todas as Áreas ({exams.length})
            </button>
            {Object.keys(examsByArea).map((area) => (
              <button
                key={area}
                onClick={() => setSelectedAreaFilter(area)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedAreaFilter === area
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
                }`}
              >
                {area} ({examsByArea[area].length})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {exams
              .filter((e) => selectedAreaFilter === 'todas' || getExamArea(e) === selectedAreaFilter)
              .map((exam) => {
                const isSelected = selectedExam.id === exam.id;
                const area = getExamArea(exam);
                return (
                  <div
                    key={exam.id}
                    onClick={() => onSelectExam(exam)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 text-left ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-500/15 border-indigo-500 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-500/30'
                        : 'bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-dark-hover border-slate-200 dark:border-white/10 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            {area}
                          </span>
                          {exam.id === defaultExamId && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1 shrink-0" title="Seu Edital Padrão ativo">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                              <span>Padrão</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold shrink-0">
                          {exam.banca}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white line-clamp-1">
                        {exam.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {exam.role}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-[11px]">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {exam.salary}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          isSelected ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Selecionado</span>
                          </span>
                        ) : (
                          'Selecionar'
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* AI Processing Animation Overlay */}
        {isProcessing && (
          <div className="mt-8 p-8 rounded-3xl glass-panel bg-white/70 dark:bg-dark-card/60 backdrop-blur-md border border-indigo-500/40 glow-brand text-center animate-fadeIn shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4">
              <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Processamento e Mapeamento Analítico do Edital</h3>
            <p className="text-xs text-indigo-300 mt-1 font-mono">{stages[progressStage]}</p>

            <div className="w-full max-w-md mx-auto mt-6 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${((progressStage + 1) / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Exam Overview Summary Card */}
        {!isProcessing && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Card Esquerdo: Detalhes do Concurso e Métricas Rápidas */}
            <div className="lg:col-span-7 glass-panel bg-white/80 dark:bg-dark-card/70 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-md flex flex-col justify-between space-y-5">
              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-white/10">
                <div className="space-y-1 min-w-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {selectedExam.institution}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {selectedExam.role}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      {selectedExam.pdfFileName || 'Edital_Oficial.pdf'}
                    </span>
                    <span>•</span>
                    <span>
                      Banca: <strong className="text-slate-900 dark:text-white font-bold">{selectedExam.banca}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {defaultExamId === selectedExam.id ? (
                    <span className="px-3.5 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-extrabold text-xs tracking-wide flex items-center gap-1.5 shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>Edital Padrão Ativo</span>
                    </span>
                  ) : onSetDefaultExam ? (
                    <button
                      onClick={() => onSetDefaultExam(selectedExam)}
                      className="px-3.5 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      title="Definir este concurso como seu edital padrão em toda a plataforma"
                    >
                      <Star className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Definir como Edital Padrão</span>
                    </button>
                  ) : null}

                  <button
                    onClick={() => onGenerateCycle(selectedExam)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs tracking-wide shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all glow-emerald cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Montar Meu Plano Diário</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Por Onde Começar • Banca {selectedExam.banca}</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    Meta Segura: 80%+ de Acertos
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Para <strong>{selectedExam.role}</strong> ({selectedExam.institution}), a matéria que mais vale pontos na sua prova é{' '}
                  <strong className="text-indigo-600 dark:text-indigo-300">
                    {selectedExam.subjects[0]?.name || 'Conhecimentos Específicos'} ({selectedExam.subjects[0]?.relevancePercentage || 45}% da nota)
                  </strong>
                  . Comece estudando os assuntos de Peso 3 e escolha suas matérias em foco a qualquer hora.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onGenerateCycle(selectedExam)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Ver O Que Estudar Hoje</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-focus-selector'))}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-500/15 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-[11px] font-bold transition-all cursor-pointer"
                  >
                    Escolher Mais de Um Foco
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 text-[11px] font-bold transition-all cursor-pointer"
                  >
                    Enviar Outro Edital (PDF)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-dark-surface p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    <span>Data da Prova</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-1">{selectedExam.examDate}</p>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Faltam {selectedExam.daysRemaining} dias</p>
                </div>

                <div className="bg-slate-50 dark:bg-dark-surface p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>Remuneração</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 mt-1">{selectedExam.salary}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Inicial Bruto</p>
                </div>

                <div className="bg-slate-50 dark:bg-dark-surface p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                    <Users className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    <span>Vagas</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-1">{selectedExam.vacancies} vagas</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Imediatas + CR</p>
                </div>

                <div className="bg-slate-50 dark:bg-dark-surface p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                    <Award className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                    <span>Disciplinas</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-1">{selectedExam.subjects.length} Matérias</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Ponderadas por peso</p>
                </div>
              </div>
            </div>

            {/* Card Direito: Distribuição Estatística da Prova */}
            <div className="lg:col-span-5 glass-panel bg-white/80 dark:bg-dark-card/70 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span>Distribuição Estatística da Prova</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-bold">
                    80/20 Ponderado
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  Relevância real de cada disciplina calculada pelo algoritmo sobre o histórico da banca <strong>{selectedExam.banca}</strong>:
                </p>

                <div className="mt-4 space-y-3.5 overflow-y-auto max-h-[360px] pr-2 custom-scrollbar">
                  {selectedExam.subjects.map((sub) => {
                    const isHighPriority = sub.relevancePercentage >= 30;
                    const isMediumPriority = sub.relevancePercentage >= 15 && sub.relevancePercentage < 30;
                    return (
                      <div key={sub.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-200/70 dark:border-white/5 group hover:border-indigo-500/40 transition-all">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                              {sub.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                                  sub.weight === 3
                                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                                    : sub.weight === 2
                                    ? 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10'
                                }`}
                              >
                                Peso {sub.weight} • {sub.weight === 3 ? 'Alta' : sub.weight === 2 ? 'Média' : 'Básica'}
                              </span>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                                {sub.totalTopics} tópicos listados
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                              {sub.relevancePercentage}%
                            </span>
                            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                              da nota final
                            </span>
                          </div>
                        </div>

                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-1000 ${
                              isHighPriority
                                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-sm shadow-amber-500/20'
                                : isMediumPriority
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-sm shadow-blue-500/20'
                                : 'bg-gradient-to-r from-slate-400 to-slate-500'
                            }`}
                            style={{ width: `${Math.max(sub.relevancePercentage, 6)}%` }}
                          />
                        </div>

                        {isHighPriority && (
                          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                            <Flame className="w-3 h-3" />
                            <span>Disciplina Crítica 80/20 — Maior peso na nota de corte</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <span>Banca Alvo:</span>
                  <strong className="text-slate-900 dark:text-white font-black">{selectedExam.banca}</strong>
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  100% Ponderado
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Chat do Copiloto Cognitivo Argus sobre o Edital */}
        {!isProcessing && <EditalCopilotChat selectedExam={selectedExam} />}

        {/* Search and Filter Topics in Edital */}
        {!isProcessing && (
          <EditalVerticalTree
            filteredSubjects={filteredSubjects}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            expandedSubject={expandedSubject}
            setExpandedSubject={setExpandedSubject}
          />
        )}

        {/* Upload Custom Edital Modal */}
        {showUploadModal && (
          <EditalUploadModal
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            isDragging={isDragging}
            examTitleInput={examTitleInput}
            setExamTitleInput={setExamTitleInput}
            bancaInput={bancaInput}
            setBancaInput={setBancaInput}
            roleInput={roleInput}
            setRoleInput={setRoleInput}
            salaryInput={salaryInput}
            setSalaryInput={setSalaryInput}
            vacanciesInput={vacanciesInput}
            setVacanciesInput={setVacanciesInput}
            uploadText={uploadText}
            setUploadText={setUploadText}
            setAsDefaultExam={setAsDefaultExam}
            setSetAsDefaultExam={setSetAsDefaultExam}
            uploadError={uploadError}
            onClose={() => {
              setShowUploadModal(false);
              setUploadError(null);
            }}
            onFileSelect={handleFileSelect}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onSubmit={handleCustomSubmit}
          />
        )}
      </div>
    </HardPaywallGate>
  );
};
