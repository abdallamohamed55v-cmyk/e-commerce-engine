import { useState } from "react";

const AI_CATEGORIES = [
  { id: "all", name: "All" },
  { id: "chatgpt", name: "ChatGPT" },
  { id: "prompt", name: "Prompt Engineering" },
  { id: "agents", name: "AI Agents" },
  { id: "llm", name: "LLM Development" },
  { id: "genai", name: "Generative AI" },
  { id: "business", name: "AI for Business" },
];

type Props = {
  activeSlug: string;
  onSelect: (slug: string) => void;
};

const CategoryPills = ({ activeSlug, onSelect }: Props) => {
  const [local, setLocal] = useState("all");
  const active = activeSlug && activeSlug !== "all" ? activeSlug : local;

  return (
    <section className="pb-16">
      <div className="flex gap-3 overflow-x-auto px-6 no-scrollbar max-w-6xl mx-auto">
        {AI_CATEGORIES.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setLocal(c.id);
                onSelect("all");
              }}
              className={`liquid-glass shrink-0 px-5 py-2.5 rounded-full text-xs font-medium ${
                isActive ? "liquid-glass-primary" : "text-zinc-300 hover:text-white"
              }`}
            >
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryPills;
