'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { SubscriptionPlan } from '@/lib/types';
import { isFreemiumAllowed } from '@/lib/abTesting';

export function useArgusSession(onPlanSynced: (plan: SubscriptionPlan) => void) {
  const [isServerVerifiedAdmin, setIsServerVerifiedAdmin] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    const syncAuthAndPlan = async (
      u: { id: string; email?: string; user_metadata?: Record<string, unknown> },
      accessToken: string
    ) => {
      const fullName = typeof u.user_metadata?.full_name === 'string' ? u.user_metadata.full_name : undefined;
      const metaName = typeof u.user_metadata?.name === 'string' ? u.user_metadata.name : undefined;
      const name = fullName || metaName || u.email?.split('@')[0] || 'Aluno Concurseiro';

      useAuthStore.getState().setAuth(
        {
          id: u.id,
          email: u.email || '',
          name,
          role: 'student',
        },
        accessToken
      );

      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('subscription_tier, subscription_status')
          .eq('id', u.id)
          .single();

        if (
          profileData &&
          profileData.subscription_status === 'active' &&
          ['lancamento', 'pro', 'elite', 'black'].includes(profileData.subscription_tier)
        ) {
          onPlanSynced(profileData.subscription_tier as SubscriptionPlan);
        } else {
          onPlanSynced('aspirante');
          try {
            localStorage.removeItem('argus_plan');
            localStorage.removeItem('aprovalens_plan');
          } catch {}
        }
      } catch {
        onPlanSynced('aspirante');
        try {
          localStorage.removeItem('argus_plan');
          localStorage.removeItem('aprovalens_plan');
        } catch {}
      }

      // Verifica privilégio administrativo estritamente no backend (/api/admin/session)
      try {
        const admRes = await fetch('/api/admin/session', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const admData = await admRes.json().catch(() => null);
        setIsServerVerifiedAdmin(Boolean(admRes.ok && admData?.isAdmin === true));
      } catch {
        setIsServerVerifiedAdmin(false);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        syncAuthAndPlan(session.user, session.access_token);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        syncAuthAndPlan(session.user, session.access_token);
      } else if (event === 'SIGNED_OUT') {
        useAuthStore.getState().logout();
        setIsServerVerifiedAdmin(false);
        if (!isFreemiumAllowed()) {
          onPlanSynced('aspirante');
        }
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [onPlanSynced]);

  return { isServerVerifiedAdmin };
}
