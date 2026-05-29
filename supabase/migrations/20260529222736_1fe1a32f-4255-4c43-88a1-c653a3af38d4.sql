ALTER TABLE public.subscription_plans DROP CONSTRAINT IF EXISTS subscription_plans_interval_check;
ALTER TABLE public.subscription_plans ADD CONSTRAINT subscription_plans_interval_check CHECK (interval IN ('month','year','lifetime'));

INSERT INTO public.subscription_plans (slug, name, name_ar, price_usd, interval, features, features_ar, is_popular, is_active, sort_order)
VALUES (
  'lifetime',
  'Lifetime',
  'مدى الحياة',
  200,
  'lifetime',
  '["Pay once, access forever","Every current and future course","Lifetime updates","Priority support","Downloadable resources","No renewals ever"]'::jsonb,
  '["ادفع مرة، الوصول للأبد","كل الكورسات الحالية والقادمة","تحديثات مدى الحياة","دعم بأولوية","موارد قابلة للتنزيل","بدون أي تجديدات"]'::jsonb,
  false,
  true,
  3
)
ON CONFLICT (slug) DO NOTHING;