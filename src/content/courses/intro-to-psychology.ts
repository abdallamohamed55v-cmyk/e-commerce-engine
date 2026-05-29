import type { Course } from "../types";

const course: Course = {
  slug: "intro-to-psychology",
  level: "beginner",
  durationMinutes: 300,
  accentColor: "#a855f7",
  coverGradient: "from-purple-500 via-fuchsia-500 to-pink-500",
  icon: "Brain",
  category: "psychology",
  en: { title: "Intro to Psychology", tagline: "How the mind works — a curated tour.", description: "A free curated mini-course built from Crash Course Psychology (Hank Green) and TED-Ed. Covers history, the brain, learning, memory, and personality.", learningOutcomes: ["Explain key psychological perspectives", "Describe how memory & learning work", "Recognize personality models", "Apply psychology to daily life"], prerequisites: ["Curiosity"] },
  ar: { title: "مقدمة في علم النفس", tagline: "إزاي العقل بيشتغل — جولة مختارة.", description: "كورس صغير مجاني مختار من Crash Course Psychology و TED-Ed. بيغطي التاريخ، الدماغ، التعلم، الذاكرة، و الشخصية.", learningOutcomes: ["اشرح المناظير النفسية الأساسية", "اوصف إزاي الذاكرة و التعلم بيشتغلوا", "اعرف نماذج الشخصية", "طبّق علم النفس في حياتك اليومية"], prerequisites: ["فضول"] },
  lessons: [
    { slug: "what-is-psychology", durationMinutes: 30, video: { en: { youtubeId: "vo4pMVb0R6M", sourceName: "CrashCourse", sourceUrl: "https://www.youtube.com/@crashcourse" } },
      en: { title: "What Is Psychology?", summary: "From Freud to neuroscience.", content: `# Psychology\n\nThe scientific study of mind & behavior. Modern psychology blends biology, cognition, and culture — not just couches and inkblots.` },
      ar: { title: "إيه هو علم النفس؟", summary: "من فرويد للعلوم العصبية.", content: `# علم النفس\n\nالدراسة العلمية للعقل و السلوك. علم النفس الحديث بيدمج البيولوجيا و الإدراك و الثقافة — مش بس الكنبة و رسومات الحبر.` },
      quiz: [{ correctIndex: 2, en: { question: "Psychology is best defined as...", options: ["The study of mental illness only", "The study of dreams", "The scientific study of mind & behavior", "A branch of philosophy"], explanation: "Psychology is the science of mind and behavior." }, ar: { question: "أفضل تعريف لعلم النفس...", options: ["دراسة الأمراض النفسية بس", "دراسة الأحلام", "الدراسة العلمية للعقل و السلوك", "فرع من الفلسفة"], explanation: "علم النفس هو علم العقل و السلوك." } }] },
    { slug: "the-brain", durationMinutes: 35, video: { en: { youtubeId: "vHrmiy4W9C0", sourceName: "CrashCourse", sourceUrl: "https://www.youtube.com/@crashcourse" } },
      en: { title: "The Brain & Nervous System", summary: "Neurons, lobes, and what each does.", content: `# The Brain\n\n- **Frontal lobe**: decisions, planning, personality\n- **Temporal**: hearing, language, memory\n- **Parietal**: spatial awareness, touch\n- **Occipital**: vision\n\nNeurons fire electrochemical signals across synapses.` },
      ar: { title: "الدماغ و الجهاز العصبي", summary: "العصبونات، الفصوص، و وظائفها.", content: `# الدماغ\n\n- **الفص الجبهي**: القرارات، التخطيط، الشخصية\n- **الصدغي**: السمع، اللغة، الذاكرة\n- **الجداري**: الإدراك المكاني، اللمس\n- **القذالي**: الرؤية\n\nالعصبونات بتطلق إشارات كهروكيميائية عبر الـsynapses.` },
      quiz: [{ correctIndex: 0, en: { question: "Which lobe handles decision-making & planning?", options: ["Frontal", "Temporal", "Parietal", "Occipital"], explanation: "The frontal lobe houses executive function." }, ar: { question: "أنهي فص مسؤول عن اتخاذ القرارات و التخطيط؟", options: ["الجبهي", "الصدغي", "الجداري", "القذالي"], explanation: "الفص الجبهي مسؤول عن الوظائف التنفيذية." } }] },
    { slug: "learning-and-memory", durationMinutes: 40, video: { en: { youtubeId: "bSycdIx-C48", sourceName: "CrashCourse", sourceUrl: "https://www.youtube.com/@crashcourse" } },
      en: { title: "Learning & Memory", summary: "Classical & operant conditioning, memory systems.", content: `# Learning\n\n- **Classical conditioning** (Pavlov): pairing stimuli\n- **Operant conditioning** (Skinner): reinforcement & punishment\n\n## Memory\n- Sensory → Short-term → Long-term\n- Spaced repetition beats cramming.` },
      ar: { title: "التعلم و الذاكرة", summary: "الإشراط الكلاسيكي و الإجرائي، أنظمة الذاكرة.", content: `# التعلم\n\n- **الإشراط الكلاسيكي** (بافلوف): اقتران المنبهات\n- **الإشراط الإجرائي** (سكينر): التعزيز و العقاب\n\n## الذاكرة\n- حسية → قصيرة المدى → طويلة المدى\n- التكرار المتباعد بيغلب الحشر.` },
      quiz: [{ correctIndex: 1, en: { question: "Who is associated with classical conditioning?", options: ["Skinner", "Pavlov", "Freud", "Jung"], explanation: "Pavlov & his dogs." }, ar: { question: "مين مرتبط بالإشراط الكلاسيكي؟", options: ["سكينر", "بافلوف", "فرويد", "يونغ"], explanation: "بافلوف و كلابه." } }] },
    { slug: "personality", durationMinutes: 35, video: { en: { youtubeId: "sUrV6oZ3zsk", sourceName: "CrashCourse", sourceUrl: "https://www.youtube.com/@crashcourse" } },
      en: { title: "Personality: The Big Five", summary: "OCEAN — the most validated personality model.", content: `# The Big Five\n\n- **O**penness\n- **C**onscientiousness\n- **E**xtraversion\n- **A**greeableness\n- **N**euroticism\n\nMore evidence-based than MBTI.` },
      ar: { title: "الشخصية: الخمسة الكبار", summary: "OCEAN — أكثر نموذج شخصية مدعوم بالأدلة.", content: `# الخمسة الكبار\n\n- **O** الانفتاح\n- **C** الضمير الحي\n- **E** الانبساط\n- **A** القبول\n- **N** العصابية\n\nمدعومة بالأدلة أكتر من MBTI.` },
      quiz: [{ correctIndex: 3, en: { question: "What does the C in OCEAN stand for?", options: ["Creativity", "Curiosity", "Compassion", "Conscientiousness"], explanation: "Conscientiousness = self-discipline, organization." }, ar: { question: "C في OCEAN ترمز لإيه؟", options: ["الإبداع", "الفضول", "الرحمة", "الضمير الحي"], explanation: "الضمير الحي = الانضباط الذاتي و التنظيم." } }] },
  ],
  project: { slug: "reflection-journal", difficulty: "easy", estimatedHours: 2, en: { title: "Personal Behavior Journal", brief: "Track one habit for 14 days using operant conditioning principles.", requirements: ["Define target behavior", "Choose reinforcement", "Daily log", "Reflection writeup"], deliverables: ["Journal PDF or doc"] }, ar: { title: "يومية سلوك شخصية", brief: "تتبّع عادة واحدة لمدة 14 يوم باستخدام مبادئ الإشراط الإجرائي.", requirements: ["حدّد السلوك المستهدف", "اختار نوع التعزيز", "سجل يومي", "كتابة تأمل"], deliverables: ["يومية PDF أو doc"] } },
};

export default course;
