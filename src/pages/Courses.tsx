import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { courses, CATEGORIES } from "@/content";
import { getCourseImage } from "@/content/courseImages";
import type { CourseCategory } from "@/content";
import { useLang } from "@/hooks/useLang";
import SiteShell from "@/components/SiteShell";

export default function Courses() {
  const lang = useLang();
  const isAr = lang === "ar";
  const [filter, setFilter] = useState<CourseCategory | "all">("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const base = filter === "all" ? courses : courses.filter((c) => c.category === filter);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (c) =>
        c[lang].title.toLowerCase().includes(q) ||
        c[lang].tagline.toLowerCase().includes(q)
    );
  }, [filter, query, lang]);

  const categoryLabel = (key: CourseCategory) => {
    const c = CATEGORIES.find((x) => x.key === key);
    return c ? (isAr ? c.ar : c.en) : key;
  };

  return (
    <SiteShell>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <h1 className="text-4xl md:text-6xl tracking-tighter font-light max-w-3xl">
          {isAr ? "كل الكورسات. مكان واحد." : "Every course. One place."}
        </h1>
        <p className="mt-5 text-white/60 max-w-xl text-base leading-relaxed">
          {isAr
            ? "كورسات منتقاة في الذكاء الاصطناعي، البرمجة، علم النفس، والأعمال — مفتوحة بالكامل مع اشتراكك."
            : "Curated courses across AI, programming, psychology and business — fully unlocked with your membership."}
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 sticky top-16 z-20 bg-black/80 backdrop-blur-md border-y border-white/5 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
              {isAr ? "الكل" : "All"}
              <span className="text-white/40 ms-1.5">{courses.length}</span>
            </FilterPill>
            {CATEGORIES.map((cat) => {
              const count = courses.filter((c) => c.category === cat.key).length;
              return (
                <FilterPill
                  key={cat.key}
                  active={filter === cat.key}
                  onClick={() => setFilter(cat.key)}
                >
                  {isAr ? cat.ar : cat.en}
                  <span className="text-white/40 ms-1.5">{count}</span>
                </FilterPill>
              );
            })}
          </div>

          <div className="md:w-72">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isAr ? "ابحث عن كورس..." : "Search courses..."}
              className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 transition"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {visible.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-3xl py-24 text-center text-white/50 text-sm">
            {isAr ? "لا توجد نتائج" : "No courses match your search."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {visible.map((c) => {
              const l = c[lang];
              const img = getCourseImage(c.slug);
              return (
                <Link key={c.slug} to={`/courses/${c.slug}`} className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5">
                    {img ? (
                      <img
                        src={img}
                        alt={l.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${c.coverGradient}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />

                    <div className="absolute top-4 start-4">
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-[10px] uppercase tracking-wider text-white/80">
                        {categoryLabel(c.category)}
                      </span>
                    </div>

                    <div className="absolute bottom-4 start-4 end-4 flex items-center gap-3 text-[11px] text-white/70">
                      <span>{Math.round(c.durationMinutes / 60)}h</span>
                      <span className="w-px h-3 bg-white/20" />
                      <span>{c.lessons.length} {isAr ? "درس" : "lessons"}</span>
                      <span className="w-px h-3 bg-white/20" />
                      <span className="uppercase tracking-wider text-white/60">{c.level}</span>
                    </div>
                  </div>

                  <div className="mt-4 px-1">
                    <h3 className="text-lg font-medium tracking-tight group-hover:text-blue-300 transition">
                      {l.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/55 line-clamp-2 leading-relaxed">
                      {l.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl tracking-tighter font-light">
              {isAr ? "اشتراك واحد. كل الكورسات." : "One membership. Every course."}
            </h2>
            <p className="mt-2 text-white/60 text-sm">
              {isAr ? "ابدأ بـ 14 يوم تجربة مجانية." : "Start with a 14-day free trial."}
            </p>
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition self-start"
          >
            {isAr ? "اعرض الخطط" : "View plans"}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-medium transition border ${
        active
          ? "bg-white text-black border-white"
          : "bg-white/5 text-white/70 border-white/10 hover:text-white hover:border-white/25"
      }`}
    >
      {children}
    </button>
  );
}
