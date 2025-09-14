import { createClient } from "./server";
import type { Announcement, Event, MediaItem } from "./types";

type OrderBy = {
  column: string;
  ascending?: boolean;
};
export async function getEvents(
  status?: "upcoming" | "ongoing" | "completed",
  orderBy?: OrderBy
) {
  const supabase = await createClient();

  let query = supabase.from("events").select("*");

  // Apply ordering (default = event_date DESC)
  if (orderBy) {
    query = query.order(orderBy.column, {
      ascending: orderBy.ascending ?? false,
    });
  } else {
    query = query.order("event_date", { ascending: false });
  }

  // Filter by status if provided
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

export async function getUpcomingEvents(orderBy?: OrderBy) {
  return getEvents("upcoming", orderBy);
}

export async function getPastEvents(orderBy?: OrderBy) {
  return getEvents("completed", orderBy);
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
// Ensure we always fetch with an absolute URL on the server.
// Priority: explicit NEXT_PUBLIC_SITE_URL -> VERCEL_URL -> localhost with PORT fallback.
const baseUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  const port = process.env.PORT || "3000";
  return `http://localhost:${port}`;
})();

export async function getAnnouncements(): Promise<Announcement[]> {
  const res = await fetch(`${baseUrl}/announcements.json`);
  if (!res.ok) throw new Error("Failed to fetch announcements");
  return res.json();
}

// export async function getMedia(): Promise<MediaItem[]> {
//   const res = await fetch(`${baseUrl}/media.json`);
//   if (!res.ok) throw new Error("Failed to fetch media");
//   const raw = await res.json();
//   const { valid, errors } = validateMediaItems(raw);
//   if (errors.length) {
//     console.warn("Media validation errors:", errors);
//   }
//   return valid;
// }

// export async function getGroupsFromStorage(): Promise<GalleryGroup[]> {
//   const bucket = "media";
//   const basePath = "featured_media";
//   const supabase = await createClient();

//   // Step 1: list top-level folders
//   const { data: folders, error: folderError } = await supabase.storage
//     .from(bucket)
//     .list(basePath, { limit: 100 });

//   if (folderError) throw folderError;

//   const groups: GalleryGroup[] = [];

//   for (const folder of folders) {
//     if (!folder.name || !folder.id) continue;
//     if (folder.metadata?.mimetype) continue; // skip files, we want only "folders"

//     // Step 2: list files inside each folder
//     const { data: files, error: fileError } = await supabase.storage
//       .from(bucket)
//       .list(`${basePath}/${folder.name}`, { limit: 100 });

//     if (fileError) throw fileError;

//     // Step 3: build public URLs
//     const images =
//       files?.map((file) => ({
//         url: supabase.storage
//           .from(bucket)
//           .getPublicUrl(`${basePath}/${folder.name}/${file.name}`).data
//           .publicUrl,
//         title: file.name,
//       })) || [];
//     if (images.length === 0) continue;

//     // Step 4: pick first image as thumbnail
//     groups.push({
//       title: folder.name,
//       thumbnail: images[0].url,
//       images,
//     });
//   }

//   return groups;
// }

export async function getMediaFromStorage(limit?: number) {
  const supabase = await createClient();
  const bucket = "media";
  const basePath = "featured_media";

  const { data: files, error } = await supabase.storage
    .from(bucket)
    .list(basePath, { limit: 100 });

  if (error) throw error;
  const media: MediaItem[] =
    files?.map((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const isVideo = ["mp4", "mov", "webm", "avi"].includes(ext || "");

      return {
        id: file.id || file.name,
        url: supabase.storage
          .from(bucket)
          .getPublicUrl(`${basePath}/${file.name}`).data.publicUrl,
        type: isVideo ? "video" : "image",
        title: file.name,
      };
    }) || [];

  // Shuffle for Instagram-like feel
  const shuffled = media.sort(() => Math.random() - 0.5);

  return limit ? shuffled.slice(0, limit) : shuffled;
}
