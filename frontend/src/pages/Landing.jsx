import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CountdownStrip from "@/components/landing/CountdownStrip";
import StatsBar from "@/components/landing/StatsBar";
import Features from "@/components/landing/Features";
import ClosingCTA from "@/components/landing/ClosingCTA";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <main
      data-testid="landing-page"
      className="min-h-screen w-full bg-[#1a1a2e] text-white font-sans-modern relative overflow-x-hidden"
    >
      <Navbar />
      <Hero />
      <CountdownStrip />
      <StatsBar />
      <Features />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
