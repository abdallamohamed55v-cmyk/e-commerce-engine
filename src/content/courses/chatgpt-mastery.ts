import type { Course } from "../types";

const course: Course = {
  slug: "chatgpt-mastery",
  level: "beginner",
  durationMinutes: 180,
  accentColor: "#10b981",
  coverGradient: "from-emerald-500 via-green-500 to-lime-500",
  icon: "Sparkles",
  category: "ai",
  en: {
    title: "ChatGPT Mastery",
    tagline: "Use ChatGPT like a power user — beyond chat.",
    description:
      "ChatGPT is far more capable than most people realize. Master Custom GPTs, projects, file uploads, voice mode, canvas, advanced data analysis, and the dozens of small features that 10× your productivity.",
    learningOutcomes: [
      "Use Custom GPTs and Projects for repeatable workflows",
      "Analyze spreadsheets and PDFs with Advanced Data Analysis",
      "Leverage Canvas for long-form writing and code",
      "Use voice mode and image understanding effectively",
      "Build and share your own Custom GPTs",
    ],
    prerequisites: ["AI Fundamentals (recommended)", "ChatGPT Plus or Team account (for advanced features)"],
  },
  ar: {
    title: "إتقان ChatGPT",
    tagline: "استخدم ChatGPT زي مستخدم محترف — أبعد من الدردشة.",
    description:
      "ChatGPT أقدر بكتير من اللي معظم الناس بتدركه. أتقن Custom GPTs والـProjects ورفع الملفات والـvoice mode والـcanvas وتحليل البيانات المتقدم والعشرات من الميزات الصغيرة اللي بتضاعف إنتاجيتك 10 مرات.",
    learningOutcomes: [
      "استخدم Custom GPTs والـProjects لتدفقات العمل المتكررة",
      "حلّل ملفات Excel وPDF بـAdvanced Data Analysis",
      "استفد من Canvas للكتابة الطويلة والكود",
      "استخدم voice mode وفهم الصور بفعالية",
      "ابني وشارك Custom GPTs الخاصة بك",
    ],
    prerequisites: ["أساسيات الـAI (مفضّل)", "حساب ChatGPT Plus أو Team (للميزات المتقدمة)"],
  },
  lessons: [
    {
      slug: "interface-tour",
      durationMinutes: 20,
      en: {
        title: "The Power-User Interface Tour",
        summary: "Every feature you've been ignoring.",
        content: `# The Power-User Interface Tour

Most people use 10% of ChatGPT. Here's the rest.

## Model picker (top-left)
- **GPT-4o:** default, balanced speed/intelligence, multimodal
- **o1 / o3:** longer reasoning, better at math and code
- **GPT-4o mini:** fast and cheap for simple tasks

## Tools menu (paperclip / + icon)
- **Attach files:** PDFs, spreadsheets, images
- **Search the web:** for current info
- **Create an image:** DALL-E 3 inline
- **Canvas:** dedicated writing/coding workspace

## Custom instructions
Settings → Personalization → Custom Instructions. Tell ChatGPT once who you are and how you want responses. Applies to every chat.

## Memory
Settings → Personalization → Memory. ChatGPT remembers facts across chats. You can view, edit, or delete entries.

## Projects (Plus/Team)
Group chats + files + custom instructions under one folder. Perfect for ongoing work like "Q3 launch" or "Thesis."

## Keyboard shortcuts
- \`Cmd/Ctrl + Shift + O\` — new chat
- \`Cmd/Ctrl + /\` — show shortcuts
- \`Cmd/Ctrl + Shift + ;\` — copy last message`,
      },
      ar: {
        title: "جولة في الواجهة للمستخدم المحترف",
        summary: "كل ميزة كنت بتتجاهلها.",
        content: `# جولة في الواجهة للمستخدم المحترف

معظم الناس بتستخدم 10% من ChatGPT. هنا الباقي.

## اختيار النموذج (يسار فوق)
- **GPT-4o:** الافتراضي، سرعة/ذكاء متوازنين، متعدد الوسائط
- **o1 / o3:** تفكير أطول، أفضل في الرياضيات والكود
- **GPT-4o mini:** سريع ورخيص للمهام البسيطة

## قائمة الأدوات (أيقونة المشبك / +)
- **رفع ملفات:** PDFs, Excel, صور
- **البحث في الويب:** للمعلومات الحالية
- **إنشاء صورة:** DALL-E 3 داخلياً
- **Canvas:** مساحة عمل مخصصة للكتابة/البرمجة

## التعليمات المخصصة
Settings → Personalization → Custom Instructions. قول لـChatGPT مرة واحدة هو مين وإزاي عايز الردود. بينطبق على كل دردشة.

## الذاكرة
Settings → Personalization → Memory. ChatGPT بيتذكر حقائق عبر الدردشات. تقدر تشوف وتعدّل وتحذف المدخلات.

## Projects (Plus/Team)
اجمع دردشات + ملفات + تعليمات مخصصة تحت مجلد واحد. مثالي للشغل المستمر زي "إطلاق الربع الثالث" أو "الأطروحة."

## اختصارات الكيبورد
- \`Cmd/Ctrl + Shift + O\` — دردشة جديدة
- \`Cmd/Ctrl + /\` — اعرض الاختصارات
- \`Cmd/Ctrl + Shift + ;\` — انسخ آخر رسالة`,
      },
      quiz: [
        {
          en: {
            question: "Custom instructions apply:",
            options: ["To one chat only", "To every new chat", "To deleted chats", "To shared chats only"],
            explanation: "Set once, applied everywhere.",
          },
          ar: {
            question: "التعليمات المخصصة بتنطبق:",
            options: ["على دردشة واحدة فقط", "على كل دردشة جديدة", "على الدردشات المحذوفة", "على الدردشات المشتركة فقط"],
            explanation: "اضبطها مرة، تنطبق في كل مكان.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Which model is best for hard math/code reasoning?",
            options: ["GPT-4o mini", "o1 / o3", "DALL-E", "GPT-3.5"],
            explanation: "Reasoning models like o1/o3 spend more compute thinking.",
          },
          ar: {
            question: "أي نموذج الأفضل للتفكير الصعب في الرياضيات/الكود؟",
            options: ["GPT-4o mini", "o1 / o3", "DALL-E", "GPT-3.5"],
            explanation: "نماذج التفكير زي o1/o3 بتقضي وقت أكتر في التفكير.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Projects feature is best for:",
            options: [
              "One-off questions",
              "Grouping related chats, files, and instructions",
              "Sharing your password",
              "Connecting printers",
            ],
            explanation: "Projects organize ongoing work.",
          },
          ar: {
            question: "ميزة Projects الأفضل لـ:",
            options: [
              "الأسئلة العابرة",
              "تجميع الدردشات والملفات والتعليمات المرتبطة",
              "مشاركة كلمة السر",
              "توصيل الطابعات",
            ],
            explanation: "Projects بتنظّم الشغل المستمر.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "custom-gpts",
      durationMinutes: 35,
      en: {
        title: "Building Custom GPTs",
        summary: "Package your best prompts into shareable mini-apps.",
        content: `# Building Custom GPTs

A Custom GPT is a saved configuration of ChatGPT — system prompt, files, capabilities — under a name you can share.

## When to build one
- You repeat a task weekly+
- A non-technical teammate needs a guided AI tool
- You want a specialized assistant (Tax helper, Brand voice writer, SQL coach)

## The builder
1. Click your avatar → "My GPTs" → "Create"
2. **Configure** tab — name, description, instructions, files, capabilities (web, image, code interpreter)
3. **Create** tab — conversational builder for less-technical users

## Writing strong instructions
Treat it like a long system prompt. Use the ROLE / GOAL / CONSTRAINTS / PROCESS / OUTPUT template from the Prompt Engineering course.

## Knowledge files
Upload PDFs, CSVs, docs. The GPT searches them via RAG. Keep files under 20 and under 512MB total. Trim them — concise files retrieve more reliably.

## Sharing
- **Private** — only you
- **Anyone with link**
- **GPT Store** — public, indexed, and you can earn revenue (if eligible)

## Limits
Custom GPTs don't make the underlying model smarter — they just configure it. Don't expect a Custom GPT to solve problems base GPT-4o can't.`,
      },
      ar: {
        title: "بناء Custom GPTs",
        summary: "حزّم أفضل برومبتاتك في تطبيقات صغيرة قابلة للمشاركة.",
        content: `# بناء Custom GPTs

الـCustom GPT هو تكوين محفوظ لـChatGPT — برومبت نظام، ملفات، قدرات — تحت اسم تقدر تشاركه.

## إمتى تبني واحد
- بتكرر مهمة أسبوعياً+
- زميل غير تقني محتاج أداة AI موجَّهة
- عايز مساعد متخصص (مساعد ضرائب، كاتب صوت العلامة، مدرّب SQL)

## الـbuilder
1. اضغط على الـavatar → "My GPTs" → "Create"
2. تاب **Configure** — اسم، وصف، تعليمات، ملفات، قدرات (web, image, code interpreter)
3. تاب **Create** — builder حواري للمستخدمين الأقل تقنية

## كتابة تعليمات قوية
اعتبره برومبت نظام طويل. استخدم قالب ROLE / GOAL / CONSTRAINTS / PROCESS / OUTPUT من كورس Prompt Engineering.

## ملفات المعرفة
ارفع PDFs, CSVs, مستندات. الـGPT بيبحث فيها بـRAG. خلّي الملفات أقل من 20 وأقل من 512MB إجمالي. قصّرها — الملفات المختصرة بتُسترجَع بشكل أوثق.

## المشاركة
- **خاص** — أنت فقط
- **أي حد بالرابط**
- **GPT Store** — عام، مفهرس، وتقدر تكسب إيراد (لو مؤهَّل)

## القيود
الـCustom GPTs مبتخليش النموذج الأساسي أذكى — بس بتكوّنه. متتوقعش Custom GPT يحل مشاكل GPT-4o الأساسي مش قادر يحلها.`,
      },
      quiz: [
        {
          en: {
            question: "Custom GPT instructions are most similar to:",
            options: [
              "A user message",
              "A long, reusable system prompt",
              "A database query",
              "A CSS file",
            ],
            explanation: "They configure how the GPT behaves across all chats.",
          },
          ar: {
            question: "تعليمات Custom GPT شبه:",
            options: [
              "رسالة مستخدم",
              "برومبت نظام طويل قابل لإعادة الاستخدام",
              "استعلام قاعدة بيانات",
              "ملف CSS",
            ],
            explanation: "بتكوّن إزاي الـGPT يتصرف عبر كل الدردشات.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Knowledge files in Custom GPTs use:",
            options: ["Fine-tuning", "RAG", "Pre-training", "Web scraping"],
            explanation: "Files are retrieved and inserted at query time.",
          },
          ar: {
            question: "ملفات المعرفة في Custom GPTs بتستخدم:",
            options: ["Fine-tuning", "RAG", "Pre-training", "Web scraping"],
            explanation: "الملفات بتُسترجَع وبتُدخَل وقت الاستعلام.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "A Custom GPT will NOT:",
            options: [
              "Use your system instructions",
              "Make GPT-4o more intelligent than its base model",
              "Read uploaded PDFs",
              "Be shareable",
            ],
            explanation: "Configuration ≠ smarter base model.",
          },
          ar: {
            question: "الـCustom GPT *مش هـ*:",
            options: [
              "يستخدم تعليمات النظام بتاعتك",
              "يخلي GPT-4o أذكى من النموذج الأساسي",
              "يقرا PDFs مرفوعة",
              "يكون قابل للمشاركة",
            ],
            explanation: "التكوين ≠ نموذج أساسي أذكى.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "data-analysis",
      durationMinutes: 30,
      en: {
        title: "Advanced Data Analysis",
        summary: "Turn ChatGPT into a data analyst.",
        content: `# Advanced Data Analysis

Upload a CSV, Excel, or JSON file and ChatGPT runs **real Python** in a sandbox to analyze it.

## What it can do
- Compute statistics, group, pivot, filter
- Generate charts (matplotlib, seaborn)
- Clean messy data (deduplicate, fix dates, fill missing)
- Convert formats (Excel → JSON, etc.)
- Run regressions and basic ML

## How to ask
Be specific:
- ❌ "Analyze this data."
- ✅ "Group by region, calculate average revenue per customer, plot as a bar chart sorted descending."

## Verification
Always ask: "Show me the Python code you ran and verify the row counts at each step."

The model can make mistakes — but the code is auditable.

## Limits
- Files load into memory; very large files (>100MB) may fail
- The sandbox has no internet (by default)
- Output charts are PNG; for interactive, export data and use Tableau/Power BI

## Tip
Ask for the cleaned dataset back. ChatGPT will give you a download link to a CSV you can use elsewhere.`,
      },
      ar: {
        title: "تحليل البيانات المتقدم",
        summary: "حوّل ChatGPT لمحلل بيانات.",
        content: `# تحليل البيانات المتقدم

ارفع ملف CSV أو Excel أو JSON وChatGPT بيشغّل **Python حقيقي** في sandbox لتحليله.

## إيه اللي يقدر يعمله
- يحسب إحصاءات، يجمّع، يعمل pivot، يفلتر
- يولّد رسومات (matplotlib, seaborn)
- ينظّف بيانات فوضوية (يزيل التكرار، يصحّح التواريخ، يملأ الناقص)
- يحوّل صيغ (Excel → JSON, إلخ)
- يشغّل regressions وML أساسي

## إزاي تسأل
كن محدداً:
- ❌ "حلّل البيانات دي."
- ✅ "اجمع حسب المنطقة، احسب متوسط الإيراد لكل عميل، ارسم bar chart مرتّب تنازلياً."

## التحقق
دايماً اسأل: "ورّيني كود الـPython اللي شغّلته وتحقّق من عدد الصفوف في كل خطوة."

النموذج ممكن يغلط — لكن الكود قابل للتدقيق.

## القيود
- الملفات بتتحمّل في الذاكرة؛ الملفات الكبيرة جداً (>100MB) ممكن تفشل
- الـsandbox مفيش إنترنت (افتراضياً)
- الرسومات الناتجة PNG؛ للتفاعلي، صدّر البيانات واستخدم Tableau/Power BI

## نصيحة
اطلب الـdataset النظيف رجوعاً. ChatGPT هيدّيك رابط تنزيل لـCSV تقدر تستخدمه في مكان تاني.`,
      },
      quiz: [
        {
          en: {
            question: "Advanced Data Analysis runs:",
            options: ["JavaScript", "Real Python in a sandbox", "SQL only", "Bash scripts"],
            explanation: "Python in an isolated environment.",
          },
          ar: {
            question: "Advanced Data Analysis بيشغّل:",
            options: ["JavaScript", "Python حقيقي في sandbox", "SQL فقط", "Bash scripts"],
            explanation: "Python في بيئة معزولة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "To verify results, always ask:",
            options: [
              "Nothing — trust the output",
              "For the Python code and intermediate row counts",
              "For the user manual",
              "For another language",
            ],
            explanation: "Auditable code is the safety net.",
          },
          ar: {
            question: "للتحقق من النتائج، دايماً اسأل عن:",
            options: [
              "ولا حاجة — ثق بالناتج",
              "كود الـPython وعدد الصفوف الوسيطة",
              "دليل المستخدم",
              "لغة تانية",
            ],
            explanation: "الكود القابل للتدقيق هو شبكة الأمان.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "The sandbox normally has:",
            options: ["Full internet", "No internet (by default)", "GPU access", "User credentials"],
            explanation: "Network is disabled for safety by default.",
          },
          ar: {
            question: "الـsandbox عادةً عنده:",
            options: ["إنترنت كامل", "مفيش إنترنت (افتراضياً)", "وصول GPU", "بيانات اعتماد المستخدم"],
            explanation: "الشبكة معطّلة للأمان افتراضياً.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "canvas-and-voice",
      durationMinutes: 25,
      en: {
        title: "Canvas, Voice, and Vision",
        summary: "Three underrated power features.",
        content: `# Canvas, Voice, and Vision

## Canvas
A side-by-side workspace for long-form writing and code.

- Edit specific paragraphs, not the whole doc
- Suggest edits, adjust length, change reading level
- For code: run, debug, add logs, port to another language
- Highlight text → describe a change → ChatGPT edits *in place*

Use it for anything over 3 paragraphs.

## Voice mode (Advanced)
- Tap the voice icon → real-time spoken conversation
- Supports interruption — talk over the model
- Great for: language practice, brainstorming on a walk, hands-free work
- Currently the model can hear tone and respond emotionally

## Vision
Drop in any image — screenshot, photo, diagram, whiteboard — and ask questions.

Useful for:
- "What's wrong with this UI?"
- "Transcribe this handwritten note"
- "Read this error message"
- "What's in this fridge — suggest a recipe"

Combined with web search, you can identify products, plants, landmarks.`,
      },
      ar: {
        title: "Canvas والصوت والرؤية",
        summary: "تلات ميزات قوية مش بياخدوا حقهم.",
        content: `# Canvas والصوت والرؤية

## Canvas
مساحة عمل جنب بجنب للكتابة الطويلة والكود.

- عدّل فقرات محددة، مش المستند كله
- اقترح تعديلات، اضبط الطول، غيّر مستوى القراءة
- للكود: شغّل، debug، ضيف logs، حوّل للغة تانية
- ظلّل النص → اوصف التغيير → ChatGPT بيعدّل *في مكانه*

استخدمه لأي حاجة أكتر من 3 فقرات.

## وضع الصوت (Advanced)
- اضغط على أيقونة الصوت → محادثة منطوقة حقيقية
- بيدعم المقاطعة — اتكلم فوق النموذج
- ممتاز لـ: تدريب لغة، عصف ذهني في مشية، شغل من غير إيدين
- حالياً النموذج يقدر يسمع النبرة ويرد عاطفياً

## الرؤية
ارفع أي صورة — screenshot, صورة, رسم بياني, سبورة — واسأل أسئلة.

مفيد لـ:
- "إيه الغلط في الـUI ده؟"
- "فرّغ الملاحظة المكتوبة بخط اليد دي"
- "اقرا رسالة الخطأ دي"
- "إيه اللي في التلاجة دي — اقترح وصفة"

مع البحث في الويب، تقدر تحدد منتجات، نباتات، معالم.`,
      },
      quiz: [
        {
          en: {
            question: "Canvas is best for:",
            options: ["1-line questions", "Long-form writing and code editing", "Voice calls", "Image generation"],
            explanation: "Canvas excels at iterative document work.",
          },
          ar: {
            question: "Canvas الأفضل لـ:",
            options: ["أسئلة بسطر واحد", "الكتابة الطويلة وتحرير الكود", "مكالمات صوتية", "توليد صور"],
            explanation: "Canvas بيتألق في عمل المستندات التكراري.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Advanced voice mode supports:",
            options: ["Reading minds", "Real-time interruption and tone awareness", "Sending faxes", "Editing PDFs"],
            explanation: "Natural conversation including being interrupted.",
          },
          ar: {
            question: "وضع الصوت المتقدم بيدعم:",
            options: ["قراءة الأفكار", "المقاطعة الفورية والوعي بالنبرة", "إرسال فاكسات", "تحرير PDFs"],
            explanation: "محادثة طبيعية تتضمن المقاطعة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Good use of vision:",
            options: [
              "Translate handwritten notes",
              "Hack accounts",
              "Predict the future",
              "Replace doctors",
            ],
            explanation: "Image-to-text is a vision strength.",
          },
          ar: {
            question: "استخدام جيد للرؤية:",
            options: [
              "ترجمة ملاحظات مكتوبة بخط اليد",
              "اختراق حسابات",
              "التنبؤ بالمستقبل",
              "استبدال الأطباء",
            ],
            explanation: "تحويل الصورة لنص نقطة قوة بصرية.",
          },
          correctIndex: 0,
        },
      ],
    },
  ],
  project: {
    slug: "custom-gpt-build",
    difficulty: "medium",
    estimatedHours: 4,
    en: {
      title: "Build and Publish a Custom GPT",
      brief:
        "Pick a real problem (e.g., 'SQL syntax coach', 'meeting summarizer for engineers'). Build a Custom GPT with strong instructions, 1-2 knowledge files, and 5 test conversations.",
      requirements: [
        "Real, narrow problem statement",
        "Instructions follow ROLE/GOAL/CONSTRAINTS/PROCESS/OUTPUT",
        "At least 1 knowledge file uploaded",
        "5 test prompts with results documented",
        "Published privately or via link",
      ],
      deliverables: [
        "Link to the Custom GPT",
        "Instructions exported as text",
        "Test log (5 inputs + outputs)",
        "Notes on what you'd improve",
      ],
    },
    ar: {
      title: "ابني وانشر Custom GPT",
      brief:
        "اختار مشكلة حقيقية (مثلاً 'مدرّب SQL syntax'، 'ملخّص اجتماعات للمهندسين'). ابني Custom GPT بتعليمات قوية و1-2 ملف معرفة و5 محادثات اختبار.",
      requirements: [
        "بيان مشكلة حقيقي ومحدد",
        "التعليمات بتتبع ROLE/GOAL/CONSTRAINTS/PROCESS/OUTPUT",
        "على الأقل ملف معرفة واحد مرفوع",
        "5 برومبتات اختبار بنتائج موثّقة",
        "منشور خاص أو عبر رابط",
      ],
      deliverables: [
        "رابط للـCustom GPT",
        "التعليمات مُصدَّرة كنص",
        "سجل الاختبار (5 مدخلات + نواتج)",
        "ملاحظات على إيه اللي هتحسّنه",
      ],
    },
  },
};

export default course;
