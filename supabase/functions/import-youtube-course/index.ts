import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const YT_API = "https://www.googleapis.com/youtube/v3";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80) || `course-${Date.now()}`;
}

function extractPlaylistId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[A-Za-z0-9_-]{10,}$/.test(trimmed) && !trimmed.includes("/")) return trimmed;
  try {
    const u = new URL(trimmed);
    return u.searchParams.get("list");
  } catch {
    return null;
  }
}

// ISO 8601 PT#H#M#S -> minutes
function parseDuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  const h = parseInt(m[1] || "0", 10);
  const min = parseInt(m[2] || "0", 10);
  const s = parseInt(m[3] || "0", 10);
  return Math.max(1, Math.round(h * 60 + min + s / 60));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("YOUTUBE_API_KEY");
    if (!apiKey) throw new Error("YOUTUBE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const authHeader = req.headers.get("Authorization") || "";

    // Verify caller is admin
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roleRow } = await admin
      .from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin").maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const playlistInput: string = body.playlist || body.playlistId || "";
    const langCode: string = body.lang || "ar";
    const level: string = body.level || "beginner";
    const publish: boolean = body.publish !== false;
    const playlistId = extractPlaylistId(playlistInput);

    if (!playlistId) {
      return new Response(JSON.stringify({ error: "playlist id/url مطلوب" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1) Fetch playlist meta
    const plRes = await fetch(`${YT_API}/playlists?part=snippet,contentDetails&id=${playlistId}&key=${apiKey}`);
    const plJson = await plRes.json();
    if (!plRes.ok || !plJson.items?.length) {
      return new Response(JSON.stringify({ error: "Playlist not found", details: plJson }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const pl = plJson.items[0];
    const courseTitle: string = pl.snippet.title;
    const courseDesc: string = pl.snippet.description || courseTitle;
    const cover: string = pl.snippet.thumbnails?.maxres?.url || pl.snippet.thumbnails?.high?.url || pl.snippet.thumbnails?.default?.url || "";

    // 2) Fetch playlist items (paginate)
    const videoIds: string[] = [];
    const videoMeta: Array<{ id: string; title: string; description: string; thumb: string }> = [];
    let pageToken = "";
    do {
      const r = await fetch(`${YT_API}/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}&key=${apiKey}`);
      const j = await r.json();
      if (!r.ok) throw new Error(JSON.stringify(j));
      for (const it of j.items || []) {
        const vid = it.contentDetails?.videoId;
        if (!vid) continue;
        // skip deleted/private
        if (it.snippet?.title === "Private video" || it.snippet?.title === "Deleted video") continue;
        videoIds.push(vid);
        videoMeta.push({
          id: vid,
          title: it.snippet?.title || "Lesson",
          description: it.snippet?.description || "",
          thumb: it.snippet?.thumbnails?.high?.url || it.snippet?.thumbnails?.default?.url || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
        });
      }
      pageToken = j.nextPageToken || "";
    } while (pageToken);

    if (videoIds.length === 0) {
      return new Response(JSON.stringify({ error: "الـ playlist ما فيهاش فيديوهات — مرفوض" }), {
        status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3) Fetch durations for videos (batch of 50)
    const durations = new Map<string, number>();
    for (let i = 0; i < videoIds.length; i += 50) {
      const chunk = videoIds.slice(i, i + 50).join(",");
      const r = await fetch(`${YT_API}/videos?part=contentDetails&id=${chunk}&key=${apiKey}`);
      const j = await r.json();
      for (const it of j.items || []) {
        durations.set(it.id, parseDuration(it.contentDetails?.duration || "PT0S"));
      }
    }

    // 4) Insert course
    const baseSlug = slugify(courseTitle);
    let slug = baseSlug;
    let n = 1;
    while (true) {
      const { data: exists } = await admin.from("courses").select("id").eq("slug", slug).maybeSingle();
      if (!exists) break;
      n++; slug = `${baseSlug}-${n}`;
    }
    const topicKey = slug;
    const totalMinutes = videoMeta.reduce((acc, v) => acc + (durations.get(v.id) || 5), 0);

    const { data: course, error: cErr } = await admin.from("courses").insert({
      slug, topic_key: topicKey, level, cover_image_url: cover,
      duration_minutes: totalMinutes, is_published: publish, sort_order: 0,
    }).select().single();
    if (cErr) throw cErr;

    await admin.from("course_translations").insert({
      course_id: course.id, lang_code: langCode,
      title: courseTitle, description: courseDesc,
    });

    // 5) Insert lessons + translations
    for (let i = 0; i < videoMeta.length; i++) {
      const v = videoMeta[i];
      const lessonSlug = `${slug}-l${i + 1}`;
      const { data: lesson, error: lErr } = await admin.from("lessons").insert({
        course_id: course.id,
        slug: lessonSlug,
        sort_order: i,
        duration_minutes: durations.get(v.id) || 5,
        video_url: `https://www.youtube.com/watch?v=${v.id}`,
        video_provider: "youtube",
        video_id: v.id,
        thumbnail_url: v.thumb,
      }).select().single();
      if (lErr) throw lErr;

      await admin.from("lesson_translations").insert({
        lesson_id: lesson.id, lang_code: langCode,
        title: v.title,
        summary: v.description.slice(0, 280),
        content_markdown: v.description || v.title,
      });
    }

    return new Response(JSON.stringify({
      success: true,
      course_id: course.id,
      slug,
      lessons_count: videoMeta.length,
      total_minutes: totalMinutes,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
