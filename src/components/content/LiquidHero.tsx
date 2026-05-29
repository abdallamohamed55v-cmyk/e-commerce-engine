import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LiquidHero = () => {
  return (
    <section className="relative px-6 pt-14 pb-16 text-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[680px] h-[420px] rounded-full blur-[120px] opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, hsla(220,90%,70%,0.25), hsla(280,80%,60%,0.12) 50%, transparent 75%)",
        }}
      />

      <div className="relative">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-6 text-white max-w-3xl mx-auto">
          Master <span className="font-serif-italic text-zinc-400">AI</span> from the inside out
        </h1>
        <p className="max-w-[340px] md:max-w-md mx-auto text-sm md:text-base text-zinc-500 leading-relaxed mb-10">
          Hand-picked courses on ChatGPT, prompt engineering, AI agents, and building with LLMs — taught by practitioners shipping in production.
        </p>

        <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
          <Link
            to="/course"
            className="liquid-glass liquid-glass-primary inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-sm font-medium"
          >
            <span className="relative z-10">Open the course</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
          <a
            href="#trending"
            className="liquid-glass inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-sm font-medium text-white"
          >
            <span className="relative z-10">Browse courses</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LiquidHero;
