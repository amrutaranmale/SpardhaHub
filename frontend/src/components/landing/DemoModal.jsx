import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronRight, ChevronLeft, Sparkles, Map, TrendingUp, BellRing, Calculator } from "lucide-react";

// Self-contained animated product walkthrough — feels like a real demo video.
// 5 scenes, ~4 seconds each, with auto-advance + play/pause + step nav.
const SCENES = [
  {
    id: "hero",
    accent: "#EF9F27",
    label: "01 · Vision",
    title: "Crack any Indian competitive exam",
    body: "UPSC, MPSC, IAF, Army, GATE, ISRO, BARC, Diploma — 27 exams, one platform.",
    art: "hero",
  },
  {
    id: "eligibility",
    accent: "#5EC4B6",
    label: "02 · Eligibility Checker",
    title: "Enter your DOB · instant answers",
    body: "We auto-classify every exam into Eligible / Not Eligible with the age window.",
    art: "eligibility",
  },
  {
    id: "roadmap",
    accent: "#7F77DD",
    label: "03 · Smart Roadmap",
    title: "A phased plan tuned to your exam",
    body: "Foundation → Core → Mains → Revision. Tasks for every week.",
    art: "roadmap",
  },
  {
    id: "progress",
    accent: "#EF9F27",
    label: "04 · Progress Tracker",
    title: "Watch the bar fill, day after day",
    body: "Tick off topics — your % completion auto-saves to MongoDB.",
    art: "progress",
  },
  {
    id: "alerts",
    accent: "#F7C97E",
    label: "05 · Live Alerts",
    title: "Never miss a notification",
    body: "Form release, admit cards, results — all in one feed.",
    art: "alerts",
  },
];

export default function DemoModal({ open, onOpenChange }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!open) { setI(0); setPlaying(true); return; }
  }, [open]);

  useEffect(() => {
    if (!open || !playing) return;
    const id = setTimeout(() => setI((x) => (x + 1) % SCENES.length), 4500);
    return () => clearTimeout(id);
  }, [i, playing, open]);

  const scene = SCENES[i];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="demo-modal"
        className="max-w-4xl bg-[#131326] border border-white/10 text-white p-0 overflow-hidden"
      >
        <DialogHeader className="px-6 pt-6 pb-3">
          <DialogTitle className="font-serif-display text-2xl flex items-center gap-2">
            <Sparkles size={18} className="text-[#EF9F27]" />
            SpardhaHub · Product Walkthrough
          </DialogTitle>
          <DialogDescription className="text-[#A0A0B5] text-sm">
            A 25-second tour. Animated, generated entirely inside the app.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Stage */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"
               style={{ background: "linear-gradient(135deg, #14142a 0%, #1f1f3a 50%, #131326 100%)" }}>
            {/* Static grid + glows */}
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}/>
            <motion.div
              key={`glow-${i}`}
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{ opacity: 0.7, scale: 1.2 }}
              transition={{ duration: 1.8 }}
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full"
              style={{ background: `radial-gradient(circle, ${scene.accent}55, transparent 60%)`, filter: "blur(40px)" }}
            />
            <motion.div
              key={`glow2-${i}`}
              initial={{ opacity: 0.15, scale: 0.8 }}
              animate={{ opacity: 0.55, scale: 1.2 }}
              transition={{ duration: 2, delay: 0.2 }}
              className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
              style={{ background: `radial-gradient(circle, #7F77DD55, transparent 60%)`, filter: "blur(40px)" }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center"
              >
                <span
                  className="text-[10px] uppercase tracking-[0.22em] mb-3"
                  style={{ color: scene.accent }}
                >
                  {scene.label}
                </span>
                <h3 className="font-serif-display text-2xl md:text-4xl text-white leading-[1.1] max-w-xl">
                  {scene.title}
                </h3>
                <p className="text-[#A0A0B5] mt-3 max-w-md text-sm md:text-base">
                  {scene.body}
                </p>

                {/* Scene-specific art */}
                <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:block">
                  <SceneArt scene={scene} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom controls */}
            <div className="absolute left-0 right-0 bottom-0 p-4 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent">
              <button
                data-testid="demo-play-pause"
                onClick={() => setPlaying((p) => !p)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
              <button
                onClick={() => setI((x) => (x - 1 + SCENES.length) % SCENES.length)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <ChevronLeft size={14} />
              </button>
              <div className="flex-1 flex gap-1">
                {SCENES.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/8"
                  >
                    <motion.div
                      key={`bar-${k}-${i}-${playing}`}
                      className="h-full"
                      style={{ background: scene.accent }}
                      initial={{ width: k < i ? "100%" : "0%" }}
                      animate={{ width: k === i ? (playing ? "100%" : "50%") : k < i ? "100%" : "0%" }}
                      transition={{ duration: k === i && playing ? 4.5 : 0.3, ease: "linear" }}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setI((x) => (x + 1) % SCENES.length)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <p className="text-xs text-[#7a7a92] mt-4 text-center">
            Scene {i + 1} of {SCENES.length} · auto-advances every 4.5s
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SceneArt({ scene }) {
  if (scene.art === "hero") {
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-40 h-40 rounded-3xl bg-gradient-to-br from-[#EF9F27] to-[#F7C97E] flex items-center justify-center shadow-[0_0_80px_-10px_rgba(239,159,39,0.7)]"
      >
        <Sparkles size={56} className="text-[#1a1a2e]" />
      </motion.div>
    );
  }
  if (scene.art === "eligibility") {
    return (
      <div className="space-y-2">
        {["UPSC CSE ✓", "GATE ✓", "MPSC Group B ✓", "NDA ✗"].map((t, k) => (
          <motion.div
            key={t}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: k * 0.2 }}
            className={`px-4 py-2 rounded-lg border ${t.endsWith("✓") ? "bg-[#5EC4B6]/10 border-[#5EC4B6]/40 text-[#5EC4B6]" : "bg-white/[0.03] border-white/10 text-[#A0A0B5]"} text-sm font-medium`}
          >
            {t}
          </motion.div>
        ))}
      </div>
    );
  }
  if (scene.art === "roadmap") {
    return (
      <div className="relative pl-5">
        <div className="absolute left-1 top-2 bottom-2 w-px bg-gradient-to-b from-[#7F77DD] via-[#EF9F27] to-[#5EC4B6]" />
        {["Foundation", "Core", "Mains", "Revision"].map((t, k) => (
          <motion.div
            key={t}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: k * 0.18 }}
            className="relative mb-3 last:mb-0"
          >
            <div className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#EF9F27]" />
            <div className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-sm text-white">{t}</div>
          </motion.div>
        ))}
      </div>
    );
  }
  if (scene.art === "progress") {
    return (
      <motion.div className="w-56" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex items-baseline justify-between mb-2 text-xs text-[#A0A0B5]">
          <span>Progress</span>
          <motion.span className="font-serif-display text-2xl text-gold-gradient" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>67%</motion.span>
        </div>
        <div className="h-2.5 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "67%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full"
            style={{ background: "linear-gradient(90deg, #EF9F27, #7F77DD)" }}
          />
        </div>
        <div className="mt-3 space-y-1 text-[11px] text-[#C7C7D6]">
          <div>✓ Indian Polity</div>
          <div>✓ Modern History</div>
          <div className="text-[#7a7a92]">○ Geography</div>
        </div>
      </motion.div>
    );
  }
  if (scene.art === "alerts") {
    return (
      <div className="space-y-2">
        {[
          { code: "UPSC", days: 335 },
          { code: "GATE", days: 122 },
          { code: "AFCAT", days: 78 },
        ].map((a, k) => (
          <motion.div
            key={a.code}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: k * 0.25 }}
            className="px-3 py-2 rounded-lg bg-white/[0.04] border border-[#EF9F27]/30 inline-flex items-center gap-3"
          >
            <BellRing size={14} className="text-[#EF9F27]" />
            <span className="text-xs text-white font-medium">{a.code}</span>
            <span className="text-xs text-gold-gradient font-bold">{a.days} days</span>
          </motion.div>
        ))}
      </div>
    );
  }
  return null;
}
