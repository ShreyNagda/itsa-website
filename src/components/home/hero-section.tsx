import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-10">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-geist text-3xl md:text-6xl font-bold text-primary mb-6 text-wrap">
            Information Technology
            <br />
            Student Association
          </h1>
          <p className="font-manrope text-lg md:text-2xl text-muted-foreground mb-4">
            For the Students, By the Students
          </p>
          <p className="font-manrope text-base text-foreground mb-8 max-w-2xl mx-auto">
            Join our community of passionate IT students. Discover
            opportunities, attend workshops, network with peers, and advance
            your career in technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-manrope">
              <Link href="/events">View Upcoming Events</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-manrope bg-transparent"
            >
              <Link href="/about">Learn More About ITSA</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
