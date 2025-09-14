import { getEvents } from "@/lib/supabase/queries";
import EventsSection from "@/components/events/events-section";
import { Header } from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Event } from "@/lib/supabase/types";

export default async function EventsPage() {
  const allEvents: Event[] = await getEvents();

  const upcomingEvents = allEvents.filter(
    (event) => event.status === "upcoming"
  );
  const pastEvents = allEvents.filter((event) => event.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Upcoming Events */}
        <EventsSection title="Upcoming Events" events={upcomingEvents} />
        {/* Ongoing Events */}
        {/* <EventsSection title="Ongoing Events" events={ongoingEvents} /> */}
        {/* Past Events */}
        <EventsSection title="Past Events" events={pastEvents} />
        {allEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              No Events Yet
            </h3>
            <p className="text-muted-foreground">
              Check back soon for upcoming ITSA events and activities!
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
