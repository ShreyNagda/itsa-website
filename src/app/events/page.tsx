import { getEvents } from "@/lib/supabase/queries";
import { EventCard } from "@/components/events/event-card";
import { Header } from "@/components/common/header";
import Footer from "@/components/common/footer";

export default async function EventsPage() {
  const allEvents = await getEvents();
  const upcomingEvents = allEvents.filter(
    (event) => event.status === "upcoming"
  );
  const ongoingEvents = allEvents.filter((event) => event.status === "ongoing");
  const pastEvents = allEvents.filter((event) => event.status === "completed");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">ITSA Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with all Information Technology Student Association
            events, workshops, and activities designed for students, by
            students.
          </p>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} showViewButton />
              ))}
            </div>
          </section>
        )}

        {/* Ongoing Events */}
        {ongoingEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-accent rounded-full"></div>
              Ongoing Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingEvents.map((event) => (
                <EventCard key={event.id} event={event} showViewButton />
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-muted-foreground rounded-full"></div>
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} showViewButton />
              ))}
            </div>
          </section>
        )}

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
