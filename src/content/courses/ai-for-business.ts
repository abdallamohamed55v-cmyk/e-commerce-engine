import type { Course } from "../types";

const course: Course = {
  slug: "ai-for-business",
  level: "intermediate",
  durationMinutes: 220,
  accentColor: "#ec4899",
  coverGradient: "from-pink-500 via-rose-500 to-fuchsia-500",
  icon: "Briefcase",
  category: "business",
  en: {
    title: "AI for Business Leaders",
    tagline: "Make smart AI decisions — strategy, ROI, and risk.",
    description:
      "A strategic course for founders, managers, and decision-makers. Learn to evaluate AI opportunities, build a 90-day adoption plan, manage vendors, and govern risk — without writing a single line of code.",
    learningOutcomes: [
      "Evaluate AI use cases by ROI and risk",
      "Build a 90-day AI adoption roadmap",
      "Choose between build, buy, and partner",
      "Negotiate with AI vendors",
      "Establish a basic AI governance policy",
    ],
    prerequisites: ["AI Fundamentals (recommended)", "Some business or management experience"],
  },
  ar: {
    title: "الـAI لقادة الأعمال",
    tagline: "اتخذ قرارات AI ذكية — استراتيجية وعائد ومخاطر.",
    description:
      "كورس استراتيجي للمؤسسين والمديرين وصنّاع القرار. اتعلم تقيّم فرص الـAI، تبني خطة تبنّي لـ90 يوم، تدير الموردين، وتحوكم المخاطر — من غير كتابة سطر كود.",
    learningOutcomes: [
      "قيّم استخدامات الـAI بالعائد والمخاطر",
      "ابني خارطة تبنّي AI لـ90 يوم",
      "اختار بين البناء، الشراء، والشراكة",
      "تفاوض مع موردي الـAI",
      "أسّس سياسة حوكمة AI أساسية",
    ],
    prerequisites: ["أساسيات الـAI (مفضّل)", "خبرة في الأعمال أو الإدارة"],
  },
  lessons: [
    {
      slug: "evaluating-opportunities",
      durationMinutes: 30,
      en: {
        title: "Evaluating AI Opportunities",
        summary: "A 2x2 framework for prioritizing.",
        content: `# Evaluating AI Opportunities

Don't chase every demo. Use a 2×2.

## The matrix

- **X-axis:** Business value (low → high)
- **Y-axis:** Implementation effort (low → high)

Four quadrants:
1. **High value, low effort** — DO THIS NOW (e.g., AI-assisted email drafts, sales-call summaries)
2. **High value, high effort** — PLAN CAREFULLY (e.g., custom support agent, internal search)
3. **Low value, low effort** — DO LATER (small productivity tweaks)
4. **Low value, high effort** — AVOID (vanity projects)

## Sources of business value
- **Cost reduction:** hours saved × labor cost
- **Revenue lift:** conversion, retention, expansion
- **Risk reduction:** fewer errors, compliance
- **Speed:** time-to-market

## Sources of effort
- Data readiness (often the biggest)
- Integration complexity
- Change management
- Compliance review

Start with **quadrant 1** wins. Build credibility before tackling quadrant 2.`,
      },
      ar: {
        title: "تقييم فرص الـAI",
        summary: "إطار 2×2 للأولوية.",
        content: `# تقييم فرص الـAI

متلحقش كل عرض. استخدم 2×2.

## المصفوفة

- **محور X:** القيمة التجارية (منخفض → عالي)
- **محور Y:** جهد التنفيذ (منخفض → عالي)

أربع أرباع:
1. **قيمة عالية، جهد منخفض** — اعمل ده دلوقتي (مثلاً مسودات إيميل بالـAI، ملخصات مكالمات مبيعات)
2. **قيمة عالية، جهد عالي** — خطّط بعناية (مثلاً وكيل دعم مخصص، بحث داخلي)
3. **قيمة منخفضة، جهد منخفض** — اعمله بعدين (تحسينات إنتاجية صغيرة)
4. **قيمة منخفضة، جهد عالي** — تجنّب (مشاريع للمظاهر)

## مصادر القيمة التجارية
- **خفض التكلفة:** ساعات متوفَّرة × تكلفة العمل
- **زيادة الإيراد:** التحويل، الاحتفاظ، التوسع
- **خفض المخاطر:** أخطاء أقل، الامتثال
- **السرعة:** الوقت للسوق

## مصادر الجهد
- جاهزية البيانات (غالباً الأكبر)
- تعقيد التكامل
- إدارة التغيير
- مراجعة الامتثال

ابدأ بـ**الربع 1** المكاسب. ابني المصداقية قبل ما تتعامل مع الربع 2.`,
      },
      quiz: [
        {
          en: {
            question: "First AI projects should be:",
            options: ["High effort, low value", "Low value, low effort", "High value, low effort", "Random"],
            explanation: "Quick wins build credibility.",
          },
          ar: {
            question: "أول مشاريع AI لازم تكون:",
            options: ["جهد عالي، قيمة منخفضة", "قيمة منخفضة، جهد منخفض", "قيمة عالية، جهد منخفض", "عشوائية"],
            explanation: "المكاسب السريعة بتبني مصداقية.",
          },
          correctIndex: 2,
        },
        {
          en: {
            question: "Often the biggest source of effort is:",
            options: ["Buying GPUs", "Data readiness", "Logo design", "Office space"],
            explanation: "Clean, accessible data is the bottleneck.",
          },
          ar: {
            question: "غالباً أكبر مصدر للجهد:",
            options: ["شراء GPUs", "جاهزية البيانات", "تصميم logo", "مساحة المكتب"],
            explanation: "البيانات النظيفة المتاحة هي عنق الزجاجة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Examples of low-effort, high-value use cases:",
            options: [
              "Custom LLM from scratch",
              "AI email drafting and call summaries",
              "Replacing the CFO",
              "Quantum AI research",
            ],
            explanation: "Productivity assists are quick wins.",
          },
          ar: {
            question: "أمثلة على استخدامات قيمة عالية وجهد منخفض:",
            options: [
              "LLM مخصص من الصفر",
              "كتابة إيميل بالـAI وملخصات مكالمات",
              "استبدال الـCFO",
              "بحث AI كمومي",
            ],
            explanation: "مساعدات الإنتاجية مكاسب سريعة.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "build-buy-partner",
      durationMinutes: 30,
      en: {
        title: "Build, Buy, or Partner?",
        summary: "Three paths to AI capability.",
        content: `# Build, Buy, or Partner?

## Buy (SaaS)
Use an off-the-shelf tool (Notion AI, Intercom Fin, ChatGPT Team).

- **When:** standard use case, low differentiation, small team
- **Pros:** fast, low risk, vendor maintains
- **Cons:** generic, monthly cost grows, data lives elsewhere

## Build
Hire/use internal engineers to build with OpenAI/Claude/Llama APIs.

- **When:** competitive differentiator, deep workflow integration, willing to invest 6+ months
- **Pros:** owned IP, custom UX, data stays internal
- **Cons:** expensive, slow, requires maintenance team

## Partner
Hire an AI consultancy or agency to build for you.

- **When:** lack internal AI talent, one-time strategic project, want speed without ownership burden
- **Pros:** faster than building, expertise on tap
- **Cons:** vendor lock-in risk, knowledge transfer challenges

## The hybrid path (often best)
Buy for 80% of needs. Build the 20% that's strategic. Partner for one-time architecture or training.

## Red flags in vendors
- Vague pricing
- No SOC2 or basic security docs
- Can't explain their model choices
- "We'll fine-tune on your data" (often unnecessary, often risky)`,
      },
      ar: {
        title: "ابني، اشتري، أم اعمل شراكة؟",
        summary: "تلات مسارات لقدرة الـAI.",
        content: `# ابني، اشتري، أم اعمل شراكة؟

## اشتري (SaaS)
استخدم أداة جاهزة (Notion AI, Intercom Fin, ChatGPT Team).

- **إمتى:** استخدام قياسي، تمايز منخفض، فريق صغير
- **المزايا:** سريع، مخاطرة منخفضة، الموفّر بيصون
- **العيوب:** عام، التكلفة الشهرية بتكبر، البيانات بتعيش في مكان تاني

## ابني
وظّف/استخدم مهندسين داخليين علشان يبنوا بـAPIs الـOpenAI/Claude/Llama.

- **إمتى:** ميزة تنافسية، تكامل عميق مع تدفق العمل، مستعد تستثمر 6+ شهور
- **المزايا:** ملكية فكرية، UX مخصص، البيانات بتفضل داخلياً
- **العيوب:** غالي، بطيء، محتاج فريق صيانة

## شراكة
وظّف استشاريين أو وكالة AI علشان يبنوا ليك.

- **إمتى:** مفيش موهبة AI داخلية، مشروع استراتيجي لمرة واحدة، عايز سرعة من غير عبء الملكية
- **المزايا:** أسرع من البناء، خبرة متاحة
- **العيوب:** مخاطرة الاعتماد على الموفّر، تحديات نقل المعرفة

## المسار الهجين (غالباً الأفضل)
اشتري 80% من الاحتياجات. ابني الـ20% الاستراتيجية. اعمل شراكة لمعمارية أو تدريب لمرة واحدة.

## علامات حمراء في الموردين
- تسعير مبهم
- مفيش SOC2 أو مستندات أمان أساسية
- ميقدروش يشرحوا اختيارات النماذج
- "هنعمل fine-tune على بياناتكم" (غالباً غير ضروري، غالباً خطر)`,
      },
      quiz: [
        {
          en: {
            question: "When you have a standard use case and small team, prefer:",
            options: ["Build", "Buy", "Open-source self-host", "Custom LLM"],
            explanation: "Buy maximizes speed and minimizes risk.",
          },
          ar: {
            question: "لما عندك استخدام قياسي وفريق صغير، فضّل:",
            options: ["ابني", "اشتري", "open-source استضافة ذاتية", "LLM مخصص"],
            explanation: "الشراء بيعظّم السرعة ويقلل المخاطر.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "A vendor 'fine-tuning on your data' is often:",
            options: ["Always best", "Unnecessary and risky for most cases", "Free", "Required by law"],
            explanation: "Modern LLMs + RAG handle most cases without fine-tuning.",
          },
          ar: {
            question: "موفّر بيـ'fine-tune على بياناتك' غالباً:",
            options: ["دايماً الأفضل", "غير ضروري وخطر لمعظم الحالات", "مجاني", "مطلوب قانوناً"],
            explanation: "الـLLMs الحديثة + RAG بتتعامل مع معظم الحالات بدون fine-tuning.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "The hybrid path means:",
            options: [
              "Build everything",
              "Buy for 80%, build the strategic 20%",
              "Outsource everything",
              "Wait 5 years",
            ],
            explanation: "Mix-and-match per use case.",
          },
          ar: {
            question: "المسار الهجين يعني:",
            options: [
              "ابني كل حاجة",
              "اشتري لـ80%، ابني الـ20% الاستراتيجية",
              "ستعن بمصادر خارجية لكل حاجة",
              "استنى 5 سنين",
            ],
            explanation: "مزج حسب حالة الاستخدام.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "90-day-roadmap",
      durationMinutes: 30,
      en: {
        title: "Your 90-Day AI Adoption Plan",
        summary: "A concrete sequence to go from zero to wins.",
        content: `# 90-Day AI Adoption Plan

## Days 1–30: Foundation
- Audit current workflows (use the AI Audit project from AI Fundamentals)
- Pick 3 candidate use cases — at least 1 in quadrant 1 (high value, low effort)
- Inventory data sources, identify owners
- Choose default tools (ChatGPT Team or Claude Team for general use)
- Draft acceptable-use policy (one page)

## Days 31–60: Pilot
- Launch 1 use case with a small group (5–10 users)
- Define success metric upfront (hours saved, conversion lift)
- Daily 5-min retro with users for 2 weeks
- Document wins, pain points, surprising failures

## Days 61–90: Scale or Kill
- If pilot succeeded: roll out to team/department, train others, formalize SOP
- If pilot failed: write a post-mortem, identify why, decide next attempt
- Pick next 2 use cases based on lessons learned
- Set up monthly review cadence

## Common mistakes
- Trying 10 things at once → choose 1
- No success metric → "it felt useful" doesn't scale
- Skipping change management → great tool, no adoption
- Choosing a flashy use case over a high-value one`,
      },
      ar: {
        title: "خطة تبنّي الـAI لـ90 يوم",
        summary: "تسلسل ملموس من الصفر للمكاسب.",
        content: `# خطة تبنّي الـAI لـ90 يوم

## أيام 1–30: التأسيس
- دقّق تدفقات العمل الحالية (استخدم مشروع AI Audit من كورس الأساسيات)
- اختار 3 حالات استخدام مرشّحة — على الأقل 1 في الربع 1 (قيمة عالية، جهد منخفض)
- جرد مصادر البيانات، حدّد المسؤولين
- اختار أدوات افتراضية (ChatGPT Team أو Claude Team للاستخدام العام)
- اكتب مسودة سياسة استخدام مقبولة (صفحة واحدة)

## أيام 31–60: التجربة
- أطلق حالة استخدام واحدة مع مجموعة صغيرة (5–10 مستخدمين)
- حدّد مقياس النجاح مقدماً (ساعات متوفَّرة، زيادة تحويل)
- retro يومي 5 دقايق مع المستخدمين لمدة أسبوعين
- وثّق المكاسب، نقاط الألم، الإخفاقات المفاجئة

## أيام 61–90: التوسع أو القتل
- لو التجربة نجحت: انشر للفريق/القسم، درّب الآخرين، شكّل SOP
- لو فشلت: اكتب post-mortem، حدّد السبب، قرر المحاولة التالية
- اختار حالتين استخدام التاليتين بناءً على الدروس المستفادة
- اضبط إيقاع مراجعة شهري

## أخطاء شائعة
- محاولة 10 حاجات في نفس الوقت → اختار 1
- مفيش مقياس نجاح → "حسّيته مفيد" مش بيتوسّع
- تخطّي إدارة التغيير → أداة عظيمة، مفيش تبنّي
- اختيار حالة استخدام برّاقة بدلاً من ذات قيمة عالية`,
      },
      quiz: [
        {
          en: {
            question: "First 30 days should focus on:",
            options: ["Full rollout", "Audit + pick use cases + draft policy", "Buying hardware", "Firing staff"],
            explanation: "Foundation before pilot.",
          },
          ar: {
            question: "أول 30 يوم لازم تركز على:",
            options: ["نشر كامل", "تدقيق + اختيار استخدامات + مسودة سياسة", "شراء hardware", "فصل موظفين"],
            explanation: "تأسيس قبل التجربة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "A failed pilot should result in:",
            options: [
              "Hide and pretend it didn't happen",
              "Post-mortem and informed next attempt",
              "Sue the vendor",
              "Quit all AI",
            ],
            explanation: "Learn, document, iterate.",
          },
          ar: {
            question: "تجربة فاشلة لازم تنتج:",
            options: [
              "إخفاء والتظاهر إنها معملتش",
              "Post-mortem ومحاولة تالية مستنيرة",
              "مقاضاة الموفّر",
              "ترك كل الـAI",
            ],
            explanation: "اتعلم، وثّق، كرّر.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Most common adoption mistake:",
            options: ["Too small a pilot", "Trying 10 things at once", "Reading documentation", "Talking to users"],
            explanation: "Focus beats scatter.",
          },
          ar: {
            question: "أكثر خطأ شائع في التبنّي:",
            options: ["تجربة صغيرة جداً", "محاولة 10 حاجات في نفس الوقت", "قراءة التوثيق", "الكلام مع المستخدمين"],
            explanation: "التركيز بيهزم التشتت.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "governance-and-risk",
      durationMinutes: 25,
      en: {
        title: "AI Governance and Risk",
        summary: "Policies that protect without killing innovation.",
        content: `# AI Governance and Risk

You don't need a 50-page policy. You need clarity on five questions.

## 1. Data sensitivity
What data can be sent to which AI tools? Tier them:
- **Public:** anything (marketing copy)
- **Internal:** enterprise tools only (ChatGPT Team, Claude Enterprise — they don't train on your data)
- **Confidential:** approved tools only, with DLP review
- **Regulated (PHI, PCI, etc.):** specific approved tools with BAAs/agreements

## 2. Who's accountable
Every AI-generated decision that affects a customer needs a human owner. Document the chain.

## 3. Disclosure
When is AI use disclosed to customers? Always for AI-written communications? Only for autonomous actions? Pick a policy.

## 4. Bias and fairness
For decisions affecting people (hiring, credit, pricing), run periodic audits. Document inputs and outcomes.

## 5. Vendor terms
Read the terms:
- Does the vendor train on your prompts? (Default OpenAI API: no. ChatGPT consumer: yes unless opted out.)
- Where is data stored?
- What's the breach notification timeline?

## Quick win
Write a 1-page acceptable-use policy. Cover the 5 questions. Get legal sign-off. Distribute.`,
      },
      ar: {
        title: "حوكمة الـAI والمخاطر",
        summary: "سياسات بتحمي من غير ما تقتل الابتكار.",
        content: `# حوكمة الـAI والمخاطر

مش محتاج سياسة 50 صفحة. محتاج وضوح في 5 أسئلة.

## 1. حساسية البيانات
أي بيانات يمكن إرسالها لأي أدوات AI؟ صنّفهم:
- **عام:** أي حاجة (نسخ تسويقية)
- **داخلي:** أدوات المؤسسة فقط (ChatGPT Team, Claude Enterprise — مش بيدرّبوا على بياناتك)
- **سري:** أدوات معتمَدة فقط، بمراجعة DLP
- **منظَّم (PHI, PCI, إلخ):** أدوات محددة معتمَدة باتفاقيات BAAs

## 2. مين المسؤول
كل قرار مولَّد بالـAI بيأثر على عميل محتاج مالك بشري. وثّق السلسلة.

## 3. الإفصاح
إمتى يتم الإفصاح عن استخدام الـAI للعملاء؟ دايماً للاتصالات المكتوبة بالـAI؟ بس للإجراءات المستقلة؟ اختار سياسة.

## 4. التحيز والعدالة
للقرارات اللي بتأثر على ناس (التوظيف، الائتمان، التسعير)، شغّل تدقيقات دورية. وثّق المدخلات والنتائج.

## 5. شروط الموردين
اقرا الشروط:
- هل الموفّر بيدرّب على برومبتاتك؟ (افتراضياً OpenAI API: لا. ChatGPT المستهلك: نعم إلا لو اخترت العكس.)
- فين البيانات بتُخزَّن؟
- إيه الجدول الزمني لإشعار الاختراق؟

## مكسب سريع
اكتب سياسة استخدام مقبولة من صفحة واحدة. غطي الـ5 أسئلة. خد موافقة قانونية. وزّع.`,
      },
      quiz: [
        {
          en: {
            question: "Regulated data (e.g., PHI) should:",
            options: [
              "Be sent to any AI tool freely",
              "Only go to approved tools with proper agreements",
              "Be deleted",
              "Be uploaded publicly",
            ],
            explanation: "Compliance is non-negotiable.",
          },
          ar: {
            question: "البيانات المنظَّمة (مثلاً PHI) لازم:",
            options: [
              "تتبعت لأي أداة AI بحرية",
              "تروح بس لأدوات معتمَدة بالاتفاقيات الصحيحة",
              "تتحذف",
              "ترفع علنياً",
            ],
            explanation: "الامتثال غير قابل للتفاوض.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "By default, OpenAI API:",
            options: ["Trains on your prompts", "Does NOT train on API prompts", "Sells your data", "Makes prompts public"],
            explanation: "OpenAI API terms exclude training on API inputs.",
          },
          ar: {
            question: "افتراضياً، OpenAI API:",
            options: ["بيدرّب على برومبتاتك", "مش بيدرّب على برومبتات الـAPI", "بيبيع بياناتك", "بيخلّي البرومبتات علنية"],
            explanation: "شروط OpenAI API بتستبعد التدريب على مدخلات الـAPI.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "AI-driven decisions affecting customers should have:",
            options: ["No oversight", "A documented human owner", "Random review", "Public voting"],
            explanation: "Accountability requires named owners.",
          },
          ar: {
            question: "القرارات المدفوعة بالـAI اللي بتأثر على عملاء لازم يكون عندها:",
            options: ["مفيش رقابة", "مالك بشري موثَّق", "مراجعة عشوائية", "تصويت عام"],
            explanation: "المساءلة بتتطلب ملاك معروفين بالاسم.",
          },
          correctIndex: 1,
        },
      ],
    },
  ],
  project: {
    slug: "90-day-plan",
    difficulty: "medium",
    estimatedHours: 4,
    en: {
      title: "Draft Your 90-Day AI Plan",
      brief:
        "Create a complete 90-day AI adoption plan for your team or company. Include the 2×2 prioritization, 3 selected use cases, success metrics, and a 1-page acceptable-use policy.",
      requirements: [
        "Prioritization matrix with 5+ candidate use cases scored",
        "3 selected pilot use cases with rationale",
        "Success metrics defined upfront",
        "1-page acceptable-use policy draft",
        "30/60/90-day milestones",
      ],
      deliverables: [
        "Plan document (3–5 pages)",
        "Prioritization matrix (sheet or doc)",
        "Acceptable-use policy (1 page)",
        "Stakeholder review checklist",
      ],
    },
    ar: {
      title: "اكتب خطة الـAI لـ90 يوم",
      brief:
        "اعمل خطة تبنّي AI كاملة لـ90 يوم لفريقك أو شركتك. اشمل مصفوفة الأولوية 2×2، 3 حالات استخدام مختارة، مقاييس نجاح، وسياسة استخدام مقبولة من صفحة واحدة.",
      requirements: [
        "مصفوفة أولوية بـ5+ حالات استخدام مرشّحة مُقيَّمة",
        "3 حالات استخدام تجريبية مختارة بالسبب",
        "مقاييس نجاح محددة مقدماً",
        "مسودة سياسة استخدام مقبولة من صفحة واحدة",
        "علامات 30/60/90 يوم",
      ],
      deliverables: [
        "مستند الخطة (3–5 صفحات)",
        "مصفوفة الأولوية (sheet أو doc)",
        "سياسة الاستخدام المقبولة (صفحة)",
        "قائمة مراجعة لأصحاب المصلحة",
      ],
    },
  },
};

export default course;
