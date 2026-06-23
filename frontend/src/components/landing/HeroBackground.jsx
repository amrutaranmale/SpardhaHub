import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function HeroBackground() {
  // Pre-generated stars (stable across renders)
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 70; i++) {
      arr.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base deep gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, #20203f 0%, #1a1a2e 45%, #131326 100%)",
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 hero-grid" />

      {/* Animated colored glows */}
      <motion.div
        className="hero-glow-purple"
        initial={{ x: -200, y: -100, opacity: 0.5 }}
        animate={{ x: [-200, 100, -200], y: [-100, 50, -100], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "5%", left: "10%" }}
      />
      <motion.div
        className="hero-glow-gold"
        initial={{ x: 0, y: 0, opacity: 0.3 }}
        animate={{ x: [0, -120, 0], y: [0, 80, 0], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "20%", right: "5%" }}
      />

      {/* Twinkling stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px rgba(255,255,255,0.7)",
          }}
        />
      ))}

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,24,0.55) 100%)",
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-40"
        style={{
          background: "linear-gradient(180deg, transparent, #1a1a2e)",
        }}
      />
    </div>
  );
}
