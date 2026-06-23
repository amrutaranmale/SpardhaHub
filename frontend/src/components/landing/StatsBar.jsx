import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "50L+", label: "Aspirants" },
  { value: "9", label: "Exams Covered" },
  { value: "3", label: "Languages" },
  { value: "Free", label: "Forever" },
];

export default function StatsBar() {
  return (
    <section
      id="stats"
      data-testid="stats-section"
      className="relative border-y border-white/8 bg-white/[0.015]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="text-center md:border-r md:last:border-r-0 border-white/8"
          >
            <div className="font-serif-display text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gold-gradient">{s.value}</span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.22em] text-[#A0A0B5]">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
