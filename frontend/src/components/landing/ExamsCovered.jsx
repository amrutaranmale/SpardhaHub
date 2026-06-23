import React from "react";
import { motion } from "framer-motion";
import {
  Landmark,
  Scale,
  Plane,
  Shield,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const CATEGORIES = [
  {
    body: "UPSC",
    full: "Union Public Service Commission",
    icon: Landmark,
    accent: "#EF9F27",
    blurb: "Central civil, defence, engineering, medical & forest services.",
    exams: [
      { code: "CSE", name: "Civil Services Examination", tag: "IAS · IPS · IFS" },
      { code: "CDS", name: "Combined Defence Services", tag: "Army · Navy · Air Force" },
      { code: "ESE / IES", name: "Engineering Services Examination", tag: "Group A Engineer" },
      { code: "CAPF (AC)", name: "Central Armed Police Forces", tag: "Assistant Commandants" },
      { code: "NDA", name: "National Defence Academy", tag: "After 12th · Defence" },
      { code: "CMS", name: "Combined Medical Services", tag: "MBBS Doctors" },
      { code: "IFoS", name: "Indian Forest Service", tag: "Forest Conservation" },
    ],
  },
  {
    body: "MPSC",
    full: "Maharashtra Public Service Commission",
    icon: Scale,
    accent: "#7F77DD",
    blurb: "All Maharashtra state cadre, technical & subordinate posts.",
    exams: [
      { code: "Rajyaseva", name: "Civil Services Gazetted Combined Exam", tag: "Group A" },
      { code: "Group B", name: "Non-Gazetted Combined Exam", tag: "PSI · STI · ASO" },
      { code: "Group C", name: "Group C Combined Exam", tag: "Tax Asst. · Clerk-Typist" },
      { code: "Technical", name: "Technical & Engineering Services Exam", tag: "Civil · Mech · Elec" },
      { code: "Subordinate", name: "Subordinate Services Examination", tag: "Multiple Cadres" },
    ],
  },
  {
    body: "IAF",
    full: "Indian Air Force",
    icon: Plane,
    accent: "#5EC4B6",
    blurb: "Flying, technical, ground duty & special-entry routes.",
    exams: [
      { code: "AFCAT", name: "Air Force Common Admission Test", tag: "Officer Entry" },
      { code: "FTS", name: "Fast Track Selection", tag: "Direct Officer" },
      { code: "NCC Special", name: "IAF NCC Special Entry", tag: "NCC 'C' Cert. Holders" },
      { code: "Meteorology", name: "IAF Meteorology Entry", tag: "Met Branch Officer" },
    ],
  },
  {
    body: "Indian Army",
    full: "Indian Army Officer Entries",
    icon: Shield,
    accent: "#F7C97E",
    blurb: "Direct-entry routes for engineers, lawyers & graduates.",
    exams: [
      { code: "TGC", name: "Technical Graduate Course", tag: "BE / B.Tech" },
      { code: "SSC Tech", name: "Short Service Commission (Tech)", tag: "Men & Women" },
      { code: "JAG", name: "Judge Advocate General Entry", tag: "LLB Graduates" },
      { code: "NCC Special", name: "Army NCC Special Entry", tag: "NCC 'C' Cert. Holders" },
    ],
  },
  {
    body: "Engineering",
    full: "Engineering, PSU & Diploma Exams",
    icon: Cpu,
    accent: "#5EC4B6",
    blurb: "GATE, ISRO, BARC, DRDO, SSC JE, State AE/JE and Polytechnic entries.",
    exams: [
      { code: "GATE", name: "Graduate Aptitude Test in Engineering", tag: "B.Tech / M.Sc." },
      { code: "ISRO SC", name: "ISRO Scientist/Engineer SC", tag: "BE/B.Tech 65%+" },
      { code: "BARC OCES", name: "BARC OCES / DGFS", tag: "Atomic Energy" },
      { code: "DRDO SET", name: "DRDO Scientist Entry Test", tag: "Defence R&D" },
      { code: "SSC JE", name: "SSC Junior Engineer", tag: "Diploma / BE" },
      { code: "State AE/JE", name: "State Engineering Services", tag: "Civil · Mech · Elec" },
      { code: "Diploma", name: "Polytechnic Diploma Entrance", tag: "After Class 10" },
    ],
  },
];

function CategoryCard({ cat, index }) {
  const Icon = cat.icon;
  return (
    <motion.div
      data-testid={`category-${cat.body.toLowerCase().replace(/\s+/g, "-")}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative glass-strong rounded-3xl p-8 md:p-10 border border-white/8 overflow-hidden"
    >
      {/* Accent glow */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle, ${cat.accent}30, transparent 60%)`,
          filter: "blur(50px)",
        }}
      />

      {/* Header */}
      <div className="relative flex items-start gap-4 mb-7 pb-7 border-b border-white/8">
        <div className="icon-ring inline-block flex-shrink-0">
          <div className="icon-ring-inner w-14 h-14 flex items-center justify-center">
            <Icon size={24} style={{ color: cat.accent }} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="font-serif-display text-3xl font-bold tracking-tight"
              style={{ color: cat.accent }}
            >
              {cat.body}
            </h3>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10 text-[#A0A0B5]">
              {cat.exams.length} exams
            </span>
          </div>
          <p className="text-sm text-white/90 leading-tight">{cat.full}</p>
          <p className="text-xs text-[#A0A0B5] mt-1.5 leading-relaxed">
            {cat.blurb}
          </p>
        </div>
      </div>

      {/* Exam list */}
      <ul className="relative space-y-2.5">
        {cat.exams.map((e, i) => (
          <motion.li
            key={e.code}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
          >
            <CheckCircle2
              size={16}
              className="flex-shrink-0 mt-0.5"
              style={{ color: cat.accent, opacity: 0.85 }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-semibold text-white text-sm">
                  {cat.body} {e.code}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#7a7a92]">
                  {e.tag}
                </span>
              </div>
              <p className="text-xs text-[#A0A0B5] mt-0.5">{e.name}</p>
            </div>
            <ArrowUpRight
              size={14}
              className="flex-shrink-0 mt-1 text-[#7F77DD] opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all"
            />
          </motion.li>
        ))}
      </ul>

      <a
        href="#signup"
        data-testid={`category-cta-${cat.body.toLowerCase().replace(/\s+/g, "-")}`}
        className="relative inline-flex items-center gap-2 mt-7 text-sm font-semibold text-[#EF9F27] hover:text-[#F7C97E] transition-colors"
      >
        Get {cat.body} roadmap
        <ArrowUpRight size={14} />
      </a>
    </motion.div>
  );
}

export default function ExamsCovered() {
  const total = CATEGORIES.reduce((s, c) => s + c.exams.length, 0);
  return (
    <section
      id="exams"
      data-testid="exams-section"
      className="relative py-28 md:py-32 px-6 lg:px-10"
    >
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
              {total}+ Exams · 4 Governing Bodies
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl text-white mt-3 leading-[1.1]">
              Every exam.{" "}
              <span className="text-gold-gradient italic">Every entry.</span>{" "}
              One platform.
            </h2>
            <p className="text-base text-[#A0A0B5] mt-5 leading-relaxed">
              From UPSC civil services to IAF flying branch — we cover every major
              Indian government and defence exam with its own roadmap, syllabus tracker,
              mock tests and curated study videos.
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.body} cat={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
