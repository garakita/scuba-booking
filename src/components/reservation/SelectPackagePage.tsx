"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "./Header";
import { Banner } from "./Banner";
import { CoursePackageCard } from "./CoursePackageCard";
import { FooterButtons } from "./FooterButtons";
import { SCUBA_COURSES } from "@/lib/courses";

export function SelectPackagePage() {
  const searchParams = useSearchParams();
  const diverCount = Math.max(1, parseInt(searchParams.get("divers") ?? "1", 10) || 1);

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const selectedCourse = selectedCourseId
    ? SCUBA_COURSES.find((c) => c.id === selectedCourseId)
    : null;

  const totalPrice = useMemo(
    () => (selectedCourse?.price ?? 0) * diverCount,
    [selectedCourse?.price, diverCount]
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#F1F1F5] w-full">
      {/* Banner - z-0 = behind */}
      <div className="relative w-full z-0">
        <Banner variant="scuba" />
      </div>

      {/* Header - z-20 = on top */}
      <div className="absolute top-0 left-4 right-4 lg:left-8 lg:right-8 xl:left-16 xl:right-16 z-20">
        <Header currentStep={2} totalPrice={totalPrice} />
      </div>

      {/* Content - z-10 = in front of image */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-24 xl:-mt-32 pt-0 pb-6 md:pb-8 max-w-[1440px]">
        <div className="w-full max-w-[375px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[720px] xl:max-w-[910px] flex flex-col gap-4 md:gap-6">
          {/* Select Course Package card */}
          <div className="relative flex flex-col gap-3 md:gap-4 p-4 md:p-6 lg:px-8 lg:pt-6 lg:pb-6 bg-white rounded-2xl md:rounded-[24px] shadow-sm">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex flex-row items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[#122C49]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="text-[#122C49] font-semibold text-base md:text-xl">
                  Select Course Package
                </span>
              </div>
              <p className="text-[#92929D] text-sm">
                Choose your scuba diving course. All courses start daily.
              </p>
              <div className="flex flex-col gap-3">
                {SCUBA_COURSES.map((course) => (
                  <CoursePackageCard
                    key={course.id}
                    course={course}
                    selected={selectedCourseId === course.id}
                    onSelect={() =>
                      setSelectedCourseId(
                        selectedCourseId === course.id ? null : course.id
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterButtons
        backHref="/"
        nextHref={selectedCourseId ? `/customer-info?divers=${diverCount}&courseId=${selectedCourseId}` : undefined}
        nextDisabled={!selectedCourseId}
      />
    </div>
  );
}
