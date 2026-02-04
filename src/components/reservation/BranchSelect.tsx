"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

const BRANCHES = [
  { id: "koh-tao", name: "Koh Tao" },
  { id: "sail-rock", name: "Sail Rock" },
  { id: "chumphon", name: "Chumphon Pinnacle" },
];

export function BranchSelect() {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="flex flex-row items-center gap-1">
        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#122C49]" strokeWidth={2} />
        <span className="text-[#122C49] font-semibold text-base md:text-[20px] md:leading-[26px]">Location</span>
      </div>
      <Select defaultValue="koh-tao">
        <SelectTrigger className="w-full h-10 md:h-14 bg-white border border-[#D5D5DC] rounded-lg md:rounded-[8px] px-4 text-base text-[#92929D] data-[placeholder]:text-[#92929D]">
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent>
          {BRANCHES.map((branch) => (
            <SelectItem key={branch.id} value={branch.id}>
              {branch.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
