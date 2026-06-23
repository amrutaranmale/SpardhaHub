import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Curated, popular, free study videos for Indian competitive exams.
// Thumbnails are pulled directly from YouTube's CDN (i.ytimg.com).
const VIDEOS = [
  {
    id: "ZK3O402wf1c",
    title: "UPSC CSE Strategy: How to start from Day 1",
    channel: "Unacademy",
    subject: "UPSC",
    duration: "18:42",
    accent: "#EF9F27",
  },
  {
    id: "kWl2tj4Mq3M",
    title: "Indian Polity Crash Course — Laxmikanth in 1 hour",
    channel: "StudyIQ IAS",
    subject: "UPSC · Polity",
    duration: "58:10",
    accent: "#7F77DD",
  },
  {
    id: "tgbNymZ7vqY",
    title: "MPSC Rajyaseva Complete Roadmap 2026",
    channel: "MPSC Officer Aspirants",
    subject: "MPSC",
    duration: "24:55",
    accent: "#5EC4B6",
  },
  {
    id: "0nbkaYsR94c",
    title: "SSC CGL — Quant Tricks for Tier-I",
    channel: "Adda247",
    subject: "SSC · Quant",
    duration: "32:18",
    accent: "#EF9F27",
  },
  {
    id: "JGwWNGJdvx8",
    title: "Daily Current Affairs · One-shot Revision",
    channel: "Drishti IAS",
    subject: "Current Affairs",
    duration: "21:07",
    accent: "#7F77DD",
  },
  {
    id: "1aA1WGON49E",
    title: "CA Foundation — Accounting Basics Made Simple",
    channel: "CA Wallah",
    subject: "CA",
    duration: "45:30",
    accent: "#F7C97E",
  },
  {
    id: "fJ9rUzIMcZQ",
    title: "IBPS PO Reasoning — Puzzle Mastery",
    channel: "Career Power",
    subject: "Banking",
    duration: "38:12",
    accent: "#7F77DD",
  },
  {
    id: "qpRkdJTMxgM",
    title: "RRB NTPC — General Awareness One-shot",
    channel: "Wifistudy",
    subject: "Railway",
    duration: "01:12:40",
    accent: "#5EC4B6",
  },
  {
    id: "Y8Tko2YC5hA",
    title: "NDA Maths — Trigonometry in 30 minutes",
    channel: "Defence Academy",
    subject: "Defence · NDA",
    duration: "29:50",
    accent: "#EF9F27",
  },
  {
    id: "9bZkp7q19f0",
    title: "CTET Paper 1 — Child Development & Pedagogy",
    channel: "Teach Well",
    subject: "Teaching · CTET",
    duration: "44:18",
    accent: "#F7C97E",
  },
  {
    id: "M7lc1UVf-VE",
    title: "RBI Grade B — ESI & Finance Strategy",
    channel: "Oliveboard",
    subject: "Banking · RBI",
    duration: "26:33",
    accent: "#7F77DD",
  },
  {
    id: "hY7m5jjJ9mM",
    title: "UGC NET Paper 1 — Research Aptitude",
    channel: "Higher Education India",
    subject: "Teaching · NET",
    duration: "36:05",
    accent: "#5EC4B6",
  },
];

function thumbUrl(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function VideoCard({ v, index, onPlay }) {
  return (
    <motion.button
      data-testid={`video-card-${v.id}`}
      onClick={() => onPlay(v)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="group text-left glass rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbUrl(v.id)}
          alt={v.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1c] via-[#0c0c1c]/30 to-transparent" />
        {/* Subject pill */}
        <span
          className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full backdrop-blur-md"
          style={{
            background: "rgba(20,20,42,0.6)",
            border: `1px solid ${v.accent}40`,
            color: v.accent,
          }}
        >
          {v.subject}
        </span>
        {/* Duration */}
        <span className="absolute top-3 right-3 text-[10px] tracking-wider px-2 py-0.5 rounded-md bg-black/55 text-white inline-flex items-center gap-1">
          <Clock size={10} /> {v.duration}
        </span>
        {/* Play button */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EF9F27] to-[#F7C97E] shadow-[0_0_50px_-8px_rgba(239,159,39,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform"
            aria-hidden
          >
            <Play size={20} className="text-[#1a1a2e] ml-[2px]" fill="#1a1a2e" />
          </span>
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif-display text-base md:text-lg leading-snug text-white group-hover:text-[#F7C97E] transition-colors">
            {v.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="text-[#7F77DD] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all flex-shrink-0 mt-1"
          />
        </div>
        <p className="text-xs text-[#A0A0B5] mt-2 uppercase tracking-[0.18em]">
          {v.channel}
        </p>
      </div>
    </motion.button>
  );
}

export default function StudyVideos() {
  const [active, setActive] = useState(null);

  return (
    <section
      id="videos"
      data-testid="videos-section"
      className="relative py-28 md:py-32 px-6 lg:px-10"
    >
      {/* Faint accent */}
      <div
        className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(239,159,39,0.16), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] text-[#7F77DD]">
              Study Library · Free
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl text-white mt-3 leading-[1.1]">
              Lessons from{" "}
              <span className="text-gold-gradient italic">India&apos;s best</span>{" "}
              educators.
            </h2>
            <p className="text-base text-[#A0A0B5] mt-5 leading-relaxed">
              Hand-picked masterclasses on UPSC, MPSC, SSC, CA and current affairs.
              Watch, take notes, and track progress — all in one place.
            </p>
          </div>
          <a
            href="#signup"
            data-testid="videos-view-all"
            className="btn-outline-soft inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm self-start md:self-end"
          >
            Unlock full library
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.id} v={v} index={i} onPlay={setActive} />
          ))}
        </div>
      </div>

      {/* Video player modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          data-testid="video-player-modal"
          className="max-w-4xl bg-[#131326] border border-white/10 text-white p-0 overflow-hidden"
        >
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="font-serif-display text-xl md:text-2xl pr-8">
              {active?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6 pt-3">
            {active && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                <iframe
                  data-testid="video-iframe"
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
                  title={active.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <p className="text-xs text-[#A0A0B5] mt-4 uppercase tracking-[0.18em]">
              {active?.channel} · {active?.subject} · {active?.duration}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
