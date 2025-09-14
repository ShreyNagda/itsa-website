"use client";

import { MediaItem } from "@/lib/supabase/types";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { X } from "lucide-react";

interface MediaGridProps {
  media: MediaItem[];
  limit?: number;
  onItemClick?: (item: MediaItem) => void;
}

export function MediaGrid({ media, limit, onItemClick }: MediaGridProps) {
  const displayed = limit ? media.slice(0, limit) : media;

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
      {displayed.map((item) =>
        onItemClick ? (
          <div
            key={item.id}
            className="group relative break-inside-avoid rounded-lg overflow-hidden w-full cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={item.title || "media"}
                width={400}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
              />
            ) : (
              <video
                src={item.url}
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
        ) : (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <div className="group relative break-inside-avoid rounded-lg overflow-hidden w-full cursor-pointer">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.title || "media"}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={item.url}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
              </div>
            </DialogTrigger>

            <DialogContent
              className="p-0 w-auto rounded-lg bg-transparent border-none flex items-center justify-center"
              showCloseButton={false}
            >
              <DialogHeader className="p-2 sr-only">
                <DialogTitle className="text-white text-lg">
                  {item.title}
                </DialogTitle>
              </DialogHeader>
              <DialogClose className="absolute top-3 right-3 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white">
                <X size={20} />
              </DialogClose>
              <div className="">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.title || "media"}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={item.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-screen rounded-lg"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        )
      )}
    </div>
  );
}
