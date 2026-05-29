-- ============================================================
-- LANGUAGES
-- ============================================================
CREATE TABLE public.languages (
  code text PRIMARY KEY,
  name text NOT NULL,
  native_name text NOT NULL,
  direction text NOT NULL DEFAULT 'ltr' CHECK (direction IN ('ltr', 'rtl')),
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.languages TO anon, authenticated;
GRANT ALL ON public.languages TO service_role;

ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Languages public read" ON public.languages
  FOR SELECT TO public USING (true);

INSERT INTO public.languages (code, name, native_name, direction, sort_order) VALUES
  ('en', 'English',    'English',  'ltr', 1),
  ('ar', 'Arabic',     'العربية',  'rtl', 2),
  ('es', 'Spanish',    'Español',  'ltr', 3),
  ('fr', 'French',     'Français', 'ltr', 4),
  ('de', 'German',     'Deutsch',  'ltr', 5),
  ('pt', 'Portuguese', 'Português','ltr', 6),
  ('it', 'Italian',    'Italiano', 'ltr', 7),
  ('ru', 'Russian',    'Русский',  'ltr', 8),
  ('zh', 'Chinese',    '中文',      'ltr', 9),
  ('ja', 'Japanese',   '日本語',     'ltr', 10),
  ('hi', 'Hindi',      'हिन्दी',     'ltr', 11),
  ('tr', 'Turkish',    'Türkçe',   'ltr', 12);

-- ============================================================
-- COURSES (language-agnostic metadata)
-- ============================================================
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  topic_key text NOT NULL,
  level text NOT NULL DEFAULT 'beginner' CHECK (level IN ('beginner','intermediate','advanced')),
  duration_minutes int NOT NULL DEFAULT 0,
  cover_image_url text,
  accent_color text DEFAULT '#6366f1',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_courses_published ON public.courses(is_published, sort_order);
CREATE INDEX idx_courses_topic ON public.courses(topic_key);

GRANT SELECT ON public.courses TO anon, authenticated;
GRANT ALL ON public.courses TO service_role;

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are public" ON public.courses
  FOR SELECT TO public USING (is_published = true);

-- ============================================================
-- COURSE TRANSLATIONS
-- ============================================================
CREATE TABLE public.course_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  lang_code text NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  title text NOT NULL,
  tagline text,
  description text NOT NULL,
  learning_outcomes jsonb NOT NULL DEFAULT '[]'::jsonb,
  prerequisites jsonb NOT NULL DEFAULT '[]'::jsonb,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(course_id, lang_code)
);

CREATE INDEX idx_course_tr_lang ON public.course_translations(lang_code);
CREATE INDEX idx_course_tr_course ON public.course_translations(course_id);

GRANT SELECT ON public.course_translations TO anon, authenticated;
GRANT ALL ON public.course_translations TO service_role;

ALTER TABLE public.course_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Course translations public" ON public.course_translations
  FOR SELECT TO public
  USING (EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.is_published = true));

-- ============================================================
-- LESSONS
-- ============================================================
CREATE TABLE public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  slug text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  duration_minutes int NOT NULL DEFAULT 10,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(course_id, slug)
);

CREATE INDEX idx_lessons_course ON public.lessons(course_id, sort_order);

GRANT SELECT ON public.lessons TO anon, authenticated;
GRANT ALL ON public.lessons TO service_role;

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons of published courses" ON public.lessons
  FOR SELECT TO public
  USING (EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.is_published = true));

-- ============================================================
-- LESSON TRANSLATIONS
-- ============================================================
CREATE TABLE public.lesson_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  lang_code text NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  title text NOT NULL,
  summary text,
  content_markdown text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(lesson_id, lang_code)
);

CREATE INDEX idx_lesson_tr_lookup ON public.lesson_translations(lesson_id, lang_code);

GRANT SELECT ON public.lesson_translations TO anon, authenticated;
GRANT ALL ON public.lesson_translations TO service_role;

ALTER TABLE public.lesson_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lesson translations public" ON public.lesson_translations
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM public.lessons l
    JOIN public.courses c ON c.id = l.course_id
    WHERE l.id = lesson_id AND c.is_published = true
  ));

-- ============================================================
-- QUIZZES
-- ============================================================
CREATE TABLE public.quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  sort_order int NOT NULL DEFAULT 0,
  correct_option_index int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_quizzes_lesson ON public.quizzes(lesson_id, sort_order);

GRANT SELECT ON public.quizzes TO anon, authenticated;
GRANT ALL ON public.quizzes TO service_role;

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quizzes of published courses" ON public.quizzes
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM public.lessons l
    JOIN public.courses c ON c.id = l.course_id
    WHERE l.id = lesson_id AND c.is_published = true
  ));

-- ============================================================
-- QUIZ TRANSLATIONS
-- ============================================================
CREATE TABLE public.quiz_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  lang_code text NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  explanation text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(quiz_id, lang_code)
);

CREATE INDEX idx_quiz_tr_lookup ON public.quiz_translations(quiz_id, lang_code);

GRANT SELECT ON public.quiz_translations TO anon, authenticated;
GRANT ALL ON public.quiz_translations TO service_role;

ALTER TABLE public.quiz_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quiz translations public" ON public.quiz_translations
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM public.quizzes q
    JOIN public.lessons l ON l.id = q.lesson_id
    JOIN public.courses c ON c.id = l.course_id
    WHERE q.id = quiz_id AND c.is_published = true
  ));

-- ============================================================
-- PROJECTS (capstones)
-- ============================================================
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  slug text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  estimated_hours int NOT NULL DEFAULT 2,
  difficulty text NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy','medium','hard')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(course_id, slug)
);

CREATE INDEX idx_projects_course ON public.projects(course_id, sort_order);

GRANT SELECT ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects of published courses" ON public.projects
  FOR SELECT TO public
  USING (EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.is_published = true));

-- ============================================================
-- PROJECT TRANSLATIONS
-- ============================================================
CREATE TABLE public.project_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  lang_code text NOT NULL REFERENCES public.languages(code) ON DELETE CASCADE,
  title text NOT NULL,
  brief text NOT NULL,
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  deliverables jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(project_id, lang_code)
);

CREATE INDEX idx_project_tr_lookup ON public.project_translations(project_id, lang_code);

GRANT SELECT ON public.project_translations TO anon, authenticated;
GRANT ALL ON public.project_translations TO service_role;

ALTER TABLE public.project_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project translations public" ON public.project_translations
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    JOIN public.courses c ON c.id = p.course_id
    WHERE p.id = project_id AND c.is_published = true
  ));

-- ============================================================
-- Update timestamps triggers
-- ============================================================
CREATE TRIGGER courses_updated BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER course_tr_updated BEFORE UPDATE ON public.course_translations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER lesson_tr_updated BEFORE UPDATE ON public.lesson_translations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();