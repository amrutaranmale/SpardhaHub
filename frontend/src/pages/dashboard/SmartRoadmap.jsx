import React, { useEffect, useState } from "react";
import { Map, Loader2, Calendar, Sparkles } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ExamPicker from "@/components/ExamPicker";

export default function SmartRoadmap() {
  const { user } = useAuth();
  const [code, setCode] = useState(user?.target_exam || "UPSC-CSE");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlan = async (c) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/roadmap/${c}`);
      setPlan(data);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (code) fetchPlan(code); }, [code]);

  return (
    <div data-testid="roadmap-page">
      <div className="flex items-center gap-3 mb-2">
        <Map size={22} className="text-[#EF9F27]" />
        <h1 className="font-serif-display text-3xl">Smart Roadmap</h1>
      </div>
      <p className="text-[#A0A0B5] mb-7 text-sm">
        Phase-by-phase study plan personalised for your target exam.
      </p>

      <div className="glass rounded-2xl p-5 border border-white/8 mb-6">
        <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5] mb-1.5 block">Target exam</label>
        <ExamPicker value={code} onChange={setCode} testid="roadmap-exam-select" />
      </div>

      {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Loading...</div>}

      {plan && !loading && (
        <div data-testid="roadmap-result">
          <div className="glass-strong rounded-2xl p-6 border border-white/10 mb-6">
            <div className="text-xs uppercase tracking-widest text-[#EF9F27]">{plan.body}</div>
            <div className="font-serif-display text-2xl text-white mt-1">{plan.name}</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm text-[#A0A0B5]">
              <span className="inline-flex items-center gap-1.5"><Calendar size={14} className="text-[#7F77DD]" /> Exam: <span className="text-white">{plan.exam_date}</span></span>
              <span className="inline-flex items-center gap-1.5"><Sparkles size={14} className="text-[#F7C97E]" /> Form: <span className="text-white">{plan.form_window}</span></span>
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-[#EF9F27]/80 via-[#7F77DD]/60 to-[#5EC4B6]/30" />
            {plan.phases.map((ph, i) => (
              <div key={i} className="relative mb-5">
                <div className="absolute -left-[22px] top-2 w-3.5 h-3.5 rounded-full bg-[#EF9F27] border-4 border-[#1a1a2e]" />
                <div className="glass rounded-2xl p-5 border border-white/8">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-serif-display text-lg text-white">{ph.phase}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-[#A0A0B5] px-2 py-1 rounded-full border border-white/10">
                      Month {ph.months}
                    </span>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {ph.tasks.map((t, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#C7C7D6]">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#EF9F27]" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
