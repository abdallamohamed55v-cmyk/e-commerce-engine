import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getLesson } from "@/content";
import { useLang } from "@/hooks/useLang";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import SiteShell from "@/components/SiteShell";

export default function LessonView() {
  const { slug, lessonSlug } = useParams();
  const lang = useLang();
  const isAr = lang === "ar";
  const { user, loading } = useAuth();
  const { active } = useSubscription();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const data = getLesson(slug || "", lessonSlug || "");
  if (!data) return <Navigate to="/courses" />;
  if (loading)
    return (
      <SiteShell>
        <div className="p-20 text-center text-white/50 text-sm">Loading...</div>
      </SiteShell>
    );
  if (!user)
    return <Navigate to={`/auth?redirect=/courses/${slug}/lessons/${lessonSlug}`} />;
  if (!active) return <Navigate to="/pricing" />;

  const { course, lesson, prev, next, index, total } = data;
  const lc = lesson[lang];
  const score = lesson.quiz.reduce(
    (acc, q, i) => acc + (quizAnswers[i] === q.correctIndex ? 1 : 0),
    0
  );

  const handleComplete = async () => {
    await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        course_slug: course.slug,
        lesson_slug: lesson.slug,
        quiz_score: showResults ? score : null,
      },
      { onConflict: "user_id,course_slug,lesson_slug" }
    );
    toast({ title: isAr ? "تم!" : "Done!" });
    if (next)
      window.location.href = `/courses/${course.slug}/lessons/${next.slug}`;
    else window.location.href = `/courses/${course.slug}`;
  };

  const video = lesson.video?.[lang] || lesson.video?.en || lesson.video?.ar;
  const progressPct = Math.round(((index + 1) / total) * 100);

  return (
    <SiteShell>
      {/* Progress bar */}
      <div className="sticky top-16 z-30 bg-black/80 backdrop-blur border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link
            to={`/courses/${course.slug}`}
            className="text-xs text-white/60 hover:text-white truncate"
          >
            ← {course[lang].title}
          </Link>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs text-white/50 tabular-nums shrink-0">
            {index + 1}/{total}
          </span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400/80">
          {isAr ? "درس" : "Lesson"} {String(index + 1).padStart(2, "0")}
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl tracking-tighter font-light">
          {lc.title}
        </h1>
        {lc.summary && (
          <p className="mt-3 text-white/60 leading-relaxed">{lc.summary}</p>
        )}

        {video && (
          <div className="mt-8 space-y-2">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/5">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={lc.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-white/40">
              {isAr ? "المصدر:" : "Source:"}{" "}
              <a
                href={video.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/70"
              >
                {video.sourceName}
              </a>
            </p>
          </div>
        )}

        <div className="prose prose-invert prose-sm md:prose-base max-w-none mt-10 prose-headings:font-light prose-headings:tracking-tight prose-a:text-blue-400">
          <ReactMarkdown>{lc.content}</ReactMarkdown>
        </div>

        {/* Quiz */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400/80">
              {isAr ? "اختبار سريع" : "Quick quiz"}
            </p>
            <h2 className="text-xl font-light tracking-tight mt-1">
              {isAr ? "اختبر فهمك" : "Test your understanding"}
            </h2>
          </div>
          {lesson.quiz.map((q, qi) => {
            const ql = q[lang];
            return (
              <div key={qi} className="space-y-3">
                <p className="text-sm font-medium">
                  {qi + 1}. {ql.question}
                </p>
                <div className="space-y-2">
                  {ql.options.map((opt, oi) => {
                    const selected = quizAnswers[qi] === oi;
                    const correct = showResults && oi === q.correctIndex;
                    const wrong = showResults && selected && oi !== q.correctIndex;
                    return (
                      <button
                        key={oi}
                        onClick={() =>
                          !showResults && setQuizAnswers({ ...quizAnswers, [qi]: oi })
                        }
                        className={`w-full text-start p-3 rounded-xl border text-sm transition ${
                          correct
                            ? "border-green-400/50 bg-green-400/10"
                            : wrong
                            ? "border-red-400/50 bg-red-400/10"
                            : selected
                            ? "border-blue-400/60 bg-blue-400/10"
                            : "border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {showResults && (
                  <p className="text-xs text-white/50">{ql.explanation}</p>
                )}
              </div>
            );
          })}
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isAr ? "تحقق من الإجابات" : "Check answers"}
            </button>
          ) : (
            <div className="text-sm">
              <span className="text-white/60">{isAr ? "النتيجة:" : "Score:"}</span>{" "}
              <span className="font-medium">
                {score}/{lesson.quiz.length}
              </span>
            </div>
          )}
        </section>

        {/* Navigation */}
        <div className="mt-10 flex justify-between items-center gap-3">
          {prev ? (
            <Link
              to={`/courses/${course.slug}/lessons/${prev.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
              {isAr ? "السابق" : "Previous"}
            </Link>
          ) : (
            <span />
          )}
          <button
            onClick={handleComplete}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
          >
            <Check className="h-4 w-4" />
            {next
              ? isAr ? "تم — التالي" : "Done — Next"
              : isAr ? "إنهاء الكورس" : "Finish course"}
            {next && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </article>
    </SiteShell>
  );
}
