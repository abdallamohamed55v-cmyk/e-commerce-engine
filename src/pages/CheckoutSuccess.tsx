import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import SiteShell from "@/components/SiteShell";

export default function CheckoutSuccess() {
  const lang = useLang();
  const isAr = lang === "ar";
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status")?.toLowerCase();
  const failed = status === "failed" || status === "canceled" || status === "cancelled";

  return (
    <SiteShell>
      <main className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className={`text-[11px] uppercase tracking-[0.25em] mb-3 ${failed ? "text-red-400/80" : "text-green-400/80"}`}>
          {failed ? (isAr ? "فشل الدفع" : "Payment failed") : (isAr ? "تم الدفع" : "Payment confirmed")}
        </p>
        <h1 className="text-3xl md:text-4xl tracking-tighter font-light">
          {failed ? (isAr ? "الدفع لم يكتمل" : "Payment was not completed") : (isAr ? "مرحبا في Shro.AI" : "Welcome to Shro.AI")}
        </h1>
        <p className="mt-4 text-white/60 leading-relaxed">
          {failed
            ? isAr
              ? "ما تمش تفعيل الاشتراك لأن عملية الدفع رجعت بحالة فشل. جرّب تاني أو اختار خطة مختلفة."
              : "Your subscription was not activated because checkout returned a failed payment status. Please try again."
            : isAr
            ? "اشتراكك مفعّل دلوقتي. كل الكورسات مفتوحة لك. (لو لسه ما ظهرتش، استنى لحظات وحدّث الصفحة.)"
            : "Your subscription is active. Every course is unlocked. (If you don't see it yet, give it a moment and refresh.)"}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={failed ? "/pricing" : "/courses"}
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
          >
            {failed ? (isAr ? "جرّب الدفع مرة تانية" : "Try again") : (isAr ? "ابدأ التعلم" : "Start learning")}
          </Link>
          <Link
            to="/account"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10"
          >
            {isAr ? "حسابي" : "Go to account"}
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
