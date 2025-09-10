"use client";
import Image from "next/image";
import { SectionHeading } from "../common/section-heading";
import { MediaItem } from "@/lib/supabase/types";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type GalleryGroup = {
  title: string;
  thumbnail: string;
  images: { url: string; title?: string }[];
};

export default function FeaturedMediaSection({ media }: { media?: MediaItem[] }) {
  // Static test content grouped into 4 panes
  const groups: GalleryGroup[] = [
    {
      title: "IT WEEK EVENTS",
      thumbnail:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      images: [
        { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0e6?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1600&q=80&auto=format" },
      ],
    },
    {
      title: "HACKSCRIPT",
      thumbnail:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      images: [
        { url: "https://images.unsplash.com/photo-1555949963-aa79dcee981d?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?w=1600&q=80&auto=format" },
      ],
    },
    {
      title: "MINI-PROJECT ROADMAPS",
      thumbnail:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
      images: [
        { url: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1553484771-047a44eee27b?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1600&q=80&auto=format" },
      ],
    },
    {
      title: "Other departmental activities",
      thumbnail:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
      images: [
        { url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1400&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1511634829096-045a111727eb?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1515165562835-c3b8c2e9f6ce?w=1600&q=80&auto=format" },
        { url: "https://images.unsplash.com/photo-1533240332313-0db49b459ad1?w=1600&q=80&auto=format" },
      ],
    },
  ];

  return (
    <section className="bg-gradient-to-b from-background to-muted/30 py-14 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <SectionHeading title="Featured Media" />
          <Badge variant="secondary" className="hidden sm:inline-flex">{groups.length} categories</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {groups.map((group) => (
            <Dialog key={group.title}>
              <DialogTrigger asChild>
                <button
                  className="relative overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-md transition group"
                  aria-label={`Open gallery for ${group.title}`}
                >
                  <Image
                    src={group.thumbnail}
                    alt={`${group.title} thumbnail`}
                    width={1200}
                    height={675}
                    className="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-5 text-left">
                    <h3 className="text-white text-xl font-semibold drop-shadow-sm">
                      {group.title}
                    </h3>
                    <p className="text-white/80 text-xs mt-1">{group.images.length} photos</p>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-5xl p-0">
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle>{group.title}</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {group.images.map((img, i) => (
                      <div key={i} className="overflow-hidden rounded-lg border bg-background">
                        <Image
                          src={img.url}
                          alt={img.title || `${group.title} image ${i + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-48 md:h-52 object-cover hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
