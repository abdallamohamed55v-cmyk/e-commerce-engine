import { useEffect, type ReactNode } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANG, detectBrowserLang, getLangMeta, isValidLang } from "@/lib/languages";

/** Wraps any /:lang/* route. Validates lang, sets <html lang> and dir, syncs i18n. */
export default function LangLayout({ children }: { children?: ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  if (!isValidLang(lang)) {
    const fallback = detectBrowserLang() || DEFAULT_LANG;
    return <Navigate to={`/${fallback}/courses`} replace />;
  }

  const meta = getLangMeta(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, meta.dir, i18n]);

  return <>{children ?? <Outlet />}</>;
}
