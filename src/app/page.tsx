import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import EventsSection from "@/components/events/events-section";
import HeroSection from "@/components/home/hero-section";

export default function Home() {
  return (
    <main className="items-center justify-items-center">
      <Header />
      <HeroSection />
      <EventsSection />
      <Footer />
    </main>
  );
}
