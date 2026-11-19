'use client';

import React from 'react';
import {
  BrainCircuit,
  HeartHandshake,
  Sparkles,
  Save,
  Shield,
  Download,
  FileSpreadsheet,
  Trash2,
  ShieldCheck,
  Check,
  Lock,
} from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';
import { SupabaseService } from '@/lib/supabaseService';
import { GoogleSignInButton, GoogleIcon } from '@/components/GoogleSignInButton';
import { saveTwoFactorState, TwoFactorState } from '@/lib/twoFactorAuth';

interface UserSettingsSecondaryTabsProps {
  activeSubTab: string;
  currentPlan: SubscriptionPlan;
  aiExplanationStyle: 'direto' | 'socratico' | 'jurisprudencial';
  setAiExplanationStyle: (style: 'direto' | 'socratico' | 'jurisprudencial') => void;
  focusModeEnabled: boolean;
  setFocusModeEnabled: (enabled: boolean) => void;
  highTempModelEnabled: boolean;
  setHighTempModelEnabled: (enabled: boolean) => void;
  onExportData: () => void;
  onClearCache: () => void;
  user: { id: string; name?: string; email: string } | null;
  token: string | null;
  logout: () => void;
  twoFactorState: TwoFactorState;
  setTwoFactorState: (state: TwoFactorState) => void;
  setIs2FaModalOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
}

export const UserSettingsSecondaryTabs: React.FC<UserSettingsSecondaryTabsProps> = ({
  activeSubTab,
  currentPlan,
  aiExplanationStyle,
  setAiExplanationStyle,
  focusModeEnabled,
  setFocusModeEnabled,
  highTempModelEnabled,
  setHighTempModelEnabled,
  onExportData,
  onClearCache,
  user,
  token,
  logout,
  twoFactorState,
  setTwoFactorState,
  setIs2FaModalOpen,
  showToast,
}) => {
  return (
    <>
      {/* ABA 3: PREFERÊNCIAS DA IA & ESTUDO */}
      {activeSubTab === 'ai_preferences' && (
        <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Comportamento do Copiloto Cognitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Ajuste fino da forma como o Gemini 1.5 analisa seus erros e responde suas dúvidas.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Estilo de Feedback nas Questões</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Como a IA deve redigir a justificativa do seu erro.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAiExplanationStyle('direto')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiExplanationStyle === 'direto'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Direto ao Ponto
                </button>
                <button
                  type="button"
                  onClick={() => setAiExplanationStyle('socratico')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiExplanationStyle === 'socratico'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Método Socrático
                </button>
                <button
                  type="button"
                  onClick={() => setAiExplanationStyle('jurisprudencial')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiExplanationStyle === 'jurisprudencial'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Jurisprudencial STF/STJ
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">Modo Foco Extremo de Resolução</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Oculta temporizadores e métricas para simular ambiente real de prova.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={focusModeEnabled}
                  onChange={(e) => setFocusModeEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">Motor de Alta Profundidade (Gemini 1.5 Pro)</p>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-500 border border-amber-500/30">
                    EXCLUSIVO ELITE
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Utiliza a rede neural de maior raciocínio jurídico para discursivas complexas.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  disabled={currentPlan !== 'elite'}
                  checked={highTempModelEnabled && currentPlan === 'elite'}
                  onChange={(e) => setHighTempModelEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    currentPlan === 'elite'
                      ? 'bg-slate-200 dark:bg-slate-700 peer-checked:bg-amber-500 peer-checked:after:translate-x-full'
                      : 'bg-slate-300 dark:bg-slate-800 opacity-50 cursor-not-allowed'
                  }`}
                ></div>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-indigo-500" />
                <span>Avaliação de Produto &amp; Melhoria Contínua</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sua opinião direta orienta o desenvolvimento das próximas ferramentas e calibrações do Argus.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/50 via-indigo-50/40 to-slate-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-slate-900/40 border border-blue-200/60 dark:border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-mono font-bold uppercase">
                    Sean Ellis PMF Test
                  </span>
                  <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Pesquisa de Experiência do Estudante</p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  Conte-nos se a plataforma está sendo indispensável na sua preparação e o que podemos calibrar nos simuladores e no caderno de erros.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-pmf-survey'));
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Responder Pesquisa</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => showToast('Preferências de IA atualizadas!')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Preferências</span>
            </button>
          </div>
        </div>
      )}

      {/* ABA 4: PRIVACIDADE & LGPD */}
      {activeSubTab === 'privacy' && (
        <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              Privacidade de Dados &amp; Conformidade LGPD (Lei nº 13.709/2018)
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Você tem total soberania e controle sobre suas informações, estatísticas de erros e histórico de estudo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Portabilidade de Dados (Art. 18, V)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Baixe um arquivo JSON com todas as suas resoluções, diagnósticos e perfil completo.
              </p>
              <button
                onClick={onExportData}
                className="w-full py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Exportar Meus Dados
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Limpeza de Cache e Histórico Local</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Libere armazenamento temporário do navegador mantendo sua assinatura e guardião intactos.
              </p>
              <button
                onClick={onClearCache}
                className="w-full py-2 px-4 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold text-rose-600 dark:text-rose-400 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Limpar Cache Local
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Segurança de Ponta a Ponta:</strong> Todos os seus dados são criptografados em trânsito (TLS 1.3) e em repouso nos nossos servidores com backup diário no Supabase. O Argus nunca vende seus dados para terceiros.
            </div>
          </div>
        </div>
      )}

      {/* ABA: CONTA & AUTENTICAÇÃO GOOGLE */}
      {activeSubTab === 'account' && (
        <div className="bg-white dark:bg-dark-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Conta &amp; Sincronização em Nuvem</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Conecte sua conta Google para salvar e sincronizar seu histórico em múltiplos dispositivos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white dark:from-blue-950/30 dark:via-slate-900/60 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/40 shadow-xs">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <GoogleIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Autenticação Oficial Google
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Acesso seguro em 1 clique sem necessidade de senhas.
                  </p>
                </div>
              </div>

              {user && user.id !== 'usr_default_demo' && !user.email.includes('argus.app.br') && !user.email.includes('learningai.com.br') ? (
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Vinculado
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 text-xs font-bold">
                  Modo Demonstração
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              Ao vincular sua conta Google, seu Caderno de Erros, histórico de simulados, ofensiva (streak) diária e metas de estudo ficam salvos com backup contínuo na nuvem via Supabase.
            </p>

            {user && user.id !== 'usr_default_demo' && !user.email.includes('argus.app.br') && !user.email.includes('learningai.com.br') ? (
              <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user.name || 'Estudante'}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {user.email}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  Google OAuth2 Ativo
                </span>
              </div>
            ) : (
              <div className="max-w-md">
                <GoogleSignInButton
                  text="Fazer login com Google"
                  variant="standard"
                  size="md"
                  fullWidth
                  onSuccess={() => {
                    showToast('Redirecionando para login seguro no Google...');
                  }}
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                  🔒 Criptografia SSL ponta a ponta via Supabase Auth &amp; Google Cloud.
                </p>
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Sessão Criptografada Ativa
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">E-mail Conectado</span>
                <p className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate">
                  {user?.email || 'aluno@argus.app.br'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">ID de Aluno</span>
                <p className="font-mono text-slate-800 dark:text-slate-200 mt-1 truncate">
                  {user?.id || 'usr_default_demo'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Token de Sessão JWT</span>
              <p className="font-mono text-[11px] text-slate-500 break-all bg-slate-50 dark:bg-slate-900 p-2 rounded-lg">
                {token ? `${token.slice(0, 50)}...` : 'jwt_mock_active_session_argus'}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Autenticação em Dois Fatores (2FA / TOTP)</span>
                    {twoFactorState.enabled ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Ativado
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        Recomendado
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Exige código de 6 dígitos gerado no Google Authenticator ou Authy para login e painéis administrativos.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {twoFactorState.enabled ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIs2FaModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
                    >
                      Ver Códigos
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        saveTwoFactorState({ enabled: false });
                        setTwoFactorState({ enabled: false });
                        showToast('2FA desativado nesta conta.');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold transition-all cursor-pointer"
                    >
                      Desativar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIs2FaModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    Ativar 2FA Agora
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-bold text-slate-800 dark:text-amber-300">Desconectar da Plataforma</p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                Encerra a sessão atual e remove as credenciais locais deste navegador.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                SupabaseService.signOut();
                showToast('Você saiu da sua conta.');
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shrink-0 transition-colors cursor-pointer"
            >
              Sair da Conta
            </button>
          </div>
        </div>
      )}
    </>
  );
};
