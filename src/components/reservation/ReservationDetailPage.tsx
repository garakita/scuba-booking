"use client";

import { useState, useMemo } from "react";
import { Header } from "./Header";
import { Banner } from "./Banner";
import { DiversCountSelect } from "./DiversCountSelect";
import { DiversContactForm, type DiverContact } from "./DiversContactForm";
import { PickupSection } from "./PickupSection";
import { TableDateSelect } from "./TableDateSelect";
import { FooterButtons } from "./FooterButtons";

function isValidEmail(email: string): boolean {
  if (!email.trim()) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function ReservationDetailPage() {
  const [diverCount, setDiverCount] = useState(1);
  const [contacts, setContacts] = useState<DiverContact[]>([]);
  const [email, setEmail] = useState("");
  const [needsPickup, setNeedsPickup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupArea, setPickupArea] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  const isFormValid = useMemo(() => {
    // All divers must have name and phone
    const paddedContacts = [...contacts];
    while (paddedContacts.length < diverCount) {
      paddedContacts.push({ name: "", countryCode: "+66", phoneNumber: "" });
    }
    const contactsValid = paddedContacts
      .slice(0, diverCount)
      .every((c) => c.name.trim() !== "" && c.phoneNumber.trim() !== "");
    if (!contactsValid) return false;

    // Email required
    if (!isValidEmail(email)) return false;

    // If needs pickup, location and area required
    if (needsPickup && (pickupLocation.trim() === "" || pickupArea === "")) {
      return false;
    }

    return true;
  }, [diverCount, contacts, email, needsPickup, pickupLocation, pickupArea]);

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#F1F1F5] w-full">
      {/* 1. Banner - z-0 = behind everything */}
      <div className="relative w-full z-0">
        <Banner variant="scuba" />
      </div>

      {/* 2. Header - z-20 = on top */}
      <div className="absolute top-0 left-4 right-4 lg:left-8 lg:right-8 xl:left-16 xl:right-16 z-20">
        <Header currentStep={1} venueName="Koh Tao Scuba Club" branchName="Koh Tao" />
      </div>

      {/* 3. Content - z-10 = in front of image, behind header */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-24 xl:-mt-32 pt-0 pb-6 md:pb-8 max-w-[1440px]">
        <div className="w-full max-w-[375px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[720px] xl:max-w-[910px] flex flex-col gap-4 md:gap-6 overflow-visible">
          {/* Koh Tao Scuba Club - same width as Contact & Select Date */}
          <DiversCountSelect
            value={diverCount}
            onChange={setDiverCount}
            companyName="Koh Tao Scuba Club"
            logoSrc="/scuba-logo.png"
          />

          {/* Contact - per diver (only when count selected) */}
          {diverCount > 0 && (
            <DiversContactForm
              count={diverCount}
              contacts={contacts}
              onContactsChange={setContacts}
              email={email}
              onEmailChange={setEmail}
            />
          )}

          {/* 3. Pickup - single location + area */}
          <PickupSection
            needsPickup={needsPickup}
            onNeedsPickupChange={setNeedsPickup}
            pickupLocation={pickupLocation}
            onPickupLocationChange={setPickupLocation}
            pickupArea={pickupArea}
            onPickupAreaChange={setPickupArea}
          />

          {/* 4. Date & Time */}
          <div className="flex flex-col gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-2xl md:rounded-[24px] shadow-sm">
            <TableDateSelect
              selectedDate={selectedDate}
              onSelectedDateChange={setSelectedDate}
            />
          </div>
        </div>
      </div>

      <FooterButtons
        showBack={false}
        nextHref={`/select-package?divers=${diverCount}`}
        nextDisabled={!isFormValid}
      />
    </div>
  );
}
