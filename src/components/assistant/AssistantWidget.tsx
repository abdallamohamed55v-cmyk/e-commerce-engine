import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, X, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

const STORAGE_KEY = "shro_assistant_v1";
const SUPABASE_URL = "https://jdowaletwmqjhvmaervb.supabase.co";

const loadMessages = (): UIMessage[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UIMessage[]) : [];
  } catch {
    return [];
  }
};

const renderPartText = (m: UIMessage) =>
  m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

const AssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [initial] = useState<UIMessage[]>(() => loadMessages());
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    id: "shro-assistant",
    messages: initial,
    transport: new DefaultChatTransport({
      api: `${SUPABASE_URL}/functions/v1/chat-assistant`,
    }),
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open, status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    sendMessage({ text: t });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <>
      {/* Tiny floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open assistant"
          className="liquid-glass fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full text-white flex items-center justify-center"
        >
          <MessageCircle className="w-[18px] h-[18px] relative z-10" />
        </button>

      )}

      {/* Small popup from corner */}
      {open && (
        <div
          ref={popupRef}
          className="fixed bottom-4 right-4 z-50 w-[300px] max-w-[calc(100vw-2rem)] origin-bottom-right animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex flex-col h-[420px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.18)] overflow-hidden border border-zinc-200">
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium text-zinc-900">SHRO Assistant</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-zinc-400 hover:text-zinc-900 p-1 -m-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5"
            >
              {messages.length === 0 && (
                <div className="text-[13px] text-zinc-500 text-center pt-8 px-2 leading-relaxed">
                  Ask me about courses, membership, or anything on the site.
                </div>
              )}

              {messages.map((m) => {
                const text = renderPartText(m);
                if (m.role === "user") {
                  return (
                    <div key={m.id} className="flex justify-end">
                      <div className="bg-black text-white rounded-2xl rounded-br-md px-3 py-2 max-w-[85%] text-[13px] whitespace-pre-wrap">
                        {text}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={m.id} className="flex justify-start">
                    <div className="bg-zinc-100 text-zinc-900 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%] text-[13px]">
                      <div className="prose prose-sm max-w-none prose-p:my-1 prose-a:text-black prose-a:underline">
                        <ReactMarkdown>{text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              })}

              {status === "submitted" && (
                <div className="flex justify-start">
                  <div className="bg-zinc-100 rounded-2xl rounded-bl-md px-3 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-[11px] text-red-500 text-center">Something went wrong. Please try again.</div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-zinc-100 p-2">
              <div className="flex items-end gap-1.5 bg-zinc-50 rounded-lg border border-zinc-200 focus-within:border-zinc-400 transition-colors px-2.5 py-1.5">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 bg-transparent resize-none outline-none text-[13px] text-zinc-900 placeholder:text-zinc-400 max-h-20 py-1"
                />
                <button
                  onClick={() => send(input)}
                  disabled={isBusy || !input.trim()}
                  aria-label="Send"
                  className="h-7 w-7 rounded-md bg-black text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors flex-shrink-0"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssistantWidget;
