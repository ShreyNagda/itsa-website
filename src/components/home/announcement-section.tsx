"use client";
import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";
import { Announcement } from "@/lib/supabase/types";

export default function AnnouncementRibbon({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 4000); // change every 4 sec
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="bg-gray-900 text-gray-100 text-sm py-2 px-4 flex items-center justify-center">
      <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
      <span className="transition-opacity duration-500 ease-in-out">
        {announcements[index].content}
      </span>
    </div>
  );
}
