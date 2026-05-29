import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteShell from "@/components/SiteShell";
import { useLang } from "@/hooks/useLang";
import { courses, CATEGORIES } from "@/content";
import { getCourseImage } from "@/content/courseImages";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4";

export default function Index() {
  const lang = useLang();
  const isAr = lang === "ar";

  const featured = courses.slice(0, 6);
  const totalLessons = courses.reduce((s, c) => s + c.lessons.length, 0);
  const totalHours = Math.round(
    courses.reduce((s, c) => s + c.durationMinutes, 0) / 60
  );

  return (
    <SiteShell>
      <Helmet>
        <title>
          {isAr
            ? "Shro.AI — اشتراك واحد، كل الكورسات"
            : "Shro.AI — One membership, every course"}
        </title>
        <meta
          name="description"
          content={
            isAr
              ? "منصة كورسات في الذكاء الاصطناعي والبرمجة وعلم النفس والأعمال. اشتراك واحد يفتح كل شيء."
              : "Courses in AI, programming, psychology, and business. One membership unlocks everything."
          }
        />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <video
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-28 md:pb-40 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl tracking-tighter font-light leading-[1.05]">
            {isAr ? (
              <>
                اشتراك واحد.
                <br />
                كل الكورسات اللي محتاجها.
              </>
            ) : (
              <>
                One membership.
                <br />
                Every course you'll ever need.
              </>
            )}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "كورسات منتقاة في الذكاء الاصطناعي، البرمجة، علم النفس، والأعمال. كلها مفتوحة باشتراك واحد."
              : "Curated courses in AI, programming, psychology, and business. All unlocked with a single subscription."}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              {isAr ? "ابدأ الاشتراك" : "Start membership"}
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 backdrop-blur"
            >
              {isAr ? "تصفّح المكتبة" : "Browse library"}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { v: `${courses.length}+`, l: isAr ? "كورس" : "Courses" },
              { v: `${totalLessons}+`, l: isAr ? "درس" : "Lessons" },
              { v: `${totalHours}+`, l: isAr ? "ساعة" : "Hours" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-2xl md:text-3xl font-light tracking-tighter">
                  {s.v}
                </p>
                <p className="mt-1 text-[10px] md:text-xs uppercase tracking-widest text-white/40">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-t border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-light">
              {isAr ? "أربع عوالم. اشتراك واحد." : "Four worlds. One membership."}
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const count = courses.filter((c) => c.category === cat.key).length;
              return (
                <Link
                  key={cat.key}
                  to={`/courses`}
                  className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition"
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-blue-400/70 mb-3">
                    {String(CATEGORIES.indexOf(cat) + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-medium tracking-tight">
                    {isAr ? cat.ar : cat.en}
                  </h3>
                  <p className="mt-1.5 text-xs text-white/40">
                    {count} {isAr ? "كورس" : "courses"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-light">
              {isAr ? "ابدأ من هنا." : "Start here."}
            </h2>
          </div>
          <Link
            to="/courses"
            className="text-sm text-white/60 hover:text-white"
          >
            {isAr ? "كل الكورسات" : "All courses"}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {featured.map((c) => {
            const l = c[lang];
            const img = getCourseImage(c.slug);
            return (
              <Link
                key={c.slug}
                to={`/courses/${c.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5">
                  {img ? (
                    <img
                      src={img}
                      alt={l.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${c.coverGradient}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 start-4 end-4 text-[11px] text-white/70">
                    {c.lessons.length} {isAr ? "درس" : "lessons"} ·{" "}
                    {Math.round(c.durationMinutes / 60)}h
                  </div>
                </div>
                <div className="mt-4 px-1">
                  <h3 className="text-lg font-medium tracking-tight group-hover:text-blue-300 transition">
                    {l.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/55 line-clamp-2">
                    {l.tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-5xl tracking-tighter font-light">
            {isAr ? "ثلاث خطوات. بدون احتكاك." : "Three steps. No friction."}
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                t: isAr ? "اشترك" : "Subscribe",
                d: isAr
                  ? "خطة واحدة تفتح المكتبة بالكامل."
                  : "One plan unlocks the entire library.",
              },
              {
                n: "02",
                t: isAr ? "اتعلّم" : "Learn",
                d: isAr
                  ? "فيديو، نصوص، اختبارات، ومشاريع تطبيقية."
                  : "Video, text, quizzes, and hands-on projects.",
              },
              {
                n: "03",
                t: isAr ? "اتقدّم" : "Progress",
                d: isAr
                  ? "تتبع تقدمك واحفظ شغلك تلقائياً."
                  : "Track your progress automatically.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] text-start"
              >
                <p className="text-xs text-blue-400/80 tracking-widest">{s.n}</p>
                <h3 className="mt-3 text-xl font-light tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-500/[0.08] to-transparent p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-5xl tracking-tighter font-light max-w-2xl mx-auto">
            {isAr
              ? "ابدأ بأقل من قهوتك الأسبوعية."
              : "Less than your weekly coffee."}
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            {isAr
              ? "اختر شهرياً، سنوياً، أو مدى الحياة. كل الخطط تفتح كل الكورسات."
              : "Pick monthly, yearly, or lifetime. Every plan unlocks every course."}
          </p>
          <ul className="mt-8 grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-sm">
            {[
              isAr ? "إلغاء في أي وقت" : "Cancel anytime",
              isAr ? "AR + EN" : "Arabic + English",
              isAr ? "كورسات جديدة شهرياً" : "New courses monthly",
            ].map((f) => (
              <li
                key={f}
                className="text-white/75 text-center"
              >
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/pricing"
            className="mt-9 inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
          >
            {isAr ? "اعرض الخطط" : "View plans"}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
