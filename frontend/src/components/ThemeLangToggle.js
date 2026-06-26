import { useTheme } from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LanguageContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeLangToggle() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLanguage } = useLang();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          background: "transparent",
          border: "1px solid rgba(239,159,39,0.4)",
          borderRadius: "8px",
          padding: "6px 10px",
          cursor: "pointer",
          color: "#EF9F27",
          display: "flex",
          alignItems: "center",
        }}
        title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Language Toggle */}
      <select
        value={lang}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          background: "rgba(20,20,42,0.9)",
          border: "1px solid rgba(239,159,39,0.4)",
          borderRadius: "8px",
          padding: "6px 10px",
          cursor: "pointer",
          color: "#EF9F27",
          fontSize: "13px",
        }}
      >
        <option value="en">EN</option>
        <option value="hi">हि</option>
        <option value="mr">म</option>
      </select>
    </div>
  );
}
