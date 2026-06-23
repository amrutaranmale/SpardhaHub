import React, { useEffect, useState } from "react";
import { Globe, Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function CurrentAffairs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.get("/current-affairs").then((r) => setItems(r.data?.items || [])).finally(() => setLoading(false));
  }, []);

  const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div data-testid="ca-page">
      <div className="flex items-center gap-3 mb-2">
        <Globe size={22} className="text-[#5EC4B6]" />
        <h1 className="font-serif-display text-3xl">Daily Current Affairs</h1>
      </div>
      <p className="text-[#A0A0B5] mb-7 text-sm">
        Curated briefs tagged to every exam. Updated daily.
      </p>

      {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Loading...</div>}

      {!loading && (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {cats.map((c) => (
              <button
                key={c}
                data-testid={`ca-filter-${c.toLowerCase()}`}
                onClick={() => setFilter(c)}
                className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                  filter === c
                    ? "bg-[#EF9F27] text-[#1a1a2e] border-transparent font-semibold"
                    : "bg-white/[0.03] text-[#C7C7D6] border-white/10 hover:border-white/25 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((b) => (
              <article key={b.id} data-testid={`ca-card-${b.id}`} className="glass rounded-2xl p-5 border border-white/8 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest mb-2">
                  <span className="text-[#EF9F27]">{b.category}</span>
                  <span className="text-[#A0A0B5]">{b.date}</span>
                </div>
                <h3 className="font-serif-display text-lg text-white leading-snug">{b.title}</h3>
                <p className="text-sm text-[#C7C7D6] mt-2 leading-relaxed">{b.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {b.exam_relevance.map((e) => (
                    <span key={e} className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#A0A0B5]">{e}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
