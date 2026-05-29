export type Lang = "en" | "ar";

export type CourseCategory = "ai" | "programming" | "psychology" | "business";

export interface QuizQuestion {
  en: { question: string; options: string[]; explanation: string };
  ar: { question: string; options: string[]; explanation: string };
  correctIndex: number;
}

export interface LessonVideo {
  /** YouTube video ID (e.g. "aircAruvnKk") */
  youtubeId: string;
  /** Human-readable source name for attribution */
  sourceName: string;
  /** Link back to the original source */
  sourceUrl: string;
}

export interface Lesson {
  slug: string;
  durationMinutes: number;
  /** Optional per-language video. If only one provided, used for both langs as fallback. */
  video?: { en?: LessonVideo; ar?: LessonVideo };
  en: { title: string; summary: string; content: string };
  ar: { title: string; summary: string; content: string };
  quiz: QuizQuestion[];
}

export interface Project {
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedHours: number;
  en: { title: string; brief: string; requirements: string[]; deliverables: string[] };
  ar: { title: string; brief: string; requirements: string[]; deliverables: string[] };
}

export interface Course {
  slug: string;
  level: "beginner" | "intermediate" | "advanced";
  durationMinutes: number;
  accentColor: string;
  coverGradient: string;
  icon: string;
  category: CourseCategory;
  en: {
    title: string;
    tagline: string;
    description: string;
    learningOutcomes: string[];
    prerequisites: string[];
  };
  ar: {
    title: string;
    tagline: string;
    description: string;
    learningOutcomes: string[];
    prerequisites: string[];
  };
  lessons: Lesson[];
  project: Project;
}
