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
    <div className="min-h-screen bg-background">
      <AdminHeader userEmail={adminUser?.email || ""} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
