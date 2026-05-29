import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Circle, Globe, Mail, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4";

export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/account";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signup" | "signin">("signup");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + redirect,
          data: { display_name: `${firstName} ${lastName}`.trim() },
        },
      });
      setLoading(false);
      if (error) return toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      toast({ title: "Check your email", description: "Confirm your address to continue." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      navigate(redirect);
    }
  };

  return (
    <main className="flex min-h-screen w-full bg-black text-white selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4 font-inter">
      {/* Left: Hero */}
      <aside className="hidden lg:flex w-[52%] relative flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
        />
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-xs space-y-8"
        >
          <motion.div variants={item} className="flex items-center gap-2">
            <Circle className="w-5 h-5 fill-white text-white" />
            <span className="text-xl font-semibold tracking-tight">shro</span>
          </motion.div>

          <motion.div variants={item}>
            <h2 className="text-4xl font-medium tracking-tight whitespace-nowrap">Join shro</h2>
            <p className="text-white/60 text-sm leading-relaxed px-4 mt-3">
              Follow these 3 quick phases to activate your space.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-3">
            <StepItem number={1} text="Register your identity" active />
            <StepItem number={2} text="Configure your studio" />
            <StepItem number={3} text="Finalize your profile" />
          </motion.div>
        </motion.div>
      </aside>

      {/* Right: Form */}
      <section className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
        >
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              {mode === "signup" ? "Create New Profile" : "Welcome Back"}
            </h1>
            <p className="text-white/40 text-sm mt-2">
              {mode === "signup"
                ? "Input your basic details to begin the journey."
                : "Sign in to continue your learning."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon={<Globe className="w-4 h-4" />} label="Google" />
            <SocialButton icon={<Mail className="w-4 h-4" />} label="Email" />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center"><span className="bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">Or</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="First Name" placeholder="Jane" value={firstName} onChange={setFirstName} />
                <InputGroup label="Last Name"  placeholder="Doe"  value={lastName}  onChange={setLastName} />
              </div>
            )}
            <InputGroup label="Email" type="email" placeholder="you@aurora.app" value={email} onChange={setEmail} required />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full bg-brand-gray border-none rounded-xl h-11 px-4 pr-11 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none transition"
                />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-white/30">Requires at least 8 symbols.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 transition disabled:opacity-50"
            >
              {loading ? "Working..." : mode === "signup" ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-white/40 text-center">
            {mode === "signup" ? "Member of the team? " : "New here? "}
            <button
              type="button"
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="text-white hover:underline"
            >
              {mode === "signup" ? "Log in" : "Create an account"}
            </button>
          </p>

          <p className="text-center text-xs text-white/30">
            <Link to="/" className="hover:text-white/60">← Back home</Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

function StepItem({ number, text, active }: { number: number; text: string; active?: boolean }) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-2xl px-4 py-3 transition " +
        (active
          ? "bg-white text-black border border-white"
          : "bg-brand-gray text-white border-none")
      }
    >
      <span
        className={
          "flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold " +
          (active ? "bg-black text-white" : "bg-white/10 text-white/40")
        }
      >
        {number}
      </span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={() => toast({ title: `${label} sign-in coming soon` })}
      className="flex items-center justify-center gap-2 h-11 bg-black border border-white/10 rounded-xl hover:bg-white/5 transition text-sm font-medium"
    >
      {icon}
      {label}
    </button>
  );
}

function InputGroup({
  label, placeholder, type = "text", value, onChange, required,
}: {
  label: string; placeholder?: string; type?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-brand-gray border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none transition"
      />
    </div>
  );
}
