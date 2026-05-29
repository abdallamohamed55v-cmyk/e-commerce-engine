import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { DEFAULT_LANG, LANG_CODES } from "@/lib/languages";

// UI strings (chrome, buttons, labels) — course content comes from DB
const resources = {
  en: { translation: {
    nav: { courses: "Courses", browse: "Browse", back: "Back" },
    courses: {
      title: "All courses",
      subtitle: "Hands-on AI courses. Each course is a complete build — from first principles to ship.",
      search: "Search courses",
      featured: "Featured course",
      lessons: "lessons",
      projects: "projects",
      duration: "Duration",
      level: "Level",
      empty: "No courses match your search.",
      countSuffix: "courses",
      startCourse: "Start course",
      continueCourse: "Continue",
    },
    course: {
      overview: "Overview",
      curriculum: "Curriculum",
      projectsTitle: "Hands-on projects",
      outcomes: "What you'll learn",
      prerequisites: "Prerequisites",
      lesson: "Lesson",
      minutes: "min",
      nextLesson: "Next lesson",
      prevLesson: "Previous lesson",
      backToCourse: "Back to course",
    },
    lesson: {
      progress: "Progress",
      quiz: "Quick check",
      submit: "Check answer",
      correct: "Correct!",
      incorrect: "Not quite — review the lesson above.",
      explanation: "Why",
    },
    common: { loading: "Loading…", error: "Something went wrong." },
  }},
  ar: { translation: {
    nav: { courses: "الكورسات", browse: "تصفح", back: "رجوع" },
    courses: {
      title: "كل الكورسات",
      subtitle: "كورسات ذكاء اصطناعي عملية. كل كورس مشروع كامل من الفكرة للتنفيذ.",
      search: "ابحث في الكورسات",
      featured: "الكورس المميز",
      lessons: "درس",
      projects: "مشروع",
      duration: "المدة",
      level: "المستوى",
      empty: "لا يوجد كورسات تطابق بحثك.",
      countSuffix: "كورس",
      startCourse: "ابدأ الكورس",
      continueCourse: "أكمل",
    },
    course: {
      overview: "نظرة عامة",
      curriculum: "المنهج",
      projectsTitle: "مشاريع عملية",
      outcomes: "ماذا ستتعلم",
      prerequisites: "المتطلبات",
      lesson: "درس",
      minutes: "د",
      nextLesson: "الدرس التالي",
      prevLesson: "الدرس السابق",
      backToCourse: "الرجوع للكورس",
    },
    lesson: {
      progress: "التقدم",
      quiz: "اختبار سريع",
      submit: "تحقق",
      correct: "إجابة صحيحة!",
      incorrect: "ليست صحيحة — راجع الدرس بالأعلى.",
      explanation: "السبب",
    },
    common: { loading: "جاري التحميل…", error: "حدث خطأ." },
  }},
  es: { translation: {
    nav: { courses: "Cursos", browse: "Explorar", back: "Volver" },
    courses: { title: "Todos los cursos", subtitle: "Cursos prácticos de IA — proyectos completos.", search: "Buscar cursos", featured: "Curso destacado", lessons: "lecciones", projects: "proyectos", duration: "Duración", level: "Nivel", empty: "Sin resultados.", countSuffix: "cursos", startCourse: "Empezar curso", continueCourse: "Continuar" },
    course: { overview: "Resumen", curriculum: "Plan de estudios", projectsTitle: "Proyectos prácticos", outcomes: "Qué aprenderás", prerequisites: "Requisitos", lesson: "Lección", minutes: "min", nextLesson: "Siguiente", prevLesson: "Anterior", backToCourse: "Volver al curso" },
    lesson: { progress: "Progreso", quiz: "Comprobación rápida", submit: "Comprobar", correct: "¡Correcto!", incorrect: "Casi — repasa la lección.", explanation: "Por qué" },
    common: { loading: "Cargando…", error: "Algo salió mal." },
  }},
  fr: { translation: {
    nav: { courses: "Cours", browse: "Explorer", back: "Retour" },
    courses: { title: "Tous les cours", subtitle: "Cours d'IA pratiques — projets complets.", search: "Rechercher", featured: "Cours en vedette", lessons: "leçons", projects: "projets", duration: "Durée", level: "Niveau", empty: "Aucun résultat.", countSuffix: "cours", startCourse: "Commencer", continueCourse: "Continuer" },
    course: { overview: "Aperçu", curriculum: "Programme", projectsTitle: "Projets pratiques", outcomes: "Ce que vous apprendrez", prerequisites: "Prérequis", lesson: "Leçon", minutes: "min", nextLesson: "Suivant", prevLesson: "Précédent", backToCourse: "Retour au cours" },
    lesson: { progress: "Progression", quiz: "Vérification rapide", submit: "Vérifier", correct: "Correct !", incorrect: "Presque — revoyez la leçon.", explanation: "Pourquoi" },
    common: { loading: "Chargement…", error: "Une erreur est survenue." },
  }},
  de: { translation: {
    nav: { courses: "Kurse", browse: "Stöbern", back: "Zurück" },
    courses: { title: "Alle Kurse", subtitle: "Praktische KI-Kurse — komplette Projekte.", search: "Kurse suchen", featured: "Empfohlener Kurs", lessons: "Lektionen", projects: "Projekte", duration: "Dauer", level: "Niveau", empty: "Keine Ergebnisse.", countSuffix: "Kurse", startCourse: "Kurs starten", continueCourse: "Weiter" },
    course: { overview: "Überblick", curriculum: "Lehrplan", projectsTitle: "Praxisprojekte", outcomes: "Was du lernst", prerequisites: "Voraussetzungen", lesson: "Lektion", minutes: "Min", nextLesson: "Nächste", prevLesson: "Vorherige", backToCourse: "Zurück zum Kurs" },
    lesson: { progress: "Fortschritt", quiz: "Kurze Prüfung", submit: "Prüfen", correct: "Richtig!", incorrect: "Fast — siehe Lektion oben.", explanation: "Warum" },
    common: { loading: "Lädt…", error: "Etwas ist schiefgelaufen." },
  }},
  pt: { translation: {
    nav: { courses: "Cursos", browse: "Explorar", back: "Voltar" },
    courses: { title: "Todos os cursos", subtitle: "Cursos práticos de IA — projetos completos.", search: "Buscar cursos", featured: "Curso em destaque", lessons: "aulas", projects: "projetos", duration: "Duração", level: "Nível", empty: "Sem resultados.", countSuffix: "cursos", startCourse: "Começar curso", continueCourse: "Continuar" },
    course: { overview: "Visão geral", curriculum: "Currículo", projectsTitle: "Projetos práticos", outcomes: "O que você aprenderá", prerequisites: "Pré-requisitos", lesson: "Aula", minutes: "min", nextLesson: "Próxima", prevLesson: "Anterior", backToCourse: "Voltar ao curso" },
    lesson: { progress: "Progresso", quiz: "Verificação rápida", submit: "Verificar", correct: "Correto!", incorrect: "Quase — revise a aula.", explanation: "Por quê" },
    common: { loading: "Carregando…", error: "Algo deu errado." },
  }},
  it: { translation: {
    nav: { courses: "Corsi", browse: "Esplora", back: "Indietro" },
    courses: { title: "Tutti i corsi", subtitle: "Corsi pratici di IA — progetti completi.", search: "Cerca corsi", featured: "Corso in evidenza", lessons: "lezioni", projects: "progetti", duration: "Durata", level: "Livello", empty: "Nessun risultato.", countSuffix: "corsi", startCourse: "Inizia il corso", continueCourse: "Continua" },
    course: { overview: "Panoramica", curriculum: "Programma", projectsTitle: "Progetti pratici", outcomes: "Cosa imparerai", prerequisites: "Prerequisiti", lesson: "Lezione", minutes: "min", nextLesson: "Successiva", prevLesson: "Precedente", backToCourse: "Torna al corso" },
    lesson: { progress: "Progresso", quiz: "Verifica rapida", submit: "Verifica", correct: "Corretto!", incorrect: "Quasi — rivedi la lezione.", explanation: "Perché" },
    common: { loading: "Caricamento…", error: "Qualcosa è andato storto." },
  }},
  ru: { translation: {
    nav: { courses: "Курсы", browse: "Обзор", back: "Назад" },
    courses: { title: "Все курсы", subtitle: "Практические курсы по ИИ — законченные проекты.", search: "Поиск курсов", featured: "Рекомендуемый курс", lessons: "уроков", projects: "проектов", duration: "Длительность", level: "Уровень", empty: "Ничего не найдено.", countSuffix: "курсов", startCourse: "Начать курс", continueCourse: "Продолжить" },
    course: { overview: "Обзор", curriculum: "Программа", projectsTitle: "Практические проекты", outcomes: "Чему вы научитесь", prerequisites: "Требования", lesson: "Урок", minutes: "мин", nextLesson: "Следующий", prevLesson: "Предыдущий", backToCourse: "К курсу" },
    lesson: { progress: "Прогресс", quiz: "Быстрая проверка", submit: "Проверить", correct: "Верно!", incorrect: "Почти — повторите урок.", explanation: "Почему" },
    common: { loading: "Загрузка…", error: "Что-то пошло не так." },
  }},
  zh: { translation: {
    nav: { courses: "课程", browse: "浏览", back: "返回" },
    courses: { title: "全部课程", subtitle: "实用 AI 课程 — 每门都是完整项目。", search: "搜索课程", featured: "精选课程", lessons: "课时", projects: "项目", duration: "时长", level: "难度", empty: "没有匹配的课程。", countSuffix: "门课程", startCourse: "开始课程", continueCourse: "继续" },
    course: { overview: "概览", curriculum: "课程大纲", projectsTitle: "实战项目", outcomes: "你将学到", prerequisites: "前置条件", lesson: "课时", minutes: "分钟", nextLesson: "下一课", prevLesson: "上一课", backToCourse: "返回课程" },
    lesson: { progress: "进度", quiz: "快速测验", submit: "提交", correct: "回答正确！", incorrect: "再看一下上面的课程。", explanation: "解释" },
    common: { loading: "加载中…", error: "出了点问题。" },
  }},
  ja: { translation: {
    nav: { courses: "コース", browse: "見る", back: "戻る" },
    courses: { title: "すべてのコース", subtitle: "実践的なAIコース — 各コースが完成プロジェクト。", search: "コースを検索", featured: "注目のコース", lessons: "レッスン", projects: "プロジェクト", duration: "時間", level: "レベル", empty: "該当するコースがありません。", countSuffix: "コース", startCourse: "コースを始める", continueCourse: "続ける" },
    course: { overview: "概要", curriculum: "カリキュラム", projectsTitle: "実践プロジェクト", outcomes: "学べること", prerequisites: "前提条件", lesson: "レッスン", minutes: "分", nextLesson: "次へ", prevLesson: "前へ", backToCourse: "コースへ戻る" },
    lesson: { progress: "進捗", quiz: "クイック確認", submit: "確認", correct: "正解！", incorrect: "もう一度レッスンを確認しましょう。", explanation: "解説" },
    common: { loading: "読み込み中…", error: "エラーが発生しました。" },
  }},
  hi: { translation: {
    nav: { courses: "कोर्स", browse: "ब्राउज़", back: "वापस" },
    courses: { title: "सभी कोर्स", subtitle: "व्यावहारिक AI कोर्स — हर कोर्स एक पूरा प्रोजेक्ट।", search: "कोर्स खोजें", featured: "विशेष कोर्स", lessons: "पाठ", projects: "प्रोजेक्ट्स", duration: "अवधि", level: "स्तर", empty: "कोई मिलते-जुलते कोर्स नहीं।", countSuffix: "कोर्स", startCourse: "कोर्स शुरू करें", continueCourse: "जारी रखें" },
    course: { overview: "अवलोकन", curriculum: "पाठ्यक्रम", projectsTitle: "प्रैक्टिकल प्रोजेक्ट", outcomes: "आप क्या सीखेंगे", prerequisites: "पूर्व-आवश्यकताएँ", lesson: "पाठ", minutes: "मि", nextLesson: "अगला", prevLesson: "पिछला", backToCourse: "कोर्स पर वापस" },
    lesson: { progress: "प्रगति", quiz: "क्विक चेक", submit: "जाँचें", correct: "सही!", incorrect: "ऊपर का पाठ फिर से देखें।", explanation: "क्यों" },
    common: { loading: "लोड हो रहा है…", error: "कुछ गलत हुआ।" },
  }},
  tr: { translation: {
    nav: { courses: "Kurslar", browse: "Keşfet", back: "Geri" },
    courses: { title: "Tüm kurslar", subtitle: "Uygulamalı YZ kursları — her kurs tam bir proje.", search: "Kurs ara", featured: "Öne çıkan kurs", lessons: "ders", projects: "proje", duration: "Süre", level: "Seviye", empty: "Sonuç bulunamadı.", countSuffix: "kurs", startCourse: "Kursa başla", continueCourse: "Devam et" },
    course: { overview: "Genel bakış", curriculum: "Müfredat", projectsTitle: "Uygulamalı projeler", outcomes: "Neler öğreneceksin", prerequisites: "Ön koşullar", lesson: "Ders", minutes: "dk", nextLesson: "Sonraki", prevLesson: "Önceki", backToCourse: "Kursa dön" },
    lesson: { progress: "İlerleme", quiz: "Hızlı kontrol", submit: "Kontrol et", correct: "Doğru!", incorrect: "Az kaldı — dersi tekrar gözden geçir.", explanation: "Neden" },
    common: { loading: "Yükleniyor…", error: "Bir şeyler ters gitti." },
  }},
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: LANG_CODES,
    interpolation: { escapeValue: false },
    detection: { order: ["path", "navigator"], caches: [] },
  });

export default i18n;
