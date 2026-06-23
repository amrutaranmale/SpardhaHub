import React, { useEffect, useState } from "react";
import { BookOpen, ChevronRight, ChevronDown, Loader2, CheckCircle2, Circle, Library } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ExamPicker from "@/components/ExamPicker";

export default function StudyCenter() {
  const { user } = useAuth();
  const [code, setCode] = useState(user?.target_exam || "UPSC-CSE");
  const [syl, setSyl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openChap, setOpenChap] = useState({});
  const [active, setActive] = useState(null); // current topic
  const [done, setDone] = useState(new Set());

  const load = async (c) => {
    try {
      setLoading(true);
      const [s, p] = await Promise.all([
        api.get(`/syllabus/${c}`),
        api.get("/progress").catch(() => ({ data: { by_exam: {} } })),
      ]);
      setSyl(s.data);
      const ep = (p.data?.by_exam?.[c.toUpperCase()] || []);
      setDone(new Set(ep.filter((x) => x.completed).map((x) => x.topic)));
      // Open first chapter by default
      if (s.data.subjects?.[0]?.chapters?.[0]) {
        const key = `${s.data.subjects[0].name}::${s.data.subjects[0].chapters[0].name}`;
        setOpenChap({ [key]: true });
        const firstTopic = s.data.subjects[0].chapters[0].topics?.[0];
        if (firstTopic) setActive(firstTopic);
      } else {
        setActive(null);
      }
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (code) load(code); }, [code]);

  const toggleDone = async (topicId) => {
    const nowDone = !done.has(topicId);
    const next = new Set(done);
    if (nowDone) next.add(topicId); else next.delete(topicId);
    setDone(next);
    try {
      await api.post("/progress", { exam_code: code, topic: topicId, completed: nowDone });
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const totalTopics = syl?.subjects?.reduce((s, sub) => s + sub.chapters.reduce((a, ch) => a + (ch.topics?.length || 0), 0), 0) || 0;
  const completed = done.size;
  const pct = totalTopics ? Math.round((completed / totalTopics) * 100) : 0;

  return (
    <div data-testid="study-page">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen size={22} className="text-[#5EC4B6]" />
        <h1 className="font-serif-display text-3xl">Study Center</h1>
      </div>
      <p className="text-[#A0A0B5] mb-7 text-sm">
        Pick your exam → browse subjects → read structured lessons. Tick topics as you finish.
      </p>

      <div className="glass rounded-2xl p-5 border border-white/8 mb-6">
        <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5] mb-1.5 block">Exam</label>
        <ExamPicker value={code} onChange={setCode} testid="study-exam-select" />
      </div>

      {syl && (
        <div className="glass-strong rounded-2xl p-4 border border-white/10 mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-sm">
            <span className="text-[#A0A0B5]">Exam:</span>{" "}
            <span className="text-white font-medium">{syl.name}</span>
          </span>
          <span className="text-sm">
            <span className="text-[#A0A0B5]">Body:</span>{" "}
            <span className="text-white font-medium">{syl.body}</span>
          </span>
          <span className="text-sm ml-auto inline-flex items-center gap-2">
            <span className="text-[#A0A0B5]">Progress:</span>
            <span className="font-serif-display text-xl text-gold-gradient" data-testid="study-progress">{pct}%</span>
            <span className="text-xs text-[#A0A0B5]">({completed}/{totalTopics})</span>
          </span>
        </div>
      )}

      {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Loading syllabus...</div>}

      {syl && !loading && (
        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          {/* Syllabus tree */}
          <aside className="space-y-4 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto pr-2" data-testid="syllabus-tree">
            {syl.subjects.map((sub) => (
              <div key={sub.name} className="glass rounded-2xl p-4 border border-white/8">
                <h3 className="font-serif-display text-base text-white mb-2">{sub.name}</h3>
                <div className="space-y-1.5">
                  {sub.chapters.map((ch) => {
                    const key = `${sub.name}::${ch.name}`;
                    const isOpen = !!openChap[key];
                    return (
                      <div key={ch.name}>
                        <button
                          onClick={() => setOpenChap((o) => ({ ...o, [key]: !isOpen }))}
                          className="w-full flex items-center gap-1.5 text-left text-sm text-[#C7C7D6] hover:text-white py-1.5 transition-colors"
                        >
                          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          <span className="font-medium">{ch.name}</span>
                          <span className="ml-auto text-[10px] text-[#7a7a92] uppercase tracking-widest">{ch.topics?.length || 0}</span>
                        </button>
                        {isOpen && (
                          <ul className="ml-5 mt-1 mb-2 space-y-0.5">
                            {ch.topics.map((t) => {
                              const checked = done.has(t.id);
                              const isActive = active?.id === t.id;
                              return (
                                <li key={t.id}>
                                  <button
                                    data-testid={`topic-link-${t.id}`}
                                    onClick={() => setActive(t)}
                                    className={`w-full flex items-start gap-2 px-2 py-1.5 rounded-lg text-xs text-left transition-colors ${
                                      isActive ? "bg-[#EF9F27]/12 text-[#EF9F27]" : "text-[#A0A0B5] hover:text-white hover:bg-white/[0.04]"
                                    }`}
                                  >
                                    {checked ? <CheckCircle2 size={13} className="text-[#5EC4B6] mt-0.5 flex-shrink-0" /> : <Circle size={13} className="mt-0.5 flex-shrink-0" />}
                                    <span className="leading-snug">{t.title}</span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </aside>

          {/* Active topic content */}
          <main className="min-w-0">
            {active ? (
              <article data-testid="topic-content" className="glass-strong rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h2 className="font-serif-display text-2xl md:text-3xl text-white leading-tight">{active.title}</h2>
                  <button
                    data-testid="topic-mark-done"
                    onClick={() => toggleDone(active.id)}
                    className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all ${
                      done.has(active.id)
                        ? "bg-[#5EC4B6]/15 text-[#5EC4B6] border border-[#5EC4B6]/35"
                        : "bg-white/[0.04] text-[#C7C7D6] border border-white/10 hover:border-[#EF9F27]/40 hover:text-[#EF9F27]"
                    }`}
                  >
                    {done.has(active.id) ? <><CheckCircle2 size={14} /> Done</> : <><Circle size={14} /> Mark done</>}
                  </button>
                </div>

                <p className="text-[#C7C7D6] text-base leading-relaxed">{active.summary}</p>

                {active.key_points?.length > 0 && (
                  <section className="mt-6">
                    <h3 className="font-serif-display text-lg text-white mb-3">Key Points</h3>
                    <ul className="space-y-2">
                      {active.key_points.map((p, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#C7C7D6]">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#EF9F27]" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {active.books?.length > 0 && (
                  <section className="mt-6">
                    <h3 className="font-serif-display text-lg text-white mb-3 inline-flex items-center gap-2">
                      <Library size={16} className="text-[#7F77DD]" /> Recommended Books
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {active.books.map((b, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#C7C7D6]">{b}</span>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            ) : (
              <div className="glass rounded-2xl p-10 border border-white/8 text-center text-[#A0A0B5]">
                Pick a topic from the left to start reading.
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
