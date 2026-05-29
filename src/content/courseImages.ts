import aiFundamentals from "@/assets/courses/ai-fundamentals.jpg";
import promptEngineering from "@/assets/courses/prompt-engineering.jpg";
import chatgptMastery from "@/assets/courses/chatgpt-mastery.jpg";
import aiAutomation from "@/assets/courses/ai-automation.jpg";
import aiForBusiness from "@/assets/courses/ai-for-business.jpg";
import htmlCssArabic from "@/assets/courses/html-css-arabic.jpg";
import jsFundamentals from "@/assets/courses/javascript-fundamentals.jpg";
import pythonForBeginners from "@/assets/courses/python-for-beginners.jpg";
import reactEssentials from "@/assets/courses/react-essentials.jpg";
import introPsychology from "@/assets/courses/intro-to-psychology.jpg";
import cognitiveBiases from "@/assets/courses/cognitive-biases.jpg";
import emotionalIntelligence from "@/assets/courses/emotional-intelligence.jpg";
import startupFundamentals from "@/assets/courses/startup-fundamentals.jpg";
import digitalMarketing from "@/assets/courses/digital-marketing.jpg";
import productivityFocus from "@/assets/courses/productivity-and-focus.jpg";

export const courseImages: Record<string, string> = {
  "ai-fundamentals": aiFundamentals,
  "prompt-engineering": promptEngineering,
  "chatgpt-mastery": chatgptMastery,
  "ai-automation": aiAutomation,
  "ai-for-business": aiForBusiness,
  "html-css-arabic": htmlCssArabic,
  "javascript-fundamentals": jsFundamentals,
  "python-for-beginners": pythonForBeginners,
  "react-essentials": reactEssentials,
  "intro-to-psychology": introPsychology,
  "cognitive-biases": cognitiveBiases,
  "emotional-intelligence": emotionalIntelligence,
  "startup-fundamentals": startupFundamentals,
  "digital-marketing": digitalMarketing,
  "productivity-and-focus": productivityFocus,
};

export function getCourseImage(slug: string): string | undefined {
  return courseImages[slug];
}
