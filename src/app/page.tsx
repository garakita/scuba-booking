import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F1F5] p-6">
      <div className="text-center mb-12">
        <h1 className="text-[#122C49] font-bold text-2xl md:text-3xl mb-2">
          Koh Tao Scuba Club
        </h1>
        <p className="text-[#92929D] text-sm md:text-base">
          Select an application
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <Link
          href="/booking/reservation-detail"
          className="flex-1 flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-[#CD5B4D] hover:shadow-md transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-[#F4DDDA] flex items-center justify-center group-hover:bg-[#CD5B4D] transition-colors">
            <span className="text-3xl">📅</span>
          </div>
          <span className="text-[#122C49] font-semibold text-lg">Booking</span>
          <span className="text-[#92929D] text-sm text-center">
            Customer reservation & course booking
          </span>
        </Link>
        <Link
          href="/pos"
          className="flex-1 flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-[#122C49] hover:shadow-md transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-[#E8EEF4] flex items-center justify-center group-hover:bg-[#122C49] transition-colors">
            <span className="text-3xl">🖥️</span>
          </div>
          <span className="text-[#122C49] font-semibold text-lg">POS</span>
          <span className="text-[#92929D] text-sm text-center">
            Point of Sale & checkout
          </span>
        </Link>
      </div>
    </div>
  );
}
