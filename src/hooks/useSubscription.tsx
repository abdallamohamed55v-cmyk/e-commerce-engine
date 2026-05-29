import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useSubscription() {
  const { user } = useAuth();
  const [active, setActive] = useState<boolean | null>(null);
  const [sub, setSub] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      setActive(false);
      setSub(null);
      return;
    }
    supabase
      .from("user_subscriptions")
      .select("*, plan:subscription_plans(*)")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing"])
      .gt("current_period_end", new Date().toISOString())
      .maybeSingle()
      .then(({ data }) => {
        setSub(data);
        setActive(!!data);
      });
  }, [user]);

  return { active, subscription: sub };
}
