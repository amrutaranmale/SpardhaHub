import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Flame } from "lucide-react";

// Realistic 2026 exam dates
const EXAMS = [
  {
    code: "UPSC",
    name: "UPSC Civil Services Prelims",
    date: "2026-05-24T09:30:00+05:30",
    accent: "#EF9F27",
    tag: "Most Prestigious",
  },
  {
    code: "MPSC",
    name: "MPSC State Services Prelims",
    date: "2026-04-12T11:00:00+05:30",
    accent: "#7F77DD",
    tag: "Maharashtra",
  },
  {
    code: "SSC",
    name: "SSC CGL Tier-I",
    date: "2026-07-08T10:00:00+05:30",
    accent: "#5EC4B6",
    tag: "Central Govt",
  },
];

function useCountdown(target) {
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function diff(target) {
  const total = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((total / (1000 * 60)) % 60);
  const secs = Math.floor((total / 1000) % 60);
  return { days, hours, mins, secs };
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function CountdownCard({ exam, index }) {
  const t = useCountdown(exam.date);
  const dateStr = new Date(exam.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      data-testid={`countdown-card-${exam.code.toLowerCase()}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8 }}
      className="relative glass-strong rounded-2xl p-6 overflow-hidden group"
    >
      {/* Accent glow */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-30 group-hover:opacity-50 transition-opacity"
        style={{ background: `radial-gradient(circle, ${exam.accent}, transparent 60%)`, filter: "blur(20px)" }}
      />

      <div className="flex items-start justify-between mb-5 relative">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-serif-display text-2xl font-bold tracking-tight"
              style={{ color: exam.accent }}
            >
              {exam.code}
            </span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10 text-[#A0A0B5]">
              {exam.tag}
            </span>
          </div>
          <p className="text-sm text-white/90 leading-tight">{exam.name}</p>
          <p className="text-xs text-[#A0A0B5] mt-1 flex items-center gap-1">
            <Calendar size={12} /> {dateStr}
          </p>
        </div>
        <Flame size={18} className="text-[#EF9F27] opacity-70" />
      </div>

      <div className="grid grid-cols-4 gap-2 relative">
        {[
          { label: "Days", v: t.days },
          { label: "Hrs", v: pad(t.hours) },
          { label: "Min", v: pad(t.mins) },
          { label: "Sec", v: pad(t.secs) },
        ].map((u) => (
          <div
            key={u.label}
            className="bg-white/[0.04] border border-white/8 rounded-lg py-3 text-center"
          >
            <div className="font-serif-display text-2xl font-bold tabular-nums text-white">
              {u.v}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-[#A0A0B5] mt-0.5">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CountdownStrip() {
  return (
    <section
      id="countdown"
      data-testid="countdown-section"
      className="relative -mt-16 sm:-mt-24 z-20 px-6 lg:px-10 pb-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.22em] text-[#7F77DD]">
            Exam Countdown · 2026
          </span>
          <h2 className="font-serif-display text-3xl md:text-4xl mt-2 text-white">
            Every second matters. <span className="text-gold-gradient italic">Start now.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EXAMS.map((e, i) => (
            <CountdownCard key={e.code} exam={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
