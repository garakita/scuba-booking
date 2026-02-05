/**
 * Shared types for Booking and POS - data flows between both
 */

export interface DiverContact {
  name: string;
  countryCode: string;
  phoneNumber: string;
}

export interface Reservation {
  id: string;
  /** Customer/lead name */
  customerName: string;
  /** Contact phone (with country code) */
  phone: string;
  /** Email */
  email?: string;
  /** Booking date */
  date: string;
  /** Time slot e.g. "10:00" */
  timeSlot: string;
  /** Number of divers */
  diverCount: number;
  /** Course ID from SCUBA_COURSES */
  courseId: string;
  /** Course name (denormalized for display) */
  courseName: string;
  /** Total price THB */
  totalPrice: number;
  /** Dive session / boat - for POS display (restaurant: table number) */
  sessionId?: string;
  /** Special requests - equipment, pickup, etc. */
  specialRequests?: string;
  /** Request (alias for specialRequests) */
  request?: string;
  /** Internal note */
  note?: string;
  /** Need hotel pickup */
  needsPickup?: boolean;
  /** Pickup location - hotel/resort name or address */
  pickupLocation?: string;
  /** Pickup area e.g. Sairee Beach, Mae Haad */
  pickupArea?: string;
  /** Amount paid THB - for partial/full payment tracking */
  paidAmount?: number;
  /** Names of divers (people who will dive) */
  divers?: string[];
  /** Full contact info per diver (name, countryCode, phoneNumber) */
  diverContacts?: DiverContact[];
  /** Status */
  status: "pending" | "confirmed" | "checked-in" | "completed" | "cancelled";
  /** Created at */
  createdAt: string;
}
