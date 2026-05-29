import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const DODO_API = 'https://live.dodopayments.com';

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

    // Lifetime plans are one-time charges, others are recurring subscriptions.
    const endpoint = plan.interval === 'lifetime' ? '/payments' : '/subscriptions';

    const payload: Record<string, unknown> = {
      payment_link: true,
      return_url: `${origin}/checkout/success`,
      customer: { email: user.email, name: user.user_metadata?.display_name || user.email },
      metadata: { user_id: user.id, plan_id: plan.id, interval: plan.interval },
      billing: { country: 'US', state: 'CA', city: 'SF', street: 'N/A', zipcode: '00000' },
    };

    if (plan.interval === 'lifetime') {
      payload.product_cart = [{ product_id: plan.dodo_product_id, quantity: 1 }];
    } else {
      payload.product_id = plan.dodo_product_id;
      payload.quantity = 1;
    }

    const res = await fetch(`${DODO_API}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('DODO_PAYMENTS_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const body = await res.json();
    if (!res.ok) {
      console.error('Dodo error:', body);
      return json({ error: body?.message || 'Dodo checkout failed', details: body }, 500);
    }

    return json({
      checkout_url: body.payment_link,
      subscription_id: body.subscription_id ?? body.payment_id,
    });
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
