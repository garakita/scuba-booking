import { Suspense } from "react";
import { SummaryPage } from "@/components/reservation/SummaryPage";

export default function Summary() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1F1F5]" />}>
      <SummaryPage />
    </Suspense>
  );
}
