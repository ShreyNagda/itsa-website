import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AnnouncementRibbon from "@/components/home/announcement-section";
import { Announcement } from "@/lib/supabase/types";
import { getAnnouncements } from "@/lib/supabase/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For the students, By the students",
  description:
    "ITSA is a department-level student association dedicated to fostering growth, learning, and community within the Information Technology field. We believe in creating opportunities for students to excel both academically and professionally.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const announcements: Announcement[] = await getAnnouncements();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnnouncementRibbon announcements={announcements} />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
