"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { format, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatDisplayDate(date: Date): string {
  const dateStr = format(date, "MMM d, yyyy");
  return isToday(date) ? `Today ${dateStr}` : dateStr;
}

// Dates that have events (show red dot indicator)
function getEventDates(month: Date): Date[] {
  const d = new Date(month.getFullYear(), month.getMonth(), 29);
  return [d];
}

interface TableDateSelectProps {
  selectedDate: Date;
  onSelectedDateChange: (date: Date) => void;
}

export function TableDateSelect({
  selectedDate,
  onSelectedDateChange,
}: TableDateSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Select Date - inline expandable: calendar appears below, pushes content down */}
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="flex flex-row items-center gap-2">
          <CalendarIcon className="w-5 h-5 md:w-6 md:h-6 text-[#122C49] shrink-0" strokeWidth={2} />
          <span className="text-[#122C49] font-semibold text-base md:text-xl">
            Select Date
          </span>
        </div>
        {/* Date input - click to expand/collapse, show colored border only when open */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex flex-row justify-between items-center w-full min-w-0 h-10 md:h-14 px-4 bg-white rounded-lg md:rounded-[8px] text-base transition-colors text-[#122C49]",
            open ? "border-2 border-[#CD5B4D]" : "border border-[#D5D5DC] hover:border-[#92929D]"
          )}
        >
          <span className="truncate">{formatDisplayDate(selectedDate)}</span>
          {open ? (
            <ChevronUp className="w-5 h-5 text-[#92929D] shrink-0 ml-2" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#92929D] shrink-0 ml-2" />
          )}
        </button>
        {/* Calendar - inline below input, responsive to container width */}
        {open && (
          <div className="mt-2 w-full min-w-0 p-3 md:p-4 border border-[#D5D5DC] rounded-lg md:rounded-[8px] bg-white">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3">
              <div className="flex-1 min-w-0 h-9 px-3 flex items-center border border-[#D5D5DC] rounded-md text-sm text-[#122C49] bg-white">
                {format(selectedDate, "MMM d, yyyy")}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 border-[#D5D5DC] text-[#122C49] hover:bg-[#F1F1F5] hover:border-[#92929D]"
                onClick={() => {
                  onSelectedDateChange(new Date());
                }}
              >
                Today
              </Button>
            </div>
            <div className="w-full min-w-0 overflow-hidden">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    onSelectedDateChange(date);
                    setOpen(false);
                  }
                }}
                modifiers={{
                  hasEvent: getEventDates(selectedDate),
                }}
                modifiersClassNames={{
                  hasEvent: "relative after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-[#CD5B4D]",
                }}
                className="w-full [--cell-size:min(1.75rem,calc((100%-0.5rem)/7))] [&_button[data-selected-single=true]]:!bg-[#CD5B4D] [&_button[data-selected-single=true]]:!text-white [&_button[data-selected-single=true]]:!rounded-full [&_button[data-selected-single=true]]:!shadow-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
