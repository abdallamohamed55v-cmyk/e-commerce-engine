import type { Course } from "../types";

const course: Course = {
  slug: "ai-automation",
  level: "intermediate",
  durationMinutes: 260,
  accentColor: "#f59e0b",
  coverGradient: "from-amber-500 via-orange-500 to-red-500",
  icon: "Workflow",
  category: "ai",
  en: {
    title: "AI Automation with n8n & Zapier",
    tagline: "Automate real workflows end-to-end with AI in the loop.",
    description:
      "Stop copying outputs between tabs. Build automations that read your inbox, summarize with AI, log to a sheet, and notify Slack — all without writing code. Covers n8n, Zapier, Make, and OpenAI integrations.",
    learningOutcomes: [
      "Design end-to-end automations with AI steps",
      "Integrate OpenAI/Claude into n8n and Zapier",
      "Handle errors, retries, and rate limits",
      "Move data safely between Gmail, Slack, Sheets, Notion, and databases",
      "Estimate cost per run",
    ],
    prerequisites: ["Prompt Engineering basics", "An account with n8n.cloud or Zapier"],
  },
  ar: {
    title: "أتمتة الـAI بـn8n وZapier",
    tagline: "أتمت تدفقات عمل حقيقية كاملة مع الـAI في الحلقة.",
    description:
      "بطّل نسخ الناتج بين التابات. ابني أتمتة بتقرا الـinbox، تلخّص بالـAI، تسجّل في Sheet، وتنبّه على Slack — كل ده من غير كود. بيغطي n8n، Zapier، Make، وتكاملات OpenAI.",
    learningOutcomes: [
      "صمم أتمتة كاملة بخطوات AI",
      "ادمج OpenAI/Claude في n8n وZapier",
      "تعامل مع الأخطاء وإعادة المحاولات وحدود الطلبات",
      "حرّك البيانات بأمان بين Gmail، Slack، Sheets، Notion، وقواعد البيانات",
      "قدّر التكلفة لكل تشغيلة",
    ],
    prerequisites: ["أساسيات Prompt Engineering", "حساب على n8n.cloud أو Zapier"],
  },
  lessons: [
    {
      slug: "automation-mindset",
      durationMinutes: 25,
      en: {
        title: "The Automation Mindset",
        summary: "How to spot automatable workflows.",
        content: `# The Automation Mindset

Not everything should be automated. The right targets share three properties:

## 1. Repeated
Done at least weekly. One-offs aren't worth the build cost.

## 2. Rule-based or pattern-based
The decision can be described — even if fuzzily. "Classify emails by topic" works. "Decide which client to fire" doesn't.

## 3. Tolerant of small errors
A 5% error rate is fine for tagging emails; not fine for sending wire transfers.

## The trigger → process → action pattern
Every automation has three parts:
- **Trigger:** what starts it (new email, form submission, schedule)
- **Process:** what happens in the middle (AI step, lookup, transformation)
- **Action:** what it does (send Slack, write to DB, create task)

## Cost math
Each AI call costs money. For high-volume flows:
- GPT-4o-mini: ~$0.0001 per short call
- GPT-4o: ~$0.005 per medium call
- Multiply by daily volume × 30 days

A flow running 1,000 times a day with GPT-4o = $150/month. Cheap GPT-4o-mini = $3/month. Pick the model that just barely meets quality.`,
      },
      ar: {
        title: "عقلية الأتمتة",
        summary: "إزاي تكتشف تدفقات العمل القابلة للأتمتة.",
        content: `# عقلية الأتمتة

مش كل حاجة لازم تتأتمت. الأهداف الصحيحة بتشترك في 3 خصائص:

## 1. متكررة
بتتعمل أسبوعياً على الأقل. الحاجات العابرة مش مستاهلة تكلفة البناء.

## 2. قائمة على قواعد أو أنماط
القرار يمكن وصفه — حتى لو ضبابي. "صنّف الإيميلات حسب الموضوع" بيشتغل. "قرر مين العميل اللي أطرده" مش بيشتغل.

## 3. متسامحة مع الأخطاء الصغيرة
معدل خطأ 5% كويس لتصنيف الإيميلات؛ مش كويس لإرسال تحويلات بنكية.

## نمط Trigger → Process → Action
كل أتمتة ليها 3 أجزاء:
- **Trigger:** اللي بيبدأها (إيميل جديد، إرسال form، جدولة)
- **Process:** اللي بيحصل في النص (خطوة AI، بحث، تحويل)
- **Action:** اللي بتعمله (إرسال Slack، كتابة في DB، إنشاء مهمة)

## حسابات التكلفة
كل استدعاء AI بيكلف. للتدفقات عالية الحجم:
- GPT-4o-mini: ~$0.0001 لكل استدعاء قصير
- GPT-4o: ~$0.005 لكل استدعاء متوسط
- اضرب في الحجم اليومي × 30 يوم

تدفق بيشتغل 1,000 مرة يومياً بـGPT-4o = $150/شهر. GPT-4o-mini الرخيص = $3/شهر. اختار النموذج اللي بالكاد بيلبي الجودة.`,
      },
      quiz: [
        {
          en: {
            question: "Best automation candidates are:",
            options: ["One-off creative work", "Repeated, rule-based, error-tolerant", "High-stakes legal decisions", "Random tasks"],
            explanation: "Repetition + tolerable errors = ROI.",
          },
          ar: {
            question: "أفضل مرشحين للأتمتة:",
            options: ["شغل إبداعي عابر", "متكرر، قائم على قواعد، يتحمل أخطاء", "قرارات قانونية عالية المخاطر", "مهام عشوائية"],
            explanation: "تكرار + أخطاء محتمَلة = عائد.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "The three parts of any automation:",
            options: ["UI, DB, API", "Trigger, process, action", "Login, do, logout", "Start, wait, stop"],
            explanation: "Trigger → Process → Action.",
          },
          ar: {
            question: "التلات أجزاء لأي أتمتة:",
            options: ["UI, DB, API", "Trigger, process, action", "Login, do, logout", "Start, wait, stop"],
            explanation: "Trigger → Process → Action.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "To control costs, choose:",
            options: [
              "Always the largest model",
              "The cheapest model that meets quality",
              "Random model each run",
              "Local model only",
            ],
            explanation: "Right-size the model for the task.",
          },
          ar: {
            question: "للتحكم في التكلفة، اختار:",
            options: [
              "دايماً أكبر نموذج",
              "أرخص نموذج بيلبي الجودة",
              "نموذج عشوائي كل تشغيلة",
              "نموذج محلي فقط",
            ],
            explanation: "اضبط حجم النموذج على المهمة.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "n8n-basics",
      durationMinutes: 35,
      en: {
        title: "n8n Fundamentals",
        summary: "The open-source workflow engine.",
        content: `# n8n Fundamentals

n8n is a node-based automation tool. Open source, self-hostable, very powerful.

## Core concepts
- **Workflow:** a set of connected nodes
- **Node:** a single step (HTTP request, Gmail trigger, OpenAI call)
- **Execution:** one run of the workflow with real data
- **Credential:** stored API keys for integrations

## Your first workflow
1. Add a **Schedule Trigger** (every hour)
2. Add an **HTTP Request** node (fetch a public API)
3. Add an **OpenAI** node (summarize the response)
4. Add a **Slack** node (post the summary)
5. Save → activate.

## Expression syntax
Reference data from previous nodes with \`{{ $json.fieldName }}\` or \`{{ $('Node Name').item.json.field }}\`.

## Debugging
- Use the **executions** panel to see every run with input/output
- Pin sample data on a node to iterate downstream nodes without re-running the source
- Use the **Edit Fields (Set)** node to inspect or shape data

## Self-host vs cloud
- **n8n Cloud:** managed, $20+/month, easiest start
- **Self-hosted:** Docker on any VPS, free, more setup`,
      },
      ar: {
        title: "أساسيات n8n",
        summary: "محرك تدفقات العمل مفتوح المصدر.",
        content: `# أساسيات n8n

n8n أداة أتمتة قائمة على الـnodes. مفتوحة المصدر، قابلة للاستضافة الذاتية، قوية جداً.

## مفاهيم أساسية
- **Workflow:** مجموعة nodes مترابطة
- **Node:** خطوة واحدة (HTTP request, Gmail trigger, OpenAI call)
- **Execution:** تشغيلة واحدة للـworkflow ببيانات حقيقية
- **Credential:** مفاتيح API محفوظة للتكاملات

## أول workflow
1. ضيف **Schedule Trigger** (كل ساعة)
2. ضيف **HTTP Request** node (يجيب API عام)
3. ضيف **OpenAI** node (يلخّص الرد)
4. ضيف **Slack** node (ينشر الملخص)
5. احفظ → فعّل.

## صيغة التعبيرات
ارجع لبيانات من nodes سابقة بـ\`{{ $json.fieldName }}\` أو \`{{ $('Node Name').item.json.field }}\`.

## Debugging
- استخدم لوحة **executions** لتشوف كل تشغيلة بمدخلاتها وناتجها
- ثبّت بيانات تجريبية على node علشان تكرّر nodes لاحقة من غير إعادة تشغيل المصدر
- استخدم node **Edit Fields (Set)** لفحص أو تشكيل البيانات

## استضافة ذاتية vs سحابة
- **n8n Cloud:** مُدار، $20+/شهر، أسهل بداية
- **Self-hosted:** Docker على أي VPS، مجاني، إعداد أكتر`,
      },
      quiz: [
        {
          en: {
            question: "A 'node' in n8n is:",
            options: ["A user", "A single workflow step", "A server", "A database row"],
            explanation: "Each node performs one operation.",
          },
          ar: {
            question: "الـ'node' في n8n هو:",
            options: ["مستخدم", "خطوة واحدة في الـworkflow", "سيرفر", "صف قاعدة بيانات"],
            explanation: "كل node بيؤدي عملية واحدة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "To reference data from a previous node, you use:",
            options: ["SQL", "n8n expressions like {{ $json.field }}", "CSS selectors", "Regex only"],
            explanation: "Expressions interpolate runtime data.",
          },
          ar: {
            question: "للإشارة لبيانات من node سابق، تستخدم:",
            options: ["SQL", "تعبيرات n8n زي {{ $json.field }}", "CSS selectors", "Regex فقط"],
            explanation: "التعبيرات بتدخل بيانات وقت التشغيل.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Pinning sample data lets you:",
            options: [
              "Lock the workflow",
              "Iterate downstream nodes without re-running upstream",
              "Encrypt the workflow",
              "Pay less",
            ],
            explanation: "Faster iteration by reusing fixed input.",
          },
          ar: {
            question: "تثبيت بيانات تجريبية بيخليك:",
            options: [
              "تقفل الـworkflow",
              "تكرّر nodes لاحقة من غير إعادة تشغيل السابقة",
              "تشفّر الـworkflow",
              "تدفع أقل",
            ],
            explanation: "تكرار أسرع بإعادة استخدام مدخل ثابت.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "zapier-and-make",
      durationMinutes: 25,
      en: {
        title: "Zapier and Make — When and Why",
        summary: "The no-code commercial automation platforms.",
        content: `# Zapier and Make

If n8n feels too technical, Zapier and Make are no-code commercial alternatives with thousands of pre-built integrations.

## Zapier
- **Strengths:** simplest UI, most integrations (7,000+), great for non-technical users
- **Weaknesses:** expensive at scale, limited logic, slow execution (~1 min per Zap)
- **Pricing:** free for basic, $20–$70+/month

## Make (formerly Integromat)
- **Strengths:** powerful visual editor, supports loops, branches, advanced data manipulation; cheaper than Zapier
- **Weaknesses:** steeper learning curve
- **Pricing:** free tier, $9+/month

## When to use which
- **Zapier:** simple 2-3 step flows, non-technical user, integration-rich
- **Make:** medium complexity, budget-conscious, data manipulation
- **n8n:** complex logic, self-hosting needs, full control, devs

## AI in all three
All three have built-in OpenAI/Anthropic actions. The integration is virtually identical:
1. Pick the AI action
2. Provide prompt + variables from previous steps
3. Use the response in next steps`,
      },
      ar: {
        title: "Zapier وMake — إمتى وليه",
        summary: "منصات الأتمتة التجارية بدون كود.",
        content: `# Zapier وMake

لو n8n حسسك إنه تقني زيادة، Zapier وMake بدائل تجارية بدون كود فيهم آلاف التكاملات الجاهزة.

## Zapier
- **القوة:** أبسط واجهة، أكتر تكاملات (7,000+)، ممتاز للمستخدمين غير التقنيين
- **الضعف:** غالي على نطاق واسع، منطق محدود، تنفيذ بطيء (~دقيقة لكل Zap)
- **التسعير:** مجاني للأساسي، $20–$70+/شهر

## Make (Integromat سابقاً)
- **القوة:** محرر بصري قوي، بيدعم loops, branches, معالجة بيانات متقدمة؛ أرخص من Zapier
- **الضعف:** منحنى تعلم أصعب
- **التسعير:** باقة مجانية، $9+/شهر

## إمتى تستخدم إيه
- **Zapier:** تدفقات بسيطة 2-3 خطوات، مستخدم غير تقني، غني بالتكاملات
- **Make:** تعقيد متوسط، ميزانية محدودة، معالجة بيانات
- **n8n:** منطق معقد، احتياجات استضافة ذاتية، تحكم كامل، مطورين

## الـAI في التلاتة
كل التلاتة عندهم actions جاهزة لـOpenAI/Anthropic. التكامل تقريباً متطابق:
1. اختار AI action
2. قدّم prompt + متغيرات من خطوات سابقة
3. استخدم الرد في الخطوات اللي بعدها`,
      },
      quiz: [
        {
          en: {
            question: "Zapier's biggest strength is:",
            options: ["Cheapest", "Largest integration catalog and simplest UI", "Self-hosting", "Best AI"],
            explanation: "7,000+ integrations and easiest UI.",
          },
          ar: {
            question: "أكبر قوة في Zapier:",
            options: ["الأرخص", "أكبر كتالوج تكاملات وأبسط واجهة", "الاستضافة الذاتية", "أفضل AI"],
            explanation: "7,000+ تكامل وأسهل واجهة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "For complex logic on a budget, prefer:",
            options: ["Zapier", "Make", "Notion", "Excel"],
            explanation: "Make is more powerful per dollar.",
          },
          ar: {
            question: "للمنطق المعقد بميزانية، فضّل:",
            options: ["Zapier", "Make", "Notion", "Excel"],
            explanation: "Make أقوى لكل دولار.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "AI in Zapier/Make/n8n is:",
            options: [
              "Completely different in each",
              "A built-in action you configure with prompt + variables",
              "Only via custom code",
              "Not supported",
            ],
            explanation: "All three expose similar AI action nodes.",
          },
          ar: {
            question: "الـAI في Zapier/Make/n8n:",
            options: [
              "مختلف تماماً في كل واحد",
              "action جاهز تكوّنه بـprompt + متغيرات",
              "بس عن طريق كود مخصص",
              "غير مدعوم",
            ],
            explanation: "التلاتة بيكشفوا nodes AI شبه بعض.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "production-reliability",
      durationMinutes: 35,
      en: {
        title: "Reliability in Production",
        summary: "Errors, retries, rate limits, and observability.",
        content: `# Reliability in Production

A demo that runs once is not the same as a flow running 10,000 times.

## Error handling
- Wrap risky steps in **error workflows** (n8n) or **paths with filter conditions** (Zapier/Make)
- On error: log to a sheet/DB, notify a channel, optionally retry
- Never let one failure stop the whole flow silently

## Rate limits
LLM APIs limit requests per minute. Strategies:
- **Backoff & retry** on 429 errors
- **Batch** small items together
- **Throttle** with a delay node
- **Queue** with Redis or a database table for high volume

## Idempotency
Design so re-running a flow is safe. Use unique IDs to avoid duplicate Slack messages, double-charges, repeated emails.

## Cost monitoring
Add a step that logs (timestamp, tokens_used, estimated_cost) to a sheet. Review weekly. Set hard budget caps in OpenAI dashboard.

## Observability
- Tag each execution with input source + version
- Keep last 30 days of executions
- Alert on: error rate > 2%, latency > 30s, cost > X

A reliable automation is boring. That's the goal.`,
      },
      ar: {
        title: "الموثوقية في الإنتاج",
        summary: "الأخطاء وإعادة المحاولات وحدود الطلبات والمراقبة.",
        content: `# الموثوقية في الإنتاج

عرض بيشتغل مرة مش زي تدفق بيشتغل 10,000 مرة.

## التعامل مع الأخطاء
- لف الخطوات الخطرة في **error workflows** (n8n) أو **مسارات بشروط فلتر** (Zapier/Make)
- عند الخطأ: سجّل في Sheet/DB، نبّه قناة، اختيارياً أعد المحاولة
- متخلّيش فشل واحد يوقف التدفق كله بصمت

## حدود الطلبات
APIs الـLLMs بتحدد طلبات في الدقيقة. الاستراتيجيات:
- **Backoff & retry** عند أخطاء 429
- **Batch** عناصر صغيرة مع بعض
- **Throttle** بـnode تأخير
- **Queue** بـRedis أو جدول قاعدة بيانات للحجم العالي

## Idempotency
صمّم بحيث إعادة تشغيل التدفق آمنة. استخدم IDs فريدة لتجنّب رسائل Slack مكررة، فواتير مزدوجة، إيميلات متكررة.

## مراقبة التكلفة
ضيف خطوة بتسجّل (timestamp, tokens_used, estimated_cost) في Sheet. راجع أسبوعياً. حدّد سقف ميزانية صارم في dashboard الـOpenAI.

## المراقبة
- علّم كل execution بمصدر المدخل + الإصدار
- احتفظ بآخر 30 يوم من الـexecutions
- نبّه عند: معدل الخطأ > 2%، الكمون > 30 ث، التكلفة > X

الأتمتة الموثوقة مملّة. ده الهدف.`,
      },
      quiz: [
        {
          en: {
            question: "Idempotency means:",
            options: [
              "Faster execution",
              "Re-running a flow is safe (no duplicates)",
              "Lower cost",
              "Self-healing code",
            ],
            explanation: "Same input → same effect, even if repeated.",
          },
          ar: {
            question: "Idempotency تعني:",
            options: [
              "تنفيذ أسرع",
              "إعادة تشغيل التدفق آمنة (مفيش تكرار)",
              "تكلفة أقل",
              "كود يصلح نفسه",
            ],
            explanation: "نفس المدخل → نفس الأثر، حتى لو اتكرر.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Best response to a 429 (rate limit) error:",
            options: ["Crash", "Backoff and retry", "Switch language", "Notify the user only"],
            explanation: "Exponential backoff is the standard.",
          },
          ar: {
            question: "أفضل استجابة لخطأ 429 (حد الطلبات):",
            options: ["تعطّل", "Backoff وأعد المحاولة", "بدّل اللغة", "نبّه المستخدم فقط"],
            explanation: "Exponential backoff هو المعيار.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "An observable production flow has:",
            options: [
              "No logs",
              "Tagged executions, error alerts, cost monitoring",
              "Only manual checks",
              "Auto-deletion every minute",
            ],
            explanation: "You can't fix what you can't see.",
          },
          ar: {
            question: "التدفق المراقَب في الإنتاج عنده:",
            options: [
              "مفيش logs",
              "executions معلَّمة، تنبيهات أخطاء، مراقبة تكلفة",
              "بس فحوصات يدوية",
              "حذف تلقائي كل دقيقة",
            ],
            explanation: "مش تقدر تصلح اللي مش بتشوفه.",
          },
          correctIndex: 1,
        },
      ],
    },
  ],
  project: {
    slug: "email-triage-bot",
    difficulty: "medium",
    estimatedHours: 5,
    en: {
      title: "Build an AI Email Triage Bot",
      brief:
        "Build an n8n or Zapier flow that monitors a Gmail label, uses an LLM to classify each email (urgent / FYI / spam), and posts a daily Slack digest with summaries.",
      requirements: [
        "Trigger on Gmail label/inbox",
        "AI classification step with structured output",
        "Error handling on AI failures",
        "Daily summary action to Slack or email",
        "Cost tracked per run",
      ],
      deliverables: [
        "Exported workflow JSON",
        "Screenshots of test runs",
        "Cost per 100 emails calculation",
        "Reflection: where the AI was wrong and how you'd improve",
      ],
    },
    ar: {
      title: "ابني bot تصنيف إيميلات بالـAI",
      brief:
        "ابني تدفق n8n أو Zapier بيراقب label في Gmail، يستخدم LLM لتصنيف كل إيميل (عاجل / للعلم / spam)، وينشر ملخص يومي على Slack.",
      requirements: [
        "Trigger على Gmail label/inbox",
        "خطوة تصنيف AI بناتج منظّم",
        "تعامل مع الأخطاء عند فشل الـAI",
        "action ملخص يومي على Slack أو إيميل",
        "تتبّع التكلفة لكل تشغيلة",
      ],
      deliverables: [
        "JSON الـworkflow مُصدَّر",
        "screenshots للتشغيلات التجريبية",
        "حساب التكلفة لكل 100 إيميل",
        "تأمّل: فين الـAI كان غلط وإزاي هتحسّن",
      ],
    },
  },
};

export default course;
