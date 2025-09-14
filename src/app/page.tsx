import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import EventsSection from "@/components/events/events-section";
import { FeaturedMediaSection } from "@/components/home/featured-media-section";
// import FeaturedMediaSection from "@/components/home/featured-media-section";
import HeroSection from "@/components/home/hero-section";
import JoinCommunitySection from "@/components/home/join-community-section";
import { getEvents, getMediaFromStorage } from "@/lib/supabase/queries";
import { Event, MediaItem } from "@/lib/supabase/types";
export default async function Home() {
  const allEvents: Event[] = await getEvents();
  const media: MediaItem[] = await getMediaFromStorage();
  // console.log(media);
  return (
    <main className="items-center justify-center">
      <Header />
      <HeroSection />
      <div className="container mx-auto max-w-4xl p-4">
        <EventsSection
          events={[...allEvents]}
          title={"Events by ITSA"}
          maxEvents={3}
        />
      </div>
      {/* Featured Media Section */}
      <FeaturedMediaSection media={media} />
      <JoinCommunitySection />
      <Footer />
    </main>
  );
}
