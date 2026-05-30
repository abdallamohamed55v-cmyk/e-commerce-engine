import { useQuery } from "@tanstack/react-query";
import {
  fetchCourseSummaries,
  fetchCourse,
  type Lang,
} from "@/lib/courses-db";

export function useDbCourses(lang: Lang) {
  return useQuery({
    queryKey: ["db-courses", lang],
    queryFn: () => fetchCourseSummaries(lang),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDbCourse(slug: string | undefined, lang: Lang) {
  return useQuery({
    queryKey: ["db-course", slug, lang],
    queryFn: () => fetchCourse(slug!, lang),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
