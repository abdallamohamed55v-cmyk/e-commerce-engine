// 12 supported languages — keep in sync with public.languages table
export const LANGUAGES = [
  { code: "en", name: "English",    native: "English",   dir: "ltr" as const, flag: "🇺🇸" },
  { code: "ar", name: "Arabic",     native: "العربية",   dir: "rtl" as const, flag: "🇸🇦" },
  { code: "es", name: "Spanish",    native: "Español",   dir: "ltr" as const, flag: "🇪🇸" },
  { code: "fr", name: "French",     native: "Français",  dir: "ltr" as const, flag: "🇫🇷" },
  { code: "de", name: "German",     native: "Deutsch",   dir: "ltr" as const, flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", native: "Português", dir: "ltr" as const, flag: "🇵🇹" },
  { code: "it", name: "Italian",    native: "Italiano",  dir: "ltr" as const, flag: "🇮🇹" },
  { code: "ru", name: "Russian",    native: "Русский",   dir: "ltr" as const, flag: "🇷🇺" },
  { code: "zh", name: "Chinese",    native: "中文",       dir: "ltr" as const, flag: "🇨🇳" },
  { code: "ja", name: "Japanese",   native: "日本語",      dir: "ltr" as const, flag: "🇯🇵" },
  { code: "hi", name: "Hindi",      native: "हिन्दी",      dir: "ltr" as const, flag: "🇮🇳" },
  { code: "tr", name: "Turkish",    native: "Türkçe",    dir: "ltr" as const, flag: "🇹🇷" },
] as const;

export type LangCode = typeof LANGUAGES[number]["code"];
export const LANG_CODES = LANGUAGES.map((l) => l.code);
export const DEFAULT_LANG: LangCode = "en";

export function isValidLang(code: string | undefined): code is LangCode {
  return !!code && (LANG_CODES as readonly string[]).includes(code);
}

export function getLangMeta(code: string) {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export function detectBrowserLang(): LangCode {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const c of candidates) {
    const short = c.toLowerCase().split("-")[0];
    if (isValidLang(short)) return short;
  }
  return DEFAULT_LANG;
}
