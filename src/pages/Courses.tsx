import { Link } from "react-router-dom";
import { useState } from "react";
import { courses, CATEGORIES } from "@/content";
import { getCourseImage } from "@/content/courseImages";
import type { CourseCategory } from "@/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen } from "lucide-react";
import { useLang } from "@/hooks/useLang";


export default function Courses() {
  const lang = useLang();
  const [filter, setFilter] = useState<CourseCategory | "all">("all");

  const visible = filter === "all" ? courses : courses.filter((c) => c.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{lang === "ar" ? "كل الكورسات" : "All Courses"}</h1>
        <p className="text-muted-foreground mb-8">
          {lang === "ar"
            ? "كورسات مجانية مختارة من أفضل المصادر العالمية — AI، برمجة، علم نفس، أعمال."
            : "Free curated courses from the best sources worldwide — AI, programming, psychology, business."}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            {lang === "ar" ? "الكل" : "All"} ({courses.length})
          </Button>
          {CATEGORIES.map((cat) => {
            const count = courses.filter((c) => c.category === cat.key).length;
            return (
              <Button key={cat.key} variant={filter === cat.key ? "default" : "outline"} size="sm" onClick={() => setFilter(cat.key)}>
                {lang === "ar" ? cat.ar : cat.en} ({count})
              </Button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((c) => {
            const l = c[lang];
            const cat = CATEGORIES.find((x) => x.key === c.category);
            return (
              <Link key={c.slug} to={`/courses/${c.slug}`}>
                <Card className="overflow-hidden h-full hover:scale-[1.02] transition group">
                  {getCourseImage(c.slug) ? (
                    <img
                      src={getCourseImage(c.slug)}
                      alt={l.title}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <div className={`aspect-square bg-gradient-to-br ${c.coverGradient}`} />
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {cat && <Badge>{lang === "ar" ? cat.ar : cat.en}</Badge>}
                      <Badge variant="secondary">{c.level}</Badge>
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.round(c.durationMinutes / 60)}h
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition">{l.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{l.tagline}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <BookOpen className="h-3 w-3" />
                      {c.lessons.length} {lang === "ar" ? "درس" : "lessons"}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
