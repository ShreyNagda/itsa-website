"use server";

import { createAdminClient, createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createAdminUser(
  prevState: unknown,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createAdminClient();

  try {
    // 1. Create user in Auth
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return { error: authError.message };
    }

    const userId = authData.user?.id;
    if (!userId) {
      return { error: "User creation failed, no user ID returned." };
    }

    return { success: true };
  } catch (error) {
    console.error("Admin creation error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
// Admin sign in function - checks if user is in admin_users table
export async function adminSignIn(pevState: unknown, formData: FormData) {
  // Check if formData is valid
  if (!formData) {
    return { error: "Form data is missing" };
  }

  const email = formData.get("email");
  const password = formData.get("password");

  // Validate required fields
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createClient();

  try {
    // First, sign in with Supabase auth
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    });

    if (authError) {
      return { error: authError.message };
    }

    // Check if the user is in the admin_users table
    const { data: adminUser, error: adminError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toString())
      .in("role", ["admin", "super_admin"])
      .single();

    if (adminError || !adminUser) {
      await supabase.auth.signOut();
      return { error: "Access denied. Admin privileges required." };
    }

    // Return success if user is admin
    return { success: true };
  } catch (error) {
    console.error("Admin login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
export async function deleteAdminUser(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.auth.admin.deleteUser(id);
  // const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) return { error: error.message };
  return null;
}
// Admin sign out function
export async function adminSignOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/admin/login");
}
export async function updateAdminUser(
  prevState: unknown,
  id: string,
  formData: FormData
) {
  const email = formData.get("email");
  if (!email || !id) {
    return { error: "Email and id are required" };
  }
}
