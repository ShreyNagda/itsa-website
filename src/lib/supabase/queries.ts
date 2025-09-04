import { createClient } from "./server";
import type { Announcement, Event, FeaturedMedia } from "./types";

export async function getEvents(status?: "upcoming" | "ongoing" | "completed") {
  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data as Event[];
}

export async function getUpcomingEvents() {
  return getEvents("upcoming");
}

export async function getPastEvents() {
  return getEvents("completed");
}

export async function getEventById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    return null;
  }

  return data as Event;
}

export async function getFeaturedMedia(): Promise<FeaturedMedia[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("featured_media")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching featured media:", error.message);
    return [];
  }

  return data || [];
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error.message);
    return [];
  }

  return data || [];
}
