import { getEventById } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ongoing":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workshop":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "seminar":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "competition":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "social":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "meeting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/events">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Event Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={getStatusColor(event.status)}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              <Badge className={getCategoryColor(event.category)}>
                {event.category.charAt(0).toUpperCase() +
                  event.category.slice(1)}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold text-primary mb-4">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(event.event_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(event.event_time)}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
              {/* {event.max_participants && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Max {event.max_participants} participants</span>
                </div>
              )} */}
            </div>
          </div>

          {/* Event Image */}
          {event.media && (
            <div className="mb-8">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={event.media[0] || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Event Description */}
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              About This Event
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>

          {/* Event Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Event Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium capitalize">{event.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium capitalize">
                    {event.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {formatDate(event.event_date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">
                    {formatTime(event.event_time)}
                  </span>
                </div>
                {event.location && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{event.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* {event.max_participants && (
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Participation
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Participants:
                    </span>
                    <span className="font-medium">
                      {event.max_participants}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-muted-foreground text-xs">
                      Contact ITSA for registration details and availability.
                    </p>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
