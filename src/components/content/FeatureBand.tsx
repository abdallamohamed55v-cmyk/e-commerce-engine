import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const stats = [
  { value: "40+", label: "AI Courses" },
  { value: "12k", label: "Students" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "Lifetime", label: "Access" },
];

const FeatureBand = () => {
  return (
    <section className="px-6 pb-24 max-w-6xl mx-auto">
      <div className="relative liquid-glass rounded-[2rem] p-8 md:p-14 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[120px] opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, hsla(265,90%,70%,0.35), transparent 70%)",
          }}
        />

        <div className="relative z-10 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-4">
              Learn from builders
            </p>
            <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight leading-[1.1] mb-5">
              Real AI skills. <br />
              <span className="font-serif-italic text-white/70">Zero fluff.</span>
            </h3>
            <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-md mb-8">
              Every course is taught by practitioners shipping AI in production —
              hands-on projects, real codebases, no theory dumps.
            </p>
            <Link
              to="/about/our-story"
              className="liquid-glass liquid-glass-primary inline-flex items-center gap-2 px-5 h-11 rounded-full text-sm font-medium"
            >
              <span className="relative z-10">Learn more</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="liquid-glass rounded-2xl p-5 text-left"
              >
                <div className="text-2xl md:text-3xl font-light text-white relative z-10">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1 relative z-10">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBand;
