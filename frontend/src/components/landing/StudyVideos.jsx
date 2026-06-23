import React from "react";
import { motion } from "framer-motion";
import { Play, Clock, ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";

// All entries are study-topic queries. Clicking a card opens a YouTube SEARCH
// for that exact lesson — guaranteeing aspirants always land on real, relevant
// study content (no risk of hardcoded IDs pointing to wrong videos).
const VIDEOS = [
  // UPSC
  { topic: "UPSC CSE Strategy from Day 1", channel: "Top UPSC Educators", subject: "UPSC CSE", duration: "Playlist", accent: "#EF9F27" },
  { topic: "Indian Polity Laxmikanth Crash Course", channel: "StudyIQ IAS", subject: "UPSC CSE", duration: "Playlist", accent: "#EF9F27" },
  { topic: "Daily Current Affairs UPSC Drishti IAS", channel: "Drishti IAS", subject: "UPSC GS", duration: "Daily", accent: "#EF9F27" },
  { topic: "UPSC CDS Maths English Strategy", channel: "SSB Crack", subject: "UPSC CDS", duration: "Course", accent: "#EF9F27" },
  { topic: "UPSC NDA Maths preparation Class 11 12", channel: "Defence Direct", subject: "UPSC NDA", duration: "Course", accent: "#EF9F27" },
  { topic: "UPSC ESE IES Engineering Services strategy", channel: "Made Easy", subject: "UPSC ESE/IES", duration: "Course", accent: "#EF9F27" },
  { topic: "UPSC CAPF AC Assistant Commandant preparation", channel: "Drishti IAS", subject: "UPSC CAPF", duration: "Course", accent: "#EF9F27" },
  { topic: "UPSC CMS Combined Medical Services preparation", channel: "Marrow / DBMCI", subject: "UPSC CMS", duration: "Course", accent: "#EF9F27" },
  { topic: "UPSC IFoS Indian Forest Service strategy", channel: "Forest Aspirants", subject: "UPSC IFoS", duration: "Course", accent: "#EF9F27" },

  // MPSC
  { topic: "MPSC Rajyaseva complete roadmap 2026", channel: "Unacademy MPSC", subject: "MPSC Rajyaseva", duration: "Roadmap", accent: "#7F77DD" },
  { topic: "MPSC Group B PSI STI ASO strategy", channel: "Mission MPSC", subject: "MPSC Group B", duration: "Course", accent: "#7F77DD" },
  { topic: "MPSC Group C Clerk Typist preparation Marathi", channel: "Spardha Pariksha", subject: "MPSC Group C", duration: "Course", accent: "#7F77DD" },
  { topic: "MPSC Technical Engineering Services exam", channel: "Engineering Aspirants Marathi", subject: "MPSC Technical", duration: "Course", accent: "#7F77DD" },
  { topic: "MPSC Subordinate Services exam preparation Marathi", channel: "MPSC Officer Aspirants", subject: "MPSC Subordinate", duration: "Course", accent: "#7F77DD" },

  // IAF
  { topic: "AFCAT Air Force preparation full syllabus", channel: "SSB Crack", subject: "IAF AFCAT", duration: "Course", accent: "#5EC4B6" },
  { topic: "IAF Fast Track Selection FTS process", channel: "Defence Career", subject: "IAF FTS", duration: "Guide", accent: "#5EC4B6" },
  { topic: "Indian Air Force NCC Special Entry SSB", channel: "NCC Cadets India", subject: "IAF NCC", duration: "Guide", accent: "#5EC4B6" },
  { topic: "IAF Meteorology Entry Met Branch officer", channel: "Defence Insider", subject: "IAF Meteorology", duration: "Guide", accent: "#5EC4B6" },

  // Indian Army
  { topic: "Indian Army TGC Technical Graduate Course preparation", channel: "Defence Academy", subject: "Army TGC", duration: "Course", accent: "#F7C97E" },
  { topic: "Indian Army SSC Tech Short Service Commission", channel: "Cadet Connect", subject: "Army SSC Tech", duration: "Course", accent: "#F7C97E" },
  { topic: "Indian Army JAG Entry LLB graduates SSB", channel: "JAG Aspirants", subject: "Army JAG", duration: "Course", accent: "#F7C97E" },
  { topic: "Indian Army NCC Special Entry process SSB", channel: "NCC Cadets India", subject: "Army NCC", duration: "Course", accent: "#F7C97E" },
];

function ytSearchUrl(q) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

function CustomThumb({ v }) {
  const seed = (v.topic.charCodeAt(0) + v.topic.length) % 360;
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(${seed}deg, #14142a 0%, #20203f 50%, #14142a 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div
        className="absolute -top-16 -left-10 w-64 h-64 rounded-full opacity-50"
        style={{
          background: `radial-gradient(circle, ${v.accent}55, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full opacity-45"
        style={{
          background: `radial-gradient(circle, #7F77DD55, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-serif-display text-[58px] md:text-[72px] font-black tracking-tight opacity-[0.10] select-none uppercase whitespace-nowrap"
          style={{ color: v.accent }}
        >
          {v.subject.split(" ")[0]}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10">
        <BookOpen size={12} style={{ color: v.accent }} />
        <span className="text-[10px] uppercase tracking-widest text-white/80">
          Masterclass
        </span>
      </div>
    </div>
  );
}

function VideoCard({ v, index }) {
  return (
    <motion.a
      data-testid={`video-card-${v.subject.toLowerCase().replace(/\s+/g, "-")}-${index}`}
      href={ytSearchUrl(v.topic)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="group text-left glass rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all block"
    >
      <div className="relative aspect-video overflow-hidden">
        <CustomThumb v={v} />

        <span
          className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full backdrop-blur-md z-10"
          style={{
            background: "rgba(20,20,42,0.7)",
            border: `1px solid ${v.accent}55`,
            color: v.accent,
          }}
        >
          {v.subject}
        </span>
        <span className="absolute top-3 right-3 z-10 text-[10px] tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-white inline-flex items-center gap-1">
          <Clock size={10} /> {v.duration}
        </span>
        <span className="absolute inset-0 flex items-center justify-center z-10">
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
            {v.topic}
          </h3>
          <ExternalLink
            size={14}
            className="text-[#7F77DD] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all flex-shrink-0 mt-1.5"
          />
        </div>
        <p className="text-xs text-[#A0A0B5] mt-2 uppercase tracking-[0.18em]">
          {v.channel}
        </p>
      </div>
    </motion.a>
  );
}

const FILTERS = ["All", "UPSC", "MPSC", "IAF", "Army"];

export default function StudyVideos() {
  const [filter, setFilter] = React.useState("All");

  const filtered =
    filter === "All"
      ? VIDEOS
      : VIDEOS.filter((v) => v.subject.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section
      id="videos"
      data-testid="videos-section"
      className="relative py-28 md:py-32 px-6 lg:px-10"
    >
      <div
        className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(239,159,39,0.16), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] text-[#7F77DD]">
              Study Library · Free
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl text-white mt-3 leading-[1.1]">
              Masterclasses from{" "}
              <span className="text-gold-gradient italic">India&apos;s best</span>{" "}
              educators.
            </h2>
            <p className="text-base text-[#A0A0B5] mt-5 leading-relaxed">
              Curated study topics for every exam — UPSC CSE to IAF AFCAT, MPSC
              Rajyaseva to Army JAG. Click any card to instantly find the latest,
              top-rated lessons on YouTube.
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

        <div className="flex flex-wrap gap-2 mb-10" data-testid="video-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              data-testid={`video-filter-${f.toLowerCase()}`}
              onClick={() => setFilter(f)}
              className={`text-xs uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-all ${
                filter === f
                  ? "bg-[#EF9F27] text-[#1a1a2e] border-transparent font-semibold"
                  : "bg-white/[0.03] text-[#C7C7D6] border-white/10 hover:border-white/25 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((v, i) => (
            <VideoCard key={`${v.subject}-${i}`} v={v} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-[#A0A0B5] py-12">
            No videos in this category yet. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
