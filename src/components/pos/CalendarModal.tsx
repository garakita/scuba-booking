"use client";

import { useState, useMemo } from "react";
import type { Reservation } from "@/lib/booking-types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path d="M12 14l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path d="M8 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarModal({
  selectedDate,
  reservations,
  onSelectDate,
  onClose,
}: {
  selectedDate: Date;
  reservations: Reservation[];
  onSelectDate: (d: Date) => void;
  onClose: () => void;
}) {
  const [viewMonth, setViewMonth] = useState<Date>(() => new Date(selectedDate));

  const monthStart = useMemo(() => {
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    return d;
  }, [viewMonth]);

  const monthDays = useMemo(() => {
    const start = new Date(monthStart);
    const dayOfWeek = start.getDay();
    const startOffset = dayOfWeek;
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    const result: { date: Date; isCurrentMonth: boolean }[] = [];
    const firstCell = new Date(start);
    firstCell.setDate(firstCell.getDate() - startOffset);
    for (let i = 0; i < totalCells; i++) {
      const d = new Date(firstCell);
      d.setDate(d.getDate() + i);
      result.push({
        date: d,
        isCurrentMonth: d.getMonth() === viewMonth.getMonth(),
      });
    }
    return result;
  }, [monthStart, viewMonth]);

  const prevMonth = () => {
    const d = new Date(viewMonth);
    d.setMonth(d.getMonth() - 1);
    setViewMonth(d);
  };
  const nextMonth = () => {
    const d = new Date(viewMonth);
    d.setMonth(d.getMonth() + 1);
    setViewMonth(d);
  };

  const getReservationStatsForDate = (d: Date) => {
    const dateStr = d.toISOString().split("T")[0];
    const dayRes = reservations.filter((r) => r.date === dateStr);
    const total = dayRes.length;
    const needPayment = dayRes.filter((r) => (r.paidAmount ?? 0) < r.totalPrice).length;
    return { total, needPayment };
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#171725]/20" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-[95vw] sm:max-w-[1100px] max-h-[90vh] overflow-auto bg-white rounded-[10px] shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-[#E2E2EA] shrink-0">
          <h2 className="text-2xl font-bold text-[#171725] flex items-center gap-2">
            <CalendarIcon className="w-7 h-7 text-[#CD5B4D]" />
            Calendar
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#F1F1F5] text-[#282930]"
            aria-label="Close"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {/* Month navigation */}
          <div className="flex items-center gap-4">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-[#F1F1F5] shrink-0">
              <ChevronLeft className="w-5 h-5 text-[#171725]" />
            </button>
            <span className="flex-1 text-center text-lg font-semibold text-[#171725]">
              {viewMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </span>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-[#F1F1F5] shrink-0">
              <ChevronRight className="w-5 h-5 text-[#171725]" />
            </button>
          </div>

          {/* Month calendar grid */}
          <div className="w-full rounded-2xl border border-[#E2E2EA] overflow-hidden bg-white">
            <div className="grid grid-cols-7 border-b border-[#E2E2EA]">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="px-2 py-3 text-center text-xs font-semibold uppercase text-[#696974] bg-[#FAFAFB]"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {monthDays.map(({ date, isCurrentMonth }, i) => {
                const { total, needPayment } = getReservationStatsForDate(date);
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const isToday = date.toDateString() === new Date().toDateString();
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onSelectDate(date)}
                    className={`min-h-[64px] p-2 border-b border-r border-[#E2E2EA] flex flex-col items-center justify-start gap-1 transition-colors ${
                      !isCurrentMonth ? "bg-[#FAFAFB] text-[#92929D]" : "bg-white hover:bg-[#F4DDDA]/50"
                    } ${isSelected ? "bg-[#F4DDDA] text-[#CD5B4D]" : ""} ${
                      isToday && isCurrentMonth && !isSelected ? "ring-1 ring-inset ring-[#CD5B4D]/40" : ""
                    }`}
                    style={{ borderRightColor: (i + 1) % 7 === 0 ? "transparent" : undefined }}
                  >
                    <span className={`text-base font-medium ${isSelected ? "text-[#CD5B4D]" : ""}`}>
                      {date.getDate()}
                    </span>
                    {total > 0 && (
                      <div className="flex items-center gap-1 justify-center">
                        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#E2E2EA] text-[#696974] text-[10px] font-medium">
                          {total}
                        </span>
                        {needPayment > 0 && (
                          <span
                            className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#CD5B4D]/20 text-[#CD5B4D] text-[10px] font-medium"
                            title={`${needPayment} need to pay more`}
                          >
                            {needPayment}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend - below calendar */}
          <div className="flex items-center gap-6 text-xs text-[#92929D]">
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#E2E2EA] shrink-0" />
              Total
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#CD5B4D]/20 shrink-0" />
              Need payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
