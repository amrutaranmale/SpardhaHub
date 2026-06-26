import { createContext, useContext, useState } from "react";

export const translations = {
  en: {
    home: "Home", exams: "Exams", videos: "Videos", stats: "Stats",
    signin: "Sign In", getStarted: "Get Started",
    tagline: "Your Goal · Our Path",
    hero: "Crack UPSC, MPSC, CA & More",
    subhero: "Personalized roadmaps · Live vacancy tracker · AI-powered study planner.",
    startFree: "Start Your Journey Free",
    watchDemo: "Watch Demo",
    features: "Features", roadmap: "Roadmap", progress: "Progress",
    currentAffairs: "Current Affairs", eligibility: "Eligibility",
    salary: "Salary", alerts: "Alerts", news: "News",
    study: "Study Center", engineering: "Engineering Hub", lessons: "Lessons",
  },
  hi: {
    home: "होम", exams: "परीक्षाएं", videos: "वीडियो", stats: "आंकड़े",
    signin: "साइन इन", getStarted: "शुरू करें",
    tagline: "आपका लक्ष्य · हमारा मार्ग",
    hero: "UPSC, MPSC, CA और अधिक को क्रैक करें",
    subhero: "व्यक्तिगत रोडमैप · लाइव वैकेंसी ट्रैकर · AI अध्ययन योजनाकार।",
    startFree: "मुफ्त शुरू करें",
    watchDemo: "डेमो देखें",
    features: "विशेषताएं", roadmap: "रोडमैप", progress: "प्रगति",
    currentAffairs: "करंट अफेयर्स", eligibility: "पात्रता",
    salary: "वेतन", alerts: "अलर्ट", news: "समाचार",
    study: "अध्ययन केंद्र", engineering: "इंजीनियरिंग हब", lessons: "पाठ",
  },
  mr: {
    home: "मुख्यपृष्ठ", exams: "परीक्षा", videos: "व्हिडिओ", stats: "आकडेवारी",
    signin: "साइन इन", getStarted: "सुरू करा",
    tagline: "तुमचे ध्येय · आमचा मार्ग",
    hero: "UPSC, MPSC, CA आणि अधिक क्रॅक करा",
    subhero: "वैयक्तिक रोडमॅप · लाइव्ह व्हेकन्सी ट्रॅकर · AI अभ्यास नियोजक।",
    startFree: "मोफत सुरू करा",
    watchDemo: "डेमो पहा",
    features: "वैशिष्ट्ये", roadmap: "रोडमॅप", progress: "प्रगती",
    currentAffairs: "चालू घडामोडी", eligibility: "पात्रता",
    salary: "पगार", alerts: "अलर्ट", news: "बातम्या",
    study: "अभ्यास केंद्र", engineering: "इंजिनिअरिंग हब", lessons: "धडे",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  const setLanguage = (l) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
