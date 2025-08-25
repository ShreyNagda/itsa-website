import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  // If Supabase is not configured, show setup message
  //   if (!isSupabaseConfigured) {
  //     return (
  //       <div className="flex min-h-screen items-center justify-center">
  //         <h1 className="text-2xl font-bold mb-4">
  //           Connect Supabase to get started
  //         </h1>
  //       </div>
  //     );
  //   }

  // Check if user is already logged in and is admin
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getUser();

  if (session.user) {
    // Check if user is admin
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", session.user.email)
      .single();

    if (adminUser) {
      redirect("/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <AdminLoginForm />
    </div>
  );
}
