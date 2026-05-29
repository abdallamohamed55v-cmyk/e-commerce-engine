import { useState } from "react";
import { useLang } from "@/hooks/useLang";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SiteShell from "@/components/SiteShell";

export default function Contact() {
  const lang = useLang();
  const isAr = lang === "ar";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(form);
    setLoading(false);
    if (error)
      return toast({
        title: isAr ? "خطأ" : "Error",
        description: error.message,
        variant: "destructive",
      });
    setSent(true);
    toast({
      title: isAr ? "تم الإرسال" : "Sent",
      description: isAr ? "هنرد عليك قريب." : "We'll get back to you soon.",
    });
  };

  return (
    <SiteShell>
      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400/80 mb-4">
          {isAr ? "تواصل معنا" : "Get in touch"}
        </p>
        <h1 className="text-4xl md:text-5xl tracking-tighter font-light">
          {isAr ? "كلّمنا." : "Let's talk."}
        </h1>
        <p className="mt-4 text-white/60 leading-relaxed max-w-xl">
          {isAr
            ? "سؤال؟ اقتراح؟ شراكة؟ ابعتلنا رسالة وهنرد في خلال يومين شغل."
            : "Question, suggestion, or partnership? Send us a note and we'll reply within 2 business days."}
        </p>

        {sent ? (
          <div className="mt-10 rounded-3xl border border-green-400/30 bg-green-400/5 p-8 text-center">
            <p className="text-lg font-light">
              {isAr ? "وصلتنا رسالتك. شكراً لك." : "Got it. Thanks for reaching out."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field
                label={isAr ? "الاسم" : "Name"}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <Field
                label={isAr ? "البريد الإلكتروني" : "Email"}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
              />
            </div>
            <Field
              label={isAr ? "الموضوع" : "Subject"}
              value={form.subject}
              onChange={(v) => setForm({ ...form, subject: v })}
              required
            />
            <label className="block">
              <span className="text-xs text-white/50 mb-1.5 block">
                {isAr ? "الرسالة" : "Message"}
              </span>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50 resize-none"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 inline-flex items-center justify-center disabled:opacity-60"
            >
              {loading ? "..." : isAr ? "إرسال" : "Send message"}
            </button>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-white/5 text-sm text-white/60">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
            {isAr ? "البريد الإلكتروني" : "Email"}
          </p>
          <a href="mailto:hello@shro.ai" className="hover:text-white">
            hello@shro.ai
          </a>
        </div>
      </main>
    </SiteShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs text-white/50 mb-1.5 block">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400/50"
      />
    </label>
  );
}
