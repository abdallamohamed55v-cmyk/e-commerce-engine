import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, CheckCircle2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLang } from "@/hooks/useLang";

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
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    supabase
      .from("subscription_plans")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setPlans(
            (data as any[]).map((p) => ({
              ...p,
              features: Array.isArray(p.features) ? p.features : [],
              features_ar: Array.isArray(p.features_ar) ? p.features_ar : [],
            })) as Plan[],
          );
        }
      });
  }, []);

  const fmtPrice = (p: Plan) => {
    if (p.price_usd === 0) return "$0";
    if (p.slug === "enterprise" || p.name?.toLowerCase().includes("enterprise")) return "Custom";
    const monthly = p.price_usd;
    const annualPrice = Math.round(monthly * 12 * 0.8);
    return annual ? `$${annualPrice}` : `$${monthly}`;
  };
  const period = annual ? "/yr" : "/mo";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="isolate overflow-hidden pt-24 pb-24 relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]" />

        <div className="z-10 md:px-8 max-w-7xl mx-auto px-6 relative">
          <div className="text-center">
            <h2 className="sm:text-5xl text-4xl font-medium text-white tracking-tight font-manrope animate-on-scroll" style={{ animation: "fadeSlideIn 1s ease-out 0.1s both" }}>
              {lang === "ar" ? "خطط الأسعار" : "Pricing Plans"}
            </h2>

            <div className="flex mt-6 gap-x-4 items-center justify-center animate-on-scroll" style={{ animation: "fadeSlideIn 1s ease-out 0.2s both" }}>
              <span className="text-sm text-white/70">{lang === "ar" ? "شهري" : "Monthly"}</span>
              <button
                onClick={() => setAnnual((a) => !a)}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-white/10 p-1 ring-1 ring-white/15 transition"
              >
                <span
                  className="inline-flex h-6 w-6 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition will-change-transform"
                  style={{ transform: annual ? "translateX(32px)" : "translateX(0px)" }}
                />
              </button>
              <span className="text-sm text-white/70">
                {lang === "ar" ? "سنوي" : "Annual"}
                <span className="ml-2 inline-flex items-center rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-300 ring-1 ring-amber-300/20">
                  {lang === "ar" ? "وفر 20%" : "Save 20%"}
                </span>
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mt-10">
            {(plans.length ? plans : DEFAULT_PLANS).map((p, idx) => {
              const featured = p.is_popular;
              const name = lang === "ar" ? p.name_ar || p.name : p.name;
              const features = lang === "ar" ? p.features_ar || p.features : p.features;
              const price = fmtPrice(p);
              const isEnterprise = price === "Custom";

              return (
                <div
                  key={p.id}
                  className={
                    "animate-on-scroll border border-white/10 rounded-3xl backdrop-blur-xl " +
                    (featured ? "p-2 ring-1 ring-amber-300/10 relative" : "p-6")
                  }
                  style={{ animation: `fadeSlideIn 1s ease-out ${0.3 + idx * 0.1}s both` }}
                >
                  {featured ? (
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent">
                      <div className="absolute inset-0">
                        <div className="h-48 w-full rounded-t-2xl bg-[radial-gradient(60%_80%_at_80%_0%,rgba(251,191,36,0.35),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />
                      </div>
                      <div className="relative p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm uppercase tracking-[0.18em] text-white/70">{name}</div>
                            <div className="mt-2 flex items-end gap-2">
                              <div className="text-4xl font-medium tracking-tight text-white">{price}</div>
                              {!isEnterprise && <div className="text-sm text-white/60">{period}</div>}
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-1 text-[10px] text-amber-300 ring-1 ring-amber-300/25">
                            <Star className="h-3.5 w-3.5" /> {lang === "ar" ? "الأكثر شيوعاً" : "Most Popular"}
                          </span>
                        </div>
                        <CtaButton featured plan={p} user={user} lang={lang} />
                        <ul className="mt-6 space-y-3 text-sm text-white/85">
                          {features?.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm uppercase tracking-[0.18em] text-white/60">{name}</div>
                          <div className="mt-2 flex items-end gap-2">
                            <div className="text-4xl font-medium tracking-tight text-white">{price}</div>
                            {!isEnterprise && <div className="text-sm text-white/50">{period}</div>}
                          </div>
                        </div>
                      </div>
                      <CtaButton plan={p} user={user} lang={lang} enterprise={isEnterprise} />
                      <ul className="mt-6 space-y-3 text-sm text-white/75">
                        {features?.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-white/50 text-center mt-6 animate-on-scroll" style={{ animation: "fadeSlideIn 1s ease-out 0.6s both" }}>
            {lang === "ar" ? "كل الخطط تشمل تجربة 14 يوم مجانية. بدون رسوم إعداد." : "All plans include 14-day free trial. No setup fees."}
          </p>
        </div>
      </section>
    </div>
  );
}

function CtaButton({ featured, enterprise, plan, user, lang }: { featured?: boolean; enterprise?: boolean; plan: Plan; user: any; lang: "en" | "ar" }) {
  const to = user ? "/account" : `/auth?redirect=/pricing`;
  if (featured) {
    return (
      <Link to={to} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-amber-300 to-amber-400 px-4 py-3 text-sm font-medium tracking-tight text-black shadow-[0_10px_30px_rgba(251,191,36,0.25)] hover:from-amber-200 hover:to-amber-300">
        {lang === "ar" ? "ترقّى الآن" : "Upgrade to Pro"}
      </Link>
    );
  }
  if (enterprise) {
    return (
      <a href="mailto:hello@powerai.com" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium tracking-tight text-white/90 hover:bg-white/10">
        {lang === "ar" ? "تواصل مع المبيعات" : "Contact Sales"}
      </a>
    );
  }
  return (
    <Link to={to} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium tracking-tight text-black hover:bg-white/90">
      {lang === "ar" ? "ابدأ" : "Start Building"}
    </Link>
  );
}

function Header() {
  return (
    <header className="w-full py-5 px-8 flex items-center justify-between border-b border-white/5">
      <Link to="/" className="font-display text-xl tracking-tight">
        sh<span className="text-purple-400">r</span>o
      </Link>
      <nav className="hidden md:flex items-center gap-7 text-sm text-foreground/80">
        <Link to="/courses" className="hover:text-foreground">Courses</Link>
        <Link to="/pricing" className="hover:text-foreground">Pricing</Link>
        <Link to="/account" className="hover:text-foreground">Account</Link>
      </nav>
      <Link to="/auth" className="rounded-full liquid-glass px-4 py-2 text-sm">Sign In</Link>
    </header>
  );
}

const DEFAULT_PLANS: Plan[] = [
  { id: "1", slug: "starter", name: "Starter", name_ar: "المبتدئ", price_usd: 0, interval: "month",
    features: ["Up to 1K API calls per month", "Basic data ingestion pipelines", "Web console access", "Community support", "Basic monitoring & alerts"],
    features_ar: ["حتى 1000 طلب شهرياً", "خطوط بيانات أساسية", "وصول للوحة التحكم", "دعم المجتمع", "مراقبة أساسية"],
    is_popular: false },
  { id: "2", slug: "pro", name: "Professional", name_ar: "احترافي", price_usd: 49, interval: "month",
    features: ["Unlimited API calls", "Advanced reasoning models & orchestration", "Performance analytics & insights", "Custom workflows & integrations", "Priority support with SLA"],
    features_ar: ["طلبات غير محدودة", "نماذج متقدمة", "تحليلات أداء", "سير عمل مخصص", "دعم أولوية"],
    is_popular: true },
  { id: "3", slug: "enterprise", name: "Enterprise", name_ar: "المؤسسات", price_usd: 999, interval: "month",
    features: ["On-premises & private cloud deployment", "Advanced security & compliance controls", "Dedicated support team & onboarding", "Team management & usage analytics", "Custom model training & fine-tuning"],
    features_ar: ["نشر خاص", "أمان متقدم", "فريق دعم مخصص", "إدارة الفريق", "تدريب نماذج مخصصة"],
    is_popular: false },
];
