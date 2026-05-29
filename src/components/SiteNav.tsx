import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { isValidLang } from "@/lib/languages";

export default function SiteNav() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const lng = isValidLang(lang) ? lang : "en";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-geist">
        <Link to={`/${lng}/courses`} className="text-xl font-semibold tracking-tight text-white">
          Shro<span className="text-blue-400">.AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <Link to={`/${lng}/courses`} className="hover:text-white transition">
            {t("nav.courses")}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
