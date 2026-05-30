UPDATE public.course_translations
SET title = regexp_replace(title, '[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF]', '', 'g'),
    tagline = regexp_replace(coalesce(tagline,''), '[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF]', '', 'g'),
    description = regexp_replace(description, '[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF]', '', 'g');

UPDATE public.lesson_translations
SET title = regexp_replace(title, '[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF]', '', 'g'),
    summary = regexp_replace(coalesce(summary,''), '[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF]', '', 'g'),
    content_markdown = regexp_replace(content_markdown, '[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF]', '', 'g');

UPDATE public.course_translations SET title = trim(regexp_replace(title, '\s+', ' ', 'g'));
UPDATE public.lesson_translations SET title = trim(regexp_replace(title, '\s+', ' ', 'g'));