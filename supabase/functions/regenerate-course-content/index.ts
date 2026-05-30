// Regenerates clean bilingual (ar/en) title + tagline + description and a cover image
// for each course. Strips any reference to YouTube, channel names, or original authors.
// Idempotent: a course is skipped if it already has both ar+en translations AND its
// cover image already lives in the `course-covers` storage bucket — unless `force: true`.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BUCKET = "course-covers";

async function callWithRetry(url: string, body: any, label: string): Promise<any> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Lovable-API-Key": LOVABLE_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) return r.json();
    const txt = await r.text();
    if (r.status === 429 || r.status >= 500) {
      const wait = 4000 * (attempt + 1);
      console.log(`${label} ${r.status}, retry in ${wait}ms`);
      await new Promise((res) => setTimeout(res, wait));
      continue;
    }
    throw new Error(`${label} ${r.status}: ${txt}`);
  }
  throw new Error(`${label} exhausted retries`);
}

function extractJson(s: string): any {
  const m = s.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("no JSON object in model output");
  return JSON.parse(m[0]);
}

async function generateMeta(rawTitle: string, rawDesc: string, slug: string, firstLessonTitles: string[]) {
  const prompt = `You receive raw metadata of an online video course (which may include the original author / channel / YouTuber name, or words like "Arabic", "بالعربي", episode counts, etc.). Produce a clean, branded course package in BOTH Arabic and English.

STRICT RULES:
- NEVER mention any person's name, YouTuber, channel name, organisation, university, "in Arabic", "بالعربي", "free", episode counts, or the source platform.
- Title must be short (3-7 words), descriptive of the SUBJECT only.
- Tagline: one punchy line (max 90 chars).
- Description: 2-3 sentences, focused on what the learner will gain.
- Also produce an English image_prompt describing a sleek modern editorial cover image for this course (NO TEXT in the image, no logos, no people's faces, just an evocative abstract / object / scene with rich lighting on a dark background).

RAW DATA:
slug: ${slug}
title: ${rawTitle}
description: ${rawDesc.slice(0, 600)}
sample lessons:
${firstLessonTitles.slice(0, 5).map((t, i) => `${i + 1}. ${t}`).join("\n")}

Return ONLY a single JSON object, no prose, no markdown fences:
{"title_ar":"","tagline_ar":"","description_ar":"","title_en":"","tagline_en":"","description_en":"","image_prompt":""}`;

  const j = await callWithRetry("https://ai.gateway.lovable.dev/v1/chat/completions", {
    model: "google/gemini-3-flash-preview",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  }, "meta gen");
  const content = j.choices?.[0]?.message?.content || "{}";
  try { return JSON.parse(content); } catch { return extractJson(content); }
}

async function generateImage(imagePrompt: string): Promise<Uint8Array> {
  const styled = `Cartoon-style magazine cover illustration about: ${imagePrompt}. Flat vector cartoon art, bold clean shapes, vivid editorial colors, modern magazine cover composition, NO book, NO open book, NO pages, NO text, NO letters, NO logos, NO real people faces, NO emoji, no frames, single full-bleed illustration filling the canvas.`;
  const j = await callWithRetry("https://ai.gateway.lovable.dev/v1/images/generations", {
    model: "google/gemini-3.1-flash-image-preview",
    messages: [{ role: "user", content: styled }],
    modalities: ["image", "text"],
  }, "image gen");
  const b64 = j.data?.[0]?.b64_json;
  if (!b64) throw new Error("no image returned");
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}


async function processCourse(admin: any, course: any, force: boolean, forceImage: boolean) {
  const { data: lessons } = await admin
    .from("lessons")
    .select("id")
    .eq("course_id", course.id)
    .order("sort_order", { ascending: true })
    .limit(5);
  const lessonIds = (lessons || []).map((l: any) => l.id);
  const { data: lts } = await admin
    .from("lesson_translations")
    .select("title")
    .in("lesson_id", lessonIds);
  const sampleTitles = (lts || []).map((l: any) => l.title).filter(Boolean);

  const { data: existingTrans } = await admin
    .from("course_translations")
    .select("lang_code, title, description")
    .eq("course_id", course.id);
  const langs = new Set((existingTrans || []).map((t: any) => t.lang_code));
  const coverIsClean = course.cover_image_url?.includes(`/${BUCKET}/`);
  const needsMeta = !langs.has("ar") || !langs.has("en") || force;
  const needsImage = !coverIsClean || force || forceImage;
  if (!needsMeta && !needsImage) {
    return { slug: course.slug, status: "skipped" };
  }

  let meta: any = null;
  if (needsMeta) {
    const seedT: any = (existingTrans || [])[0];
    const rawTitle = seedT?.title || course.slug;
    const rawDesc = seedT?.description || "";
    meta = await generateMeta(rawTitle, rawDesc, course.slug, sampleTitles);
  }

  if (needsImage) {
    const enT: any = meta || (existingTrans || []).find((t: any) => t.lang_code === "en") || (existingTrans || [])[0];
    const imagePrompt = meta?.image_prompt
      || `Abstract subject of "${enT?.title_en || enT?.title || course.slug}"`;
    const img = await generateImage(imagePrompt);
    const path = `${course.id}.png`;
    const up = await admin.storage.from(BUCKET).upload(path, img, {
      contentType: "image/png",
      upsert: true,
    });
    if (up.error) throw new Error("upload: " + up.error.message);
    const { data: pub } = admin.storage.from(BUCKET).getPublicUrl(path);
    const coverUrl = pub.publicUrl + `?v=${Date.now()}`;
    await admin.from("courses").update({ cover_image_url: coverUrl }).eq("id", course.id);
  }

  if (meta) {
    for (const lang of ["ar", "en"] as const) {
      const row = {
        course_id: course.id,
        lang_code: lang,
        title: lang === "ar" ? meta.title_ar : meta.title_en,
        tagline: lang === "ar" ? meta.tagline_ar : meta.tagline_en,
        description: lang === "ar" ? meta.description_ar : meta.description_en,
      };
      if (langs.has(lang)) {
        await admin.from("course_translations").update(row).eq("course_id", course.id).eq("lang_code", lang);
      } else {
        await admin.from("course_translations").insert(row);
      }
    }
  }
  return { slug: course.slug, status: "done" };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const body = await req.json().catch(() => ({}));
    const limit = Math.min(body.limit ?? 5, 10);
    const force = !!body.force;
    const forceImage = !!body.force_image;
    const onlySlug = body.slug as string | undefined;

    let q = admin.from("courses").select("id, slug, cover_image_url").eq("is_published", true);
    if (onlySlug) q = q.eq("slug", onlySlug);
    const { data: courses, error } = await q.order("cover_image_url", { ascending: true, nullsFirst: true }).order("created_at", { ascending: true });
    if (error) throw error;

    const results = [];
    let processed = 0;
    for (const c of courses || []) {
      if (processed >= limit) break;
      try {
        const r = await processCourse(admin, c, force, forceImage);
        if (r.status === "skipped") continue;
        results.push(r);
        processed++;
      } catch (e: any) {
        results.push({ slug: c.slug, status: "error", error: String(e?.message || e) });
        processed++;
      }
    }
    return new Response(JSON.stringify({ processed, results }, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
