import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDbCourse } from "@/hooks/useDbCourses";
import { useLang } from "@/hooks/useLang";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SiteShell from "@/components/SiteShell";
import LessonTutor from "@/components/LessonTutor";

export default function LessonView() {
  const { slug, lessonSlug } = useParams();
  const lang = useLang();
  const isAr = lang === "ar";
  const { user, loading } = useAuth();
  const { active, loading: subscriptionLoading } = useSubscription();
  const { data: course, isLoading: courseLoading } = useDbCourse(slug, lang);

  if (loading || subscriptionLoading || courseLoading || active === null) {
    return (
      <SiteShell>
        <div className="p-20 text-center text-white/50 text-sm">
          {isAr ? "جاري التحميل..." : "Loading..."}
        </div>
      </SiteShell>
    );
  }
  if (!course) return <Navigate to="/courses" />;
  if (!user) return <Navigate to={`/auth?redirect=/courses/${slug}/lessons/${lessonSlug}`} />;
  if (!active) return <Navigate to="/pricing" />;

  const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return <Navigate to={`/courses/${course.slug}`} />;
  const lesson = course.lessons[index];
  const prev = course.lessons[index - 1] ?? null;
  const next = course.lessons[index + 1] ?? null;
  const total = course.lessons.length;
  const progressPct = Math.round(((index + 1) / total) * 100);

  const handleComplete = async () => {
    await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        course_slug: course.slug,
        lesson_slug: lesson.slug,
      },
      { onConflict: "user_id,course_slug,lesson_slug" }
    );
    toast({ title: isAr ? "تم!" : "Done!" });
    if (next) window.location.href = `/courses/${course.slug}/lessons/${next.slug}`;
    else window.location.href = `/courses/${course.slug}`;
  };

  return (
    <SiteShell>
      <div className="sticky top-16 z-30 bg-black/80 backdrop-blur border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link
            to={`/courses/${course.slug}`}
            className="text-xs text-white/60 hover:text-white truncate"
          >
            {course.title}
          </Link>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 transition-all" style={{ width: `${progressPct}%` }} />
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
        <h1 className="mt-3 text-3xl md:text-4xl tracking-tighter font-light">{lesson.title}</h1>
        {lesson.summary && (
          <p className="mt-3 text-white/60 leading-relaxed">{lesson.summary}</p>
        )}

        {lesson.videoId && (
          <div className="mt-8 space-y-2">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/5">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${lesson.videoId}`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {lesson.videoUrl && (
              <p className="text-xs text-white/40">
                {isAr ? "المصدر:" : "Source:"}{" "}
                <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white/70"
                >
                  YouTube
                </a>
              </p>
            )}
          </div>
        )}

        {lesson.contentMarkdown && lesson.contentMarkdown.trim().length > 0 && (
          <div className="prose prose-invert prose-sm md:prose-base max-w-none mt-10 prose-headings:font-light prose-headings:tracking-tight prose-a:text-blue-400">
            <ReactMarkdown>{lesson.contentMarkdown}</ReactMarkdown>
          </div>
        )}

        <div className="mt-10 flex justify-between items-center gap-3">
          {prev ? (
            <Link
              to={`/courses/${course.slug}/lessons/${prev.slug}`}
              className="inline-flex items-center px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10"
            >
              {isAr ? "السابق" : "Previous"}
            </Link>
          ) : (
            <span />
          )}
          <button
            onClick={handleComplete}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
          >
            {next
              ? isAr ? "تم — التالي" : "Done — Next"
              : isAr ? "إنهاء الكورس" : "Finish course"}
          </button>
        </div>
      </article>

      <LessonTutor
        courseSlug={course.slug}
        lessonSlug={lesson.slug}
        lessonTitle={lesson.title}
        lang={lang}
      />
    </SiteShell>
  );
}
