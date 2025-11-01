import { createAdminClient } from "./server";
import type { MediaItem } from "./types";

export async function getMediaFromDB(limit?: number) {
  console.log("getMediaFromDB called");
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("media")
    .select("*")
    .order("order", { ascending: true });

  if (error && Object.keys(error).length > 0) {
    // If table doesn't exist, return null so caller can fallback
    console.warn("getMediaFromDB error:", error.message || error);
    return null;
  }

  const items = (data ?? []) as unknown[];
  console.log("Raw DB items:", items.length);

  const mapped: MediaItem[] = items.map((row: unknown) => {
    const item = row as Record<string, unknown>;
    return {
      id: String(item.id),
      url: String(item.url),
      type: item.type as "image" | "video",
      title: item.title ? String(item.title) : undefined,
    };
  });

  console.log("Mapped media items:", mapped.length);
  return limit ? mapped.slice(0, limit) : mapped;
}

export async function uploadMediaFiles(files: File[]) {
  const supabase = await createAdminClient();
  const bucket = "media";
  const basePath = "featured_media";

  // Find current max order
  const { data: rows } = await supabase.from("media").select("order");
  const currentMax = (rows ?? []).reduce(
    (max: number, r: Record<string, unknown>) => Math.max(max, (r.order as number) ?? 0),
    0
  );

  const inserted: Record<string, unknown>[] = [];
  let nextOrder = currentMax + 1;

  for (const file of files) {
    console.log(`Processing file: ${file.name}, size: ${file.size} bytes (${(file.size / 1024 / 1024).toFixed(2)}MB), type: ${file.type}`);
    
    const filename = `${Date.now()}_${file.name}`.replace(/\s+/g, "_");
    const path = `${basePath}/${filename}`;

    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadErr } = await supabase.storage
      .from(bucket)
      .upload(path, arrayBuffer, { 
        contentType: file.type, 
        upsert: false 
      });

    if (uploadErr) {
      console.error("Storage upload error:", uploadErr);
      throw new Error(`Storage upload failed: ${uploadErr.message}. File: ${file.name}, Size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    }

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = publicData?.publicUrl || "";

    const ext = filename.split(".").pop()?.toLowerCase();
    const isVideo = ["mp4", "mov", "webm", "avi"].includes(ext || "");

    const insertPayload = {
      url: publicUrl,
      path,
      type: isVideo ? "video" : "image",
      title: file.name,
      order: nextOrder,
    };

    const { data: insertData, error: insertErr } = await supabase
      .from("media")
      .insert(insertPayload)
      .select()
      .single();

    if (insertErr) {
      console.error("Database insert error:", insertErr);
      // attempt to cleanup uploaded file
      await supabase.storage.from(bucket).remove([path]).catch(() => {});
      throw new Error(`Database insert failed: ${insertErr.message}`);
    }

    inserted.push(insertData);
    nextOrder++;
  }

  return inserted;
}

export async function deleteMediaById(id: string) {
  const supabase = await createAdminClient();
  // Fetch row
  const { data, error } = await supabase.from("media").select("*").eq("id", id).single();
  if (error && Object.keys(error).length > 0) return { error };

  const row = data as Record<string, unknown>;
  const bucket = "media";
  const path = String(row.path);

  // Delete storage file
  const { error: remErr } = await supabase.storage.from(bucket).remove([path]);
  if (remErr && Object.keys(remErr).length > 0) {
    console.warn("Storage remove error:", remErr.message || remErr);
  }

  // Delete DB record
  const { error: delErr } = await supabase.from("media").delete().eq("id", id);
  if (delErr) return { error: delErr };

  return { success: true };
}

export async function reorderMediaByIds(ids: string[]) {
  const supabase = await createAdminClient();

  // Update each id with the new order (1-based)
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const order = i + 1;
    await supabase.from("media").update({ order }).eq("id", id);
  }

  return { success: true };
}
