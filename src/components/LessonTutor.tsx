import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LessonTutorProps {
  courseSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  lang: string;
}

export default function LessonTutor({ courseSlug, lessonSlug, lessonTitle, lang }: LessonTutorProps) {
  const isAr = lang === "ar";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(() => {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lesson-tutor`;
    return new DefaultChatTransport({
      api: url,
      fetch: async (input, init) => {
        const { data: { session } } = await supabase.auth.getSession();
        const headers = new Headers(init?.headers);
        headers.set("Content-Type", "application/json");
        if (session?.access_token) {
          headers.set("Authorization", `Bearer ${session.access_token}`);
        }
        // Inject lesson context into body
        let body = init?.body;
        if (typeof body === "string") {
          try {
            const parsed = JSON.parse(body);
            body = JSON.stringify({ ...parsed, courseSlug, lessonSlug, lang });
          } catch {}
        }
        return fetch(input, { ...init, headers, body });
      },
    });
  }, [courseSlug, lessonSlug, lang]);

  const { messages, sendMessage, status } = useChat({
    id: `${courseSlug}-${lessonSlug}`,
    transport,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  };

  const suggestions = isAr
    ? ["اشرحلي الدرس ده بطريقة أبسط", "اديني مثال عملي", "ايه أهم النقاط في الدرس؟"]
    : ["Explain this lesson more simply", "Give me a practical example", "What are the key points?"];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition"
      >
        {isAr ? "اسأل المدرس الذكي" : "Ask AI Tutor"}
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 w-[92vw] max-w-md h-[70vh] max-h-[600px] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
        <div>
          <p className="text-sm font-medium text-white">
            {isAr ? "المدرس الذكي" : "AI Tutor"}
          </p>
          <p className="text-[10px] text-white/40 truncate max-w-[200px]">{lessonTitle}</p>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/60"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <p className="text-white/60 text-sm mb-4">
              {isAr
                ? "اسألني أي حاجة عن الدرس ده"
                : "Ask me anything about this lesson"}
            </p>
            <div className="space-y-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage({ text: s })}
                  disabled={isLoading}
                  className="block w-full text-start px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const text = m.parts
            .map((p: any) => (p.type === "text" ? p.text : ""))
            .join("");
          return (
            <div
              key={m.id}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              {m.role === "user" ? (
                <div className="max-w-[85%] px-3.5 py-2 rounded-2xl bg-blue-500 text-white text-sm whitespace-pre-wrap">
                  {text}
                </div>
              ) : (
                <div className="max-w-[90%] text-white/85 text-sm prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-headings:font-medium prose-a:text-blue-400 prose-code:text-blue-300 prose-pre:bg-black/60">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              )}
            </div>
          );
        })}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="text-white/40 text-sm">
              {isAr ? "بيفكر..." : "Thinking..."}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="border-t border-white/10 p-3 bg-white/5">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
            placeholder={isAr ? "اكتب سؤالك..." : "Type your question..."}
            rows={1}
            className="flex-1 resize-none bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400/50 max-h-32"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
