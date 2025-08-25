"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
      .from("admin_users")
      .select("id")
      .eq("email", email.toString())
      .single();
    console.log(email, adminUser);

    if (adminError || !adminUser) {
      // Sign out the user if they're not an admin
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

// Admin sign out function
export async function adminSignOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/admin/login");
}
