import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, ListChecks, Target, Library, Clock3, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Self-contained study lessons (works even when YouTube/external sites are blocked).
// Each lesson has: syllabus topics, exam strategy points, recommended books.
const LESSONS = [
  // ---------- UPSC ----------
  {
    id: "upsc-cse",
    title: "UPSC CSE — Strategy from Day 1",
    body: "UPSC",
    subject: "Civil Services Examination",
    duration: "Beginner Roadmap",
    accent: "#EF9F27",
    topics: ["NCERT Class 6-12 foundation", "Polity (Laxmikanth)", "Modern History (Spectrum)", "Geography (G.C. Leong + NCERT)", "Indian Economy (Ramesh Singh)", "Environment & Ecology", "Daily Current Affairs"],
    strategy: ["Read newspaper (The Hindu / Indian Express) for 45 min daily", "Finish NCERTs in 60 days before standard books", "Solve 10 PYQs every day from Day 30 onwards", "Start answer-writing practice in Month 5", "Take 1 sectional mock test per week"],
    books: ["NCERTs Class 6-12", "Indian Polity — M. Laxmikanth", "A Brief History of Modern India — Spectrum", "Indian Economy — Ramesh Singh", "Environment — Shankar IAS"],
  },
  {
    id: "upsc-polity",
    title: "Indian Polity — Laxmikanth Decoded",
    body: "UPSC",
    subject: "GS Paper II",
    duration: "Crash Course",
    accent: "#EF9F27",
    topics: ["Historical background & making of the Constitution", "Preamble, Fundamental Rights, DPSP, Duties", "Union & State Executive, Legislature, Judiciary", "Centre-State relations, Emergency provisions", "Constitutional & Non-constitutional bodies", "Local Government (73rd & 74th Amendments)"],
    strategy: ["Read each chapter twice with side notes", "Make flowcharts of articles & amendments", "Map every topic to PYQs (last 10 years)", "Revise weekly using Anki / spaced repetition"],
    books: ["Indian Polity — M. Laxmikanth (7th ed.)", "Our Parliament — Subhash Kashyap", "DD Basu — Introduction to Constitution"],
  },
  {
    id: "upsc-ca",
    title: "Daily Current Affairs — One-shot Revision",
    body: "UPSC",
    subject: "GS Daily",
    duration: "Daily 30 min",
    accent: "#EF9F27",
    topics: ["Polity & Governance updates", "Economy & Budget headlines", "International Relations", "Environment & Climate Summits", "Science & Tech (ISRO, Defence)", "Government schemes & flagship programs"],
    strategy: ["Pick ONE newspaper + ONE monthly compilation", "Write 100-word notes per topic, never copy-paste", "Connect every news to the syllabus topic", "Monthly revision of the previous month"],
    books: ["The Hindu / Indian Express", "PIB releases", "Vision IAS / Forum IAS monthly", "Yojana & Kurukshetra magazines"],
  },
  {
    id: "upsc-cds",
    title: "UPSC CDS — Maths & English Strategy",
    body: "UPSC",
    subject: "Combined Defence Services",
    duration: "Course",
    accent: "#EF9F27",
    topics: ["Elementary Maths (Class 10 NCERT)", "English — vocabulary, grammar, comprehension", "GK — History, Geography, Polity, Economy", "Current Affairs (last 6 months)", "Defence-related awareness"],
    strategy: ["Maths: 1 chapter/day from NCERT + 30 problems", "English: read editorials + Word Power Made Easy", "GK: NCERTs + Lucent's GK", "Take 1 full mock every 10 days"],
    books: ["NCERT Maths Class 10", "Word Power Made Easy — Norman Lewis", "Lucent's General Knowledge", "Pathfinder for CDS — Arihant"],
  },
  {
    id: "upsc-nda",
    title: "UPSC NDA — Maths Roadmap (Class 11-12)",
    body: "UPSC",
    subject: "National Defence Academy",
    duration: "Course",
    accent: "#EF9F27",
    topics: ["Algebra, Matrices & Determinants", "Trigonometry, Analytical Geometry", "Differential Calculus & Integration", "Vector Algebra, Statistics & Probability", "Physics & Chemistry (Class 11-12)", "GAT — English, GK, Current Affairs"],
    strategy: ["Maths: NCERT cover-to-cover, then RD Sharma", "Solve last 10 years NDA PYQs by topic", "Physics & Chem: NCERT + Pradeep's objective", "1 mock test every weekend"],
    books: ["NCERT Maths/Physics/Chem Class 11-12", "Pathfinder NDA — Arihant", "RS Aggarwal Quantitative Aptitude"],
  },
  {
    id: "upsc-ese",
    title: "UPSC ESE / IES — Engineering Services",
    body: "UPSC",
    subject: "Engineering Services Examination",
    duration: "Course",
    accent: "#EF9F27",
    topics: ["General Studies & Engineering Aptitude", "Stream-specific Technical (CE/ME/EE/EC)", "Conventional paper writing practice", "Interview preparation"],
    strategy: ["Cover GATE syllabus first, then ESE-specific topics", "Solve previous 15 years papers", "Practice conventional answer-writing weekly", "Personality test prep from Month 8"],
    books: ["Made Easy / IES Master postal study material", "Engineering Mathematics — B.S. Grewal", "GS & Engg Aptitude — Made Easy"],
  },
  {
    id: "upsc-capf",
    title: "UPSC CAPF (AC) — Assistant Commandant Prep",
    body: "UPSC",
    subject: "Central Armed Police Forces",
    duration: "Course",
    accent: "#EF9F27",
    topics: ["GS — History, Polity, Geography, Economy", "Current Affairs (last 1 year)", "General Mental Ability", "Essay & Comprehension (Paper II)", "Physical Efficiency Test & Medical"],
    strategy: ["Study like UPSC Prelims (lighter optional)", "Essay practice: 1 essay/week, 60 min, 800 words", "PET prep: 100m + 800m + long jump + shot put — start at Month 3", "Daily 45 min running"],
    books: ["NCERTs + Laxmikanth + Spectrum", "Manorama Yearbook", "CAPF AC — Arihant"],
  },
  {
    id: "upsc-cms",
    title: "UPSC CMS — Combined Medical Services",
    body: "UPSC",
    subject: "Combined Medical Services",
    duration: "Course",
    accent: "#EF9F27",
    topics: ["General Medicine + Paediatrics (Paper I)", "Surgery + Gynaecology + Obstetrics + PSM (Paper II)", "MCQ-based, total 500 marks", "Personality Test"],
    strategy: ["Build on NEET-PG / FMGE base", "Practice 100 MCQs daily, topic-wise", "Revise PSM heavily — high weightage", "Solve last 10 years CMS PYQs"],
    books: ["Marrow / Prepladder MCQ banks", "Park's PSM textbook", "MRCS / Bailey for Surgery quick revision"],
  },
  {
    id: "upsc-ifos",
    title: "UPSC IFoS — Indian Forest Service Strategy",
    body: "UPSC",
    subject: "Indian Forest Service",
    duration: "Course",
    accent: "#EF9F27",
    topics: ["Prelims = UPSC CSE Prelims (common)", "Mains — 2 optional subjects from forestry/agri/zoology/botany/etc.", "Personality Test", "Eligibility — Science/Engineering/Agriculture graduate"],
    strategy: ["Clear UPSC CSE Prelims first", "Pick optionals overlapping your degree", "Read forestry-specific journals & ICFRE reports", "Map ecology / environment news daily"],
    books: ["Manual of Indian Forestry — S.S. Negi", "Khanna's Agricultural Statistics", "Optional-specific standard textbooks"],
  },

  // ---------- MPSC ----------
  {
    id: "mpsc-rajya",
    title: "MPSC Rajyaseva — Complete Roadmap 2026",
    body: "MPSC",
    subject: "Civil Services Gazetted Combined Exam",
    duration: "Roadmap",
    accent: "#7F77DD",
    topics: ["Maharashtra-specific History, Geography, Polity", "Indian History (Modern emphasis)", "Marathi & English language papers", "GS Mains 4 papers", "Optional subject (similar to UPSC)"],
    strategy: ["Marathi medium aspirants: NCERTs in Marathi + Balbharati Class 11-12", "Maharashtra Year Book — must-read", "Solve previous 15 years MPSC PYQs", "Daily 'Loksatta' / 'Maharashtra Times' newspaper"],
    books: ["Balbharati History/Geography (Marathi)", "Adhunik Maharashtra cha Itihas — Anil Kathare", "Maharashtra Year Book", "MPSC Manual — K-Sagar"],
  },
  {
    id: "mpsc-grpB",
    title: "MPSC Group B — PSI / STI / ASO Strategy",
    body: "MPSC",
    subject: "Non-Gazetted Combined Exam",
    duration: "Course",
    accent: "#7F77DD",
    topics: ["Marathi & English", "General Knowledge & Current Affairs", "Quantitative Aptitude & Reasoning", "Maharashtra-specific GK", "Indian Constitution basics"],
    strategy: ["Focus on speed — 100 Qs in 60 min", "Solve 30 PYQs daily, topic-wise", "Maintain Marathi grammar notes", "Take 2 mocks per week from Month 3"],
    books: ["MPSC Combined PSI/STI/ASO — K-Sagar", "Quick Maths — R.S. Aggarwal", "Adhikari (Marathi grammar)"],
  },
  {
    id: "mpsc-grpC",
    title: "MPSC Group C — Clerk-Typist Prep",
    body: "MPSC",
    subject: "Group C Combined Exam",
    duration: "Course",
    accent: "#7F77DD",
    topics: ["Marathi & English language", "GK & Maharashtra GK", "Quantitative Aptitude", "Reasoning", "Computer fundamentals (for some posts)"],
    strategy: ["Build typing speed (Marathi & English) early", "Daily 25 Qs each of Maths + Reasoning", "Revise Maharashtra GK weekly", "Solve 5 PYQ papers before exam month"],
    books: ["MPSC Group C — K-Sagar", "Maharashtra Sansari", "Object Computer — Sumita Arora"],
  },
  {
    id: "mpsc-tech",
    title: "MPSC Technical & Engineering Services",
    body: "MPSC",
    subject: "Technical & Engineering Services Exam",
    duration: "Course",
    accent: "#7F77DD",
    topics: ["Engineering stream-specific (Civil / Mech / Elec)", "General Studies (Maharashtra focus)", "Marathi & English", "Quantitative Aptitude & Reasoning"],
    strategy: ["Revise B.Tech / Diploma core subjects", "Cover GS like Rajyaseva", "Solve 10 years technical PYQs", "Stream-wise mock tests"],
    books: ["GATE-level stream books (Made Easy)", "MPSC Technical — K-Sagar", "Engineering Maths — B.S. Grewal"],
  },
  {
    id: "mpsc-sub",
    title: "MPSC Subordinate Services Exam",
    body: "MPSC",
    subject: "Subordinate Services Examination",
    duration: "Course",
    accent: "#7F77DD",
    topics: ["Marathi & English", "GK & Current Affairs", "Indian Polity & Maharashtra-specific GK", "Quantitative Aptitude & Reasoning"],
    strategy: ["Daily 1 hour of Marathi/English grammar", "Maharashtra-focused PYQs", "Build vocabulary via newspaper", "Mocks every 7 days"],
    books: ["MPSC Subordinate — K-Sagar", "Adhunik Bharatacha Itihas (Marathi)", "Loksatta editorials"],
  },

  // ---------- IAF ----------
  {
    id: "iaf-afcat",
    title: "AFCAT — Air Force Common Admission Test",
    body: "IAF",
    subject: "Officer Entry",
    duration: "Course",
    accent: "#5EC4B6",
    topics: ["General Awareness (History, Geography, Polity, Current Affairs)", "Verbal Ability in English (synonyms, antonyms, comprehension)", "Numerical Ability (basic Maths)", "Reasoning & Military Aptitude", "EKT — for technical branch only"],
    strategy: ["100 Qs in 120 min — practice speed solving", "Daily 30 Qs of each section", "Read defence news weekly", "Take 1 full-length mock per week"],
    books: ["AFCAT — Arihant / RPH", "Word Power Made Easy", "Lucent's GK"],
  },
  {
    id: "iaf-fts",
    title: "IAF Fast Track Selection (FTS)",
    body: "IAF",
    subject: "Direct Officer",
    duration: "Guide",
    accent: "#5EC4B6",
    topics: ["Direct SSB Interview — no written test", "Eligibility — Engineering graduates with prescribed marks", "Notification windows are short — apply quickly", "Psychology, GTO, Personal Interview at AFSB"],
    strategy: ["Focus 100% on SSB Interview prep", "Practice OIR + PPDT for screening", "Build 'Officer-Like Qualities' through situations", "Stay physically fit — GTO ground tasks"],
    books: ["Let Us Crack SSB Interview — Maj Gen N. Bhojwani", "OIR Practice — Arihant", "PPDT stories collection"],
  },
  {
    id: "iaf-ncc",
    title: "IAF NCC Special Entry — SSB Process",
    body: "IAF",
    subject: "NCC 'C' Certificate Holders",
    duration: "Guide",
    accent: "#5EC4B6",
    topics: ["NCC Air Wing 'C' Certificate (min B grade)", "No written exam — direct AFSB SSB", "Flying / Ground Duty branches", "Medical & Pilot Aptitude Battery Test"],
    strategy: ["Apply during NCC final year", "Master OLQs and SSB stages thoroughly", "Stay current on aviation & defence news", "Practice PABT-style coordination tasks"],
    books: ["SSB Interview — N.K. Natarajan", "PABT preparation guides", "Aviation Week magazine"],
  },
  {
    id: "iaf-met",
    title: "IAF Meteorology Entry — Met Branch",
    body: "IAF",
    subject: "Met Branch Officer",
    duration: "Guide",
    accent: "#5EC4B6",
    topics: ["AFCAT + EKT (Met / Science)", "Eligibility: M.Sc. in any Science subject", "SSB at AFSB", "Specialized training at IMTRAT"],
    strategy: ["AFCAT prep similar to officer entry", "Strengthen Physics & Maths for Met EKT", "Read IMD reports & climate news", "SSB prep — same as other IAF entries"],
    books: ["AFCAT & EKT — Arihant", "Atmospheric Science — J.M. Wallace", "Met / Climate Science basics"],
  },

  // ---------- Indian Army ----------
  {
    id: "army-tgc",
    title: "Indian Army TGC — BE/B.Tech to Officer",
    body: "Indian Army",
    subject: "Technical Graduate Course",
    duration: "Course",
    accent: "#F7C97E",
    topics: ["Eligibility — BE/B.Tech in notified streams (final-year allowed)", "No written exam — shortlist on engineering %", "5-stage SSB at selected centres", "Medical board"],
    strategy: ["Maintain 60%+ engineering marks", "Apply in both January & July cycles", "SSB prep: OLQs, GTO, Psychology", "Get fit — 2.4 km run < 12 min"],
    books: ["SSB Cracker — Maj Gen N. Bhojwani", "OLQ Development Guide", "Pathfinder Indian Army — Arihant"],
  },
  {
    id: "army-ssctech",
    title: "Indian Army SSC Tech — Men & Women",
    body: "Indian Army",
    subject: "Short Service Commission (Tech)",
    duration: "Course",
    accent: "#F7C97E",
    topics: ["Engineering graduates (10-year SSC, extendable)", "Shortlisting based on engineering %", "Direct SSB Interview", "Medical board"],
    strategy: ["Build OLQs through college NCC / sports / leadership roles", "Practice PPDT + Word Association Test", "Maintain physical fitness (push-ups, sit-ups, run)", "Read defence news daily"],
    books: ["Let Us Crack SSB Interview", "OIR Practice — Arihant", "Manorama Yearbook"],
  },
  {
    id: "army-jag",
    title: "Indian Army JAG — Judge Advocate General",
    body: "Indian Army",
    subject: "LLB Entry",
    duration: "Course",
    accent: "#F7C97E",
    topics: ["Eligibility — LLB graduates (min 55%) with BCI enrolment", "Direct SSB Interview at SSB Centre", "Medical examination", "Training at OTA Chennai"],
    strategy: ["Brush up Constitution, IPC, CrPC, Evidence Act", "Stay updated on landmark judgements", "SSB OLQ prep + group discussion practice", "Physical fitness baseline"],
    books: ["Bare Acts — Constitution, IPC, CrPC", "Indian Polity — Laxmikanth", "Indian Express legal pages"],
  },
  {
    id: "army-ncc",
    title: "Indian Army NCC Special Entry",
    body: "Indian Army",
    subject: "NCC 'C' Certificate Entry",
    duration: "Course",
    accent: "#F7C97E",
    topics: ["NCC Senior Division 'C' Certificate (min B grade)", "Final-year graduates from any stream", "No written test — direct SSB", "Notification twice a year"],
    strategy: ["Apply in your final NCC year", "Master 5-stage SSB process", "Develop public speaking & leadership", "Maintain BMI & basic endurance"],
    books: ["NCC Cadet Handbook", "SSB OLQ — N.K. Natarajan", "Defence News digests"],
  },

  // ---------- Engineering / PSU / Diploma ----------
  {
    id: "gate",
    title: "GATE — Strategy for Top Rank",
    body: "Engineering",
    subject: "Graduate Aptitude Test",
    duration: "9-month plan",
    accent: "#5EC4B6",
    topics: ["Stream core (CS/EC/ME/CE/EE)", "Engineering Mathematics", "General Aptitude", "Numerical Answer Type questions", "Subject-wise PYQs (20 years)", "Virtual calculator practice"],
    strategy: ["Pick 8-10 high-weightage subjects per stream", "Solve 20y PYQs topic-wise before mocks", "Build a formula notebook from Day 1", "Take 1 sectional + 1 full mock per week"],
    books: ["Made Easy / IES Master Postal", "Engineering Mathematics — B.S. Grewal", "GATE PYQs — Made Easy / GKP", "Higher Engg Mathematics — H.K. Dass"],
  },
  {
    id: "isro-sc",
    title: "ISRO Scientist/Engineer SC — Roadmap",
    body: "Engineering",
    subject: "ISRO Recruitment",
    duration: "Course",
    accent: "#5EC4B6",
    topics: ["EC / CS / ME core subjects", "Signals, Control, Digital Electronics (EC)", "OS, DBMS, Algorithms (CS)", "Thermo, Fluid Mech, ToM (ME)", "Aerospace orientation"],
    strategy: ["Use GATE prep as base, layer ISRO PYQs", "Aerospace + space tech awareness", "Strong on numerical + concept", "Project explanation drill for interview"],
    books: ["GATE standard texts", "ISRO PYQs (last 10 years)", "Aerospace Engineering — Anderson"],
  },
  {
    id: "barc-oces",
    title: "BARC OCES/DGFS — Atomic Energy Career",
    body: "Engineering",
    subject: "BARC Training Scheme",
    duration: "Course",
    accent: "#5EC4B6",
    topics: ["Stream core (Mech / Chem / Elec / Met / Civil / CS)", "Online screening test", "Interview + viva", "Nuclear engineering basics"],
    strategy: ["GATE-level prep + BARC PYQs", "Read about atomic energy programs (Kalpakkam, Tarapur)", "Polish project & B.Tech major", "Interview: be ready for fundamentals + research aptitude"],
    books: ["GATE stream books", "Nuclear Reactor Engineering — Lamarsh", "BARC PYQ compilations"],
  },
  {
    id: "drdo-set",
    title: "DRDO SET — Scientist 'B' Entry",
    body: "Engineering",
    subject: "Defence R&D Organization",
    duration: "Course",
    accent: "#5EC4B6",
    topics: ["Aerospace / EC / ME / CS stream papers", "Engineering Maths + General Aptitude", "Defence technology updates", "Personal interview"],
    strategy: ["GATE syllabus first, then DRDO-specific PYQs", "Brush up on missiles, radar, drones tech", "Project deep-dive prep", "Mock interviews for technical viva"],
    books: ["Made Easy stream books", "DRDO PYQs", "Defence Reviews & DRDO newsletter"],
  },
  {
    id: "ssc-je",
    title: "SSC Junior Engineer — Diploma to Govt Job",
    body: "Engineering",
    subject: "SSC JE (CE/ME/EE)",
    duration: "Course",
    accent: "#5EC4B6",
    topics: ["Civil / Mech / Electrical technical subjects", "General Intelligence & Reasoning", "General Awareness", "Paper II Conventional"],
    strategy: ["Stream technical: 1 chapter/day from Diploma syllabus", "Conventional paper: 2 questions/day with timer", "PYQs of last 10 cycles must be memorized", "Reasoning + GA: 30 min daily"],
    books: ["SSC JE — Made Easy", "RS Khurmi (Mech)", "BC Punmia (Civil)", "Lucent's GK + Reasoning by R.S. Aggarwal"],
  },
  {
    id: "state-ae-je",
    title: "State Engineering Services (AE/JE)",
    body: "Engineering",
    subject: "State PSC Engineering",
    duration: "Course",
    accent: "#5EC4B6",
    topics: ["State-specific technical syllabus", "Stream depth (CE / ME / EE)", "Regional language + state GK", "Interview / conventional paper"],
    strategy: ["Get state-specific previous papers (10+ years)", "Made Easy + IES Master + stream-wise notes", "Regional language: 1 hour/day", "State GK: focus on state budget, schemes, geography"],
    books: ["Made Easy stream books", "State PSC PYQs", "State Year Book / Manorama"],
  },
  {
    id: "diploma",
    title: "Polytechnic Diploma Entrance",
    body: "Engineering",
    subject: "After Class 10",
    duration: "4-month plan",
    accent: "#5EC4B6",
    topics: ["Class 10 Mathematics (NCERT)", "Physics & Chemistry (NCERT Class 10)", "English & comprehension", "Logical reasoning", "State-specific GK"],
    strategy: ["NCERT first, then state board books", "Daily 30 Maths + 20 Physics MCQs", "Mock test every 10 days", "Revise formulas weekly"],
    books: ["NCERT Class 10 Maths/Phy/Chem", "JEECUP / CEEP / DET Polytechnic — Arihant", "Lucent's GK"],
  },
];

const FILTERS = ["All", "UPSC", "MPSC", "IAF", "Indian Army", "Engineering"];

function CustomThumb({ v }) {
  const seed = (v.id.charCodeAt(0) + v.id.length * 7) % 360;
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: `linear-gradient(${seed}deg, #14142a 0%, #20203f 50%, #14142a 100%)` }}
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
        style={{ background: `radial-gradient(circle, ${v.accent}55, transparent 60%)`, filter: "blur(40px)" }}
      />
      <div
        className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full opacity-45"
        style={{ background: `radial-gradient(circle, #7F77DD55, transparent 60%)`, filter: "blur(40px)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-serif-display text-[58px] md:text-[72px] font-black tracking-tight opacity-[0.10] select-none uppercase whitespace-nowrap"
          style={{ color: v.accent }}
        >
          {v.body.split(" ")[0]}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10">
        <BookOpen size={12} style={{ color: v.accent }} />
        <span className="text-[10px] uppercase tracking-widest text-white/80">Lesson</span>
      </div>
    </div>
  );
}

function LessonCard({ v, index, onOpen }) {
  return (
    <motion.button
      data-testid={`lesson-card-${v.id}`}
      onClick={() => onOpen(v)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="group text-left glass rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all"
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
          {v.body} · {v.subject.split(" ").slice(0, 2).join(" ")}
        </span>
        <span className="absolute top-3 right-3 z-10 text-[10px] tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-white inline-flex items-center gap-1">
          <Clock3 size={10} /> {v.duration}
        </span>
        <span className="absolute inset-0 flex items-center justify-center z-10">
          <span
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EF9F27] to-[#F7C97E] shadow-[0_0_50px_-8px_rgba(239,159,39,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform"
            aria-hidden
          >
            <BookOpen size={20} className="text-[#1a1a2e]" />
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
          {v.subject}
        </p>
      </div>
    </motion.button>
  );
}

function LessonModal({ lesson, onOpenChange }) {
  const { user } = useAuth();
  const nav = useNavigate();
  if (!lesson) return null;
  return (
    <Dialog open={!!lesson} onOpenChange={(o) => !o && onOpenChange(null)}>
      <DialogContent
        data-testid="lesson-modal"
        className="max-w-3xl bg-[#131326] border border-white/10 text-white p-0 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="px-6 pt-6 pb-3 sticky top-0 bg-[#131326]/95 backdrop-blur z-10 border-b border-white/8">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
              style={{
                background: `${lesson.accent}15`,
                color: lesson.accent,
                border: `1px solid ${lesson.accent}40`,
              }}
            >
              {lesson.body}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#A0A0B5]">
              {lesson.subject} · {lesson.duration}
            </span>
          </div>
          <DialogTitle className="font-serif-display text-2xl md:text-3xl pr-8 leading-tight">
            {lesson.title}
          </DialogTitle>
          <DialogDescription className="text-[#A0A0B5] text-sm mt-1">
            A free, structured lesson — syllabus, strategy and books — built into SpardhaHub.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6 space-y-7">
          {/* Topics */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ListChecks size={16} style={{ color: lesson.accent }} />
              <h4 className="font-serif-display text-lg text-white">Syllabus & Key Topics</h4>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {lesson.topics.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#C7C7D6]">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: lesson.accent }}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Strategy */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-[#EF9F27]" />
              <h4 className="font-serif-display text-lg text-white">Exam Strategy</h4>
            </div>
            <ol className="space-y-2.5">
              {lesson.strategy.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#C7C7D6]">
                  <span
                    className="font-serif-display font-bold text-sm leading-tight flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center"
                    style={{ color: lesson.accent }}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Books */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Library size={16} className="text-[#7F77DD]" />
              <h4 className="font-serif-display text-lg text-white">Recommended Books</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {lesson.books.map((b, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#C7C7D6]"
                >
                  {b}
                </span>
              ))}
            </div>
          </section>

          <div className="pt-2">
            {user ? (
              <button
                data-testid="lesson-modal-cta"
                onClick={() => {
                  onOpenChange(null);
                  nav("/dashboard/progress");
                }}
                className="btn-gold inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl"
              >
                <CheckCircle2 size={16} /> Track in Progress
              </button>
            ) : (
              <button
                data-testid="lesson-modal-cta"
                onClick={() => {
                  onOpenChange(null);
                  nav("/signup");
                }}
                className="btn-gold inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl"
              >
                Save lesson · Sign up free
                <ArrowUpRight size={16} />
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function StudyVideos() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? LESSONS
      : LESSONS.filter((v) => v.body === filter);

  return (
    <section
      id="videos"
      data-testid="videos-section"
      className="relative py-28 md:py-32 px-6 lg:px-10"
    >
      <div
        className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(239,159,39,0.16), transparent 60%)",
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
              Lessons that actually{" "}
              <span className="text-gold-gradient italic">teach</span>.
            </h2>
            <p className="text-base text-[#A0A0B5] mt-5 leading-relaxed">
              Every lesson opens inside SpardhaHub with the syllabus, exam strategy,
              and recommended books — no external apps, no blocked sites, no
              distractions.
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
              data-testid={`video-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
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
            <LessonCard key={v.id} v={v} index={i} onOpen={setActive} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-[#A0A0B5] py-12">No lessons in this category yet.</p>
        )}
      </div>

      <LessonModal lesson={active} onOpenChange={setActive} />
    </section>
  );
}
