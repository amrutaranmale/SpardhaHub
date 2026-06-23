import React, { useEffect, useState } from "react";
import { TrendingUp, Loader2, CheckCircle2, Circle } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ExamPicker from "@/components/ExamPicker";

export default function ProgressTracker() {
  const { user } = useAuth();
  const [code, setCode] = useState(user?.target_exam || "UPSC-CSE");
  const [plan, setPlan] = useState(null);
  const [done, setDone] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const load = async (c) => {
    try {
      setLoading(true);
      const [r, p] = await Promise.all([api.get(`/roadmap/${c}`), api.get("/progress")]);
      setPlan(r.data);
      const examProgress = (p.data?.by_exam?.[c.toUpperCase()] || []);
      setDone(new Set(examProgress.filter((x) => x.completed).map((x) => x.topic)));
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (code) load(code); }, [code]);

  const toggle = async (topic) => {
    const nowDone = !done.has(topic);
    const next = new Set(done);
    if (nowDone) next.add(topic); else next.delete(topic);
    setDone(next);
    try {
      await api.post("/progress", { exam_code: code, topic, completed: nowDone });
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const allTopics = plan ? plan.phases.flatMap((p) => p.tasks) : [];
  const completion = allTopics.length ? Math.round((done.size / allTopics.length) * 100) : 0;

  return (
    <div data-testid="progress-page">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp size={22} className="text-[#7F77DD]" />
        <h1 className="font-serif-display text-3xl">Progress Tracker</h1>
      </div>
      <p className="text-[#A0A0B5] mb-7 text-sm">
        Tick off topics as you complete them. Your progress is auto-saved.
      </p>

      <div className="glass rounded-2xl p-5 border border-white/8 mb-6">
        <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5] mb-1.5 block">Exam</label>
        <ExamPicker value={code} onChange={setCode} testid="progress-exam-select" />
      </div>

      {plan && (
        <div className="glass-strong rounded-2xl p-5 border border-white/10 mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm text-[#A0A0B5]">Overall completion</span>
            <span className="font-serif-display text-2xl text-gold-gradient" data-testid="progress-percent">{completion}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${completion}%`,
                background: "linear-gradient(90deg, #EF9F27, #7F77DD)",
              }}
            />
          </div>
          <div className="text-xs text-[#A0A0B5] mt-2">
            {done.size} of {allTopics.length} topics done
          </div>
        </div>
      )}

      {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Loading...</div>}

      {plan && !loading && (
        <div className="space-y-5" data-testid="progress-topics">
          {plan.phases.map((ph, i) => (
            <div key={i} className="glass rounded-2xl p-5 border border-white/8">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-serif-display text-lg text-white">{ph.phase}</h3>
                <span className="text-[10px] uppercase tracking-widest text-[#A0A0B5]">Month {ph.months}</span>
              </div>
              <ul className="space-y-2">
                {ph.tasks.map((t) => {
                  const checked = done.has(t);
                  return (
                    <li key={t}>
                      <button
                        data-testid={`topic-${t.replace(/\W+/g, "-").toLowerCase().slice(0, 40)}`}
                        onClick={() => toggle(t)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${
                          checked ? "bg-[#5EC4B6]/10 border-[#5EC4B6]/30" : "bg-white/[0.02] border-white/8 hover:bg-white/[0.05]"
                        }`}
                      >
                        {checked ? (
                          <CheckCircle2 size={18} className="text-[#5EC4B6] mt-0.5 flex-shrink-0" />
                        ) : (
                          <Circle size={18} className="text-[#7a7a92] mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${checked ? "text-white/70 line-through" : "text-[#C7C7D6]"}`}>{t}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
