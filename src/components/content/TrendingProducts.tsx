import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  price: number;
  cover_image_url: string | null;
  is_official: boolean | null;
};

type Props = {
  categorySlug?: string;
};

const TrendingProducts = ({ categorySlug = "all" }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      let categoryId: string | null = null;
      if (categorySlug && categorySlug !== "all") {
        const { data: cat } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", categorySlug)
          .maybeSingle();
        categoryId = cat?.id ?? null;
      }

      let query = supabase
        .from("products")
        .select("id,slug,title,short_description,price,cover_image_url,is_official,category_id")
        .eq("status", "approved")
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(12);

      if (categoryId) query = query.eq("category_id", categoryId);

      const { data } = await query;
      if (!cancelled) {
        setProducts((data as Product[]) || []);
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  return (
    <section id="trending" className="px-6 pb-24 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">
            Trending courses
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">
            Learn what's shipping in AI
          </h2>
        </div>
        <span className="hidden md:inline text-xs text-zinc-600">
          {products.length} courses
        </span>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-square rounded-2xl bg-zinc-950 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="border border-dashed border-zinc-900 rounded-3xl py-20 flex flex-col items-center justify-center text-center px-8">
          <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full animate-pulse mb-4" />
          <p className="text-xs text-zinc-600 leading-relaxed max-w-xs tracking-wide">
            Nothing here yet — try another category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.slug || p.id}`} className="group block">
              {/* Mobile: 16:10 editorial card with separated meta. Desktop: square overlay card. */}
              <div className="relative aspect-[16/10] md:aspect-square w-full rounded-2xl overflow-hidden bg-[#111] border border-white/5">
                {p.cover_image_url ? (
                  <img
                    src={p.cover_image_url}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
                {/* Desktop-only gradient overlay */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
                {p.is_official && (
                  <div className="absolute top-3 right-3 md:top-3 md:left-3 md:right-auto">
                    <span className="px-2 py-1 md:py-0.5 bg-black/60 md:bg-white backdrop-blur-md border border-white/10 md:border-0 text-white md:text-black rounded md:rounded-full text-[10px] md:text-[9px] uppercase font-semibold tracking-widest md:tracking-[0.15em]">
                      Official
                    </span>
                  </div>
                )}
                {/* Desktop-only overlay meta */}
                <div className="hidden md:flex absolute bottom-0 left-0 right-0 p-3 items-end justify-between">
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-medium text-white truncate">{p.title}</h3>
                    <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                      {p.short_description || "Studio Shro"}
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-white bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 shrink-0 ml-2">
                    ${Number(p.price).toFixed(0)}
                  </div>
                </div>
              </div>
              {/* Mobile-only meta row below image */}
              <div className="flex md:hidden justify-between items-start mt-4">
                <div className="space-y-1 min-w-0 pr-3">
                  <h3 className="text-white text-lg font-medium truncate">{p.title}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-1">
                    {p.short_description || "Studio Shro"}
                  </p>
                </div>
                <span className="text-white font-semibold text-lg shrink-0">
                  ${Number(p.price).toFixed(0)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
