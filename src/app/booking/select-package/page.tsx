import { Suspense } from "react";
import { SelectPackagePage } from "@/components/reservation/SelectPackagePage";

export default function SelectPackage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1F1F5]" />}>
      <SelectPackagePage />
    </Suspense>
  );
}
