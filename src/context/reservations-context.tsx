"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Reservation } from "@/lib/booking-types";
import { MOCK_RESERVATIONS } from "@/lib/mock-reservations";

type ReservationsContextValue = {
  reservations: Reservation[];
  addReservation: (r: Reservation) => void;
  updateReservation: (id: string, r: Reservation) => void;
  deleteReservation: (id: string) => void;
};

const ReservationsContext = createContext<ReservationsContextValue | null>(null);

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(() => [
    ...MOCK_RESERVATIONS,
  ]);

  const addReservation = useCallback((r: Reservation) => {
    setReservations((prev) => [...prev, r]);
  }, []);

  const updateReservation = useCallback((id: string, r: Reservation) => {
    setReservations((prev) =>
      prev.map((x) => (x.id === id ? r : x))
    );
  }, []);

  const deleteReservation = useCallback((id: string) => {
    setReservations((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return (
    <ReservationsContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservation,
        deleteReservation,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const ctx = useContext(ReservationsContext);
  if (!ctx) {
    throw new Error("useReservations must be used within ReservationsProvider");
  }
  return ctx;
}
