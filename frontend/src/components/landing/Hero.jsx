import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import HeroBackground from "@/components/landing/HeroBackground";
import DemoModal from "@/components/landing/DemoModal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API}/signup`, { email, source: "hero_cta" });
      toast.success(res.data?.message || "You're on the list!");
      setEmail("");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Try again.";
      toast.error(typeof msg === "string" ? msg : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Eyebrow pill */}
        <motion.div variants={item} className="flex justify-center mb-7">
          <span
            data-testid="hero-eyebrow"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.18em] text-[#C7C7D6]"
          >
            <Sparkles size={14} className="text-[#EF9F27]" />
            India&apos;s #1 Exam Prep Platform · 2026
          </span>
        </motion.div>

        {/* Headline */}
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

        {/* Sub */}
        <motion.p
          variants={item}
          data-testid="hero-subheadline"
          className="mt-7 text-base md:text-lg text-[#A0A0B5] max-w-2xl mx-auto leading-relaxed"
        >
          Personalized roadmaps · Live vacancy tracker · AI-powered study planner.
          Built for serious aspirants, free for everyone.
        </motion.p>

        {/* Email form + CTAs */}
        <motion.form
          variants={item}
          id="signup"
          onSubmit={onSubmit}
          noValidate
          className="mt-10 w-full max-w-xl mx-auto"
          data-testid="hero-signup-form"
        >
          <div className="flex flex-col sm:flex-row gap-3 p-1.5 sm:p-2 rounded-2xl glass-strong">
            <input
              data-testid="hero-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-[#7a7a92] focus:outline-none rounded-xl"
              autoComplete="email"
            />
            <button
              data-testid="hero-primary-cta"
              type="submit"
              disabled={loading}
              className="btn-gold inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl whitespace-nowrap disabled:opacity-60"
            >
              {loading ? "Joining..." : "Start Your Journey Free"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              data-testid="hero-demo-cta"
              onClick={() => setDemoOpen(true)}
              className="btn-outline-soft inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            >
              <span className="w-7 h-7 rounded-full bg-white/8 inline-flex items-center justify-center">
                <Play size={12} className="text-[#EF9F27] ml-[1px]" fill="#EF9F27" />
              </span>
              Watch Demo
            </button>
            <span className="hidden sm:inline-flex items-center gap-2 text-xs text-[#A0A0B5]">
              <ShieldCheck size={14} className="text-[#7F77DD]" />
              No credit card · Free forever
            </span>
          </div>
        </motion.form>

        {/* Trust strip */}
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
