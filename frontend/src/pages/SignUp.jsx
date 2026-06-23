import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { formatApiError } from "@/lib/api";

export default function SignUp() {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", target_exam: "UPSC-CSE", dob: "" });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill name, email & password");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      await signUp(form);
      toast.success("Welcome to SpardhaHub!");
      nav("/dashboard", { replace: true });
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] text-white px-6 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(239,159,39,0.4), transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-25" style={{ background: "radial-gradient(circle, rgba(127,119,221,0.4), transparent 60%)", filter: "blur(80px)" }} />
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
          Start your <span className="text-gold-gradient italic">journey</span>.
        </h1>
        <p className="text-sm text-[#A0A0B5] mb-7">
          Free forever. No credit card.
        </p>

        <form onSubmit={onSubmit} noValidate className="space-y-3.5" data-testid="signup-form">
          <Field label="Full name" testid="signup-name" type="text" value={form.name} onChange={(v) => set("name", v)} placeholder="Amruta Ranmale" />
          <Field label="Email" testid="signup-email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com" autoComplete="email" />
          <Field label="Password" testid="signup-password" type="password" value={form.password} onChange={(v) => set("password", v)} placeholder="Min 6 characters" autoComplete="new-password" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">Date of birth</label>
              <input
                data-testid="signup-dob"
                type="date"
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
                className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-[#EF9F27]/60"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">Target exam</label>
              <select
                data-testid="signup-target-exam"
                value={form.target_exam}
                onChange={(e) => set("target_exam", e.target.value)}
                className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-[#EF9F27]/60"
              >
                <option value="UPSC-CSE">UPSC CSE</option>
                <option value="UPSC-CDS">UPSC CDS</option>
                <option value="UPSC-NDA">UPSC NDA</option>
                <option value="UPSC-ESE">UPSC ESE/IES</option>
                <option value="UPSC-CAPF">UPSC CAPF</option>
                <option value="UPSC-CMS">UPSC CMS</option>
                <option value="UPSC-IFoS">UPSC IFoS</option>
                <option value="MPSC-RAJYA">MPSC Rajyaseva</option>
                <option value="MPSC-GROUPB">MPSC Group B</option>
                <option value="MPSC-GROUPC">MPSC Group C</option>
                <option value="IAF-AFCAT">IAF AFCAT</option>
                <option value="ARMY-TGC">Army TGC</option>
              </select>
            </div>
          </div>

          <button
            data-testid="signup-submit"
            type="submit"
            disabled={loading}
            className="btn-gold w-full inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl mt-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <>Create account <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="text-sm text-[#A0A0B5] text-center mt-6">
          Already a member?{" "}
          <Link to="/signin" data-testid="link-to-signin" className="text-[#EF9F27] hover:text-[#F7C97E]">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function Field({ label, testid, type, value, onChange, placeholder, autoComplete }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">{label}</label>
      <input
        data-testid={testid}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#7a7a92] focus:outline-none focus:border-[#EF9F27]/60 transition-colors"
      />
    </div>
  );
}
