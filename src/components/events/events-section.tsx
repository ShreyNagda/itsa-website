import { getUpcomingEvents, getPastEvents } from "@/lib/supabase/queries";
import EventCard from "./event-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EventsSection() {
  const upcomingEvents = await getUpcomingEvents();
  const pastEvents = await getPastEvents();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Upcoming Events */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-geist text-3xl font-bold text-primary mb-2">
                Upcoming Events
              </h2>
              <p className="font-manrope text-muted-foreground">
                Don&apos;t miss out on these exciting opportunities
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/events" className="font-manrope">
                View All Events
              </Link>
            </Button>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} showViewButton={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-manrope text-muted-foreground text-lg">
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Past Events */}
        <div>
          <div className="mb-8">
            <h2 className="font-geist text-3xl font-bold text-primary mb-2">
              Past Events
            </h2>
            <p className="font-manrope text-muted-foreground">
              See what we&apos;ve accomplished together
            </p>
          </div>

          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} showViewButton={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-manrope text-muted-foreground text-lg">
                No past events to display yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
