import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/hooks/useLang";
import { toast } from "@/hooks/use-toast";
import SiteShell from "@/components/SiteShell";


export default function ResetPassword() {
  const navigate = useNavigate();
  const lang = useLang();
  const isAr = lang === "ar";
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user arrived via password recovery email, hash contains type=recovery
    const hash = window.location.hash;
    if (hash.includes("type=recovery") || hash.includes("access_token")) {
      setMode("update");
    }
  }, []);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error)
      return toast({
        title: isAr ? "خطأ" : "Error",
        description: error.message,
        variant: "destructive",
      });
    toast({
      title: isAr ? "تحقق من بريدك" : "Check your email",
      description: isAr
        ? "أرسلنا لك رابط لإعادة تعيين كلمة المرور."
        : "We've sent you a reset link.",
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error)
      return toast({
        title: isAr ? "خطأ" : "Error",
        description: error.message,
        variant: "destructive",
      });
    toast({
      title: isAr ? "تم!" : "Done!",
      description: isAr ? "تم تحديث كلمة المرور." : "Password updated.",
    });
    navigate("/account");
  };

  return (
    <SiteShell>
      <main className="max-w-md mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400/80 mb-3">
          {isAr ? "كلمة المرور" : "Password"}
        </p>
        <h1 className="text-3xl md:text-4xl tracking-tighter font-light">
          {mode === "request"
            ? isAr ? "نسيت كلمة المرور؟" : "Forgot password?"
            : isAr ? "كلمة مرور جديدة" : "Set a new password"}
        </h1>
        <p className="mt-3 text-white/55 text-sm">
          {mode === "request"
            ? isAr
              ? "أدخل بريدك وهنبعتلك رابط إعادة التعيين."
              : "Enter your email and we'll send a reset link."
            : isAr
            ? "اختر كلمة مرور قوية."
            : "Choose a strong password."}
        </p>

        <form
          onSubmit={mode === "request" ? handleRequest : handleUpdate}
          className="mt-8 space-y-3"
        >
          {mode === "request" ? (
            <label className="block">
              <span className="text-xs text-white/50 mb-1.5 block">
                {isAr ? "البريد الإلكتروني" : "Email"}
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50"
              />
            </label>
          ) : (
            <label className="block">
              <span className="text-xs text-white/50 mb-1.5 block">
                {isAr ? "كلمة المرور الجديدة" : "New password"}
              </span>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50"
              />
            </label>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 inline-flex items-center justify-center disabled:opacity-60"
          >
            {loading
              ? "..."
              : mode === "request"
              ? isAr ? "إرسال الرابط" : "Send reset link"
              : isAr ? "تحديث كلمة المرور" : "Update password"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          <Link to="/auth" className="hover:text-white">
            ← {isAr ? "العودة لتسجيل الدخول" : "Back to sign in"}
          </Link>
        </p>
      </main>
    </SiteShell>
  );
}
