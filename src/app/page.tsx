import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import EventsSection from "@/components/events/events-section";
import AnnouncementRibbon from "@/components/home/announcement-section";
import FeaturedMediaSection from "@/components/home/featured-media-section";
// import FeaturedMediaSection from "@/components/home/featured-media-section";
import HeroSection from "@/components/home/hero-section";
import JoinCommunitySection from "@/components/home/join-community-section";
import { getEvents } from "@/lib/supabase/queries";
import { Event } from "@/lib/supabase/types";
export default async function Home() {
  const allEvents: Event[] = await getEvents();

  const announcements = [
    "Registrations are open for Hackathon 2025!",
    "Join our weekly tech talk on AI this Friday!",
    "Membership renewals are now available.",
  ];

  type MediaItem = {
    id: number;
    url: string;
    title: string;
    type: "image" | "video";
  };

  const featuredMedia: MediaItem[] = [
    {
      type: "image",
      url: "/images/event1.jpg",
      title: "Tech Fest 2025",
      id: 0,
    },
    {
      type: "video",
      url: "/videos/workshop.mp4",
      title: "Coding Workshop",
      id: 1,
    },
    { type: "image", url: "/images/team.jpg", title: "Meet Our Team", id: 2 },
    {
      type: "image",
      url: "/images/session.jpg",
      title: "Interactive Session",
      id: 3,
    },
    {
      type: "video",
      url: "/videos/highlights.mp4",
      title: "Event Highlights",
      id: 4,
    },
    {
      type: "image",
      url: "/images/hackathon.jpg",
      title: "Hackathon Moments",
      id: 5,
    },
  ];

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
