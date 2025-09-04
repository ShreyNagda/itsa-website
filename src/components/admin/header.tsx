import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { adminSignOut } from "@/lib/actions";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  userEmail?: string;
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/itsa_logo.png"
            alt="ITSA Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div className="flex flex-col">
            <span className="font-geist text-lg font-bold text-primary">
              ITSA Admin
            </span>
            <span className="font-manrope text-xs text-muted-foreground">
              Management Dashboard
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/admin"
            className="font-manrope text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/events"
            className="font-manrope text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Events
          </Link>
          <Link
            href="/admin/featured"
            className="font-manrope text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Featured
          </Link>
          <Link
            href="/admin/users"
            className="font-manrope text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Admin Users
          </Link>
          <Link
            href="/"
            target="_blank"
            className="font-manrope text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View Site
          </Link>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span className="font-manrope text-sm">
                {userEmail || "Admin"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {/* <DropdownMenuItem asChild>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 font-manrope"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem asChild>
              <form action={adminSignOut} className="w-full">
                <button
                  type="submit"
                  className="flex items-center gap-2 w-full font-manrope"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
