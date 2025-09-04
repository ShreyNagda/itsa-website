import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";

export async function addFeaturedMedia(prevState: unknown, formData: FormData) {
  if (!formData) return { error: "Form data is missing" };
  const title = formData.get("title");
  const type = formData.get("type");
  const url = formData.get("url");

  const supabase = await createClient();

  const { error } = await supabase
    .from("featured_media")
    .insert([{ title, url, type }]);

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/");

  return { success: true };
}

export async function editFeaturedMedia(
  prevState: unknown,
  mediaId: string,
  formData: FormData
) {
  if (!formData) return { error: "Form data is missing" };
  const title = formData.get("title");
  const type = formData.get("type");
  const url = formData.get("url");

  const supabase = await createClient();

  const { error } = await supabase
    .from("featured_media")
    .update([{ title, url, type }])
    .eq("id", mediaId);

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  revalidatePath("/");

  return { success: true };
}
