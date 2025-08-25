import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FooterComponent() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-full">
                <Image
                  src="/itsa_logo_transparent.png"
                  alt="ITSA Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-geist text-lg font-bold">ITSA</span>
                <span className="font-manrope text-sm opacity-80">
                  Information Technology Student Association
                </span>
              </div>
            </div>
            <p className="font-manrope text-sm opacity-80 mb-4 max-w-md">
              For the Students, By the Students. Join our community of
              passionate IT students and advance your career in technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-geist text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="font-manrope text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="font-manrope text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-manrope text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-manrope text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-geist text-lg font-semibold mb-4">
              Stay Updated
            </h3>
            <p className="font-manrope text-sm opacity-80 mb-4">
              Subscribe to get notified about upcoming events and opportunities.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground text-primary"
              />
              <Button variant="secondary" size="sm" className="font-manrope">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="font-manrope text-sm opacity-80">
            © 2025 Information Technology Student Association. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { FooterComponent as Footer };

// Keep default export for backward compatibility
export default FooterComponent;
