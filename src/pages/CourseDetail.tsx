import { Link, useParams, Navigate } from "react-router-dom";
import { getCourse } from "@/content";
import { getCourseImage } from "@/content/courseImages";
import { useLang } from "@/hooks/useLang";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Clock, Lock, PlayCircle } from "lucide-react";

export default function CourseDetail() {
  const { slug } = useParams();
  const lang = useLang();
  const { user } = useAuth();
  const { active } = useSubscription();
  const course = getCourse(slug || "");

  if (!course) return <Navigate to="/courses" />;
  const c = course[lang];
  const cover = getCourseImage(course.slug);

  return (
    <div className="min-h-screen bg-background">
      {cover ? (
        <div className="relative h-72 overflow-hidden">
          <img src={cover} alt={c.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
      ) : (
        <div className={`h-64 bg-gradient-to-br ${course.coverGradient}`} />
      )}

      <div className="max-w-5xl mx-auto px-6 -mt-32 relative">
        <Card className="p-8 space-y-6">
          <div className="flex gap-2">
            <Badge>{course.level}</Badge>
            <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />{Math.round(course.durationMinutes / 60)}h</Badge>
          </div>
          <h1 className="text-4xl font-bold">{c.title}</h1>
          <p className="text-lg text-muted-foreground">{c.tagline}</p>
          <p>{c.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">{lang === "ar" ? "هتتعلم" : "You'll learn"}</h3>
              <ul className="space-y-2 text-sm">
                {c.learningOutcomes.map((o, i) => (
                  <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{o}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{lang === "ar" ? "المتطلبات" : "Prerequisites"}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.prerequisites.map((p, i) => <li key={i}>• {p}</li>)}
              </ul>
            </div>
          </div>

          {!active && (
            <div className="bg-muted p-6 rounded-lg text-center">
              <p className="mb-3">{lang === "ar" ? "اشترك للوصول لكل الكورسات" : "Subscribe to access all courses"}</p>
              <Button asChild size="lg">
                <Link to={user ? "/pricing" : "/auth?redirect=/pricing"}>{lang === "ar" ? "شوف الباقات" : "View pricing"}</Link>
              </Button>
            </div>
          )}
        </Card>

        <div className="my-8 space-y-3">
          <h2 className="text-2xl font-bold">{lang === "ar" ? "الدروس" : "Lessons"}</h2>
          {course.lessons.map((lesson, i) => {
            const lc = lesson[lang];
            return (
              <Link
                key={lesson.slug}
                to={active ? `/courses/${course.slug}/lessons/${lesson.slug}` : "/pricing"}
              >
                <Card className="p-4 flex items-center gap-4 hover:bg-accent transition">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">{i + 1}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{lc.title}</h4>
                    <p className="text-sm text-muted-foreground">{lc.summary}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{lesson.durationMinutes}m</div>
                  {active ? <PlayCircle className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
