'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Database,
  Lock,
  ArrowLeft,
  RefreshCw,
  FileUp,
  KeyRound,
  AlertTriangle,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { AdminQuestionIngestModal } from '@/components/AdminQuestionIngestModal';
import { AuthModal } from '@/components/AuthModal';

interface AuditLogItem {
  id: string;
  event_type: string;
  severity: string;
  source_ip: string;
  actor_email?: string;
  route?: string;
  details?: Record<string, unknown>;
  created_at: string;
}

export default function AdminPortalPage() {
  const { token, user } = useAuthStore();
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authMethod, setAuthMethod] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dbLogs, setDbLogs] = useState<AuditLogItem[]>([]);
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const verifyAndLoadAdminData = useCallback(
    async (explicitAdminKey?: string) => {
      setIsChecking(true);
      setErrorMsg(null);
      try {
        const headers: Record<string, string> = {};
        if (token && !token.startsWith('jwt_mock_')) {
          headers.Authorization = `Bearer ${token}`;
        }
        const keyToUse = explicitAdminKey ?? adminKeyInput;
        if (keyToUse.trim()) {
          headers['x-admin-key'] = keyToUse.trim();
        }

        const sessionRes = await fetch('/api/admin/session', { headers });
        const sessionData = await sessionRes.json();

        if (!sessionRes.ok || !sessionData.isAdmin) {
          setIsAuthorized(false);
          setErrorMsg(
            sessionData.error ||
              'Acesso negado: esta conta não está cadastrada em ADMIN_EMAILS, ADMIN_USER_IDS ou admin_allowlist no servidor.'
          );
          return;
        }

        setIsAuthorized(true);
        setAuthMethod(sessionData.method || 'server_allowlist');
        setAdminEmail(sessionData.email || user?.email || null);

        const logsRes = await fetch('/api/admin/audit-logs', { headers });
        const logsData = await logsRes.json();
        if (logsRes.ok && logsData.success) {
          setDbLogs(Array.isArray(logsData.dbLogs) ? logsData.dbLogs : []);
        }
      } catch {
        setIsAuthorized(false);
        setErrorMsg('Falha de comunicação ao validar permissões administrativas no servidor.');
      } finally {
        setIsChecking(false);
      }
    },
    [token, adminKeyInput, user?.email]
  );

  useEffect(() => {
    void verifyAndLoadAdminData();
  }, [verifyAndLoadAdminData]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050814] text-slate-900 dark:text-slate-100 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Argus</span>
            </Link>
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                <span>Portal Administrativo & Segurança (SecOps)</span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Autorização exclusiva via validação JWT + Allowlist no servidor / ADMIN_API_KEY
              </p>
            </div>
          </div>

          {isAuthorized && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsIngestOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <FileUp className="w-4 h-4" />
                <span>Ingestão de Provas Oficiais</span>
              </button>
              <button
                type="button"
                onClick={() => verifyAndLoadAdminData()}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Atualizar</span>
              </button>
            </div>
          )}
        </div>

        {isChecking ? (
          <div className="rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-10 text-center text-sm font-semibold text-slate-500">
            Validando credenciais administrativas diretamente no servidor...
          </div>
        ) : !isAuthorized ? (
          <div className="rounded-3xl bg-white dark:bg-[#0b1022] border border-rose-200 dark:border-rose-500/30 p-6 sm:p-8 max-w-2xl mx-auto space-y-5 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Acesso Restrito à Administração
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {errorMsg}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <p className="font-bold text-slate-800 dark:text-white">
                Como liberar seu usuário como Admin:
              </p>
              <p>
                1. Defina <code className="font-mono font-bold">ADMIN_EMAILS</code> ou{' '}
                <code className="font-mono font-bold">ADMIN_USER_IDS</code> nas variáveis de ambiente do servidor e faça login com sua conta Supabase.
              </p>
              <p>
                2. Ou cadastre seu UUID/e-mail na tabela{' '}
                <code className="font-mono font-bold">public.admin_allowlist</code> pelo SQL Editor do Supabase.
              </p>
              <p>
                3. Alternativamente, informe abaixo sua <code className="font-mono font-bold">ADMIN_API_KEY</code> para acesso via chave de servidor:
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void verifyAndLoadAdminData(adminKeyInput);
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={adminKeyInput}
                  onChange={(e) => setAdminKeyInput(e.target.value)}
                  placeholder="Cole sua ADMIN_API_KEY (apenas em sessão atual)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                />
              </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black cursor-pointer"
                >
                  Validar Chave Admin
                </button>
              </form>

              <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Já está cadastrado em <code className="font-mono">ADMIN_EMAILS</code> ou <code className="font-mono">admin_allowlist</code>?
                </span>
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white text-xs font-black cursor-pointer"
                >
                  Entrar com Minha Conta
                </button>
              </div>
            </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-4">
                <div className="text-[11px] font-bold uppercase text-slate-400">Identidade Verificada</div>
                <div className="text-sm font-black mt-1 truncate">{adminEmail || 'Chave de Servidor (ADMIN_API_KEY)'}</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                  Método: {authMethod}
                </div>
              </div>
              <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-4">
                <div className="text-[11px] font-bold uppercase text-slate-400">Logs de Auditoria (DB)</div>
                <div className="text-2xl font-black mt-1">{dbLogs.length}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Eventos recentes em security_audit_logs
                </div>
              </div>
              <div className="rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-4">
                <div className="text-[11px] font-bold uppercase text-slate-400">Ingestão de Provas</div>
                <button
                  type="button"
                  onClick={() => setIsIngestOpen(true)}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-bold cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Abrir Modal de Ingestão PDF</span>
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-black">Eventos Persistidos de Segurança (`public.security_audit_logs`)</h2>
              </div>
              {dbLogs.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-slate-400" />
                  <span>Nenhum evento crítico persistido no PostgreSQL até o momento (ou Supabase service_role offline).</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 uppercase text-[10px]">
                      <tr>
                        <th className="px-4 py-3">Data</th>
                        <th className="px-4 py-3">Evento</th>
                        <th className="px-4 py-3">Severidade</th>
                        <th className="px-4 py-3">IP</th>
                        <th className="px-4 py-3">Rota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dbLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="px-4 py-3 font-mono text-[11px]">{log.created_at}</td>
                          <td className="px-4 py-3 font-bold">{log.event_type}</td>
                          <td className="px-4 py-3">{log.severity}</td>
                          <td className="px-4 py-3 font-mono">{log.source_ip}</td>
                          <td className="px-4 py-3 font-mono">{log.route || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AdminQuestionIngestModal
        isOpen={isIngestOpen}
        onClose={() => setIsIngestOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          void verifyAndLoadAdminData();
        }}
      />
    </div>
  );
}
