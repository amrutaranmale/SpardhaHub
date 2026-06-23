import React from "react";
import { motion } from "framer-motion";
import {
  Map,
  TrendingUp,
  Globe,
  UserCheck,
  Calculator,
  BellRing,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: Map,
    title: "Smart Roadmap",
    desc: "Step-by-step personalized learning paths tuned to your target exam and timeline.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracker",
    desc: "Real-time analytics on mocks, accuracy and concept mastery — see where you stand.",
  },
  {
    icon: Globe,
    title: "Daily Current Affairs",
    desc: "Bite-sized, exam-relevant daily briefs in English, Hindi and Marathi.",
  },
  {
    icon: UserCheck,
    title: "Age Eligibility Checker",
    desc: "Instantly verify if you qualify for upcoming state and central exams.",
  },
  {
    icon: Calculator,
    title: "Salary Calculator",
    desc: "Estimate in-hand salaries post 7th pay commission for every target post.",
  },
  {
    icon: BellRing,
    title: "Exam Alerts",
    desc: "Never miss a notification, form fill-up or admit card release. Ever.",
  },
];

function FeatureCard({ f, index }) {
  const Icon = f.icon;
  return (
    <motion.div
      data-testid="feature-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="feature-card glass rounded-2xl p-7 relative group"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="icon-ring inline-block">
          <div className="icon-ring-inner w-12 h-12 flex items-center justify-center">
            <Icon size={20} className="text-[#EF9F27]" />
          </div>
        </div>
        <ArrowUpRight
          size={18}
          className="text-[#7F77DD] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all"
        />
      </div>
      <h3 className="font-serif-display text-xl font-semibold text-white mb-2">
        {f.title}
      </h3>
      <p className="text-sm text-[#A0A0B5] leading-relaxed">{f.desc}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-28 md:py-36 px-6 lg:px-10"
    >
      {/* Faint backdrop accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(127,119,221,0.18), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-[#7F77DD]">
            Your Ultimate Arsenal
          </span>
          <h2 className="font-serif-display text-4xl md:text-5xl text-white mt-3 leading-[1.1]">
            Built for the way{" "}
            <span className="text-gold-gradient italic">serious aspirants</span> study.
          </h2>
          <p className="text-base text-[#A0A0B5] mt-5 leading-relaxed">
            Six tools. One mission. Every feature engineered to give you an edge —
            from the first NCERT chapter to the final interview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
