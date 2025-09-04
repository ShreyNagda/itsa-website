import type React from "react";
import { getCurrentAdminUser } from "@/lib/supabase/admin-queries";
import AdminHeader from "@/components/admin/header";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only check authentication for non-auth pages
  const adminUser = await getCurrentAdminUser();
  if (!adminUser) {
    redirect("/admin/login");
  }

  return (
    <>
      <div className="min-h-screen bg-background hidden lg:block">
        <AdminHeader userEmail={adminUser?.email || ""} />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
      <div className="bg-background min-h-screen lg:hidden flex items-center justify-center text-lg">
        Access on a desktop or a laptop
      </div>
    </>
  );
}
