import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useLang } from "@/hooks/useLang";
import { useDbCourses } from "@/hooks/useDbCourses";
import SiteShell from "@/components/SiteShell";

export default function Account() {
  const lang = useLang();
  const isAr = lang === "ar";
  const { user, loading } = useAuth();
  const { subscription, loading: subscriptionLoading } = useSubscription();
  const { data: courses = [] } = useDbCourses(lang);
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data }) => setProgress(data || []));
  }, [user]);

  if (loading)
    return (
      <SiteShell>
        <div className="p-20 text-center text-white/50 text-sm">
          {isAr ? "جاري التحميل..." : "Loading..."}
        </div>
      </SiteShell>
    );
  if (!user) return <Navigate to="/auth?redirect=/account" />;

  const totalDone = progress.length;
  const totalLessons = courses.reduce((acc, c) => acc + c.lessonCount, 0);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <SiteShell>
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400/80 mb-3">
            {isAr ? "حسابي" : "My account"}
          </p>
          <h1 className="text-4xl md:text-5xl tracking-tighter font-light">
            {isAr ? `أهلاً، ${user.email?.split("@")[0]}` : `Hello, ${user.email?.split("@")[0]}`}
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-xs text-white/50 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/25 transition"
        >
          {isAr ? "تسجيل الخروج" : "Sign out"}
        </button>
      </section>

      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-4 mb-10">
        <Stat
          label={isAr ? "الدروس المكتملة" : "Lessons completed"}
          value={String(totalDone)}
          hint={`/ ${totalLessons}`}
        />
        <Stat
          label={isAr ? "الكورسات المتاحة" : "Courses available"}
          value={String(courses.length)}
        />
        <Stat
          label={isAr ? "حالة الاشتراك" : "Subscription"}
          value={
            subscriptionLoading
              ? isAr ? "تحميل" : "Loading"
              : subscription
              ? subscription.status === "active"
                ? isAr ? "نشط" : "Active"
                : subscription.status
              : isAr ? "غير مشترك" : "Inactive"
          }
        />
      </section>

      {/* Subscription card */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">
            {isAr ? "الاشتراك" : "Membership"}
          </h2>
          {subscriptionLoading ? (
            <div className="py-8 text-center text-sm text-white/50">
              {isAr ? "جاري التحقق من الاشتراك..." : "Checking subscription..."}
            </div>
          ) : subscription ? (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-2xl font-light tracking-tight">
                  {isAr ? subscription.plan.name_ar : subscription.plan.name}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  {subscription.plan.interval === "lifetime"
                    ? isAr ? "وصول مدى الحياة" : "Lifetime access"
                    : `${isAr ? "يجدد في" : "Renews on"} ${new Date(
                        subscription.current_period_end
                      ).toLocaleDateString()}`}
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-500/10 border border-green-400/30 text-green-300 text-xs uppercase tracking-wider">
                {isAr ? "نشط" : "Active"}
              </span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-lg text-white/80">
                  {isAr ? "مفيش اشتراك نشط حالياً" : "No active subscription"}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  {isAr ? "افتح كل الكورسات بخطة واحدة." : "Unlock every course with one plan."}
                </p>
              </div>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
              >
                {isAr ? "اعرض الخطط" : "View plans"}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Progress */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-xs uppercase tracking-widest text-white/40 mb-5">
          {isAr ? "تقدمي" : "My progress"}
        </h2>
        <div className="space-y-2">
          {courses.map((c) => {
            const done = progress.filter((p) => p.course_slug === c.slug).length;
            const total = Math.max(1, c.lessonCount);
            const pct = Math.round((done / total) * 100);
            return (
              <Link
                key={c.slug}
                to={`/courses/${c.slug}`}
                className="flex items-center gap-4 p-3 rounded-2xl border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 shrink-0">
                  {c.coverImageUrl ? (
                    <img src={c.coverImageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{
                        background: `linear-gradient(135deg, ${c.accentColor || "#6366f1"}, #000)`,
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{c.title}</p>
                  <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-white/50 tabular-nums shrink-0">
                  {done}/{c.lessonCount}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-xs uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-3 text-3xl font-light tracking-tighter">
        {value}
        {hint && <span className="text-base text-white/30 ms-1">{hint}</span>}
      </p>
    </div>
  );
}
