import React from "react";
import { motion } from "framer-motion";
import {
  Landmark,
  Scale,
  Building2,
  Calculator,
  Banknote,
  TrainFront,
  ShieldHalf,
  GraduationCap,
  BookOpenCheck,
  ArrowUpRight,
} from "lucide-react";

const EXAMS = [
  {
    code: "UPSC",
    name: "UPSC Civil Services",
    desc: "IAS, IPS, IFS · Prelims, Mains, Interview",
    posts: "1,000+ posts/yr",
    icon: Landmark,
    accent: "#EF9F27",
    tags: ["GS I-IV", "Optional", "CSAT", "Essay"],
  },
  {
    code: "MPSC",
    name: "MPSC State Services",
    desc: "Maharashtra Group A & B officer cadres",
    posts: "800+ posts/yr",
    icon: Scale,
    accent: "#7F77DD",
    tags: ["Marathi", "GS", "Optional", "Interview"],
  },
  {
    code: "SSC",
    name: "SSC CGL / CHSL / MTS",
    desc: "Central Govt Group B & C ministerial posts",
    posts: "30,000+ posts/yr",
    icon: Building2,
    accent: "#5EC4B6",
    tags: ["Quant", "Reasoning", "English", "GA"],
  },
  {
    code: "CA",
    name: "CA Foundation / Inter / Final",
    desc: "Institute of Chartered Accountants of India",
    posts: "Professional",
    icon: Calculator,
    accent: "#F7C97E",
    tags: ["Accounts", "Law", "Tax", "Audit"],
  },
  {
    code: "BANK",
    name: "IBPS · SBI · RBI",
    desc: "PO, Clerk, SO, Grade B exams",
    posts: "20,000+ posts/yr",
    icon: Banknote,
    accent: "#7F77DD",
    tags: ["Reasoning", "Quant", "English", "Banking GA"],
  },
  {
    code: "RAILWAY",
    name: "RRB NTPC · Group D · ALP",
    desc: "Indian Railways recruitment exams",
    posts: "1,00,000+ posts/yr",
    icon: TrainFront,
    accent: "#EF9F27",
    tags: ["Maths", "Reasoning", "GS", "Technical"],
  },
  {
    code: "DEFENCE",
    name: "NDA · CDS · AFCAT",
    desc: "Indian Army, Navy & Air Force entries",
    posts: "5,000+ posts/yr",
    icon: ShieldHalf,
    accent: "#5EC4B6",
    tags: ["Maths", "GAT", "English", "GK"],
  },
  {
    code: "TEACHING",
    name: "CTET · UGC NET · TET",
    desc: "Teaching eligibility for schools & colleges",
    posts: "Eligibility cert.",
    icon: GraduationCap,
    accent: "#F7C97E",
    tags: ["Pedagogy", "CDP", "Subject", "Reasoning"],
  },
  {
    code: "STATE",
    name: "State PSC (UP, BPSC, TNPSC...)",
    desc: "Other state public service commissions",
    posts: "10,000+ posts/yr",
    icon: BookOpenCheck,
    accent: "#7F77DD",
    tags: ["Regional", "State GS", "Optional", "Essay"],
  },
];

function ExamCard({ exam, index }) {
  const Icon = exam.icon;
  return (
    <motion.a
      href="#signup"
      data-testid={`exam-card-${exam.code.toLowerCase()}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="group relative glass rounded-2xl p-6 border border-white/8 hover:border-white/20 transition-all block"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <div className="icon-ring inline-block">
          <div className="icon-ring-inner w-12 h-12 flex items-center justify-center">
            <Icon size={20} style={{ color: exam.accent }} />
          </div>
        </div>
        <ArrowUpRight
          size={16}
          className="text-[#7F77DD] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all"
        />
      </div>

      {/* Title */}
      <div className="flex items-baseline gap-2 mb-1">
        <span
          className="font-serif-display text-xl font-bold tracking-tight"
          style={{ color: exam.accent }}
        >
          {exam.code}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[#7a7a92]">
          {exam.posts}
        </span>
      </div>
      <h3 className="font-serif-display text-lg text-white leading-tight">
        {exam.name}
      </h3>
      <p className="text-xs text-[#A0A0B5] mt-2 leading-relaxed">{exam.desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {exam.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-white/[0.04] border border-white/8 text-[#C7C7D6]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export default function ExamsCovered() {
  return (
    <section
      id="exams"
      data-testid="exams-section"
      className="relative py-28 md:py-32 px-6 lg:px-10"
    >
      {/* Accent glow */}
      <div
        className="absolute top-32 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(127,119,221,0.20), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] text-[#7F77DD]">
              9 Exams · 1 Platform
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl text-white mt-3 leading-[1.1]">
              Whichever exam you&apos;re cracking,{" "}
              <span className="text-gold-gradient italic">we&apos;ve got the path.</span>
            </h2>
            <p className="text-base text-[#A0A0B5] mt-5 leading-relaxed">
              From IAS to ICAI, NDA to NET — every major Indian competitive exam comes
              with its own roadmap, syllabus tracker, mock tests, and study videos
              tailored for that very paper.
            </p>
          </div>
          <a
            href="#signup"
            data-testid="exams-cta"
            className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold self-start md:self-end"
          >
            Pick your exam
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXAMS.map((e, i) => (
            <ExamCard key={e.code} exam={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
