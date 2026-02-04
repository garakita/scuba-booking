"use client";

import { cn } from "@/lib/utils";
import type { CoursePackage } from "@/lib/courses";

interface CoursePackageCardProps {
  course: CoursePackage;
  selected: boolean;
  onSelect: () => void;
}

export function CoursePackageCard({ course, selected, onSelect }: CoursePackageCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all",
        selected
          ? "border-[#B34032] bg-[#F4DDDA]/30 shadow-[0px_4px_10px_rgba(234,128,99,0.15)]"
          : "border-[#D5D5DC] bg-white hover:border-[#92929D] hover:bg-gray-50/50"
      )}
    >
      {/* Radio indicator */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
            selected ? "border-[#B34032] bg-[#B34032]" : "border-[#D5D5DC] bg-white"
          )}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[#122C49] font-semibold text-base md:text-lg">
          {course.name}
        </h3>
        <p className="text-[#92929D] text-sm mt-0.5">
          {course.description}
        </p>
      </div>

      {/* Price */}
      <div className="shrink-0">
        <span className="text-[#122C49] font-semibold text-lg md:text-xl">
          ฿{course.price.toLocaleString()}
        </span>
        <span className="text-[#92929D] text-sm ml-1">THB</span>
      </div>
    </button>
  );
}
