import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Plus, Edit } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { User } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserDeleteDialog from "@/components/users/delete-dialog";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  // Get all admin users
  const { data: adminUsers, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin users:", error);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-geist text-3xl font-bold text-primary">
              Current Admin Users
            </div>
            <div className="font-manrope text-muted-foreground">
              Users with administrative access to the system
            </div>
          </div>
          <Link href={"/admin/users/new"}>
            <Button>
              <Plus /> Add Admin
            </Button>
          </Link>
        </div>
      </div>
      {adminUsers && adminUsers.length > 0 ? (
        <div className="space-y-4">
          {adminUsers.map((user: User) => (
            <Card
              key={user.id}
              className="w-full flex flex-row items-center justify-between p-4 border rounded-lg"
            >
              <CardContent className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-manrope font-medium">{user.email}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="font-manrope">
                      Added{" "}
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-2">
                <Badge variant="secondary" className="font-manrope">
                  Admin
                </Badge>
                {user.role !== "super_admin" && (
                  <>
                    <Link href={`/admin/users/${user.id}/edit`}>
                      <Button variant={"ghost"}>
                        <Edit />
                      </Button>
                    </Link>
                    <UserDeleteDialog userId={user.id} email={user.email} />
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="font-manrope text-muted-foreground">
            No admin users found
          </p>
        </div>
      )}
    </div>
  );
}
