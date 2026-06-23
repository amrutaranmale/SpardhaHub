import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

export default function DemoModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="demo-modal"
        className="max-w-3xl bg-[#131326] border border-white/10 text-white p-0 overflow-hidden"
      >
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-serif-display text-2xl">
            See <span className="text-gold-gradient">SpardhaHub</span> in action
          </DialogTitle>
          <DialogDescription className="text-[#A0A0B5]">
            A 90-second tour of how aspirants crack the toughest exams with us.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4">
          <div
            className="relative aspect-video rounded-xl overflow-hidden border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, #1a1a2e 0%, #20203f 60%, #131326 100%)",
            }}
          >
            {/* Decorative grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(127,119,221,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(127,119,221,0.10) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,159,39,0.25), transparent 60%)",
                filter: "blur(40px)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                data-testid="demo-play-btn"
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EF9F27] to-[#F7C97E] inline-flex items-center justify-center shadow-[0_0_60px_-10px_rgba(239,159,39,0.7)] hover:scale-105 transition-transform"
                aria-label="Play demo"
              >
                <Play size={28} className="text-[#1a1a2e] ml-1" fill="#1a1a2e" />
              </button>
              <p className="text-xs uppercase tracking-[0.22em] text-[#A0A0B5] mt-5">
                Demo video · 1:30
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { k: "Smart", v: "AI roadmap" },
              { k: "Live", v: "Vacancy tracker" },
              { k: "Daily", v: "Current affairs" },
            ].map((c) => (
              <div
                key={c.k}
                className="glass rounded-lg p-3 text-center"
              >
                <div className="text-[#EF9F27] text-xs uppercase tracking-widest">
                  {c.k}
                </div>
                <div className="text-sm text-white mt-1">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
