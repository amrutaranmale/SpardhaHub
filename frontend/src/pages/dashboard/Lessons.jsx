import React from "react";
import { BookOpen } from "lucide-react";
import StudyVideos from "@/components/landing/StudyVideos";

export default function DashboardLessons() {
  return (
    <div data-testid="lessons-page">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen size={22} className="text-[#5EC4B6]" />
        <h1 className="font-serif-display text-3xl">Study Lessons</h1>
      </div>
      <p className="text-[#A0A0B5] mb-4 text-sm">
        22 in-depth lessons — syllabus, exam strategy, and book recommendations.
      </p>
      {/* Reuse the existing lessons component */}
      <div className="-mx-4 lg:-mx-0">
        <StudyVideos />
      </div>
    </div>
  );
}
