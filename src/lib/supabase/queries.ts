import { createClient } from "./server";
import type { Announcement, Event, MediaItem } from "./types";

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
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
export async function getAnnouncements(): Promise<Announcement[]> {
  const res = await fetch(`${baseUrl}/announcements.json`);
  if (!res.ok) throw new Error("Failed to fetch announcements");
  return res.json();
}

export async function getMedia(): Promise<MediaItem[]> {
  const res = await fetch(`${baseUrl}/media.json`);
  if (!res.ok) throw new Error("Failed to fetch media");
  return res.json();
}
