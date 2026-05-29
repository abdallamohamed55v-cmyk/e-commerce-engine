import { Link } from "react-router-dom";
import { useState } from "react";
import { courses, CATEGORIES } from "@/content";
import { getCourseImage } from "@/content/courseImages";
import type { CourseCategory } from "@/content";
import { Clock, BookOpen, ArrowUpRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";

export default function Courses() {
  const lang = useLang();
  const [filter, setFilter] = useState<CourseCategory | "all">("all");

  const visible = filter === "all" ? courses : courses.filter((c) => c.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="w-full py-5 px-8 flex items-center justify-between border-b border-white/5 sticky top-0 z-30 backdrop-blur bg-background/70">
        <Link to="/" className="font-display text-xl tracking-tight">
          Power<span className="opacity-70">AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-foreground/80">
          <Link to="/courses" className="text-foreground">Courses</Link>
          <Link to="/pricing" className="hover:text-foreground">Pricing</Link>
          <Link to="/account" className="hover:text-foreground">Account</Link>
        </nav>
        <Link to="/auth" className="rounded-full liquid-glass px-4 py-2 text-sm">Sign In</Link>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Title block */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/50 font-manrope">
            {lang === "ar" ? "مكتبة الكورسات" : "Course Library"}
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-manrope font-medium tracking-tight">
            {lang === "ar" ? "كل الكورسات" : "Learn what powers the future."}
          </h1>
          <p className="text-foreground/60 mt-5 text-lg leading-8">
            {lang === "ar"
              ? "كورسات مجانية مختارة من أفضل المصادر العالمية — AI، برمجة، علم نفس، أعمال."
              : "Free curated courses from the best sources worldwide — AI, programming, psychology, business."}
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mt-10">
          <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
            {lang === "ar" ? "الكل" : "All"}
          </FilterPill>
          {CATEGORIES.map((c) => (
            <FilterPill key={c.key} active={filter === c.key} onClick={() => setFilter(c.key)}>
              {lang === "ar" ? c.ar : c.en}
            </FilterPill>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((c) => {
            const title = lang === "ar" ? c.ar.title : c.en.title;
            const desc  = lang === "ar" ? c.ar.description : c.en.description;
            const img = getCourseImage(c.slug);
            return (
              <Link
                key={c.slug}
                to={`/courses/${c.slug}`}
                className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/15 hover:bg-white/[0.04] transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03]">
                  {img && (
                    <img
                      src={img}
                      alt={title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/40 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/80 ring-1 ring-white/10">
                    {c.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-manrope text-lg font-medium tracking-tight leading-snug">
                      {title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-foreground/40 group-hover:text-foreground transition mt-1 shrink-0" />
                  </div>
                  {desc && (
                    <p className="mt-2 text-sm text-foreground/55 leading-relaxed line-clamp-2">
                      {desc}
                    </p>
                  )}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-4 text-xs text-foreground/50">
                    {c.lessons?.length != null && (
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" />
                        {c.lessons.length} {lang === "ar" ? "درس" : "lessons"}
                      </span>
                    )}
                    {c.durationMinutes != null && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {c.durationMinutes}m
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-foreground/50 mt-20">
            {lang === "ar" ? "لا توجد كورسات في هذا التصنيف بعد." : "No courses in this category yet."}
          </p>
        )}
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-2 rounded-full text-sm transition border " +
        (active
          ? "bg-white text-black border-white"
          : "bg-transparent text-foreground/70 border-white/10 hover:border-white/25 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
