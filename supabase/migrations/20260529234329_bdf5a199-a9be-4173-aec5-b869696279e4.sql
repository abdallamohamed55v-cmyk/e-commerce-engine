-- Add video_url to lessons (required for course import)
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS video_provider text DEFAULT 'youtube';
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS video_id text;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS thumbnail_url text;

-- Admin-only write policies for import (courses/lessons/translations)
CREATE POLICY "Admins manage courses" ON public.courses FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage lessons" ON public.lessons FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage course_translations" ON public.course_translations FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage lesson_translations" ON public.lesson_translations FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));