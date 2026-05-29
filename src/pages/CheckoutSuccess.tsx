import { Link } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import SiteShell from "@/components/SiteShell";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

export default function CheckoutSuccess() {
  const lang = useLang();
  const isAr = lang === "ar";
  return (
    <SiteShell>
      <main className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-green-400/80 mb-3">
          {isAr ? "تم الدفع" : "Payment confirmed"}
        </p>
        <h1 className="text-3xl md:text-4xl tracking-tighter font-light">
          {isAr ? "مرحبا في Shro.AI" : "Welcome to Shro.AI"}
        </h1>
        <p className="mt-4 text-white/60 leading-relaxed">
          {isAr
            ? "اشتراكك مفعّل دلوقتي. كل الكورسات مفتوحة لك. (لو لسه ما ظهرتش، استنى لحظات وحدّث الصفحة.)"
            : "Your subscription is active. Every course is unlocked. (If you don't see it yet, give it a moment and refresh.)"}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
          >
            {isAr ? "ابدأ التعلم" : "Start learning"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/account"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10"
          >
            {isAr ? "حسابي" : "Go to account"}
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
