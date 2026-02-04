"use client";

const BANNER_IMAGES = {
  restaurant:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1440&q=80",
  scuba:
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1440&q=80",
};

interface BannerProps {
  variant?: "restaurant" | "scuba";
}

export function Banner({ variant = "restaurant" }: BannerProps) {
  const bgImage = BANNER_IMAGES[variant];
  return (
    <div
      className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[420px] xl:h-[480px] overflow-hidden"
      style={{
        background:
          `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 37.5%), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
