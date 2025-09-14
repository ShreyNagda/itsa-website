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
import { usePathname } from "next/navigation";

export default function AnnouncementRibbon({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const pathname = usePathname();

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
    const commonClass = "w-4 h-4 md:w-5 md:h-5";
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

  if (pathname.includes("/admin")) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 ">
      <div className="bg-gray-900 text-gray-100 text-sm py-2 px-4 flex items-center justify-start md:justify-center gap-1 ">
        {getIcon(current.type)}
        <span className="transition-opacity duration-500 ease-in-out line-clamp-1 ">
          {current.content}
        </span>
      </div>
    </div>
  );
}
