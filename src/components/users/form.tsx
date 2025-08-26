"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { redirect, useRouter } from "next/navigation";
import { User } from "@/lib/supabase/types";

interface AdminUserFormProps {
  user?: User;
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<{ success?: boolean; error?: string }>;
}

export default function AdminUserForm({ user, action }: AdminUserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: user?.email || "",
    password: "",
  });

  const handleAddUser = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (user) formData.append("id", user.id);

      const result = await action(null, formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Admin user added successfully!");
        setData({ email: "", password: "" });
      }
    } catch (err) {
      toast.error(`Failed to add admin user - ${err}`);
    } finally {
      setLoading(false);
      redirect("/admin/users");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <Button variant="ghost" className="w-fit" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <CardTitle className="text-3xl font-bold">
          {user ? "Edit" : "Add"} Admin User
        </CardTitle>
        <CardDescription>Fill all the fields</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleAddUser}>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              value={data.email}
              required
              onChange={(ev) =>
                setData((prev) => ({ ...prev, email: ev.target.value }))
              }
            />
          </div>

          {!user && (
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={data.password}
                required
                onChange={(ev) =>
                  setData((prev) => ({ ...prev, password: ev.target.value }))
                }
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            {user && (
              <Button type="button" variant={"secondary"}>
                Reset Password
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {user ? "Updating" : "Adding"}...
                </>
              ) : (
                `${user ? "Update" : "Add"} Admin User`
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
