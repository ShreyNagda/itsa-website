"use server";
import { createClient } from "./supabase/server";

export async function subscribeToNewsletter(
  prevState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;

  // Validate email
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  // TODO: Add your logic to save the email to your database or newsletter service
  // Example: await saveToDatabase(email);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("newsletter")
    .insert([{ email }]) // Specify the column to check for conflicts
    .select();
  if (error) {
    return { success: false, error };
  } // For demo purposes, log the email
  console.log(`Subscribed email: ${email}`);
  console.log(data);

  // Return success
  return { success: true, email };
}
