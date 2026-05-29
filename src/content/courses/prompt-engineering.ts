import type { Course } from "../types";

const course: Course = {
  slug: "prompt-engineering",
  level: "beginner",
  durationMinutes: 200,
  accentColor: "#0ea5e9",
  coverGradient: "from-sky-500 via-cyan-500 to-teal-500",
  icon: "MessageSquare",
  category: "ai",
  en: {
    title: "Prompt Engineering",
    tagline: "Get dramatically better results from any LLM.",
    description:
      "Prompting is the highest-leverage AI skill. This course teaches the patterns top practitioners use: structured prompts, role-setting, few-shot examples, chain-of-thought reasoning, and reliable system prompts you can reuse.",
    learningOutcomes: [
      "Write prompts that consistently produce high-quality output",
      "Apply the 5 core prompting patterns",
      "Use few-shot examples to control format and style",
      "Build reusable system prompts for repeated tasks",
      "Debug failing prompts methodically",
    ],
    prerequisites: ["AI Fundamentals (recommended)", "An account with ChatGPT, Claude, or Gemini"],
  },
  ar: {
    title: "هندسة البرومبت",
    tagline: "احصل على نتائج أحسن بشكل كبير من أي LLM.",
    description:
      "البرومبت أعلى مهارة رافعة في الـAI. الكورس ده بيعلّمك الأنماط اللي بيستخدمها أحسن الممارسين: برومبتات منظّمة، تحديد الدور، أمثلة قليلة (few-shot)، تفكير متسلسل (chain-of-thought)، وبرومبتات نظام موثوقة تقدر تعيد استخدامها.",
    learningOutcomes: [
      "اكتب برومبتات بتنتج باستمرار ناتج عالي الجودة",
      "طبّق الـ5 أنماط الأساسية للبرومبت",
      "استخدم الأمثلة القليلة (few-shot) للتحكم في الصيغة والأسلوب",
      "ابني برومبتات نظام قابلة لإعادة الاستخدام للمهام المتكررة",
      "صحّح البرومبتات الفاشلة بشكل منهجي",
    ],
    prerequisites: ["أساسيات الـAI (مفضّل)", "حساب على ChatGPT أو Claude أو Gemini"],
  },
  lessons: [
    {
      slug: "anatomy-of-a-prompt",
      durationMinutes: 25,
      en: {
        title: "Anatomy of a Great Prompt",
        summary: "The 4 components every strong prompt has.",
        content: `# Anatomy of a Great Prompt

Strong prompts have four parts. Most weak prompts are missing two of them.

## 1. Role
Tell the model who it is. "You are an experienced UX writer." This biases the entire response space.

## 2. Task
A precise verb-led instruction. "Rewrite this onboarding email to feel warmer."

## 3. Context
What does the model need to know? Audience, constraints, examples, brand voice.

## 4. Format
Exact output shape. "Return as a JSON object with keys: subject, body, cta."

## Example: weak vs strong

**Weak:** "Make this email better."

**Strong:** "You are an experienced UX writer for a fintech app. Rewrite the email below to feel warmer and reduce friction for first-time users. Keep it under 80 words. Return as JSON: { subject, body, cta_text }."

The strong version is 4× longer and produces output that's 10× more useful.`,
      },
      ar: {
        title: "تشريح البرومبت الممتاز",
        summary: "الـ4 مكونات اللي كل برومبت قوي بيمتلكها.",
        content: `# تشريح البرومبت الممتاز

البرومبتات القوية ليها 4 أجزاء. معظم البرومبتات الضعيفة ناقصها اتنين منهم.

## 1. الدور (Role)
قول للنموذج هو مين. "أنت كاتب تجربة مستخدم محترف." ده بيحيّز كل مساحة الاستجابة.

## 2. المهمة (Task)
تعليمة دقيقة بفعل واضح. "أعد كتابة إيميل الترحيب ده ليكون أدفأ."

## 3. السياق (Context)
إيه اللي النموذج محتاج يعرفه؟ الجمهور، القيود، الأمثلة، صوت العلامة التجارية.

## 4. الصيغة (Format)
الشكل الدقيق للناتج. "ارجع كـJSON بمفاتيح: subject, body, cta."

## مثال: ضعيف vs قوي

**ضعيف:** "حسّن الإيميل ده."

**قوي:** "أنت كاتب تجربة مستخدم محترف لتطبيق fintech. أعد كتابة الإيميل تحت ليكون أدفأ ويقلل الاحتكاك للمستخدمين الجدد. خليه أقل من 80 كلمة. ارجع كـJSON: { subject, body, cta_text }."

النسخة القوية أطول 4 مرات وبتنتج ناتج أفيد 10 مرات.`,
      },
      quiz: [
        {
          en: {
            question: "Which is NOT one of the 4 prompt components?",
            options: ["Role", "Task", "Format", "Encryption"],
            explanation: "Role, Task, Context, Format are the four.",
          },
          ar: {
            question: "أيهم ليس من الـ4 مكونات؟",
            options: ["الدور", "المهمة", "الصيغة", "التشفير"],
            explanation: "الدور، المهمة، السياق، الصيغة هم الأربعة.",
          },
          correctIndex: 3,
        },
        {
          en: {
            question: "Setting a role like 'You are an expert X' helps because:",
            options: [
              "It unlocks hidden features",
              "It biases the model toward a relevant response space",
              "It charges less per request",
              "It bypasses safety",
            ],
            explanation: "Role-setting shapes vocabulary, depth, and style.",
          },
          ar: {
            question: "تحديد دور زي 'أنت خبير في X' بيساعد لأن:",
            options: [
              "بيفتح ميزات مخفية",
              "بيحيّز النموذج نحو مساحة استجابة ذات صلة",
              "بيقلل التكلفة لكل طلب",
              "بيتجاوز الأمان",
            ],
            explanation: "تحديد الدور بيشكّل المفردات والعمق والأسلوب.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Specifying exact output format (e.g., JSON) is useful because:",
            options: [
              "It looks fancy",
              "It makes output predictable and machine-parseable",
              "It encrypts the response",
              "It reduces hallucination to zero",
            ],
            explanation: "Predictable format is essential for downstream automation.",
          },
          ar: {
            question: "تحديد صيغة الناتج بدقة (مثلاً JSON) مفيد لأن:",
            options: [
              "بيبان شيك",
              "بيخلي الناتج متوقَّع وقابل للتحليل البرمجي",
              "بيشفّر الاستجابة",
              "بيقلل الهلوسة لصفر",
            ],
            explanation: "الصيغة المتوقَّعة ضرورية للأتمتة اللاحقة.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "few-shot-prompting",
      durationMinutes: 25,
      en: {
        title: "Few-Shot Prompting",
        summary: "Teach by example — the most reliable control technique.",
        content: `# Few-Shot Prompting

Show the model 2–5 examples of input → output, and it will pattern-match the rest.

## When to use
- You need consistent format
- The task is hard to describe but easy to demonstrate
- Style and tone matter

## Template

\`\`\`
Classify each support ticket as: BUG, FEATURE_REQUEST, or QUESTION.

Example 1
Input: "The app crashes when I open settings."
Output: BUG

Example 2
Input: "Can you add dark mode?"
Output: FEATURE_REQUEST

Example 3
Input: "How do I reset my password?"
Output: QUESTION

Now classify:
Input: "My export keeps failing with error 500."
Output:
\`\`\`

## Tips
- Use realistic, diverse examples
- Make examples *short* — every token costs
- Match the exact format you want back

## When few-shot fails
If outputs still vary, your examples may be inconsistent or your task may require chain-of-thought reasoning (next lesson).`,
      },
      ar: {
        title: "البرومبت بأمثلة قليلة (Few-Shot)",
        summary: "اتعلّم بالمثال — أكثر تقنية تحكم موثوقة.",
        content: `# البرومبت بأمثلة قليلة (Few-Shot)

ورّي النموذج 2–5 أمثلة لـإدخال → ناتج، وهو هيقلّد النمط للباقي.

## إمتى تستخدمه
- محتاج صيغة متسقة
- المهمة صعب توصفها بس سهل توضحها
- الأسلوب والنبرة مهمين

## القالب

\`\`\`
صنّف كل تذكرة دعم كـ: BUG, FEATURE_REQUEST, أو QUESTION.

مثال 1
Input: "التطبيق بيقفل لما بفتح الإعدادات."
Output: BUG

مثال 2
Input: "تقدر تضيف الوضع الداكن؟"
Output: FEATURE_REQUEST

مثال 3
Input: "إزاي أعيد ضبط كلمة السر؟"
Output: QUESTION

دلوقتي صنّف:
Input: "التصدير بيفشل بـerror 500."
Output:
\`\`\`

## نصائح
- استخدم أمثلة واقعية ومتنوعة
- خلّي الأمثلة *قصيرة* — كل توكن ليه ثمن
- طابق الصيغة الدقيقة اللي عايزها

## لما few-shot يفشل
لو الناتج لسه بيتغير، يمكن أمثلتك مش متسقة أو المهمة محتاجة تفكير متسلسل (الدرس الجاي).`,
      },
      quiz: [
        {
          en: {
            question: "Few-shot prompting works best when:",
            options: [
              "The task is impossible",
              "The task is hard to describe but easy to demonstrate",
              "You have no examples",
              "You want random output",
            ],
            explanation: "Examples teach pattern when description is hard.",
          },
          ar: {
            question: "البرومبت بأمثلة قليلة بيشتغل أحسن لما:",
            options: [
              "المهمة مستحيلة",
              "المهمة صعب توصفها بس سهل توضحها",
              "ملكش أمثلة",
              "عايز ناتج عشوائي",
            ],
            explanation: "الأمثلة بتعلّم النمط لما الوصف صعب.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "How many examples is 'few-shot' typically?",
            options: ["0", "1", "2–5", "50+"],
            explanation: "Two to five is the sweet spot.",
          },
          ar: {
            question: "كام مثال عادةً في 'few-shot'؟",
            options: ["0", "1", "2–5", "50+"],
            explanation: "اتنين لخمسة هي النقطة المثالية.",
          },
          correctIndex: 2,
        },
        {
          en: {
            question: "If few-shot output is inconsistent, first check:",
            options: [
              "Internet speed",
              "Whether your examples are themselves consistent",
              "Browser cache",
              "Server uptime",
            ],
            explanation: "Inconsistent examples produce inconsistent output.",
          },
          ar: {
            question: "لو ناتج few-shot غير متسق، اتأكد الأول من:",
            options: [
              "سرعة النت",
              "إن أمثلتك متسقة في حد ذاتها",
              "كاش المتصفح",
              "وقت تشغيل السيرفر",
            ],
            explanation: "أمثلة غير متسقة بتنتج ناتج غير متسق.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "chain-of-thought",
      durationMinutes: 30,
      en: {
        title: "Chain-of-Thought Reasoning",
        summary: "Make the model think step-by-step for harder problems.",
        content: `# Chain-of-Thought (CoT)

For multi-step problems — math, logic, planning — ask the model to **show its work** before answering.

## The magic phrase
> "Think step by step."

Adding this 4-word phrase consistently improves accuracy on reasoning tasks.

## Structured CoT

\`\`\`
Solve this problem. First list your reasoning steps, then give the final answer.

Problem: A factory makes 240 widgets per shift. There are 3 shifts a day, but the night shift is 20% less productive. How many widgets per day?

Reasoning:
Final answer:
\`\`\`

## Why it works
Each token the model generates influences the next. By forcing intermediate reasoning tokens, you give the final answer "room" to be correct.

## When NOT to use
- Simple lookups or classifications — wastes tokens
- When you need ultra-fast output

## Hidden CoT
Modern models (GPT-4, Claude 3.5) can be told to "think internally before responding" — this gives them a private scratchpad without polluting your output.`,
      },
      ar: {
        title: "التفكير المتسلسل (Chain-of-Thought)",
        summary: "خلّي النموذج يفكّر خطوة بخطوة للمشاكل الأصعب.",
        content: `# التفكير المتسلسل (CoT)

للمشاكل متعددة الخطوات — رياضيات، منطق، تخطيط — اطلب من النموذج إنه **يوضّح شغله** قبل الإجابة.

## العبارة السحرية
> "فكّر خطوة بخطوة."

إضافة العبارة دي بتحسّن الدقة باستمرار في مهام التفكير.

## CoT منظّم

\`\`\`
حل المشكلة دي. أولاً اذكر خطوات تفكيرك، وبعدين أعطِ الإجابة النهائية.

المشكلة: مصنع بيعمل 240 وحدة في الوردية. فيه 3 ورديات في اليوم، بس وردية الليل أقل إنتاجية بـ20%. كام وحدة في اليوم؟

التفكير:
الإجابة النهائية:
\`\`\`

## ليه بيشتغل
كل توكن النموذج بيولّده بيأثّر على اللي بعده. لما تجبره يعمل توكنز تفكير وسيطة، بتدّي الإجابة النهائية "مساحة" تكون صحيحة.

## إمتى متستخدمهوش
- البحث البسيط أو التصنيف — بيضيّع توكنز
- لما محتاج ناتج فائق السرعة

## CoT مخفي
النماذج الحديثة (GPT-4, Claude 3.5) تقدر تقولها "فكّر داخلياً قبل الرد" — ده بيدّيها مفكرة خاصة من غير ما يلوّث الناتج.`,
      },
      quiz: [
        {
          en: {
            question: "Chain-of-thought helps most with:",
            options: [
              "Multi-step reasoning problems",
              "Simple lookups",
              "Image cropping",
              "File uploads",
            ],
            explanation: "CoT shines when the answer requires reasoning steps.",
          },
          ar: {
            question: "التفكير المتسلسل بيساعد أكتر في:",
            options: [
              "مشاكل تفكير متعدد الخطوات",
              "البحث البسيط",
              "قص الصور",
              "رفع الملفات",
            ],
            explanation: "CoT بيتألق لما الإجابة تحتاج خطوات تفكير.",
          },
          correctIndex: 0,
        },
        {
          en: {
            question: "Why does 'think step by step' improve answers?",
            options: [
              "It triggers a faster model",
              "Intermediate reasoning tokens give the final answer room to be correct",
              "It bypasses rate limits",
              "It downloads new training data",
            ],
            explanation: "Each token influences the next; reasoning tokens scaffold the answer.",
          },
          ar: {
            question: "ليه 'فكّر خطوة بخطوة' بيحسّن الإجابات؟",
            options: [
              "بيشغّل نموذج أسرع",
              "توكنز التفكير الوسيطة بتدّي الإجابة النهائية مساحة تكون صحيحة",
              "بيتجاوز حدود الطلبات",
              "بينزّل بيانات تدريب جديدة",
            ],
            explanation: "كل توكن بيأثّر على اللي بعده؛ توكنز التفكير بتدعم الإجابة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "When should you AVOID CoT?",
            options: [
              "Complex planning",
              "Simple classification where speed matters",
              "Math problems",
              "Logic puzzles",
            ],
            explanation: "Don't waste tokens on trivial tasks.",
          },
          ar: {
            question: "إمتى تتجنّب CoT؟",
            options: [
              "التخطيط المعقد",
              "التصنيف البسيط لما السرعة مهمة",
              "مسائل الرياضيات",
              "ألغاز المنطق",
            ],
            explanation: "متضيّعش توكنز على مهام تافهة.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "system-prompts",
      durationMinutes: 25,
      en: {
        title: "System Prompts You Can Reuse",
        summary: "Build a library of reliable, parameterized prompts.",
        content: `# Reusable System Prompts

Stop rewriting prompts. Build a small library you can drop into any tool.

## Template structure
\`\`\`
ROLE: [who the model is]
GOAL: [the outcome]
CONSTRAINTS: [must / must not]
PROCESS: [steps to follow]
OUTPUT: [exact format]
EXAMPLES (optional): [1-2 short ones]
\`\`\`

## Example: meeting summarizer

\`\`\`
ROLE: You are a meticulous executive assistant.
GOAL: Summarize a meeting transcript into actionable notes.
CONSTRAINTS:
- Output must be under 200 words
- Use only information present in the transcript
- Flag uncertainties with [unclear]
PROCESS:
1. Identify decisions made
2. Identify action items with owner and due date
3. Identify open questions
OUTPUT format (markdown):
## Decisions
## Action items (Owner — Date — Action)
## Open questions
\`\`\`

Save this once, paste it forever.

## Versioning
Treat prompts like code. Number them (v1, v2). Note what changed. Test before you ship.`,
      },
      ar: {
        title: "برومبتات نظام قابلة لإعادة الاستخدام",
        summary: "ابني مكتبة برومبتات موثوقة ومعلَّمة.",
        content: `# برومبتات نظام قابلة لإعادة الاستخدام

بطّل تعيد كتابة البرومبتات. ابني مكتبة صغيرة تقدر تستخدمها في أي أداة.

## هيكل القالب
\`\`\`
ROLE: [مين النموذج]
GOAL: [الناتج المطلوب]
CONSTRAINTS: [لازم / ممنوع]
PROCESS: [خطوات يتبعها]
OUTPUT: [الصيغة الدقيقة]
EXAMPLES (اختياري): [1-2 قصيرين]
\`\`\`

## مثال: ملخّص اجتماعات

\`\`\`
ROLE: أنت مساعد تنفيذي دقيق.
GOAL: لخّص نص اجتماع لملاحظات قابلة للتنفيذ.
CONSTRAINTS:
- الناتج لازم يكون أقل من 200 كلمة
- استخدم فقط معلومات موجودة في النص
- علّم على الشكوك بـ[غير واضح]
PROCESS:
1. حدد القرارات المتخذة
2. حدد عناصر العمل بالمسؤول وتاريخ التسليم
3. حدد الأسئلة المفتوحة
OUTPUT format (markdown):
## القرارات
## عناصر العمل (المسؤول — التاريخ — الإجراء)
## أسئلة مفتوحة
\`\`\`

احفظه مرة، الصقه للأبد.

## الإصدارات
اعتبر البرومبتات كود. رقّمها (v1, v2). دوّن إيه اتغير. اختبر قبل ما تشحن.`,
      },
      quiz: [
        {
          en: {
            question: "A reusable system prompt should:",
            options: [
              "Be vague to apply broadly",
              "Specify role, goal, constraints, process, and output",
              "Avoid examples",
              "Always be under 20 words",
            ],
            explanation: "Structure makes prompts portable and reliable.",
          },
          ar: {
            question: "برومبت النظام القابل لإعادة الاستخدام لازم:",
            options: [
              "يكون مبهم علشان ينطبق على نطاق واسع",
              "يحدد الدور والهدف والقيود والعملية والناتج",
              "يتجنّب الأمثلة",
              "يكون دايماً أقل من 20 كلمة",
            ],
            explanation: "الهيكل بيخلي البرومبتات قابلة للنقل وموثوقة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Versioning prompts (v1, v2) is recommended because:",
            options: [
              "It increases token count",
              "Prompts behave like code — track changes and test",
              "It's required by APIs",
              "It speeds up models",
            ],
            explanation: "Prompts evolve; track them.",
          },
          ar: {
            question: "إدارة إصدارات البرومبتات (v1, v2) موصى بيها لأن:",
            options: [
              "بتزود عدد التوكنز",
              "البرومبتات بتتصرف زي الكود — تتبّع التغييرات واختبر",
              "مطلوبة من الـAPIs",
              "بتسرّع النماذج",
            ],
            explanation: "البرومبتات بتتطور؛ تتبّعها.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "A constraint like 'output must be under 200 words' is:",
            options: [
              "Useless",
              "A useful guardrail that improves consistency",
              "Forbidden by OpenAI",
              "Only for paid plans",
            ],
            explanation: "Explicit constraints reduce variance.",
          },
          ar: {
            question: "قيد زي 'الناتج لازم يكون أقل من 200 كلمة' هو:",
            options: [
              "عديم الفائدة",
              "حاجز مفيد بيحسّن الاتساق",
              "ممنوع من OpenAI",
              "بس للباقات المدفوعة",
            ],
            explanation: "القيود الصريحة بتقلل التباين.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "debugging-prompts",
      durationMinutes: 25,
      en: {
        title: "Debugging Failed Prompts",
        summary: "A systematic process when output isn't what you want.",
        content: `# Debugging Failed Prompts

When a prompt fails, don't randomly tweak. Diagnose.

## The 4-question diagnosis

1. **Is the task clear?** Can a smart human follow the instructions and produce what you want? If no, rewrite.
2. **Is the context sufficient?** Did you provide enough information? Often the model lacks a fact you assumed it had.
3. **Is the format specified?** Vague format → variable output. Pin it down.
4. **Are there counter-examples?** Sometimes show the model *bad* examples labeled "don't do this."

## The variable isolation method
Change *one thing at a time*:
- First try: add role
- Second try: add format
- Third try: add example
Track what helps. This builds intuition fast.

## When the model refuses
If the model says "I can't help with that," check:
- Are you asking for something genuinely against policy?
- Or is the prompt accidentally triggering a safety filter? Rephrase neutrally.

## Last resort
Switch models. GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro each have strengths. If one fails on a task, try another before declaring it impossible.`,
      },
      ar: {
        title: "تصحيح البرومبتات الفاشلة",
        summary: "عملية منهجية لما الناتج مش زي ما عايز.",
        content: `# تصحيح البرومبتات الفاشلة

لما برومبت يفشل، متغيّرش حاجات بشكل عشوائي. شخّص.

## تشخيص بـ4 أسئلة

1. **المهمة واضحة؟** ممكن إنسان ذكي يتبع التعليمات وينتج اللي عايزه؟ لو لأ، أعد الكتابة.
2. **السياق كافي؟** قدمت معلومات كفاية؟ غالباً النموذج بيكون ناقصه حقيقة افترضت إنه يعرفها.
3. **الصيغة محددة؟** صيغة مبهمة → ناتج متغير. حدّدها.
4. **في أمثلة معاكسة؟** أحياناً ورّي النموذج أمثلة *وحشة* معلَّمة بـ"متعملش كده."

## طريقة عزل المتغير
غيّر *حاجة واحدة في المرة*:
- أول محاولة: ضيف دور
- تاني محاولة: ضيف صيغة
- تالت محاولة: ضيف مثال
تتبّع إيه اللي بيساعد. ده بيبني حدس بسرعة.

## لما النموذج يرفض
لو النموذج قال "مقدرش أساعد في كده،" اتأكد من:
- بتطلب حاجة فعلاً ضد السياسة؟
- أو البرومبت بدون قصد بيحرّك فلتر أمان؟ أعد الصياغة بحياد.

## الملاذ الأخير
بدّل النموذج. GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro كل واحد ليه نقاط قوة. لو واحد فشل في مهمة، جرب التاني قبل ما تقول مستحيلة.`,
      },
      quiz: [
        {
          en: {
            question: "The variable isolation method means:",
            options: [
              "Changing many things at once",
              "Changing one thing at a time and tracking impact",
              "Using only one model",
              "Avoiding format changes",
            ],
            explanation: "Isolating variables builds intuition.",
          },
          ar: {
            question: "طريقة عزل المتغير تعني:",
            options: [
              "تغيير حاجات كتير في نفس الوقت",
              "تغيير حاجة واحدة في المرة وتتبّع الأثر",
              "استخدام نموذج واحد فقط",
              "تجنّب تغييرات الصيغة",
            ],
            explanation: "عزل المتغيرات بيبني حدس.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "If the model refuses a benign request, first try:",
            options: [
              "Calling support",
              "Rephrasing neutrally — you may be triggering a safety filter",
              "Restarting your computer",
              "Switching providers immediately",
            ],
            explanation: "Wording can accidentally trigger filters.",
          },
          ar: {
            question: "لو النموذج رفض طلب عادي، جرب الأول:",
            options: [
              "اتصل بالدعم",
              "أعد الصياغة بحياد — يمكن بتحرّك فلتر أمان",
              "أعد تشغيل الكمبيوتر",
              "بدّل الموفّر فوراً",
            ],
            explanation: "الصياغة ممكن تحرّك الفلاتر بدون قصد.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Counter-examples ('don't do this') are useful when:",
            options: [
              "You want to confuse the model",
              "You want to clarify a boundary the model keeps crossing",
              "You have unlimited budget",
              "Always — every prompt needs them",
            ],
            explanation: "Negative examples clarify boundaries.",
          },
          ar: {
            question: "الأمثلة المعاكسة ('متعملش كده') مفيدة لما:",
            options: [
              "عايز تشوّش النموذج",
              "عايز توضّح حد النموذج بيتجاوزه باستمرار",
              "ميزانيتك مفتوحة",
              "دايماً — كل برومبت محتاجها",
            ],
            explanation: "الأمثلة السلبية بتوضّح الحدود.",
          },
          correctIndex: 1,
        },
      ],
    },
  ],
  project: {
    slug: "prompt-library",
    difficulty: "medium",
    estimatedHours: 3,
    en: {
      title: "Build a 10-Prompt Personal Library",
      brief:
        "Create 10 reusable system prompts for tasks you actually do — writing emails, summarizing, brainstorming, etc. Each prompt should use the ROLE/GOAL/CONSTRAINTS/PROCESS/OUTPUT structure and be tested against 3 inputs.",
      requirements: [
        "10 distinct, useful prompts (not variations of the same one)",
        "Each follows the structured template",
        "Each tested on 3 real inputs with output saved",
        "Notes on failures and iterations (v1 → v2)",
      ],
      deliverables: [
        "A markdown document with all 10 prompts",
        "Test results section per prompt",
        "Short reflection: which patterns worked, which didn't",
      ],
    },
    ar: {
      title: "ابني مكتبة شخصية من 10 برومبتات",
      brief:
        "اعمل 10 برومبتات نظام قابلة لإعادة الاستخدام لمهام بتعملها فعلاً — كتابة إيميلات، تلخيص، عصف ذهني، إلخ. كل برومبت يستخدم هيكل ROLE/GOAL/CONSTRAINTS/PROCESS/OUTPUT ويتم اختباره على 3 مدخلات.",
      requirements: [
        "10 برومبتات مميّزة ومفيدة (مش تنويعات لنفس البرومبت)",
        "كل واحد بيتبع القالب المنظّم",
        "كل واحد متختبر على 3 مدخلات حقيقية مع حفظ الناتج",
        "ملاحظات على الإخفاقات والتكرارات (v1 → v2)",
      ],
      deliverables: [
        "مستند markdown بكل الـ10 برومبتات",
        "قسم نتائج الاختبار لكل برومبت",
        "تأمّل قصير: إيه الأنماط اللي اشتغلت، إيه اللي ما اشتغلتش",
      ],
    },
  },
};

export default course;
