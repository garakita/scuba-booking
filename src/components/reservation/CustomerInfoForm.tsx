"use client";

import { useState } from "react";
import { User, Phone, Car, Building2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Common country codes for international phone support
const COUNTRY_CODES = [
  { code: "+66", country: "Thailand" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" },
  { code: "+86", country: "China" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+31", country: "Netherlands" },
  { code: "+65", country: "Singapore" },
  { code: "+60", country: "Malaysia" },
  { code: "+62", country: "Indonesia" },
  { code: "+84", country: "Vietnam" },
  { code: "+91", country: "India" },
  { code: "+971", country: "UAE" },
  { code: "+7", country: "Russia" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+27", country: "South Africa" },
  { code: "+234", country: "Nigeria" },
  { code: "+254", country: "Kenya" },
  { code: "+20", country: "Egypt" },
  { code: "+90", country: "Turkey" },
  { code: "+972", country: "Israel" },
  { code: "+353", country: "Ireland" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+45", country: "Denmark" },
  { code: "+358", country: "Finland" },
  { code: "+41", country: "Switzerland" },
  { code: "+43", country: "Austria" },
  { code: "+48", country: "Poland" },
  { code: "+420", country: "Czech Republic" },
  { code: "+36", country: "Hungary" },
  { code: "+64", country: "New Zealand" },
  { code: "+63", country: "Philippines" },
  { code: "+852", country: "Hong Kong" },
  { code: "+886", country: "Taiwan" },
];

export function CustomerInfoForm() {
  const [countryCode, setCountryCode] = useState("+66");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [needsPickup, setNeedsPickup] = useState(false);
  const [hotelName, setHotelName] = useState("");

  return (
    <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-2xl md:rounded-[24px] shadow-sm">
      {/* Customer Name */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <User className="w-5 h-5 md:w-6 md:h-6 text-[#122C49]" strokeWidth={2} />
          <span className="text-[#122C49] font-semibold text-base md:text-[20px] md:leading-[26px]">
            Customer Name
          </span>
        </div>
        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full h-10 md:h-14 px-4 bg-white border border-[#D5D5DC] rounded-lg md:rounded-[8px] text-base text-[#122C49] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
        />
      </div>

      {/* Contact Phone - International (unified block, same size as other inputs) */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#122C49]" strokeWidth={2} />
          <span className="text-[#122C49] font-semibold text-base md:text-[20px] md:leading-[26px]">
            Contact Phone
          </span>
        </div>
        <div className="w-full h-10 md:h-14 flex flex-row bg-white border border-[#D5D5DC] rounded-lg md:rounded-[8px] overflow-hidden focus-within:ring-2 focus-within:ring-[#CD5B4D]/30 focus-within:border-[#CD5B4D]">
          <Select value={countryCode} onValueChange={setCountryCode}>
            <SelectTrigger className="h-full min-h-0 border-0 rounded-none bg-transparent px-3 md:px-4 w-[100px] md:w-[130px] shrink-0 text-base text-[#122C49] focus:ring-0 focus:border-0 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              className="max-h-[280px] w-[100px] min-w-[100px] md:w-[130px] md:min-w-[130px] bg-white z-[100] shadow-lg border border-[#D5D5DC]"
              position="popper"
              align="start"
            >
              {COUNTRY_CODES.map(({ code }) => (
                <SelectItem key={code} value={code}>
                  {code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="w-px bg-[#D5D5DC] self-stretch" />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            placeholder="123 456 789"
            className="flex-1 min-w-0 h-full px-4 bg-transparent text-base text-[#122C49] placeholder:text-[#92929D] focus:outline-none border-0"
          />
        </div>
        <p className="text-[#92929D] text-xs">
          International format supported. Enter number without country code.
        </p>
      </div>

      {/* Hotel Pickup Option */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setNeedsPickup(!needsPickup)}
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
            Need hotel pickup?
          </span>
        </button>

        {/* Hotel Name - conditional */}
        {needsPickup && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-row items-center gap-2">
              <Building2 className="w-5 h-5 md:w-6 md:h-6 text-[#122C49]" strokeWidth={2} />
              <span className="text-[#122C49] font-semibold text-base md:text-[20px] md:leading-[26px]">
                Hotel Name
              </span>
            </div>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              placeholder="Enter hotel/resort name"
              className="w-full h-10 md:h-14 px-4 bg-white border border-[#D5D5DC] rounded-lg md:rounded-[8px] text-base text-[#122C49] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
