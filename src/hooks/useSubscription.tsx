import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useSubscription() {
  const { user, loading: authLoading } = useAuth();
  const [active, setActive] = useState<boolean | null>(null);
  const [sub, setSub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (authLoading) {
      setLoading(true);
      return () => {
        cancelled = true;
      };
    }

    if (!user) {
      setActive(false);
      setSub(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const loadSubscription = async () => {
      try {
        const [activeResult, subscriptionResult] = await Promise.all([
          supabase.rpc("has_active_subscription", { _user_id: user.id }),
          supabase
            .from("user_subscriptions")
            .select("*, plan:subscription_plans(*)")
            .eq("user_id", user.id)
            .in("status", ["active", "trialing"])
            .gt("current_period_end", new Date().toISOString())
            .order("current_period_end", { ascending: false })
            .limit(1)
            .maybeSingle(),
        ]);

        if (cancelled) return;
        if (activeResult.error) console.error("Failed to check subscription", activeResult.error);
        if (subscriptionResult.error) console.error("Failed to load subscription", subscriptionResult.error);
        setSub(subscriptionResult.data);
        setActive(Boolean(activeResult.data || subscriptionResult.data));
        setLoading(false);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load subscription", error);
        setSub(null);
        setActive(false);
        setLoading(false);
      }
    };

    loadSubscription();

    return () => {
      cancelled = true;
    };
  }, [user?.id, authLoading]);

  return { active, subscription: sub, loading };
}
