"use client";

import { User, Phone, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRY_CODES = [
  { code: "+66", country: "Thailand" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+61", country: "Australia" },
  { code: "+65", country: "Singapore" },
  { code: "+60", country: "Malaysia" },
  { code: "+62", country: "Indonesia" },
  { code: "+84", country: "Vietnam" },
  { code: "+91", country: "India" },
  { code: "+82", country: "South Korea" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+31", country: "Netherlands" },
  { code: "+971", country: "UAE" },
  { code: "+64", country: "New Zealand" },
  { code: "+63", country: "Philippines" },
];

export interface DiverContact {
  name: string;
  countryCode: string;
  phoneNumber: string;
}

interface DiversContactFormProps {
  count: number;
  contacts: DiverContact[];
  onContactsChange: (contacts: DiverContact[]) => void;
  email?: string;
  onEmailChange?: (email: string) => void;
}

export function DiversContactForm({
  count,
  contacts,
  onContactsChange,
  email = "",
  onEmailChange,
}: DiversContactFormProps) {
  const updateContact = (index: number, field: keyof DiverContact, value: string) => {
    const next = [...contacts];
    if (!next[index]) {
      next[index] = { name: "", countryCode: "+66", phoneNumber: "" };
    }
    next[index] = { ...next[index], [field]: value };
    onContactsChange(next);
  };

  // Ensure we have enough contact slots
  const slots = Array.from({ length: count }, (_, i) => i);
  const paddedContacts = [...contacts];
  while (paddedContacts.length < count) {
    paddedContacts.push({ name: "", countryCode: "+66", phoneNumber: "" });
  }

  return (
    <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-2xl md:rounded-[24px] shadow-sm">
      <div className="flex flex-row items-center gap-2">
        <User className="w-5 h-5 md:w-6 md:h-6 text-[#122C49] shrink-0" strokeWidth={2} />
        <span className="text-[#122C49] font-semibold text-base md:text-xl">
          Contact Information
        </span>
      </div>
      <p className="text-[#92929D] text-sm">
        Enter details for each diver.
      </p>
      {/* Email for booking confirmation */}
      {onEmailChange && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Mail className="w-4 h-4 text-[#92929D]" strokeWidth={2} />
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Email for booking confirmation"
              className="flex-1 h-10 px-4 bg-white border border-[#D5D5DC] rounded-lg text-sm text-[#122C49] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 md:gap-6">
        {slots.map((i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-4 rounded-xl border border-[#D5D5DC] bg-[#FAFAFA]"
          >
            <span className="text-[#122C49] font-medium text-sm">
              Diver {i + 1}
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <User className="w-4 h-4 text-[#92929D]" strokeWidth={2} />
                <input
                  type="text"
                  value={paddedContacts[i]?.name ?? ""}
                  onChange={(e) => updateContact(i, "name", e.target.value)}
                  placeholder="Full name"
                  className="flex-1 h-10 px-4 bg-white border border-[#D5D5DC] rounded-lg text-sm text-[#122C49] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
                />
              </div>
              <div className="w-full h-10 flex flex-row bg-white border border-[#D5D5DC] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#CD5B4D]/30 focus-within:border-[#CD5B4D]">
                <Select
                  value={paddedContacts[i]?.countryCode ?? "+66"}
                  onValueChange={(v) => updateContact(i, "countryCode", v)}
                >
                  <SelectTrigger className="h-full min-h-0 border-0 rounded-none bg-transparent px-3 w-[100px] shrink-0 text-sm text-[#122C49] focus:ring-0 focus:border-0 shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className="max-h-[240px] w-[100px] min-w-[100px] bg-white z-[100] shadow-lg border border-[#D5D5DC]"
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
                  value={paddedContacts[i]?.phoneNumber ?? ""}
                  onChange={(e) =>
                    updateContact(i, "phoneNumber", e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Phone number"
                  className="flex-1 min-w-0 h-full px-4 bg-transparent text-sm text-[#122C49] placeholder:text-[#92929D] focus:outline-none border-0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
