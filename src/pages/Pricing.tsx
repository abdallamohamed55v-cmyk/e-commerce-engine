import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLang } from "@/hooks/useLang";
import { toast } from "@/hooks/use-toast";
import SiteShell from "@/components/SiteShell";

interface Plan {
  id: string;
  slug: string;
  name: string;
  name_ar: string;
  price_usd: number;
  interval: string;
  features: string[];
  features_ar: string[];
  is_popular: boolean;
}

export default function Pricing() {
  const lang = useLang();
  const isAr = lang === "ar";
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("subscription_plans")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setPlans(data as any);
      });
  }, []);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      window.location.href = `/auth?redirect=/pricing`;
      return;
    }
    setLoading(planId);
    const { data, error } = await supabase.functions.invoke("create-dodo-checkout", {
      body: { plan_id: planId },
    });
    setLoading(null);
    if (error || !data?.checkout_url) {
      toast({
        title: isAr ? "خطأ" : "Error",
        description: data?.message || data?.error || error?.message || "Failed to create checkout",
        variant: "destructive",
      });
      return;
    }
    window.location.href = data.checkout_url;
  };

  const intervalLabel = (i: string) =>
    i === "month"
      ? isAr ? "شهرياً" : "/mo"
      : i === "year"
      ? isAr ? "سنوياً" : "/yr"
      : isAr ? "مرة واحدة" : "one-time";

  return (
    <SiteShell>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400/80 mb-4">
          {isAr ? "الأسعار" : "Pricing"}
        </p>
        <h1 className="text-4xl md:text-6xl tracking-tighter font-light max-w-3xl mx-auto">
          {isAr ? "خطة واحدة. كل شيء مفتوح." : "One plan. Everything unlocked."}
        </h1>
        <p className="mt-5 text-white/60 max-w-xl mx-auto text-base">
          {isAr
            ? "اختر دورة الفوترة المناسبة لك. ألغِ في أي وقت."
            : "Pick the billing cycle that suits you. Cancel anytime."}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {plans.length === 0 ? (
          <div className="text-center text-white/50 text-sm py-20">
            {isAr ? "لا توجد خطط متاحة" : "No plans available."}
          </div>
        ) : (
          <div className={`grid gap-6 ${plans.length === 1 ? "max-w-md mx-auto" : "md:grid-cols-3"}`}>
            {plans.map((p) => {
              const features = isAr ? p.features_ar : p.features;
              const isLifetime = p.interval === "lifetime";
              const highlight = p.is_popular || isLifetime;
              return (
                <div
                  key={p.id}
                  className={`relative rounded-3xl p-8 border transition ${
                    highlight
                      ? "border-blue-400/40 bg-gradient-to-b from-blue-500/[0.08] to-transparent shadow-[0_0_60px_-20px_rgba(59,130,246,0.4)]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  {p.is_popular && (
                    <div className="absolute -top-3 start-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-medium uppercase tracking-wider">
                        {isAr ? "الأكثر شعبية" : "Most popular"}
                      </span>
                    </div>
                  )}
                  {isLifetime && !p.is_popular && (
                    <div className="absolute -top-3 start-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-medium uppercase tracking-wider">
                        {isAr ? "أفضل قيمة" : "Best value"}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-medium tracking-tight">
                    {isAr ? p.name_ar : p.name}
                  </h3>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-5xl font-light tracking-tighter">
                      ${p.price_usd}
                    </span>
                    <span className="text-white/50 text-sm">
                      {intervalLabel(p.interval)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSubscribe(p.id)}
                    disabled={loading === p.id}
                    className={`mt-6 w-full py-3 rounded-full text-sm font-medium transition ${
                      highlight
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
                    }`}
                  >
                    {loading === p.id
                      ? "..."
                      : isLifetime
                      ? isAr ? "احصل عليه مدى الحياة" : "Get lifetime access"
                      : isAr ? "اشترك الآن" : "Subscribe now"}
                  </button>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4">
                      {isAr ? "ما ستحصل عليه" : "What's included"}
                    </p>
                    <ul className="space-y-3">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                          <span
                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full inline-flex items-center justify-center ${
                              highlight
                                ? "bg-blue-500/15 text-blue-300"
                                : "bg-white/5 text-white/60"
                            }`}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>
    </SiteShell>
  );
}
