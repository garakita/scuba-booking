"use client";

import { useSearchParams } from "next/navigation";
import { Header } from "./Header";
import { Banner } from "./Banner";
import { FooterButtons } from "./FooterButtons";
import { SCUBA_COURSES } from "@/lib/courses";

export function SummaryPage() {
  const searchParams = useSearchParams();
  const diverCount = Math.max(1, parseInt(searchParams.get("divers") ?? "1", 10) || 1);
  const courseId = searchParams.get("courseId") ?? "";

  const selectedCourse = courseId
    ? SCUBA_COURSES.find((c) => c.id === courseId)
    : null;

  const totalPrice = selectedCourse ? selectedCourse.price * diverCount : 0;

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#F1F1F5] w-full">
      {/* Banner - z-0 = behind */}
      <div className="relative w-full z-0">
        <Banner variant="scuba" />
      </div>

      {/* Header - z-20 = on top */}
      <div className="absolute top-0 left-4 right-4 lg:left-8 lg:right-8 xl:left-16 xl:right-16 z-20">
        <Header
          currentStep={4}
          venueName="Koh Tao Scuba Club"
          branchName="Koh Tao"
          totalPrice={totalPrice}
        />
      </div>

      {/* Content - z-10 = in front of image */}
      <div className="relative z-10 w-full flex flex-col items-center -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-24 xl:-mt-32 pt-0 pb-24">
        <div className="w-full max-w-[560px] px-4 md:px-8">
          <div className="w-full bg-white rounded-[24px] overflow-hidden shadow-sm">
            <div className="flex flex-row items-center px-4 py-4 border-b border-[#E2E2EA]">
              <h2 className="text-[#122C49] font-semibold text-xl leading-[26px]">
                Summary
              </h2>
            </div>
            <div className="flex flex-col gap-4 p-4">
              {selectedCourse ? (
                <>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-[#696974] text-sm">
                      {selectedCourse.name} x{diverCount}
                    </span>
                    <span className="text-[#122C49] font-semibold">
                      ฿{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-px bg-[#E2E2EA]" />
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-[#122C49] font-semibold">Total</span>
                    <span className="text-[#122C49] font-semibold text-lg">
                      ฿{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[#696974] text-sm pt-2">
                    Please confirm your booking details above.
                  </p>
                </>
              ) : (
                <p className="text-[#92929D] text-sm">
                  No booking to display. Please go back to complete your
                  reservation.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <FooterButtons
        backHref={`/customer-info?divers=${diverCount}&courseId=${courseId}`}
        nextHref={selectedCourse ? "/thank-you" : undefined}
        nextDisabled={!selectedCourse}
        footerText="© 2025 Koh Tao Scuba Club. All rights reserved."
      />
    </div>
  );
}
