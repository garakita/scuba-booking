"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Phone, Car, MapPin } from "lucide-react";
import { useReservations } from "@/context/reservations-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewReservationModal } from "@/components/pos/NewReservationModal";
import { CalendarModal } from "@/components/pos/CalendarModal";
import type { Reservation, DiverContact } from "@/lib/booking-types";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LOCATION = "Sairee Beach - Koh Tao";
const COUNTRY_CODES = ["+66", "+1", "+44", "+81", "+86", "+61", "+65", "+60", "+91", "+82"];

function formatDateLabel(d: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d0 = new Date(d);
  d0.setHours(0, 0, 0, 0);
  const diff = Math.round((d0.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getReq(r: Reservation) {
  return r.request ?? r.specialRequests ?? "";
}

const TABLE_COLS = "1fr 1fr 1fr 1fr 1fr 1fr 1fr";

function ReservationRow({
  r,
  onViewDetail,
  onAddPayment,
}: {
  r: Reservation;
  onViewDetail?: (r: Reservation) => void;
  onAddPayment?: (r: Reservation) => void;
}) {
  const paid = r.paidAmount ?? 0;
  const needsPayment = paid < r.totalPrice;

  return (
    <div
      className="grid items-center gap-x-4 py-4 px-6 border-b border-[#E2E2EA]"
      style={{ gridTemplateColumns: TABLE_COLS }}
    >
      <div className="flex flex-col gap-1.5 min-w-0 overflow-visible">
        <span className="text-xs text-[#92929D]">Customer</span>
        <span className="text-sm text-[#44444F]">{r.customerName}</span>
        <div className="flex items-center gap-1.5 min-w-0">
          <Phone className="w-[18px] h-[18px] shrink-0 text-[#92929D] flex-shrink-0" strokeWidth={2} />
          <span className="text-sm text-[#44444F] truncate min-w-0">{r.phone}</span>
        </div>
        {r.email && (
          <div className="flex items-center gap-2 min-w-0">
            <MessageIcon className="w-[18px] h-[18px] shrink-0 flex-shrink-0 text-[#92929D]" />
            <span className="text-sm text-[#44444F] truncate min-w-0">{r.email}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 min-w-0">
        <span className="text-xs text-[#92929D]">Time</span>
        <span className="text-sm text-[#44444F]">{r.timeSlot}</span>
      </div>
      <div className="flex flex-col gap-1.5 min-w-0">
        <span className="text-xs text-[#92929D]">Divers</span>
        <span className="text-sm text-[#44444F]">{r.diverCount}</span>
      </div>
      <div className="flex flex-col gap-1.5 min-w-0">
        <span className="text-xs text-[#92929D]">Course</span>
        <span className="text-sm text-[#44444F]">{r.courseName}</span>
      </div>
      <div className="flex flex-col gap-1.5 min-w-0 overflow-hidden">
        <span className="text-xs text-[#92929D]">Request</span>
        <span className="text-sm text-[#44444F] line-clamp-2">
          {getReq(r) || "-"}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 min-w-0 overflow-hidden">
        <span className="text-xs text-[#92929D]">Note</span>
        <span className="text-sm text-[#44444F] line-clamp-2">
          {r.note || "-"}
        </span>
      </div>
      <div className="flex items-center justify-end gap-2 min-w-0">
        <button
          onClick={() => onViewDetail?.(r)}
          className="flex items-center justify-center px-3 py-1.5 rounded-lg border border-[#CD5B4D] text-[#CD5B4D] text-sm font-medium hover:bg-[#F4DDDA] shrink-0"
        >
          View details
        </button>
        {needsPayment && (
          <button
            onClick={() => onAddPayment?.(r)}
            className="flex items-center justify-center px-3 py-1.5 rounded-lg bg-[#CD5B4D] text-white text-sm font-medium hover:bg-[#B34032] shrink-0"
          >
            Add payment
          </button>
        )}
      </div>
    </div>
  );
}

function UpcomingCard({
  r,
  onClick,
}: {
  r: Reservation;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-[10px] border border-[#F1F1F5] overflow-hidden bg-white hover:border-[#CD5B4D]/30 transition-colors"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#FFF4F3] border-b border-[#F1F1F5]">
        <span className="font-semibold text-base text-[#44444F]">
          {r.customerName}
        </span>
        <EditIcon className="w-6 h-6 text-[#CD5B4D]" />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <TimeIcon className="w-6 h-6 text-[#92929D]" />
          <span className="text-base font-medium text-[#44444F]">{r.timeSlot}</span>
        </div>
        <div className="flex items-center gap-2">
          <TableIcon className="w-6 h-6 text-[#92929D]" />
          <span className="text-base font-medium text-[#44444F]">
            {r.sessionId ?? "—"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ProfileIcon className="w-6 h-6 text-[#92929D]" />
          <span className="text-base font-medium text-[#44444F]">
            {r.diverCount} divers · {r.courseName}
          </span>
        </div>
        {getReq(r) && (
          <div className="flex items-center gap-2">
            <AccessibilityIcon className="w-6 h-6 text-[#92929D]" />
            <span className="text-base font-medium text-[#44444F]">
              {getReq(r)}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none">
      <path
        d="M2 5l6 4 6-4M2 13h14a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 16 3H2A1.5 1.5 0 0 0 .5 4.5v7A1.5 1.5 0 0 0 2 13z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function TimeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 7v5l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function TableIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 10v4m8-4v4M6 14h12M8 10h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 9v6m-3-3h6M9 15l3-3 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
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
      <path
        d="M8 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function AddCalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 14v4M10 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function BookCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 7h8M8 11h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 15l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PanelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4v16M15 4v16M4 9h16M4 15h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReservationDetailModal({
  r,
  onClose,
  onSave,
  onDelete,
  mode,
}: {
  r: Reservation;
  onClose: () => void;
  onSave: (updated: Reservation) => void;
  onDelete: () => void;
  mode?: "view" | "edit" | "payment";
}) {
  const [editing, setEditing] = useState(mode === "edit" || mode === "payment");
  const [form, setForm] = useState<Reservation>(() => ({ ...r }));

  const diverContacts = useMemo((): DiverContact[] => {
    if (form.diverContacts && form.diverContacts.length > 0) {
      return form.diverContacts;
    }
    const parts = form.phone?.trim().split(/\s+/) ?? [];
    const primaryCountry = parts[0]?.startsWith("+") ? parts[0] : "+66";
    const primaryPhone = parts[0]?.startsWith("+") ? parts.slice(1).join("") : form.phone?.replace(/\D/g, "") ?? "";
    return (form.divers ?? []).map((name, i) => ({
      name,
      countryCode: i === 0 ? primaryCountry : "+66",
      phoneNumber: i === 0 ? primaryPhone : "",
    }));
  }, [form.diverContacts, form.divers, form.phone]);

  const updateDiverContact = (index: number, field: keyof DiverContact, value: string) => {
    const next = [...diverContacts];
    if (!next[index]) next[index] = { name: "", countryCode: "+66", phoneNumber: "" };
    next[index] = { ...next[index], [field]: value };
    const updates: Partial<Reservation> = {
      diverContacts: next,
      divers: next.map((c) => c.name),
      diverCount: next.length,
    };
    if (index === 0) {
      updates.customerName = next[0].name;
      updates.phone = `${next[0].countryCode} ${next[0].phoneNumber.replace(/(\d{2})(?=\d)/g, "$1 ")}`;
    }
    setForm((f) => ({ ...f, ...updates }));
  };

  const handleCancelEdit = () => {
    setForm({ ...r });
    setEditing(false);
  };

  const paid = form.paidAmount ?? 0;
  const remaining = form.totalPrice - paid;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#171725]/20"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-[1240px] max-h-[90vh] overflow-auto bg-white rounded-[10px] shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-[#E2E2EA] shrink-0">
          <h2 className="text-2xl font-bold text-[#171725]">
            Reservation detail
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#F1F1F5] text-[#282930]"
            aria-label="Close"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 flex flex-col lg:flex-row gap-6">
          {/* Left: Reservation detail */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-[#CD5B4D]">
              Reservation detail
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  disabled={!editing}
                  className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Time</label>
                <input
                  type="text"
                  value={form.timeSlot}
                  onChange={(e) => setForm((f) => ({ ...f, timeSlot: e.target.value }))}
                  disabled={!editing}
                  placeholder="10:00"
                  className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Session</label>
                <input
                  type="text"
                  value={form.sessionId ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, sessionId: e.target.value || undefined }))}
                  disabled={!editing}
                  placeholder="AM-1"
                  className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Course</label>
                <input
                  type="text"
                  value={form.courseName}
                  onChange={(e) => setForm((f) => ({ ...f, courseName: e.target.value }))}
                  disabled={!editing}
                  className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                />
              </div>
            </div>

            <div className="border-t border-[#F1F1F5] my-2" />

            {/* Customer detail */}
            <h3 className="text-xl font-semibold text-[#CD5B4D]">
              Customer detail
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Name</label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                  disabled={!editing}
                  className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  disabled={!editing}
                  className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-base font-medium text-[#171725]">Email</label>
                <input
                  type="text"
                  value={form.email ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value || undefined }))}
                  disabled={!editing}
                  className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                />
              </div>
            </div>

            {/* Divers */}
            <h3 className="text-xl font-semibold text-[#CD5B4D]">
              Divers ({diverContacts.length})
            </h3>
            <div className="flex flex-col gap-3">
              {diverContacts.length > 0 ? (
                diverContacts.map((contact, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col gap-2 p-3 rounded-lg border",
                      i === 0 ? "border-[#E2E2EA] bg-white" : "border-[#E2E2EA] bg-[#FAFAFB]"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-[#171725]">
                        Diver {i + 1}
                      </span>
                      {editing ? (
                        <>
                          <input
                            type="text"
                            value={contact.name}
                            onChange={(e) => updateDiverContact(i, "name", e.target.value)}
                            placeholder="Full name"
                            className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white text-[#44444F]"
                          />
                          {i === 0 && (
                            <span className="px-2 py-0.5 rounded bg-[#CD5B4D]/10 text-[#CD5B4D] text-xs font-medium shrink-0">
                              Primary contact
                            </span>
                          )}
                          <Select
                            value={contact.countryCode}
                            onValueChange={(v) => updateDiverContact(i, "countryCode", v)}
                          >
                            <SelectTrigger className="h-9 w-[90px] shrink-0 px-3 rounded-lg border-[#E2E2EA] bg-white text-sm">
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
                            value={contact.phoneNumber}
                            onChange={(e) =>
                              updateDiverContact(i, "phoneNumber", e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Phone"
                            className="w-[140px] px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white text-[#44444F]"
                          />
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-[#44444F]">{contact.name || "-"}</span>
                          {i === 0 && (
                            <span className="px-2 py-0.5 rounded bg-[#CD5B4D]/10 text-[#CD5B4D] text-xs font-medium">
                              Primary contact
                            </span>
                          )}
                          {contact.phoneNumber && (
                            <span className="text-sm text-[#92929D]">
                              {contact.countryCode} {contact.phoneNumber.replace(/(\d{2})(?=\d)/g, "$1 ")}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#92929D]">No divers</p>
              )}
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    const next = [...diverContacts, { name: "", countryCode: "+66", phoneNumber: "" }];
                    setForm((f) => ({
                      ...f,
                      diverContacts: next,
                      divers: next.map((c) => c.name),
                      diverCount: next.length,
                    }));
                  }}
                  className="text-sm text-[#CD5B4D] font-medium hover:underline"
                >
                  + Add diver
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-base font-medium text-[#171725]">Note</label>
              <textarea
                value={form.note ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                disabled={!editing}
                placeholder="Additional notes (optional)"
                rows={2}
                className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F] resize-none"
              />
            </div>

            {/* Pickup - match add page */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#E2E2EA] bg-[#FAFAFB]">
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, needsPickup: !f.needsPickup }))}
                disabled={!editing}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left w-full disabled:opacity-70",
                  form.needsPickup ? "border-[#CD5B4D] bg-[#F4DDDA]/30" : "border-[#E2E2EA] bg-white hover:border-[#92929D]"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0",
                    form.needsPickup ? "border-[#CD5B4D] bg-[#CD5B4D]" : "border-[#D5D5DC] bg-white"
                  )}
                >
                  {form.needsPickup && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <Car className="w-5 h-5 text-[#122C49]" strokeWidth={2} />
                <span className="text-[#122C49] font-medium">Need pickup?</span>
              </button>
              {form.needsPickup && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#696974] flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      value={form.pickupLocation ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, pickupLocation: e.target.value }))}
                      disabled={!editing}
                      placeholder="Hotel / Resort name or address"
                      className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#696974] flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Pickup Area
                    </label>
                    <input
                      type="text"
                      value={form.pickupArea ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, pickupArea: e.target.value }))}
                      disabled={!editing}
                      placeholder="e.g. Sairee Beach, Mae Haad"
                      className="px-3 py-2 rounded-lg border border-[#E2E2EA] bg-white disabled:bg-[#FAFAFB] text-[#44444F]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Deposit */}
          <div className="flex flex-col gap-4 w-full lg:w-[320px] shrink-0">
            <h3 className="text-xl font-semibold text-[#CD5B4D]">Deposit</h3>
            <div className="flex flex-col gap-4 p-4 rounded-2xl border border-[#F1F1F5]">
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Total</label>
                <span className="text-lg font-semibold text-[#44444F]">
                  ฿{form.totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Paid</label>
                {editing ? (
                  <input
                    type="number"
                    value={form.paidAmount ?? 0}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        paidAmount: parseInt(e.target.value, 10) || 0,
                      }))
                    }
                    className="px-3 py-2 rounded-lg border border-[#E2E2EA] text-[#44444F]"
                  />
                ) : (
                  <span className="text-lg font-semibold text-[#44444F]">
                    ฿{(form.paidAmount ?? 0).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-[#171725]">Remaining</label>
                <span
                  className={`text-lg font-semibold ${
                    remaining > 0 ? "text-[#F60100]" : "text-[#44444F]"
                  }`}
                >
                  ฿{remaining.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={editing ? handleCancelEdit : () => setEditing(true)}
                className="flex-1 py-2.5 rounded-[10px] border border-[#CD5B4D] text-[#CD5B4D] font-semibold text-base hover:bg-[#F4DDDA]"
              >
                {editing ? "Cancel" : "Edit"}
              </button>
              {editing && (
                <button
                  onClick={() => onSave(form)}
                  className="flex-1 py-2.5 rounded-[10px] bg-[#CD5B4D] text-white font-semibold text-base hover:bg-[#B34032]"
                >
                  Save
                </button>
              )}
              <button
                onClick={onDelete}
                className="flex-1 py-2.5 rounded-[10px] bg-[#F60100] text-white font-semibold text-base hover:bg-[#d40000]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function POSPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [detailRes, setDetailRes] = useState<Reservation | null>(null);
  const [detailMode, setDetailMode] = useState<"view" | "edit" | "payment">("view");
  const [newReservationOpen, setNewReservationOpen] = useState(false);
  const { reservations: reservationsState, updateReservation, deleteReservation } = useReservations();

  const weekStart = useMemo(() => {
    const d = new Date(selectedDate);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  }, [selectedDate]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const reservations = useMemo(
    () =>
      reservationsState.filter(
        (r) => r.date === selectedDate.toISOString().split("T")[0]
      ),
    [selectedDate, reservationsState]
  );

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setSelectedDate(d);
  };
  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setSelectedDate(d);
  };
  const prevMonth = () => {
    const d = new Date(selectedDate);
    d.setMonth(d.getMonth() - 1);
    setSelectedDate(d);
  };
  const nextMonth = () => {
    const d = new Date(selectedDate);
    d.setMonth(d.getMonth() + 1);
    setSelectedDate(d);
  };

  const upcomingToday = useMemo(
    () => {
      const d = new Date();
      const dateStr = d.toISOString().split("T")[0];
      return reservationsState.filter((r) => r.date === dateStr);
    },
    [reservationsState]
  );
  const upcomingTomorrow = useMemo(
    () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      const dateStr = d.toISOString().split("T")[0];
      return reservationsState.filter((r) => r.date === dateStr);
    },
    [reservationsState]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB]">
      {/* Nav */}
      <nav className="flex flex-row justify-between items-center px-6 py-4 h-[70px] bg-white border-b border-[#E2E2EA]">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-[#CD5B4D] border-4 border-[#CD5B4D]" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-base text-[#171725]">
                Walk-In
              </span>
              <span className="text-sm text-[#92929D]">{LOCATION}</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#92929D] hover:text-[#171725]"
          >
            <span className="text-base font-medium">Home</span>
          </Link>
          <Link
            href="/pos"
            className="flex items-center gap-2 text-[#CD5B4D] font-semibold"
          >
            <span className="text-base">Reservations</span>
          </Link>
          <span className="flex items-center gap-2 text-[#92929D]">
            <span className="text-base font-medium">Notes</span>
          </span>
          <span className="flex items-center gap-2 text-[#92929D]">
            <span className="text-base font-medium">Receipts</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E2E2EA]" />
            <span className="text-sm font-semibold text-[#171725]">
              Staff
            </span>
          </div>
        </div>
      </nav>

      {/* Reservation header */}
      <div className="flex justify-between items-center px-6 py-6 bg-white border-b border-[#E4E4E4]">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-black">Reservation</h1>
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
              sidebarOpen
                ? "bg-[#F4DDDA] border-[#CD5B4D] text-[#CD5B4D]"
                : "bg-white border-[#E2E2EA] text-[#696974] hover:border-[#CD5B4D] hover:text-[#CD5B4D]"
            }`}
            title={sidebarOpen ? "Hide upcoming" : "Show upcoming"}
          >
            <PanelIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Upcoming</span>
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#CD5B4D] text-white text-xs font-semibold">
              {upcomingToday.length + upcomingTomorrow.length}
            </span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => setNewReservationOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-[10px] bg-[#CD5B4D] text-white font-semibold text-base hover:bg-[#B34032]"
        >
          <AddCalendarIcon className="w-6 h-6" />
          New Reservation
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Week strip + Table */}
        <div className="flex flex-col flex-1 p-4 pl-12 pr-6 bg-white border-r border-[#E2E2EA] shadow-sm min-w-0">
          {/* Month/Year + navigation */}
          <div className="flex items-center justify-center gap-1 mb-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-[#F1F1F5] shrink-0"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-[#171725]" />
            </button>
            <h2 className="text-xl font-bold text-[#171725] min-w-[180px] text-center">
              {selectedDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-[#F1F1F5] shrink-0"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-[#171725]" />
            </button>
          </div>
          {/* Week date strip */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={prevWeek}
              className="p-2 rounded-lg hover:bg-[#F1F1F5] shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-[#171725]" />
            </button>
            <div className="flex gap-2 flex-1 min-w-0 justify-between overflow-x-auto">
              {weekDays.map((d) => {
                const isSelected = d.toDateString() === selectedDate.toDateString();
                const dateStr = d.toISOString().split("T")[0];
                const count = reservationsState.filter((r) => r.date === dateStr).length;
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => setSelectedDate(d)}
                    className={`relative flex flex-col items-center justify-center w-[90px] min-w-[70px] h-[60px] rounded-2xl shrink-0 ${
                      isSelected ? "bg-[#F4DDDA] text-[#CD5B4D]" : ""
                    }`}
                  >
                    <span className="text-xl font-semibold">{d.getDate()}</span>
                    <span className={`text-xs ${isSelected ? "font-medium text-[#CD5B4D]" : "text-[#92929D]"}`}>
                      {DAYS[d.getDay()]}
                    </span>
                    {count > 0 && (
                      <span className="absolute top-1.5 right-2 flex items-center justify-center min-w-[20px] h-[15px] px-1 rounded-full bg-[#F60100] text-white text-[9px] font-semibold">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <button
              onClick={nextWeek}
              className="p-2 rounded-lg hover:bg-[#F1F1F5] shrink-0"
            >
              <ChevronRight className="w-5 h-5 text-[#171725]" />
            </button>
            <button
              onClick={() => setCalendarOpen(true)}
              className="p-2 rounded-lg hover:bg-[#F1F1F5] shrink-0 border border-[#E2E2EA]"
              title="Open month calendar"
            >
              <CalendarIcon className="w-5 h-5 text-[#696974]" />
            </button>
          </div>

          {/* Table */}
          <div className="flex flex-col flex-1 min-h-0 rounded-2xl border border-[#E2E2EA] overflow-hidden">
            <div
              className="grid items-center gap-x-4 px-6 py-2 bg-[#F4DDDA] border-b border-[#E2E2EA]"
              style={{ gridTemplateColumns: TABLE_COLS }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#696974]">
                Customer
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#696974]">
                Time
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#696974]">
                Divers
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#696974]">
                Course
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#696974]">
                Request
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#696974]">
                Note
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#696974] text-right">
                Actions
              </span>
            </div>
            <div className="flex flex-col overflow-auto">
              {reservations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-[#92929D]">
                  <BookCheckIcon className="w-12 h-12 mb-2" />
                  <p className="text-sm">No reservations for this date</p>
                  <button
                    type="button"
                    onClick={() => setNewReservationOpen(true)}
                    className="mt-2 text-sm text-[#CD5B4D] font-medium hover:underline"
                  >
                    New reservation
                  </button>
                </div>
              ) : (
                reservations.map((r) => (
                  <ReservationRow
                    key={r.id}
                    r={r}
                    onViewDetail={(res) => setDetailRes(res)}
                    onAddPayment={(res) => {
                      setDetailRes(res);
                      setDetailMode("payment");
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Slide-out: Upcoming */}
        <aside
          className={`fixed top-[70px] right-0 bottom-0 w-[350px] max-w-[90vw] bg-[#FAFAFB] border-l border-[#E2E2EA] shadow-lg flex flex-col overflow-hidden z-50 transition-transform duration-300 ease-out ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-[#E2E2EA] shrink-0">
            <h3 className="text-xl font-semibold text-[#171725]">
              Upcoming Reservations
            </h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-[#F1F1F5] text-[#696974]"
              aria-label="Close"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base text-[#CD5B4D]">
                  Today
                </span>
                <span className="text-base font-semibold text-[#CD5B4D]">
                  {upcomingToday.length}
                </span>
              </div>
              <div className="space-y-2">
                {upcomingToday.map((r) => (
                  <UpcomingCard
                    key={r.id}
                    r={r}
                    onClick={() => setDetailRes(r)}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base text-[#CD5B4D]">
                  Tomorrow
                </span>
                <span className="text-base font-semibold text-[#CD5B4D]">
                  {upcomingTomorrow.length}
                </span>
              </div>
              <div className="space-y-2">
                {upcomingTomorrow.map((r) => (
                  <UpcomingCard
                    key={r.id}
                    r={r}
                    onClick={() => setDetailRes(r)}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {calendarOpen && (
        <CalendarModal
          selectedDate={selectedDate}
          reservations={reservationsState}
          onSelectDate={setSelectedDate}
          onClose={() => setCalendarOpen(false)}
        />
      )}
      {newReservationOpen && (
        <NewReservationModal onClose={() => setNewReservationOpen(false)} />
      )}
      {detailRes && (
        <ReservationDetailModal
          r={detailRes}
          mode={detailMode}
          onClose={() => {
            setDetailRes(null);
            setDetailMode("view");
          }}
          onSave={(updated) => {
            updateReservation(updated.id, updated);
            setDetailRes(updated);
            setDetailMode("view");
          }}
          onDelete={() => {
            deleteReservation(detailRes.id);
            setDetailRes(null);
          }}
        />
      )}
    </div>
  );
}
