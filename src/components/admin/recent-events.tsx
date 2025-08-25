import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getEvents } from "@/lib/supabase/queries";

export default async function AdminRecentEvents() {
  const recentEvents = await getEvents();
  const limitedEvents = recentEvents.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist">Recent Events</CardTitle>
        <CardDescription className="font-manrope">
          Latest events in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {limitedEvents.length > 0 ? (
            limitedEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between space-x-4"
              >
                <div className="space-y-1 flex-1">
                  <p className="font-manrope text-sm font-medium leading-none">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="font-manrope">
                        {new Date(event.event_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
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
                        <MapPin className="h-3 w-3" />
                        <span className="font-manrope">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge
                  variant={
                    event.status === "upcoming"
                      ? "default"
                      : event.status === "ongoing"
                      ? "secondary"
                      : "outline"
                  }
                  className="font-manrope text-xs"
                >
                  {event.status}
                </Badge>
              </div>
            ))
          ) : (
            <p className="font-manrope text-sm text-muted-foreground">
              No events found
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
