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
      <div className="min-h-screen bg-background hidden lg:block">
        <AdminHeader userEmail={adminUser?.email || ""} />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
      <div className="bg-background min-h-screen lg:hidden flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 ">
          <Laptop />
          <div className="w-[1px] h-4 rounded border border-black/80"></div>
          <Monitor />
        </div>
        <span>Access on a desktop or a laptop</span>
      </div>
    </>
  );
}
