import React, { useEffect, useState } from "react";
import { BellRing, Loader2, Calendar } from "lucide-react";
import api from "@/lib/api";

export default function ExamAlerts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/alerts").then((r) => setItems(r.data?.items || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="alerts-page">
      <div className="flex items-center gap-3 mb-2">
        <BellRing size={22} className="text-[#7F77DD]" />
        <h1 className="font-serif-display text-3xl">Exam Alerts</h1>
      </div>
      <p className="text-[#A0A0B5] mb-7 text-sm">
        Every upcoming exam — sorted by how soon. Form windows included.
      </p>

      {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Loading...</div>}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((a) => (
            <div key={a.code} data-testid={`alert-card-${a.code.toLowerCase()}`} className="glass rounded-2xl p-5 border border-white/8">
              <div className="text-xs uppercase tracking-widest text-[#EF9F27]">{a.body}</div>
              <h3 className="font-serif-display text-base text-white mt-1 leading-snug">{a.name}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[#7a7a92] uppercase tracking-widest text-[10px]">Exam date</div>
                  <div className="text-white mt-0.5 inline-flex items-center gap-1.5"><Calendar size={12} className="text-[#7F77DD]" /> {a.exam_date}</div>
                </div>
                <div>
                  <div className="text-[#7a7a92] uppercase tracking-widest text-[10px]">Form window</div>
                  <div className="text-white mt-0.5">{a.form_window}</div>
                </div>
              </div>
              {a.days_left !== null && a.days_left >= 0 && (
                <div className="mt-4 px-3 py-2 rounded-lg bg-[#EF9F27]/10 border border-[#EF9F27]/25 text-center">
                  <span className="font-serif-display text-lg text-gold-gradient font-bold">{a.days_left}</span>
                  <span className="text-xs text-[#A0A0B5] ml-2 uppercase tracking-widest">days left</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
