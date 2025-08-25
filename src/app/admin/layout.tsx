import type React from "react";
import { getCurrentAdminUser } from "@/lib/supabase/admin-queries";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthPage =
    typeof window !== "undefined"
      ? window.location.pathname === "/admin/login"
      : false;

  // Only check authentication for non-auth pages
  if (!isAuthPage) {
    const adminUser = await getCurrentAdminUser();

    if (!adminUser) {
      redirect("/admin/login");
    }

    return (
      <div className="min-h-screen bg-background">
        <AdminHeader userEmail={adminUser.email} />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
