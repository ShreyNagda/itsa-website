import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import EventsSection from "@/components/events/events-section";
import AnnouncementRibbon from "@/components/home/announcement-section";
import FeaturedMediaSection from "@/components/home/featured-media-section";
// import FeaturedMediaSection from "@/components/home/featured-media-section";
import HeroSection from "@/components/home/hero-section";
import JoinCommunitySection from "@/components/home/join-community-section";
import { getAnnouncements, getEvents, getMedia } from "@/lib/supabase/queries";
import { Announcement, Event, MediaItem } from "@/lib/supabase/types";
export default async function Home() {
  const allEvents: Event[] = await getEvents();

  const announcements: Announcement[] = await getAnnouncements();

  const featuredMedia: MediaItem[] = await getMedia();

  return (
    <main className="items-center justify-center">
      {/* Announcement marquee ribbon */}
      <AnnouncementRibbon announcements={announcements} />
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
      <FeaturedMediaSection media={featuredMedia} />
      <JoinCommunitySection />
      <Footer />
    </main>
  );
}
