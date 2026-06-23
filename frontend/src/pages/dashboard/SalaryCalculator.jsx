import React, { useEffect, useState } from "react";
import { Calculator, Loader2 } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function SalaryCalculator() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [code, setCode] = useState(user?.target_exam || "UPSC-CSE");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/exams").then((r) => setExams(r.data?.exams || [])).catch(() => {});
  }, []);

  const compute = async (c) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/salary/${c}`);
      setData(data);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) compute(code);
    // eslint-disable-next-line
  }, [code]);

  const fmt = (n) => "₹" + (n || 0).toLocaleString("en-IN");

  return (
    <div data-testid="salary-page">
      <div className="flex items-center gap-3 mb-2">
        <Calculator size={22} className="text-[#EF9F27]" />
        <h1 className="font-serif-display text-3xl">Salary Calculator</h1>
      </div>
      <p className="text-[#A0A0B5] mb-7 text-sm">
        Entry-level in-hand salary (7th CPC) with HRA tier-wise breakdown.
      </p>

      <div className="glass rounded-2xl p-5 border border-white/8 mb-6">
        <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">Pick an exam</label>
        <select
          data-testid="salary-exam-select"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#EF9F27]/60"
        >
          {exams.map((e) => (
            <option key={e.code} value={e.code}>
              {e.body} · {e.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Calculating...</div>}

      {data && !loading && (
        <div data-testid="salary-result" className="space-y-5">
          <div className="glass-strong rounded-2xl p-6 border border-white/10">
            <div className="text-xs uppercase tracking-widest text-[#EF9F27]">{data.code}</div>
            <div className="font-serif-display text-2xl text-white mt-1">{data.post}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { key: "metro_x", label: "Metro (X Cities)", note: "HRA 27%" },
              { key: "tier2_y", label: "Tier-2 (Y Cities)", note: "HRA 18%" },
              { key: "tier3_z", label: "Tier-3 (Z Cities)", note: "HRA 9%" },
            ].map((c) => (
              <div key={c.key} className="glass rounded-2xl p-5 border border-white/8 text-center">
                <div className="text-xs uppercase tracking-widest text-[#A0A0B5]">{c.label}</div>
                <div className="text-[10px] text-[#7a7a92] mt-1">{c.note}</div>
                <div className="font-serif-display text-3xl text-gold-gradient mt-3">
                  {fmt(data.in_hand_monthly[c.key])}
                </div>
                <div className="text-[11px] text-[#A0A0B5] mt-1">in-hand monthly</div>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 border border-white/8">
            <h3 className="font-serif-display text-lg mb-4">Components</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["Basic Pay", data.components.basic],
                ["DA (46%)", data.components.da],
                ["HRA Metro", data.components.hra_metro],
                ["NPA/Special", data.components.npa_special],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs uppercase tracking-widest text-[#A0A0B5]">{k}</div>
                  <div className="text-base text-white font-medium mt-1">{fmt(v)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
