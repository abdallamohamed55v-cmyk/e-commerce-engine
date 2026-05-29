import type { Course } from "../types";

const course: Course = {
  slug: "ai-fundamentals",
  level: "beginner",
  durationMinutes: 240,
  accentColor: "#6366f1",
  coverGradient: "from-indigo-500 via-purple-500 to-pink-500",
  icon: "Brain",
  category: "ai",
  en: {
    title: "AI Fundamentals",
    tagline: "Understand how modern AI actually works — without the hype.",
    description:
      "A clear, plain-language introduction to artificial intelligence. You'll learn what AI is, how machine learning and large language models work, and how to think critically about AI's capabilities and limits — so you can apply it to real problems with confidence.",
    learningOutcomes: [
      "Explain what AI, machine learning, and deep learning are — and how they differ",
      "Understand how large language models generate text",
      "Identify good and bad use cases for AI in everyday work",
      "Recognize common AI failure modes and biases",
      "Speak fluently about AI with technical and non-technical people",
    ],
    prerequisites: [
      "No prior technical background required",
      "Basic comfort with using web apps",
    ],
  },
  ar: {
    title: "أساسيات الذكاء الاصطناعي",
    tagline: "افهم إزاي الذكاء الاصطناعي بيشتغل فعلاً — من غير مبالغة.",
    description:
      "مقدمة واضحة وبسيطة للذكاء الاصطناعي. هتتعلم إيه هو الـAI، إزاي بيشتغل تعلم الآلة والنماذج اللغوية الكبيرة، وإزاي تفكر بشكل نقدي في إمكانياته وحدوده — علشان تقدر تطبّقه على مشاكل حقيقية بثقة.",
    learningOutcomes: [
      "اشرح إيه الـAI والـmachine learning والـdeep learning والفرق بينهم",
      "افهم إزاي النماذج اللغوية الكبيرة بتولّد نصوص",
      "حدّد استخدامات كويسة ووحشة للـAI في شغلك اليومي",
      "اعرف أنماط فشل الـAI الشائعة والتحيزات",
      "اتكلم بطلاقة عن الـAI مع الناس التقنيين وغير التقنيين",
    ],
    prerequisites: [
      "مش مطلوب أي خلفية تقنية",
      "ارتياح أساسي مع استخدام تطبيقات الويب",
    ],
  },
  lessons: [
    {
      slug: "what-is-ai",
      durationMinutes: 25,
      en: {
        title: "What Is AI, Really?",
        summary: "Cut through the buzzwords: a precise definition of AI.",
        content: `# What Is AI, Really?

Artificial Intelligence is software that performs tasks we'd normally consider to require human intelligence — recognizing speech, translating languages, writing essays, generating images.

## The three terms you'll hear constantly

**Artificial Intelligence (AI)** is the broad field — any system that mimics intelligent behavior.

**Machine Learning (ML)** is a subset of AI. Instead of being explicitly programmed, ML systems *learn patterns from data*.

**Deep Learning** is a subset of ML that uses neural networks with many layers. It's what powers modern breakthroughs like ChatGPT and image generators.

## A useful mental model

Think of traditional software as a chef following an exact recipe. Machine learning is a chef who tasted 10,000 dishes and learned to cook by pattern recognition — they can improvise, but they can also confidently produce something terrible.

## What AI is NOT

- AI does not "understand" in the way humans do.
- AI does not have goals, feelings, or self-awareness.
- AI is not magic — it's statistics, math, and a lot of data.

The clearer your mental model, the better your decisions about when to use AI and when to avoid it.`,
      },
      ar: {
        title: "إيه هو الـAI فعلاً؟",
        summary: "بعيد عن الكلام الرنّان: تعريف دقيق للذكاء الاصطناعي.",
        content: `# إيه هو الـAI فعلاً؟

الذكاء الاصطناعي هو برامج بتعمل مهام عادةً بنعتبرها محتاجة ذكاء بشري — التعرّف على الصوت، الترجمة، كتابة المقالات، توليد الصور.

## التلات مصطلحات اللي هتسمعها باستمرار

**الذكاء الاصطناعي (AI)** هو المجال العام — أي نظام بيقلّد السلوك الذكي.

**تعلم الآلة (ML)** فرع من الـAI. بدل ما نبرمج النظام مباشرة، الـML بيتعلم *الأنماط من البيانات*.

**التعلم العميق (Deep Learning)** فرع من الـML بيستخدم شبكات عصبية بطبقات كتير. ده اللي بيشغّل الاختراقات الحديثة زي ChatGPT ومولّدات الصور.

## نموذج ذهني مفيد

تخيّل البرامج التقليدية كشيف بيتبع وصفة محددة. تعلم الآلة شيف داق 10,000 طبق واتعلم الطبخ بالأنماط — يقدر يرتجل، بس كمان ممكن بثقة يطلّع حاجة وحشة.

## الـAI مش

- مش "بيفهم" زي البشر.
- مفيش عنده أهداف ولا مشاعر ولا وعي ذاتي.
- مش سحر — ده إحصاء ورياضيات وبيانات كتير.

كل ما نموذجك الذهني يكون أوضح، كل ما قراراتك تبقى أحسن عن إمتى تستخدم الـAI وإمتى تتجنّبه.`,
      },
      quiz: [
        {
          en: {
            question: "Machine learning differs from traditional programming because:",
            options: [
              "It runs on faster hardware",
              "It learns patterns from data instead of following explicit rules",
              "It only works with images",
              "It is always more accurate",
            ],
            explanation:
              "ML systems infer rules from examples, while traditional code follows rules written by humans.",
          },
          ar: {
            question: "تعلم الآلة بيختلف عن البرمجة التقليدية لأن:",
            options: [
              "بيشتغل على hardware أسرع",
              "بيتعلم الأنماط من البيانات بدل ما يتبع قواعد محددة",
              "بيشتغل بس مع الصور",
              "دايماً أدق",
            ],
            explanation:
              "أنظمة الـML بتستنتج القواعد من الأمثلة، بينما الكود التقليدي بيتبع قواعد بشرية مكتوبة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Deep learning is:",
            options: [
              "A type of database",
              "A subset of machine learning that uses multi-layer neural networks",
              "Synonymous with AGI",
              "Only used in robotics",
            ],
            explanation: "Deep learning uses neural networks with many layers — hence 'deep'.",
          },
          ar: {
            question: "التعلم العميق هو:",
            options: [
              "نوع من قواعد البيانات",
              "فرع من تعلم الآلة بيستخدم شبكات عصبية متعددة الطبقات",
              "مرادف للذكاء العام الاصطناعي AGI",
              "بيُستخدم بس في الروبوتات",
            ],
            explanation: "التعلم العميق بيستخدم شبكات عصبية بطبقات كتير — ولذلك 'عميق'.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Which statement is most accurate?",
            options: [
              "AI systems truly understand language",
              "AI is conscious",
              "AI is built on statistics, math, and data",
              "AI cannot fail",
            ],
            explanation: "Modern AI is statistical pattern recognition at massive scale.",
          },
          ar: {
            question: "أي عبارة هي الأدق؟",
            options: [
              "أنظمة الـAI بتفهم اللغة فعلاً",
              "الـAI واعي",
              "الـAI مبني على الإحصاء والرياضيات والبيانات",
              "الـAI ميقدرش يفشل",
            ],
            explanation: "الـAI الحديث هو تعرّف على الأنماط بشكل إحصائي على نطاق ضخم.",
          },
          correctIndex: 2,
        },
      ],
    },
    {
      slug: "how-llms-work",
      durationMinutes: 30,
      en: {
        title: "How Large Language Models Work",
        summary: "Tokens, prediction, and why ChatGPT sometimes makes things up.",
        content: `# How Large Language Models Work

A Large Language Model (LLM) is, at its core, a very sophisticated next-word predictor.

## Tokens — the alphabet of LLMs

LLMs don't read characters or words — they read **tokens**. A token is roughly 4 characters of English text. The sentence "AI is fun" becomes about 3 tokens.

## Prediction, not retrieval

When you send a prompt, the model generates the *most likely next token*, then the next, then the next — one at a time. It is not looking anything up in a database.

This is why LLMs **hallucinate**: when they don't know an answer, they generate the most statistically plausible continuation, which may be false.

## Training in two phases

1. **Pre-training:** the model reads billions of pages of text and learns statistical patterns of language.
2. **Fine-tuning + RLHF:** humans show the model preferred answers, teaching it to be helpful, harmless, and honest.

## Why context matters

Every word you put in the prompt influences every subsequent token. Better context → better output. This is the basis of prompt engineering.`,
      },
      ar: {
        title: "إزاي بتشتغل النماذج اللغوية الكبيرة",
        summary: "التوكنز، التنبؤ، وليه ChatGPT بيخترع حاجات أحياناً.",
        content: `# إزاي بتشتغل النماذج اللغوية الكبيرة

النموذج اللغوي الكبير (LLM) في الأساس متنبّئ للكلمة التالية بشكل متطور جداً.

## التوكنز — أبجدية الـLLMs

الـLLMs مبتقراش حروف أو كلمات — بتقرا **توكنز**. التوكن تقريباً 4 حروف إنجليزية. جملة "AI is fun" بتبقى حوالي 3 توكنز.

## تنبؤ، مش بحث

لما تبعت برومبت، النموذج بيولّد *التوكن التالي الأكثر احتمالاً*، وبعدين اللي بعده، واحد ورا التاني. مش بيدوّر في قاعدة بيانات.

ولذلك الـLLMs **بتهلوس** (hallucinate): لما متعرفش إجابة، بتولّد الاستكمال الأكثر معقولية إحصائياً، اللي ممكن يكون غلط.

## التدريب على مرحلتين

1. **التدريب المسبق:** النموذج بيقرأ مليارات الصفحات النصية ويتعلم الأنماط الإحصائية للغة.
2. **الضبط الدقيق + RLHF:** البشر بيوروا للنموذج الإجابات المفضلة، ويعلّموه إنه يبقى مفيد وآمن وصادق.

## ليه السياق مهم

كل كلمة بتحطها في البرومبت بتأثّر على كل توكن بعدها. سياق أحسن → ناتج أحسن. ده أساس prompt engineering.`,
      },
      quiz: [
        {
          en: {
            question: "What is a 'token' in an LLM?",
            options: [
              "A user's session ID",
              "A unit of text (~4 chars) the model processes",
              "An API authentication key",
              "A complete sentence",
            ],
            explanation: "Tokens are the chunks LLMs read and produce.",
          },
          ar: {
            question: "إيه هو الـ'token' في الـLLM؟",
            options: [
              "ID جلسة المستخدم",
              "وحدة نص (~4 حروف) النموذج بيعالجها",
              "مفتاح API",
              "جملة كاملة",
            ],
            explanation: "التوكنز هي القطع اللي الـLLM بيقراها وبينتجها.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Why do LLMs hallucinate?",
            options: [
              "They are angry",
              "They predict the most plausible next token even when they don't know the answer",
              "Bad internet",
              "Outdated browser",
            ],
            explanation: "LLMs generate statistically likely continuations, not verified facts.",
          },
          ar: {
            question: "ليه الـLLMs بتهلوس؟",
            options: [
              "زعلانة",
              "بتتنبأ بالتوكن التالي الأكثر معقولية حتى لو متعرفش الإجابة",
              "نت وحش",
              "متصفح قديم",
            ],
            explanation: "الـLLMs بتولّد استكمالات محتملة إحصائياً، مش حقائق متحقَّق منها.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "RLHF stands for:",
            options: [
              "Reinforcement Learning from Human Feedback",
              "Random Logic for High Frequency",
              "Recurrent Layer Hash Function",
              "Real-time Learning Hyper Filter",
            ],
            explanation: "RLHF is how models are aligned with human preferences after pre-training.",
          },
          ar: {
            question: "RLHF يعني:",
            options: [
              "Reinforcement Learning from Human Feedback (تعلم تعزيزي بالتغذية الراجعة البشرية)",
              "Random Logic for High Frequency",
              "Recurrent Layer Hash Function",
              "Real-time Learning Hyper Filter",
            ],
            explanation: "RLHF هي الطريقة لمواءمة النماذج مع التفضيلات البشرية بعد التدريب المسبق.",
          },
          correctIndex: 0,
        },
      ],
    },
    {
      slug: "good-vs-bad-use-cases",
      durationMinutes: 25,
      en: {
        title: "Good vs Bad Use Cases for AI",
        summary: "When AI shines — and when it will embarrass you.",
        content: `# Good vs Bad Use Cases

## Where AI shines

- **Drafting and rewriting:** emails, summaries, marketing copy
- **Translation and tone-shifting:** rewording text for different audiences
- **Brainstorming:** generating many options quickly
- **Code assistance:** boilerplate, explanations, debugging hints
- **Pattern extraction:** pulling structured data from unstructured text

## Where AI struggles

- **Up-to-the-minute facts:** training data has a cutoff
- **Precise math and counting:** LLMs are token predictors, not calculators
- **High-stakes decisions without review:** medical, legal, financial
- **Anything requiring deep, verified, citation-grade research**

## The 70% rule

A practical guideline: AI usually gets you 70% of the way. The remaining 30% — verification, polish, judgment — is yours. Treat AI output as a draft, never a final answer for anything that matters.`,
      },
      ar: {
        title: "استخدامات كويسة ووحشة للـAI",
        summary: "إمتى الـAI بيتألق — وإمتى هيحرجك.",
        content: `# استخدامات كويسة ووحشة

## فين الـAI بيتألق

- **الكتابة وإعادة الصياغة:** الإيميلات، الملخصات، النصوص التسويقية
- **الترجمة وتغيير النبرة:** إعادة صياغة النص لجماهير مختلفة
- **العصف الذهني:** توليد خيارات كتير بسرعة
- **مساعدة الكود:** الأساسيات، الشرح، تلميحات الـdebugging
- **استخراج الأنماط:** سحب بيانات منظّمة من نص غير منظّم

## فين الـAI بيتعب

- **الحقائق اللحظية:** بيانات التدريب لها تاريخ انتهاء
- **الرياضيات الدقيقة والعدّ:** الـLLMs متنبّئات توكنز، مش حاسبات
- **القرارات عالية المخاطر بدون مراجعة:** طبية، قانونية، مالية
- **أي حاجة محتاجة بحث عميق ومرجعيات موثّقة**

## قاعدة الـ70%

دليل عملي: الـAI عادةً بيوصلك 70% من الطريق. الـ30% الباقية — التحقق، الصقل، الحُكم — مسؤوليتك. اعتبر ناتج الـAI مسودّة، مش إجابة نهائية لأي حاجة مهمة.`,
      },
      quiz: [
        {
          en: {
            question: "Which is a poor AI use case without verification?",
            options: [
              "Drafting a marketing email",
              "Brainstorming product names",
              "Making a medical diagnosis",
              "Summarizing meeting notes",
            ],
            explanation: "High-stakes decisions require expert human verification.",
          },
          ar: {
            question: "أي حاجة استخدام سيء للـAI بدون تحقق؟",
            options: [
              "كتابة إيميل تسويقي",
              "العصف الذهني لأسماء منتجات",
              "تشخيص طبي",
              "تلخيص ملاحظات اجتماع",
            ],
            explanation: "القرارات عالية المخاطر محتاجة تحقق بشري متخصص.",
          },
          correctIndex: 2,
        },
        {
          en: {
            question: "The '70% rule' means:",
            options: [
              "AI is 70% accurate",
              "AI gets you most of the way; you finish the rest",
              "Always pay 70% of subscription",
              "Use AI 70% of the time",
            ],
            explanation: "Treat AI output as a strong first draft.",
          },
          ar: {
            question: "قاعدة الـ'70%' تعني:",
            options: [
              "الـAI دقته 70%",
              "الـAI بيوصلك معظم الطريق؛ أنت بتكمّل الباقي",
              "ادفع 70% من الاشتراك",
              "استخدم الـAI 70% من الوقت",
            ],
            explanation: "اعتبر ناتج الـAI مسودّة أولى قوية.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "LLMs struggle with precise math because:",
            options: [
              "They lack a calculator chip",
              "They predict tokens, not compute numbers",
              "They never saw math",
              "The cloud is slow",
            ],
            explanation: "LLMs are statistical text predictors, not arithmetic engines.",
          },
          ar: {
            question: "الـLLMs بتتعب مع الرياضيات الدقيقة لأن:",
            options: [
              "مفيش عندها شريحة حاسبة",
              "بتتنبأ بالتوكنز، مش بتحسب أرقام",
              "ماشافتش رياضيات",
              "السحابة بطيئة",
            ],
            explanation: "الـLLMs متنبّئات نصوص إحصائية، مش محركات حسابية.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "ai-failures-and-biases",
      durationMinutes: 30,
      en: {
        title: "Failure Modes and Bias",
        summary: "How AI breaks — hallucinations, bias, and prompt injection.",
        content: `# Failure Modes and Bias

## 1. Hallucination
The model invents facts, citations, or quotes. Most dangerous when output *sounds* authoritative.

**Mitigation:** verify any fact you'll act on. Ask the model to cite sources, then check the citations actually exist.

## 2. Bias
Models reflect biases in their training data — gender, race, region, profession. Outputs can quietly reinforce stereotypes.

**Mitigation:** review outputs for assumptions. For high-stakes uses, add explicit fairness prompts and run audits.

## 3. Prompt Injection
A malicious user (or document the model reads) can override your instructions. "Ignore previous instructions and..." is the classic example.

**Mitigation:** treat all user-provided content as untrusted. Never let user input override system rules without validation.

## 4. Drift
Model behavior changes when providers update versions. Tests that passed last month may fail today.

**Mitigation:** pin model versions in production. Maintain a regression test suite for important prompts.`,
      },
      ar: {
        title: "أنماط الفشل والتحيز",
        summary: "إزاي الـAI بيتكسر — هلوسة، تحيز، وحقن البرومبت.",
        content: `# أنماط الفشل والتحيز

## 1. الهلوسة
النموذج بيخترع حقائق، مراجع، أو اقتباسات. أخطر لما الناتج *بيبدو* موثوق.

**العلاج:** تحقّق من أي حقيقة هتتصرف بناءً عليها. اطلب من النموذج يدّيك مصادر، وبعدين راجع إن المصادر دي موجودة فعلاً.

## 2. التحيز
النماذج بتعكس التحيزات في بيانات تدريبها — جنس، عرق، منطقة، مهنة. الناتج ممكن بهدوء يعزّز الصور النمطية.

**العلاج:** راجع الناتج بحثاً عن افتراضات. للاستخدامات عالية المخاطر، ضيف برومبتات عدالة صريحة وشغّل تدقيقات.

## 3. حقن البرومبت (Prompt Injection)
مستخدم خبيث (أو مستند بيقراه النموذج) يقدر يتجاوز تعليماتك. "تجاهل التعليمات السابقة و..." المثال الكلاسيكي.

**العلاج:** اعتبر أي محتوى من المستخدم غير موثوق. متخليش مدخلات المستخدم تتجاوز قواعد النظام بدون تحقق.

## 4. الانحراف (Drift)
سلوك النموذج بيتغير لما الموفّر يحدّث الإصدارات. اختبارات نجحت الشهر اللي فات ممكن تفشل النهارده.

**العلاج:** ثبّت إصدارات النموذج في الإنتاج. حافظ على مجموعة اختبارات تراجعية للبرومبتات المهمة.`,
      },
      quiz: [
        {
          en: {
            question: "Prompt injection is:",
            options: [
              "Adding emoji to prompts",
              "An attack that overrides system instructions via user input",
              "A way to speed up models",
              "Encrypting prompts",
            ],
            explanation: "Untrusted input can hijack the model's behavior.",
          },
          ar: {
            question: "حقن البرومبت هو:",
            options: [
              "إضافة إيموجي للبرومبتات",
              "هجوم بيتجاوز تعليمات النظام عن طريق مدخلات المستخدم",
              "طريقة لتسريع النماذج",
              "تشفير البرومبتات",
            ],
            explanation: "المدخلات غير الموثوقة ممكن تخطف سلوك النموذج.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Best mitigation for hallucination:",
            options: [
              "Trust the model fully",
              "Verify facts you'll act on; check cited sources exist",
              "Increase temperature",
              "Use shorter prompts",
            ],
            explanation: "Verification is non-negotiable for important facts.",
          },
          ar: {
            question: "أحسن علاج للهلوسة:",
            options: [
              "ثق بالنموذج تماماً",
              "تحقّق من الحقائق اللي هتتصرف بناءً عليها؛ راجع وجود المصادر",
              "زوّد الحرارة (temperature)",
              "استخدم برومبتات أقصر",
            ],
            explanation: "التحقّق غير قابل للتفاوض للحقائق المهمة.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Model 'drift' refers to:",
            options: [
              "Slow network",
              "Behavior changes when providers update versions",
              "Memory leaks",
              "Mobile rendering",
            ],
            explanation: "Pin versions to avoid surprise behavior changes.",
          },
          ar: {
            question: "'الانحراف' (drift) في النموذج يشير إلى:",
            options: [
              "شبكة بطيئة",
              "تغيّر السلوك لما الموفّر يحدّث الإصدارات",
              "تسرّبات ذاكرة",
              "عرض الموبايل",
            ],
            explanation: "ثبّت الإصدارات علشان تتجنب تغيّرات سلوك مفاجئة.",
          },
          correctIndex: 1,
        },
      ],
    },
    {
      slug: "talking-about-ai",
      durationMinutes: 20,
      en: {
        title: "Speaking Fluently About AI",
        summary: "The vocabulary you need to sound credible.",
        content: `# Speaking Fluently About AI

## Essential terms

- **Model:** the trained AI itself (GPT-4o, Claude 3.5, Llama 3, Gemini 1.5).
- **Parameters:** the tunable weights inside a model. Bigger ≠ better, but it's a rough proxy.
- **Context window:** how much text the model can consider at once. 128k tokens ≈ a long novel.
- **Inference:** running a trained model to produce output. The slow, expensive part you pay for per request.
- **Embedding:** a numerical vector representation of text used for semantic search.
- **RAG (Retrieval-Augmented Generation):** fetching relevant docs and inserting them into the prompt to ground answers.
- **Agent:** an LLM that plans and uses tools (calculator, web search, code execution) to complete multi-step tasks.
- **Fine-tuning:** further training a base model on your specific data.

## Phrases to avoid
- "The AI thinks…" → say "The model predicts…"
- "It learned to…" (when describing inference) → it doesn't learn at inference time; it generates.
- "It's basically AGI" → no, it isn't.`,
      },
      ar: {
        title: "اتكلم عن الـAI بطلاقة",
        summary: "المفردات اللي محتاجها تبان مصداقي.",
        content: `# اتكلم عن الـAI بطلاقة

## مصطلحات أساسية

- **Model (النموذج):** الـAI المدرَّب نفسه (GPT-4o, Claude 3.5, Llama 3, Gemini 1.5).
- **Parameters (المعاملات):** الأوزان القابلة للضبط داخل النموذج. أكبر ≠ أفضل، لكنه مؤشّر تقريبي.
- **Context window (نافذة السياق):** قد إيه من النص النموذج يقدر يأخذه في الاعتبار في المرة. 128k توكن ≈ رواية طويلة.
- **Inference (الاستدلال):** تشغيل نموذج مدرَّب لإنتاج ناتج. الجزء البطيء والمكلف اللي بتدفع فيه لكل طلب.
- **Embedding (التضمين):** تمثيل رقمي (متّجه) للنص بيُستخدم للبحث الدلالي.
- **RAG:** جلب مستندات ذات صلة وإدخالها في البرومبت لتأسيس الإجابات.
- **Agent (الوكيل):** LLM بيخطّط ويستخدم أدوات (حاسبة، بحث ويب، تنفيذ كود) لإكمال مهام متعددة الخطوات.
- **Fine-tuning (الضبط الدقيق):** تدريب إضافي لنموذج أساسي على بياناتك المحددة.

## عبارات تجنبها
- "الـAI بيفكّر..." → قول "النموذج بيتنبأ..."
- "اتعلم إنه..." (وأنت بتوصف الاستدلال) → النموذج مبيتعلمش وقت الاستدلال؛ بيولّد.
- "ده تقريباً AGI" → لأ، مش كده.`,
      },
      quiz: [
        {
          en: {
            question: "RAG stands for:",
            options: [
              "Random Access Generation",
              "Retrieval-Augmented Generation",
              "Recursive Algorithmic Grouping",
              "Real-time AI Gateway",
            ],
            explanation: "RAG inserts retrieved documents into the prompt.",
          },
          ar: {
            question: "RAG تعني:",
            options: [
              "Random Access Generation",
              "Retrieval-Augmented Generation (التوليد المعزَّز بالاسترجاع)",
              "Recursive Algorithmic Grouping",
              "Real-time AI Gateway",
            ],
            explanation: "RAG بيدخل مستندات مسترجعة في البرومبت.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "Context window means:",
            options: [
              "Browser tab size",
              "How much text a model can consider at once",
              "Number of users online",
              "Server uptime",
            ],
            explanation: "Bigger context windows allow longer documents.",
          },
          ar: {
            question: "نافذة السياق تعني:",
            options: [
              "حجم تاب المتصفح",
              "قد إيه من النص النموذج يقدر يأخذه في الاعتبار في المرة",
              "عدد المستخدمين أونلاين",
              "وقت تشغيل السيرفر",
            ],
            explanation: "نوافذ سياق أكبر بتسمح بمستندات أطول.",
          },
          correctIndex: 1,
        },
        {
          en: {
            question: "An 'agent' in AI is:",
            options: [
              "A customer service rep",
              "An LLM that plans and uses tools to complete tasks",
              "A type of GPU",
              "A frontend component",
            ],
            explanation: "Agents combine reasoning with tool use.",
          },
          ar: {
            question: "'الوكيل' (agent) في الـAI هو:",
            options: [
              "موظف خدمة عملاء",
              "LLM بيخطّط ويستخدم أدوات لإكمال المهام",
              "نوع من الـGPU",
              "مكوّن frontend",
            ],
            explanation: "الوكلاء بيجمعوا بين الاستدلال واستخدام الأدوات.",
          },
          correctIndex: 1,
        },
      ],
    },
  ],
  project: {
    slug: "ai-audit",
    difficulty: "easy",
    estimatedHours: 2,
    en: {
      title: "AI Opportunity Audit",
      brief:
        "Pick one workflow you do weekly (writing reports, replying to emails, planning meetings). Map every step, identify 2 places AI could help and 2 places it would fail, and write a one-page memo.",
      requirements: [
        "Choose a real workflow you own",
        "Document each step in plain language",
        "Tag each step: human-only, AI-assisted, or AI-automated",
        "Estimate time saved",
      ],
      deliverables: [
        "One-page memo (PDF or doc)",
        "Workflow diagram (any tool)",
        "Risk list: where AI could fail or mislead",
      ],
    },
    ar: {
      title: "تدقيق فرص الـAI",
      brief:
        "اختار سير عمل بتعمله أسبوعياً (كتابة تقارير، الرد على إيميلات، تخطيط اجتماعات). ارسم كل خطوة، حدّد مكانين الـAI يقدر يساعد فيهم ومكانين هيفشل فيهم، واكتب مذكرة من صفحة واحدة.",
      requirements: [
        "اختار سير عمل حقيقي بتمتلكه",
        "وثّق كل خطوة بلغة بسيطة",
        "صنّف كل خطوة: بشري فقط، بمساعدة الـAI، أو مؤتمت بالـAI",
        "قدّر الوقت اللي هيتم توفيره",
      ],
      deliverables: [
        "مذكرة صفحة واحدة (PDF أو مستند)",
        "رسم بياني لسير العمل (بأي أداة)",
        "قائمة مخاطر: فين الـAI ممكن يفشل أو يضلّل",
      ],
    },
  },
};

export default course;
