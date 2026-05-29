import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const DODO_LIVE_API = 'https://live.dodopayments.com';
const DODO_TEST_API = 'https://test.dodopayments.com';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, 401);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return json({ error: 'Unauthorized' }, 401);

    const { plan_id } = await req.json();
    if (!plan_id) return json({ error: 'plan_id required' }, 400);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: plan, error: planErr } = await admin
      .from('subscription_plans')
      .select('*')
      .eq('id', plan_id)
      .eq('is_active', true)
      .maybeSingle();

    if (planErr || !plan) return json({ error: 'Plan not found' }, 404);
    if (!plan.dodo_product_id) return json({ error: 'Plan not linked to Dodo product' }, 400);

    const origin = req.headers.get('origin') || 'https://example.com';

    const dodoApiKey = Deno.env.get('DODO_PAYMENTS_API_KEY');
    if (!dodoApiKey) {
      console.error('DODO_PAYMENTS_API_KEY is not configured');
      return json({ error: 'Payment provider is not configured' }, 503);
    }

    const payload: Record<string, unknown> = {
      payment_link: true,
      return_url: `${origin}/checkout/success`,
      customer: { email: user.email, name: user.user_metadata?.display_name || user.email },
      metadata: { user_id: user.id, plan_id: plan.id, interval: plan.interval },
      billing: { country: 'US', state: 'CA', city: 'SF', street: 'N/A', zipcode: '00000' },
    };

    payload.product_cart = [{ product_id: plan.dodo_product_id, quantity: 1 }];

    const configuredBaseUrl = Deno.env.get('DODO_PAYMENTS_BASE_URL')?.replace(/\/$/, '');
    const baseUrls = configuredBaseUrl ? [configuredBaseUrl] : [DODO_LIVE_API, DODO_TEST_API];
    let lastError: unknown = null;

    for (const baseUrl of baseUrls) {
      const res = await fetch(`${baseUrl}/checkouts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${dodoApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const body = await safeJson(res);
      if (res.ok) {
        return json({
          checkout_url: body.checkout_url ?? body.payment_link,
          subscription_id: body.subscription_id ?? body.payment_id ?? body.checkout_session_id,
        });
      }

      lastError = body;
      console.error('Dodo error:', { status: res.status, baseUrl, body });

      if (res.status !== 401 && res.status !== 403) break;
    }

    return json({
      error: 'Dodo checkout failed',
      details: lastError,
      message: 'Check that DODO_PAYMENTS_API_KEY matches the Dodo environment for these products.',
    }, 502);
  } catch (e) {
    console.error(e);
    return json({ error: String(e?.message || e) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text };
  }
}
