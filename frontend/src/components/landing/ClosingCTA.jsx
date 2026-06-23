import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ClosingCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API}/signup`, { email, source: "footer_cta" });
      toast.success(res.data?.message || "You're on the list!");
      setEmail("");
    } catch (err) {
      toast.error("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

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
          {/* Gold sweep accent */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(239,159,39,0.22), transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-10 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(127,119,221,0.22), transparent 60%)",
              filter: "blur(60px)",
            }}
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

            <form
              onSubmit={onSubmit}
              data-testid="closing-signup-form"
              className="mt-10 max-w-xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3 p-1.5 sm:p-2 rounded-2xl glass">
                <input
                  data-testid="closing-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-4 py-3 text-white placeholder-[#7a7a92] focus:outline-none rounded-xl"
                  autoComplete="email"
                />
                <button
                  data-testid="closing-primary-cta"
                  type="submit"
                  disabled={loading}
                  className="btn-gold inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl whitespace-nowrap disabled:opacity-60"
                >
                  {loading ? "Joining..." : "Claim My Free Account"}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </div>
              <p className="text-xs text-[#7a7a92] mt-4">
                No credit card · Cancel anytime · Made in India 🇮🇳
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
