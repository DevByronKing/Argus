import { NextResponse } from 'next/server';
import { getSupabase, getSupabaseServiceRole, isSupabaseConfigured } from '@/lib/supabase';
import { checkDistributedRateLimit, getClientIp } from '@/lib/rateLimiter';
import { verifyTurnstileToken } from '@/lib/captcha';
import { siemEngine } from '@/lib/siemEngine';
import '@/lib/auditLogger';
import { sanitizeProfileUpdatePayload } from '@/lib/rbac';

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    // 1. Proteção contra flood/criação em massa de contas (máx 5 por minuto por IP distribuído)
    const ipLimit = await checkDistributedRateLimit({
      key: `register:ip:${ip}`,
      limit: 5,
      windowMs: 60000,
      ip,
    });
    if (!ipLimit.allowed) {
      siemEngine.logEvent({
        eventType: 'BRUTE_FORCE_DETECTED',
        severity: 'HIGH',
        sourceIp: ip,
        details: { route: '/api/auth/register', scope: 'ip' },
      });
      const retryAfter = Math.max(1, Math.ceil((ipLimit.resetTime - Date.now()) / 1000));
      return NextResponse.json(
        {
          success: false,
          error: 'Muitos registros a partir deste IP. Aguarde 1 minuto para cadastrar outra conta.',
          retryAfterSeconds: retryAfter,
        },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Formato de requisição inválido (JSON malformado).' },
        { status: 400 }
      );
    }

    const {
      email,
      password,
      fullName,
      targetExam,
      birthDate,
      parentalConsent,
      guardianName,
      guardianContact,
      turnstileToken,
      captchaToken,
    } = body || {};

    // Rate limit adicional por e-mail normalizado
    if (typeof email === 'string' && email.includes('@')) {
      const cleanEmail = email.trim().toLowerCase();
      const emailLimit = await checkDistributedRateLimit({
        key: `register:email:${cleanEmail}`,
        limit: 5,
        windowMs: 60000,
      });
      if (!emailLimit.allowed) {
        siemEngine.logEvent({
          eventType: 'BRUTE_FORCE_DETECTED',
          severity: 'HIGH',
          sourceIp: ip,
          details: { route: '/api/auth/register', scope: 'email', attemptedEmail: cleanEmail },
        });
        return NextResponse.json(
          {
            success: false,
            error: 'Muitas tentativas de cadastro para este e-mail. Aguarde 1 minuto.',
            retryAfterSeconds: Math.max(1, Math.ceil((emailLimit.resetTime - Date.now()) / 1000)),
          },
          { status: 429 }
        );
      }
    }

    // 2. Verificação server-side obrigatória de CAPTCHA (Cloudflare Turnstile)
    const captchaCheck = await verifyTurnstileToken({
      token: turnstileToken || captchaToken || body?.['cf-turnstile-response'],
      remoteIp: ip,
    });
    if (!captchaCheck.valid) {
      siemEngine.logEvent({
        eventType: 'CAPTCHA_FAILED',
        severity: 'MEDIUM',
        sourceIp: ip,
        details: { route: '/api/auth/register', code: captchaCheck.code },
      });
      return NextResponse.json(
        {
          success: false,
          code: captchaCheck.code || 'CAPTCHA_INVALID',
          error: captchaCheck.error || 'Falha na verificação anti-bot.',
        },
        { status: captchaCheck.code === 'CAPTCHA_REQUIRED' ? 400 : 403 }
      );
    }

    // 3. Bloqueio estrito de auto-promoção / Mass Assignment no registro (role: "admin", isAdmin: true, etc.)
    const requestedElevatedRole =
      typeof body?.role === 'string' && body.role.trim().toLowerCase() !== 'student';
    if (requestedElevatedRole || body?.isAdmin === true || body?.is_admin === true) {
      siemEngine.logEvent({
        eventType: 'PRIVILEGE_ESCALATION_ATTEMPT',
        severity: 'CRITICAL',
        sourceIp: ip,
        details: {
          route: '/api/auth/register',
          attemptedRole: body?.role,
          attemptedIsAdmin: Boolean(body?.isAdmin || body?.is_admin),
          attemptedEmail: typeof email === 'string' ? email.trim().toLowerCase() : undefined,
        },
      });
      return NextResponse.json(
        {
          success: false,
          code: 'PRIVILEGE_ESCALATION_BLOCKED',
          error: 'Não é permitido definir privilégios administrativos no cadastro.',
        },
        { status: 403 }
      );
    }

    // Higieniza campos privilegiados adicionais preventivamente
    const { sanitized: safeBody } = sanitizeProfileUpdatePayload('student', body || {});

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'A senha deve conter no mínimo 6 caracteres.' },
        { status: 400 }
      );
    }

    // 4. Validação de Idade (ECA Digital - Lei 14.811/2024, Código Civil Arts. 3º e 4º e LGPD Art. 14)
    if (!birthDate) {
      return NextResponse.json(
        {
          success: false,
          code: 'BIRTHDATE_REQUIRED',
          error: 'Data de nascimento é obrigatória para verificação etária em conformidade com o ECA Digital (Lei 14.811/2024) e a LGPD (Art. 14).',
        },
        { status: 400 }
      );
    }

    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Data de nascimento inválida.' },
        { status: 400 }
      );
    }

    const today = new Date();
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      calculatedAge--;
    }

    if (calculatedAge < 0 || calculatedAge > 125) {
      return NextResponse.json(
        { success: false, error: 'Data de nascimento incoerente.' },
        { status: 400 }
      );
    }

    if (calculatedAge < 16) {
      return NextResponse.json(
        {
          success: false,
          code: 'ECA_UNDER_16_RESTRICTED',
          error: 'O cadastro autônomo é restrito a maiores de 16 anos conforme o ECA Digital (Lei 14.811/2024), Código Civil (Art. 3º) e LGPD (Art. 14). Menores de 16 anos necessitam de representação legal e contratação presencial/assistida.',
        },
        { status: 403 }
      );
    }

    if (calculatedAge >= 16 && calculatedAge < 18) {
      if (!parentalConsent || !guardianName || guardianName.trim().length < 3 || !guardianContact) {
        return NextResponse.json(
          {
            success: false,
            code: 'PARENTAL_CONSENT_REQUIRED',
            error: 'Para usuários entre 16 e 17 anos, é obrigatório registrar a autorização, nome e contato (CPF ou e-mail) do responsável legal conforme o ECA e a LGPD.',
          },
          { status: 400 }
        );
      }
    }

    const complianceAudit = {
      birthDate,
      calculatedAge,
      ageVerified: true,
      legalCapacity: calculatedAge >= 18 ? 'plena_maioridade' : 'relativamente_incapaz_assistido',
      parentalConsent: calculatedAge >= 18 ? null : true,
      guardianName: calculatedAge >= 18 ? null : guardianName,
      guardianContact: calculatedAge >= 18 ? null : guardianContact,
      verifiedAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      const client = getSupabase();
      if (client) {
        const cleanEmail = email.trim().toLowerCase();
        const { data, error } = await client.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: safeBody.fullName || fullName || cleanEmail.split('@')[0],
              target_exam: targetExam || 'Geral',
              ...complianceAudit,
            },
          },
        });

        if (error) {
          return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
          );
        }

        // Garante perfil inicial com role sempre não privilegiado
        const serviceClient = getSupabaseServiceRole();
        if (serviceClient && data.user?.id) {
          try {
            await serviceClient.from('profiles').upsert({
              id: data.user.id,
              email: cleanEmail,
              full_name: fullName || cleanEmail.split('@')[0],
              target_exam: targetExam || 'Geral',
              subscription_tier: 'aspirante',
              subscription_status: 'active',
            }, { onConflict: 'id' });
          } catch {}
        }

        const supaRes = NextResponse.json({
          success: true,
          user: {
            id: data.user?.id,
            email: data.user?.email,
            role: 'student',
            ...complianceAudit,
          },
          session: data.session,
          message: 'Conta criada com sucesso no Supabase!',
          mode: 'supabase',
        });

        if (data.session?.access_token) {
          supaRes.cookies.set('argus-session', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
          });
        }

        return supaRes;
      }
    }

    // 5. Falha fechada obrigatória em produção se o Supabase não estiver configurado
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          code: 'AUTH_SERVICE_UNAVAILABLE',
          error: 'Serviço de cadastro temporariamente indisponível. Supabase não configurado em produção.',
        },
        { status: 503 }
      );
    }

    // Fallback offline exclusivo para dev/testes unitários
    const cleanEmail = email.trim().toLowerCase();
    const mockId = `usr_${Buffer.from(cleanEmail).toString('base64').slice(0, 12)}`;
    const randBuf = new Uint32Array(1);
    globalThis.crypto.getRandomValues(randBuf);
    const mockToken = `jwt_mock_${Date.now()}_${randBuf[0].toString(36)}`;

    const response = NextResponse.json({
      success: true,
      user: {
        id: mockId,
        email: cleanEmail,
        name: fullName || cleanEmail.split('@')[0],
        role: 'student',
        targetExam: targetExam || 'Concurso Público',
        ...complianceAudit,
      },
      session: {
        accessToken: mockToken,
        expiresAt: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      },
      message: 'Usuário registrado com sucesso!',
      mode: 'local_dev',
    });

    response.cookies.set('argus-session', mockToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Erro ao registrar usuário.' },
      { status: 500 }
    );
  }
}
