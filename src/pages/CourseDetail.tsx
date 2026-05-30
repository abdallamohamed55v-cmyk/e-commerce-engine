import { Link, useParams, Navigate } from "react-router-dom";
import { useDbCourse } from "@/hooks/useDbCourses";
import { useLang } from "@/hooks/useLang";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import SiteShell from "@/components/SiteShell";

export default function CourseDetail() {
  const { slug } = useParams();
  const lang = useLang();
  const isAr = lang === "ar";
  const { user, loading: authLoading } = useAuth();
  const { active, loading: subscriptionLoading } = useSubscription();
  const { data: course, isLoading, isError } = useDbCourse(slug, lang);

  if (isLoading) {
    return (
      <SiteShell>
        <div className="p-20 text-center text-white/50 text-sm">
          {isAr ? "جاري التحميل..." : "Loading..."}
        </div>
      </SiteShell>
    );
  }
  if (isError || !course) return <Navigate to="/courses" />;

  const cover = course.coverImageUrl;

  return (
    <SiteShell>
      <section className="relative">
        <div className="relative h-[420px] overflow-hidden">
          {cover ? (
            <img src={cover} alt={course.title} className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${course.accentColor || "#6366f1"}, #000)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        <div className="max-w-5xl mx-auto px-6 -mt-48 relative pb-8">
          <Link to="/courses" className="text-xs text-white/60 hover:text-white">
            {isAr ? "العودة للكورسات" : "Back to courses"}
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{course.level}</Tag>
            <Tag>{Math.max(1, Math.round(course.durationMinutes / 60))}h</Tag>
            <Tag>{course.lessons.length} {isAr ? "درس" : "lessons"}</Tag>
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl tracking-tighter font-light max-w-3xl">
            {course.title}
          </h1>
          {course.tagline && (
            <p className="mt-4 text-lg text-white/65 max-w-2xl leading-relaxed">{course.tagline}</p>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-10 pb-16">
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-white/40 mb-3">
              {isAr ? "نظرة عامة" : "Overview"}
            </h2>
            <p className="text-white/75 leading-relaxed whitespace-pre-line">{course.description}</p>
          </div>

          {(course.learningOutcomes.length > 0 || course.prerequisites.length > 0) && (
            <div className="grid sm:grid-cols-2 gap-6">
              {course.learningOutcomes.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-3">
                    {isAr ? "هتتعلم" : "You'll learn"}
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    {course.learningOutcomes.map((o, i) => (
                      <li key={i} className="text-white/75">— {o}</li>
                    ))}
                  </ul>
                </div>
              )}
              {course.prerequisites.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-3">
                    {isAr ? "المتطلبات" : "Prerequisites"}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-white/60">
                    {course.prerequisites.map((p, i) => (
                      <li key={i}>— {p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div>
            <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">
              {isAr ? "الدروس" : "Lessons"}
            </h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, i) => (
                <Link
                  key={lesson.id}
                  to={
                    authLoading || subscriptionLoading || active === null
                      ? "#"
                      : active
                      ? `/courses/${course.slug}/lessons/${lesson.slug}`
                      : user
                      ? "/pricing"
                      : "/auth?redirect=/pricing"
                  }
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition group"
                >
                  <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs tabular-nums text-white/60 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{lesson.title}</h4>
                    {lesson.summary && (
                      <p className="text-xs text-white/50 truncate mt-0.5">{lesson.summary}</p>
                    )}
                  </div>
                  <span className="text-[11px] text-white/40 tabular-nums shrink-0">
                    {lesson.durationMinutes}m
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider shrink-0 ${active ? "text-blue-300" : "text-white/30"}`}>
                    {authLoading || subscriptionLoading || active === null
                      ? isAr ? "تحميل" : "Loading"
                      : active ? (isAr ? "افتح" : "Open") : (isAr ? "مغلق" : "Locked")}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="md:sticky md:top-24 self-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            {authLoading || subscriptionLoading || active === null ? (
              <div className="py-8 text-center text-sm text-white/50">
                {isAr ? "جاري التحقق من الاشتراك..." : "Checking subscription..."}
              </div>
            ) : active ? (
              <>
                <p className="text-xs uppercase tracking-widest text-green-400/80 mb-3">
                  {isAr ? "مفتوح" : "Unlocked"}
                </p>
                <h3 className="text-xl font-light tracking-tight">
                  {isAr ? "ابدأ التعلم" : "Start learning"}
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  {isAr ? "كل الدروس متاحة لك." : "All lessons are open."}
                </p>
                {course.lessons[0] && (
                  <Link
                    to={`/courses/${course.slug}/lessons/${course.lessons[0].slug}`}
                    className="mt-5 w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
                  >
                    {isAr ? "ابدأ أول درس" : "Start first lesson"}
                  </Link>
                )}
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-widest text-blue-400/80 mb-3">
                  {isAr ? "العضوية" : "Membership"}
                </p>
                <h3 className="text-xl font-light tracking-tight">
                  {isAr ? "اشترك للوصول" : "Subscribe to access"}
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  {isAr ? "خطة واحدة تفتح كل الكورسات." : "One plan unlocks every course."}
                </p>
                <Link
                  to={user ? "/pricing" : "/auth?redirect=/pricing"}
                  className="mt-5 w-full inline-flex items-center justify-center px-4 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
                >
                  {isAr ? "اعرض الخطط" : "View pricing"}
                </Link>
              </>
            )}
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-wider text-white/70">
      {children}
    </span>
  );
}
