import type { Course } from "../types";

const course: Course = {
  slug: "startup-fundamentals",
  level: "beginner",
  durationMinutes: 300,
  accentColor: "#f97316",
  coverGradient: "from-orange-500 via-amber-500 to-yellow-500",
  icon: "Rocket",
  category: "business",
  en: { title: "Startup Fundamentals", tagline: "Build something people want — the YC playbook.", description: "Curated free talks from Y Combinator's Startup School: Paul Graham, Sam Altman, Michael Seibel. Ideas, MVPs, traction, and fundraising.", learningOutcomes: ["Evaluate startup ideas honestly", "Ship an MVP fast", "Talk to users the right way", "Understand fundraising basics"], prerequisites: ["None"] },
  ar: { title: "أساسيات الستارت أب", tagline: "ابني حاجة الناس عايزاها — منهجية Y Combinator.", description: "محاضرات مجانية مختارة من Startup School التابعة لـY Combinator: بول جراهام، سام ألتمان، مايكل سيبل. الأفكار، MVP، الـtraction، و التمويل.", learningOutcomes: ["قيّم أفكار الستارت أب بصدق", "اطلق MVP بسرعة", "اتكلم مع المستخدمين صح", "افهم أساسيات التمويل"], prerequisites: ["لا شيء"] },
  lessons: [
    { slug: "how-to-start", durationMinutes: 50, video: { en: { youtubeId: "CBYhVcO4WgI", sourceName: "Y Combinator", sourceUrl: "https://www.youtube.com/@ycombinator" } },
      en: { title: "How to Start a Startup", summary: "Sam Altman's intro lecture.", content: `# Starting Up\n\nFour things you need: **idea, product, team, execution**. Most fail on execution.\n\nStart with a problem you've personally felt. Build for a small group who love you, not a huge group who like you.` },
      ar: { title: "إزاي تبدأ ستارت أب", summary: "محاضرة سام ألتمان التمهيدية.", content: `# البداية\n\nأربع حاجات محتاجها: **فكرة، منتج، فريق، تنفيذ**. أغلبهم بيفشلوا في التنفيذ.\n\nابدأ بمشكلة حسيتها بنفسك. ابني لمجموعة صغيرة بتحبك، مش مجموعة كبيرة بتاخدك عادي.` },
      quiz: [{ correctIndex: 3, en: { question: "Most startups fail because of...", options: ["Bad ideas", "No funding", "Weak team", "Poor execution"], explanation: "Execution beats ideas." }, ar: { question: "أغلب الستارت أب بتفشل بسبب...", options: ["أفكار سيئة", "مفيش تمويل", "فريق ضعيف", "تنفيذ ضعيف"], explanation: "التنفيذ بيغلب الأفكار." } }] },
    { slug: "how-to-get-ideas", durationMinutes: 45, video: { en: { youtubeId: "Th8JoIan4dg", sourceName: "Y Combinator", sourceUrl: "https://www.youtube.com/@ycombinator" } },
      en: { title: "How to Get Startup Ideas", summary: "Paul Graham's classic essay, animated.", content: `# Getting Ideas\n\nThe best ideas come from **noticing problems**, not brainstorming.\n\nLive in the future. Build what's missing. Look for things broken in your own life.` },
      ar: { title: "إزاي تجيب أفكار ستارت أب", summary: "مقالة بول جراهام الكلاسيكية، متحركة.", content: `# جلب الأفكار\n\nأحسن الأفكار بتيجي من **ملاحظة المشاكل**، مش brainstorming.\n\nعيش في المستقبل. ابني اللي ناقص. دوّر على حاجات مكسورة في حياتك أنت.` },
      quiz: [{ correctIndex: 1, en: { question: "Best source of startup ideas?", options: ["Brainstorming sessions", "Problems you personally face", "Trend reports", "Competitor analysis"], explanation: "Live in the future, build what's missing." }, ar: { question: "أحسن مصدر لأفكار الستارت أب؟", options: ["جلسات brainstorming", "مشاكل بتواجهها أنت شخصياً", "تقارير الترندات", "تحليل المنافسين"], explanation: "عيش في المستقبل، ابني اللي ناقص." } }] },
    { slug: "mvp-and-launch", durationMinutes: 45, video: { en: { youtubeId: "1hHMwLxN6EM", sourceName: "Y Combinator / Michael Seibel", sourceUrl: "https://www.youtube.com/@ycombinator" } },
      en: { title: "Build an MVP & Launch", summary: "Ship in weeks, not months.", content: `# MVP\n\nMinimum Viable Product = smallest thing that delivers value to your first user.\n\n- Cut features ruthlessly\n- Launch when it's embarrassing\n- Talk to 10 users a week` },
      ar: { title: "ابني MVP و اطلق", summary: "اطلق في أسابيع، مش شهور.", content: `# MVP\n\nMinimum Viable Product = أصغر حاجة بتوصّل قيمة لأول مستخدم.\n\n- اقص الـfeatures بقسوة\n- اطلق و انت محرج\n- اتكلم مع 10 مستخدمين كل أسبوع` },
      quiz: [{ correctIndex: 2, en: { question: "MVP means...", options: ["Most Valuable Player", "Marketing Validation Point", "Minimum Viable Product", "Maximum Variable Plan"], explanation: "Smallest product that delivers value." }, ar: { question: "MVP معناها...", options: ["Most Valuable Player", "Marketing Validation Point", "Minimum Viable Product", "Maximum Variable Plan"], explanation: "أصغر منتج بيوصّل قيمة." } }] },
    { slug: "talking-to-users", durationMinutes: 35, video: { en: { youtubeId: "MT4Ig2uqjTc", sourceName: "Y Combinator", sourceUrl: "https://www.youtube.com/@ycombinator" } },
      en: { title: "How to Talk to Users", summary: "Avoid leading questions; learn what they actually do.", content: `# User Interviews\n\nDon't ask "would you use this?" — ask about past behavior:\n\n- "When was the last time you faced X?"\n- "What did you do?"\n- "What didn't work about it?"` },
      ar: { title: "إزاي تتكلم مع المستخدمين", summary: "اتجنب الأسئلة الموجّهة؛ اعرف بيعملوا إيه فعلاً.", content: `# مقابلات المستخدمين\n\nمتسألش "هل تستخدم ده؟" — اسأل عن سلوك سابق:\n\n- "إمتى آخر مرة واجهت X؟"\n- "عملت إيه؟"\n- "إيه اللي ميشتغلش كويس فيه؟"` },
      quiz: [{ correctIndex: 0, en: { question: "Best user interview question?", options: ["When was the last time you did X?", "Would you pay for this?", "Do you like our idea?", "What features should we add?"], explanation: "Past behavior predicts future behavior; opinions don't." }, ar: { question: "أحسن سؤال في مقابلة مستخدم؟", options: ["إمتى آخر مرة عملت X؟", "هل تدفع علشان ده؟", "بتحب فكرتنا؟", "نضيف إيه features؟"], explanation: "السلوك السابق بيتنبأ بالمستقبل؛ الآراء لأ." } }] },
  ],
  project: { slug: "validate-idea", difficulty: "medium", estimatedHours: 6, en: { title: "Validate a Startup Idea", brief: "Pick an idea, interview 10 real potential users, write up your findings.", requirements: ["Define hypothesis", "10 user interviews (no leading questions)", "Synthesis writeup", "Go/pivot/kill decision"], deliverables: ["Findings doc + interview notes"] }, ar: { title: "تحقق من فكرة ستارت أب", brief: "اختار فكرة، قابل 10 مستخدمين محتملين حقيقيين، اكتب نتائجك.", requirements: ["حدّد الفرضية", "10 مقابلات مستخدمين (بدون أسئلة موجّهة)", "تركيب النتائج", "قرار: استمر/غيّر/أوقف"], deliverables: ["مستند النتائج + ملاحظات المقابلات"] } },
};

export default course;
