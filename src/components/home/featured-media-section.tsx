"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { SectionHeading } from "../common/section-heading";

type MediaItem = {
  id: number;
  type: "image" | "video";
  url: string;
  title?: string;
};

export default function FeaturedMediaSection({
  media,
}: {
  media: MediaItem[];
}) {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = media.map(() => null);
  }, [media]);

  // Pause all videos except the active one
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && media[index].id !== activeVideoId && !video.paused) {
        video.pause();
      }
    });
  }, [activeVideoId, media]);

  const handleVideoClick = (id: number, index: number) => {
    if (activeVideoId === id) {
      // Pause if clicking the same video
      const video = videoRefs.current[index];
      if (video) {
        video.pause();
        setActiveVideoId(null);
      }
    } else {
      // Play new video
      setActiveVideoId(id);
      const video = videoRefs.current[index];
      if (video) {
        video.play().catch((e) => console.error("Video play failed:", e));
      }
    }
  };

  return (
    <section className="bg-gray-50 py-12 px-4 max-w-4xl mx-auto">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <SectionHeading title="Featured Media" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {media.map((item, index) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-lg bg-white shadow hover:shadow-md transition"
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={item.title || "Featured media"}
                width={400}
                height={250}
                className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="relative">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={item.url}
                  className="w-full h-64 object-cover"
                  loop
                  muted
                  playsInline
                  onClick={() => handleVideoClick(item.id, index)}
                >
                  Your browser does not support the video tag.
                </video>
                {activeVideoId !== item.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <button
                      className="bg-white p-3 rounded-full text-gray-800 hover:scale-110 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoClick(item.id, index);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
            {item.title && (
              <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-50 text-white text-sm p-2 text-center">
                {item.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
