"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { adminSignIn } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full font-manrope">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default function AdminLoginForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(adminSignIn, null);

  // Handle successful login by redirecting
  useEffect(() => {
    if (state?.success) {
      router.push("/admin");
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md space-y-8">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-geist text-2xl">Admin Access</CardTitle>
          <CardDescription className="font-manrope">
            Sign in to access the ITSA admin dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded font-manrope text-sm">
                {state.error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium font-manrope"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@itsa.edu"
                  required
                  className="font-manrope"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium font-manrope"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="font-manrope"
                />
              </div>
            </div>

            <SubmitButton />

            <div className="text-center text-muted-foreground font-manrope text-sm">
              Contact system administrator for admin access
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
