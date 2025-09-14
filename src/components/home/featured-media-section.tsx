"use client";

import { MediaItem } from "@/lib/supabase/types";
import { SectionHeading } from "../common/section-heading";
import { MediaGrid } from "../common/image-grid";

export function FeaturedMediaSection({
  media,
  limit,
}: {
  media: MediaItem[];
  limit?: number;
}) {
  return (
    <section className="p-4">
      <div className="container max-w-4xl mx-auto">
        <SectionHeading title="Highlights by ITSA" />
        <MediaGrid media={media} limit={limit} />
      </div>
    </section>
  );
}
