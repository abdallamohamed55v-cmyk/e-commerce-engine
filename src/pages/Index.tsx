import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

const MARQUEE_LOGOS = ["Vortex", "Nimbus", "Prysma", "Cirrus", "Kynder", "Halcyn"];

export default function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Custom fade-in / fade-out loop driven by requestAnimationFrame
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    const FADE = 0.5; // seconds

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
              Power<span className="opacity-70">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "Features", chev: true, to: "/courses" },
              { label: "Solutions", chev: false, to: "/courses" },
              { label: "Plans", chev: false, to: "/pricing" },
              { label: "Learning", chev: true, to: "/courses" },
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
              Sign Up
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
                fontSize: "clamp(80px, 16vw, 220px)",
                lineHeight: 1.02,
                letterSpacing: "-0.024em",
              }}
            >
              Power{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
                }}
              >
                AI
              </span>
            </h1>

            <p
              className="text-hero-sub text-lg leading-8 max-w-md mt-[9px] opacity-80"
            >
              The most powerful AI courses ever deployed
              <br />
              in talent acquisition
            </p>

            <Link to="/courses" className="mt-[25px] inline-block">
              <Button
                variant="heroSecondary"
                className="rounded-full"
                style={{ padding: "24px 29px" }}
              >
                Schedule a Consult
              </Button>
            </Link>
          </div>
        </section>

        {/* Marquee */}
        <div className="pb-10 px-8">
          <div className="max-w-5xl mx-auto flex items-center gap-12">
            <p className="text-foreground/50 text-sm leading-snug shrink-0">
              Relied on by brands
              <br />
              across the globe
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
    </div>
  );
}
