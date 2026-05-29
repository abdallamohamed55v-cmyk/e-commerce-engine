import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const SEED_SECRET = Deno.env.get("SEED_SECRET") ?? "shro-seed-2026";

type Payload = {
  secret: string;
  course: {
    slug: string;
    topic_key: string;
    level: string;
    duration_minutes: number;
    cover_image_url?: string | null;
    accent_color?: string;
    sort_order: number;
    is_published?: boolean;
  };
  translations: Array<{
    lang_code: string;
    title: string;
    tagline?: string | null;
    description: string;
    learning_outcomes: string[];
    prerequisites: string[];
    seo_title?: string;
    seo_description?: string;
  }>;
  lessons: Array<{
    slug: string;
    sort_order: number;
    duration_minutes: number;
    translations: Array<{
      lang_code: string;
      title: string;
      summary?: string;
      content_markdown: string;
    }>;
    quizzes: Array<{
      sort_order: number;
      correct_option_index: number;
      translations: Array<{
        lang_code: string;
        question: string;
        options: string[];
        explanation?: string;
      }>;
    }>;
  }>;
  projects: Array<{
    slug: string;
    sort_order: number;
    difficulty: string;
    estimated_hours: number;
    translations: Array<{
      lang_code: string;
      title: string;
      brief: string;
      requirements: string[];
      deliverables: string[];
    }>;
  }>;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = (await req.json()) as Payload;
    if (body.secret !== SEED_SECRET) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Upsert course
    const { data: course, error: cErr } = await supabase
      .from("courses")
      .upsert(
        {
          slug: body.course.slug,
          topic_key: body.course.topic_key,
          level: body.course.level,
          duration_minutes: body.course.duration_minutes,
          cover_image_url: body.course.cover_image_url ?? null,
          accent_color: body.course.accent_color ?? "#6366f1",
          sort_order: body.course.sort_order,
          is_published: body.course.is_published ?? true,
        },
        { onConflict: "slug" },
      )
      .select()
      .single();
    if (cErr) throw cErr;

    // Course translations
    if (body.translations.length) {
      const rows = body.translations.map((t) => ({ course_id: course.id, ...t }));
      // delete existing for these langs then insert
      await supabase
        .from("course_translations")
        .delete()
        .eq("course_id", course.id)
        .in("lang_code", rows.map((r) => r.lang_code));
      const { error } = await supabase.from("course_translations").insert(rows);
      if (error) throw error;
    }

    // Lessons: delete existing for course then re-insert
    await supabase.from("lessons").delete().eq("course_id", course.id);
    for (const l of body.lessons) {
      const { data: lesson, error: lErr } = await supabase
        .from("lessons")
        .insert({
          course_id: course.id,
          slug: l.slug,
          sort_order: l.sort_order,
          duration_minutes: l.duration_minutes,
        })
        .select()
        .single();
      if (lErr) throw lErr;

      if (l.translations.length) {
        const { error } = await supabase
          .from("lesson_translations")
          .insert(l.translations.map((t) => ({ lesson_id: lesson.id, ...t })));
        if (error) throw error;
      }

      for (const q of l.quizzes) {
        const { data: quiz, error: qErr } = await supabase
          .from("quizzes")
          .insert({
            lesson_id: lesson.id,
            sort_order: q.sort_order,
            correct_option_index: q.correct_option_index,
          })
          .select()
          .single();
        if (qErr) throw qErr;
        if (q.translations.length) {
          const { error } = await supabase
            .from("quiz_translations")
            .insert(q.translations.map((t) => ({ quiz_id: quiz.id, ...t })));
          if (error) throw error;
        }
      }
    }

    // Projects
    await supabase.from("projects").delete().eq("course_id", course.id);
    for (const p of body.projects) {
      const { data: project, error: pErr } = await supabase
        .from("projects")
        .insert({
          course_id: course.id,
          slug: p.slug,
          sort_order: p.sort_order,
          difficulty: p.difficulty,
          estimated_hours: p.estimated_hours,
        })
        .select()
        .single();
      if (pErr) throw pErr;
      if (p.translations.length) {
        const { error } = await supabase
          .from("project_translations")
          .insert(p.translations.map((t) => ({ project_id: project.id, ...t })));
        if (error) throw error;
      }
    }

    return new Response(JSON.stringify({ ok: true, course_id: course.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("seed-content error", e);
    return new Response(JSON.stringify({ error: e.message ?? String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
