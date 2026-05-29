import type { Course, Lang, CourseCategory } from "./types";
import aiFundamentals from "./courses/ai-fundamentals";
import promptEngineering from "./courses/prompt-engineering";
import chatgptMastery from "./courses/chatgpt-mastery";
import aiAutomation from "./courses/ai-automation";
import aiForBusiness from "./courses/ai-for-business";
import htmlCssArabic from "./courses/html-css-arabic";
import jsFundamentals from "./courses/javascript-fundamentals";
import pythonForBeginners from "./courses/python-for-beginners";
import reactEssentials from "./courses/react-essentials";
import introPsychology from "./courses/intro-to-psychology";
import cognitiveBiases from "./courses/cognitive-biases";
import emotionalIntelligence from "./courses/emotional-intelligence";
import startupFundamentals from "./courses/startup-fundamentals";
import digitalMarketing from "./courses/digital-marketing";
import productivityFocus from "./courses/productivity-and-focus";

export const courses: Course[] = [
  // AI
  aiFundamentals,
  promptEngineering,
  chatgptMastery,
  aiAutomation,
  aiForBusiness,
  // Programming
  htmlCssArabic,
  jsFundamentals,
  pythonForBeginners,
  reactEssentials,
  // Psychology
  introPsychology,
  cognitiveBiases,
  emotionalIntelligence,
  // Business
  startupFundamentals,
  digitalMarketing,
  productivityFocus,
];

export const CATEGORIES: { key: CourseCategory; en: string; ar: string }[] = [
  { key: "ai", en: "AI", ar: "الذكاء الاصطناعي" },
  { key: "programming", en: "Programming", ar: "البرمجة" },
  { key: "psychology", en: "Psychology", ar: "علم النفس" },
  { key: "business", en: "Business", ar: "الأعمال" },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) return null;
  const idx = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx === -1) return null;
  return {
    course,
    lesson: course.lessons[idx],
    prev: course.lessons[idx - 1] ?? null,
    next: course.lessons[idx + 1] ?? null,
    index: idx,
    total: course.lessons.length,
  };
}

export function localized<T extends { en: any; ar: any }>(item: T, lang: Lang): T["en"] {
  return item[lang];
}

export type { Course, Lesson, QuizQuestion, Project, Lang, CourseCategory } from "./types";
