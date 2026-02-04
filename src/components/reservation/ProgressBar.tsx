"use client";

import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Reservation Detail", active: true },
  { id: 2, label: "Select Package", active: false },
  { id: 3, label: "Make Deposit", active: false },
  { id: 4, label: "Complete & Confirm", active: false },
];

export function ProgressBar() {
  return (
    <div className="flex flex-row justify-center items-start px-8 md:px-[320px] py-3 pb-4 w-full max-w-[1376px] bg-[#CD5B4D] rounded-b-[24px]">
      <div className="flex flex-row justify-center items-center gap-2 w-full">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-row justify-center items-center gap-2 flex-1">
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <div
                className={cn(
                  "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center",
                  step.active
                    ? "bg-[#B34032] shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                    : "bg-[#CD5B4D] border border-white"
                )}
              >
                {step.active && (
                  <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#D77C71]" />
                )}
              </div>
              <span
                className={cn(
                  "text-white text-sm md:text-base font-normal md:font-semibold whitespace-nowrap",
                  step.active && "font-semibold"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className="flex-1 h-8 flex items-center">
                <div className="w-full h-px bg-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
