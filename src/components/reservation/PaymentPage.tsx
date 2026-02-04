"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "./Header";
import { Banner } from "./Banner";
import { FooterButtons } from "./FooterButtons";
import { SCUBA_COURSES } from "@/lib/courses";
import { CreditCard, Building2, QrCode } from "lucide-react";

type PaymentMethod = "card" | "bank" | "qr";

export function PaymentPage() {
  const searchParams = useSearchParams();
  const diverCount = Math.max(1, parseInt(searchParams.get("divers") ?? "1", 10) || 1);
  const courseId = searchParams.get("courseId") ?? "";

  const selectedCourse = courseId
    ? SCUBA_COURSES.find((c) => c.id === courseId)
    : null;

  const unitPrice = selectedCourse?.price ?? 0;
  const subtotal = unitPrice * diverCount;
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const totalPrice = subtotal - discount;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [agreePolicy, setAgreePolicy] = useState(false);

  // Placeholder contact info - in real app would come from Step 1
  const contactName = "Winter Kan";
  const contactPhone = "086-234-1234";
  const contactEmail = "winter@food.com";

  const isNextDisabled = !agreePolicy || !selectedCourse;
  const summaryHref = courseId
    ? `/summary?divers=${diverCount}&courseId=${courseId}`
    : undefined;

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#F1F1F5] w-full">
      {/* Banner - z-0 = behind */}
      <div className="relative w-full z-0">
        <Banner variant="scuba" />
      </div>

      {/* Header - z-20 = on top */}
      <div className="absolute top-0 left-4 right-4 lg:left-8 lg:right-8 xl:left-16 xl:right-16 z-20">
        <Header
          currentStep={3}
          venueName="Koh Tao Scuba Club"
          branchName="Koh Tao"
          totalPrice={totalPrice}
        />
      </div>

      {/* Content - z-10 = in front of image */}
      <div className="relative z-10 w-full flex flex-col items-center -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-24 xl:-mt-32 pt-0 pb-24">
        {/* Main content */}
        <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-[265px] flex flex-col lg:flex-row justify-center items-start gap-6">
          {/* Left column - Customer info & Booking */}
          <div className="w-full lg:w-[326px] flex flex-col gap-4 shrink-0">
            {/* Customer Information card */}
            <div className="w-full bg-white rounded-[24px] overflow-hidden shadow-sm">
              <div className="flex flex-row items-center px-4 py-4 border-b border-[#E2E2EA]">
                <h2 className="text-[#122C49] font-semibold text-xl leading-[26px]">
                  Customer Information
                </h2>
              </div>
              <div className="flex flex-col gap-4 p-4">
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
            <div className="w-full bg-white rounded-[24px] overflow-hidden shadow-sm">
              <div className="flex flex-row items-center px-4 py-4 border-b border-[#E2E2EA]">
                <h2 className="text-[#122C49] font-semibold text-xl leading-[26px]">
                  Booking Details
                </h2>
              </div>
              <div className="flex flex-col gap-4 p-4">
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
                    Today
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Order summary & Payment */}
          <div className="w-full lg:flex-1 lg:max-w-[560px] flex flex-col gap-4">
            {/* Order Summary card */}
            <div className="w-full bg-white rounded-[24px] overflow-hidden shadow-sm">
              <div className="flex flex-row items-center px-4 py-4 border-b border-[#E2E2EA]">
                <h2 className="text-[#122C49] font-semibold text-xl leading-[26px]">
                  Order Summary
                </h2>
              </div>
              <div className="flex flex-col gap-4 p-4">
                {selectedCourse ? (
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-row items-center gap-2 min-w-0 flex-1">
                      <span className="text-[#171725] text-base leading-[21px] shrink-0">
                        x{diverCount}
                      </span>
                      <span className="text-[#171725] text-base leading-[21px] truncate">
                        {selectedCourse.name}
                      </span>
                    </div>
                    <span className="text-[#171725] font-semibold text-base leading-[21px] shrink-0">
                      ฿{(unitPrice * diverCount).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <p className="text-[#92929D] text-sm">
                    No course selected. Please go back to select a package.
                  </p>
                )}

                {/* Coupon section */}
                <div className="flex flex-row items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 h-10 px-4 border border-[#D5D5DC] rounded-lg text-sm text-[#122C49] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
                  />
                  <button
                    type="button"
                    onClick={() => setDiscount(couponCode ? 100 : 0)}
                    className="h-10 px-4 bg-[#CD5B4D] text-white font-medium text-sm rounded-lg hover:bg-[#B34032] shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="flex flex-row justify-between text-[#CD5B4D] text-sm">
                    <span>Discount applied</span>
                    <span>-฿{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="h-px bg-[#E2E2EA]" />
                <div className="flex flex-row justify-between items-center">
                  <span className="text-[#122C49] font-semibold text-base">
                    Total
                  </span>
                  <span className="text-[#122C49] font-semibold text-lg">
                    ฿{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment card */}
            <div className="w-full bg-white rounded-[24px] overflow-hidden shadow-sm">
              <div className="flex flex-row items-center px-4 py-4 border-b border-[#E2E2EA]">
                <h2 className="text-[#122C49] font-semibold text-xl leading-[26px]">
                  Payment
                </h2>
              </div>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-row items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-[#CD5B4D] bg-white shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                        : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                    }`}
                  >
                    <CreditCard
                      className={`w-6 h-6 shrink-0 ${
                        paymentMethod === "card"
                          ? "text-[#CD5B4D]"
                          : "text-[#92929D]"
                      }`}
                    />
                    <span
                      className={`font-medium text-base ${
                        paymentMethod === "card"
                          ? "text-[#CD5B4D]"
                          : "text-[#696974]"
                      }`}
                    >
                      Pay by Card
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`flex flex-row items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      paymentMethod === "bank"
                        ? "border-[#CD5B4D] bg-white shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                        : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                    }`}
                  >
                    <Building2
                      className={`w-6 h-6 shrink-0 ${
                        paymentMethod === "bank"
                          ? "text-[#CD5B4D]"
                          : "text-[#92929D]"
                      }`}
                    />
                    <span
                      className={`font-medium text-base ${
                        paymentMethod === "bank"
                          ? "text-[#CD5B4D]"
                          : "text-[#696974]"
                      }`}
                    >
                      Pay by Bank
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("qr")}
                    className={`flex flex-row items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      paymentMethod === "qr"
                        ? "border-[#CD5B4D] bg-white shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                        : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                    }`}
                  >
                    <QrCode
                      className={`w-6 h-6 shrink-0 ${
                        paymentMethod === "qr"
                          ? "text-[#CD5B4D]"
                          : "text-[#92929D]"
                      }`}
                    />
                    <span
                      className={`font-medium text-base ${
                        paymentMethod === "qr"
                          ? "text-[#CD5B4D]"
                          : "text-[#696974]"
                      }`}
                    >
                      Pay by QR
                    </span>
                  </button>
                </div>

                <label className="flex flex-row items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreePolicy}
                    onChange={(e) => setAgreePolicy(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#D5D5DC] text-[#CD5B4D] focus:ring-[#CD5B4D]"
                  />
                  <span className="text-[#696974] text-sm leading-[21px]">
                    I agree to the cancellation policy and terms of service.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterButtons
        backHref={`/select-package?divers=${diverCount}`}
        nextHref={summaryHref}
        nextDisabled={isNextDisabled}
        footerText="© 2025 Koh Tao Scuba Club. All rights reserved."
      />
    </div>
  );
}
