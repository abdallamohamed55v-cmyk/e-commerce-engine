
-- Wipe all course content
TRUNCATE TABLE public.quiz_translations, public.quizzes, public.project_translations, public.projects, public.lesson_translations, public.lessons, public.course_translations, public.courses RESTART IDENTITY CASCADE;

-- Subscription plans
CREATE TABLE public.subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  name_ar text NOT NULL,
  description text,
  description_ar text,
  price_usd numeric NOT NULL,
  interval text NOT NULL CHECK (interval IN ('month','year')),
  dodo_product_id text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  features_ar jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_popular boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.subscription_plans TO anon, authenticated;
GRANT ALL ON public.subscription_plans TO service_role;

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plans public read" ON public.subscription_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage plans" ON public.subscription_plans FOR ALL USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));

-- User subscriptions
CREATE TYPE public.subscription_status AS ENUM ('trialing','active','past_due','canceled','expired');

CREATE TABLE public.user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  plan_id uuid NOT NULL REFERENCES public.subscription_plans(id),
  status public.subscription_status NOT NULL DEFAULT 'active',
  dodo_subscription_id text UNIQUE,
  dodo_customer_id text,
  current_period_start timestamptz NOT NULL DEFAULT now(),
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  canceled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_subs_user ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subs_status ON public.user_subscriptions(status);

GRANT SELECT ON public.user_subscriptions TO authenticated;
GRANT ALL ON public.user_subscriptions TO service_role;

ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own subscriptions" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Block client writes subs ins" ON public.user_subscriptions AS RESTRICTIVE FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Block client writes subs upd" ON public.user_subscriptions AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Block client writes subs del" ON public.user_subscriptions AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE TRIGGER update_user_subs_updated_at BEFORE UPDATE ON public.user_subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Lesson progress
CREATE TABLE public.lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_slug text NOT NULL,
  lesson_slug text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  quiz_score integer,
  UNIQUE (user_id, course_slug, lesson_slug)
);

CREATE INDEX idx_lesson_progress_user ON public.lesson_progress(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own progress" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Helper: check active subscription
CREATE OR REPLACE FUNCTION public.has_active_subscription(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_subscriptions
    WHERE user_id = _user_id
      AND status IN ('active','trialing')
      AND current_period_end > now()
  )
$$;

-- Seed default plans
INSERT INTO public.subscription_plans (slug, name, name_ar, description, description_ar, price_usd, interval, features, features_ar, is_popular, sort_order) VALUES
('monthly', 'Monthly', 'شهري', 'Full access, billed monthly', 'وصول كامل، فاتورة شهرية', 19, 'month',
 '["Access to all courses","New courses every month","Certificates of completion","Community access","Cancel anytime"]'::jsonb,
 '["وصول لكل الكورسات","كورسات جديدة كل شهر","شهادات إتمام","الوصول للمجتمع","إلغاء في أي وقت"]'::jsonb,
 false, 1),
('yearly', 'Yearly', 'سنوي', 'Save 2 months — best value', 'وفّر شهرين — أفضل قيمة', 149, 'year',
 '["Everything in Monthly","Save $79 per year","Priority support","Early access to new courses","Downloadable resources"]'::jsonb,
 '["كل مميزات الباقة الشهرية","وفّر 79$ سنوياً","دعم بأولوية","وصول مبكر للكورسات الجديدة","موارد قابلة للتنزيل"]'::jsonb,
 true, 2);
