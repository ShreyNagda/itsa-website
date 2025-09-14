import type React from "react";
import { getCurrentAdminUser } from "@/lib/supabase/admin-queries";
import AdminHeader from "@/components/admin/header";
import { redirect } from "next/navigation";
import { Laptop, Monitor } from "lucide-react";

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
      {/* Mobile/Tablet blocker */}
      <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm lg:hidden flex flex-col items-center justify-center text-center p-6">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Laptop className="w-6 h-6" />
          <div className="w-[1px] h-6 bg-primary/60"></div>
          <Monitor className="w-6 h-6" />
        </div>
        <span className="text-lg font-medium text-muted-foreground">
          Please access the Admin Dashboard on a desktop or laptop.
        </span>
      </div>

      {/* Desktop Admin Layout */}
      <div className="min-h-screen bg-background hidden lg:block">
        <AdminHeader userEmail={adminUser?.email || ""} />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </>
  );
}
