"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "./Header";
import { Banner } from "./Banner";
import { FooterButtons } from "./FooterButtons";
import { SCUBA_COURSES } from "@/lib/courses";
import { CreditCard, Banknote, QrCode, Send, Download } from "lucide-react";

type PaymentMethod = "card" | "qr" | "cash";
type DepositOption = "full" | "partial" | "none";

export function PaymentPage() {
  const searchParams = useSearchParams();
  const diverCount = Math.max(1, parseInt(searchParams.get("divers") ?? "1", 10) || 1);
  const courseId = searchParams.get("courseId") ?? "";

  const selectedCourse = courseId
    ? SCUBA_COURSES.find((c) => c.id === courseId)
    : null;

  const unitPrice = selectedCourse?.price ?? 0;
  const subtotal = unitPrice * diverCount;
  const totalPrice = subtotal;

  const [depositOption, setDepositOption] = useState<DepositOption>("full");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  // Amount to pay based on deposit option
  const amountToPay =
    depositOption === "full"
      ? totalPrice
      : depositOption === "partial"
        ? Math.round(totalPrice * 0.5)
        : 0;
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  // Placeholder contact info - in real app would come from Step 1
  const contactName = "Winter Kan";
  const contactPhone = "086-234-1234";
  const contactEmail = "winter@food.com";

  const isNextDisabled = !agreePolicy || !selectedCourse;
  const summaryHref = courseId
    ? `/summary?divers=${diverCount}&courseId=${courseId}&deposit=${depositOption}&payment=${paymentMethod}&amount=${amountToPay}&name=${encodeURIComponent(contactName)}&phone=${encodeURIComponent(contactPhone)}&email=${encodeURIComponent(contactEmail)}&total=${totalPrice}`
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
        {/* Main content - responsive padding */}
        <div className="w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col lg:flex-row justify-center items-stretch lg:items-start gap-4 sm:gap-6 lg:gap-[24px]">
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
          <div className="w-full lg:flex-1 lg:min-w-0 lg:max-w-[560px] flex flex-col gap-4">
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

                <div className="h-px bg-[#E2E2EA]" />
                <div className="flex flex-row justify-between items-center">
                  <span className="text-[#122C49] font-semibold text-base">
                    Total
                  </span>
                  <span className="text-[#122C49] font-semibold text-lg">
                    ฿{totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Order Deposit - amount to pay based on deposit option */}
                <div className="flex flex-col gap-1 pt-2">
                  <span className="text-[#B5B5BE] text-sm leading-[18px]">
                    Order Deposit
                  </span>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-[#122C49] font-medium text-base">
                      {depositOption === "full" && "Full Deposit"}
                      {depositOption === "partial" && "Partial Deposit (50%)"}
                      {depositOption === "none" && "No Deposit (Pay later)"}
                    </span>
                    <span className="text-[#CD5B4D] font-semibold text-lg">
                      ฿{amountToPay.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment card - min-height to prevent layout shift when switching methods */}
            <div className="w-full bg-white rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm">
              {/* Header: icon + title */}
              <div className="flex flex-row items-center gap-4 px-4 py-4 border-b border-[#E2E2EA]">
                {paymentMethod === "card" ? (
                  <CreditCard className="w-8 h-8 shrink-0 text-[#122C49]" />
                ) : paymentMethod === "qr" ? (
                  <QrCode className="w-8 h-8 shrink-0 text-[#122C49]" />
                ) : (
                  <Banknote className="w-8 h-8 shrink-0 text-[#122C49]" />
                )}
                <h2 className="text-black font-semibold text-xl leading-[26px] flex-1">
                  Payment
                </h2>
              </div>

              <div className="flex flex-col p-4 sm:p-6">
                {/* Section 1: Deposit Type */}
                <section className="flex flex-col gap-3 pb-6 border-b border-[#E2E2EA]">
                  <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[#122C49] font-semibold text-base leading-[21px]">
                      Deposit Type
                    </h3>
                    <span className="text-[#CD5B4D] font-semibold text-base">
                      Amount to pay: ฿{amountToPay.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-row flex-wrap items-stretch gap-3 sm:gap-4 w-full">
                    <button
                      type="button"
                      onClick={() => setDepositOption("full")}
                      className={`flex flex-row items-center justify-center gap-2 px-3 sm:px-4 py-3 h-12 sm:h-14 flex-1 min-w-[100px] sm:min-w-[120px] rounded-lg sm:rounded-xl border-2 transition-all ${
                        depositOption === "full"
                          ? "border-[#CD5B4D] bg-white shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                          : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 shrink-0 rounded-full border-[1.5px] flex items-center justify-center ${
                          depositOption === "full"
                            ? "border-[#CD5B4D] bg-white"
                            : "border-[#D5D5DC] bg-white"
                        }`}
                      >
                        {depositOption === "full" && (
                          <span className="w-3 h-3 rounded-full bg-[#CD5B4D]" />
                        )}
                      </span>
                      <span
                        className={`text-base leading-[21px] font-semibold ${
                          depositOption === "full"
                            ? "text-[#CD5B4D]"
                            : "text-[#122C49]"
                        }`}
                      >
                        Full Deposit
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepositOption("partial")}
                      className={`flex flex-row items-center justify-center gap-2 px-3 sm:px-4 py-3 h-12 sm:h-14 flex-1 min-w-[100px] sm:min-w-[120px] rounded-lg sm:rounded-xl border-2 transition-all ${
                        depositOption === "partial"
                          ? "border-[#CD5B4D] bg-white shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                          : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 shrink-0 rounded-full border-[1.5px] flex items-center justify-center ${
                          depositOption === "partial"
                            ? "border-[#CD5B4D] bg-white"
                            : "border-[#D5D5DC] bg-white"
                        }`}
                      >
                        {depositOption === "partial" && (
                          <span className="w-3 h-3 rounded-full bg-[#CD5B4D]" />
                        )}
                      </span>
                      <span
                        className={`text-base leading-[21px] ${
                          depositOption === "partial"
                            ? "font-semibold text-[#CD5B4D]"
                            : "font-normal text-[#122C49]"
                        }`}
                      >
                        Partial Deposit
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepositOption("none")}
                      className={`flex flex-row items-center justify-center gap-2 px-3 sm:px-4 py-3 h-12 sm:h-14 flex-1 min-w-[100px] sm:min-w-[120px] rounded-lg sm:rounded-xl border-2 transition-all ${
                        depositOption === "none"
                          ? "border-[#CD5B4D] bg-white shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                          : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 shrink-0 rounded-full border-[1.5px] flex items-center justify-center ${
                          depositOption === "none"
                            ? "border-[#CD5B4D] bg-white"
                            : "border-[#D5D5DC] bg-white"
                        }`}
                      >
                        {depositOption === "none" && (
                          <span className="w-3 h-3 rounded-full bg-[#CD5B4D]" />
                        )}
                      </span>
                      <span
                        className={`text-base leading-[21px] ${
                          depositOption === "none"
                            ? "font-semibold text-[#CD5B4D]"
                            : "font-normal text-[#122C49]"
                        }`}
                      >
                        No Deposit
                      </span>
                    </button>
                  </div>
                </section>

                {/* Section 2: Payment Method */}
                <section className="flex flex-col gap-3 pt-6 pb-6 border-b border-[#E2E2EA]">
                  <h3 className="text-[#122C49] font-semibold text-base leading-[21px]">
                    Payment Method
                  </h3>
                  <div className="flex flex-row flex-wrap items-stretch gap-3 sm:gap-4 w-full">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-row items-center justify-center gap-2 px-3 sm:px-4 py-3 h-12 sm:h-14 flex-1 min-w-[100px] sm:min-w-[120px] rounded-lg sm:rounded-xl border-2 transition-all shrink-0 ${
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
                    onClick={() => setPaymentMethod("qr")}
                    className={`flex flex-row items-center justify-center gap-2 px-3 sm:px-4 py-3 h-12 sm:h-14 flex-1 min-w-[100px] sm:min-w-[120px] rounded-lg sm:rounded-xl border-2 transition-all shrink-0 ${
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

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex flex-row items-center justify-center gap-2 px-3 sm:px-4 py-3 h-12 sm:h-14 flex-1 min-w-[100px] sm:min-w-[120px] rounded-lg sm:rounded-xl border-2 transition-all shrink-0 ${
                      paymentMethod === "cash"
                        ? "border-[#CD5B4D] bg-white shadow-[0px_4px_10px_rgba(234,128,99,0.2)]"
                        : "border-[#D5D5DC] bg-white hover:border-[#E2E2EA]"
                    }`}
                  >
                    <Banknote
                      className={`w-6 h-6 shrink-0 ${
                        paymentMethod === "cash"
                          ? "text-[#CD5B4D]"
                          : "text-[#92929D]"
                      }`}
                    />
                    <span
                      className={`font-medium text-base ${
                        paymentMethod === "cash"
                          ? "text-[#CD5B4D]"
                          : "text-[#696974]"
                      }`}
                    >
                      Cash
                    </span>
                  </button>
                </div>
                </section>

                {/* Section 3: Payment method details - min-height prevents layout shift */}
                <div className="min-h-[320px] sm:min-h-[380px]">
                {paymentMethod === "qr" && (
                  <section className="flex flex-col gap-4 pt-6 pb-6 border-b border-[#E2E2EA]">
                    <h3 className="text-[#122C49] font-semibold text-base leading-[21px]">
                      QR Payment
                    </h3>
                    <div className="flex flex-col items-center gap-4 w-full">
                      <p className="text-[#122C49] text-sm sm:text-base leading-[21px] text-center">
                        Scan the QR code below to complete your payment
                      </p>
                      <div className="flex flex-col items-center w-full max-w-[440px] border border-[#D5D5DC] rounded-2xl sm:rounded-[24px] overflow-hidden bg-white">
                        <div className="w-full aspect-square max-h-[280px] sm:max-h-[350px] md:max-h-[422px] bg-[#F1F1F5] flex items-center justify-center p-4 sm:p-8">
                          <div className="w-full h-full max-w-[200px] max-h-[200px] sm:max-w-[280px] sm:max-h-[280px] bg-white rounded-xl flex items-center justify-center border border-[#D5D5DC]">
                            <QrCode className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 text-[#92929D]" strokeWidth={1} />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-2 py-3">
                          <div className="w-4 h-4 rounded-full border-[1.5px] border-[#122C49]" />
                          <span className="text-[#122C49] font-semibold text-sm leading-[18px]">
                            PromptPay
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-2 pb-4">
                          <span className="text-[#122C49] font-semibold text-xl leading-[26px]">
                            Amount to pay
                          </span>
                          <span className="text-[#CD5B4D] font-semibold text-base leading-[21px]">
                            ฿{amountToPay.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-px bg-[#D5D5DC]" />
                        <div className="flex flex-row w-full p-3 sm:p-4 gap-3 sm:gap-4">
                          <button
                            type="button"
                            className="flex flex-row items-center justify-center gap-2 flex-1 h-12 sm:h-14 rounded-lg sm:rounded-[10px] border border-[#122C49] text-[#122C49] font-semibold text-xs sm:text-sm hover:bg-[#122C49]/5 transition-colors"
                          >
                            <Send className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                            <span className="hidden sm:inline">Send to Line</span>
                            <span className="sm:hidden">Line</span>
                          </button>
                          <div className="w-px bg-[#D5D5DC] self-stretch" />
                          <button
                            type="button"
                            className="flex flex-row items-center justify-center gap-2 flex-1 h-12 sm:h-14 rounded-lg sm:rounded-[10px] border border-[#122C49] text-[#122C49] font-semibold text-xs sm:text-sm hover:bg-[#122C49]/5 transition-colors"
                          >
                            <Download className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Section 3b: Card Details (when Pay by Card selected) */}
                {paymentMethod === "card" && (
                  <section className="flex flex-col gap-4 pt-6 pb-6 border-b border-[#E2E2EA]">
                  <h3 className="text-[#122C49] font-semibold text-base leading-[21px]">
                    Card Details
                  </h3>
                  <div className="flex flex-col gap-4">
                    {/* Row 1: Card name + Expiry date */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <label className="flex flex-row items-center gap-1">
                          <span className="text-[#130F26] font-medium text-base leading-[21px]">
                            Card name
                          </span>
                          <span className="text-[#F60100] font-medium text-base leading-[21px]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Enter name on card"
                          className="h-14 px-4 py-2.5 bg-white border border-[#D5D5DC] rounded-xl text-base leading-[21px] text-[#130F26] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
                        />
                      </div>
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <label className="flex flex-row items-center gap-1">
                          <span className="text-[#130F26] font-medium text-base leading-[21px]">
                            Expiry date
                          </span>
                          <span className="text-[#F60100] font-medium text-base leading-[21px]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          className="h-14 px-4 py-2.5 bg-white border border-[#D5D5DC] rounded-xl text-base leading-[21px] text-[#130F26] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
                        />
                      </div>
                    </div>

                    {/* Row 2: Card number + CVV */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <label className="flex flex-row items-center gap-1">
                          <span className="text-[#122C49] font-medium text-base leading-[21px]">
                            Card number
                          </span>
                          <span className="text-[#F60100] font-medium text-base leading-[21px]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Enter card number"
                          className="h-14 px-4 py-2.5 bg-white border border-[#D5D5DC] rounded-xl text-base leading-[21px] text-[#130F26] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
                        />
                      </div>
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <label className="flex flex-row items-center gap-1">
                          <span className="text-[#122C49] font-medium text-base leading-[21px]">
                            CVV
                          </span>
                          <span className="text-[#F60100] font-medium text-base leading-[21px]">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="Enter CVV"
                          className="h-14 px-4 py-2.5 bg-white border border-[#D5D5DC] rounded-xl text-base leading-[21px] text-[#130F26] placeholder:text-[#92929D] focus:outline-none focus:ring-2 focus:ring-[#CD5B4D]/30 focus:border-[#CD5B4D]"
                        />
                      </div>
                    </div>
                  </div>
                  </section>
                )}
                </div>

                {/* Section 4: Terms and Policy */}
                <div className="pt-6 flex flex-col gap-3">
                  <h3 className="text-[#122C49] font-semibold text-base leading-[21px]">
                    Terms and Policy
                  </h3>
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
