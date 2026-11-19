'use client';

import React from 'react';
import { X, Check, ShieldAlert, Zap } from 'lucide-react';
import { VadeMecumArticle, MistakeEntry } from '@/lib/types';
import { getMissedQuestionsForArticle } from './vadeMecumData';

interface VadeMecumBacklinkDrawerProps {
  article: VadeMecumArticle;
  mistakes?: MistakeEntry[];
  onClose: () => void;
  onGoToSimulator: (queryOrTopic?: string) => void;
}

export const VadeMecumBacklinkDrawer: React.FC<VadeMecumBacklinkDrawerProps> = ({
  article,
  mistakes = [],
  onClose,
  onGoToSimulator,
}) => {
  const missedList = getMissedQuestionsForArticle(article, mistakes);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-white dark:bg-[#0e1117] h-full shadow-2xl border-l border-slate-200 dark:border-rose-500/30 flex flex-col justify-between overflow-hidden animate-slideInRight">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-card/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 font-black text-xs border border-rose-500/30">
                Backlink Bidirecional
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Caderno de Erros ↔ Vade Mecum
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-3">
            {article.diploma} — {article.numberStr}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Questões reais das bancas examinadoras onde você errou a aplicação prática deste dispositivo legal. A união entre a lei seca e o Caderno de Erros.
          </p>
        </div>

        {/* Missed Questions List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {missedList.map((mq) => (
            <div
              key={mq.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-card border border-rose-200 dark:border-rose-500/20 space-y-3.5 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-500/30">
                  {mq.banca} • {mq.year}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                  {mq.exam}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-white dark:bg-black/30 p-3.5 rounded-xl border border-slate-200 dark:border-white/5">
                &quot;{mq.snippet}&quot;
              </p>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400">
                  <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    <strong>Você marcou:</strong> {mq.userChose}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    <strong>Gabarito oficial:</strong> {mq.correctAnswer}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 text-xs space-y-1 text-slate-700 dark:text-amber-200/90">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-[11px] uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Armadilha: {mq.distractorType}</span>
                </div>
                <p className="leading-relaxed text-[11px]">{mq.explanation}</p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onGoToSimulator();
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Revanche Imediata</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-card/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Total: {missedList.length} erros mapeados
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 dark:hover:bg-white/20 transition-all"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};
