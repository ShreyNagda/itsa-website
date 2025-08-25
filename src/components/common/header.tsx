"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function HeaderComponent() {
  const links = [
    { url: "/", text: "Home" },
    { url: "/events", text: "Events" },
    { url: "/about", text: "About" },
    { url: "/contact", text: "Contact" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/itsa_logo.png"
            alt="ITSA Logo"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <div className="flex flex-col">
            <span className="font-geist text-lg font-bold text-primary">
              ITSA
            </span>
            <span className="font-manrope text-xs text-muted-foreground">
              Information Technology
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link, index) => (
            <Link key={index} href={link.url}>
              {link.text}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden bg-transparent"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col items-center gap-6">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  onClick={() => setOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export { HeaderComponent as Header };

// Keep default export for backward compatibility
export default HeaderComponent;
