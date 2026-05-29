import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Globe, Check } from "lucide-react";
import { LANGUAGES, isValidLang } from "@/lib/languages";

export default function LanguageSwitcher() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = isValidLang(lang) ? lang : "en";
  const currentMeta = LANGUAGES.find((l) => l.code === current)!;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchTo = (newLang: string) => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length > 0 && isValidLang(segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    navigate("/" + segments.join("/"));
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm text-white/80 transition"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{currentMeta.native}</span>
      </button>
      {open && (
        <div className="absolute end-0 mt-2 w-56 max-h-[70vh] overflow-y-auto rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl py-2 z-50">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => switchTo(l.code)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-white/5 transition ${
                l.code === current ? "text-white" : "text-white/70"
              }`}
              dir={l.dir}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base">{l.flag}</span>
                <span className="font-medium">{l.native}</span>
              </span>
              {l.code === current && <Check className="w-4 h-4 text-emerald-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
