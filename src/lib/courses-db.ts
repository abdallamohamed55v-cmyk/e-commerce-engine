import { supabase } from "@/integrations/supabase/client";

export type Lang = "en" | "ar";
export type CourseCategory = "ai" | "programming" | "psychology" | "business" | "general";

export interface CourseSummary {
  id: string;
  slug: string;
  level: string;
  durationMinutes: number;
  coverImageUrl: string | null;
  accentColor: string | null;
  category: CourseCategory;
  title: string;
  tagline: string | null;
  description: string;
  lessonCount: number;
}

export interface LessonRow {
  id: string;
  slug: string;
  sortOrder: number;
  durationMinutes: number;
  videoId: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  title: string;
  summary: string | null;
  contentMarkdown: string;
}

export interface CourseDetail extends CourseSummary {
  learningOutcomes: string[];
  prerequisites: string[];
  lessons: LessonRow[];
}

export const CATEGORIES: { key: CourseCategory; en: string; ar: string }[] = [
  { key: "ai", en: "AI", ar: "الذكاء الاصطناعي" },
  { key: "programming", en: "Programming", ar: "البرمجة" },
  { key: "psychology", en: "Psychology", ar: "علم النفس" },
  { key: "business", en: "Business", ar: "الأعمال" },
  { key: "general", en: "General", ar: "ثقافة عامة" },
];

export function categorize(topicKey: string, title: string): CourseCategory {
  const s = `${topicKey} ${title}`.toLowerCase();
  if (/(ai|machine.?learning|deep.?learning|neural|artificial.?intelligence|ذكاء|تعلم.?الآلة|الآلة|الذكاء)/.test(s))
    return "ai";
  if (/(psychology|psych|philosophy|cognitive|emotional|focus|productivity|علم.?النفس|نفس|فلسفة)/.test(s))
    return "psychology";
  if (/(business|marketing|excel|محاسبة|إدارة|تسويق|accounting|management|startup|finance)/.test(s))
    return "business";
  if (/(history|biology|chemistry|world|economics|computer.?science|crash.?course|cs50|تاريخ|كيمياء|أحياء|اقتصاد)/.test(s))
    return "general";
  return "programming";
}

export async function fetchCourseSummaries(lang: Lang): Promise<CourseSummary[]> {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, slug, level, duration_minutes, cover_image_url, accent_color, topic_key, is_published")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  if (!courses?.length) return [];

  const ids = courses.map((c) => c.id);
  const [{ data: trans }, { data: lessonCounts }] = await Promise.all([
    supabase
      .from("course_translations")
      .select("course_id, lang_code, title, tagline, description")
      .in("course_id", ids),
    supabase.from("lessons").select("course_id").in("course_id", ids).limit(10000),
  ]);


  const transByCourse = new Map<string, Map<string, any>>();
  (trans || []).forEach((t) => {
    if (!transByCourse.has(t.course_id)) transByCourse.set(t.course_id, new Map());
    transByCourse.get(t.course_id)!.set(t.lang_code, t);
  });
  const countByCourse = new Map<string, number>();
  (lessonCounts || []).forEach((l) => {
    countByCourse.set(l.course_id, (countByCourse.get(l.course_id) || 0) + 1);
  });

  return courses
    .map((c) => {
      const map = transByCourse.get(c.id);
      const t = map?.get(lang) || map?.get("ar") || map?.get("en");
      if (!t) return null;
      return {
        id: c.id,
        slug: c.slug,
        level: c.level,
        durationMinutes: c.duration_minutes,
        coverImageUrl: c.cover_image_url,
        accentColor: c.accent_color,
        category: categorize(c.topic_key, t.title),
        title: t.title,
        tagline: t.tagline,
        description: t.description,
        lessonCount: countByCourse.get(c.id) || 0,
      } as CourseSummary;
    })
    .filter((x): x is CourseSummary => x !== null);
}

export async function fetchCourse(slug: string, lang: Lang): Promise<CourseDetail | null> {
  const { data: course, error } = await supabase
    .from("courses")
    .select("id, slug, level, duration_minutes, cover_image_url, accent_color, topic_key")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw error;
  if (!course) return null;

  const [{ data: trans }, { data: lessons }] = await Promise.all([
    supabase
      .from("course_translations")
      .select("lang_code, title, tagline, description, learning_outcomes, prerequisites")
      .eq("course_id", course.id),
    supabase
      .from("lessons")
      .select("id, slug, sort_order, duration_minutes, video_id, video_url, thumbnail_url")
      .eq("course_id", course.id)
      .order("sort_order", { ascending: true }),
  ]);

  const transMap = new Map((trans || []).map((t) => [t.lang_code, t]));
  const t: any = transMap.get(lang) || transMap.get("ar") || transMap.get("en");
  if (!t) return null;

  const lessonIds = (lessons || []).map((l) => l.id);
  const { data: lessonTrans } = await supabase
    .from("lesson_translations")
    .select("lesson_id, lang_code, title, summary, content_markdown")
    .in("lesson_id", lessonIds);
  const lessonTransByLesson = new Map<string, Map<string, any>>();
  (lessonTrans || []).forEach((lt) => {
    if (!lessonTransByLesson.has(lt.lesson_id)) lessonTransByLesson.set(lt.lesson_id, new Map());
    lessonTransByLesson.get(lt.lesson_id)!.set(lt.lang_code, lt);
  });

  const mappedLessons: LessonRow[] = (lessons || []).map((l) => {
    const m = lessonTransByLesson.get(l.id);
    const lt: any = m?.get(lang) || m?.get("ar") || m?.get("en");
    return {
      id: l.id,
      slug: l.slug,
      sortOrder: l.sort_order,
      durationMinutes: l.duration_minutes,
      videoId: l.video_id,
      videoUrl: l.video_url,
      thumbnailUrl: l.thumbnail_url,
      title: lt?.title || "Lesson",
      summary: lt?.summary || null,
      contentMarkdown: lt?.content_markdown || "",
    };
  });

  return {
    id: course.id,
    slug: course.slug,
    level: course.level,
    durationMinutes: course.duration_minutes,
    coverImageUrl: course.cover_image_url,
    accentColor: course.accent_color,
    category: categorize(course.topic_key, t.title),
    title: t.title,
    tagline: t.tagline,
    description: t.description,
    learningOutcomes: Array.isArray(t.learning_outcomes) ? t.learning_outcomes : [],
    prerequisites: Array.isArray(t.prerequisites) ? t.prerequisites : [],
    lessons: mappedLessons,
    lessonCount: mappedLessons.length,
  };
}
