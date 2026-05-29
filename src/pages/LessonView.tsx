import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getLesson } from "@/content";
import { useLang } from "@/hooks/useLang";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function LessonView() {
  const { slug, lessonSlug } = useParams();
  const lang = useLang();
  const { user, loading } = useAuth();
  const { active } = useSubscription();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const data = getLesson(slug || "", lessonSlug || "");
  if (!data) return <Navigate to="/courses" />;
  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to={`/auth?redirect=/courses/${slug}/lessons/${lessonSlug}`} />;
  if (!active) return <Navigate to="/pricing" />;

  const { course, lesson, prev, next, index, total } = data;
  const lc = lesson[lang];

  const score = data.lesson.quiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correctIndex ? 1 : 0), 0);

  const handleComplete = async () => {
    await supabase.from("lesson_progress").upsert({
      user_id: user.id,
      course_slug: course.slug,
      lesson_slug: lesson.slug,
      quiz_score: showResults ? score : null,
    }, { onConflict: "user_id,course_slug,lesson_slug" });
    toast({ title: lang === "ar" ? "تم!" : "Done!" });
    if (next) window.location.href = `/courses/${course.slug}/lessons/${next.slug}`;
    else window.location.href = `/courses/${course.slug}`;
  };

  const video = lesson.video?.[lang] || lesson.video?.en || lesson.video?.ar;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to={`/courses/${course.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
          ← {course[lang].title}
        </Link>
        <div className="text-xs text-muted-foreground mt-4 mb-2">{index + 1} / {total}</div>
        <h1 className="text-3xl font-bold mb-6">{lc.title}</h1>

        {video && (
          <div className="mb-8 space-y-2">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={lc.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {lang === "ar" ? "المصدر:" : "Source:"}{" "}
              <a href={video.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                {video.sourceName}
              </a>
            </p>
          </div>
        )}

        <article className="prose prose-invert max-w-none">
          <ReactMarkdown>{lc.content}</ReactMarkdown>
        </article>

        <Card className="p-6 my-8 space-y-6">
          <h2 className="text-xl font-bold">{lang === "ar" ? "اختبار سريع" : "Quick Quiz"}</h2>
          {lesson.quiz.map((q, qi) => {
            const ql = q[lang];
            return (
              <div key={qi} className="space-y-3">
                <p className="font-medium">{qi + 1}. {ql.question}</p>
                <div className="space-y-2">
                  {ql.options.map((opt, oi) => {
                    const selected = quizAnswers[qi] === oi;
                    const correct = showResults && oi === q.correctIndex;
                    const wrong = showResults && selected && oi !== q.correctIndex;
                    return (
                      <button
                        key={oi}
                        onClick={() => !showResults && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                        className={`w-full text-start p-3 rounded border transition ${
                          correct ? "border-green-500 bg-green-500/10" :
                          wrong ? "border-red-500 bg-red-500/10" :
                          selected ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {showResults && <p className="text-sm text-muted-foreground">{ql.explanation}</p>}
              </div>
            );
          })}
          {!showResults ? (
            <Button onClick={() => setShowResults(true)} disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}>
              {lang === "ar" ? "تحقق" : "Check answers"}
            </Button>
          ) : (
            <div className="font-semibold">{lang === "ar" ? "نتيجتك" : "Score"}: {score}/{lesson.quiz.length}</div>
          )}
        </Card>

        <div className="flex justify-between items-center">
          {prev ? <Button variant="outline" asChild><Link to={`/courses/${course.slug}/lessons/${prev.slug}`}><ChevronLeft className="h-4 w-4 me-1" />{lang === "ar" ? "السابق" : "Previous"}</Link></Button> : <div />}
          <Button onClick={handleComplete}><Check className="h-4 w-4 me-1" />{next ? (lang === "ar" ? "تم — التالي" : "Done — Next") : (lang === "ar" ? "إنهاء" : "Finish")}</Button>
        </div>
      </div>
    </div>
  );
}
