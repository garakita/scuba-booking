import { ReservationsProvider } from "@/context/reservations-context";

export default function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReservationsProvider>{children}</ReservationsProvider>;
}
