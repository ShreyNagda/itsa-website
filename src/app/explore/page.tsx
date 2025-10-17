import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { SectionHeading } from "@/components/common/section-heading";
import { MediaGrid } from "@/components/common/image-grid";
import { getMediaFromStorage } from "@/lib/supabase/queries";
import { MediaItem } from "@/lib/supabase/types";

export default async function ExplorePage() {
  // Fetch media from Supabase storage (same source as Highlights)
  let media: MediaItem[] = [];
  
  try {
    media = await getMediaFromStorage();
    console.log("Explore page - media fetched:", media.length, "items");
  } catch (error) {
    console.error("Error fetching media for explore page:", error);
  }

  return (
    <main className="items-center justify-center">
      <Header />
      <section className="py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <SectionHeading title="Explore" subtitle="Discover highlights from our community" />
          {/* Masonry-like layout using CSS columns, similar to Pinterest */}
          <MediaGrid
            media={media}
            columnsClassName="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4"
          />
          {media.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No media found. Upload some media in the admin panel.</p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
