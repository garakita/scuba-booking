"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NumberStepperProps {
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
}

export function NumberStepper({ label, min = 0, max = 20, defaultValue = 1 }: NumberStepperProps) {
  const [value, setValue] = useState(defaultValue);

  const decrement = () => setValue((v) => Math.max(min, v - 1));
  const increment = () => setValue((v) => Math.min(max, v + 1));

  return (
    <div className="flex flex-row justify-between items-center gap-1 w-full">
      <span className="text-[#122C49] text-base font-normal">{label}</span>
      <div className="flex flex-row items-center gap-2 md:gap-6 px-3 py-1 md:py-3 bg-white rounded-[10px] w-[101px] md:w-[141px] justify-between">
        <button
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
  );
}
