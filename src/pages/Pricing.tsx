import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { toast } from "@/hooks/use-toast";

interface Plan {
  id: string;
  slug: string;
  name: string;
  name_ar: string;
  price_usd: number;
  interval: string;
  features: string[];
  features_ar: string[];
  is_popular: boolean;
}

export default function Pricing() {
  const lang = useLang();
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("subscription_plans").select("*").eq("is_active", true).order("sort_order").then(({ data }) => {
      if (data) setPlans(data as any);
    });
  }, []);

  const handleSubscribe = async (planId: string) => {
    if (!user) { window.location.href = `/auth?redirect=/pricing`; return; }
    setLoading(planId);
    const { data, error } = await supabase.functions.invoke("create-dodo-checkout", { body: { plan_id: planId } });
    setLoading(null);
    if (error || !data?.checkout_url) {
      toast({ title: lang === "ar" ? "خطأ" : "Error", description: error?.message || "Failed to create checkout", variant: "destructive" });
      return;
    }
    window.location.href = data.checkout_url;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{lang === "ar" ? "اختار خطتك" : "Choose your plan"}</h1>
          <p className="text-muted-foreground">{lang === "ar" ? "وصول كامل لكل الكورسات. ألغي في أي وقت." : "Full access to all courses. Cancel anytime."}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((p) => {
            const features = lang === "ar" ? p.features_ar : p.features;
            return (
              <Card key={p.id} className={`p-8 ${p.is_popular ? "border-primary border-2" : ""} relative`}>
                {p.is_popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{lang === "ar" ? "الأكثر شيوعاً" : "Most popular"}</Badge>}
                <h3 className="text-2xl font-bold">{lang === "ar" ? p.name_ar : p.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-5xl font-bold">${p.price_usd}</span>
                  <span className="text-muted-foreground">/{p.interval === "month" ? (lang === "ar" ? "شهر" : "mo") : (lang === "ar" ? "سنة" : "yr")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {features.map((f, i) => <li key={i} className="flex gap-2"><Check className="h-5 w-5 text-primary shrink-0" />{f}</li>)}
                </ul>
                <Button className="w-full" size="lg" onClick={() => handleSubscribe(p.id)} disabled={loading === p.id}>
                  {loading === p.id ? "..." : (lang === "ar" ? "اشترك الآن" : "Subscribe now")}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
