import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/supabase/types";

interface EventCardProps {
  event: Event;
  showViewButton?: boolean;
}

export function EventCard({ event, showViewButton = false }: EventCardProps) {
  const eventDate = new Date(event.event_date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(
    `2000-01-01T${event.event_time}`
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

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
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-geist text-xl text-card-foreground line-clamp-2">
            {event.title}
          </CardTitle>
          <Badge className={getStatusColor(event.status)} variant="secondary">
            {event.status}
          </Badge>
        </div>
        <Badge variant="outline" className={getCategoryColor(event.category)}>
          {event.category}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="font-manrope text-muted-foreground mb-4 line-clamp-3">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="font-manrope">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-manrope">{formattedTime}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="font-manrope">{event.location}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {showViewButton ? (
          <Link href={`/events/${event.id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full font-manrope bg-transparent"
            >
              View Details
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            className="w-full font-manrope bg-transparent"
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// Keep default export for backward compatibility
export default EventCard;
