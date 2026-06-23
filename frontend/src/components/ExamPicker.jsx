import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Shared dark-themed exam picker (uses shadcn Select, fetches /api/exams) */
export default function ExamPicker({ value, onChange, testid = "exam-picker", label = "Pick an exam" }) {
  const [byBody, setByBody] = useState({});

  useEffect(() => {
    api.get("/exams").then((r) => setByBody(r.data?.by_body || {})).catch(() => {});
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        data-testid={testid}
        className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 h-12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EF9F27]/40 focus:border-[#EF9F27]/60 hover:bg-white/[0.07] hover:border-white/25 transition-colors cursor-pointer"
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={6}
        className="bg-[#14142a] border border-white/10 text-white max-h-80 z-[60]"
      >
        {Object.entries(byBody).map(([body, list]) => (
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
      </SelectContent>
    </Select>
  );
}
