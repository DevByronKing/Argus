'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  Mail,
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Eye,
  EyeOff,
  User,
  Zap,
  Check,
  CheckSquare,
  KeyRound
} from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { BrandLogo } from './BrandLogo';
import { TurnstileField } from './TurnstileField';
import { useAuthStore } from '@/store/useAuthStore';
import { SupabaseService } from '@/lib/supabaseService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(defaultMode);
  const [loginMethod, setLoginMethod] = useState<'password' | 'magic'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReset, setTurnstileReset] = useState(0);

  // Verificação de Idade (ECA Digital - Lei 14.811/2024 e LGPD Art. 14)
  const [birthDate, setBirthDate] = useState('');
  const [parentalConsent, setParentalConsent] = useState(false);
  const [guardianName, setGuardianName] = useState('');
  const [guardianContact, setGuardianContact] = useState('');

  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { setAuth } = useAuthStore();

  // Cálculo da idade em tempo real
  const ageCalculation = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }, [birthDate]);

  if (!isOpen) return null;

  // Submissão de Login com E-mail e Senha (Direto via API)
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Informe um e-mail válido para acessar.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Informe sua senha cadastrada.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage('Acesso liberado! Sincronizando seu cockpit...');
        if (data.user) {
          setAuth(
            {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name || email.split('@')[0],
              role: data.user.role || 'student',
            },
            data.session?.accessToken || 'session_token'
          );
        }
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setErrorMessage(data.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
      }
    } catch {
      setErrorMessage('Falha ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submissão de Login via Link Mágico (Supabase)
  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Por favor, informe um e-mail válido.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await SupabaseService.signInWithEmail(email.trim());
      if (result.success) {
        setIsMagicLinkSent(true);
      } else {
        setErrorMessage(result.error || 'Falha ao enviar link de acesso.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erro ao processar login por link mágico.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login de Teste Rápido (1-Click) para avaliação e agilidade
  const handleDemoLogin = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setAuth(
        {
          id: 'demo-student-2026',
          email: 'concurseiro@argus.app',
          name: 'Concurseiro(a) Elite',
          role: 'student',
        },
        'token_demo_aluno_2026'
      );
      setSuccessMessage('Acesso de teste ativado com sucesso!');
      setIsLoading(false);
      setTimeout(() => {
        onClose();
      }, 800);
    }, 400);
  };

  // Recuperação Segura de Senha (Rate Limit + CAPTCHA + anti-enumeração)
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!email || !email.includes('@')) {
      setErrorMessage('Informe um e-mail válido.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const data = await res.json();
      setTurnstileReset((v) => v + 1);
      if (res.ok && data.success) {
        setSuccessMessage(data.message);
      } else {
        setErrorMessage(data.error || 'Não foi possível enviar a recuperação de senha.');
      }
    } catch {
      setErrorMessage('Falha de conexão ao solicitar redefinição de senha.');
    } finally {
      setIsLoading(false);
    }
  };

  // Rodapé legal e envio do formulário
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Informe um e-mail válido.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('A senha deve conter no mínimo 6 caracteres.');
      return;
    }
    if (!birthDate || ageCalculation === null) {
      setErrorMessage('Informe sua data de nascimento para verificação etária (ECA Digital e LGPD).');
      return;
    }
    if (ageCalculation < 16) {
      setErrorMessage('Cadastro restrito a maiores de 16 anos conforme o ECA Digital (Lei 14.811/2024).');
      return;
    }
    if (ageCalculation >= 16 && ageCalculation < 18) {
      if (!parentalConsent || !guardianName.trim() || !guardianContact.trim()) {
        setErrorMessage('Para jovens de 16 a 17 anos, é obrigatório informar o consentimento, nome e contato do responsável legal.');
        return;
      }
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          fullName: fullName.trim() || email.split('@')[0],
          birthDate,
          parentalConsent: ageCalculation >= 18 ? undefined : parentalConsent,
          guardianName: ageCalculation >= 18 ? undefined : guardianName.trim(),
          guardianContact: ageCalculation >= 18 ? undefined : guardianContact.trim(),
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const data = await res.json();
      setTurnstileReset((v) => v + 1);
      if (res.ok && data.success) {
        setSuccessMessage('Conta verificada e criada com sucesso!');
        if (data.user) {
          setAuth(
            {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name || fullName,
              role: 'student',
            },
            data.session?.accessToken || 'token_session'
          );
        }
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setErrorMessage(data.error || 'Falha ao realizar cadastro.');
      }
    } catch {
      setErrorMessage('Erro de conexão ao processar cadastro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 argus-modal-backdrop animate-fadeIn overflow-y-auto">
      
      {/* Container Principal do Modal de Login com Design Luxury */}
      <div
        className="relative w-full max-w-lg rounded-[2.2rem] bg-white dark:bg-[#0b1022] border border-slate-200 dark:border-indigo-500/30 shadow-2xl p-6 sm:p-8 my-8 transition-all overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glows Decorativos de Fundo */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Botão Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer z-20"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Centralizado com Logotipo Íris */}
        <div className="text-center mb-6 relative z-10">
          <div className="flex items-center justify-center mb-3">
            <BrandLogo size={56} showGlow />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Acesso Seguro & Criptografado</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {mode === 'login' ? 'Entre no Cockpit' : 'Crie sua Conta'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500">
              Argus
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
            {mode === 'login'
              ? 'Sincronize seu edital 80/20, simulados, caderno de erros e inteligência artificial.'
              : 'Comece a desarmar a banca examinadora antes da prova com rigor científico.'}
          </p>
        </div>

        {/* Tab Switcher: Login vs Cadastro */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 mb-6 text-xs sm:text-sm font-black">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Entrar na Conta
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Criar Nova Conta
          </button>
        </div>

        {/* Mensagens de Sucesso ou Erro */}
        {errorMessage && (
          <div className="p-3.5 mb-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 mb-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* =========================================================================
            FLUXO DE LOGIN (E-mail + Senha Direto OU Google 1-Click OU Link Mágico)
           ========================================================================= */}
        {mode === 'login' && (
          <div className="space-y-4">
            
            {/* Google 1-Click Login Principal */}
            <GoogleSignInButton
              text="Continuar com o Google"
              size="lg"
              fullWidth
              variant="standard"
              className="py-3 shadow-sm hover:shadow-md border border-slate-200 dark:border-white/10"
              onSuccess={() => {}}
            />

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-[#0b1022] px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                ou com e-mail cadastrado
              </span>
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            </div>

            {/* Alternância: Senha vs Link Mágico */}
            {loginMethod === 'password' ? (
              <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    E-mail:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplo@gmail.com"
                      autoComplete="email"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Senha:
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage(null);
                          setSuccessMessage(null);
                          setMode('forgot');
                        }}
                        className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:underline cursor-pointer"
                      >
                        Esqueci minha senha
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginMethod('magic')}
                        className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        Link Mágico
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer disabled:opacity-50"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{isLoading ? 'Autenticando...' : 'Entrar no Cockpit'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : isMagicLinkSent ? (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fadeIn space-y-2">
                <CheckCircle2 className="w-9 h-9 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  Link de Acesso Enviado!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Verifique a caixa de entrada de <strong className="font-mono text-emerald-600 dark:text-emerald-400">{email}</strong> para entrar com 1 clique.
                </p>
                <button
                  type="button"
                  onClick={() => setIsMagicLinkSent(false)}
                  className="pt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline block mx-auto cursor-pointer"
                >
                  Tentar outro e-mail
                </button>
              </div>
            ) : (
              <form onSubmit={handleMagicLinkSignIn} className="space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Seu e-mail cadastrado:
                    </label>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('password')}
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Prefiro entrar com senha
                    </button>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplo@gmail.com"
                      autoComplete="email"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isLoading ? 'Enviando...' : 'Receber Link Mágico por E-mail'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Botão de Demonstração / Teste Rápido (1-Click) */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Entrar Imediatamente como Aluno Teste (Demo)</span>
              </button>
            </div>

          </div>
        )}

        {/* =========================================================================
            FLUXO DE CADASTRO OFICIAL (Com conformidade ECA Digital & LGPD)
           ========================================================================= */}
        {mode === 'signup' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nome Completo:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo de Souza"
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                E-mail para Acesso:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@provedor.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Crie uma Senha Segura (mínimo 6 dígitos):
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Verificação Etária Obrigatória */}
            <div className="p-3.5 rounded-2xl bg-blue-500/5 dark:bg-white/5 border border-blue-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>Data de Nascimento:</span>
                </label>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  ECA Digital &bull; Lei 14.811/24
                </span>
              </div>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-blue-500"
              />

              {ageCalculation !== null && (
                <div className="pt-1">
                  {ageCalculation >= 18 ? (
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Maior de idade ({ageCalculation} anos) &bull; Acesso liberado integralmente</span>
                    </div>
                  ) : ageCalculation >= 16 ? (
                    <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Jovem de {ageCalculation} anos &bull; Requer consentimento de responsável legal</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        placeholder="Nome do Responsável Legal"
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        required
                        value={guardianContact}
                        onChange={(e) => setGuardianContact(e.target.value)}
                        placeholder="Telefone/WhatsApp do Responsável"
                        className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                      <label className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          required
                          checked={parentalConsent}
                          onChange={(e) => setParentalConsent(e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span>Autorizado pelo responsável legal para fins de estudos e concursos.</span>
                      </label>
                    </div>
                  ) : (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold">
                      Restrito a maiores de 16 anos conforme diretrizes legais.
                    </p>
                  )}
                </div>
              )}
            </div>

            <TurnstileField
              onTokenChange={setTurnstileToken}
              resetTrigger={turnstileReset}
            />

            <button
              type="submit"
              disabled={isLoading || (ageCalculation !== null && ageCalculation < 16)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Cadastrando...' : 'Criar Minha Conta no Argus'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                E-mail cadastrado para recuperação:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <TurnstileField
              onTokenChange={setTurnstileToken}
              resetTrigger={turnstileReset}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-black transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Enviando...' : 'Enviar Instruções de Recuperação'}
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setSuccessMessage(null);
                setMode('login');
              }}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer"
            >
              Voltar para Login
            </button>
          </form>
        )}

        {/* Rodapé de Termos */}
        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/10 text-center text-[10px] text-slate-500 dark:text-slate-400">
          <span>Ao continuar, você concorda com nossos </span>
          <a href="/termos" target="_blank" className="font-bold underline hover:text-blue-500">Termos de Uso</a>
          <span> e </span>
          <a href="/privacidade" target="_blank" className="font-bold underline hover:text-blue-500">Política de Privacidade</a>.
        </div>

      </div>

    </div>
  );
};
