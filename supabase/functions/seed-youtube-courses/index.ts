import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const YT_API = "https://www.googleapis.com/youtube/v3";

// Curated list of most-popular Arabic programming course playlists (Elzero Web School + others)
const CURATED_PLAYLISTS: { id: string; level: string }[] = [
  { id: "PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji", level: "beginner" },    // HTML
  { id: "PLDoPjvoNmBAzjsz06gkzlSrlev53MGIKe", level: "beginner" },    // CSS
  { id: "PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv", level: "intermediate" },// JavaScript Bootcamp
  { id: "PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs", level: "beginner" },    // Python
  { id: "PLDoPjvoNmBAwy-rS6WKudwVeb_x63EzgS", level: "intermediate" },// PHP 8
  { id: "PLDoPjvoNmBAyILpVScdMfHCpoCnAtxC0M", level: "beginner" },    // MySQL
  { id: "PLDoPjvoNmBAyVNHzdiitL30tt2qfTbOnE", level: "intermediate" },// Sass
  { id: "PLDoPjvoNmBAy532K9M_fjiAmrJ0gkCyLJ", level: "intermediate" },// TypeScript
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^\w\s\u0600-\u06FF-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80)
    || `course-${Date.now()}`;
}

function parseDuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return Math.max(1, Math.round((+(m[1] || 0)) * 60 + (+(m[2] || 0)) + (+(m[3] || 0)) / 60));
}

async function importPlaylist(admin: any, apiKey: string, playlistId: string, level: string, lang: string = "ar") {
  const plRes = await fetch(`${YT_API}/playlists?part=snippet&id=${playlistId}&key=${apiKey}`);
  const plJson = await plRes.json();
  if (!plRes.ok || !plJson.items?.length) return { playlistId, status: "not_found" };
  const pl = plJson.items[0];
  const title: string = pl.snippet.title;
  const desc: string = pl.snippet.description || title;
  const cover: string = pl.snippet.thumbnails?.maxres?.url || pl.snippet.thumbnails?.high?.url || pl.snippet.thumbnails?.default?.url || "";

  // existing?
  const baseSlug = slugify(title);
  const { data: existing } = await admin.from("courses").select("id").eq("topic_key", baseSlug).maybeSingle();
  if (existing) return { playlistId, status: "skipped_exists", title };

  // items
  const videoIds: string[] = [];
  const meta: Array<{ id: string; title: string; description: string; thumb: string }> = [];
  let pageToken = "";
  do {
    const r = await fetch(`${YT_API}/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}&key=${apiKey}`);
    const j = await r.json();
    if (!r.ok) return { playlistId, status: "items_error", error: j };
    for (const it of j.items || []) {
      const vid = it.contentDetails?.videoId;
      if (!vid) continue;
      if (["Private video", "Deleted video"].includes(it.snippet?.title)) continue;
      videoIds.push(vid);
      meta.push({
        id: vid,
        title: it.snippet?.title || "Lesson",
        description: it.snippet?.description || "",
        thumb: it.snippet?.thumbnails?.high?.url || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
      });
    }
    pageToken = j.nextPageToken || "";
  } while (pageToken);

  if (videoIds.length === 0) return { playlistId, status: "no_videos" };

  const durations = new Map<string, number>();
  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50).join(",");
    const r = await fetch(`${YT_API}/videos?part=contentDetails&id=${chunk}&key=${apiKey}`);
    const j = await r.json();
    for (const it of j.items || []) durations.set(it.id, parseDuration(it.contentDetails?.duration || "PT0S"));
  }

  const totalMinutes = meta.reduce((a, v) => a + (durations.get(v.id) || 5), 0);
  const slug = baseSlug;

  const { data: course, error: cErr } = await admin.from("courses").insert({
    slug, topic_key: baseSlug, level, cover_image_url: cover,
    duration_minutes: totalMinutes, is_published: true, sort_order: 0,
  }).select().single();
  if (cErr) return { playlistId, status: "course_error", error: cErr.message };

  await admin.from("course_translations").insert({
    course_id: course.id, lang_code: lang, title, description: desc,
  });

  for (let i = 0; i < meta.length; i++) {
    const v = meta[i];
    const { data: lesson } = await admin.from("lessons").insert({
      course_id: course.id,
      slug: `${slug}-l${i + 1}`,
      sort_order: i,
      duration_minutes: durations.get(v.id) || 5,
      video_url: `https://www.youtube.com/watch?v=${v.id}`,
      video_provider: "youtube",
      video_id: v.id,
      thumbnail_url: v.thumb,
    }).select().single();
    if (lesson) {
      await admin.from("lesson_translations").insert({
        lesson_id: lesson.id, lang_code: lang,
        title: v.title,
        summary: v.description.slice(0, 280),
        content_markdown: v.description || v.title,
      });
    }
  }

  return { playlistId, status: "imported", title, lessons: meta.length, minutes: totalMinutes };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const apiKey = Deno.env.get("YOUTUBE_API_KEY");
    if (!apiKey) throw new Error("YOUTUBE_API_KEY not configured");
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const body = await req.json().catch(() => ({}));
    const playlists: { id: string; level: string }[] = body.playlists?.length ? body.playlists : CURATED_PLAYLISTS;
    const results = [];
    for (const p of playlists) results.push(await importPlaylist(admin, apiKey, p.id, p.level));
    return new Response(JSON.stringify({ success: true, results }, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
