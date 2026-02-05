"use client";

import { Suspense } from "react";
import { PaymentPage } from "@/components/reservation/PaymentPage";

export default function Payment() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1F1F5]" />}>
      <PaymentPage />
    </Suspense>
  );
}
