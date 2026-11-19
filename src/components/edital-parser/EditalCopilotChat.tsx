'use client';

import React, { useState, useRef } from 'react';
import { Bot, FileText, Send } from 'lucide-react';
import { ExamNotice } from '@/lib/types';

export interface EditalChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  itemReference?: string;
  timestamp: string;
}

interface EditalCopilotChatProps {
  selectedExam: ExamNotice;
}

export const EditalCopilotChat: React.FC<EditalCopilotChatProps> = ({ selectedExam }) => {
  const [editalQuestion, setEditalQuestion] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [editalChatMessages, setEditalChatMessages] = useState<EditalChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Olá! Eu sou o Copiloto Cognitivo Argus, calibrado especificamente para o certame de **${selectedExam.role}** (${selectedExam.institution} • Banca **${selectedExam.banca}**).\n\nConheço todas as regras deste edital, pesos de disciplinas, critérios de pontuação e também posso comparar com qualquer outro concurso da plataforma (TRT 2, TJ-SP, INSS, PRF, PF, Receita Federal, OAB).\n\nComo posso orientar sua estratégia de aprovação hoje?`,
      itemReference: `${selectedExam.institution} • Edital Consolidado`,
      timestamp: 'Sistema',
    },
    {
      id: 'msg-tip-1',
      sender: 'assistant',
      text: `🎯 **Dica Estratégica 80/20 (${selectedExam.banca}):**\nAs matérias de maior peso neste edital são ${selectedExam.subjects.map((s) => `**${s.name}** (Peso ${s.weight})`).slice(0, 2).join(' e ')}. Juntas, elas compõem ${selectedExam.subjects.slice(0, 2).reduce((acc, s) => acc + s.relevancePercentage, 0)}% da nota de corte da prova objetiva.`,
      itemReference: 'Quadro Estatístico de Provas Objetivas',
      timestamp: 'Estratégia',
    },
  ]);

  React.useEffect(() => {
    setEditalChatMessages([
      {
        id: `msg-welcome-${selectedExam.id}`,
        sender: 'assistant',
        text: `Olá! Eu sou o Copiloto Cognitivo Argus, calibrado especificamente para o certame de **${selectedExam.role}** (${selectedExam.institution} • Banca **${selectedExam.banca}**).\n\nConheço todas as regras deste edital, pesos de disciplinas, critérios de pontuação e também posso comparar com qualquer outro concurso da plataforma (TRT 2, TJ-SP, INSS, PRF, PF, Receita Federal, OAB).\n\nComo posso orientar sua estratégia de aprovação hoje?`,
        itemReference: `${selectedExam.institution} • Edital Consolidado`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: `msg-tip-${selectedExam.id}`,
        sender: 'assistant',
        text: `🎯 **Dica Estratégica 80/20 (${selectedExam.banca}):**\nAs matérias de maior impacto são ${selectedExam.subjects.map((s) => `**${s.name}** (Peso ${s.weight})`).slice(0, 2).join(' e ')}. Juntas, elas compõem ${selectedExam.subjects.slice(0, 2).reduce((acc, s) => acc + s.relevancePercentage, 0)}% da nota de corte da prova objetiva.`,
        itemReference: 'Quadro Estatístico de Provas Objetivas',
        timestamp: 'Estratégia',
      },
    ]);
  }, [selectedExam.id, selectedExam.banca, selectedExam.institution, selectedExam.role, selectedExam.subjects]);

  const handleAskEditalQuestion = async (queryText: string) => {
    const q = queryText.trim();
    if (!q || isAnswering) return;

    const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const userMsg: EditalChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: currentTime,
    };

    setEditalChatMessages((prev) => [...prev, userMsg]);
    setEditalQuestion('');
    setIsAnswering(true);

    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          examContext: selectedExam,
          history: editalChatMessages.slice(-4),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.text || data.reply;
        if (replyText) {
          const botMsg: EditalChatMessage = {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: replyText,
            itemReference: `${selectedExam.institution} • Banca ${selectedExam.banca}`,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          };
          setEditalChatMessages((prev) => [...prev, botMsg]);
          setIsAnswering(false);
          setTimeout(() => {
            chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
          return;
        }
      }
    } catch {}

    setIsAnswering(false);
    const botMsg: EditalChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'assistant',
      text: `📋 **Sobre "${q}" (${selectedExam.role} • ${selectedExam.institution}):**\n• **Banca:** ${selectedExam.banca}\n• **Salário:** ${selectedExam.salary} (${selectedExam.vacancies} vagas)\n• **Matérias principais:** ${selectedExam.subjects.map((s) => s.name).join(', ')}.`,
      itemReference: `${selectedExam.institution} • Edital Consolidado`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setEditalChatMessages((prev) => [...prev, botMsg]);
  };

  return (
    <div className="mt-8 glass-panel bg-white/90 dark:bg-dark-card/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="px-5 sm:px-7 py-4 bg-gradient-to-r from-indigo-600/10 via-blue-600/10 to-transparent border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25 shrink-0">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-[10px] font-black uppercase tracking-wider">
                Copiloto Cognitivo Argus
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Online • Multi-Concursos &amp; {selectedExam.banca}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
              Copiloto Especialista em Editais &amp; Bancas
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calibrado para {selectedExam.role} ({selectedExam.institution}) • Responde sobre todos os certames da plataforma
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setEditalChatMessages([
                {
                  id: 'msg-welcome-reset',
                  sender: 'assistant',
                  text: `Chat reiniciado! Pode me fazer qualquer pergunta sobre as regras, matérias ou pesos do certame de **${selectedExam.role}** (${selectedExam.institution}) ou pedir comparativos com outros concursos (TRT, TJ-SP, PRF, PF, INSS, Receita, OAB).`,
                  itemReference: `${selectedExam.institution} • Edital Consolidado`,
                  timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                },
              ])
            }
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            title="Limpar histórico de mensagens"
          >
            Limpar Chat
          </button>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="p-4 sm:p-6 space-y-4 max-h-[460px] overflow-y-auto no-scrollbar">
        {editalChatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 animate-fadeIn ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm ${
                  isUser
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20 rounded-tr-xs'
                    : 'bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-xs rounded-tl-xs space-y-2'
                }`}
              >
                <div className="leading-relaxed font-medium whitespace-pre-line">
                  {msg.text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong
                          key={idx}
                          className={isUser ? 'font-black text-white' : 'font-black text-slate-950 dark:text-white'}
                        >
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    return <React.Fragment key={idx}>{part}</React.Fragment>;
                  })}
                </div>

                <div
                  className={`flex items-center justify-between gap-3 pt-1 text-[10px] ${
                    isUser ? 'text-blue-100/80 justify-end' : 'text-slate-400 border-t border-slate-200/60 dark:border-white/5'
                  }`}
                >
                  {!isUser && msg.itemReference && (
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>{msg.itemReference}</span>
                    </span>
                  )}
                  <span className="font-mono shrink-0">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {isAnswering && (
          <div className="flex items-start gap-3 animate-fadeIn">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>Copiloto Cognitivo Argus consultando regras e base de bancas...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Questions Chips */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-50/60 dark:bg-white/[0.02] border-t border-slate-200/80 dark:border-white/5">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Perguntas Frequentes (Clique para Enviar):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            'Quais os critérios de eliminação e nota mínima?',
            'Como funciona a prova discursiva e pontuação?',
            'Quais as matérias de maior peso na nota?',
            'Qual o salário e benefícios?',
            'Quando será a prova e prazos?',
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleAskEditalQuestion(chip)}
              disabled={isAnswering}
              className="px-3 py-1 rounded-xl bg-white dark:bg-dark-card hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 sm:p-5 bg-white dark:bg-dark-card border-t border-slate-200 dark:border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskEditalQuestion(editalQuestion);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={`Pergunte algo sobre o edital de ${selectedExam.role} (ex: "Exige prática jurídica?", "Tem TAF?", "Critérios de correção da ${selectedExam.banca}")...`}
            value={editalQuestion}
            onChange={(e) => setEditalQuestion(e.target.value)}
            disabled={isAnswering}
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isAnswering || !editalQuestion.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-black shadow-md shadow-indigo-600/20 flex items-center gap-2 shrink-0 transition-all disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
