import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ClosingCTA() {
  const nav = useNavigate();
  const { user } = useAuth();

  return (
    <section
      data-testid="closing-cta-section"
      className="relative py-28 md:py-36 px-6 lg:px-10"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden glass-strong p-10 md:p-16 text-center"
        >
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(239,159,39,0.22), transparent 60%)", filter: "blur(60px)" }}
          />
          <div
            className="absolute -bottom-20 -left-10 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(127,119,221,0.22), transparent 60%)", filter: "blur(60px)" }}
          />

          <div className="relative">
            <span className="text-xs uppercase tracking-[0.22em] text-[#7F77DD]">
              Your Goal · Our Path
            </span>
            <h2 className="font-serif-display text-4xl md:text-6xl mt-4 leading-[1.05] text-white">
              The exam doesn&apos;t wait.{" "}
              <span className="text-gold-gradient italic">Neither should you.</span>
            </h2>
            <p className="text-[#A0A0B5] text-base md:text-lg mt-6 max-w-xl mx-auto">
              Join 50 lakh+ aspirants studying smarter on SpardhaHub — free, forever.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                data-testid="closing-primary-cta"
                onClick={() => nav(user ? "/dashboard" : "/signup")}
                className="btn-gold inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl whitespace-nowrap"
              >
                {user ? "Open Dashboard" : "Claim My Free Account"}
                <ArrowRight size={16} />
              </button>
              {!user && (
                <button
                  data-testid="closing-signin-cta"
                  onClick={() => nav("/signin")}
                  className="btn-outline-soft inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
                >
                  I already have an account
                </button>
              )}
            </div>
            <p className="text-xs text-[#7a7a92] mt-5">
              No credit card · Cancel anytime · Made in India 🇮🇳
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
