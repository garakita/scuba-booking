"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FooterButtonsProps {
  backHref?: string;
  showBack?: boolean;
  nextHref?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  footerText?: string;
}

export function FooterButtons({
  backHref,
  showBack = true,
  nextHref = "/select-package",
  nextLabel = "Next",
  nextDisabled = false,
  footerText = "© 2025 Koh Tao Scuba Club. All rights reserved.",
}: FooterButtonsProps) {
  return (
    <div className="w-full mt-auto shadow-[0px_-8px_20px_rgba(72,72,72,0.05)]">
      <div className="flex flex-row justify-center items-center gap-4 md:gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[233px] py-6 bg-white rounded-t-[24px] max-w-[1440px] mx-auto">
        {showBack && (
          backHref ? (
            <Link href={backHref} className="flex-1 max-w-[120px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[326px]">
              <Button
                variant="outline"
                className="w-full h-12 border border-[#F4DDDA] bg-white text-[#CD5B4D] hover:bg-gray-50 rounded-[10px] font-semibold text-sm"
              >
                Back
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              className="flex-1 max-w-[120px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[326px] h-12 border border-[#F4DDDA] bg-white text-[#CD5B4D] hover:bg-gray-50 rounded-[10px] font-semibold text-sm"
              disabled
            >
              Back
            </Button>
          )
        )}
        {nextHref && !nextDisabled ? (
          <Link href={nextHref} className="flex-1 max-w-[200px] sm:max-w-[320px] md:max-w-[440px] lg:max-w-[560px]">
            <Button
              className="w-full h-12 bg-[#CD5B4D] text-white hover:bg-[#B34032] rounded-[10px] font-semibold text-sm"
            >
              {nextLabel}
            </Button>
          </Link>
        ) : (
          <Button
            className="flex-1 max-w-[200px] sm:max-w-[320px] md:max-w-[440px] lg:max-w-[560px] h-12 bg-[#E8E8ED] text-[#92929D] rounded-[10px] font-semibold text-sm cursor-not-allowed"
            disabled
          >
            {nextLabel}
          </Button>
        )}
      </div>
      <div className="flex flex-row justify-center items-center py-3 md:py-4 bg-white max-w-[1440px] mx-auto">
        <span className="text-[#122C49] text-xs font-medium">
          {footerText}
        </span>
      </div>
    </div>
  );
}
