import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Check, Sparkles, Infinity as InfinityIcon } from "lucide-react";
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
  const [cycle, setCycle] = useState<"month" | "year" | "lifetime">("year");

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
        description: error?.message || "Failed to create checkout",
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

  const intervalCycleLabel = (i: string) =>
    i === "month" ? (isAr ? "شهري" : "Monthly")
    : i === "year" ? (isAr ? "سنوي" : "Yearly")
    : (isAr ? "مدى الحياة" : "Lifetime");

  const filtered = plans;

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

        {/* Toggle */}
        <div className="mt-10 inline-flex p-1 rounded-full bg-white/5 border border-white/10">
          {(["month", "year", "lifetime"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className={`px-5 py-2 rounded-full text-xs font-medium transition ${
                cycle === c
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {intervalCycleLabel(c)}
              {c === "year" && (
                <span className="ms-2 text-[10px] text-blue-300/80">
                  {isAr ? "وفّر 20%" : "Save 20%"}
                </span>
              )}
              {c === "lifetime" && (
                <span className="ms-2 text-[10px] text-blue-300/80">
                  {isAr ? "أفضل قيمة" : "Best value"}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center text-white/50 text-sm py-20">
            {isAr ? "لا توجد خطط متاحة" : "No plans available."}
          </div>
        ) : (
          <div className={`grid gap-6 ${filtered.length === 1 ? "max-w-md mx-auto" : "md:grid-cols-2"}`}>
            {filtered.map((p) => {
              const features = isAr ? p.features_ar : p.features;
              const isLifetime = p.interval === "lifetime";
              return (
                <div
                  key={p.id}
                  className={`relative rounded-3xl p-8 border transition ${
                    p.is_popular || isLifetime
                      ? "border-blue-400/40 bg-gradient-to-b from-blue-500/[0.08] to-transparent shadow-[0_0_60px_-20px_rgba(59,130,246,0.4)]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  {p.is_popular && (
                    <div className="absolute -top-3 start-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-medium uppercase tracking-wider">
                        <Sparkles className="h-3 w-3" />
                        {isAr ? "الأكثر شعبية" : "Most popular"}
                      </span>
                    </div>
                  )}
                  {isLifetime && !p.is_popular && (
                    <div className="absolute -top-3 start-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-medium uppercase tracking-wider">
                        <InfinityIcon className="h-3 w-3" />
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
                      p.is_popular || isLifetime
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

                  <ul className="mt-8 space-y-3">
                    {features.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm text-white/75">
                        <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-xs text-white/40 mt-10">
          {isAr
            ? "كل الخطط تشمل تجربة 14 يوم. لا توجد رسوم إعداد."
            : "All plans include a 14-day trial. No setup fees."}
        </p>
      </section>
    </SiteShell>
  );
}
