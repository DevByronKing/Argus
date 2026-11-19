'use client';

import React, { useRef } from 'react';
import {
  UploadCloud,
  X,
  FileUp,
  FileText,
  Check,
  Star,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface EditalUploadModalProps {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  isDragging: boolean;
  examTitleInput: string;
  setExamTitleInput: (val: string) => void;
  bancaInput: 'FGV' | 'Cebraspe' | 'FCC' | 'Vunesp' | 'Outra';
  setBancaInput: (val: 'FGV' | 'Cebraspe' | 'FCC' | 'Vunesp' | 'Outra') => void;
  roleInput: string;
  setRoleInput: (val: string) => void;
  salaryInput: string;
  setSalaryInput: (val: string) => void;
  vacanciesInput: string;
  setVacanciesInput: (val: string) => void;
  uploadText: string;
  setUploadText: (val: string) => void;
  setAsDefaultExam: boolean;
  setSetAsDefaultExam: (val: boolean) => void;
  uploadError: string | null;
  onClose: () => void;
  onFileSelect: (file: File) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EditalUploadModal: React.FC<EditalUploadModalProps> = ({
  uploadedFile,
  setUploadedFile,
  isDragging,
  examTitleInput,
  setExamTitleInput,
  bancaInput,
  setBancaInput,
  roleInput,
  setRoleInput,
  salaryInput,
  setSalaryInput,
  vacanciesInput,
  setVacanciesInput,
  uploadText,
  setUploadText,
  setAsDefaultExam,
  setSetAsDefaultExam,
  uploadError,
  onClose,
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[110] argus-modal-backdrop flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-xl p-6 rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-indigo-500/40 shadow-2xl relative my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">Carregar Novo Edital (PDF ou Documento)</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">A IA lerá seu arquivo e gerará o edital verticalizado em segundos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-dark-card dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {/* Drag and Drop Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Arquivo do Edital (PDF, DOCX ou TXT):
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onFileSelect(e.target.files[0]);
                }
              }}
            />

            {!uploadedFile ? (
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-500/20 scale-[0.99]'
                    : 'border-indigo-400/40 hover:border-indigo-500 bg-indigo-500/5 hover:bg-indigo-500/10'
                }`}
              >
                <FileUp className="w-9 h-9 text-indigo-500 dark:text-indigo-400 mx-auto mb-2 animate-bounce" />
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Arraste e solte seu edital em PDF aqui
                </p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-300/90 mt-1 font-medium">
                  ou clique aqui para buscar nos arquivos do seu computador
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/25 text-[10px] text-indigo-700 dark:text-indigo-300 font-semibold">
                    PDF • DOCX • TXT (até 50MB)
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/25 text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">
                    OCR com IA Integrada
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExamTitleInput('TRF-3 2026 - Analista Judiciário');
                      setBancaInput('FCC');
                      setRoleInput('Analista Judiciário - Área Judiciária');
                      setSalaryInput('R$ 14.852,00');
                      setVacanciesInput('120');
                      setUploadText('Direito Constitucional, Direito Administrativo (Lei 14.133/21 e Lei 8.112/90), Direito Processual Civil, Direito Previdenciário e Direito Tributário.');
                    }}
                    className="px-2.5 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-[10px] text-amber-700 dark:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    Preencher Edital Exemplo (1-Clique)
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[280px]">
                        {uploadedFile.name}
                      </p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1 shrink-0">
                        <Check className="w-3 h-3" /> Anexado
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Tamanho: {formatFileSize(uploadedFile.size)} • Pronto para análise com IA
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-dark-hover border border-slate-200 dark:border-slate-700 text-indigo-300 transition-colors"
                  >
                    Trocar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center transition-colors"
                    title="Remover arquivo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Contest Title / Name */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              Título do Concurso / Órgão:
            </label>
            <input
              type="text"
              value={examTitleInput}
              onChange={(e) => setExamTitleInput(e.target.value)}
              placeholder="Ex: Polícia Federal 2026 - Agente, Receita Federal, OAB 41º..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-500"
            />
          </div>

          {/* Two Column Grid: Banca & Cargo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Banca Examinadora:
              </label>
              <select
                value={bancaInput}
                onChange={(e) => setBancaInput(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white bg-white dark:bg-dark-surface cursor-pointer"
              >
                <option value="Cebraspe" className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white">Cebraspe (Certo / Errado)</option>
                <option value="FGV" className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white">FGV (Múltipla Escolha - 5 Opções)</option>
                <option value="FCC" className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white">FCC (Fundação Carlos Chagas)</option>
                <option value="Vunesp" className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white">Vunesp</option>
                <option value="Outra" className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white">Outra Banca Examinadora</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Cargo Pretendido:
              </label>
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                placeholder="Ex: Agente, Auditor, Técnico..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* Two Column Grid: Salário & Vagas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Remuneração Estimada:
              </label>
              <input
                type="text"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                placeholder="Ex: R$ 9.350,00"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Vagas Previstas:
              </label>
              <input
                type="number"
                value={vacanciesInput}
                onChange={(e) => setVacanciesInput(e.target.value)}
                placeholder="Ex: 250"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* Optional Textarea for Content */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              Anotações ou Conteúdo Programático Específico (Opcional):
            </label>
            <textarea
              rows={3}
              value={uploadText}
              onChange={(e) => setUploadText(e.target.value)}
              placeholder="Se desejar, você também pode colar aqui trechos do edital, matérias específicas ou artigos de lei exigidos pela banca..."
              className="w-full p-3 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-500"
            />
          </div>

          {/* Set as Default Exam Option */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
            <input
              type="checkbox"
              id="setAsDefaultExamCheckbox"
              checked={setAsDefaultExam}
              onChange={(e) => setSetAsDefaultExam(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-white/20 bg-white dark:bg-dark-surface cursor-pointer"
            />
            <label htmlFor="setAsDefaultExamCheckbox" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer flex-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Definir como meu Edital Padrão ativo</span>
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Sincroniza automaticamente o ciclo de estudos semanal, simulados adaptativos e banco de questões para este concurso.
              </span>
            </label>
          </div>

          {/* Error Banner */}
          {uploadError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-300 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all glow-brand"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mapear Edital com IA</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
