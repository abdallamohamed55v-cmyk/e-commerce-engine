import { Link, NavLink, useLocation } from "react-router-dom";
import { ReactNode, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLang, setLang } from "@/hooks/useLang";


interface Props {
  children: ReactNode;
  /** Removes the top padding so a page can render its own full-bleed hero. */
  bare?: boolean;
}

export default function SiteShell({ children, bare = false }: Props) {
  const lang = useLang();
  const isAr = lang === "ar";
  const { user, signOut } = useAuth();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/courses", label: isAr ? "الكورسات" : "Courses" },
    { to: "/pricing", label: isAr ? "الأسعار" : "Pricing" },
    { to: "/about", label: isAr ? "عن المنصة" : "About" },
    { to: "/contact", label: isAr ? "تواصل" : "Contact" },
  ];

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-black text-white font-geist flex flex-col"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Shro<span className="text-blue-400">.AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            {nav.map((n) => {
              const active =
                n.to === loc.pathname ||
                (n.to.startsWith("/#") && loc.pathname === "/");
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-3.5 py-1.5 rounded-full text-sm transition ${
                    active && n.to === loc.pathname
                      ? "bg-white text-black"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setLang(isAr ? "en" : "ar")}
              className="text-xs text-white/60 hover:text-white px-2 py-1"
            >
              {isAr ? "EN" : "ع"}
            </button>
            {user ? (
              <>
                <Link
                  to="/account"
                  className="px-3 py-1.5 text-sm text-white/80 hover:text-white"
                >
                  {isAr ? "حسابي" : "Account"}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-white hover:bg-white/15"
                >
                  {isAr ? "خروج" : "Sign out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="px-3 py-1.5 text-sm text-white/80 hover:text-white"
                >
                  {isAr ? "دخول" : "Sign in"}
                </Link>
                <Link
                  to="/pricing"
                  className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90"
                >
                  {isAr ? "اشترك" : "Join"}
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase"
            aria-label="Menu"
          >
            {open ? (isAr ? "إغلاق" : "Close") : (isAr ? "قائمة" : "Menu")}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/5 bg-black">
            <div className="px-6 py-4 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-white/80 hover:text-white"
                >
                  {n.label}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <button
                onClick={() => setLang(isAr ? "en" : "ar")}
                className="py-2 text-sm text-white/60 text-start"
              >
                {isAr ? "English" : "العربية"}
              </button>
              {user ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setOpen(false)}
                    className="py-2 text-sm text-white/80"
                  >
                    {isAr ? "حسابي" : "Account"}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="py-2 text-sm text-start text-white/80"
                  >
                    {isAr ? "تسجيل خروج" : "Sign out"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="py-2 text-sm"
                  >
                    {isAr ? "تسجيل دخول" : "Sign in"}
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex px-4 py-2 rounded-full bg-white text-black text-sm font-medium w-fit"
                  >
                    {isAr ? "اشترك الآن" : "Join now"}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className={`flex-1 ${bare ? "" : ""}`}>{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="text-lg font-semibold tracking-tight">
              Shro<span className="text-blue-400">.AI</span>
            </Link>
            <p className="mt-3 text-sm text-white/50 max-w-sm leading-relaxed">
              {isAr
                ? "اشتراك واحد. كل الكورسات. ذكاء اصطناعي، برمجة، علم نفس، أعمال."
                : "One membership. Every course. AI, programming, psychology, business."}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
              {isAr ? "تصفّح" : "Explore"}
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/courses" className="hover:text-white">{isAr ? "الكورسات" : "Courses"}</Link></li>
              <li><Link to="/pricing" className="hover:text-white">{isAr ? "الأسعار" : "Pricing"}</Link></li>
              <li><Link to="/account" className="hover:text-white">{isAr ? "حسابي" : "Account"}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
              {isAr ? "قانوني" : "Legal"}
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white">{isAr ? "عن المنصة" : "About"}</Link></li>
              <li><Link to="/contact" className="hover:text-white">{isAr ? "تواصل" : "Contact"}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Shro.AI — {isAr ? "كل الحقوق محفوظة" : "All rights reserved"}</p>
            <p>{isAr ? "صُمم للمتعلمين الجادين" : "Built for serious learners"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
