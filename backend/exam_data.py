"""Static reference data for SpardhaHub: exams, eligibility, salaries, roadmaps."""
from datetime import datetime, timezone

# Each exam includes eligibility window (age) + in-hand monthly salary (₹) + roadmap.
EXAMS = {
    # ---------- UPSC ----------
    "UPSC-CSE": {
        "code": "UPSC-CSE", "body": "UPSC", "name": "Civil Services Examination",
        "min_age": 21, "max_age": 32, "qualification": "Graduation (any stream)",
        "salary_inhand": 56100, "salary_post": "IAS (Entry Pay Level 10)",
        "exam_date": "2027-05-24", "form_window": "Feb-Mar 2027",
        "roadmap": [
            {"phase": "Foundation", "months": "1-3", "tasks": ["NCERTs Class 6-12", "Polity (Laxmikanth)", "Modern History (Spectrum)", "Newspaper habit"]},
            {"phase": "Core Subjects", "months": "4-7", "tasks": ["Geography + Economy", "Environment & Ecology", "PYQ analysis", "Optional foundation"]},
            {"phase": "Mains Preparation", "months": "8-10", "tasks": ["Answer-writing daily", "Essay practice", "Ethics case studies", "Test series"]},
            {"phase": "Revision & Mocks", "months": "11-12", "tasks": ["Full-length mocks", "Current affairs revision", "Interview prep", "Mock interviews"]},
        ],
    },
    "UPSC-CDS": {
        "code": "UPSC-CDS", "body": "UPSC", "name": "Combined Defence Services",
        "min_age": 19, "max_age": 25, "qualification": "Graduation",
        "salary_inhand": 56100, "salary_post": "Lieutenant (Level 10)",
        "exam_date": "2027-04-12", "form_window": "Dec 2026 - Jan 2027",
        "roadmap": [
            {"phase": "Maths Foundation", "months": "1-2", "tasks": ["NCERT Maths Class 10", "Algebra + Geometry", "Trigonometry"]},
            {"phase": "English & GK", "months": "3-4", "tasks": ["Word Power Made Easy", "Editorial reading", "Lucent GK"]},
            {"phase": "PYQ + Mocks", "months": "5-6", "tasks": ["Last 10y papers", "Sectional tests", "SSB awareness"]},
        ],
    },
    "UPSC-ESE": {
        "code": "UPSC-ESE", "body": "UPSC", "name": "Engineering Services Examination",
        "min_age": 21, "max_age": 30, "qualification": "BE / B.Tech",
        "salary_inhand": 67700, "salary_post": "Group A Engineer (Level 10)",
        "exam_date": "2027-06-21", "form_window": "Sep 2026",
        "roadmap": [
            {"phase": "GATE Syllabus", "months": "1-4", "tasks": ["Stream core subjects", "Engg Maths", "Aptitude"]},
            {"phase": "ESE Specific", "months": "5-6", "tasks": ["GS & Engg Aptitude paper", "Conventional answer writing"]},
            {"phase": "Revision", "months": "7", "tasks": ["PYQs 15 years", "Mock tests"]},
        ],
    },
    "UPSC-CAPF": {
        "code": "UPSC-CAPF", "body": "UPSC", "name": "Central Armed Police Forces (AC)",
        "min_age": 20, "max_age": 25, "qualification": "Graduation",
        "salary_inhand": 56100, "salary_post": "Assistant Commandant (Level 10)",
        "exam_date": "2027-08-09", "form_window": "Apr 2027",
        "roadmap": [
            {"phase": "Paper I — GS", "months": "1-3", "tasks": ["NCERTs", "Polity", "Geography", "Current Affairs"]},
            {"phase": "Paper II — Essay", "months": "4-5", "tasks": ["1 essay/week", "Comprehension drills"]},
            {"phase": "PET & Medical", "months": "ongoing", "tasks": ["100m + 800m runs", "Long jump + shot put", "Daily run 3km"]},
        ],
    },
    "UPSC-NDA": {
        "code": "UPSC-NDA", "body": "UPSC", "name": "National Defence Academy",
        "min_age": 16, "max_age": 19, "qualification": "Class 12 (Science for AF/Navy)",
        "salary_inhand": 56100, "salary_post": "Lieutenant after training (Level 10)",
        "exam_date": "2027-04-19", "form_window": "Dec 2026",
        "roadmap": [
            {"phase": "Maths Class 11-12", "months": "1-3", "tasks": ["NCERT cover-to-cover", "RD Sharma", "Trigonometry mastery"]},
            {"phase": "GAT", "months": "4-5", "tasks": ["Physics + Chem", "English", "GK + Current Affairs"]},
            {"phase": "PYQs + SSB awareness", "months": "6", "tasks": ["10 years NDA PYQs", "SSB OLQ basics"]},
        ],
    },
    "UPSC-CMS": {
        "code": "UPSC-CMS", "body": "UPSC", "name": "Combined Medical Services",
        "min_age": 21, "max_age": 32, "qualification": "MBBS",
        "salary_inhand": 67700, "salary_post": "Medical Officer (Level 10)",
        "exam_date": "2027-07-20", "form_window": "Apr 2027",
        "roadmap": [
            {"phase": "Paper I", "months": "1-2", "tasks": ["General Medicine", "Paediatrics", "Daily MCQs 100"]},
            {"phase": "Paper II", "months": "3-4", "tasks": ["Surgery", "OBG", "PSM heavy revision"]},
            {"phase": "Mocks", "months": "5", "tasks": ["PYQs last 10 years", "Full mocks weekly"]},
        ],
    },
    "UPSC-IFOS": {
        "code": "UPSC-IFOS", "body": "UPSC", "name": "Indian Forest Service",
        "min_age": 21, "max_age": 32, "qualification": "Science/Engg/Agri Graduate",
        "salary_inhand": 56100, "salary_post": "Forest Officer (Level 10)",
        "exam_date": "2027-09-13", "form_window": "Feb-Mar 2027",
        "roadmap": [
            {"phase": "CSE Prelims", "months": "1-6", "tasks": ["Same as UPSC CSE Prelims"]},
            {"phase": "Forestry Optionals", "months": "7-10", "tasks": ["Pick 2 optionals", "Standard textbooks", "Answer writing"]},
            {"phase": "Interview", "months": "11-12", "tasks": ["Forestry current affairs", "Mock interviews"]},
        ],
    },

    # ---------- MPSC ----------
    "MPSC-RAJYA": {
        "code": "MPSC-RAJYA", "body": "MPSC", "name": "Rajyaseva (Civil Services Combined)",
        "min_age": 19, "max_age": 38, "qualification": "Graduation",
        "salary_inhand": 56100, "salary_post": "Deputy Collector (Level 10)",
        "exam_date": "2027-04-12", "form_window": "Jan 2027",
        "roadmap": [
            {"phase": "Maharashtra Focus", "months": "1-3", "tasks": ["Balbharati Class 11-12", "Maharashtra Year Book", "Marathi grammar"]},
            {"phase": "GS Mains", "months": "4-7", "tasks": ["4 GS papers", "Optional", "Loksatta daily"]},
            {"phase": "Mocks + Interview", "months": "8-10", "tasks": ["Test series", "Personality test prep"]},
        ],
    },
    "MPSC-GROUPB": {
        "code": "MPSC-GROUPB", "body": "MPSC", "name": "Non-Gazetted Group B (PSI/STI/ASO)",
        "min_age": 18, "max_age": 38, "qualification": "Graduation",
        "salary_inhand": 38500, "salary_post": "PSI / STI / ASO (Level 7-8)",
        "exam_date": "2027-05-17", "form_window": "Feb 2027",
        "roadmap": [
            {"phase": "Marathi + English", "months": "1-2", "tasks": ["Grammar drills", "Vocabulary"]},
            {"phase": "GK + Aptitude", "months": "3-4", "tasks": ["Maharashtra GK", "Quant + Reasoning"]},
            {"phase": "Mocks", "months": "5", "tasks": ["2 mocks/week", "PYQs"]},
        ],
    },
    "MPSC-GROUPC": {
        "code": "MPSC-GROUPC", "body": "MPSC", "name": "Group C (Clerk-Typist, Tax Asst.)",
        "min_age": 18, "max_age": 38, "qualification": "HSC / Graduation",
        "salary_inhand": 25500, "salary_post": "Clerk-Typist (Level 5)",
        "exam_date": "2027-06-14", "form_window": "Mar 2027",
        "roadmap": [
            {"phase": "Typing", "months": "1-3", "tasks": ["Marathi typing 30 wpm", "English typing 40 wpm"]},
            {"phase": "GK + Maths", "months": "4-5", "tasks": ["Maharashtra GK", "Basic arithmetic"]},
            {"phase": "PYQs", "months": "6", "tasks": ["5 PYQ papers"]},
        ],
    },
    "MPSC-TECH": {
        "code": "MPSC-TECH", "body": "MPSC", "name": "Technical & Engineering Services",
        "min_age": 21, "max_age": 38, "qualification": "BE / Diploma (relevant stream)",
        "salary_inhand": 56100, "salary_post": "Assistant Engineer (Level 10)",
        "exam_date": "2027-07-26", "form_window": "Apr 2027",
        "roadmap": [
            {"phase": "Core Engineering", "months": "1-4", "tasks": ["Stream subjects (Made Easy)", "Engg Maths"]},
            {"phase": "GS (MH focus)", "months": "5-6", "tasks": ["Maharashtra GS", "Marathi/English"]},
            {"phase": "Mocks", "months": "7", "tasks": ["Stream-wise tests", "PYQs 10 years"]},
        ],
    },
    "MPSC-SUB": {
        "code": "MPSC-SUB", "body": "MPSC", "name": "Subordinate Services",
        "min_age": 18, "max_age": 38, "qualification": "Graduation",
        "salary_inhand": 29200, "salary_post": "Subordinate Officer (Level 6)",
        "exam_date": "2027-08-23", "form_window": "May 2027",
        "roadmap": [
            {"phase": "Language Papers", "months": "1-2", "tasks": ["Marathi grammar", "English vocab"]},
            {"phase": "GK & Aptitude", "months": "3-4", "tasks": ["Maharashtra-specific GK", "Quant & Reasoning"]},
            {"phase": "Mocks", "months": "5", "tasks": ["Weekly mocks", "PYQs"]},
        ],
    },

    # ---------- IAF ----------
    "IAF-AFCAT": {
        "code": "IAF-AFCAT", "body": "IAF", "name": "Air Force Common Admission Test",
        "min_age": 20, "max_age": 24, "qualification": "Graduation (60%+)",
        "salary_inhand": 85000, "salary_post": "Flying Officer (Level 10 + flying pay)",
        "exam_date": "2027-02-22", "form_window": "Dec 2026",
        "roadmap": [
            {"phase": "Aptitude & English", "months": "1-2", "tasks": ["Reasoning", "Comprehension", "Vocabulary"]},
            {"phase": "GK & Defence", "months": "3", "tasks": ["Current Affairs", "Defence updates"]},
            {"phase": "SSB Prep", "months": "4-6", "tasks": ["OLQ development", "OIR + PPDT practice"]},
        ],
    },
    "IAF-FTS": {
        "code": "IAF-FTS", "body": "IAF", "name": "Fast Track Selection",
        "min_age": 20, "max_age": 26, "qualification": "Engineering Graduate",
        "salary_inhand": 85000, "salary_post": "Officer (Level 10 + flying/tech pay)",
        "exam_date": "Rolling", "form_window": "Multiple per year",
        "roadmap": [
            {"phase": "SSB Focused", "months": "1-3", "tasks": ["OLQ development", "PPDT", "GTO ground tasks"]},
            {"phase": "Fitness", "months": "ongoing", "tasks": ["Daily run", "Push-ups + sit-ups"]},
        ],
    },
    "IAF-NCC": {
        "code": "IAF-NCC", "body": "IAF", "name": "IAF NCC Special Entry",
        "min_age": 20, "max_age": 24, "qualification": "Graduation + NCC Air 'C' Cert",
        "salary_inhand": 85000, "salary_post": "Flying Officer (Level 10 + flying pay)",
        "exam_date": "Twice yearly", "form_window": "Jun & Dec",
        "roadmap": [
            {"phase": "NCC + SSB", "months": "1-4", "tasks": ["Apply via NCC HQ", "SSB OLQ + GTO prep"]},
        ],
    },
    "IAF-MET": {
        "code": "IAF-MET", "body": "IAF", "name": "IAF Meteorology Entry",
        "min_age": 20, "max_age": 26, "qualification": "M.Sc. (any Science)",
        "salary_inhand": 75000, "salary_post": "Met Branch Officer (Level 10)",
        "exam_date": "Via AFCAT", "form_window": "With AFCAT cycles",
        "roadmap": [
            {"phase": "AFCAT + EKT", "months": "1-3", "tasks": ["AFCAT syllabus", "EKT Met/Science"]},
            {"phase": "SSB", "months": "4-6", "tasks": ["AFSB stages", "OLQs"]},
        ],
    },

    # ---------- Indian Army ----------
    "ARMY-TGC": {
        "code": "ARMY-TGC", "body": "Indian Army", "name": "Technical Graduate Course",
        "min_age": 20, "max_age": 27, "qualification": "BE/B.Tech (notified streams)",
        "salary_inhand": 67700, "salary_post": "Lieutenant (Level 10)",
        "exam_date": "No written exam", "form_window": "Jan & Jul",
        "roadmap": [
            {"phase": "Engineering %", "months": "ongoing", "tasks": ["Maintain 60%+ marks"]},
            {"phase": "SSB Interview", "months": "1-3", "tasks": ["OLQ development", "GTO + Psych practice"]},
            {"phase": "Fitness", "months": "ongoing", "tasks": ["2.4km run < 12 min"]},
        ],
    },
    "ARMY-SSCT": {
        "code": "ARMY-SSCT", "body": "Indian Army", "name": "SSC Tech (Men & Women)",
        "min_age": 20, "max_age": 27, "qualification": "BE/B.Tech (final year allowed)",
        "salary_inhand": 67700, "salary_post": "Lieutenant SSC (Level 10)",
        "exam_date": "No written exam", "form_window": "Apr & Oct",
        "roadmap": [
            {"phase": "Application", "months": "1", "tasks": ["Apply online via JoinIndianArmy"]},
            {"phase": "SSB", "months": "2-4", "tasks": ["5-stage SSB prep", "Group discussion"]},
        ],
    },
    "ARMY-JAG": {
        "code": "ARMY-JAG", "body": "Indian Army", "name": "Judge Advocate General Entry",
        "min_age": 21, "max_age": 27, "qualification": "LLB (55%+) + BCI enrolment",
        "salary_inhand": 67700, "salary_post": "JAG Officer (Level 10)",
        "exam_date": "No written exam", "form_window": "Twice yearly",
        "roadmap": [
            {"phase": "Law Revision", "months": "1-2", "tasks": ["Constitution + IPC + CrPC", "Evidence Act"]},
            {"phase": "SSB", "months": "3-4", "tasks": ["OLQs", "Personal Interview prep"]},
        ],
    },
    "ARMY-NCC": {
        "code": "ARMY-NCC", "body": "Indian Army", "name": "Army NCC Special Entry",
        "min_age": 19, "max_age": 25, "qualification": "Graduation + NCC 'C' Cert (B+ grade)",
        "salary_inhand": 67700, "salary_post": "Lieutenant SSC (Level 10)",
        "exam_date": "No written exam", "form_window": "Twice yearly",
        "roadmap": [
            {"phase": "NCC + Application", "months": "1", "tasks": ["Apply via NCC unit"]},
            {"phase": "SSB", "months": "2-4", "tasks": ["OLQ + GTO prep", "Public speaking"]},
        ],
    },

    # ---------- Engineering Entrance & PSU ----------
    "GATE": {
        "code": "GATE", "body": "Engineering", "name": "Graduate Aptitude Test in Engineering",
        "min_age": 18, "max_age": 45, "qualification": "BE/B.Tech (final-year allowed) or M.Sc.",
        "salary_inhand": 75000, "salary_post": "PSU Engineer Trainee / M.Tech admission",
        "exam_date": "2027-02-06", "form_window": "Aug-Oct 2026",
        "roadmap": [
            {"phase": "Core Subjects", "months": "1-4", "tasks": ["Stream-wise core (Made Easy/IES Master)", "Engineering Maths (B.S. Grewal)", "General Aptitude (R.S. Aggarwal)"]},
            {"phase": "Numerical Practice", "months": "5-7", "tasks": ["Topic-wise PYQ (20 years)", "Daily 50 numericals", "Standard textbook problems"]},
            {"phase": "Mock & Revision", "months": "8-9", "tasks": ["Full-length mocks weekly", "Sectional analysis", "Formula notebook revision"]},
        ],
    },
    "ISRO-SC": {
        "code": "ISRO-SC", "body": "Engineering", "name": "ISRO Scientist/Engineer SC",
        "min_age": 18, "max_age": 28, "qualification": "BE/B.Tech (65%+ aggregate)",
        "salary_inhand": 95000, "salary_post": "Scientist/Engineer SC (Level 10)",
        "exam_date": "2027-04-25", "form_window": "Feb 2027",
        "roadmap": [
            {"phase": "GATE Syllabus", "months": "1-4", "tasks": ["EC / CS / ME core subjects", "Strong on signal/control/digital"]},
            {"phase": "ISRO-specific", "months": "5-6", "tasks": ["Last 10y ISRO PYQs", "Aerospace orientation"]},
            {"phase": "Interview", "months": "7", "tasks": ["Project explanation prep", "Technical viva drill"]},
        ],
    },
    "BARC-OCES": {
        "code": "BARC-OCES", "body": "Engineering", "name": "BARC OCES/DGFS",
        "min_age": 18, "max_age": 26, "qualification": "BE/B.Tech (60%+) or via GATE",
        "salary_inhand": 92000, "salary_post": "Scientific Officer (Level 10)",
        "exam_date": "2027-03-14", "form_window": "Jan 2027",
        "roadmap": [
            {"phase": "Core Engineering", "months": "1-3", "tasks": ["Stream subjects (Made Easy)", "Nuclear engg basics"]},
            {"phase": "BARC PYQs", "months": "4-5", "tasks": ["Last 15y PYQs", "Online tests"]},
            {"phase": "Interview", "months": "6", "tasks": ["Atomic energy current affairs", "Project deep-dive"]},
        ],
    },
    "DRDO-SET": {
        "code": "DRDO-SET", "body": "Engineering", "name": "DRDO Scientist Entry Test",
        "min_age": 18, "max_age": 28, "qualification": "BE/B.Tech (60%+) or via GATE",
        "salary_inhand": 92000, "salary_post": "Scientist 'B' (Level 10)",
        "exam_date": "2027-06-13", "form_window": "Apr 2027",
        "roadmap": [
            {"phase": "Stream Core", "months": "1-3", "tasks": ["Aerospace / EC / ME subjects", "Maths + GA"]},
            {"phase": "PYQ + Mocks", "months": "4-5", "tasks": ["DRDO + GATE PYQ", "Test series"]},
            {"phase": "Interview", "months": "6", "tasks": ["Defence tech updates", "Project presentation"]},
        ],
    },
    "SSC-JE": {
        "code": "SSC-JE", "body": "Engineering", "name": "SSC Junior Engineer (CE/ME/EE)",
        "min_age": 18, "max_age": 32, "qualification": "Diploma / BE in Civil/Mech/Elec",
        "salary_inhand": 53000, "salary_post": "Junior Engineer (Level 6)",
        "exam_date": "2027-03-21", "form_window": "Dec 2026",
        "roadmap": [
            {"phase": "Technical Core", "months": "1-3", "tasks": ["Civil/Mech/Elec stream", "Diploma syllabus", "Theory of Machines, Strength of Materials"]},
            {"phase": "General Intelligence", "months": "4", "tasks": ["Reasoning", "GK + Current Affairs"]},
            {"phase": "PYQ + Mocks", "months": "5-6", "tasks": ["Last 10y SSC JE PYQs", "Sectional + full mocks"]},
        ],
    },
    "STATE-AE-JE": {
        "code": "STATE-AE-JE", "body": "Engineering", "name": "State Engineering Services (AE/JE)",
        "min_age": 21, "max_age": 38, "qualification": "BE/B.Tech (AE) or Diploma (JE)",
        "salary_inhand": 56100, "salary_post": "Assistant/Junior Engineer (Level 7-10)",
        "exam_date": "2027-05-30", "form_window": "Feb-Mar 2027",
        "roadmap": [
            {"phase": "Stream Core", "months": "1-4", "tasks": ["State-specific syllabus", "Made Easy + IES Master books"]},
            {"phase": "GS + Language", "months": "5", "tasks": ["State GK", "Regional language"]},
            {"phase": "Mocks", "months": "6-7", "tasks": ["State-wise PYQs", "Full mocks"]},
        ],
    },
    "ENG-DIPLOMA": {
        "code": "ENG-DIPLOMA", "body": "Engineering", "name": "Engineering Diploma Entrance (Polytechnic)",
        "min_age": 14, "max_age": 35, "qualification": "Class 10 pass",
        "salary_inhand": 25000, "salary_post": "Diploma Engineer / Technician (Level 4-6)",
        "exam_date": "2027-05-09", "form_window": "Feb-Apr 2027",
        "roadmap": [
            {"phase": "Maths & Science", "months": "1-2", "tasks": ["Class 10 NCERT Maths", "Physics & Chemistry"]},
            {"phase": "English & GK", "months": "3", "tasks": ["Comprehension", "Logical reasoning"]},
            {"phase": "Mocks", "months": "4", "tasks": ["State JEECUP/CEEP/DET PYQs", "Online tests"]},
        ],
    },
}

# Current Affairs sample seed (daily briefs)
CURRENT_AFFAIRS = [
    {
        "id": "ca-001", "date": "2026-06-22",
        "category": "Polity",
        "title": "Supreme Court upholds Article 370 amendment review timeline",
        "summary": "The 5-judge Constitution Bench laid down a fresh roadmap for hearing pending review petitions. Key principles include limited oral submissions and written briefs only.",
        "exam_relevance": ["UPSC-CSE", "UPSC-CAPF", "MPSC-RAJYA"],
    },
    {
        "id": "ca-002", "date": "2026-06-22",
        "category": "Economy",
        "title": "RBI keeps repo rate unchanged at 6.0% for sixth meeting",
        "summary": "MPC maintains accommodative stance citing food inflation. GDP growth forecast revised upward to 7.2% for FY26.",
        "exam_relevance": ["UPSC-CSE", "MPSC-RAJYA", "IAF-AFCAT"],
    },
    {
        "id": "ca-003", "date": "2026-06-21",
        "category": "Science & Tech",
        "title": "ISRO successfully launches Gaganyaan G1 uncrewed mission",
        "summary": "First test flight in the Indian human spaceflight programme. Crew module recovered successfully from the Bay of Bengal after suborbital trajectory.",
        "exam_relevance": ["UPSC-CSE", "UPSC-CDS", "IAF-AFCAT", "MPSC-RAJYA"],
    },
    {
        "id": "ca-004", "date": "2026-06-21",
        "category": "International",
        "title": "India signs 10-year defence framework with Vietnam",
        "summary": "Pact includes BrahMos exports, joint naval exercises in South China Sea, and tech transfer for indigenous shipbuilding.",
        "exam_relevance": ["UPSC-CSE", "UPSC-CDS", "IAF-AFCAT", "ARMY-TGC"],
    },
    {
        "id": "ca-005", "date": "2026-06-20",
        "category": "Environment",
        "title": "India ratifies revised Paris commitments at COP31",
        "summary": "Net-zero target reaffirmed for 2070; non-fossil energy share to hit 60% by 2030. New Green Hydrogen Mission Phase-2 announced.",
        "exam_relevance": ["UPSC-CSE", "UPSC-IFOS", "MPSC-RAJYA"],
    },
    {
        "id": "ca-006", "date": "2026-06-20",
        "category": "Defence",
        "title": "Indian Army commissions third Apache attack helicopter squadron",
        "summary": "Squadron based at Jodhpur to support western desert operations. Indigenous Light Combat Helicopter (LCH) Prachand also inducted.",
        "exam_relevance": ["UPSC-CDS", "UPSC-NDA", "IAF-AFCAT", "ARMY-TGC", "ARMY-SSCT"],
    },
]


# Exam-specific news / notifications (auto-cycling daily feed)
EXAM_NEWS = [
    {
        "id": "news-001", "date": "2026-12-22",
        "type": "Notification",
        "exam": "UPSC-CSE",
        "title": "UPSC CSE 2027 official notification released",
        "summary": "1,056 vacancies announced including 22 PwBD. Online forms open till 18 March 2027. Prelims scheduled for 23 May 2027.",
        "url": "#",
    },
    {
        "id": "news-002", "date": "2026-12-21",
        "type": "Form Open",
        "exam": "IAF-AFCAT",
        "title": "AFCAT 01/2027 forms open from December 26",
        "summary": "Flying, Ground Duty (Technical) and Ground Duty (Non-Technical) branches. Exam in February 2027. Eligibility: Graduation with 60%.",
        "url": "#",
    },
    {
        "id": "news-003", "date": "2026-12-20",
        "type": "Result",
        "exam": "MPSC-RAJYA",
        "title": "MPSC Rajyaseva 2026 final result declared",
        "summary": "1,142 candidates recommended for appointment to various Group A & B posts under Government of Maharashtra.",
        "url": "#",
    },
    {
        "id": "news-004", "date": "2026-12-20",
        "type": "Notification",
        "exam": "GATE",
        "title": "GATE 2027 admit cards live on Jan 5",
        "summary": "Examination conducting institute IIT Roorkee. Test windows: 6-7 and 13-14 February 2027 across 30 papers including Data Science (new).",
        "url": "#",
    },
    {
        "id": "news-005", "date": "2026-12-19",
        "type": "Form Open",
        "exam": "SSC-JE",
        "title": "SSC JE 2027 notification expected by January-end",
        "summary": "Last cycle had ~1,800 vacancies for Junior Engineer (Civil, Mech, Elec, QS). Eligibility: Diploma / BE in relevant stream, age 18-32.",
        "url": "#",
    },
    {
        "id": "news-006", "date": "2026-12-19",
        "type": "Update",
        "exam": "ARMY-TGC",
        "title": "Indian Army TGC-141 application window opens",
        "summary": "60 vacancies for BE/BTech engineers across CSE, ECE, ME, CE branches. Apply via joinindianarmy.nic.in by 22 January 2027.",
        "url": "#",
    },
    {
        "id": "news-007", "date": "2026-12-18",
        "type": "Admit Card",
        "exam": "UPSC-NDA",
        "title": "UPSC NDA-I 2027 admit cards released",
        "summary": "Download from upsc.gov.in. Examination on 18 April 2027 at 50+ centres nationwide. Carry valid photo ID + 2 passport photos.",
        "url": "#",
    },
    {
        "id": "news-008", "date": "2026-12-18",
        "type": "Result",
        "exam": "IAF-AFCAT",
        "title": "AFCAT 02/2026 SSB call letters issued",
        "summary": "AFSB centres at Dehradun, Mysore, Gandhinagar, Varanasi assigned. Reporting from 8 January 2027 onwards.",
        "url": "#",
    },
]
