import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { Webhook } from 'npm:standardwebhooks@1.0.0';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const secret = Deno.env.get('DODO_WEBHOOK_SECRET');
  if (!secret) return new Response('Missing secret', { status: 500 });

  const rawBody = await req.text();
  const headers = {
    'webhook-id': req.headers.get('webhook-id') || '',
    'webhook-signature': req.headers.get('webhook-signature') || '',
    'webhook-timestamp': req.headers.get('webhook-timestamp') || '',
  };

  let event: any;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(rawBody, headers);
  } catch (e) {
    console.error('Signature verify failed:', e);
    return new Response('Invalid signature', { status: 401 });
  }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const type = event.type as string;
    const data = event.data || {};
    const metadata = data.metadata || {};
    const userId = metadata.user_id;
    const planId = metadata.plan_id;

    console.log('Dodo event:', type, data.subscription_id);

    if (!userId) {
      console.warn('No user_id in metadata, skipping');
      return new Response('ok', { status: 200 });
    }

    if (type === 'subscription.active' || type === 'subscription.renewed') {
      await admin.from('user_subscriptions').upsert({
        user_id: userId,
        plan_id: planId,
        dodo_subscription_id: data.subscription_id,
        dodo_customer_id: data.customer?.customer_id,
        status: 'active',
        current_period_start: data.previous_billing_date || new Date().toISOString(),
        current_period_end: data.next_billing_date,
      }, { onConflict: 'dodo_subscription_id' });
    } else if (type === 'subscription.cancelled' || type === 'subscription.expired') {
      await admin.from('user_subscriptions')
        .update({ status: 'cancelled' })
        .eq('dodo_subscription_id', data.subscription_id);
    } else if (type === 'subscription.failed') {
      await admin.from('user_subscriptions')
        .update({ status: 'past_due' })
        .eq('dodo_subscription_id', data.subscription_id);
    }

    return new Response('ok', { status: 200 });
  } catch (e) {
    console.error('Webhook handler error:', e);
    return new Response('error', { status: 500 });
  }
});
