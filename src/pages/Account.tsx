import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/hooks/useLang";
import { courses } from "@/content";

export default function Account() {
  const lang = useLang();
  const { user, loading, signOut } = useAuth();
  const { subscription } = useSubscription();
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("lesson_progress").select("*").eq("user_id", user.id).then(({ data }) => setProgress(data || []));
  }, [user]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/auth?redirect=/account" />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{lang === "ar" ? "حسابي" : "My Account"}</h1>
          <Button variant="outline" onClick={signOut}>{lang === "ar" ? "تسجيل خروج" : "Sign out"}</Button>
        </div>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</p>
          <p className="font-medium">{user.email}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-3">{lang === "ar" ? "الاشتراك" : "Subscription"}</h2>
          {subscription ? (
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <Badge>{subscription.status}</Badge>
                <span className="font-medium">{lang === "ar" ? subscription.plan.name_ar : subscription.plan.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {lang === "ar" ? "ينتهي في" : "Renews on"}: {new Date(subscription.current_period_end).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">{lang === "ar" ? "مفيش اشتراك نشط" : "No active subscription"}</p>
              <Button asChild><Link to="/pricing">{lang === "ar" ? "شوف الباقات" : "View plans"}</Link></Button>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{lang === "ar" ? "تقدمي" : "My Progress"}</h2>
          <div className="space-y-3">
            {courses.map((c) => {
              const done = progress.filter((p) => p.course_slug === c.slug).length;
              const pct = Math.round((done / c.lessons.length) * 100);
              return (
                <Link key={c.slug} to={`/courses/${c.slug}`} className="block">
                  <div className="flex items-center gap-4 hover:bg-accent p-3 rounded">
                    <div className={`w-10 h-10 rounded bg-gradient-to-br ${c.coverGradient}`} />
                    <div className="flex-1">
                      <p className="font-medium">{c[lang].title}</p>
                      <div className="h-2 bg-muted rounded mt-1 overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{done}/{c.lessons.length}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
