import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroBackground from "@/components/landing/HeroBackground";
import DemoModal from "@/components/landing/DemoModal";
import { useAuth } from "@/contexts/AuthContext";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();

  const goPrimary = () => nav(user ? "/dashboard" : "/signup");

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-36 pb-24"
    >
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div variants={item} className="flex justify-center mb-7">
          <span
            data-testid="hero-eyebrow"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.18em] text-[#C7C7D6]"
          >
            <Sparkles size={14} className="text-[#EF9F27]" />
            India&apos;s #1 Exam Prep Platform · 2026
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          data-testid="hero-headline"
          className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          Crack{" "}
          <span className="text-gold-gradient italic">UPSC, MPSC, CA</span>
          <br className="hidden sm:block" />
          <span className="text-white"> & </span>
          <span className="text-gold-gradient italic">More</span>
        </motion.h1>

        <motion.p
          variants={item}
          data-testid="hero-subheadline"
          className="mt-7 text-base md:text-lg text-[#A0A0B5] max-w-2xl mx-auto leading-relaxed"
        >
          Personalized roadmaps · Live vacancy tracker · AI-powered study planner.
          Built for serious aspirants, free for everyone.
        </motion.p>

        <motion.div variants={item} id="signup" className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            data-testid="hero-primary-cta"
            onClick={goPrimary}
            className="btn-gold inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl whitespace-nowrap"
          >
            {user ? "Go to Dashboard" : "Start Your Journey Free"}
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            data-testid="hero-demo-cta"
            onClick={() => setDemoOpen(true)}
            className="btn-outline-soft inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
          >
            <span className="w-7 h-7 rounded-full bg-white/8 inline-flex items-center justify-center">
              <Play size={12} className="text-[#EF9F27] ml-[1px]" fill="#EF9F27" />
            </span>
            Watch Demo
          </button>
        </motion.div>

        <motion.div variants={item} className="mt-5 inline-flex items-center gap-2 text-xs text-[#A0A0B5]">
          <ShieldCheck size={14} className="text-[#7F77DD]" />
          No credit card · Free forever · Made in India 🇮🇳
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-[#7a7a92]"
        >
          <span>Trusted by 50L+ aspirants</span>
          <span className="w-1 h-1 rounded-full bg-[#3a3a55]" />
          <span>Featured · India Today</span>
          <span className="w-1 h-1 rounded-full bg-[#3a3a55]" />
          <span>Backed by educators</span>
        </motion.div>
      </motion.div>

      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </section>
  );
}
