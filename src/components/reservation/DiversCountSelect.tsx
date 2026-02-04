"use client";

import { Minus, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiversCountSelectProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  companyName?: string;
  companyNameTh?: string;
  logoSrc?: string;
}

export function DiversCountSelect({
  value,
  onChange,
  min = 1,
  max = 20,
  companyName,
  companyNameTh,
  logoSrc,
}: DiversCountSelectProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  const hasCompanyInfo = companyName || logoSrc;

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-2xl md:rounded-[24px] shadow-sm overflow-visible",
        hasCompanyInfo && "lg:px-8 pt-10 md:pt-12 lg:pt-[60px]"
      )}
    >
      {/* Logo + Company name - per ref: logo center on card top edge, half on banner half on card */}
      {hasCompanyInfo && (
        <div className="flex flex-row items-end gap-3 sm:gap-4 lg:gap-5 -mt-20 md:-mt-24 lg:-mt-[120px]">
          {/* Logo: center aligned with card top edge (negative margin = half logo height) */}
          <div className="shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px] rounded-full bg-[#122C49] border-2 border-white flex items-center justify-center overflow-hidden shadow-lg">
              {logoSrc ? (
                <img src={logoSrc} alt={companyName ?? ""} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-2xl md:text-4xl lg:text-5xl">🐠</span>
              )}
            </div>
          </div>
          {/* Company name - aligned with logo baseline */}
          <div className="flex-1 pb-1 lg:pb-2">
            <h1 className="text-[#122C49] font-semibold text-lg md:text-2xl lg:text-[28px] lg:leading-[36px]">
              {companyName}
            </h1>
          </div>
        </div>
      )}
      {hasCompanyInfo && (
        <div className="mt-2 lg:mt-4">
          <div className="w-full h-px bg-[#D5D5DC]" />
        </div>
      )}
      <div className="flex flex-row items-center gap-2">
        <Users className="w-5 h-5 md:w-6 md:h-6 text-[#122C49]" strokeWidth={2} />
        <span className="text-[#122C49] font-semibold text-base md:text-xl">
          Number of Divers
        </span>
      </div>
      <div className="flex flex-row justify-between items-center gap-1 w-full">
        <span className="text-[#122C49] text-base font-normal">
          How many people?
        </span>
        <div className="flex flex-row items-center gap-2 md:gap-6 px-3 py-1 md:py-3 bg-white border border-[#D5D5DC] rounded-[10px] w-[101px] md:w-[141px] justify-between">
          <button
            type="button"
            onClick={decrement}
            disabled={value <= min}
            className={cn(
              "w-6 h-6 rounded flex items-center justify-center transition-colors",
              value <= min ? "bg-[#F1F1F5]" : "bg-[#F1F1F5] hover:bg-gray-200"
            )}
          >
            <Minus
              className={cn("w-4 h-4", value <= min ? "text-[#D5D5DC]" : "text-[#CD5B4D]")}
              strokeWidth={2}
            />
          </button>
          <span className="text-[#122C49] font-medium text-sm md:text-base min-w-[21px] text-center">
            {value}
          </span>
          <button
            type="button"
            onClick={increment}
            disabled={value >= max}
            className={cn(
              "w-6 h-6 rounded flex items-center justify-center transition-colors",
              value >= max ? "bg-[#F1F1F5]" : "bg-[#F1F1F5] hover:bg-gray-200"
            )}
          >
            <Plus
              className={cn("w-4 h-4", value >= max ? "text-[#D5D5DC]" : "text-[#CD5B4D]")}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
