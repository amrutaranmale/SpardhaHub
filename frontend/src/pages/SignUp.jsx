import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { useAuth } from "@/contexts/AuthContext";
import api, { formatApiError } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SignUp() {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", target_exam: "UPSC-CSE", dob: "" });
  const [loading, setLoading] = useState(false);
  const [examsByBody, setExamsByBody] = useState({});

  useEffect(() => {
    api.get("/exams").then((r) => setExamsByBody(r.data?.by_body || {})).catch(() => {});
  }, []);

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
        <p className="text-sm text-[#A0A0B5] mb-7">Free forever. No credit card.</p>

        <form onSubmit={onSubmit} noValidate className="space-y-4" data-testid="signup-form">
          <Field label="Full name" testid="signup-name" type="text" value={form.name} onChange={(v) => set("name", v)} placeholder="Amruta Ranmale" />
          <Field label="Email" testid="signup-email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com" autoComplete="email" />
          <Field label="Password" testid="signup-password" type="password" value={form.password} onChange={(v) => set("password", v)} placeholder="Min 6 characters" autoComplete="new-password" />

          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">Date of birth</label>
            <input
              data-testid="signup-dob"
              type="date"
              value={form.dob}
              onChange={(e) => set("dob", e.target.value)}
              className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#EF9F27]/60"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-[#A0A0B5]">Target exam</label>
            <Select value={form.target_exam} onValueChange={(v) => set("target_exam", v)}>
              <SelectTrigger
                data-testid="signup-target-exam"
                className="mt-1.5 w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 h-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EF9F27]/40 focus:border-[#EF9F27]/60 hover:bg-white/[0.07] hover:border-white/25 cursor-pointer transition-colors"
              >
                <SelectValue placeholder="Pick an exam" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={6}
                className="bg-[#14142a] border border-white/10 text-white max-h-80 z-[60]"
              >
                {Object.entries(examsByBody).map(([body, list]) => (
                  <SelectGroup key={body}>
                    <SelectLabel className="text-[10px] uppercase tracking-[0.18em] text-[#EF9F27]">
                      {body}
                    </SelectLabel>
                    {list.map((e) => (
                      <SelectItem
                        key={e.code}
                        value={e.code}
                        className="text-white text-sm focus:bg-white/[0.06] focus:text-white data-[state=checked]:text-[#EF9F27]"
                      >
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
                {Object.keys(examsByBody).length === 0 && (
                  <div className="px-3 py-4 text-sm text-[#A0A0B5]">Loading exams…</div>
                )}
              </SelectContent>
            </Select>
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
