import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Play, BookOpen, Users, Award, Zap, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

const MARQUEE_LOGOS = ["OpenAI", "Google", "Microsoft", "Meta", "Anthropic", "NVIDIA"];

const FEATURES = [
  { icon: Zap, titleAr: "محتوى عملي 100%", titleEn: "100% Hands-on", descAr: "كل كورس عبارة عن مشروع كامل من الصفر للإنتاج", descEn: "Every course is a full project from zero to production" },
  { icon: Users, titleAr: "مدربون خبراء", titleEn: "Expert Instructors", descAr: "تعلم من مهندسين و باحثين في مجال الذكاء الاصطناعي", descEn: "Learn from engineers and AI researchers" },
  { icon: Award, titleAr: "شهادات معتمدة", titleEn: "Certified", descAr: "احصل على شهادة إتمام معترف بها عند إنجاز كل كورس", descEn: "Earn a recognized certificate on completion" },
  { icon: BookOpen, titleAr: "محتوى متجدد", titleEn: "Always Updated", descAr: "مكتبة الكورسات تتحدّث باستمرار مع أحدث التقنيات", descEn: "Library stays current with the latest tech" },
];

const STATS = [
  { value: "50+", labelAr: "كورس متخصص", labelEn: "Specialized Courses" },
  { value: "12K+", labelAr: "متعلم نشط", labelEn: "Active Learners" },
  { value: "4.9", labelAr: "متوسط التقييم", labelEn: "Average Rating" },
  { value: "98%", labelAr: "نسبة الرضا", labelEn: "Satisfaction Rate" },
];

export default function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lang = useLang();
  const isAr = lang === "ar";

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    const FADE = 0.5;

    const tick = () => {
      if (!v.duration || isNaN(v.duration)) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = v.currentTime;
      const d = v.duration;
      let o = 1;
      if (t < FADE) o = t / FADE;
      else if (t > d - FADE) o = Math.max(0, (d - t) / FADE);
      v.style.opacity = String(Math.min(1, Math.max(0, o)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
      }, 100);
    };
    v.addEventListener("ended", onEnded);
    v.play().catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0 }}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
      />

      {/* Content layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="w-full py-5 px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl text-foreground tracking-tight">
              sh<span className="text-purple-400">r</span>o
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: isAr ? "الكورسات" : "Courses", chev: true, to: "/courses" },
              { label: isAr ? "الأسعار" : "Pricing", chev: false, to: "/pricing" },
              { label: isAr ? "حول" : "About", chev: false, to: "/courses" },
              { label: isAr ? "المدونة" : "Blog", chev: true, to: "/courses" },
            ].map((it) => (
              <Link
                key={it.label}
                to={it.to}
                className="inline-flex items-center gap-1 text-sm text-foreground/90 hover:text-foreground transition-colors"
              >
                {it.label}
                {it.chev && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </Link>
            ))}
          </nav>

          <Link to="/auth">
            <Button variant="heroSecondary" className="rounded-full px-4 py-2">
              {isAr ? "سجّل الآن" : "Sign Up"}
            </Button>
          </Link>
        </header>

        {/* Divider */}
        <div className="mt-[3px] h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        {/* Hero center */}
        <section className="flex-1 relative overflow-visible flex items-center justify-center">
          {/* Blurred shape */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] opacity-90 bg-gray-950"
            style={{ filter: "blur(82px)" }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <h1
              className="font-display font-normal text-foreground"
              style={{
                fontSize: "clamp(60px, 14vw, 180px)",
                lineHeight: 1.02,
                letterSpacing: "-0.024em",
              }}
            >
              {isAr ? "أطلق" : "Launch"}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
                }}
              >
                {isAr ? "مستقبلك" : "Your AI"}
              </span>
            </h1>

            <p className="text-hero-sub text-lg leading-8 max-w-lg mt-[9px] opacity-80">
              {isAr
                ? "تعلّم الذكاء الاصطناعي بشكل عملي. من الأساسيات لبناء منتجات حقيقية."
                : "Learn AI the practical way. From fundamentals to building real products."}
            </p>

            <div className="flex items-center gap-4 mt-[25px]">
              <Link to="/courses" className="inline-block">
                <Button
                  variant="heroSecondary"
                  className="rounded-full"
                  style={{ padding: "24px 29px" }}
                >
                  {isAr ? "تصفّح الكورسات" : "Browse Courses"}
                </Button>
              </Link>
              <Link to="/courses" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                <span className="text-sm">{isAr ? "شاهد عرضًا" : "Watch Demo"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="pb-10 px-8">
          <div className="max-w-5xl mx-auto flex items-center gap-12">
            <p className="text-foreground/50 text-sm leading-snug shrink-0">
              {isAr ? "تقنيات نغطيها" : "Technologies we cover"}
            </p>
            <div className="relative flex-1 overflow-hidden">
              <div
                className="flex gap-16 w-max animate-marquee"
                style={{ willChange: "transform" }}
              >
                {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((name, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                    <div className="liquid-glass w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-semibold text-foreground">
                      {name[0]}
                    </div>
                    <span className="text-base font-semibold text-foreground">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="relative z-10 border-t border-white/10 bg-background">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(to left, #6366f1, #a855f7)" }}>
                  {s.value}
                </div>
                <p className="text-hero-sub text-sm mt-2">{isAr ? s.labelAr : s.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 border-t border-white/10 bg-background">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              {isAr ? "لماذا تختار شرو؟" : "Why shro?"}
            </h2>
            <p className="text-hero-sub mt-3 max-w-md mx-auto">
              {isAr
                ? "كل شيء مصمّم ليوصلك للنتيجة بأسرع وقت"
                : "Everything is designed to get you results fast"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="liquid-glass rounded-2xl p-6 hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="text-foreground font-semibold mb-2">
                  {isAr ? f.titleAr : f.titleEn}
                </h3>
                <p className="text-hero-sub text-sm leading-relaxed">
                  {isAr ? f.descAr : f.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses CTA */}
      <section className="relative z-10 border-t border-white/10 bg-background">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                {isAr ? "ابدأ رحلتك في الذكاء الاصطناعي" : "Start your AI journey"}
              </h2>
              <p className="text-hero-sub mt-4 leading-relaxed">
                {isAr
                  ? "سواء كنت مبتدئًا أو محترفًا، عندنا كورس يرفع مستواك. تعلّم ChatGPT، بناء الـAgents، التعلم العميق، وأكثر."
                  : "Whether you're a beginner or a pro, we have a course to level you up. Learn ChatGPT, building Agents, Deep Learning, and more."}
              </p>
              <div className="flex items-center gap-4 mt-8">
                <Link to="/courses">
                  <Button variant="heroSecondary" className="rounded-full px-6 py-5">
                    {isAr ? "اكتشف الكورسات" : "Explore Courses"}
                    <ArrowRight className={`w-4 h-4 ${isAr ? "mr-2 rotate-180" : "ml-2"}`} />
                  </Button>
                </Link>
                <Link to="/pricing" className="text-foreground/70 hover:text-foreground text-sm transition-colors">
                  {isAr ? "اطّلع على الأسعار" : "View Pricing"}
                </Link>
              </div>
            </div>
            <div className="relative w-full md:w-80 lg:w-96">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="flex justify-center gap-1 mb-3">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm">
                    {isAr ? "" : ""}
                  </p>
                  <p className="text-hero-sub text-xs mt-1">
                    {isAr ? "12,000+ متعلم يثقون بنا" : "12,000+ learners trust us"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-background">
        <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg text-foreground">
              sh<span className="text-purple-400">r</span>o
            </span>
          </div>
          <p className="text-hero-sub text-sm">
            {isAr ? "© 2025 شرو. جميع الحقوق محفوظة." : "© 2025 shro. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/courses" className="text-hero-sub text-sm hover:text-foreground transition-colors">
              {isAr ? "الكورسات" : "Courses"}
            </Link>
            <Link to="/pricing" className="text-hero-sub text-sm hover:text-foreground transition-colors">
              {isAr ? "الأسعار" : "Pricing"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

