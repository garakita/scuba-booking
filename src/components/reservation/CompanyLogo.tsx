"use client";

interface CompanyLogoProps {
  /** URL to company logo image. If not provided, shows placeholder. */
  src?: string;
  alt?: string;
}

export function CompanyLogo({ src, alt = "Company logo" }: CompanyLogoProps) {
  return (
    <div className="absolute top-4 left-4 lg:top-6 lg:left-8 z-20">
      <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white border-2 border-white shadow-lg flex items-center justify-center overflow-hidden">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[#122C49] font-bold text-xl lg:text-2xl">🐠</span>
        )}
      </div>
    </div>
  );
}
