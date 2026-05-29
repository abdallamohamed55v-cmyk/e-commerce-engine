
UPDATE public.subscription_plans SET
  features_ar = '["وصول غير محدود لكل الكورسات","شهادة إتمام معتمدة لكل كورس","رصيد AI غير محدود لأقوى النماذج (Claude, GPT-5, Gemini Pro)","رصيد لنماذج توليد الصور (Nano Banana) والفيديو","اشتراكات مجانية في عدة تطبيقات شريكة","كورسات جديدة كل شهر","الوصول للمجتمع الخاص","إلغاء في أي وقت"]'::jsonb,
  features = '["Unlimited access to all courses","Verified completion certificate for every course","Unlimited AI credits for top models (Claude, GPT-5, Gemini Pro)","Credits for image (Nano Banana) and video generation models","Free subscriptions to multiple partner apps","New courses every month","Private community access","Cancel anytime"]'::jsonb
WHERE slug = 'monthly';

UPDATE public.subscription_plans SET
  features_ar = '["كل مميزات الباقة الشهرية","وفّر 79$ سنوياً","رصيد AI أكبر لنماذج Claude و GPT-5 و Gemini Pro","رصيد موسّع لتوليد الصور (Nano Banana) والفيديو","اشتراكات مجانية في عدة تطبيقات شريكة","شهادات معتمدة لكل الكورسات","دعم بأولوية","وصول مبكر للكورسات الجديدة","موارد قابلة للتنزيل"]'::jsonb,
  features = '["Everything in Monthly","Save $79 per year","Larger AI credits for Claude, GPT-5, Gemini Pro","Expanded credits for image (Nano Banana) and video models","Free subscriptions to multiple partner apps","Verified certificates for all courses","Priority support","Early access to new courses","Downloadable resources"]'::jsonb
WHERE slug = 'yearly';

UPDATE public.subscription_plans SET
  features_ar = '["ادفع مرة، الوصول للأبد","كل الكورسات الحالية والقادمة","شهادة معتمدة لكل كورس","رصيد AI غير محدود مدى الحياة (Claude, GPT-5, Gemini Pro)","رصيد دائم لنماذج الصور (Nano Banana) والفيديو","اشتراكات مجانية في عدة تطبيقات شريكة","تحديثات مدى الحياة","دعم بأولوية","موارد قابلة للتنزيل","بدون أي تجديدات"]'::jsonb,
  features = '["Pay once, lifetime access","All current and future courses","Verified certificate for every course","Lifetime unlimited AI credits (Claude, GPT-5, Gemini Pro)","Lifetime credits for image (Nano Banana) and video models","Free subscriptions to multiple partner apps","Lifetime updates","Priority support","Downloadable resources","No renewals ever"]'::jsonb
WHERE slug = 'lifetime';
