/**
 * Mock reservations for POS - in real app would come from API/DB
 * Shared with booking flow
 */
import type { Reservation } from "./booking-types";
import { SCUBA_COURSES } from "./courses";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

function fmt(d: Date) {
  return d.toISOString().split("T")[0];
}

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "res-001",
    customerName: "John Smith",
    phone: "+66 86 234 1234",
    email: "john@example.com",
    date: fmt(today),
    timeSlot: "10:00",
    diverCount: 2,
    courseId: "open-water",
    courseName: "Open Water",
    totalPrice: 19000,
    sessionId: "AM-1",
    specialRequests: "Equipment rental, Hotel pickup",
    request: "Equipment rental, Hotel pickup",
    note: "",
    paidAmount: 10000,
    divers: ["John Smith", "Jane Doe"],
    diverContacts: [
      { name: "John Smith", countryCode: "+66", phoneNumber: "862341234" },
      { name: "Jane Doe", countryCode: "+66", phoneNumber: "812345678" },
    ],
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "res-002",
    customerName: "Sarah Lee",
    phone: "+1 555 123 4567",
    email: "sarah@example.com",
    date: fmt(today),
    timeSlot: "10:00",
    diverCount: 4,
    courseId: "try-scuba",
    courseName: "Basic Diver",
    totalPrice: 13000,
    sessionId: "AM-1",
    specialRequests: "",
    request: "",
    note: "First time divers",
    paidAmount: 13000,
    divers: ["Sarah Lee", "Tom Lee", "Emma Lee", "Jack Lee"],
    diverContacts: [
      { name: "Sarah Lee", countryCode: "+1", phoneNumber: "5551234567" },
      { name: "Tom Lee", countryCode: "+1", phoneNumber: "5552345678" },
      { name: "Emma Lee", countryCode: "+1", phoneNumber: "5553456789" },
      { name: "Jack Lee", countryCode: "+1", phoneNumber: "5554567890" },
    ],
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "res-003",
    customerName: "Alex Chen",
    phone: "+86 138 0013 8000",
    email: "alex@example.com",
    date: fmt(today),
    timeSlot: "14:00",
    diverCount: 1,
    courseId: "refresh",
    courseName: "Refresh",
    totalPrice: 1500,
    sessionId: "PM-1",
    specialRequests: "",
    request: "",
    note: "",
    paidAmount: 0,
    divers: ["Alex Chen"],
    diverContacts: [
      { name: "Alex Chen", countryCode: "+86", phoneNumber: "13800138000" },
    ],
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "res-004",
    customerName: "Emma Wilson",
    phone: "+44 7700 900123",
    email: "emma@example.com",
    date: fmt(tomorrow),
    timeSlot: "10:00",
    diverCount: 3,
    courseId: "fun-dives",
    courseName: "Buffet Fun Dives",
    totalPrice: 40500,
    sessionId: "AM-1",
    specialRequests: "Hotel pickup - Sairee Beach",
    request: "Hotel pickup - Sairee Beach",
    note: "",
    paidAmount: 20000,
    divers: ["Emma Wilson", "James Wilson", "Olivia Wilson"],
    diverContacts: [
      { name: "Emma Wilson", countryCode: "+44", phoneNumber: "7700900123" },
      { name: "James Wilson", countryCode: "+44", phoneNumber: "7700900124" },
      { name: "Olivia Wilson", countryCode: "+44", phoneNumber: "7700900125" },
    ],
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "res-005",
    customerName: "Mike Johnson",
    phone: "+66 81 234 5678",
    email: "mike@example.com",
    date: fmt(tomorrow),
    timeSlot: "14:00",
    diverCount: 2,
    courseId: "advanced-open-water",
    courseName: "Advanced Adventurer",
    totalPrice: 18000,
    sessionId: "PM-1",
    specialRequests: "",
    request: "",
    note: "",
    paidAmount: 18000,
    divers: ["Mike Johnson", "Lisa Johnson"],
    diverContacts: [
      { name: "Mike Johnson", countryCode: "+66", phoneNumber: "812345678" },
      { name: "Lisa Johnson", countryCode: "+66", phoneNumber: "812345679" },
    ],
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
];

export function getCourseById(id: string) {
  return SCUBA_COURSES.find((c) => c.id === id);
}

export function getReservationsByDate(date: string): Reservation[] {
  return MOCK_RESERVATIONS.filter((r) => r.date === date);
}

export function getUpcomingByDay(
  day: "today" | "tomorrow"
): Reservation[] {
  const d = new Date();
  if (day === "tomorrow") d.setDate(d.getDate() + 1);
  const dateStr = d.toISOString().split("T")[0];
  return MOCK_RESERVATIONS.filter((r) => r.date === dateStr);
}
