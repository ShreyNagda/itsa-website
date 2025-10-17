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

  // Only log if error has actual content (not empty object)
  if (error && Object.keys(error).length > 0) {
    console.error("Error fetching events:", error);
    return [];
  }

  return (data ?? []) as Event[];
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

  if (error && Object.keys(error).length > 0) {
    console.error("Error fetching event:", error);
    return null;
  }

  return data as Event;
}
// Ensure we always fetch with an absolute URL on the server.
// Priority: explicit NEXT_PUBLIC_SITE_URL -> VERCEL_URL -> localhost with PORT fallback.
// const baseUrl = (() => {
//   const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
//   if (explicit) return explicit;

//   const vercel = process.env.VERCEL_URL;
//   if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

//   const port = process.env.PORT || "3000";
//   return `http://localhost:${port}`;
// })();

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    // Check if we're in a server environment (build time or server-side)
    if (typeof window === 'undefined') {
      // Server-side: read from filesystem directly
      const fs = await import('fs/promises');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'public', 'announcements.json');
      const fileContents = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContents);
    } else {
      // Client-side: use fetch
      const res = await fetch('/announcements.json');
      if (!res.ok) throw new Error("Failed to fetch announcements");
      return res.json();
    }
  } catch (error) {
    console.warn('Failed to load announcements:', error);
    return [];
  }
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

import { getMediaFromDB } from "./media";

export async function getMediaFromStorage(limit?: number) {
  console.log("getMediaFromStorage called");
  
  // Get items from both DB and storage, then merge them
  let dbMedia: MediaItem[] = [];
  let storageMedia: MediaItem[] = [];
  
  // Try to get media from DB (admin-managed)
  try {
    console.log("Trying to get media from DB...");
    const db = await getMediaFromDB();
    dbMedia = db || [];
    console.log("DB media result:", dbMedia.length, "items");
  } catch (e) {
    console.log("DB fetch failed:", e);
  }

  // Also get files directly from storage
  console.log("Fetching from storage...");
  const supabase = await createClient();
  const bucket = "media";
  const basePath = "featured_media";

  try {
    const { data: files, error } = await supabase.storage
      .from(bucket)
      .list(basePath, { limit: 100 });

    if (error) {
      console.error("Storage list error:", error);
    } else {
      console.log("Storage files found:", files?.length || 0);
      
      storageMedia = files?.map((file) => {
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
    }
  } catch (e) {
    console.error("Storage fetch error:", e);
  }

  // Merge DB and storage media, avoiding duplicates
  // DB entries take precedence (they have order and better metadata)
  const dbUrls = new Set(dbMedia.map(item => item.url));
  const uniqueStorageMedia = storageMedia.filter(item => !dbUrls.has(item.url));
  
  const allMedia = [...dbMedia, ...uniqueStorageMedia];
  console.log("Final media array:", allMedia.length, "items (", dbMedia.length, "from DB,", uniqueStorageMedia.length, "from storage)");

  // Shuffle storage-only items for Instagram-like feel, but keep DB items in order
  const shuffledStorageMedia = uniqueStorageMedia.sort(() => Math.random() - 0.5);
  const finalMedia = [...dbMedia, ...shuffledStorageMedia];

  return limit ? finalMedia.slice(0, limit) : finalMedia;
}
