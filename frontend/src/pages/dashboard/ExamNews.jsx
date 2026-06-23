import React, { useEffect, useState } from "react";
import { Newspaper, Loader2, ExternalLink, Bell, FileText, Award, Clock4 } from "lucide-react";
import api from "@/lib/api";

const TYPE_META = {
  "Notification": { color: "#EF9F27", icon: Bell },
  "Form Open":    { color: "#5EC4B6", icon: FileText },
  "Admit Card":   { color: "#7F77DD", icon: FileText },
  "Result":       { color: "#F7C97E", icon: Award },
  "Update":       { color: "#A0A0B5", icon: Clock4 },
};

export default function ExamNews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api.get("/exam-news").then((r) => setItems(r.data?.items || [])).finally(() => setLoading(false));
  }, []);

  const types = ["All", ...Array.from(new Set(items.map((i) => i.type)))];
  const filtered = filter === "All" ? items : items.filter((i) => i.type === filter);

  return (
    <div data-testid="news-page">
      <div className="flex items-center gap-3 mb-2">
        <Newspaper size={22} className="text-[#EF9F27]" />
        <h1 className="font-serif-display text-3xl">Daily Exam News</h1>
      </div>
      <p className="text-[#A0A0B5] mb-7 text-sm">
        Notifications, form releases, admit cards, results — refreshed daily.
      </p>

      {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Loading...</div>}

      {!loading && (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {types.map((t) => (
              <button
                key={t}
                data-testid={`news-filter-${t.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setFilter(t)}
                className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                  filter === t
                    ? "bg-[#EF9F27] text-[#1a1a2e] border-transparent font-semibold"
                    : "bg-white/[0.03] text-[#C7C7D6] border-white/10 hover:border-white/25 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((n) => {
              const meta = TYPE_META[n.type] || TYPE_META.Update;
              const Icon = meta.icon;
              return (
                <article
                  key={n.id}
                  data-testid={`news-card-${n.id}`}
                  className="group glass rounded-2xl p-5 border border-white/8 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${meta.color}15`,
                        border: `1px solid ${meta.color}40`,
                      }}
                    >
                      <Icon size={18} style={{ color: meta.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className="text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                          style={{ background: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}40` }}
                        >
                          {n.type}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[#7a7a92]">{n.exam}</span>
                        <span className="text-[10px] text-[#7a7a92] ml-auto">{n.date}</span>
                      </div>
                      <h3 className="font-serif-display text-lg text-white leading-snug group-hover:text-[#F7C97E] transition-colors">{n.title}</h3>
                      <p className="text-sm text-[#C7C7D6] mt-1.5 leading-relaxed">{n.summary}</p>
                    </div>
                    <ExternalLink size={14} className="text-[#7F77DD] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all flex-shrink-0 mt-1" />
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
