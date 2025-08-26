import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { getEvents } from "@/lib/supabase/queries";
import DeleteEventDialog from "@/components/events/delete-dialog";

export default async function AdminEventsPage() {
  const events = await getEvents();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-secondary text-secondary-foreground";
      case "ongoing":
        return "bg-accent text-accent-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workshop":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "meeting":
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
      case "career":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-geist text-3xl font-bold text-primary">
            Event Management
          </h1>
          <p className="font-manrope text-muted-foreground">
            Create, edit, and manage ITSA events
          </p>
        </div>
        <Button asChild className="font-manrope">
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Link>
        </Button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h3 className="font-geist text-lg font-semibold">
                          {event.title}
                        </h3>
                        <p className="font-manrope text-muted-foreground text-sm mt-1 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          className={getStatusColor(event.status)}
                          variant="secondary"
                        >
                          {event.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getCategoryColor(event.category)}
                        >
                          {event.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="font-manrope">
                          {new Date(event.event_date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-manrope">
                          {new Date(
                            `2000-01-01T${event.event_time}`
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="font-manrope">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    {/* <DeleteEventButton eventId={event.id} /> */}
                    <DeleteEventDialog
                      eventTitle={event.title}
                      eventId={event.id}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="font-manrope text-muted-foreground text-lg mb-4">
                No events found
              </p>
              <Button asChild className="font-manrope">
                <Link href="/admin/events/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Event
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
