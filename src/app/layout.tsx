import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "Koh Tao Scuba Club - Book Diving Courses",
  description: "Book scuba diving courses at Koh Tao Scuba Club. Try Scuba, Open Water, Advanced, Fun Dives & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${ibmPlexSans.variable} font-sans antialiased m-0 p-0`}>
        {children}
      </body>
    </html>
  );
}
