import { getEventById } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import type { MediaItem } from "@/lib/supabase/types";
import { MediaGrid } from "@/components/common/image-grid";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (timeString: string) =>
    new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

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

  // Map event.media (array of URLs) to MediaItem type
  const mediaItems: MediaItem[] =
    event.media?.map((url, index) => ({
      id: `${index}-${url}`,
      url,
      type: /\.(mp4|webm|ogg)$/i.test(url) ? "video" : "image",
      title: event.title || "",
    })) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/events">
            <Button variant="ghost" className="gap-2 font-manrope">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Button>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Event Header */}
          <div className="mb-8 text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge className={getStatusColor(event.status)}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              <Badge className={getCategoryColor(event.category)}>
                {event.category.charAt(0).toUpperCase() +
                  event.category.slice(1)}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-geist font-bold text-primary mb-6">
              {event.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground font-manrope">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(event.event_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{formatTime(event.event_time)}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Layout - Event Info Left, Media Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Event Information */}
            <div className="space-y-6">
              {/* Event Description */}
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h2 className="text-2xl font-geist font-semibold text-primary mb-4">
                  About This Event
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-manrope">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="text-xl font-geist font-semibold text-primary mb-4">
                  Event Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground font-manrope">Status:</span>
                    <Badge className={getStatusColor(event.status)} variant="outline">
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground font-manrope">Category:</span>
                    <Badge className={getCategoryColor(event.category)} variant="outline">
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground font-manrope">Date:</span>
                    <span className="font-medium font-manrope text-right">
                      {formatDate(event.event_date)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground font-manrope">Time:</span>
                    <span className="font-medium font-manrope">
                      {formatTime(event.event_time)}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground font-manrope">Location:</span>
                      <span className="font-medium font-manrope text-right">
                        {event.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Event Media */}
            <div className="space-y-6">
              {mediaItems.length > 0 ? (
                <div className="bg-card rounded-lg p-6 border shadow-sm">
                  <h3 className="text-xl font-geist font-semibold text-primary mb-4">
                    Event Gallery
                  </h3>
                  <MediaGrid 
                    media={mediaItems} 
                    columnsClassName="columns-1 sm:columns-2 gap-4 space-y-4"
                  />
                </div>
              ) : (
                <div className="bg-card rounded-lg p-8 border shadow-sm text-center">
                  <div className="text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-geist font-medium mb-2">No Media Available</h3>
                    <p className="font-manrope">
                      Media for this event will be uploaded soon.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
