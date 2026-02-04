"use client";

import { Calendar } from "lucide-react";
import { format } from "date-fns";

export function StatusBar() {
  return (
    <div className="flex flex-row items-center gap-2 md:gap-4 shrink-0">
      <div className="flex flex-row items-center gap-1 text-white">
        <Calendar className="w-4 h-4 md:w-5 md:h-5" />
        <span className="text-xs md:text-base">{format(new Date(), "MMM d, yyyy")}</span>
      </div>
      <div className="flex flex-row items-center gap-1 px-1 py-0.5 bg-[#B34032] rounded text-white">
        <span className="text-xs md:text-sm font-semibold">12:00</span>
      </div>
      <span className="text-sm md:text-base font-semibold text-white">฿0</span>
    </div>
  );
}
