import { Link } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import SiteShell from "@/components/SiteShell";
import { XCircle } from "lucide-react";

export default function CheckoutCancel() {
  const lang = useLang();
  const isAr = lang === "ar";
  return (
    <SiteShell>
      <main className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
          <XCircle className="h-8 w-8 text-white/60" />
        </div>
        <h1 className="text-3xl md:text-4xl tracking-tighter font-light">
          {isAr ? "تم إلغاء الدفع" : "Checkout canceled"}
        </h1>
        <p className="mt-4 text-white/60 leading-relaxed">
          {isAr
            ? "ما تمش خصم أي مبلغ. تقدر ترجع تختار خطة في أي وقت."
            : "No charge was made. You can come back to pricing anytime."}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
          >
            {isAr ? "اعرض الخطط" : "View plans"}
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10"
          >
            {isAr ? "الرئيسية" : "Home"}
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
