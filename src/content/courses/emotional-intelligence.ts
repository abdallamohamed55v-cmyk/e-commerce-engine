import type { Course } from "../types";

const course: Course = {
  slug: "emotional-intelligence",
  level: "beginner",
  durationMinutes: 200,
  accentColor: "#14b8a6",
  coverGradient: "from-teal-400 via-emerald-500 to-green-600",
  icon: "Heart",
  category: "psychology",
  en: { title: "Emotional Intelligence", tagline: "Manage your emotions — and read others.", description: "Curated free talks from Daniel Goleman, Brene Brown, and TED. Build the skill that predicts success better than IQ.", learningOutcomes: ["Name what you feel accurately", "Regulate emotional responses", "Read emotions in others", "Communicate with empathy"], prerequisites: ["None"] },
  ar: { title: "الذكاء العاطفي", tagline: "تحكّم في مشاعرك — و افهم الآخرين.", description: "محاضرات مجانية مختارة لدانيال جولمان و برينيه براون و TED. المهارة اللي بتتنبأ بالنجاح أكتر من الذكاء العقلي.", learningOutcomes: ["سمّي اللي بتحس بيه بدقة", "اضبط الاستجابات العاطفية", "اقرأ مشاعر الآخرين", "اتواصل بتعاطف"], prerequisites: ["لا شيء"] },
  lessons: [
    { slug: "what-is-eq", durationMinutes: 30, video: { en: { youtubeId: "Y7m9eNoB3NU", sourceName: "Daniel Goleman / TED", sourceUrl: "https://www.youtube.com/@TED" } },
      en: { title: "The Four Domains of EQ", summary: "Self-awareness, self-management, social awareness, relationship management.", content: `# The Four Domains\n\n1. **Self-awareness** — knowing what you feel & why\n2. **Self-management** — regulating your responses\n3. **Social awareness** — reading others\n4. **Relationship management** — handling conflicts & connection` },
      ar: { title: "المجالات الأربعة للذكاء العاطفي", summary: "الوعي بالذات، إدارة الذات، الوعي الاجتماعي، إدارة العلاقات.", content: `# المجالات الأربعة\n\n1. **الوعي بالذات** — تعرف بتحس بإيه و ليه\n2. **إدارة الذات** — تضبط استجاباتك\n3. **الوعي الاجتماعي** — تقرا الآخرين\n4. **إدارة العلاقات** — تتعامل مع الخلافات و التواصل` },
      quiz: [{ correctIndex: 0, en: { question: "Which is the foundation of EQ?", options: ["Self-awareness", "Charisma", "Public speaking", "Anger control"], explanation: "Everything else builds on knowing what you feel." }, ar: { question: "إيه أساس الذكاء العاطفي؟", options: ["الوعي بالذات", "الكاريزما", "الخطابة", "ضبط الغضب"], explanation: "كل حاجة تانية بتتبني على إنك تعرف بتحس بإيه." } }] },
    { slug: "vulnerability", durationMinutes: 40, video: { en: { youtubeId: "iCvmsMzlF7o", sourceName: "Brene Brown / TED", sourceUrl: "https://www.youtube.com/@TED" } },
      en: { title: "Vulnerability & Connection", summary: "Brene Brown's research on why vulnerability is strength.", content: `# Vulnerability\n\nVulnerability isn't weakness — it's the birthplace of courage, creativity, and connection.\n\nShame thrives on silence. Naming it weakens it.` },
      ar: { title: "الانكشاف و التواصل", summary: "أبحاث برينيه براون عن الانكشاف كقوة.", content: `# الانكشاف\n\nالانكشاف مش ضعف — هو مهد الشجاعة و الإبداع و التواصل.\n\nالخجل بيعيش في الصمت. تسميته بتضعفه.` },
      quiz: [{ correctIndex: 1, en: { question: "According to Brene Brown, vulnerability is...", options: ["Weakness", "The birthplace of courage", "Always unsafe", "Only for therapy"], explanation: "Vulnerability is courageous, not weak." }, ar: { question: "حسب برينيه براون، الانكشاف هو...", options: ["ضعف", "مهد الشجاعة", "دايماً غير آمن", "للعلاج النفسي بس"], explanation: "الانكشاف شجاعة مش ضعف." } }] },
    { slug: "empathy-vs-sympathy", durationMinutes: 25, video: { en: { youtubeId: "1Evwgu369Jw", sourceName: "RSA / Brene Brown", sourceUrl: "https://www.youtube.com/@theRSAorg" } },
      en: { title: "Empathy vs Sympathy", summary: "The crucial difference in how you respond.", content: `# Empathy vs Sympathy\n\n- **Sympathy**: "Wow, that sucks."\n- **Empathy**: "I feel that with you."\n\nEmpathy creates connection. Sympathy creates distance.` },
      ar: { title: "التعاطف ضد الإشفاق", summary: "الفرق المهم في طريقة استجابتك.", content: `# التعاطف ضد الإشفاق\n\n- **الإشفاق**: "ياه ده وحش."\n- **التعاطف**: "أنا حاسس بيك."\n\nالتعاطف بيخلق تواصل. الإشفاق بيخلق مسافة.` },
      quiz: [{ correctIndex: 2, en: { question: "Empathy is...", options: ["Feeling sorry for someone", "Fixing their problem", "Feeling with someone", "Avoiding hard topics"], explanation: "Empathy is feeling with, not feeling for." }, ar: { question: "التعاطف هو...", options: ["الإحساس بالأسف لحد", "حل مشكلته", "الإحساس مع حد", "تجنب المواضيع الصعبة"], explanation: "التعاطف هو الإحساس مع — مش الإحساس عن." } }] },
  ],
  project: { slug: "emotion-log", difficulty: "easy", estimatedHours: 2, en: { title: "7-Day Emotion Log", brief: "Track your emotions 3x daily for a week with triggers and responses.", requirements: ["Use a feelings wheel", "Log triggers", "Note your response", "Weekly reflection"], deliverables: ["Log + 1-page reflection"] }, ar: { title: "يومية مشاعر 7 أيام", brief: "تتبّع مشاعرك 3 مرات يومياً لمدة أسبوع مع المحفّزات و الاستجابات.", requirements: ["استخدم عجلة المشاعر", "سجل المحفزات", "دوّن استجابتك", "تأمل أسبوعي"], deliverables: ["سجل + تأمل صفحة"] } },
};

export default course;
