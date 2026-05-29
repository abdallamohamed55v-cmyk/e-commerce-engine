
-- 1. Remove broad public SELECT policies that expose sensitive columns.
-- Public read of safe display data is preserved via existing public_profiles / public_sellers views.
DROP POLICY IF EXISTS "Public view profiles via view" ON public.profiles;
DROP POLICY IF EXISTS "Public can view approved sellers limited" ON public.seller_profiles;

-- 2. Ensure the public views exist and only expose safe columns (idempotent).
CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = true) AS
SELECT id, user_id, display_name, avatar_url, bio, created_at
FROM public.profiles;

CREATE OR REPLACE VIEW public.public_sellers
WITH (security_invoker = true) AS
SELECT id, user_id, store_name, store_slug, store_description, store_logo_url, created_at
FROM public.seller_profiles
WHERE kyc_status = 'approved'::kyc_status;

-- Allow public read of those views; underlying RLS still applies.
-- Add a narrow public SELECT policy on the base tables so the views can read
-- the safe columns for anonymous/cross-user lookups.
CREATE POLICY "Public safe profile columns"
  ON public.profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public safe seller columns"
  ON public.seller_profiles FOR SELECT
  TO anon, authenticated
  USING (kyc_status = 'approved'::kyc_status);

-- Restrict column-level grants so referral_code / payout_email / kyc fields
-- are never returned to anon/authenticated through the base tables.
REVOKE SELECT ON public.profiles FROM anon, authenticated;
GRANT SELECT (id, user_id, display_name, avatar_url, bio, created_at, updated_at)
  ON public.profiles TO anon, authenticated;

REVOKE SELECT ON public.seller_profiles FROM anon, authenticated;
GRANT SELECT (id, user_id, store_name, store_slug, store_description, store_logo_url, kyc_status, created_at, updated_at)
  ON public.seller_profiles TO anon, authenticated;

GRANT SELECT ON public.public_profiles TO anon, authenticated;
GRANT SELECT ON public.public_sellers TO anon, authenticated;

-- 3. Owner-only RPC so users can still read their own sensitive profile fields.
CREATE OR REPLACE FUNCTION public.get_my_profile()
RETURNS public.profiles
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT * FROM public.profiles WHERE user_id = auth.uid() LIMIT 1; $$;

REVOKE EXECUTE ON FUNCTION public.get_my_profile() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_profile() TO authenticated;

CREATE OR REPLACE FUNCTION public.get_my_seller_profile()
RETURNS public.seller_profiles
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT * FROM public.seller_profiles WHERE user_id = auth.uid() LIMIT 1; $$;

REVOKE EXECUTE ON FUNCTION public.get_my_seller_profile() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_seller_profile() TO authenticated;

-- 4. Explicit restrictive policies blocking client writes to financial tables.
-- order_items and referral_earnings must only be written via service_role / SECURITY DEFINER paths.
CREATE POLICY "Block client inserts on order_items"
  ON public.order_items AS RESTRICTIVE FOR INSERT
  TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Block client updates on order_items"
  ON public.order_items AS RESTRICTIVE FOR UPDATE
  TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Block client deletes on order_items"
  ON public.order_items AS RESTRICTIVE FOR DELETE
  TO anon, authenticated USING (false);

CREATE POLICY "Block client inserts on referral_earnings"
  ON public.referral_earnings AS RESTRICTIVE FOR INSERT
  TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Block client updates on referral_earnings"
  ON public.referral_earnings AS RESTRICTIVE FOR UPDATE
  TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Block client deletes on referral_earnings"
  ON public.referral_earnings AS RESTRICTIVE FOR DELETE
  TO anon, authenticated USING (false);

-- 5. Tighten user_roles: explicitly block self-grants (defence-in-depth on top of has_role admin policy).
CREATE POLICY "Block self role grants"
  ON public.user_roles AS RESTRICTIVE FOR INSERT
  TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Block self role updates"
  ON public.user_roles AS RESTRICTIVE FOR UPDATE
  TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Block self role deletes"
  ON public.user_roles AS RESTRICTIVE FOR DELETE
  TO anon, authenticated USING (false);
