"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createEvent(prevState: unknown, formData: FormData) {
  if (!formData) return { error: "Form data is missing" };

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const eventDate = formData.get("event_date")?.toString();
  const eventTime = formData.get("event_time")?.toString();
  const location = formData.get("location")?.toString() || null;
  const category = formData.get("category")?.toString() || "general";
  const status = formData.get("status")?.toString() || "upcoming";

  if (!title || !description || !eventDate || !eventTime) {
    return { error: "Title, description, date, and time are required" };
  }

  const supabase = await createClient();
  const { data: session } = await supabase.auth.getUser();
  if (!session.user) return { error: "Authentication required" };

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", session.user.email)
    .single();
  if (!adminUser) return { error: "Admin privileges required" };

  // Expecting media URLs already uploaded
  const mediaUrls = formData.getAll("media_urls").map((v) => v.toString());

  const { error } = await supabase.from("events").insert({
    title,
    description,
    media: mediaUrls,
    event_date: eventDate,
    event_time: eventTime,
    location,
    category,
    status,
    created_by: adminUser.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/");
  return { success: true };
}

export async function updateEvent(
  prevState: unknown,
  eventId: string,
  formData: FormData
) {
  if (!formData) return { error: "Form data is missing" };

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const eventDate = formData.get("event_date")?.toString();
  const eventTime = formData.get("event_time")?.toString();
  const location = formData.get("location")?.toString() || null;
  const category = formData.get("category")?.toString() || "general";
  const status = formData.get("status")?.toString() || "upcoming";

  if (!title || !description || !eventDate || !eventTime) {
    return { error: "Title, description, date, and time are required" };
  }

  const supabase = await createClient();
  const { data: session } = await supabase.auth.getUser();
  if (!session.user) return { error: "Authentication required" };

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", session.user.email)
    .single();
  if (!adminUser) return { error: "Admin privileges required" };

  // Expecting media URLs already uploaded
  const mediaUrls = formData.getAll("media_urls").map((v) => v.toString());
  const { data, error } = await supabase
    .from("events")
    .update({
      title,
      description,
      media: mediaUrls.length ? mediaUrls : undefined,
      event_date: eventDate,
      event_time: eventTime,
      location,
      category,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId);
  if (error) return { error: error.message };
  console.log(data);
  revalidatePath("/admin/events");
  revalidatePath("/");
  return { success: true };
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getUser();
  if (!session.user) throw new Error("Authentication required");

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", session.user.email)
    .single();
  if (!adminUser) throw new Error("Admin privileges required");

  // Delete event from DB
  const { error: deleteError } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId);
  if (deleteError) throw new Error(deleteError.message);

  revalidatePath("/admin/events");
  revalidatePath("/");
}
