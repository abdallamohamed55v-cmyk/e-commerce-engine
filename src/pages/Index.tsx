import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import motivation1 from "@/assets/motivation-1.png";

import motivation2 from "@/assets/motivation-2.png";
import motivationVideo from "@/assets/motivation-video.mp4";


const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    level: "",
    track: "",
    details: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Mobile menu");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Request received! We'll be in touch shortly.");
    setFormData({ name: "", email: "", level: "", track: "", details: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
      style={{
        fontFamily:
          "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Aura background */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-0 w-full h-[1040px] overflow-hidden"
      >
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 h-full overflow-y-auto w-full transition-opacity duration-500">
        <header className="relative">
          <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-4 pl-4">
            <nav className="flex mt-6 items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-geist text-xl font-semibold tracking-tight text-white">Shro<span className="text-blue-400">.AI</span></span>
              </Link>

              <div className="hidden md:flex md:gap-x-2 bg-white/5 border-white/10 border rounded-full pt-1 pr-1 pb-1 pl-1 backdrop-blur-lg gap-x-2 gap-y-1 items-center">
                <a href="#manifesto" className="hover:text-white text-sm font-medium text-white/80 font-geist pt-2 pr-3 pb-2 pl-3">Why us</a>
                <a href="#ecosystem" className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white font-geist">Categories</a>
                <a href="#pricing" className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white font-geist">Membership</a>
                <div className="relative inline-block group text-xs rounded-full">
                  <Link to="/pricing" className="relative z-10 overflow-hidden transition-transform duration-150 ease-out active:scale-[0.98] text-white bg-neutral-900/60 border-white/20 border pt-3 pr-6 pb-3 pl-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] text-xs rounded-full cursor-pointer inline-flex">
                    <span className="relative z-10 inline-flex items-center gap-2 font-medium text-xs rounded-full font-geist">Join Now</span>
                  </Link>

                </div>
              </div>


              <button
                className="md:hidden inline-flex text-sm font-medium font-geist bg-white/5 border-white/10 border rounded-lg pt-2 pr-3 pb-2 pl-3 backdrop-blur gap-x-2 items-center"
                onClick={handleMobileMenu}
              >
                <iconify-icon icon="solar:hamburger-menu-linear" width="20" height="20"></iconify-icon>
                Menu
              </button>
            </nav>
            <section className="z-10 sm:pt-20 md:pt-48 md:pb-24 text-center max-w-5xl mr-auto ml-auto pt-20 pb-32 relative">
              <h1 className="sm:text-6xl md:text-7xl [animation:fadeSlideIn_1s_ease-out_0.2s_forwards] text-4xl tracking-tighter font-geist opacity-0 max-w-5xl mr-auto ml-auto">
                One membership.<br />Every course you'll ever need.
              </h1>
              <p className="sm:text-lg [animation:fadeSlideIn_1s_ease-out_0.3s_both] text-base font-normal text-white/70 font-geist max-w-2xl mt-6 mr-auto ml-auto">
                Unlimited access to every course on the platform — AI, Programming, Psychology, and Business. One subscription, no per-course fees, no limits.
              </p>
              <p className="[animation:fadeSlideIn_1s_ease-out_0.35s_both] mt-4 text-sm text-blue-300/80 font-geist">
                Backed by real billionaires. Built for serious learners.
              </p>
              <div className="flex flex-col sm:flex-row [animation:fadeSlideIn_1s_ease-out_0.4s_both] mt-8 gap-x-3 gap-y-3 items-center justify-center">
                <Link to="/pricing" className="group relative inline-flex min-w-[140px] cursor-pointer transition-all duration-[1000ms] ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:-translate-y-[3px] hover:text-white shadow-[0_2.8px_2.2px_rgba(0,0,0,0.3),_0_6.7px_5.3px_rgba(0,0,0,0.35),_0_12.5px_10px_rgba(0,0,0,0.4)] overflow-hidden font-semibold text-neutral-400 tracking-tight bg-neutral-800 border-neutral-600 border rounded-full pt-[12px] pr-[20px] pb-[12px] pl-[20px] items-center justify-center">

                  <span className="relative z-10 font-medium rounded-full transition-all duration-500 ease-out group-hover:translate-y-8 group-hover:opacity-0 group-hover:blur-md font-geist">Start Membership</span>
                  <span className="absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 ease-in-out transform -translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none font-medium opacity-0 rounded-full blur-md font-geist">Let's go</span>
                </Link>
                <a href="#ecosystem" className="inline-flex items-center gap-2 hover:bg-white/10 text-base font-medium text-white/90 bg-white/5 border-white/10 border rounded-full pt-3 pr-6 pb-3 pl-6 backdrop-blur font-geist">
                  Browse Categories
                </a>
              </div>
            </section>

          </div>
        </header>


        {/* Manifesto */}
        <section id="manifesto" className="relative py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="sm:px-6 lg:px-8 max-w-4xl mr-auto ml-auto pr-6 pl-6 text-center">
            <h2 className="text-xs font-semibold tracking-wider text-blue-500 uppercase font-geist animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both]">Why a membership</h2>
            <h3 className="mt-4 text-3xl sm:text-5xl font-geist tracking-tighter text-white animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
              One price. <br />Every course. Forever.
            </h3>
            <div className="mt-10 relative bg-neutral-900/50 border border-white/10 rounded-2xl p-8 sm:p-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.3s_both]">
              <iconify-icon icon="solar:quote-left-bold" width="32" height="32" class="absolute top-6 left-6 text-white/20"></iconify-icon>
              <p className="relative text-lg sm:text-xl text-white/80 font-geist leading-relaxed">
                Most platforms nickel-and-dime you per course. We don't. Your membership unlocks the entire library — AI, Programming, Psychology, Business — plus every new course we ship. Funded directly by real billionaires who believe knowledge shouldn't be gatekept.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-white/20"></div>
                <span className="text-sm font-medium text-white/50 font-geist">The Shro.AI team</span>
                <div className="h-px w-12 bg-white/20"></div>
              </div>

            </div>
          </div>
        </section>

        {/* Us vs Them */}
        <section className="relative py-24 overflow-hidden">
          <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6">
            <div className="text-center mb-16 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both]">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-geist tracking-tighter">The Shro.AI standard</h2>
              <p className="mt-4 text-white/60 font-geist max-w-2xl mx-auto">Compare what you actually get for one flat membership fee.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">

              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-6 opacity-60 grayscale transition hover:opacity-80 hover:grayscale-0">
                <h3 className="text-xl font-medium text-white/50 font-geist">Other platforms</h3>
                <ul className="space-y-4">
                  {[
                    "Pay per course, again and again",
                    "Locked categories, upsells everywhere",
                    "No new content after you buy",
                    "Random instructors, no real backing",
                  ].map(t => (
                    <li key={t} className="flex items-center gap-3 text-white/50">
                      <iconify-icon icon="solar:close-circle-linear" width="20" height="20" class="text-red-500/50"></iconify-icon>
                      <span className="font-geist">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative p-8 rounded-2xl border border-blue-500/30 bg-blue-900/10 flex flex-col gap-6 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]">
                <div className="absolute -top-3 -right-3">
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 items-center justify-center">
                      <iconify-icon icon="solar:check-circle-linear" width="14" height="14" class="text-white"></iconify-icon>
                    </span>
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white font-geist">Shro.AI Membership</h3>
                <ul className="space-y-4">
                  {[
                    "Every course unlocked — AI, Code, Psychology, Business",
                    "New courses added every month, included",
                    "Backed by real billionaires, not ad budgets",
                    "Cancel anytime — keep your progress",
                  ].map(t => (
                    <li key={t} className="flex items-center gap-3 text-white">
                      <div className="bg-blue-500/20 p-1 rounded-full">
                        <iconify-icon icon="solar:check-circle-linear" width="16" height="16" class="text-blue-400"></iconify-icon>
                      </div>
                      <span className="font-geist font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* Tracks */}
        <section className="z-10 sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pt-8 pr-6 pb-20 pl-6 relative" id="ecosystem">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-geist tracking-tighter animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">Four worlds. One membership.</h2>
              <p className="mt-3 text-base text-white/70 font-geist animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.3s_both]">Switch between categories whenever you want — no extra fees, no locked content.</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "AI", desc: "ChatGPT, prompt engineering, LLMs, agents and everything around modern artificial intelligence." },
              { title: "Programming", desc: "From your first line of Python to full-stack apps, system design and shipping real software." },
              { title: "Psychology", desc: "How the mind works, behavior change, focus, persuasion and the science of better decisions." },
              { title: "Business", desc: "Startups, marketing, sales, finance and the playbooks used by founders who actually built something." },
            ].map((c, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.5s_both] hover:bg-white/[0.07] transition-colors">
                <div className="sm:p-8 pt-6 pr-6 pb-6 pl-6 h-full flex flex-col">
                  <h3 className="text-xl font-medium tracking-tight font-geist text-white">{c.title}</h3>
                  <p className="mt-3 text-sm text-white/70 font-geist leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:col-span-2 lg:col-span-4 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.4s_both] mt-6">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5badae71-a5f7-4201-aee1-3b316e682fb0_1600w.jpg" alt="Featured" className="absolute right-0 top-0 h-full w-2/3 object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" />
              <div className="p-8 sm:p-12 relative z-20 h-full flex flex-col justify-center max-w-xl">
                <h3 className="text-3xl sm:text-4xl font-geist tracking-tighter">Hundreds of courses. Zero extra fees.</h3>
                <p className="mt-4 text-base sm:text-lg text-white/70 font-geist">Pick any course in any category, any time. Your membership covers everything we've ever shipped — and everything we're about to ship.</p>
                <div className="mt-8">
                  <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-black bg-white rounded-lg px-4 py-2 hover:bg-neutral-200 transition font-geist">
                    Browse the library
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Learning path */}
        <section className="py-24 bg-white/[0.02] border-y border-white/5 relative">
          <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6">
            <div className="text-center mb-16 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both]">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-geist tracking-tighter">How the membership works</h2>
              <p className="mt-4 text-white/60 font-geist">Three steps. No friction.</p>
            </div>
            <div className="relative grid md:grid-cols-3 gap-8">
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              {[
                { n: "01", title: "Subscribe", desc: "One plan. Instant access to every course in every category — AI, Code, Psychology, Business.", highlight: false },
                { n: "02", title: "Learn anything", desc: "Jump between categories freely. Watch on any device, download projects, track your progress.", highlight: true },
                { n: "03", title: "Keep growing", desc: "New courses ship every month, automatically included. Cancel whenever — no questions, no penalties.", highlight: false },

              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
                  <div className={`w-16 h-16 rounded-full bg-black border ${s.highlight ? "border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]" : "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"} flex items-center justify-center relative z-10 mb-6`}>
                    <span className={`text-xl font-bold font-geist ${s.highlight ? "text-blue-400" : "text-white"}`}>{s.n}</span>
                  </div>
                  <h3 className="text-xl font-medium text-white font-geist mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 font-geist leading-relaxed max-w-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="sm:p-8 sm:ml-8 sm:mr-8 sm:mb-10 mt-10 mr-8 mb-10 ml-8 pt-6 pr-6 pb-6 pl-6" id="pricing">
          <div className="relative">
            <div className="relative max-w-5xl mx-auto text-center animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both]">
              <h2 className="text-[40px] sm:text-6xl leading-[0.95] text-white font-geist tracking-tighter">One plan. Everything unlocked.</h2>
              <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-geist">
                Pick monthly or yearly. Cancel anytime. Every course in every category — funded by real billionaires so you don't pay per lesson.
              </p>
            </div>

            <div className="relative max-w-[1200px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Monthly", sub: "Try the full library.", price: "$10", priceSub: "month", delivery: "Cancel anytime", items: ["All courses, all categories","New courses every month","Watch on any device","Member community"], cta: "Start monthly", featured: false },
                { title: "Yearly", sub: "Save 2 months. Most popular.", price: "$100", priceSub: "year", delivery: "Best value", items: ["Everything in Monthly","2 months free","Downloadable projects","Certificates of completion","Priority Q&A"], cta: "Go yearly", featured: true },
                { title: "Teams", sub: "For startups & study groups.", price: "Custom", priceSub: "5+ seats", delivery: "Tailored rollout", items: ["Volume seats","Team progress dashboard","Onboarding workshop","Dedicated support"], cta: "Talk to us", featured: false },

              ].map((p, i) => (
                <article key={i} className={`relative overflow-hidden rounded-2xl backdrop-blur-xl p-6 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.3s_both] flex flex-col h-full transition-colors duration-300 ${p.featured ? "border border-blue-500/30 bg-blue-900/10 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20" : "border border-white/10 bg-white/5 hover:bg-white/[0.07]"}`}>
                  {p.featured && (
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% -20%, rgba(59, 130, 246, 0.15), transparent 70%)" }}></div>
                  )}
                  <div className="relative flex flex-col gap-1 mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg text-white tracking-tight font-geist ${p.featured ? "font-semibold" : "font-medium"}`}>{p.title}</h3>
                      {p.featured && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider text-blue-950 bg-blue-400 font-geist">Best Value</span>}
                    </div>
                    <p className={`text-xs font-geist ${p.featured ? "text-blue-200/60" : "text-white/50"}`}>{p.sub}</p>
                  </div>
                  <div className="relative mb-6">
                    <div className="flex items-end gap-1">
                      <p className="text-3xl lg:text-4xl text-white font-geist tracking-tighter">{p.price}</p>
                      <span className="text-white/40 text-xs mb-1.5 font-geist uppercase tracking-wide">/ {p.priceSub}</span>
                    </div>
                    <div className={`mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-geist ${p.featured ? "bg-blue-500/10 border border-blue-500/20 text-blue-200" : "bg-white/5 border border-white/10 text-white/70"}`}>
                      <iconify-icon icon="solar:clock-circle-linear" width="12" height="12"></iconify-icon>
                      {p.delivery}
                    </div>
                  </div>
                  <ul className="space-y-3.5 flex-1 mb-8">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-linear" width="16" height="16" class="text-blue-400 mt-0.5 shrink-0"></iconify-icon>
                        <span className={`text-sm font-geist ${p.featured ? "text-white font-medium" : "text-white/80"}`}>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/pricing" className={`w-full inline-flex items-center justify-center h-10 rounded-lg text-xs font-medium transition font-geist ${p.featured ? "bg-blue-500 text-white font-semibold hover:bg-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "bg-white/10 text-white hover:bg-white/20 border border-white/10"}`}>{p.cta}</Link>

                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Motivation gallery */}
        <section className="overflow-hidden relative py-24 bg-black" id="motivation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both]">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-geist tracking-tighter text-white">Knowledge Is the Road to the Top</h2>
              <p className="mt-4 text-lg text-white/70 font-geist max-w-2xl mx-auto">Everything you see now started with a decision. Learn today, live the life you dream of tomorrow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { type: "image", src: motivation1, quote: "Invest in your mind and you control your destiny." },
                { type: "video", src: motivationVideo, quote: "Success isn't luck. It's a decision to learn and grow." },
                { type: "image", src: motivation2, quote: "Every hour you learn is a step closer to your dream." },
              ].map((item, i) => (
                <article key={i} className="relative rounded-2xl overflow-hidden border border-white/10 group animate-on-scroll [animation:fadeSlideIn_1s_ease-out_both]" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                  <div className="aspect-[4/5] overflow-hidden bg-white/5">
                    {item.type === "video" ? (
                      <video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <img src={item.src} alt="Motivation" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-lg font-geist tracking-tight leading-snug">{item.quote}</p>
                  </div>
                </article>
              ))}
            </div>


            <div className="mt-12 text-center animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.4s_both]">
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-8 py-4 text-sm font-semibold text-white hover:bg-blue-400 transition font-geist shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Start Your Journey Now
                <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
              </Link>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="border-white/10 border-t relative bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <Link to="/" className="flex items-center gap-2">
                  <span className="font-geist text-xl font-semibold tracking-tight text-white">Shro<span className="text-blue-400">.AI</span></span>
                </Link>
                <p className="mt-4 text-sm text-white/70 max-w-md font-geist">An unlimited course membership across AI, Programming, Psychology and Business — backed by real billionaires who fund learning, not paywalls.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-tight font-geist">Learn</h4>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li><a href="#manifesto" className="hover:text-white font-geist">Why us</a></li>
                  <li><a href="#ecosystem" className="hover:text-white font-geist">Categories</a></li>
                  <li><a href="#pricing" className="hover:text-white font-geist">Membership</a></li>
                  <li><Link to="/courses" className="hover:text-white font-geist">Browse courses</Link></li>
                </ul>
              </div>


              <div>
                <h4 className="text-sm font-semibold tracking-tight font-geist">Account</h4>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li><Link to="/auth" className="hover:text-white font-geist">Log in</Link></li>

                </ul>
              </div>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-xs text-white/50 font-geist">© {new Date().getFullYear()} Shro.AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
