import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminUser } from "@/lib/supabase/types";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  // Get all admin users
  const { data: adminUsers, error } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin users:", error);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-geist text-3xl font-bold text-primary">
            Admin Users
          </h1>
          <p className="font-manrope text-muted-foreground">
            Manage system administrators
          </p>
        </div>
      </div>

      {/* Admin Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="font-geist">Current Admin Users</CardTitle>
          <CardDescription className="font-manrope">
            Users with administrative access to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {adminUsers && adminUsers.length > 0 ? (
            <div className="space-y-4">
              {adminUsers.map((user: AdminUser) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-manrope font-medium">{user.email}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="font-manrope">
                          Added{" "}
                          {new Date(user.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-manrope">
                    Admin
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="font-manrope text-muted-foreground">
                No admin users found
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-geist">Admin User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 font-manrope text-sm">
            <p>Admin users are managed by the system administrator.</p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-medium">Default Admin Credentials:</p>
              <p className="text-muted-foreground">Email: admin@itsa.edu</p>
              <p className="text-muted-foreground">Password: ITSA@2024!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
