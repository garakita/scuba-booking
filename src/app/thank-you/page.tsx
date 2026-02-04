"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F1F5] px-4">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <CheckCircle className="w-20 h-20 text-[#22C55E]" strokeWidth={2} />
        <h1 className="text-[#122C49] font-semibold text-2xl">
          Thank you for your booking!
        </h1>
        <p className="text-[#696974] text-base">
          Your reservation has been confirmed. We will send you a confirmation
          email shortly.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-3 bg-[#CD5B4D] text-white font-semibold rounded-[10px] hover:bg-[#B34032] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
