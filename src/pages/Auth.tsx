import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/hooks/useLang";
import { toast } from "@/hooks/use-toast";

export default function Auth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lang = useLang();
  const isAr = lang === "ar";
  const redirect = params.get("redirect") || "/account";
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error)
      return toast({
        title: isAr ? "فشل تسجيل الدخول" : "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    navigate(redirect);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + redirect,
        data: { display_name: name },
      },
    });
    setLoading(false);
    if (error)
      return toast({
        title: isAr ? "فشل إنشاء الحساب" : "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    toast({
      title: isAr ? "تحقق من بريدك" : "Check your email",
      description: isAr ? "أكد بريدك للمتابعة." : "Confirm your address to continue.",
    });
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + redirect },
    });
    if (error)
      toast({
        title: isAr ? "فشل تسجيل الدخول" : "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-black text-white font-geist grid lg:grid-cols-2 relative overflow-hidden"
    >
      {/* Left panel — brand (desktop only) */}
      <aside className="hidden lg:flex relative flex-col justify-between p-12 border-r border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:42px_42px]" />

        <Link to="/" className="relative text-lg font-semibold tracking-tight">
          Shro<span className="text-blue-400">.AI</span>
        </Link>

        <div className="relative space-y-6 max-w-md">
          <p className="text-[11px] uppercase tracking-[0.3em] text-blue-400/80">
            {isAr ? "منصة التعلّم" : "Learning platform"}
          </p>
          <h2 className="text-4xl xl:text-5xl font-light tracking-tighter leading-[1.05]">
            {isAr
              ? "كل الكورسات. اشتراك واحد."
              : "Every course. One membership."}
          </h2>
          <p className="text-white/55 text-sm leading-relaxed">
            {isAr
              ? "انضم لآلاف المتعلمين وابدأ رحلتك في الذكاء الاصطناعي، البرمجة، والتطوير المهني."
              : "Join thousands of learners mastering AI, programming, and professional growth."}
          </p>
        </div>

        <div className="relative flex items-center gap-6 text-xs text-white/40">
          <span>© Shro.AI</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <Link to="/" className="hover:text-white/70">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
        </div>
      </aside>

      {/* Right panel — form */}
      <main className="relative flex flex-col">
        <div className="lg:hidden absolute inset-x-0 top-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />

        <header className="relative flex items-center justify-between px-6 lg:px-10 h-16">
          <Link to="/" className="lg:hidden text-lg font-semibold tracking-tight">
            Shro<span className="text-blue-400">.AI</span>
          </Link>
          <span className="hidden lg:block" />
          <Link to="/" className="text-sm text-white/60 hover:text-white">
            {isAr ? "← الرئيسية" : "Back home"}
          </Link>
        </header>

        <div className="relative flex-1 flex items-center justify-center px-6 py-10 lg:py-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400/80 mb-3">
                {mode === "signin"
                  ? isAr ? "أهلاً بعودتك" : "Welcome back"
                  : isAr ? "انضم لنا" : "Join Shro.AI"}
              </p>
              <h1 className="text-3xl md:text-[34px] tracking-tighter font-light leading-tight">
                {mode === "signin"
                  ? isAr ? "سجّل دخولك" : "Sign in to continue"
                  : isAr ? "أنشئ حسابك" : "Create your account"}
              </h1>
            </div>

            {/* OAuth */}
            <div className="space-y-2.5">
              <button
                onClick={() => handleOAuth("google")}
                className="w-full py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition inline-flex items-center justify-center gap-2.5"
              >
                <GoogleIcon />
                {isAr ? "المتابعة بـ Google" : "Continue with Google"}
              </button>
              <button
                onClick={() => handleOAuth("github")}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition inline-flex items-center justify-center gap-2.5"
              >
                <GithubIcon />
                {isAr ? "المتابعة بـ GitHub" : "Continue with GitHub"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                {isAr ? "أو" : "Or"}
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Tabs */}
            <div className="flex p-1 rounded-full bg-white/5 border border-white/10 mb-5">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-full text-xs font-medium transition ${
                    mode === m ? "bg-white text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  {m === "signin"
                    ? isAr ? "دخول" : "Sign in"
                    : isAr ? "إنشاء حساب" : "Sign up"}
                </button>
              ))}
            </div>

            <form
              onSubmit={mode === "signin" ? handleSignIn : handleSignUp}
              className="space-y-3"
            >
              {mode === "signup" && (
                <Field
                  label={isAr ? "الاسم" : "Name"}
                  value={name}
                  onChange={setName}
                  required
                />
              )}
              <Field
                label={isAr ? "البريد الإلكتروني" : "Email"}
                type="email"
                value={email}
                onChange={setEmail}
                required
              />
              <Field
                label={isAr ? "كلمة المرور" : "Password"}
                type="password"
                value={password}
                onChange={setPassword}
                required
                minLength={mode === "signup" ? 8 : undefined}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-3 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-400 transition inline-flex items-center justify-center disabled:opacity-60"
              >
                {loading
                  ? "..."
                  : mode === "signin"
                  ? isAr ? "تسجيل الدخول" : "Sign in"
                  : isAr ? "إنشاء الحساب" : "Create account"}
              </button>
            </form>

            {mode === "signin" && (
              <p className="mt-4 text-center text-xs">
                <Link to="/reset-password" className="text-white/50 hover:text-white">
                  {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
                </Link>
              </p>
            )}

            <p className="mt-6 text-center text-xs text-white/40">
              {isAr
                ? "بإنشاء حساب أنت توافق على شروطنا."
                : "By creating an account you agree to our terms."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs text-white/50 mb-1.5 block">{label}</span>
      <input
        type={type}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.07] transition"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.97-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39s1.97.13 2.89.39c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.7.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}
