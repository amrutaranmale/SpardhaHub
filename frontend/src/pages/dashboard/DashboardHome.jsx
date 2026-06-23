import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Map, TrendingUp, Globe, UserCheck, Calculator, BellRing, BookOpen, Newspaper, GraduationCap, Library, ArrowUpRight, Flame } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const TILES = [
  { to: "/dashboard/study", title: "Study Center", desc: "Browse syllabi → chapters → topics. Read inline lessons.", icon: Library, accent: "#5EC4B6" },
  { to: "/dashboard/engineering", title: "Engineering Hub", desc: "Branch-wise Diploma & Degree materials (CS/IT, EC, ME, CE, EE, Chem).", icon: GraduationCap, accent: "#7F77DD" },
  { to: "/dashboard/roadmap", title: "Smart Roadmap", desc: "Phase-by-phase study plan for your target exam.", icon: Map, accent: "#EF9F27" },
  { to: "/dashboard/progress", title: "Progress Tracker", desc: "Tick off topics & watch your completion grow.", icon: TrendingUp, accent: "#7F77DD" },
  { to: "/dashboard/news", title: "Daily Exam News", desc: "Notifications, form releases, admit cards & results.", icon: Newspaper, accent: "#EF9F27" },
  { to: "/dashboard/current-affairs", title: "Daily Current Affairs", desc: "Hand-curated briefs tagged to every exam.", icon: Globe, accent: "#5EC4B6" },
  { to: "/dashboard/eligibility", title: "Age Eligibility Checker", desc: "Instantly see which exams you can apply for.", icon: UserCheck, accent: "#F7C97E" },
  { to: "/dashboard/salary", title: "Salary Calculator", desc: "In-hand salary, HRA, DA — for every post.", icon: Calculator, accent: "#EF9F27" },
  { to: "/dashboard/alerts", title: "Exam Alerts", desc: "Live countdown to every upcoming exam.", icon: BellRing, accent: "#7F77DD" },
  { to: "/dashboard/lessons", title: "Study Lessons", desc: "27 structured lessons across all bodies.", icon: BookOpen, accent: "#5EC4B6" },
];

export default function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ progress: 0, alerts: [], ca: [], news: [] });

  useEffect(() => {
    (async () => {
      try {
        const [p, a, c, n] = await Promise.all([
          api.get("/progress").catch(() => ({ data: { total: 0 } })),
          api.get("/alerts"),
          api.get("/current-affairs"),
          api.get("/exam-news"),
        ]);
        setStats({
          progress: p.data?.total || 0,
          alerts: (a.data?.items || []).slice(0, 3),
          ca: (c.data?.items || []).slice(0, 3),
          news: (n.data?.items || []).slice(0, 3),
        });
      } catch {
        // ignore
      }
    })();
  }, []);

  return (
    <div data-testid="dashboard-home">
      <h1 className="font-serif-display text-3xl md:text-4xl leading-tight">
        Welcome back, <span className="text-gold-gradient italic">{user?.name?.split(" ")[0] || "Aspirant"}</span>.
      </h1>
      <p className="text-[#A0A0B5] mt-2">
        Target: <span className="text-white font-medium">{user?.target_exam || "Not set"}</span>
        {user?.dob ? ` · DOB: ${user.dob}` : ""}
      </p>

      {/* News ticker */}
      {stats.news.length > 0 && (
        <Link
          to="/dashboard/news"
          data-testid="news-ticker"
          className="mt-6 block glass rounded-2xl px-5 py-3.5 border border-[#EF9F27]/25 hover:border-[#EF9F27]/45 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold text-[#EF9F27] flex-shrink-0">
              <Newspaper size={12} /> Latest
            </span>
            <span className="flex-1 text-sm text-white truncate">
              <span className="text-[#7F77DD] mr-2">[{stats.news[0].exam}]</span>
              {stats.news[0].title}
            </span>
            <ArrowUpRight size={14} className="text-[#A0A0B5] group-hover:text-white flex-shrink-0" />
          </div>
        </Link>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <Stat label="Topics tracked" value={stats.progress} accent="#EF9F27" />
        <Stat label="Upcoming exams" value={stats.alerts.length} accent="#7F77DD" />
        <Stat label="News items" value={stats.news.length} accent="#F7C97E" />
        <Stat label="CA briefs" value={stats.ca.length} accent="#5EC4B6" />
      </div>

      <h2 className="font-serif-display text-2xl mt-10 mb-4">Your toolkit</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TILES.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              data-testid={`tile-${t.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="group glass rounded-2xl p-5 border border-white/8 hover:border-white/20 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="icon-ring inline-block">
                  <div className="icon-ring-inner w-11 h-11 flex items-center justify-center">
                    <Icon size={18} style={{ color: t.accent }} />
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-[#7F77DD] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" />
              </div>
              <h3 className="font-serif-display text-lg text-white">{t.title}</h3>
              <p className="text-xs text-[#A0A0B5] mt-1.5 leading-relaxed">{t.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent alerts */}
      {stats.alerts.length > 0 && (
        <div className="mt-10">
          <h2 className="font-serif-display text-2xl mb-4 flex items-center gap-2">
            <Flame size={18} className="text-[#EF9F27]" /> Next exams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {stats.alerts.map((a) => (
              <div key={a.code} className="glass rounded-xl p-4 border border-white/8">
                <div className="text-xs uppercase tracking-widest text-[#EF9F27]">{a.body}</div>
                <div className="font-serif-display text-base text-white mt-1">{a.name}</div>
                <div className="text-xs text-[#A0A0B5] mt-2">
                  {a.exam_date} · {a.days_left !== null ? `${a.days_left} days left` : "TBD"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="glass rounded-xl p-4 text-center border border-white/8">
      <div className="font-serif-display text-2xl font-bold" style={{ color: accent }}>{value}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#A0A0B5] mt-1">{label}</div>
    </div>
  );
}
