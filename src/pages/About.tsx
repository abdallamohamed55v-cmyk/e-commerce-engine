import { Link } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import SiteShell from "@/components/SiteShell";
import { courses } from "@/content";
import { Sparkles, Brain, Code, BookOpen, ArrowUpRight } from "lucide-react";

export default function About() {
  const lang = useLang();
  const isAr = lang === "ar";

  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  const totalHours = Math.round(
    courses.reduce((sum, c) => sum + c.durationMinutes, 0) / 60
  );

  const pillars = [
    {
      icon: Brain,
      en: { title: "Depth over hype", body: "We teach how things actually work — not just the trendy headlines." },
      ar: { title: "العمق قبل الضجيج", body: "بنشرح إزاي الحاجات بتشتغل فعلاً — مش بس العناوين الرنّانة." },
    },
    {
      icon: Code,
      en: { title: "Build to learn", body: "Every course ends with a real project you can show." },
      ar: { title: "اتعلم بالتطبيق", body: "كل كورس بينتهي بمشروع حقيقي تقدر تعرضه." },
    },
    {
      icon: Sparkles,
      en: { title: "Bilingual, no compromise", body: "Arabic and English content with the same quality bar." },
      ar: { title: "بالعربي والإنجليزي", body: "نفس مستوى الجودة في اللغتين." },
    },
  ];

  return (
    <SiteShell>
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400/80 mb-4">
          {isAr ? "عن Shro.AI" : "About Shro.AI"}
        </p>
        <h1 className="text-4xl md:text-6xl tracking-tighter font-light max-w-3xl">
          {isAr
            ? "منصة تعليم للناس الجادين."
            : "A learning platform for serious people."}
        </h1>
        <p className="mt-6 text-white/65 max-w-2xl text-lg leading-relaxed">
          {isAr
            ? "بنبني مكتبة كورسات منتقاة في الذكاء الاصطناعي، البرمجة، علم النفس، والأعمال. كل كورس مكتوب بعناية، مع فيديوهات، اختبارات، ومشروع تطبيقي."
            : "We're building a curated library of courses across AI, programming, psychology, and business. Every course is hand-crafted with video, quizzes, and a hands-on project."}
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-4">
        <Stat label={isAr ? "كورس" : "Courses"} value={`${courses.length}+`} />
        <Stat label={isAr ? "درس" : "Lessons"} value={`${totalLessons}+`} />
        <Stat label={isAr ? "ساعة محتوى" : "Hours of content"} value={`${totalHours}+`} />
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          const t = isAr ? p.ar : p.en;
          return (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="w-10 h-10 rounded-full bg-blue-400/10 border border-blue-400/30 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-blue-300" />
              </div>
              <h3 className="text-lg font-light tracking-tight">{t.title}</h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{t.body}</p>
            </div>
          );
        })}
      </section>

      <section className="border-t border-white/5 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl tracking-tighter font-light">
              {isAr ? "جرّب بنفسك." : "See for yourself."}
            </h2>
            <p className="mt-2 text-white/60 text-sm">
              {isAr ? "تصفّح الكورسات أو ابدأ مباشرة." : "Browse courses or jump in."}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10"
            >
              <BookOpen className="h-4 w-4" />
              {isAr ? "الكورسات" : "Courses"}
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
            >
              {isAr ? "اشترك" : "Join"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-center">
      <p className="text-3xl md:text-4xl font-light tracking-tighter">{value}</p>
      <p className="mt-1.5 text-xs uppercase tracking-widest text-white/40">{label}</p>
    </div>
  );
}
