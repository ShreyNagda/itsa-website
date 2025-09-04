"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";

export async function addAnnouncement(prevState: unknown, formData: FormData) {
  if (!formData) return { error: "Form data is missing" };

  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) return { error: "Title and content are required" };

  const supabase = await createClient();

  const { error } = await supabase
    .from("announcements")
    .insert([{ title, content }]);

  if (error) return { error: error.message };

  revalidatePath("/featured");
  revalidatePath("/admin/announcements");

  return { success: true };
}

export async function editAnnouncement(
  prevState: unknown,
  announcementId: string,
  formData: FormData
) {
  if (!formData) return { error: "Form data is missing" };

  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) return { error: "Title and content are required" };

  const supabase = await createClient();

  const { error } = await supabase
    .from("announcements")
    .update({ title, content })
    .eq("id", announcementId);

  if (error) return { error: error.message };

  revalidatePath("/featured");
  revalidatePath("/admin/announcements");

  return { success: true };
}

export async function deleteAnnouncement(announcementId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", announcementId);

  if (error) return { error: error.message };

  revalidatePath("/featured");
  revalidatePath("/admin/announcements");

  return { success: true };
}
