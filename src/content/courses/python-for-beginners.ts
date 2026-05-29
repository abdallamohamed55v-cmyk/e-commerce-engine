import type { Course } from "../types";

const course: Course = {
  slug: "python-for-beginners",
  level: "beginner",
  durationMinutes: 360,
  accentColor: "#3776ab",
  coverGradient: "from-blue-500 via-sky-500 to-yellow-400",
  icon: "Terminal",
  category: "programming",
  en: { title: "Python for Beginners", tagline: "The friendliest language to start programming with.", description: "Curated free lessons from freeCodeCamp's full Python tutorials and Programming with Mosh. Syntax, data structures, functions, files, and a first script.", learningOutcomes: ["Read & write Python 3", "Use lists, dicts, sets, tuples", "Work with files & APIs", "Automate small tasks"], prerequisites: ["None"] },
  ar: { title: "بايثون للمبتدئين", tagline: "أسهل لغة تبدأ بيها البرمجة.", description: "دروس مجانية مختارة من freeCodeCamp و Programming with Mosh. الصيغة، هياكل البيانات، الدوال، الملفات، و أول سكريبت.", learningOutcomes: ["اقرأ و اكتب Python 3", "استخدم lists و dicts و sets و tuples", "اتعامل مع الملفات و APIs", "أتمتة مهام صغيرة"], prerequisites: ["لا شيء"] },
  lessons: [
    { slug: "intro", durationMinutes: 40, video: { en: { youtubeId: "rfscVS0vtbw", sourceName: "freeCodeCamp", sourceUrl: "https://www.youtube.com/@freecodecamp" }, ar: { youtubeId: "M3HRq8dPgC8", sourceName: "Codezilla", sourceUrl: "https://www.youtube.com/@codezilla" } },
      en: { title: "Why Python & First Script", summary: "Install, run, hello world.", content: `# Why Python?\n\nClean syntax, huge ecosystem (data, AI, web, automation).\n\n\`\`\`python\nprint("Hello, world!")\nname = input("Your name: ")\nprint(f"Hi {name}!")\n\`\`\`` },
      ar: { title: "ليه Python و أول سكريبت", summary: "تثبيت، تشغيل، hello world.", content: `# ليه Python؟\n\nصيغة نظيفة، نظام بيئي ضخم (data, AI, web, automation).\n\n\`\`\`python\nprint("Hello, world!")\nname = input("اسمك: ")\nprint(f"أهلاً {name}!")\n\`\`\`` },
      quiz: [{ correctIndex: 1, en: { question: "Which function prints to the console?", options: ["echo()", "print()", "console.log()", "puts()"], explanation: "print() in Python." }, ar: { question: "أنهي دالة بتطبع في الـconsole؟", options: ["echo()", "print()", "console.log()", "puts()"], explanation: "print() في Python." } }] },
    { slug: "data-structures", durationMinutes: 50,
      en: { title: "Lists, Dicts, Sets, Tuples", summary: "Python's core collections.", content: `# Collections\n\n\`\`\`python\nfruits = ["apple", "banana"]\nuser = {"name": "Ali", "age": 28}\nunique = {1, 2, 3}\npoint = (3, 4)\n\`\`\`` },
      ar: { title: "Lists و Dicts و Sets و Tuples", summary: "المجموعات الأساسية في Python.", content: `# المجموعات\n\n\`\`\`python\nfruits = ["apple", "banana"]\nuser = {"name": "Ali", "age": 28}\nunique = {1, 2, 3}\npoint = (3, 4)\n\`\`\`` },
      quiz: [{ correctIndex: 2, en: { question: "Which collection has unique values only?", options: ["list", "tuple", "set", "dict"], explanation: "Sets enforce uniqueness." }, ar: { question: "أنهي مجموعة بتقبل قيم فريدة فقط؟", options: ["list", "tuple", "set", "dict"], explanation: "Sets بتفرض التفرّد." } }] },
    { slug: "functions-and-modules", durationMinutes: 40, en: { title: "Functions & Modules", summary: "Organize and reuse code.", content: `# Functions\n\n\`\`\`python\ndef greet(name: str) -> str:\n    return f"Hello, {name}"\n\nimport math\nprint(math.pi)\n\`\`\`` }, ar: { title: "الدوال و الـModules", summary: "نظّم و أعد استخدام الكود.", content: `# الدوال\n\n\`\`\`python\ndef greet(name: str) -> str:\n    return f"Hello, {name}"\n\nimport math\nprint(math.pi)\n\`\`\`` }, quiz: [{ correctIndex: 0, en: { question: "Keyword to define a function?", options: ["def", "function", "fn", "lambda"], explanation: "def in Python." }, ar: { question: "الكلمة المفتاحية لتعريف دالة؟", options: ["def", "function", "fn", "lambda"], explanation: "def في Python." } }] },
    { slug: "files-and-apis", durationMinutes: 45, en: { title: "Files & HTTP Requests", summary: "Read, write, fetch.", content: `# Files & Requests\n\n\`\`\`python\nwith open("notes.txt", "w") as f:\n    f.write("hello")\n\nimport requests\nr = requests.get("https://api.github.com")\nprint(r.json())\n\`\`\`` }, ar: { title: "الملفات و طلبات HTTP", summary: "اقرأ، اكتب، اجلب.", content: `# الملفات و الطلبات\n\n\`\`\`python\nwith open("notes.txt", "w") as f:\n    f.write("hello")\n\nimport requests\nr = requests.get("https://api.github.com")\nprint(r.json())\n\`\`\`` }, quiz: [{ correctIndex: 1, en: { question: "Why use `with open(...)`?", options: ["It's faster", "Automatically closes the file", "Required syntax", "Allows network access"], explanation: "Context manager auto-closes resources." }, ar: { question: "ليه نستخدم `with open(...)`؟", options: ["أسرع", "بيقفل الملف تلقائياً", "صيغة إجبارية", "بيسمح بالشبكة"], explanation: "الـcontext manager بيقفل الموارد تلقائياً." } }] },
  ],
  project: { slug: "weather-cli", difficulty: "easy", estimatedHours: 3, en: { title: "Weather CLI", brief: "Build a command-line weather tool using a free API.", requirements: ["Use requests library", "Accept city as input", "Display temperature & conditions", "Handle errors gracefully"], deliverables: ["GitHub repo with README"] }, ar: { title: "أداة طقس Command-Line", brief: "ابني أداة طقس سطر أوامر باستخدام API مجاني.", requirements: ["استخدم requests", "اقبل المدينة كـinput", "اعرض الحرارة و الحالة", "تعامل مع الأخطاء"], deliverables: ["GitHub repo مع README"] } },
};

export default course;
