'use client';

import React, { useState } from 'react';
import { Zap, ArrowRight, Clock, Calendar, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { INITIAL_EXAMS } from '@/lib/mockData';

interface LandingLeadMagnetProps {
  onStartEdital: () => void;
}

export const LandingLeadMagnet: React.FC<LandingLeadMagnetProps> = ({ onStartEdital }) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(INITIAL_EXAMS[0]?.id || 'exam-inss-2026');
  const [dailyHours, setDailyHours] = useState<number>(4);
  const [isCalculating, setIsCalculating] = useState(false);
  const buildResult = (examIdOrQuery: string, hoursPerDay: number) => {
    const searchTerms = examIdOrQuery.toLowerCase().trim();
    const matchedExam = INITIAL_EXAMS.find(exam => 
      exam.id === examIdOrQuery ||
      exam.title.toLowerCase().includes(searchTerms) ||
      exam.role.toLowerCase().includes(searchTerms) ||
      exam.banca.toLowerCase().includes(searchTerms)
    ) || INITIAL_EXAMS[0];

    const days = matchedExam.daysRemaining || 90;
    const totalHours = days * hoursPerDay;

    const sortedSubjects = [...matchedExam.subjects].sort((a, b) => b.relevancePercentage - a.relevancePercentage);
    const topSubjectsWithHours = sortedSubjects.slice(0, 4).map(sub => ({
      name: sub.name,
      weight: sub.weight,
      relevance: sub.relevancePercentage,
      hours: Math.round((totalHours * sub.relevancePercentage) / 100)
    }));

    let trapDescription = `Alta incidência de pegadinhas doutrinárias e inversão de premissas da banca ${matchedExam.banca}.`;
    if (matchedExam.banca === 'FGV') {
      trapDescription = 'A FGV foca em casos concretos longos, termos de negação dupla ("não é defeso", "prescinde") e enunciados que induzem ao erro por cansaço visual.';
    } else if (matchedExam.banca === 'Cebraspe') {
      trapDescription = 'O Cebraspe pune o chute e arma distratores de generalização ("sempre", "nunca", "exclusivamente"), além de cobrar jurisprudência recente dos Tribunais Superiores.';
    } else if (matchedExam.banca === 'Vunesp') {
      trapDescription = 'A Vunesp privilegia a letra fria da lei com troca cirúrgica de prazos e conjunções. Erros ocorrem por leitura apressada da lei seca.';
    } else if (matchedExam.banca === 'FCC') {
      trapDescription = 'A FCC equilibra letra da lei com súmulas consolidadas, utilizando alternativas com semelhança sintática para confundir o candidato.';
    } else if (matchedExam.banca === 'Cesgranrio') {
      trapDescription = 'A Cesgranrio exige interpretação aplicada a cenários bancários/administrativos reais, regulação do SFN/BACEN e cálculos financeiros sob pressão de tempo.';
    }

    return {
      examTitle: matchedExam.title,
      banca: matchedExam.banca,
      daysRemaining: days,
      dailyHours: hoursPerDay,
      totalHoursNeeded: totalHours,
      topSubjectsWithHours,
      bancaTrapIndex: trapDescription
    };
  };

  const [leadResult, setLeadResult] = useState<{
    examTitle: string;
    banca: string;
    daysRemaining: number;
    dailyHours: number;
    totalHoursNeeded: number;
    topSubjectsWithHours: { name: string; weight: number; relevance: number; hours: number }[];
    bancaTrapIndex: string;
  } | null>(() => buildResult(INITIAL_EXAMS[0]?.id || 'exam-inss-2026', 4));

  const openExams = INITIAL_EXAMS.filter((e) => !e.status || e.status === 'publicado');
  const confirmedExams = INITIAL_EXAMS.filter((e) => e.status === 'confirmado');
  const predictedExams = INITIAL_EXAMS.filter((e) => e.status === 'previsto');
  const rumorExams = INITIAL_EXAMS.filter((e) => e.status === 'rumor');

  const calculateFor = (examIdOrQuery: string, hoursPerDay: number, instant = false) => {
    if (instant) {
      setLeadResult(buildResult(examIdOrQuery, hoursPerDay));
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setLeadResult(buildResult(examIdOrQuery, hoursPerDay));
    }, 220);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateFor(selectedExamId, dailyHours);
  };

  const handleSelectChange = (newExamId: string) => {
    setSelectedExamId(newExamId);
    calculateFor(newExamId, dailyHours, true);
  };

  const handleHoursChange = (hours: number) => {
    setDailyHours(hours);
    calculateFor(selectedExamId, hours, true);
  };

  return (
    <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-slate-200 dark:border-indigo-500/30 relative overflow-hidden bg-white/95 dark:bg-dark-surface/95 shadow-2xl">
        
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[11px] sm:text-xs font-black mb-3">
            <Zap className="w-3.5 h-3.5 fill-emerald-500 shrink-0" />
            <span>CALCULADORA 80/20 DE HORAS LÍQUIDAS • GRATUITA</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Calculadora de Edital Verticalizado &amp; Rota de Carga Horária
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Ajuste suas horas líquidas por dia e veja instantaneamente a distribuição 80/20 das disciplinas com maior peso até a prova.
          </p>
        </div>

        {/* Input Form & Daily Hours Selector */}
        <form onSubmit={handleCalculate} className="mt-5 sm:mt-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 min-w-0">
              <label htmlFor="calculator-exam-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Concurso ou Cargo Alvo (Menu Oficial 2026):
              </label>
              <select
                id="calculator-exam-select"
                value={selectedExamId}
                onChange={(e) => handleSelectChange(e.target.value)}
                className="w-full min-w-0 max-w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer truncate"
              >
                <optgroup label="🟢 Concursos Abertos / Edital Publicado">
                  {openExams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.title} ({exam.banca})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🔵 Concursos Confirmados & Autorizados">
                  {confirmedExams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.title} ({exam.banca})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🟡 Concursos Previstos no Orçamento 2026">
                  {predictedExams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.title} ({exam.banca})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🟣 Rumores Quentes & Comissões em Estudo">
                  {rumorExams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.title} ({exam.banca})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="sm:col-span-4 flex flex-col justify-end">
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-3 sm:py-3.5 px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isCalculating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Calculando...</span>
                  </>
                ) : (
                  <>
                    <span>Recalcular Rota 80/20</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Controle Deslizante + Botões Rápidos de Horas Líquidas/Dia (Mobile Friendly) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-dark-card/80 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="calculator-hours-slider" className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Horas líquidas por dia:</span>
              </label>
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white text-xs font-black font-mono">
                {dailyHours}h / dia
              </span>
            </div>

            <input
              id="calculator-hours-slider"
              type="range"
              min={1}
              max={10}
              step={1}
              value={dailyHours}
              onChange={(e) => handleHoursChange(Number(e.target.value))}
              aria-label="Horas líquidas por dia"
              className="w-full accent-indigo-600 cursor-pointer h-2 rounded-lg bg-slate-200 dark:bg-slate-700"
            />

            <div className="grid grid-cols-4 gap-2">
              {[2, 3, 4, 6].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => handleHoursChange(hours)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    dailyHours === hours
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  {hours}h/dia
                </button>
              ))}
            </div>
          </div>

          {/* Quick Presets (Scroll horizontal limpo no mobile) */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">Acesso rápido:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
              {[
                { id: 'exam-inss-2026', label: 'INSS 2026' },
                { id: 'exam-oab-43', label: 'OAB 43º Exame' },
                { id: 'exam-tjsp-2026', label: 'TJ-SP Escrevente' },
                { id: 'exam-pf-2026', label: 'Polícia Federal' },
                { id: 'exam-pcpa-2026', label: 'PC-PA 2026' },
                { id: 'exam-receita-2026', label: 'Receita Federal' },
                { id: 'exam-bb-2026', label: 'Banco do Brasil' },
              ].map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectChange(preset.id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedExamId === preset.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-dark-card border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Calculation Result */}
        {leadResult && (
          <div className="mt-5 sm:mt-8 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-dark-card border border-emerald-500/40 shadow-xl shadow-emerald-500/10 animate-fadeIn space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-200 dark:border-white/10 gap-2.5">
              <div className="min-w-0">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">Diagnóstico: {leadResult.examTitle}</span>
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Banca: <strong className="text-slate-800 dark:text-white">{leadResult.banca}</strong> • ~<strong>{leadResult.daysRemaining} dias</strong> até a prova.
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-black self-start sm:self-auto shrink-0">
                Meta: ~{leadResult.totalHoursNeeded}h ({leadResult.dailyHours}h/dia)
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Disciplinas 80/20 com horas estimadas */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Distribuição 80/20 Recomendada:
                </h4>
                <div className="space-y-3">
                  {leadResult.topSubjectsWithHours.map((sub, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5 shadow-sm">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        <span className="truncate pr-2">{sub.name}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono shrink-0">~{sub.hours}h ({sub.relevance}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400" 
                          style={{ width: `${sub.relevance}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banca Trap Index */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                    <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Perfil de Pegadinhas da {leadResult.banca}:</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                    {leadResult.bancaTrapIndex}
                  </p>
                </div>

                <button
                  onClick={onStartEdital}
                  className="mt-5 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
                >
                  <span>Abrir Ciclo Completo deste Edital no App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
