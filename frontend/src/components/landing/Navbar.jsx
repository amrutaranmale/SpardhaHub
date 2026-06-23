import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Exams", href: "#countdown" },
  { label: "Stats", href: "#stats" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#1a1a2e]/75 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="font-serif-display text-2xl tracking-tight">
            <span className="text-white">Spardha</span>
            <span className="text-gold-gradient">Hub</span>
          </span>
          <span className="hidden md:inline-block text-[10px] uppercase tracking-[0.18em] text-[#A0A0B5] ml-2 border-l border-white/15 pl-2">
            Your Goal · Our Path
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navItems.map((it) => (
            <a
              key={it.label}
              href={it.href}
              className="nav-link text-sm text-[#C7C7D6] hover:text-white transition-colors"
              data-testid={`nav-link-${it.label.toLowerCase()}`}
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#signup"
            data-testid="nav-signin"
            className="text-sm text-[#C7C7D6] hover:text-white transition-colors"
          >
            Sign in
          </a>
          <a
            href="#signup"
            data-testid="nav-cta"
            className="btn-gold inline-flex items-center text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-full glass"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-[#1a1a2e]/95 backdrop-blur-xl"
            data-testid="nav-mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="text-[#C7C7D6] hover:text-white"
                >
                  {it.label}
                </a>
              ))}
              <a
                href="#signup"
                onClick={() => setOpen(false)}
                className="btn-gold inline-flex items-center justify-center text-sm font-semibold px-5 py-3 rounded-full"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
