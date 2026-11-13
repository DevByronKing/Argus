'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Crown, 
  ArrowRight, 
  Layers, 
  Brain, 
  Flame, 
  BookOpen, 
  FileEdit, 
  Swords, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  ExternalLink, 
  Lock, 
  Check, 
  Share2, 
  Download,
  Compass,
  Zap,
  Target
} from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';

interface PostPaymentWelcomeTabProps {
  plan: SubscriptionPlan;
  onNavigateTab: (tab: string) => void;
  showToast: (msg: string) => void;
}

export const PostPaymentWelcomeTab: React.FC<PostPaymentWelcomeTabProps> = ({
  plan,
  onNavigateTab,
  showToast,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const lockedExamTitle = typeof window !== 'undefined' 
    ? localStorage.getItem('argus_locked_exam_title') || localStorage.getItem('argus_target_exam') || 'INSS - Técnico do Seguro Social'
    : 'INSS - Técnico do Seguro Social';

  const orderId = typeof window !== 'undefined'
    ? localStorage.getItem('argus_last_order_id') || `ARG-${Math.floor(100000 + Math.random() * 900000)}`
    : 'ARG-2026';

  const planTitles: Record<SubscriptionPlan, { name: string; tag: string; badgeColor: string }> = {
    aspirante: { name: 'Aspirante Gratuito', tag: 'Acesso Básico', badgeColor: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
    lancamento: { name: 'Passe Até a Prova (Lote 1)', tag: 'Acesso Exclusivo sem Mensalidade', badgeColor: 'bg-orange-500/15 text-orange-500 border-orange-500/30' },
    pro: { name: 'Gabarito PRO (Copiloto Cognitivo)', tag: 'Mais Escolhido • Acesso Ilimitado', badgeColor: 'bg-blue-500/15 text-blue-500 border-blue-500/30' },
    elite: { name: 'ELITE VIP & Discursivas', tag: 'Carreiras Jurídicas & Tribunais', badgeColor: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
    black: { name: 'BLACK VITALÍCIO (Até a Posse)', tag: 'Acesso Perpétuo Vitalício', badgeColor: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black border-amber-400/50' }
  };

  const currentPlanMeta = planTitles[plan] || planTitles.pro;

  const handleCopyReceipt = () => {
    try {
      const receiptText = `🎓 Matrícula Confirmada no Argus!\nPlano: ${currentPlanMeta.name}\nNúmero do Pedido: #${orderId}\nData: ${new Date().toLocaleDateString('pt-BR')}\nConcurso-Alvo: ${lockedExamTitle}\nAcesse seu cockpit: https://argus-edu.vercel.app`;
      navigator.clipboard.writeText(receiptText);
      setCopiedLink(true);
      showToast('Comprovante de matrícula copiado!');
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      showToast('Erro ao copiar.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fadeIn">
      
      {/* HERO COM EFEITO DE CELEBRAÇÃO & BOAS-VINDAS */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-indigo-500/30 text-white p-8 sm:p-12 shadow-2xl shadow-indigo-950/40">
        
        {/* Glows Decorativos de Fundo */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Matrícula Confirmada com Sucesso</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Parabéns, Guerreiro(a)! <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Sua jornada rumo à posse começou.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Muito obrigado por confiar no <strong>Argus</strong> como seu copiloto cognitivo. A partir deste segundo, você não estuda mais no escuro: as pegadinhas psicométricas das bancas examinadoras serão desarmadas com rigor científico e IA de alta precisão.
          </p>

          {/* Card Resumo do Pedido / Plano Ativado */}
          <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${currentPlanMeta.badgeColor}`}>
                {currentPlanMeta.name}
              </span>
              <p className="font-mono text-xs text-slate-400 pt-1">
                Matrícula: <strong className="text-white">#{orderId}</strong> &bull; Status: <span className="text-emerald-400 font-bold">Ativo & Liberado</span>
              </p>
              {plan === 'lancamento' && (
                <p className="text-xs text-orange-300 font-bold flex items-center gap-1 pt-0.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>Edital Vinculado: <strong>{lockedExamTitle}</strong> (Acesso até a prova)</span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copiado!' : 'Compartilhar Matrícula'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('edital')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <span>Acessar Meu Edital</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* SEÇÃO 1: O QUE VOCÊ PODE USAR A PARTIR DE AGORA */}
      <div className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ecossistema Desbloqueado</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            O Que Você Pode Usar a Partir de Agora
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Seus módulos de cognição acelerada já foram ativados na sua conta. Conheça as ferramentas essenciais:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Edital Verticalizado */}
          <div 
            onClick={() => onNavigateTab('edital')}
            className="p-6 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center justify-between">
              <span>Edital Verticalizado 80/20</span>
              <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Estruturação matemática do conteúdo programático, com pesos e relevância real na banca examinadora.
            </p>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 inline-block">
              Desarmar edital agora &rarr;
            </span>
          </div>

          {/* Card 2: Caderno de Erros Inteligente */}
          <div 
            onClick={() => onNavigateTab('mistakes')}
            className="p-6 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 hover:border-rose-500/50 dark:hover:border-rose-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center justify-between">
              <span>Caderno de Erros & Revanche</span>
              <ArrowRight className="w-4 h-4 text-rose-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Repetição espaçada com algoritmo SM-2. Todo erro é classificado em 4 tipos para você nunca mais cair na mesma pegadinha.
            </p>
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 inline-block">
              Ver Caderno Inteligente &rarr;
            </span>
          </div>

          {/* Card 3: Arena de Combate / Simulador */}
          <div 
            onClick={() => onNavigateTab('simulator')}
            className="p-6 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <Swords className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center justify-between">
              <span>Arena de Combate 60/40</span>
              <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Baterias cirúrgicas com 25.000+ questões oficiais Cebraspe, FGV, Vunesp e FCC com gabaritos comentados por IA.
            </p>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 inline-block">
              Iniciar bateria rápida &rarr;
            </span>
          </div>

          {/* Card 4: Smart Vade Mecum */}
          <div 
            onClick={() => onNavigateTab('vademecum')}
            className="p-6 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center justify-between">
              <span>Smart Vade Mecum (Radar)</span>
              <ArrowRight className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mapeamento dos artigos de lei seca com 80% de incidência real cobrados pelas bancas nos últimos 5 anos.
            </p>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 inline-block">
              Consultar artigos quentes &rarr;
            </span>
          </div>

          {/* Card 5: Estúdio de Discursivas */}
          <div 
            onClick={() => onNavigateTab('discursivas')}
            className="p-6 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <FileEdit className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center justify-between">
              <span>Estúdio de Discursivas & Peças</span>
              <ArrowRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Correção de redações e peças práticas com critérios de espelho oficial da Cebraspe, FGV e Exame de Ordem (OAB).
            </p>
            <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 inline-block">
              Simular redação &rarr;
            </span>
          </div>

          {/* Card 6: Ciclos Adaptativos Meirelles */}
          <div 
            onClick={() => onNavigateTab('cycle')}
            className="p-6 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center justify-between">
              <span>Ciclo Adaptativo (Meirelles)</span>
              <ArrowRight className="w-4 h-4 text-cyan-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Cronograma flexível que recalibra sua carga horária semanal conforme sua precisão em cada matéria.
            </p>
            <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 inline-block">
              Configurar meu ciclo &rarr;
            </span>
          </div>

        </div>
      </div>

      {/* SEÇÃO 2: DICAS DE OURO DOS PRIMEIROS 15 MINUTOS */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-900/80 dark:to-blue-950/20 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Guia Prático de Aceleração</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Trilha dos Primeiros 15 Minutos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Siga estes 4 passos estratégicos para extrair o máximo de retenção desde o primeiro dia:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5 space-y-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">1</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Defina seu Edital</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Acesse a aba <strong>Editais</strong> e confirme seu concurso-alvo para que toda a IA seja calibrada com a banca correta.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5 space-y-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">2</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Bateria Diagnóstica</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Resolva 10 questões rápidas na <strong>Arena</strong>. A IA mapeará seus pontos cegos psicométricos instantaneamente.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5 space-y-2">
            <span className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs">3</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Ative a Revanche</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ao errar uma questão, clique no <strong>Modo Revanche</strong> no Caderno de Erros para programar sua revisão SM-2.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/5 space-y-2">
            <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">4</span>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Conecte com o Time</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Salve o WhatsApp oficial do suporte para tirar dúvidas e acompanhe nossos canais no Instagram e TikTok.
            </p>
          </div>

        </div>
      </div>

      {/* SEÇÃO 3: CANAIS OFICIAIS, SUPORTE E COMUNIDADE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* WhatsApp VIP */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">Suporte VIP via WhatsApp</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">(91) 98164-6532 • Online</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Dúvidas sobre o funcionamento das IAs, editais ou pagamento? Nossa equipe pedagógica atende de Segunda a Sábado das 08h às 22h.
            </p>
          </div>

          <a
            href="https://wa.me/5591981646532?text=Ol%C3%A1%2C%20acabei%20de%20assinar%20o%20Argus%20e%20gostaria%20de%20um%20suporte%20inicial!"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Falar com Especialista no WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* E-mail e Redes Oficiais */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">E-mail Oficial & Redes</h3>
                <a href="mailto:argus.education.tech@gmail.com" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  argus.education.tech@gmail.com
                </a>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Siga os perfis oficiais do Argus para receber resoluções diárias de questões e alertas quentes de bancas:
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://instagram.com/argus_education"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 font-bold text-xs flex items-center gap-1.5 hover:bg-pink-500/20 transition-all"
              >
                <span>Instagram: @argus_education</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://tiktok.com/@argus.app"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <span>TikTok: @argus.app</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>🛡️ Garantia incondicional de 7 dias (CDC)</span>
            <span>Cancele a qualquer momento com 1 clique</span>
          </div>
        </div>

      </div>

      {/* BOTÃO CTA FINAL DE ENTRADA NO APP */}
      <div className="text-center pt-4 pb-8">
        <button
          type="button"
          onClick={() => onNavigateTab('dashboard')}
          className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-black text-sm sm:text-lg tracking-wide shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 fill-white shrink-0" />
          <span>Acessar Meu Cockpit de Estudos Agora</span>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </button>
      </div>

    </div>
  );
};
