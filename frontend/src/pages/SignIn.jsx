import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { formatApiError } from "@/lib/api";

export default function SignIn() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email & password required");
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
      toast.success("Welcome back!");
      nav(loc.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] text-white px-6 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(127,119,221,0.4), transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-25" style={{ background: "radial-gradient(circle, rgba(239,159,39,0.4), transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md glass-strong rounded-3xl p-8 md:p-10 border border-white/10"
      >
        <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
          <Logo size={32} />
          <span className="font-serif-display text-2xl">
            <span className="text-white">Spardha</span><span className="text-gold-gradient">Hub</span>
          </span>
        </Link>

        <h1 className="font-serif-display text-3xl md:text-4xl mb-2 leading-tight">
          Welcome back.
        </h1>
        <p className="text-sm text-[#A0A0B5] mb-8">
          Continue your prep where you left off.
        </p>

        <form onSubmit={onSubmit} noValidate className="space-y-4" data-testid="signin-form">
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">Email</label>
            <input
              data-testid="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#7a7a92] focus:outline-none focus:border-[#EF9F27]/60 transition-colors"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">Password</label>
            <input
              data-testid="signin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#7a7a92] focus:outline-none focus:border-[#EF9F27]/60 transition-colors"
              autoComplete="current-password"
            />
          </div>

          <button
            data-testid="signin-submit"
            type="submit"
            disabled={loading}
            className="btn-gold w-full inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <>Sign in <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="text-sm text-[#A0A0B5] text-center mt-7">
          New here?{" "}
          <Link to="/signup" data-testid="link-to-signup" className="text-[#EF9F27] hover:text-[#F7C97E]">
            Create a free account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
