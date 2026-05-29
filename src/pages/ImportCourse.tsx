import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Youtube } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ImportCourse() {
  const { user, loading: authLoading } = useAuth();
  const [playlist, setPlaylist] = useState("");
  const [lang, setLang] = useState("ar");
  const [level, setLevel] = useState("beginner");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (authLoading) return <div className="p-8 text-center">...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  const handleImport = async () => {
    if (!playlist.trim()) return toast.error("ادخل رابط أو ID البلاي ليست");
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("import-youtube-course", {
        body: { playlist, lang, level, publish: true },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data);
      toast.success(`تم استيراد ${data.lessons_count} درس بنجاح`);
      setPlaylist("");
    } catch (e: any) {
      toast.error(e.message || "فشل الاستيراد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Youtube className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold">استيراد كورس من YouTube</h1>
      </div>

      <Card className="p-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          الصق رابط YouTube playlist أو ID. شرط: لازم تكون فيها فيديوهات.
        </p>

        <div>
          <Label htmlFor="pl">رابط/ID البلاي ليست</Label>
          <Input
            id="pl"
            value={playlist}
            onChange={(e) => setPlaylist(e.target.value)}
            placeholder="https://youtube.com/playlist?list=..."
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lang">اللغة</Label>
            <select
              id="lang"
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              disabled={loading}
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <Label htmlFor="level">المستوى</Label>
            <select
              id="level"
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              disabled={loading}
            >
              <option value="beginner">مبتدئ</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">متقدم</option>
            </select>
          </div>
        </div>

        <Button onClick={handleImport} disabled={loading} className="w-full">
          {loading ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> جاري الاستيراد...</>) : "استيراد الكورس"}
        </Button>

        {result && (
          <div className="p-4 rounded-md bg-muted text-sm space-y-1">
            <div>✅ تم بنجاح</div>
            <div>عدد الدروس: <b>{result.lessons_count}</b></div>
            <div>المدة الكلية: <b>{result.total_minutes}</b> دقيقة</div>
            <a href={`/courses/${result.slug}`} className="text-primary underline">عرض الكورس</a>
          </div>
        )}
      </Card>
    </div>
  );
}
