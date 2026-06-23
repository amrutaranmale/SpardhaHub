import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Map, TrendingUp, Globe, UserCheck, Calculator, BellRing, BookOpen, Newspaper, GraduationCap, Library, LogOut, ChevronLeft } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/study", label: "Study Center", icon: Library },
  { to: "/dashboard/engineering", label: "Engineering Hub", icon: GraduationCap },
  { to: "/dashboard/roadmap", label: "Smart Roadmap", icon: Map },
  { to: "/dashboard/progress", label: "Progress Tracker", icon: TrendingUp },
  { to: "/dashboard/news", label: "Daily Exam News", icon: Newspaper },
  { to: "/dashboard/current-affairs", label: "Current Affairs", icon: Globe },
  { to: "/dashboard/eligibility", label: "Eligibility Checker", icon: UserCheck },
  { to: "/dashboard/salary", label: "Salary Calculator", icon: Calculator },
  { to: "/dashboard/alerts", label: "Exam Alerts", icon: BellRing },
  { to: "/dashboard/lessons", label: "Study Lessons", icon: BookOpen },
];

export default function DashboardLayout() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();

  const logout = () => {
    signOut();
    toast.success("Signed out");
    nav("/");
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* Top bar */}
      <header className="border-b border-white/8 bg-[#131326]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2.5" data-testid="dashboard-logo">
            <Logo size={28} />
            <span className="font-serif-display text-xl leading-none">
              <span className="text-white">Spardha</span><span className="text-gold-gradient">Hub</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-[#C7C7D6] hover:text-white inline-flex items-center gap-1">
              <ChevronLeft size={14} /> Home
            </Link>
            <div className="hidden sm:block text-xs text-[#A0A0B5]">
              Hi, <span className="text-white font-medium">{user?.name?.split(" ")[0] || "Aspirant"}</span>
            </div>
            <button
              data-testid="logout-btn"
              onClick={logout}
              className="text-xs text-[#C7C7D6] hover:text-[#EF9F27] inline-flex items-center gap-1.5 border border-white/10 px-3 py-1.5 rounded-full hover:border-[#EF9F27]/40 transition-colors"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-2 lg:mx-0 px-2 lg:px-0 pb-2 lg:pb-0">
            {NAV.map((it) => {
              const Icon = it.icon;
              return (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end={it.end}
                  data-testid={`nav-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-[#EF9F27]/12 text-[#EF9F27] border border-[#EF9F27]/30"
                        : "text-[#C7C7D6] hover:text-white hover:bg-white/[0.04] border border-transparent"
                    }`
                  }
                >
                  <Icon size={16} />
                  {it.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
