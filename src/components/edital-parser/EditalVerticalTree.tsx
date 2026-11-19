'use client';

import React from 'react';
import {
  Layers,
  Search,
  ChevronDown,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { ExamSubject } from '@/lib/types';
import { getStatusColor } from '@/lib/utils';

interface EditalVerticalTreeProps {
  filteredSubjects: ExamSubject[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  expandedSubject: string | null;
  setExpandedSubject: (id: string | null) => void;
}

export const EditalVerticalTree: React.FC<EditalVerticalTreeProps> = ({
  filteredSubjects,
  searchTerm,
  setSearchTerm,
  expandedSubject,
  setExpandedSubject,
}) => {
  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>Conteúdo Programático Verticalizado com Diagnóstico</span>
        </h3>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filtrar por tópico ou lei..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-400 font-medium"
          />
        </div>
      </div>

      {/* Subjects Accordion / List */}
      <div className="space-y-4">
        {filteredSubjects.map((sub) => (
          <div
            key={sub.id}
            className="glass-panel bg-white/80 dark:bg-dark-card/60 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm"
          >
            {/* Subject Header */}
            <div
              onClick={() => setExpandedSubject(expandedSubject === sub.id ? null : sub.id)}
              className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs border border-indigo-500/20">
                  P{sub.weight}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{sub.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {sub.topics.length} tópicos mapeados • Peso {sub.weight} ({sub.relevancePercentage}% da prova)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  Frequência {sub.topics[0]?.frequencyInBanca || 'Alta'}
                </span>
                {expandedSubject === sub.id ? (
                  <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                )}
              </div>
            </div>

            {/* Topics Breakdown */}
            {expandedSubject === sub.id && (
              <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-dark-surface/50">
                <div className="grid grid-cols-1 gap-2.5 mt-2">
                  {sub.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-500/40 transition-colors shadow-sm"
                    >
                      <div className="max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{topic.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(topic.status)}`}>
                            {topic.status}
                          </span>
                        </div>

                        {topic.articlesOrLaws && topic.articlesOrLaws.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {topic.articlesOrLaws.map((law, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-mono inline-flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3 text-indigo-500 shrink-0" />
                                <span>{law}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {topic.accuracyRate !== undefined && (
                          <div className="text-right">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Proficiência</p>
                            <p
                              className={`text-xs font-bold ${
                                topic.accuracyRate >= 70 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
                              }`}
                            >
                              {topic.accuracyRate}%
                            </p>
                          </div>
                        )}

                        <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium whitespace-nowrap">
                          Incidência {topic.frequencyInBanca}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
