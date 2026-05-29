import { Link } from "react-router-dom";
import SiteShell from "@/components/SiteShell";
import { useLang } from "@/hooks/useLang";

export default function NotFound() {
  const lang = useLang();
  const isAr = lang === "ar";
  return (
    <SiteShell>
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-[10rem] md:text-[12rem] font-light leading-none tracking-tighter bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight mt-2">
            {isAr ? "الصفحة غير موجودة" : "Lost in the void"}
          </h1>
          <p className="text-white/50 mt-3 text-sm">
            {isAr
              ? "الصفحة اللي بتدور عليها مش موجودة."
              : "The page you're looking for doesn't exist."}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
            >
              {isAr ? "الرئيسية" : "Back home"}
            </Link>
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10"
            >
              {isAr ? "تصفّح الكورسات" : "Browse courses"}
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
