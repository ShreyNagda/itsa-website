import { Event } from "@/lib/supabase/types";
import { EventCard } from "@/components/events/event-card";
import Link from "next/link";

interface EventsSectionProps {
  events: Event[];
  title: string;
  maxEvents?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export default function EventsSection({
  events,
  title,
  maxEvents,
  showViewAll = false,
  viewAllLink = "/events",
}: EventsSectionProps) {
  // Sort events by event_date in descending order
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
  );

  // Slice events if maxEvents is provided
  const displayedEvents = maxEvents
    ? sortedEvents.slice(0, maxEvents)
    : sortedEvents;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        {title}
      </h2>
      {displayedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} showViewButton />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No {title} Yet
          </h3>
          <p className="text-muted-foreground">Check back soon for updates!</p>
        </div>
      )}
      {showViewAll && (
        <div className="text-center mt-8">
          <Link
            href={viewAllLink}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            View All
          </Link>
        </div>
      )}
    </section>
  );
}
