import { useState, useEffect } from "react";

export function useLang(): "en" | "ar" {
  const [lang, setLang] = useState<"en" | "ar">(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem("lang");
    if (stored === "ar" || stored === "en") return stored;
    return navigator.language?.startsWith("ar") ? "ar" : "en";
  });

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  return lang;
}

export function setLang(l: "en" | "ar") {
  localStorage.setItem("lang", l);
  window.location.reload();
}
