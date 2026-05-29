import type { Course } from "../types";

const course: Course = {
  slug: "html-css-arabic",
  level: "beginner",
  durationMinutes: 360,
  accentColor: "#e34c26",
  coverGradient: "from-orange-500 via-red-500 to-pink-500",
  icon: "Code",
  category: "programming",
  en: {
    title: "HTML & CSS — From Zero",
    tagline: "Build your first real websites with the building blocks of the web.",
    description:
      "Curated free lessons from Elzero Web School (Arabic) and freeCodeCamp (English). Learn HTML structure, semantic tags, modern CSS layout with Flexbox and Grid, and responsive design.",
    learningOutcomes: [
      "Write clean, semantic HTML5",
      "Style any page with modern CSS",
      "Build responsive layouts with Flexbox & Grid",
      "Ship a portfolio-ready landing page",
    ],
    prerequisites: ["A computer and a code editor (VS Code)"],
  },
  ar: {
    title: "HTML و CSS — من الصفر",
    tagline: "ابني أول مواقعك الحقيقية بأساسيات الويب.",
    description:
      "دروس مجانية مختارة من قناة Elzero Web School (بالعربي) و freeCodeCamp (بالإنجليزي). هتتعلم بنية الـHTML، الـtags الدلالية، الـCSS الحديث مع Flexbox و Grid، والتصميم المتجاوب.",
    learningOutcomes: [
      "اكتب HTML5 نظيف ودلالي",
      "نسّق أي صفحة بـCSS حديث",
      "ابني تصاميم متجاوبة بـFlexbox و Grid",
      "اطلق landing page جاهزة للبورتفوليو",
    ],
    prerequisites: ["كمبيوتر و محرر أكواد (VS Code)"],
  },
  lessons: [
    {
      slug: "what-is-html",
      durationMinutes: 30,
      video: {
        ar: { youtubeId: "dD2EISBDjWM", sourceName: "Elzero Web School", sourceUrl: "https://www.youtube.com/@ElzeroWebSchool" },
        en: { youtubeId: "kUMe1FH4CHE", sourceName: "freeCodeCamp", sourceUrl: "https://www.youtube.com/@freecodecamp" },
      },
      en: {
        title: "What Is HTML?",
        summary: "The structure language of every webpage.",
        content: `# What Is HTML?

HTML (HyperText Markup Language) describes the **structure** of a webpage using tags like \`<h1>\`, \`<p>\`, \`<img>\`, \`<a>\`.

## Key ideas
- Every page is a tree of nested elements
- Tags carry **meaning** (semantics): \`<nav>\`, \`<article>\`, \`<footer>\`
- HTML is for structure — CSS is for style, JS is for behavior

Watch the video to see your first \`<!DOCTYPE html>\` page come to life.`,
      },
      ar: {
        title: "إيه هو الـHTML؟",
        summary: "لغة بنية أي صفحة ويب.",
        content: `# إيه هو الـHTML؟

الـHTML (HyperText Markup Language) بتوصف **بنية** صفحة الويب باستخدام tags زي \`<h1>\`, \`<p>\`, \`<img>\`, \`<a>\`.

## أفكار أساسية
- كل صفحة عبارة عن شجرة من العناصر المتداخلة
- الـtags ليها **معنى** (semantics): \`<nav>\`, \`<article>\`, \`<footer>\`
- HTML للبنية — CSS للتنسيق — JS للسلوك

اتفرج على الفيديو علشان تشوف أول صفحة \`<!DOCTYPE html>\` بتاعتك.`,
      },
      quiz: [
        {
          correctIndex: 1,
          en: { question: "What does HTML stand for?", options: ["Hyper Tool Markup Language", "HyperText Markup Language", "Home Tag Markup Language", "Hyperlink Text Module Language"], explanation: "HTML = HyperText Markup Language." },
          ar: { question: "HTML اختصار لإيه؟", options: ["Hyper Tool Markup Language", "HyperText Markup Language", "Home Tag Markup Language", "Hyperlink Text Module Language"], explanation: "HTML = HyperText Markup Language." },
        },
        {
          correctIndex: 2,
          en: { question: "Which tag wraps a navigation bar semantically?", options: ["<div>", "<header>", "<nav>", "<menu>"], explanation: "<nav> is the semantic tag for navigation." },
          ar: { question: "أنهي tag بيغلّف شريط التنقل بشكل دلالي؟", options: ["<div>", "<header>", "<nav>", "<menu>"], explanation: "<nav> هو الـtag الدلالي للتنقل." },
        },
      ],
    },
    {
      slug: "css-basics",
      durationMinutes: 40,
      video: {
        ar: { youtubeId: "Wm6CUkswsNw", sourceName: "Elzero Web School", sourceUrl: "https://www.youtube.com/@ElzeroWebSchool" },
        en: { youtubeId: "OEV8gMkCHXQ", sourceName: "freeCodeCamp", sourceUrl: "https://www.youtube.com/@freecodecamp" },
      },
      en: { title: "CSS Basics: Selectors & The Box Model", summary: "How to style anything on the page.", content: `# CSS Basics\n\nCSS targets HTML with **selectors** and changes their appearance.\n\n## The Box Model\nEvery element is a box: content → padding → border → margin.\n\n## Specificity\nID > class > tag. Inline styles override stylesheets.` },
      ar: { title: "أساسيات CSS: المحددات و Box Model", summary: "إزاي تنسّق أي حاجة في الصفحة.", content: `# أساسيات CSS\n\nالـCSS بتستهدف الـHTML بـ**selectors** وبتغيّر شكلها.\n\n## Box Model\nكل عنصر عبارة عن صندوق: content → padding → border → margin.\n\n## Specificity\nID > class > tag. الـinline styles بتغلب الـstylesheets.` },
      quiz: [
        { correctIndex: 0, en: { question: "Box Model order from inside out?", options: ["content → padding → border → margin", "margin → padding → content → border", "border → margin → padding → content", "padding → content → margin → border"], explanation: "Content sits inside padding, then border, then margin." }, ar: { question: "ترتيب الـBox Model من الداخل للخارج؟", options: ["content → padding → border → margin", "margin → padding → content → border", "border → margin → padding → content", "padding → content → margin → border"], explanation: "المحتوى جوّه الـpadding، يليه الـborder، ثم الـmargin." } },
      ],
    },
    {
      slug: "flexbox",
      durationMinutes: 45,
      video: { ar: { youtubeId: "phWxA89Dy94", sourceName: "Elzero Web School", sourceUrl: "https://www.youtube.com/@ElzeroWebSchool" }, en: { youtubeId: "fYq5PXgSsbE", sourceName: "Web Dev Simplified", sourceUrl: "https://www.youtube.com/@WebDevSimplified" } },
      en: { title: "Flexbox Layout", summary: "One-dimensional layouts made easy.", content: `# Flexbox\n\nSet \`display: flex\` on a container and its children become flex items.\n\n## Key props\n- \`justify-content\` — main axis alignment\n- \`align-items\` — cross axis alignment\n- \`gap\` — spacing between items\n- \`flex: 1\` — fill available space` },
      ar: { title: "تخطيط Flexbox", summary: "تصاميم بُعد واحد بسهولة.", content: `# Flexbox\n\nخلي \`display: flex\` على الـcontainer وأطفاله يبقوا flex items.\n\n## خصائص أساسية\n- \`justify-content\` — محاذاة المحور الرئيسي\n- \`align-items\` — محاذاة المحور المتقاطع\n- \`gap\` — المسافة بين العناصر\n- \`flex: 1\` — يملا المساحة المتاحة` },
      quiz: [
        { correctIndex: 2, en: { question: "Which property centers items along the main axis?", options: ["align-items", "align-content", "justify-content", "place-items"], explanation: "justify-content controls the main axis." }, ar: { question: "أنهي خاصية بتوسط العناصر على المحور الرئيسي؟", options: ["align-items", "align-content", "justify-content", "place-items"], explanation: "justify-content بتتحكم في المحور الرئيسي." } },
      ],
    },
    {
      slug: "grid",
      durationMinutes: 45,
      video: { ar: { youtubeId: "Ggk-FAfBzn4", sourceName: "Elzero Web School", sourceUrl: "https://www.youtube.com/@ElzeroWebSchool" }, en: { youtubeId: "rg7Fvvl3taU", sourceName: "Kevin Powell", sourceUrl: "https://www.youtube.com/@KevinPowell" } },
      en: { title: "CSS Grid", summary: "Two-dimensional layouts with precision.", content: `# CSS Grid\n\nFor true 2D layouts (rows AND columns).\n\n\`\`\`css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n\`\`\`` },
      ar: { title: "CSS Grid", summary: "تخطيطات ثنائية الأبعاد بدقة.", content: `# CSS Grid\n\nللتخطيطات الـ2D الحقيقية (صفوف وأعمدة).\n\n\`\`\`css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n\`\`\`` },
      quiz: [
        { correctIndex: 1, en: { question: "What does 1fr mean?", options: ["1 pixel", "1 fraction of available space", "1rem", "1 fixed unit"], explanation: "fr = fractional unit of remaining space." }, ar: { question: "إيه معنى 1fr؟", options: ["1 pixel", "1 جزء من المساحة المتاحة", "1rem", "1 وحدة ثابتة"], explanation: "fr = جزء كسري من المساحة المتبقية." } },
      ],
    },
    {
      slug: "responsive-design",
      durationMinutes: 35,
      video: { ar: { youtubeId: "srvUrASNj0s", sourceName: "Elzero Web School", sourceUrl: "https://www.youtube.com/@ElzeroWebSchool" }, en: { youtubeId: "srvUrASNj0s", sourceName: "Kevin Powell", sourceUrl: "https://www.youtube.com/@KevinPowell" } },
      en: { title: "Responsive & Mobile-First Design", summary: "Make it work on every screen.", content: `# Responsive Design\n\n## Media queries\n\`\`\`css\n@media (min-width: 768px) {\n  .container { padding: 2rem; }\n}\n\`\`\`\n\nStart small (mobile-first) and add breakpoints upward.` },
      ar: { title: "التصميم المتجاوب و Mobile-First", summary: "خليه يشتغل على أي شاشة.", content: `# التصميم المتجاوب\n\n## Media queries\n\`\`\`css\n@media (min-width: 768px) {\n  .container { padding: 2rem; }\n}\n\`\`\`\n\nابدأ صغير (mobile-first) و ضيف breakpoints لفوق.` },
      quiz: [
        { correctIndex: 0, en: { question: "What does mobile-first mean?", options: ["Design for mobile, then enhance for desktop", "Only support mobile", "Build mobile app first", "Use mobile-only fonts"], explanation: "Start with mobile styles, layer up with media queries." }, ar: { question: "إيه معنى mobile-first؟", options: ["صمم للموبايل الأول، وحسّن للديسكتوب", "ادعم الموبايل بس", "ابني تطبيق موبايل الأول", "استخدم خطوط للموبايل فقط"], explanation: "ابدأ بستايلات الموبايل، وضيف media queries لفوق." } },
      ],
    },
  ],
  project: {
    slug: "portfolio-landing",
    difficulty: "easy",
    estimatedHours: 4,
    en: { title: "Personal Portfolio Landing Page", brief: "Build a responsive one-page portfolio with hero, about, projects, and contact sections.", requirements: ["Semantic HTML5", "Flexbox or Grid", "Mobile-first responsive", "Hosted on GitHub Pages or Vercel"], deliverables: ["Live URL", "GitHub repo"] },
    ar: { title: "صفحة بورتفوليو شخصية", brief: "ابني بورتفوليو من صفحة واحدة متجاوبة بأقسام: hero، عن، مشاريع، تواصل.", requirements: ["HTML5 دلالي", "Flexbox أو Grid", "متجاوب mobile-first", "منشور على GitHub Pages أو Vercel"], deliverables: ["رابط مباشر", "GitHub repo"] },
  },
};

export default course;
