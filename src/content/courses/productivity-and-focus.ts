import type { Course } from "../types";

const course: Course = {
  slug: "productivity-and-focus",
  level: "beginner",
  durationMinutes: 180,
  accentColor: "#10b981",
  coverGradient: "from-emerald-500 via-green-500 to-lime-500",
  icon: "Target",
  category: "business",
  en: { title: "Productivity & Deep Focus", tagline: "Get more done by doing less — better.", description: "Curated free talks from Cal Newport, Ali Abdaal, and Tim Ferriss. Build systems, not motivation.", learningOutcomes: ["Plan weeks that actually ship", "Build deep work blocks", "Beat procrastination with systems", "Audit & cut low-value work"], prerequisites: ["None"] },
  ar: { title: "الإنتاجية و التركيز العميق", tagline: "اعمل أكتر بإنك تعمل أقل — بشكل أحسن.", description: "محاضرات مجانية مختارة من Cal Newport و Ali Abdaal و Tim Ferriss. ابني أنظمة، مش تحفيز.", learningOutcomes: ["خطّط أسابيع بتنتج فعلاً", "ابني فترات deep work", "اغلب التسويف بأنظمة", "راجع و اقص الشغل القليل القيمة"], prerequisites: ["لا شيء"] },
  lessons: [
    { slug: "deep-work", durationMinutes: 40, video: { en: { youtubeId: "iaXIIQOZyzo", sourceName: "Cal Newport", sourceUrl: "https://www.youtube.com/@CalNewportMedia" } },
      en: { title: "Deep Work", summary: "Cal Newport's framework for cognitive focus.", content: `# Deep Work\n\nThe ability to focus without distraction on a cognitively demanding task.\n\nRules:\n1. Schedule it (calendar block)\n2. Embrace boredom\n3. Quit social media (during blocks)\n4. Drain the shallows` },
      ar: { title: "العمل العميق", summary: "إطار Cal Newport للتركيز المعرفي.", content: `# العمل العميق\n\nالقدرة على التركيز بدون تشتيت على مهمة تتطلب جهد ذهني.\n\nقواعد:\n1. خصّص له وقت (في التقويم)\n2. اقبل الملل\n3. ابعد عن السوشيال (خلال الفترات)\n4. اقص الشغل السطحي` },
      quiz: [{ correctIndex: 1, en: { question: "Deep work requires...", options: ["Multitasking", "Distraction-free focus blocks", "Constant notifications", "Open-plan offices"], explanation: "It's the opposite of fragmented attention." }, ar: { question: "العمل العميق محتاج...", options: ["تعدد المهام", "فترات تركيز خالية من التشتيت", "إشعارات مستمرة", "مكاتب مفتوحة"], explanation: "هو عكس الانتباه المجزأ." } }] },
    { slug: "time-blocking", durationMinutes: 30, video: { en: { youtubeId: "lQ04vXjU-50", sourceName: "Ali Abdaal", sourceUrl: "https://www.youtube.com/@aliabdaal" } },
      en: { title: "Time Blocking & Weekly Reviews", summary: "Design your week before it designs you.", content: `# Time Blocking\n\nSchedule every hour of your workday into blocks. Adjust as reality hits.\n\n## Weekly Review (30 min, Sunday)\n- What worked? What didn't?\n- 3 priorities for next week\n- Block those priorities first` },
      ar: { title: "التقسيم الزمني و المراجعات الأسبوعية", summary: "صمّم أسبوعك قبل ما يصممك.", content: `# التقسيم الزمني\n\nخصّص كل ساعة من يوم شغلك في بلوكات. عدّل لما الواقع يطرق.\n\n## مراجعة أسبوعية (30 دقيقة، الأحد)\n- إيه اللي اشتغل؟ إيه اللي لأ؟\n- 3 أولويات للأسبوع الجاي\n- خصّص بلوكات للأولويات دي الأول` },
      quiz: [{ correctIndex: 2, en: { question: "Weekly reviews should focus on...", options: ["Email cleanup", "Just rest", "Reflection + planning top 3 priorities", "Reading the news"], explanation: "Reflection + intention beats reactivity." }, ar: { question: "المراجعة الأسبوعية لازم تركز على...", options: ["تنظيف الإيميل", "الراحة بس", "التأمل + التخطيط لأهم 3 أولويات", "قراءة الأخبار"], explanation: "التأمل + النية بيغلبوا ردة الفعل." } }] },
    { slug: "beat-procrastination", durationMinutes: 30,
      en: { title: "Beat Procrastination", summary: "Systems > willpower.", content: `# Procrastination\n\nProcrastination is emotional regulation, not laziness.\n\nFixes:\n- 2-minute rule: start, just for 2 min\n- Implementation intentions: "When X, I will Y at Z"\n- Remove friction: prep the environment` },
      ar: { title: "اغلب التسويف", summary: "الأنظمة > الإرادة.", content: `# التسويف\n\nالتسويف تنظيم عاطفي، مش كسل.\n\nحلول:\n- قاعدة الدقيقتين: ابدأ، لـ2 دقيقة بس\n- نوايا التنفيذ: "لما X، هعمل Y عند Z"\n- اقص الاحتكاك: جهّز البيئة` },
      quiz: [{ correctIndex: 0, en: { question: "Procrastination is mostly...", options: ["Emotional regulation issue", "Lack of willpower", "Bad genes", "Bad calendar app"], explanation: "It's about avoiding negative emotions." }, ar: { question: "التسويف غالباً...", options: ["مشكلة في التنظيم العاطفي", "نقص في الإرادة", "جينات سيئة", "تطبيق تقويم سيء"], explanation: "بيتعلق بتجنب المشاعر السلبية." } }] },
  ],
  project: { slug: "productivity-system", difficulty: "easy", estimatedHours: 3, en: { title: "Build Your Productivity System", brief: "Design a personal system: capture, prioritize, schedule, review.", requirements: ["Pick a capture tool", "Define weekly review ritual", "Schedule 3 deep work blocks", "Use it for 1 week"], deliverables: ["System writeup + 1-week log"] }, ar: { title: "ابني نظامك الإنتاجي", brief: "صمّم نظام شخصي: التقاط، ترتيب أولويات، جدولة، مراجعة.", requirements: ["اختار أداة التقاط", "حدّد طقس المراجعة الأسبوعية", "جدول 3 بلوكات deep work", "استخدمه لأسبوع"], deliverables: ["كتابة النظام + سجل أسبوع"] } },
};

export default course;
