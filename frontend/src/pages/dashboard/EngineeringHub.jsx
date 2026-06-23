import React, { useEffect, useState } from "react";
import { Cpu, Radio, Cog, Building2, Zap, FlaskConical, GraduationCap, BookOpen, ChevronRight, ChevronDown, Loader2, ArrowLeft, Library } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { toast } from "sonner";

const ICON_MAP = { Cpu, Radio, Cog, Building2, Zap, FlaskConical };

function BranchIcon({ name, ...props }) {
  const I = ICON_MAP[name] || Cpu;
  return <I {...props} />;
}

export default function EngineeringHub() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBranch, setActiveBranch] = useState(null); // name string
  const [track, setTrack] = useState("diploma");
  const [content, setContent] = useState(null);
  const [openSub, setOpenSub] = useState({});
  const [openChap, setOpenChap] = useState({});
  const [activeTopic, setActiveTopic] = useState(null);

  useEffect(() => {
    api.get("/engineering").then((r) => setBranches(r.data?.branches || [])).finally(() => setLoading(false));
  }, []);

  const slug = (s) => s.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");

  const loadBranch = async (name, tr) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/engineering/${slug(name)}`, { params: { track: tr } });
      setContent(data);
      const first = data.subjects?.[0];
      if (first) {
        setOpenSub({ [first.name]: true });
        const firstCh = first.chapters?.[0];
        if (firstCh) {
          setOpenChap({ [`${first.name}::${firstCh.name}`]: true });
          setActiveTopic(firstCh.topics?.[0] || null);
        }
      }
    } catch (err) {
      const msg = formatApiError(err);
      toast.error(msg);
      // If degree not available, try diploma; if diploma not available, try degree
      if (msg.includes("not available")) {
        const other = tr === "diploma" ? "degree" : "diploma";
        setTrack(other);
        try {
          const { data } = await api.get(`/engineering/${slug(name)}`, { params: { track: other } });
          setContent(data);
        } catch {}
      }
    } finally {
      setLoading(false);
    }
  };

  const openBranch = (b, tr = "diploma") => {
    const useTrack = b.has_diploma ? "diploma" : "degree";
    const initial = b.has_diploma && b.has_degree ? tr : useTrack;
    setActiveBranch(b.name);
    setTrack(initial);
    loadBranch(b.name, initial);
  };

  // Branches grid
  if (!activeBranch) {
    return (
      <div data-testid="engineering-page">
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap size={22} className="text-[#5EC4B6]" />
          <h1 className="font-serif-display text-3xl">Engineering Hub</h1>
        </div>
        <p className="text-[#A0A0B5] mb-7 text-sm">
          Branch-wise Diploma & Degree study materials. Pick your stream to start.
        </p>

        {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Loading branches...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((b) => (
            <button
              key={b.name}
              data-testid={`branch-${slug(b.name)}`}
              onClick={() => openBranch(b)}
              className="glass rounded-2xl p-6 border border-white/8 hover:border-white/20 hover:-translate-y-1 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="icon-ring inline-block">
                  <div className="icon-ring-inner w-12 h-12 flex items-center justify-center">
                    <BranchIcon name={b.icon} size={20} style={{ color: b.accent }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {b.has_diploma && <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#A0A0B5]">Diploma</span>}
                  {b.has_degree && <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[#A0A0B5]">Degree</span>}
                </div>
              </div>
              <h3 className="font-serif-display text-lg text-white">{b.name}</h3>
              <p className="text-xs text-[#A0A0B5] mt-2">Tap to view subjects, chapters & study capsules.</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Branch detail view
  return (
    <div data-testid="engineering-branch-page">
      <button
        data-testid="back-to-branches"
        onClick={() => { setActiveBranch(null); setContent(null); setActiveTopic(null); }}
        className="inline-flex items-center gap-1.5 text-xs text-[#A0A0B5] hover:text-white mb-4"
      >
        <ArrowLeft size={14} /> All branches
      </button>

      <div className="flex items-center gap-3 mb-2">
        {content && <BranchIcon name={content.icon} size={22} style={{ color: content.accent }} />}
        <h1 className="font-serif-display text-3xl">{activeBranch}</h1>
      </div>
      <p className="text-[#A0A0B5] mb-4 text-sm">
        Branch-wise study capsules with key points, summaries and book recommendations.
      </p>

      {/* Track switcher */}
      <div className="flex gap-2 mb-6">
        {["diploma", "degree"].map((t) => {
          const branch = branches.find((b) => b.name === activeBranch);
          const enabled = branch ? (t === "diploma" ? branch.has_diploma : branch.has_degree) : true;
          return (
            <button
              key={t}
              disabled={!enabled}
              data-testid={`track-${t}`}
              onClick={() => { setTrack(t); loadBranch(activeBranch, t); }}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                track === t
                  ? "bg-[#EF9F27] text-[#1a1a2e] border-transparent font-semibold"
                  : enabled
                    ? "bg-white/[0.03] text-[#C7C7D6] border-white/10 hover:border-white/25 hover:text-white"
                    : "bg-white/[0.02] text-[#5a5a72] border-white/5 cursor-not-allowed"
              }`}
            >
              {t === "diploma" ? "Polytechnic / Diploma" : "Degree (B.E. / B.Tech)"}
            </button>
          );
        })}
      </div>

      {loading && <div className="text-[#A0A0B5] flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> Loading...</div>}

      {content && !loading && (
        <>
          <p className="text-xs text-[#A0A0B5] mb-6 uppercase tracking-widest">Duration · {content.duration}</p>

          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Tree */}
            <aside className="space-y-3 lg:max-h-[calc(100vh-260px)] lg:overflow-y-auto pr-2">
              {content.subjects.map((sub) => {
                const subOpen = !!openSub[sub.name];
                return (
                  <div key={sub.name} className="glass rounded-2xl p-3 border border-white/8">
                    <button
                      onClick={() => setOpenSub((o) => ({ ...o, [sub.name]: !subOpen }))}
                      className="w-full flex items-center gap-1.5 text-left text-sm text-white py-1 font-medium"
                    >
                      {subOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      <BookOpen size={13} className="text-[#7F77DD]" />
                      <span className="font-serif-display">{sub.name}</span>
                    </button>
                    {subOpen && (
                      <div className="ml-4 mt-1.5 space-y-1.5">
                        {sub.chapters.map((ch) => {
                          const key = `${sub.name}::${ch.name}`;
                          const chOpen = !!openChap[key];
                          return (
                            <div key={ch.name}>
                              <button
                                onClick={() => setOpenChap((o) => ({ ...o, [key]: !chOpen }))}
                                className="w-full flex items-center gap-1 text-left text-xs text-[#C7C7D6] hover:text-white py-1"
                              >
                                {chOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                <span>{ch.name}</span>
                              </button>
                              {chOpen && (
                                <ul className="ml-4 mt-1 space-y-0.5">
                                  {ch.topics.map((t) => (
                                    <li key={t.id}>
                                      <button
                                        data-testid={`eng-topic-${t.id}`}
                                        onClick={() => setActiveTopic(t)}
                                        className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                                          activeTopic?.id === t.id ? "bg-[#EF9F27]/12 text-[#EF9F27]" : "text-[#A0A0B5] hover:text-white hover:bg-white/[0.04]"
                                        }`}
                                      >
                                        {t.title}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </aside>

            {/* Topic content */}
            <main className="min-w-0">
              {activeTopic ? (
                <article data-testid="eng-topic-content" className="glass-strong rounded-2xl p-6 md:p-8 border border-white/10">
                  <h2 className="font-serif-display text-2xl md:text-3xl text-white leading-tight mb-4">
                    {activeTopic.title}
                  </h2>
                  <p className="text-[#C7C7D6] text-base leading-relaxed">{activeTopic.summary}</p>

                  {activeTopic.key_points?.length > 0 && (
                    <section className="mt-6">
                      <h3 className="font-serif-display text-lg text-white mb-3">Key Points</h3>
                      <ul className="space-y-2">
                        {activeTopic.key_points.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#C7C7D6]">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: content.accent }} />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {activeTopic.books?.length > 0 && (
                    <section className="mt-6">
                      <h3 className="font-serif-display text-lg text-white mb-3 inline-flex items-center gap-2">
                        <Library size={16} className="text-[#7F77DD]" /> Recommended Books
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {activeTopic.books.map((b, i) => (
                          <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#C7C7D6]">{b}</span>
                        ))}
                      </div>
                    </section>
                  )}
                </article>
              ) : (
                <div className="glass rounded-2xl p-10 border border-white/8 text-center text-[#A0A0B5]">
                  Pick a topic from the left.
                </div>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
}
