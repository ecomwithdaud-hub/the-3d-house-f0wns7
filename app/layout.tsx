import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The 3D House — Virtual Architectural Showcase & Portfolio",
  description:
    "An immersive real-time 3D interactive portfolio featuring architectural spaces, concept vehicle showroom, kinetic gallery, and secure quantum vault built with Next.js, React Three Fiber, and GSAP.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#030712] text-slate-100 antialiased overflow-hidden`}
    >
      <body className="h-full w-full overflow-hidden bg-[#030712]">
        {children}
      </body>
    </html>
  );
}
