import React, { useState, useMemo } from 'react';
import { Crown, CheckCircle2, XCircle, Flame, Sparkles, ArrowRight, ShieldCheck, Target, ChevronDown, QrCode, CreditCard, Lock, Zap } from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';
import { INITIAL_EXAMS } from '@/lib/mockData';
import { GoogleAIEngineBadge } from '@/components/GoogleAIEngineBadge';

interface LandingPricingProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
  onOpenPricing?: () => void;
}

export const LandingPricing: React.FC<LandingPricingProps> = ({
  onSelectPlan,
  onOpenPricing,
}) => {
  const [selectedLaunchExam, setSelectedLaunchExam] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('argus_target_exam');
      if (saved && INITIAL_EXAMS.some((e) => e.title === saved)) return saved;
    }
    return INITIAL_EXAMS[0]?.title || 'INSS - Técnico do Seguro Social';
  });

  const groupedExams = useMemo(() => {
    return {
      publicado: INITIAL_EXAMS.filter((e) => e.status === 'publicado'),
      confirmado: INITIAL_EXAMS.filter((e) => e.status === 'confirmado'),
      previsto: INITIAL_EXAMS.filter((e) => e.status === 'previsto' || !e.status),
      rumor: INITIAL_EXAMS.filter((e) => e.status === 'rumor'),
    };
  }, []);
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="pricing">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-sm font-bold mb-4 shadow-sm">
          <Crown className="w-4 h-4 fill-amber-500 dark:fill-amber-400" />
          <span>Investimento no seu cargo público</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white leading-tight">
          Planos Simples e Transparentes
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
          Cancele a qualquer momento com 1 clique. Garantia incondicional de 7 dias com reembolso integral.
        </p>
      </div>

      {/* BANNER VIP OFERTA FECHADA DE LANÇAMENTO (R$ 97) */}
      <div className="preserve-dark mb-14 relative overflow-hidden rounded-3xl p-5 sm:p-10 bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white shadow-2xl shadow-orange-500/25 border border-orange-400/40">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <Flame className="w-4 h-4 fill-current text-yellow-300" />
                Lote 1 Exclusivo • Primeiros 200 Alunos
              </span>
              <span className="text-xs text-yellow-200 font-extrabold bg-black/30 px-3 py-1 rounded-full">
                Restam apenas 38 vagas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-md bg-white/20 text-yellow-200 text-[11px] font-black uppercase tracking-wider">
                🎯 1 Concurso à Sua Escolha • Sem Mensalidade
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Passe Até a Prova: Acesso Total Sem Mensalidades
            </h3>
            <p className="text-orange-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Pague uma única vez <strong className="text-white">R$ 97</strong> e tenha preparação cirúrgica focada no concurso que você escolher até o dia do exame. Sem mensalidades, sem renovação surpresa e com todas as ferramentas de IA ativas.
            </p>
            {/* Seletor Menu Suspenso do Edital-Alvo */}
            <div className="pt-2 space-y-2 max-w-xl">
              <label htmlFor="landing-pass-exam-select" className="text-xs font-bold text-orange-100 uppercase tracking-wide flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-yellow-300" />
                <span>Selecione o concurso exclusivo do seu Passe de R$ 97:</span>
              </label>
              <div className="relative">
                <select
                  id="landing-pass-exam-select"
                  value={selectedLaunchExam}
                  onChange={(e) => {
                    setSelectedLaunchExam(e.target.value);
                    try {
                      localStorage.setItem('argus_target_exam', e.target.value);
                    } catch {}
                  }}
                  aria-label="Selecione o concurso para o Passe de R$ 97"
                  style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
                  className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-lg border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                >
                  <optgroup label="🟢 Editais Abertos / Publicados">
                    {groupedExams.publicado.map((exam) => (
                      <option key={exam.id} value={exam.title}>
                        {exam.title} ({exam.banca})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🔵 Concursos Confirmados & Autorizados">
                    {groupedExams.confirmado.map((exam) => (
                      <option key={exam.id} value={exam.title}>
                        {exam.title} ({exam.banca})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🟡 Concursos Previstos 2026">
                    {groupedExams.previsto.map((exam) => (
                      <option key={exam.id} value={exam.title}>
                        {exam.title} ({exam.banca})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🟣 Rumores Quentes & Comissões">
                    {groupedExams.rumor.map((exam) => (
                      <option key={exam.id} value={exam.title}>
                        {exam.title} ({exam.banca})
                      </option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown className="w-5 h-5 text-orange-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-orange-100/95 flex items-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                <span>O Passe R$ 97 fica vinculado exclusivamente ao concurso escolhido acima. Para múltiplos concursos simultâneos, escolha o Plano PRO, VIP ou Vitalício.</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold pt-2 text-orange-200">
              <div className="w-48 sm:w-60 bg-black/30 rounded-full h-3 overflow-hidden border border-white/20">
                <div className="bg-yellow-300 h-full rounded-full transition-all duration-1000" style={{ width: '81%' }} />
              </div>
              <span>162 / 200 vagas preenchidas</span>
            </div>
          </div>

          <div className="text-left lg:text-right shrink-0 space-y-3 pt-2 lg:pt-0">
            <div>
              <p className="text-xs font-bold text-orange-200">Taxa única sem mensalidade</p>
              <div className="flex items-baseline lg:justify-end gap-1">
                <span className="text-5xl font-black text-white">R$ 97,00</span>
                <span className="text-xs font-bold text-orange-200">/ dose única</span>
              </div>
              <p className="text-xs text-orange-100 font-bold flex items-center lg:justify-end gap-2 mt-1">
                <span className="inline-flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded-md"><QrCode className="w-3 h-3 text-emerald-300" /> Pix Imediato</span>
                <span className="inline-flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded-md"><CreditCard className="w-3 h-3 text-yellow-300" /> Cartão</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.setItem('argus_target_exam', selectedLaunchExam);
                } catch {}
                onSelectPlan('lancamento');
              }}
              style={{ backgroundColor: '#ffffff', color: '#ea580c' }}
              className="w-full lg:w-auto px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-black text-sm sm:text-base tracking-wide shadow-xl shadow-black/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span style={{ color: '#ea580c' }} className="truncate max-w-[260px] sm:max-w-none">Garantir Passe ({selectedLaunchExam.split(' - ')[0]}) por R$ 97</span>
              <ArrowRight className="w-5 h-5 shrink-0" style={{ color: '#ea580c' }} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch relative z-10">
        
        {/* Glow de Fundo (Atrás dos cards) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/10 dark:bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        {/* Card 1: Passe 30 Dias (Desafio 30 Dias / Edital Travado) */}
        <div className="group bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between border border-slate-200/60 dark:border-white/5 hover:border-orange-400 dark:hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Acesso Até a Prova</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              Passe 30 Dias
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Foco cirúrgico em 1 concurso específico até a prova
            </p>
            
            <div className="mt-8 mb-8 flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900 dark:text-white">R$ 97</span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">/ taxa única</span>
            </div>

            <ul className="space-y-4 text-sm font-medium text-slate-700 dark:text-slate-300 border-t border-slate-200/60 dark:border-white/5 pt-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span><strong>1 Edital Travado</strong> de sua escolha até a prova</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Banco de 260+ Questões Oficiais com gabaritos</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Diagnósticos de Pegadinhas com IA</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Edital Verticalizado 80/20 &amp; Rota de Carga Horária</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Caderno de Erros com Repetição Espaçada SM-2</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('lancamento')}
            className="mt-10 w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-base transition-all duration-300 shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 transform hover:scale-[1.02] cursor-pointer"
          >
            Garantir Passe por R$ 97
          </button>
        </div>

        {/* Plano Gabarito Pro (Mais Popular) */}
        <div className="relative bg-white dark:bg-[#0b101b] p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between transform lg:-translate-y-6 z-20 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15)] transition-transform duration-500 hover:-translate-y-8">
          
          {/* Borda Gradiente via Pseudo-elemento */}
          <div className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-b from-indigo-500 via-blue-500 to-cyan-400 -z-10" />
          <div className="absolute inset-[2px] rounded-[calc(2rem-2px)] bg-white dark:bg-[#0d1321] -z-10" />

          {/* Badge Recomendado */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white text-[10px] sm:text-xs font-bold shadow-[0_0_20px_rgba(99,102,241,0.5)] whitespace-nowrap flex items-center gap-1.5 border border-white/20">
            <Crown className="w-3.5 h-3.5" />
            Recomendado por aprovados
          </div>

          <div>
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              Gabarito Pro
            </h3>
            <div className="pt-1 pb-1">
              <GoogleAIEngineBadge variant="card" modelName="Gemini 3.8 Flash + Deep" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">O Copiloto Cognitivo de Alta Performance</p>
            
            <div className="mt-8 mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">R$ 49<span className="text-3xl text-slate-400">,00</span></span>
                <span className="text-sm font-bold text-slate-400">/ mês</span>
              </div>
              <div className="inline-flex items-center gap-2 mt-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  De R$ 99/mês • 51% OFF no Anual (R$ 588/ano)
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-sm font-semibold text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-white/5 pt-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Editais Ilimitados em todo o Brasil:</strong> Análise verticalizada e rota 80/20 de quantos concursos quiser simultaneamente</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Diagnóstico Cognitivo:</strong> Classificação dos 4 tipos de falha</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Cronograma Adaptativo:</strong> Recalibra carga horária sem quebra</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Heatmap Analítico</strong> de pontos cegos e lei seca cobrada</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Flashcards SRS Automáticos</strong> (Repetição Espaçada)</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              onSelectPlan('pro');
              onOpenPricing?.();
            }}
            className="mt-10 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:via-blue-500 hover:to-cyan-400 text-white font-black text-base tracking-wide transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(99,102,241,0.8)] transform hover:scale-[1.02]"
          >
            Assinar Plano Pro
          </button>
        </div>

        {/* Plano Elite / Mentoria IA */}
        <div className="group bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between border border-slate-200/60 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">Elite & Discursivas</h3>
            <div className="pt-1 pb-1">
              <GoogleAIEngineBadge variant="card" modelName="Gemini 4 Carbon Frontier" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Carreiras Jurídicas, Fiscais, OAB e Tribunais</p>
            
            <div className="mt-8 mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">R$ 89<span className="text-3xl text-slate-400">,00</span></span>
                <span className="text-sm font-bold text-slate-400">/ mês</span>
              </div>
              <div className="inline-flex items-center gap-2 mt-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                  De R$ 189/mês • 53% OFF no Anual (R$ 1.068/ano)
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-sm font-medium text-slate-700 dark:text-slate-300 border-t border-slate-200/60 dark:border-white/5 pt-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Tudo do Plano Pro incluído</strong> com acesso irrestrito</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Estúdio de Discursivas:</strong> Correção de peças e redações por IA</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Espelho Oficial da Banca:</strong> Critérios Cebraspe, FGV, FCC, OAB</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Previsor Preditivo</strong> de nota de corte por microrregião</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-900 dark:text-white">Acesso Mobile VIP:</strong> Sincronização offline no app nativo</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              onSelectPlan('elite');
              onOpenPricing?.();
            }}
            className="mt-10 w-full py-4 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-extrabold text-base transition-all duration-300 group-hover:border-amber-400 dark:group-hover:border-amber-500/50 group-hover:text-amber-600 dark:group-hover:text-amber-400 shadow-sm group-hover:shadow-md"
          >
            Assinar Plano Elite
          </button>
        </div>

      </div>

      {/* CARD VIP: PLANO BLACK VITALÍCIO */}
      <div className="preserve-dark mt-12 relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-2 border-amber-500/50 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 fill-amber-300" />
              <span>Acesso Até a Posse • Edição Black</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-sm">
              Plano Black Vitalício
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              Pague uma única vez e nunca mais compre cursos ou plataformas. Tenha acesso perpétuo irrestrito a todas as ferramentas, IAs e atualizações até ser nomeado no Diário Oficial.
            </p>
          </div>

          <div className="text-left lg:text-right shrink-0 space-y-3">
            <div>
              <p className="text-xs font-bold text-amber-400">12x de R$ 149,70 sem juros</p>
              <div className="flex items-baseline lg:justify-end gap-1">
                <span className="text-4xl font-black text-white">R$ 1.497</span>
                <span className="text-xs font-bold text-amber-400">/ único</span>
              </div>
              <p className="text-[11px] text-amber-200/90 font-medium">ou R$ 197/mês no plano recorrente</p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectPlan('black');
                onOpenPricing?.();
              }}
              className="w-full lg:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Garantir Acesso Vitalício Black</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
