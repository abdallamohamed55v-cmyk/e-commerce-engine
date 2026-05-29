import type { Course } from "../types";

const course: Course = {
  slug: "cognitive-biases",
  level: "beginner",
  durationMinutes: 180,
  accentColor: "#ec4899",
  coverGradient: "from-pink-500 via-rose-500 to-red-500",
  icon: "AlertTriangle",
  category: "psychology",
  en: { title: "Cognitive Biases & Decision Making", tagline: "Why smart people make dumb decisions — and how to avoid it.", description: "Free curated lessons from Veritasium, TED-Ed, and Kahneman talks. Master the most consequential biases in everyday thinking.", learningOutcomes: ["Identify 10+ common biases in yourself", "Use System 1 vs System 2 thinking", "Make better decisions under uncertainty"], prerequisites: ["None"] },
  ar: { title: "التحيزات المعرفية و اتخاذ القرار", tagline: "ليه الناس الذكية بتاخد قرارات غبية — و إزاي تتجنب ده.", description: "دروس مجانية مختارة من Veritasium و TED-Ed و محاضرات كانمان. أتقن أهم التحيزات في التفكير اليومي.", learningOutcomes: ["اعرف 10+ تحيز شائع في نفسك", "استخدم نظام 1 ضد نظام 2 في التفكير", "خد قرارات أفضل في حالة عدم اليقين"], prerequisites: ["لا شيء"] },
  lessons: [
    { slug: "system-1-vs-system-2", durationMinutes: 30, video: { en: { youtubeId: "PirFrDVRBo4", sourceName: "Daniel Kahneman / TED", sourceUrl: "https://www.youtube.com/@TED" } },
      en: { title: "System 1 vs System 2", summary: "Two ways your brain thinks.", content: `# Two Systems\n\n- **System 1**: fast, automatic, intuitive — but error-prone\n- **System 2**: slow, deliberate, analytical — but lazy\n\nMost biases come from System 1 acting unchecked.` },
      ar: { title: "نظام 1 ضد نظام 2", summary: "طريقتين عقلك بيفكر بيهم.", content: `# النظامين\n\n- **نظام 1**: سريع، تلقائي، حدسي — لكن معرّض للخطأ\n- **نظام 2**: بطيء، متأنّي، تحليلي — لكن كسول\n\nمعظم التحيزات بتيجي من نظام 1 وهو شغّال من غير مراجعة.` },
      quiz: [{ correctIndex: 1, en: { question: "Which system handles intuitive snap judgments?", options: ["System 2", "System 1", "Both equally", "Neither"], explanation: "System 1 = fast & automatic." }, ar: { question: "أنهي نظام بيتعامل مع الأحكام السريعة الحدسية؟", options: ["نظام 2", "نظام 1", "الاتنين بالتساوي", "ولا واحد"], explanation: "نظام 1 = سريع و تلقائي." } }] },
    { slug: "confirmation-bias", durationMinutes: 25, video: { en: { youtubeId: "vKA4w2O61Xo", sourceName: "TED-Ed", sourceUrl: "https://www.youtube.com/@TEDEd" } },
      en: { title: "Confirmation Bias", summary: "Why we only see what we already believe.", content: `# Confirmation Bias\n\nWe seek and remember info that confirms what we already think, and ignore disconfirming evidence.\n\n## Counter-strategies\n- Actively seek opposing views\n- Ask: "What evidence would change my mind?"\n- Steelman the other side` },
      ar: { title: "تحيز التأكيد", summary: "ليه بنشوف بس اللي بنصدّقه أصلاً.", content: `# تحيز التأكيد\n\nبندوّر و نفتكر المعلومات اللي بتأكّد اللي إحنا مفكرينه، و بنتجاهل الأدلة المضادة.\n\n## استراتيجيات مضادة\n- ابحث بنشاط عن الآراء المعارضة\n- اسأل: "إيه الدليل اللي يغيّر رأيي؟"\n- قدّم وجهة النظر المعارضة بأقوى صورها` },
      quiz: [{ correctIndex: 0, en: { question: "Confirmation bias makes us...", options: ["Favor info supporting our views", "Question everything equally", "Reject all evidence", "Forget easily"], explanation: "We cherry-pick confirming evidence." }, ar: { question: "تحيز التأكيد بيخلينا...", options: ["نفضّل المعلومات اللي بتدعم رأينا", "نشكك في كل حاجة بالتساوي", "نرفض كل الأدلة", "ننسى بسهولة"], explanation: "بننتقي الأدلة المؤيدة بس." } }] },
    { slug: "availability-anchoring", durationMinutes: 30,
      en: { title: "Availability & Anchoring", summary: "Two of the most powerful judgment biases.", content: `# Availability Heuristic\nWe judge frequency by how easily examples come to mind. Plane crashes feel common because they're memorable — they're not.\n\n# Anchoring\nThe first number you hear biases all subsequent estimates. Negotiators exploit this.` },
      ar: { title: "الإتاحة و الترسيخ", summary: "اتنين من أقوى تحيزات الحكم.", content: `# تحيز الإتاحة\nبنحكم على التكرار بناءً على سهولة استدعاء الأمثلة. حوادث الطيران بتحس بإنها شائعة لأنها بتعلق في الذاكرة — مش لأنها فعلاً كده.\n\n# الترسيخ (Anchoring)\nأول رقم بتسمعه بيحيّز كل تقديراتك بعدين. المفاوضين بيستغلّوا ده.` },
      quiz: [{ correctIndex: 2, en: { question: "Anchoring is...", options: ["Always conscious", "About boats", "First info disproportionately influencing later judgments", "A type of confirmation bias"], explanation: "The first reference point shapes later estimates." }, ar: { question: "الترسيخ هو...", options: ["دايماً واعي", "خاص بالمراكب", "أول معلومة بتأثر بشكل غير متناسب على الأحكام بعديها", "نوع من تحيز التأكيد"], explanation: "أول نقطة مرجعية بتشكّل التقديرات بعديها." } }] },
  ],
  project: { slug: "bias-audit", difficulty: "easy", estimatedHours: 2, en: { title: "Personal Bias Audit", brief: "Review a recent decision you made and identify which biases influenced it.", requirements: ["Pick a real decision", "List at least 3 biases involved", "Write what you'd do differently"], deliverables: ["1-page writeup"] }, ar: { title: "تدقيق تحيزاتك الشخصية", brief: "راجع قرار أخدته مؤخراً و اعرف أنهي تحيزات أثّرت فيه.", requirements: ["اختار قرار حقيقي", "اذكر على الأقل 3 تحيزات", "اكتب هتعمل إيه مختلف"], deliverables: ["كتابة من صفحة"] } },
};

export default course;
