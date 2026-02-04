"use client";

import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Reservation Detail" },
  { id: 2, label: "Select Package" },
  { id: 3, label: "Customer Information" },
  { id: 4, label: "Summary and Payment" },
];

interface HeaderProps {
  currentStep?: number;
  venueName?: string;
  branchName?: string;
  totalPrice?: number;
}

export function Header({
  currentStep = 1,
  venueName = "Koh Tao Scuba Club",
  branchName = "Koh Tao",
  totalPrice = 0,
}: HeaderProps) {
  return (
    <header className="w-full bg-[#CD5B4D] rounded-b-2xl lg:rounded-b-[24px] shadow-lg">
      {/* Desktop: Single row - Name | Progress | Status */}
      <div className="hidden lg:flex flex-row items-center justify-between gap-6 px-6 xl:px-8 py-6 lg:py-8 pb-8 lg:pb-10 max-w-[1440px] mx-auto">
        {/* Left: Venue name */}
        <div className="flex flex-row items-center gap-1 shrink-0 min-w-0">
          <span className="text-white font-semibold text-base truncate">
            {venueName}
          </span>
          <span className="text-white text-sm shrink-0">-</span>
          <span className="text-white text-sm truncate">{branchName}</span>
        </div>

        {/* Center: Progress bar - equal spacing, line centered with circles */}
        <div className="flex flex-row items-start flex-1 min-w-0 px-4">
          {STEPS.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div key={step.id} className="contents">
                <div className="flex flex-1 flex-col items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      isActive || isCompleted
                        ? "bg-[#B34032] shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                        : "bg-transparent border-2 border-white"
                    )}
                  >
                    {(isActive || isCompleted) && (
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-[#D77C71]" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-white text-xs lg:text-sm text-center leading-tight whitespace-nowrap",
                      isActive || isCompleted ? "font-semibold" : "font-normal opacity-90"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-px bg-white/60 min-w-[16px] mt-5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Date, Time, Price */}
        <div className="flex flex-row items-center gap-3 shrink-0">
          <div className="flex flex-row items-center gap-1.5 text-white">
            <Calendar className="w-5 h-5 shrink-0" />
            <span className="text-sm whitespace-nowrap">
              {format(new Date(), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center px-2 py-1 bg-[#B34032] rounded text-white">
            <span className="text-sm font-semibold">12:00</span>
          </div>
          <span className="text-base font-semibold text-white">
            ฿{totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Mobile/Tablet: Stacked layout */}
      <div className="lg:hidden flex flex-col">
        <div className="flex flex-row items-center justify-between gap-2 px-5 py-5 lg:py-6">
          <div className="flex flex-row items-center gap-1 min-w-0">
            <span className="text-white font-semibold text-sm truncate">
              {venueName}
            </span>
            <span className="text-white text-sm shrink-0">-</span>
            <span className="text-white text-xs truncate">{branchName}</span>
          </div>
          <div className="flex flex-row items-center gap-2 shrink-0">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-white text-xs">
              {format(new Date(), "MMM d, yyyy")}
            </span>
            <div className="px-1.5 py-0.5 bg-[#B34032] rounded">
              <span className="text-xs font-semibold text-white">12:00</span>
            </div>
            <span className="text-sm font-semibold text-white">
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
        {/* Progress bar - mobile, equal spacing, line centered with circles */}
        <div className="flex flex-row items-start px-5 pb-6 lg:pb-8">
          {STEPS.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div key={step.id} className="contents">
                <div className="flex flex-1 flex-col items-center gap-1 min-w-0">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                      isActive || isCompleted
                        ? "bg-[#B34032] shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                        : "bg-transparent border border-white"
                    )}
                  >
                    {(isActive || isCompleted) && (
                      <div className="w-3 h-3 rounded-full bg-white border border-[#D77C71]" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-white text-[10px] text-center leading-tight whitespace-nowrap",
                      isActive || isCompleted ? "font-semibold" : "font-normal"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 min-w-[8px] h-px bg-white/60 mt-[14px]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
