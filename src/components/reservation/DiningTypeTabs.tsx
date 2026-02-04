"use client";

import { useState } from "react";
import { Waves, Award, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const DIVE_OPTIONS = [
  { id: "beginner", label: "Beginner", icon: Waves },
  { id: "certification", label: "Certification", icon: Award },
  { id: "fun-dives", label: "Buffet Fun Dives", icon: Zap },
];

export function DiningTypeTabs() {
  const [selected, setSelected] = useState("beginner");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-1">
        <div className="w-8 h-8 flex items-center justify-center">
          <Waves className="w-5 h-5 text-[#122C49]" strokeWidth={2} />
        </div>
        <span className="text-[#122C49] font-semibold text-base md:text-xl">
          Experience Level
        </span>
      </div>
      <div className="flex flex-row md:flex-row gap-2 md:gap-4 w-full">
        {DIVE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={cn(
                "flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 flex-1 rounded-lg md:rounded-[10px] transition-all",
                isSelected
                  ? "bg-[#CD5B4D] text-white shadow-[0px_8px_8px_-4px_#F4DDDA,0px_20px_24px_-4px_rgba(16,24,40,0.08)]"
                  : "bg-white border border-[#D5D5DC] text-[#122C49]"
              )}
            >
              <Icon
                className={cn("w-6 h-6", isSelected ? "text-white" : "text-[#122C49]")}
                strokeWidth={2}
              />
              <span
                className={cn(
                  "text-sm md:text-base",
                  isSelected ? "font-semibold text-white" : "font-medium text-[#122C49]"
                )}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
