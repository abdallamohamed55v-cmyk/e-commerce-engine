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

let cachedContext = "";
let cachedAt = 0;

async function buildSiteContext(): Promise<string> {
  if (cachedContext && Date.now() - cachedAt < 60_000) return cachedContext;

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("title, slug, short_description, description, price, category_id")
      .eq("status", "approved")
      .limit(100),
    supabase.from("categories").select("id, name, slug").limit(50),
  ]);

  const catMap = new Map((categories || []).map((c: any) => [c.id, c.name]));
  const productLines = (products || []).map((p: any) => {
    const cat = catMap.get(p.category_id) || "—";
    const desc = (p.short_description || p.description || "").toString().slice(0, 200);
    return `• ${p.title} (${cat}) — $${Number(p.price).toFixed(2)} — /product/${p.slug}\n  ${desc}`;
  }).join("\n");

  const catList = (categories || []).map((c: any) => `- ${c.name} (/?cat=${c.slug})`).join("\n");

  cachedContext = `
SITE: SHRO. — a curated marketplace for premium digital goods (UI kits, templates, icons, software, assets).
Powered by megsyai.com.

KEY PAGES:
- / (home, marketplace + categories)
- /product/:slug (product details + add to cart)
- /checkout (cart + payment via Dodo Payments)
- /about/our-story, /about/customer-care
- /privacy-policy, /terms-of-service

CATEGORIES:
${catList || "(none yet)"}

PRODUCTS (approved, max 100):
${productLines || "(no products yet)"}
`.trim();
  cachedAt = Date.now();
  return cachedContext;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const siteContext = await buildSiteContext();

    const system = `You are SHRO Assistant — a helpful, concise shopping assistant for the SHRO. marketplace.

STRICT SCOPE: Only answer questions related to this site, its products, categories, pricing, checkout, policies, and how to use the marketplace. If a user asks anything unrelated, politely refuse in one sentence and steer them back to the site.

Rules:
- Be brief and direct. Use short paragraphs or bullet lists.
- When recommending a product, include its name, price, and the link path (e.g. /product/slug).
- Detect the user's language (Arabic or English) and reply in the same language.
- Never invent products or prices. Only use the data below.
- If you don't have the info, say so and suggest the closest match from the catalog.

=== SITE KNOWLEDGE ===
${siteContext}
=== END SITE KNOWLEDGE ===`;

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
    console.error("chat-assistant error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
});
