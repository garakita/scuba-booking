"use client";

import { useSearchParams } from "next/navigation";
import { Header } from "./Header";
import { Banner } from "./Banner";
import { FooterButtons } from "./FooterButtons";
import { SCUBA_COURSES } from "@/lib/courses";
import { format } from "date-fns";

export function SummaryPage() {
  const searchParams = useSearchParams();
  const diverCount = Math.max(1, parseInt(searchParams.get("divers") ?? "1", 10) || 1);
  const courseId = searchParams.get("courseId") ?? "";
  const depositOption = (searchParams.get("deposit") ?? "full") as "full" | "partial" | "none";
  const paymentMethod = (searchParams.get("payment") ?? "card") as "card" | "qr" | "cash";
  const amountToPay = parseInt(searchParams.get("amount") ?? "0", 10) || 0;
  const discount = parseInt(searchParams.get("discount") ?? "0", 10) || 0;
  const totalPrice = parseInt(searchParams.get("total") ?? "0", 10) || 0;
  const contactName = searchParams.get("name") ?? "Winter Kan";
  const contactPhone = searchParams.get("phone") ?? "086-234-1234";
  const contactEmail = searchParams.get("email") ?? "winter@food.com";

  const selectedCourse = courseId
    ? SCUBA_COURSES.find((c) => c.id === courseId)
    : null;

  const subtotal = selectedCourse ? selectedCourse.price * diverCount : 0;
  const displayTotal =
    amountToPay > 0 ? amountToPay : totalPrice > 0 ? totalPrice : subtotal - discount;

  const depositLabel =
    depositOption === "full"
      ? "Full Deposit"
      : depositOption === "partial"
        ? "Partial Deposit"
        : "No Deposit";

  const paymentLabel =
    paymentMethod === "card"
      ? "Pay by Card"
      : paymentMethod === "qr"
        ? "Pay by QR"
        : "Cash";

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#F1F1F5] w-full">
      {/* Banner */}
      <div className="relative w-full z-0">
        <Banner variant="scuba" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-4 right-4 lg:left-8 lg:right-8 xl:left-16 xl:right-16 z-20">
        <Header
          currentStep={4}
          venueName="Koh Tao Scuba Club"
          branchName="Koh Tao"
          totalPrice={displayTotal}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-24 xl:-mt-32 pt-0 pb-24">
        {/* Greeting section - white card for readability */}
        <div className="w-full max-w-[910px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto mb-4 md:mb-6">
          <div className="w-full bg-white rounded-2xl md:rounded-[24px] shadow-sm p-4 sm:p-6 lg:p-8">
            <h2 className="text-[#122C49] font-semibold text-xl leading-[26px] text-center">
              Thank you for your booking!
            </h2>
            <p className="text-[#696974] text-sm leading-[21px] text-center max-w-[343px] mx-auto mt-3">
              Please review your reservation details below before confirming.
            </p>
          </div>
        </div>

        {/* Main content - 2 columns, responsive */}
        <div className="w-full max-w-[910px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[24px]">
          {/* Left column - Customer info & Booking */}
          <div className="w-full lg:w-[326px] lg:min-w-[280px] flex flex-col gap-4 shrink-0">
            {/* Customer Information card */}
            <div className="w-full bg-white rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm">
              <div className="flex flex-row items-center px-4 py-3 md:py-4 border-b border-[#E2E2EA]">
                <h2 className="text-[#122C49] font-semibold text-lg md:text-xl leading-[26px]">
                  Customer Information
                </h2>
              </div>
              <div className="flex flex-col gap-3 md:gap-4 p-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Full Name
                  </span>
                  <span className="text-[#122C49] font-medium text-base leading-[21px]">
                    {contactName}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Phone Number
                  </span>
                  <span className="text-[#122C49] font-medium text-base leading-[21px]">
                    {contactPhone}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Email
                  </span>
                  <span className="text-[#122C49] font-medium text-base leading-[21px]">
                    {contactEmail}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking details card */}
            <div className="w-full bg-white rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm">
              <div className="flex flex-row items-center px-4 py-3 md:py-4 border-b border-[#E2E2EA]">
                <h2 className="text-[#122C49] font-semibold text-xl leading-[26px]">
                  Booking Details
                </h2>
              </div>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Course
                  </span>
                  <span className="text-[#CD5B4D] font-semibold text-base leading-[21px]">
                    {selectedCourse?.name ?? "—"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Number of Divers
                  </span>
                  <span className="text-[#122C49] font-medium text-base leading-[21px]">
                    {diverCount} {diverCount === 1 ? "person" : "people"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Date
                  </span>
                  <span className="text-[#122C49] font-medium text-base leading-[21px]">
                    {format(new Date(), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Deposit Type
                  </span>
                  <span className="text-[#122C49] font-medium text-base leading-[21px]">
                    {depositLabel}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Payment Method
                  </span>
                  <span className="text-[#122C49] font-medium text-base leading-[21px]">
                    {paymentLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Order Summary */}
          <div className="w-full lg:flex-1 lg:min-w-0 lg:max-w-[560px] flex flex-col">
            <div className="w-full bg-white rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm">
              <div className="flex flex-row items-center px-4 py-3 md:py-4 border-b border-[#E2E2EA]">
                <h2 className="text-[#122C49] font-semibold text-lg md:text-xl leading-[26px]">
                  Order Summary
                </h2>
              </div>

              <div className="flex flex-col">
                {/* Order list */}
                <div className="flex flex-col gap-3 md:gap-4 p-4">
                  {selectedCourse ? (
                    <div className="flex flex-row justify-between items-center gap-4">
                      <div className="flex flex-row items-center gap-4 min-w-0 flex-1">
                        <span className="text-[#171725] text-base leading-[21px] shrink-0">
                          x{diverCount}
                        </span>
                        <span className="text-[#171725] text-base leading-[21px] truncate">
                          {selectedCourse.name}
                        </span>
                      </div>
                      <span className="text-[#171725] font-semibold text-base leading-[21px] shrink-0">
                        ฿{subtotal.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[#92929D] text-sm">
                      No course selected.
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E2E2EA] mx-4" />

                {/* Totals - Primary background */}
                <div className="flex flex-col gap-4 p-4 bg-[#F4DDDA]">
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-[#000000] text-base leading-[21px]">
                      Sub total
                    </span>
                    <span className="text-[#171725] font-medium text-base leading-[21px]">
                      ฿{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex flex-row justify-between items-center">
                      <span className="text-[#000000] text-base leading-[21px]">
                        Discount
                      </span>
                      <span className="text-[#171725] font-medium text-base leading-[21px]">
                        -฿{discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-[#000000] text-base leading-[21px]">
                      Amount to pay ({depositLabel})
                    </span>
                    <span className="text-[#171725] font-medium text-base leading-[21px]">
                      ฿{displayTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-px bg-[#E2E2EA]" />
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-[#CD5B4D] font-bold text-2xl leading-[31px]">
                      Total
                    </span>
                    <span className="text-[#CD5B4D] font-bold text-2xl leading-[31px]">
                      ฿{displayTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterButtons
        showBack={false}
        nextHref="/"
        nextLabel="Back to Home"
        footerText="© 2025 Koh Tao Scuba Club. All rights reserved."
      />
    </div>
  );
}
