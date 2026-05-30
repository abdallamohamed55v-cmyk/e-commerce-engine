import { convertToModelMessages, streamText, type UIMessage } from "npm:ai";
import { createClient } from "npm:@supabase/supabase-js@2";
import { createLovableAiGatewayProvider } from "../_shared/ai-gateway.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "content-type": "application/json" },
      });
    }

    const body = await req.json();
    const { messages, courseSlug, lessonSlug, lang } = body as {
      messages: UIMessage[];
      courseSlug: string;
      lessonSlug: string;
      lang?: string;
    };

    // Fetch lesson + course context
    const { data: lesson } = await supabase
      .from("lessons")
      .select(`
        id, slug, video_id, video_url, "order",
        lesson_translations ( title, summary, content_markdown, language ),
        courses!inner ( id, slug, course_translations ( title, tagline, language ) )
      `)
      .eq("slug", lessonSlug)
      .eq("courses.slug", courseSlug)
      .maybeSingle();

    const isAr = (lang || "ar") === "ar";
    const lt = (lesson?.lesson_translations as any[] || []).find(
      (t) => t.language === (isAr ? "ar" : "en"),
    ) || (lesson?.lesson_translations as any[] || [])[0];
    const ct = (((lesson as any)?.courses?.course_translations || []) as any[]).find(
      (t) => t.language === (isAr ? "ar" : "en"),
    ) || (((lesson as any)?.courses?.course_translations || []) as any[])[0];

    const lessonTitle = lt?.title || "";
    const lessonSummary = lt?.summary || "";
    const lessonContent = lt?.content_markdown || "";
    const courseTitle = ct?.title || "";

    const system = isAr
      ? `أنت مدرس ذكي ومتخصص داخل منصة تعليمية. مهمتك شرح وتبسيط محتوى الدرس الحالي للطالب والإجابة على أسئلته بأسلوب واضح وودود.

السياق التعليمي:
الكورس: ${courseTitle}
الدرس الحالي: ${lessonTitle}
ملخص الدرس: ${lessonSummary}

محتوى الدرس:
${lessonContent}

القواعد:
- ركز على محتوى الدرس الحالي والكورس فقط.
- لو الطالب سأل سؤال خارج الموضوع، رجعه بلطف للدرس.
- استخدم العربية الفصحى البسيطة أو اللهجة المصرية حسب أسلوب الطالب.
- اشرح بأمثلة عملية لما يحتاج.
- استخدم Markdown للتنسيق (قوائم، عناوين، كود).
- كن مختصر ومباشر، ما تطولش بدون داعي.
- لا تذكر أسماء قنوات يوتيوب أو أصحاب المحتوى الأصلي.`
      : `You are an AI tutor inside a learning platform. Your job is to explain and clarify the current lesson and answer the student's questions clearly and warmly.

Educational context:
Course: ${courseTitle}
Current Lesson: ${lessonTitle}
Lesson summary: ${lessonSummary}

Lesson content:
${lessonContent}

Rules:
- Focus only on this lesson and course.
- If the student asks off-topic, gently redirect back.
- Match the student's language and tone.
- Use practical examples when needed.
- Use Markdown formatting (lists, headings, code blocks).
- Be concise and direct.
- Do not mention YouTube channels or original content creators.`;

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response("Missing LOVABLE_API_KEY", { status: 500, headers: corsHeaders });
    }

    const gateway = createLovableAiGatewayProvider(apiKey);
    const result = streamText({
      model: gateway("google/gemini-3-flash-preview"),
      system,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({ headers: corsHeaders });
  } catch (err) {
    console.error("lesson-tutor error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
});
