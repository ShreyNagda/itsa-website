"use client";
import { useEffect, useState } from "react";
import {
  Volume2,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
    }, 5000); // change every 5 sec
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!announcements || announcements.length === 0) return null;

  const current = announcements[index];

  const getIcon = (type: Announcement["type"]) => {
    const commonClass = "w-5 h-5 md:w-7 md:h-7";
    switch (type) {
      case "info":
        return <Info className={"text-white " + commonClass} />;
      case "warning":
        return <AlertTriangle className={"text-yellow-300 " + commonClass} />;
      case "success":
        return <CheckCircle className={"text-green-400 " + commonClass} />;
      case "error":
        return <XCircle className={"text-red-300 " + commonClass} />;
      default:
        return <Volume2 className={"text-gray-300 " + commonClass} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 text-sm py-2 px-4 flex items-center justify-start md:justify-center gap-1">
      {getIcon(current.type)}
      <span className="transition-opacity duration-500 ease-in-out md:text-lg line-clamp-1 ">
        {current.content}
      </span>
    </div>
  );
}
