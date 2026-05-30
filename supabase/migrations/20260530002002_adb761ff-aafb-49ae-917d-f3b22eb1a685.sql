INSERT INTO storage.buckets (id, name, public) VALUES ('course-covers', 'course-covers', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "course-covers public read" ON storage.objects FOR SELECT USING (bucket_id = 'course-covers');
CREATE POLICY "course-covers service write" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'course-covers');
CREATE POLICY "course-covers service update" ON storage.objects FOR UPDATE USING (bucket_id = 'course-covers');