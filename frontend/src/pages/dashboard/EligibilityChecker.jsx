import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2, UserCheck } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function EligibilityChecker() {
  const { user } = useAuth();
  const [dob, setDob] = useState(user?.dob || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("eligible");

  const onCheck = async (e) => {
    e?.preventDefault();
    if (!dob) {
      toast.error("Pick your date of birth");
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/eligibility/check", { dob });
      setResult(data);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // auto-run if user has DOB saved
  useEffect(() => {
    if (user?.dob && !result) onCheck();
    // eslint-disable-next-line
  }, [user?.dob]);

  const list = result ? (tab === "eligible" ? result.eligible : result.not_eligible) : [];

  return (
    <div data-testid="eligibility-page">
      <div className="flex items-center gap-3 mb-2">
        <UserCheck size={22} className="text-[#F7C97E]" />
        <h1 className="font-serif-display text-3xl">Age Eligibility Checker</h1>
      </div>
      <p className="text-[#A0A0B5] mb-7 text-sm">
        Enter your date of birth — we&apos;ll show which exams you currently qualify for.
      </p>

      <form onSubmit={onCheck} className="glass rounded-2xl p-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end mb-6 border border-white/8">
        <div className="flex-1">
          <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">Date of Birth</label>
          <input
            data-testid="eligibility-dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#EF9F27]/60"
          />
        </div>
        <button
          data-testid="eligibility-check-btn"
          type="submit"
          disabled={loading}
          className="btn-gold inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : "Check eligibility"}
        </button>
      </form>

      {result && (
        <div data-testid="eligibility-result">
          <div className="mb-4 p-4 glass rounded-xl border border-white/8 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm">
              You are <span className="text-[#EF9F27] font-semibold">{result.age_years} years</span> old today.
            </span>
            <span className="text-sm text-[#A0A0B5]">
              Eligible for <span className="text-white font-semibold">{result.eligible_count}</span> of {result.eligible.length + result.not_eligible.length} exams.
            </span>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              data-testid="tab-eligible"
              onClick={() => setTab("eligible")}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${tab === "eligible" ? "bg-[#5EC4B6] text-[#1a1a2e] border-transparent font-semibold" : "bg-white/[0.03] text-[#C7C7D6] border-white/10"}`}
            >
              ✓ Eligible ({result.eligible.length})
            </button>
            <button
              data-testid="tab-noteligible"
              onClick={() => setTab("not_eligible")}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${tab !== "eligible" ? "bg-white/10 text-white border-white/20 font-semibold" : "bg-white/[0.03] text-[#C7C7D6] border-white/10"}`}
            >
              ✗ Not eligible ({result.not_eligible.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {list.map((e) => (
              <div key={e.code} className="glass rounded-xl p-4 border border-white/8">
                <div className="flex items-start gap-3">
                  {tab === "eligible" ? (
                    <CheckCircle2 size={18} className="text-[#5EC4B6] mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle size={18} className="text-[#A0A0B5] mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-[#EF9F27]">{e.body}</div>
                    <div className="font-serif-display text-base text-white mt-0.5">{e.name}</div>
                    <div className="text-xs text-[#A0A0B5] mt-1">
                      Age: {e.age_window}
                      {e.qualification ? ` · ${e.qualification}` : ""}
                      {e.reason ? ` · ${e.reason}` : ""}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
