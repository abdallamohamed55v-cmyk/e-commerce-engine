import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/hooks/useLang";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

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

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-black text-white font-geist flex flex-col"
    >
      {/* Subtle aura */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)] pointer-events-none" />

      <header className="relative max-w-7xl w-full mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Shro<span className="text-blue-400">.AI</span>
        </Link>
        <Link
          to="/"
          className="text-sm text-white/60 hover:text-white"
        >
          {isAr ? "← الرئيسية" : "Back home"}
        </Link>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400/80 mb-3">
              {mode === "signin"
                ? isAr ? "أهلاً بعودتك" : "Welcome back"
                : isAr ? "انضم لنا" : "Join Shro.AI"}
            </p>
            <h1 className="text-3xl md:text-4xl tracking-tighter font-light">
              {mode === "signin"
                ? isAr ? "سجّل دخولك" : "Sign in to continue"
                : isAr ? "أنشئ حسابك" : "Create your account"}
            </h1>
            <p className="mt-3 text-white/55 text-sm">
              {isAr
                ? "كل الكورسات. اشتراك واحد."
                : "Every course. One membership."}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-1 rounded-full bg-white/5 border border-white/10 mb-6">
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
              className="mt-2 w-full py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading
                ? "..."
                : mode === "signin"
                ? isAr ? "تسجيل الدخول" : "Sign in"
                : isAr ? "إنشاء الحساب" : "Create account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
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
