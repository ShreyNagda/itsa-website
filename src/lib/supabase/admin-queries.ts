import { createClient } from "./server";

// export async function isUserAdmin(email: string) {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("admin_users")
//     .select("id")
//     .eq("email", email)
//     .single();

//   if (error) {
//     return false;
//   }

//   return !!data;
// }

export async function getCurrentAdminUser() {
  const supabase = await createClient();

  const { data: session } = await supabase.auth.getUser();

  if (!session.user) {
    return null;
  }

  // Check if user is admin
  const { data: adminUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .in("role", ["admin", "super_admin"])
    .single();

  if (!adminUser) {
    return null;
  }

  return {
    ...session.user,
    isAdmin: true,
  };
}

export async function getAdminUserById(id: string) {
  const supabase = await createClient();

  const { data: session } = await supabase.auth.getUser();

  if (!session.user) {
    return null;
  }

  const { data: adminUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (!adminUser) {
    return null;
  }
  return adminUser;
}
