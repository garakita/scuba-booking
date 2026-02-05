"use client";

import { useState, useMemo, useEffect } from "react";
import { Calendar as CalendarIcon, Minus, Plus, CreditCard, QrCode, Banknote, Car, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useReservations } from "@/context/reservations-context";
import { SCUBA_COURSES } from "@/lib/courses";
import type { Reservation } from "@/lib/booking-types";
import type { DiverContact } from "@/components/reservation/DiversContactForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const COUNTRY_CODES = ["+66", "+1", "+44", "+81", "+86", "+61", "+65", "+60", "+91", "+82"];

type DepositOption = "full" | "partial" | "none";
type PaymentMethod = "card" | "qr" | "cash";

const PARTIAL_DEFAULT_PERCENT = 50;

function isValidEmail(email: string): boolean {
  if (!email.trim()) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function generateId(): string {
  return `res-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

interface NewReservationModalProps {
  onClose: () => void;
}

const inputClass =
  "h-10 w-full px-4 rounded-lg border border-[#E2E2EA] bg-white text-sm text-[#171725] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/20 focus:border-[#CD5B4D]";

const labelClass = "text-sm font-medium text-[#696974]";

export function NewReservationModal({ onClose }: NewReservationModalProps) {
  const { addReservation } = useReservations();

  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [courseId, setCourseId] = useState("");
  const [diverCount, setDiverCount] = useState(1);
  const [note, setNote] = useState("");
  const [needsPickup, setNeedsPickup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupArea, setPickupArea] = useState("");
  const [contacts, setContacts] = useState<DiverContact[]>([{ name: "", countryCode: "+66", phoneNumber: "" }]);
  const [email, setEmail] = useState("");
  const [depositOption, setDepositOption] = useState<DepositOption>("full");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [paidAmount, setPaidAmount] = useState("");

  const selectedCourse = useMemo(
    () => SCUBA_COURSES.find((c) => c.id === courseId),
    [courseId]
  );

  const computedTotal = selectedCourse ? selectedCourse.price * diverCount : 0;
  const amountToPay =
    depositOption === "full"
      ? computedTotal
      : depositOption === "partial"
        ? Math.round(computedTotal * (PARTIAL_DEFAULT_PERCENT / 100))
        : 0;

  const displayDepositAmount =
    depositOption === "full"
      ? amountToPay
      : depositOption === "partial"
        ? parseInt(paidAmount.replace(/\D/g, ""), 10) || amountToPay
        : 0;

  useEffect(() => {
    if (depositOption !== "none") setPaidAmount(String(amountToPay));
  }, [depositOption]);

  useEffect(() => {
    if (depositOption === "full") setPaidAmount(String(amountToPay));
  }, [depositOption, amountToPay]);

  useEffect(() => {
    const next = [...contacts];
    while (next.length < diverCount) {
      next.push({ name: "", countryCode: "+66", phoneNumber: "" });
    }
    setContacts(next.slice(0, diverCount));
  }, [diverCount]);

  const updateContact = (index: number, field: keyof DiverContact, value: string) => {
    const next = [...contacts];
    if (!next[index]) next[index] = { name: "", countryCode: "+66", phoneNumber: "" };
    next[index] = { ...next[index], [field]: value };
    setContacts(next);
  };

  const paddedContacts = useMemo(() => {
    const p = [...contacts];
    while (p.length < diverCount) {
      p.push({ name: "", countryCode: "+66", phoneNumber: "" });
    }
    return p.slice(0, diverCount);
  }, [contacts, diverCount]);

  const isFormValid = useMemo(() => {
    const allHaveNameAndPhone = paddedContacts.every(
      (c) => c.name.trim() !== "" && c.phoneNumber.trim() !== ""
    );
    if (!allHaveNameAndPhone) return false;
    if (!isValidEmail(email)) return false;
    if (!courseId.trim()) return false;
    if (needsPickup && (pickupLocation.trim() === "" || pickupArea.trim() === "")) return false;
    return true;
  }, [paddedContacts, email, courseId, needsPickup, pickupLocation, pickupArea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedCourse) return;

    const primary = paddedContacts[0];
    const phone = `${primary.countryCode} ${primary.phoneNumber.replace(/(\d{2})(?=\d)/g, "$1 ")}`;
    const divers = paddedContacts.map((c) => c.name.trim());
    const diverContacts = paddedContacts.map((c) => ({
      name: c.name.trim(),
      countryCode: c.countryCode,
      phoneNumber: c.phoneNumber,
    }));
    const paid = depositOption === "none" ? 0 : parseInt(paidAmount.replace(/\D/g, ""), 10) || 0;

    const reservation: Reservation = {
      id: generateId(),
      customerName: primary.name.trim(),
      phone,
      email: email.trim() || undefined,
      date: selectedDate.toISOString().split("T")[0],
      timeSlot: "10:00",
      diverCount,
      courseId: selectedCourse.id,
      courseName: selectedCourse.name,
      totalPrice: computedTotal,
      request: undefined,
      specialRequests: undefined,
      note: note.trim() || undefined,
      needsPickup: needsPickup || undefined,
      pickupLocation: needsPickup ? pickupLocation.trim() || undefined : undefined,
      pickupArea: needsPickup ? pickupArea.trim() || undefined : undefined,
      paidAmount: paid,
      divers,
      diverContacts,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    addReservation(reservation);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#171725]/20"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-[min(960px,calc(100vw-2rem))] max-h-[min(90vh,calc(100dvh-2rem))] overflow-hidden bg-white rounded-xl shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E2E2EA] shrink-0">
          <h2 className="text-lg font-bold text-[#171725]">New reservation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#F1F1F5] text-[#CD5B4D] transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-0 overflow-hidden">
            {/* Left: Reservation detail */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-[#E2E2EA] overflow-y-auto">
              <h3 className="text-base font-semibold text-[#CD5B4D] mb-4">
                Reservation detail
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "h-10 w-full px-4 rounded-lg border bg-[#FFFFFF] text-sm text-left flex items-center gap-2",
                          "border-[#E2E2EA] hover:border-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/20 focus:border-[#CD5B4D]"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 text-[#CD5B4D] shrink-0" />
                        <span className="flex-1 truncate">
                          {format(selectedDate, "EEE MMM d, yyyy")}
                        </span>
                        <svg className="w-4 h-4 text-[#92929D] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[110] bg-white shadow-lg border border-[#E2E2EA]" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(d) => d && setSelectedDate(d)}
                        initialFocus
                        className="bg-white [&_button[data-selected-single=true]]:!bg-[#CD5B4D] [&_button[data-selected-single=true]]:!text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Package</label>
                  <Select value={courseId} onValueChange={setCourseId}>
                    <SelectTrigger className="h-10 w-full px-4 rounded-lg border-[#E2E2EA] bg-[#FFFFFF] text-sm">
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent className="z-[110] bg-white shadow-lg">
                      {SCUBA_COURSES.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name} — ฿{c.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Number of Diver</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDiverCount((c) => Math.max(1, c - 1))}
                      disabled={diverCount <= 1}
                      className={cn(
                        "h-10 w-10 shrink-0 rounded-lg border flex items-center justify-center transition-colors",
                        diverCount <= 1
                          ? "border-[#E2E2EA] bg-[#F1F1F5] text-[#D5D5DC] cursor-not-allowed"
                          : "border-[#E2E2EA] bg-white hover:bg-[#FAFAFB] text-[#CD5B4D]"
                      )}
                    >
                      <Minus className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <span className="h-10 min-w-[48px] px-4 flex items-center justify-center rounded-lg border border-[#E2E2EA] bg-[#FFFFFF] text-sm font-medium text-[#171725]">
                      {diverCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDiverCount((c) => Math.min(10, c + 1))}
                      disabled={diverCount >= 10}
                      className={cn(
                        "h-10 w-10 shrink-0 rounded-lg border flex items-center justify-center transition-colors",
                        diverCount >= 10
                          ? "border-[#E2E2EA] bg-[#F1F1F5] text-[#D5D5DC] cursor-not-allowed"
                          : "border-[#E2E2EA] bg-white hover:bg-[#FAFAFB] text-[#CD5B4D]"
                      )}
                    >
                      <Plus className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Note</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Additional notes (optional)"
                    rows={2}
                    className={cn(inputClass, "py-3 resize-none min-h-[60px]")}
                  />
                </div>

                {/* Pickup */}
                <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#E2E2EA] bg-[#FAFAFB]">
                  <button
                    type="button"
                    onClick={() => setNeedsPickup((v) => !v)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left w-full",
                      needsPickup ? "border-[#CD5B4D] bg-[#F4DDDA]/30" : "border-[#E2E2EA] bg-white hover:border-[#92929D]"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0",
                        needsPickup ? "border-[#CD5B4D] bg-[#CD5B4D]" : "border-[#D5D5DC] bg-white"
                      )}
                    >
                      {needsPickup && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <Car className="w-5 h-5 text-[#122C49]" strokeWidth={2} />
                    <span className="text-[#122C49] font-medium">Need pickup?</span>
                  </button>
                  {needsPickup && (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#696974] flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Pickup Location
                        </label>
                        <input
                          type="text"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          placeholder="Hotel / Resort name or address"
                          className={inputClass}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#696974] flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Pickup Area
                        </label>
                        <input
                          type="text"
                          value={pickupArea}
                          onChange={(e) => setPickupArea(e.target.value)}
                          placeholder="e.g. Sairee Beach, Mae Haad"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Deposit */}
                <div className="bg-white rounded-xl border border-[#E2E2EA] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#E2E2EA]">
                    <h3 className="text-base font-semibold text-[#122C49]">
                      Deposit
                    </h3>
                  </div>
                  <div className="p-4 flex flex-col gap-4">
                    {selectedCourse && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-[#696974] text-sm">
                            x{diverCount} {selectedCourse.name}
                          </span>
                          <span className="text-[#171725] font-medium text-sm">
                            ฿{computedTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-px bg-[#E2E2EA]" />
                        <div className="flex justify-between items-center">
                          <span className="text-[#122C49] font-semibold text-sm">Total</span>
                          <span className="text-[#122C49] font-semibold">฿{computedTotal.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#696974] text-sm">Deposit Type</span>
                        <span className="text-[#CD5B4D] font-semibold text-sm">
                          ฿{displayDepositAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(["full", "partial", "none"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setDepositOption(opt)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium",
                              depositOption === opt
                                ? "border-[#CD5B4D] bg-white shadow-[0px_2px_8px_rgba(234,128,99,0.2)]"
                                : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                            )}
                          >
                            <span
                              className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                                depositOption === opt ? "border-[#CD5B4D]" : "border-[#D5D5DC]"
                              )}
                            >
                              {depositOption === opt && (
                                <span className="w-2 h-2 rounded-full bg-[#CD5B4D]" />
                              )}
                            </span>
                            <span className={depositOption === opt ? "text-[#CD5B4D]" : "text-[#122C49]"}>
                              {opt === "full" && "Full"}
                              {opt === "partial" && "Partial (50%)"}
                              {opt === "none" && "None"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {depositOption !== "none" && (
                      <div className="flex flex-col gap-2">
                        <label className={labelClass}>Paid</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={paidAmount}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            setPaidAmount(v);
                          }}
                          placeholder="Input paid amount"
                          disabled={depositOption === "full"}
                          dir="ltr"
                          className={cn(inputClass, depositOption === "full" && "bg-[#F1F1F5] cursor-not-allowed")}
                        />
                      </div>
                    )}
                    {depositOption !== "none" && (
                    <div className="flex flex-col gap-2">
                      <span className={labelClass}>Payment method</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: "card" as const, icon: CreditCard, label: "Card" },
                          { id: "qr" as const, icon: QrCode, label: "QR" },
                          { id: "cash" as const, icon: Banknote, label: "Cash" },
                        ].map(({ id, icon: Icon, label }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setPaymentMethod(id)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm",
                              paymentMethod === id
                                ? "border-[#CD5B4D] bg-white shadow-[0px_2px_8px_rgba(234,128,99,0.2)]"
                                : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                            )}
                          >
                            <Icon
                              className={cn("w-4 h-4 shrink-0", paymentMethod === id ? "text-[#CD5B4D]" : "text-[#92929D]")}
                            />
                            <span className={paymentMethod === id ? "text-[#CD5B4D] font-medium" : "text-[#696974]"}>
                              {label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Customer detail - scroll only this section when divers grow */}
            <div className="p-6 flex flex-col min-h-0 overflow-hidden">
              <h3 className="text-base font-semibold text-[#CD5B4D] mb-1 shrink-0">
                Customer detail
              </h3>
              <p className="text-[#92929D] text-xs mb-3 shrink-0">
                Diver 1 is the primary contact.
              </p>
              <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="flex flex-col gap-4 pr-1">
                  {paddedContacts.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col gap-3 p-3 rounded-lg border",
                        i === 0 ? "border-[#E2E2EA] bg-white" : "border-[#E2E2EA] bg-[#FAFAFB]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#171725]">
                          Diver {i + 1}
                        </span>
                        {i === 0 && (
                          <span className="px-2 py-0.5 rounded bg-[#CD5B4D]/10 text-[#CD5B4D] text-xs font-medium">
                            Primary contact
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          value={paddedContacts[i]?.name ?? ""}
                          onChange={(e) => updateContact(i, "name", e.target.value)}
                          placeholder="Full name"
                          className={inputClass}
                        />
                        <div className="flex gap-2">
                          <Select
                            value={paddedContacts[i]?.countryCode ?? "+66"}
                            onValueChange={(v) => updateContact(i, "countryCode", v)}
                          >
                            <SelectTrigger className="h-10 w-[90px] shrink-0 px-3 rounded-lg border-[#E2E2EA] bg-white text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="z-[110] bg-white shadow-lg">
                              {COUNTRY_CODES.map((code) => (
                                <SelectItem key={code} value={code}>
                                  {code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <input
                            type="tel"
                            value={paddedContacts[i]?.phoneNumber ?? ""}
                            onChange={(e) =>
                              updateContact(i, "phoneNumber", e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Phone number"
                            className={cn(inputClass, "flex-1")}
                          />
                        </div>
                        {i === 0 && (
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email for confirmation"
                            className={inputClass}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer button */}
          <div className="p-6 border-t border-[#E2E2EA] shrink-0 flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full max-w-[320px] h-12 rounded-xl bg-[#CD5B4D] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#B34032] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <CalendarIcon className="w-5 h-5" />
              New reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
