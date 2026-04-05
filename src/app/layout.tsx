import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdsSidebar } from "@/components/globals/AdsSidebar";
import { Footer } from "@/components/globals/Footer";
import { Navbar } from "@/components/globals/Navbar";
import { SITE_NAME } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/siteUrl";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Minimal fallbacks only — each route should set its own metadata via {@code buildPageMetadata} in {@code page.tsx}. */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: SITE_NAME,
  description: "Free online calculators for finance, health, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full bg-neutral-2 antialiased`}>
      <body className="flex min-h-full flex-col bg-neutral-2 font-sans text-neutral-1 antialiased">
        <Navbar />
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 px-4 py-4 md:gap-20 md:py-6 md:flex-row md:px-[100px]">
          <main className="min-w-0 flex-1">{children}</main>
          <AdsSidebar />
        </div>
        <Footer />
      </body>
    </html>
  );
}
