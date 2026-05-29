import type { Course } from "../types";

const course: Course = {
  slug: "digital-marketing",
  level: "beginner",
  durationMinutes: 240,
  accentColor: "#0ea5e9",
  coverGradient: "from-sky-500 via-blue-500 to-indigo-600",
  icon: "Megaphone",
  category: "business",
  en: { title: "Digital Marketing Essentials", tagline: "Get customers without burning cash.", description: "Curated free lessons from HubSpot Academy, Google Digital Garage, and Neil Patel. Covers SEO, content, paid ads, email, and analytics.", learningOutcomes: ["Set marketing goals tied to revenue", "Run basic SEO & content campaigns", "Launch ads without wasting budget", "Measure what matters"], prerequisites: ["None"] },
  ar: { title: "أساسيات التسويق الرقمي", tagline: "هات عملاء من غير ما تحرق فلوس.", description: "دروس مجانية مختارة من HubSpot Academy و Google Digital Garage و Neil Patel. بتغطي SEO، المحتوى، الإعلانات المدفوعة، الإيميل، و التحليلات.", learningOutcomes: ["حدّد أهداف تسويقية مرتبطة بالإيراد", "شغّل حملات SEO و محتوى أساسية", "اطلق إعلانات من غير ضياع الميزانية", "اقيس اللي بيهم"], prerequisites: ["لا شيء"] },
  lessons: [
    { slug: "marketing-funnel", durationMinutes: 30, video: { en: { youtubeId: "bixR-KIJKYM", sourceName: "HubSpot Academy", sourceUrl: "https://www.youtube.com/@HubSpotAcademy" } },
      en: { title: "The Marketing Funnel", summary: "Awareness → Consideration → Decision.", content: `# The Funnel\n\n- **Top (TOFU)**: build awareness with content & SEO\n- **Middle (MOFU)**: nurture with email & comparisons\n- **Bottom (BOFU)**: convert with demos, free trials, offers` },
      ar: { title: "قمع التسويق", summary: "وعي → تفكير → قرار.", content: `# القمع\n\n- **القمة (TOFU)**: ابني وعي بالمحتوى و SEO\n- **النص (MOFU)**: غذّي بالإيميل و المقارنات\n- **القاع (BOFU)**: حوّل بالـdemos و التجارب المجانية و العروض` },
      quiz: [{ correctIndex: 0, en: { question: "TOFU stands for...", options: ["Top of Funnel", "Total Outreach Function Unit", "Tracked Online Form Use", "Time on Funnel"], explanation: "Top of Funnel = awareness stage." }, ar: { question: "TOFU اختصار لـ...", options: ["Top of Funnel", "Total Outreach Function Unit", "Tracked Online Form Use", "Time on Funnel"], explanation: "Top of Funnel = مرحلة الوعي." } }] },
    { slug: "seo-basics", durationMinutes: 40, video: { en: { youtubeId: "xsVTqzratPs", sourceName: "Ahrefs", sourceUrl: "https://www.youtube.com/@AhrefsCom" } },
      en: { title: "SEO Basics", summary: "Get found on Google for free.", content: `# SEO\n\n3 pillars:\n1. **Technical** — site is crawlable & fast\n2. **On-page** — title, headings, keywords, internal links\n3. **Off-page** — backlinks from trusted sites\n\nGreat content + intent match wins long-term.` },
      ar: { title: "أساسيات SEO", summary: "ظهر على Google مجاناً.", content: `# SEO\n\n3 ركائز:\n1. **تقني** — الموقع قابل للزحف و سريع\n2. **داخل الصفحة** — title و headings و keywords و روابط داخلية\n3. **خارج الصفحة** — backlinks من مواقع موثوقة\n\nمحتوى ممتاز + توافق مع نية البحث = نجاح طويل المدى.` },
      quiz: [{ correctIndex: 2, en: { question: "What are off-page SEO signals?", options: ["Site speed", "Page titles", "Backlinks from other sites", "Internal links"], explanation: "Backlinks are the main off-page signal." }, ar: { question: "إيه إشارات SEO خارج الصفحة؟", options: ["سرعة الموقع", "عناوين الصفحات", "Backlinks من مواقع تانية", "روابط داخلية"], explanation: "الـBacklinks هي الإشارة الأساسية خارج الصفحة." } }] },
    { slug: "paid-ads", durationMinutes: 35, video: { en: { youtubeId: "qC0aq2gKZh4", sourceName: "Neil Patel", sourceUrl: "https://www.youtube.com/@neilpatel" } },
      en: { title: "Paid Ads Without Wasting Budget", summary: "Meta & Google Ads basics.", content: `# Paid Ads\n\n- Start small ($5-20/day), iterate weekly\n- Track conversion, not clicks\n- Kill ads under your target CAC\n- Lookalike audiences > broad targeting` },
      ar: { title: "إعلانات مدفوعة من غير ضياع ميزانية", summary: "أساسيات Meta و Google Ads.", content: `# الإعلانات المدفوعة\n\n- ابدأ صغير ($5-20/يوم)، اطوّر أسبوعياً\n- اتبّع التحويل، مش الـclicks\n- اقفل الإعلانات اللي تحت CAC المستهدف\n- Lookalike audiences > broad targeting` },
      quiz: [{ correctIndex: 1, en: { question: "Main metric to optimize for?", options: ["Clicks", "Conversions / CAC", "Impressions", "CTR only"], explanation: "Revenue per dollar spent matters more than vanity metrics." }, ar: { question: "أهم metric للتحسين؟", options: ["Clicks", "Conversions / CAC", "Impressions", "CTR بس"], explanation: "الإيراد لكل دولار أهم من الـvanity metrics." } }] },
    { slug: "email-marketing", durationMinutes: 30,
      en: { title: "Email Marketing", summary: "The highest-ROI channel.", content: `# Email\n\n- Build a list with lead magnets\n- Welcome sequence (5-7 emails)\n- Segment by behavior, not demographics\n- Plain text often beats fancy templates` },
      ar: { title: "تسويق الإيميل", summary: "أعلى قناة من حيث العائد.", content: `# الإيميل\n\n- ابني قائمة بـlead magnets\n- سلسلة ترحيب (5-7 إيميلات)\n- قسّم حسب السلوك، مش الديموغرافيا\n- النص العادي غالباً بيغلب القوالب الفاخرة` },
      quiz: [{ correctIndex: 0, en: { question: "Best segmentation strategy?", options: ["By behavior", "By age", "By gender", "By zip code"], explanation: "Behavior predicts intent." }, ar: { question: "أحسن استراتيجية تقسيم؟", options: ["حسب السلوك", "حسب العمر", "حسب الجنس", "حسب الكود البريدي"], explanation: "السلوك بيتنبأ بالنية." } }] },
  ],
  project: { slug: "marketing-plan", difficulty: "easy", estimatedHours: 4, en: { title: "90-Day Marketing Plan", brief: "Write a focused 90-day plan for a real or hypothetical product.", requirements: ["Define ICP & positioning", "Pick 2 channels max", "Weekly milestones", "Budget & KPIs"], deliverables: ["Plan doc"] }, ar: { title: "خطة تسويق 90 يوم", brief: "اكتب خطة 90 يوم مركّزة لمنتج حقيقي أو افتراضي.", requirements: ["حدّد ICP و الـpositioning", "اختار قناتين كحد أقصى", "milestones أسبوعية", "ميزانية و KPIs"], deliverables: ["مستند الخطة"] } },
};

export default course;
