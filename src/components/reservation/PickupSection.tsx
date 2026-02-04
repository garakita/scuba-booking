"use client";

import { Car, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PickupSectionProps {
  needsPickup: boolean;
  onNeedsPickupChange: (value: boolean) => void;
  pickupLocation: string;
  onPickupLocationChange: (value: string) => void;
  pickupArea: string;
  onPickupAreaChange: (value: string) => void;
}

export function PickupSection({
  needsPickup,
  onNeedsPickupChange,
  pickupLocation,
  onPickupLocationChange,
  pickupArea,
  onPickupAreaChange,
}: PickupSectionProps) {

  return (
    <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-2xl md:rounded-[24px] shadow-sm">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onNeedsPickupChange(!needsPickup)}
          className={cn(
            "flex flex-row items-center gap-3 p-4 rounded-xl md:rounded-2xl border-2 transition-all text-left",
            needsPickup
              ? "border-[#B34032] bg-[#F4DDDA]/30"
              : "border-[#D5D5DC] bg-white hover:border-[#92929D]"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0",
              needsPickup ? "border-[#B34032] bg-[#B34032]" : "border-[#D5D5DC] bg-white"
            )}
          >
            {needsPickup && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <Car className="w-5 h-5 text-[#122C49]" strokeWidth={2} />
          <span className="text-[#122C49] font-medium">
            Need pickup?
          </span>
        </button>

        {needsPickup && (
          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#122C49] shrink-0" strokeWidth={2} />
                <span className="text-[#122C49] font-semibold text-base md:text-xl">
                  Pickup Location
                </span>
              </div>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => onPickupLocationChange(e.target.value)}
                placeholder="Hotel / Resort name or address"
                className="w-full h-10 md:h-14 px-4 bg-white border border-[#D5D5DC] rounded-lg md:rounded-[8px] text-base text-[#122C49] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#122C49] shrink-0" strokeWidth={2} />
                <span className="text-[#122C49] font-semibold text-base md:text-xl">
                  Pickup Area
                </span>
              </div>
              <input
                type="text"
                value={pickupArea}
                onChange={(e) => onPickupAreaChange(e.target.value)}
                placeholder="e.g. Sairee Beach, Mae Haad"
                className="w-full h-10 md:h-14 px-4 bg-white border border-[#D5D5DC] rounded-lg md:rounded-[8px] text-base text-[#122C49] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
