import React from "react";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";
import Logo from "@/components/landing/Logo";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/8 bg-[#131326] px-6 lg:px-10 pt-16 pb-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div className="font-serif-display text-2xl tracking-tight leading-none">
              <span className="text-white">Spardha</span>
              <span className="text-gold-gradient">Hub</span>
            </div>
          </div>
          <p className="text-sm text-[#A0A0B5] mt-3 max-w-xs leading-relaxed">
            Your Goal. Our Path. India&apos;s most-loved exam preparation
            companion — free, forever.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full glass inline-flex items-center justify-center text-[#C7C7D6] hover:text-white hover:border-white/25 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[#7a7a92] mb-4">
            Exams
          </div>
          <ul className="space-y-2 text-sm text-[#C7C7D6]">
            <li>UPSC CSE</li>
            <li>MPSC</li>
            <li>SSC CGL</li>
            <li>CA Foundation</li>
            <li>RBI Grade B</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[#7a7a92] mb-4">
            Product
          </div>
          <ul className="space-y-2 text-sm text-[#C7C7D6]">
            <li>Smart Roadmap</li>
            <li>Progress Tracker</li>
            <li>Current Affairs</li>
            <li>Salary Calculator</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[#7a7a92] mb-4">
            Company
          </div>
          <ul className="space-y-2 text-sm text-[#C7C7D6]">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#7a7a92]">
          © 2026 SpardhaHub by Amruta Ranmale. All rights reserved.
        </p>
        <p className="text-xs text-[#7a7a92]">
          Crafted with <span className="text-[#EF9F27]">♦</span> for India&apos;s aspirants.
        </p>
      </div>
    </footer>
  );
}
