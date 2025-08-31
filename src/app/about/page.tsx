import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { SectionHeading } from "@/components/common/section-heading";
import JoinCommunitySection from "@/components/home/join-community-section";

export default function AboutPage() {
  return (
    <div className="">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Image
                src="/itsa_logo.png"
                alt="ITSA Logo"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
            <h1 className="font-geist text-4xl md:text-5xl font-bold text-primary mb-4">
              About ITSA
            </h1>
            <p className="font-manrope text-xl text-muted-foreground max-w-3xl mx-auto">
              Information Technology Student Association - For the Students, By
              the Students
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <SectionHeading title="Our Mission" />
            <p className="font-manrope text-muted-foreground text-lg leading-relaxed mb-4">
              ITSA is a department-level student association dedicated to
              fostering growth, learning, and community within the Information
              Technology field. We believe in creating opportunities for
              students to excel both academically and professionally.
            </p>
            <p className="font-manrope text-muted-foreground text-lg leading-relaxed">
              Our motto{" "}
              <strong>&quot;For the Students, By the Students&quot;</strong>{" "}
              reflects our commitment to student-driven initiatives that address
              real needs and create meaningful impact.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-muted/30 rounded-lg mb-16">
            <SectionHeading title="Our Values" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">
                    I
                  </span>
                </div>
                <h3 className="font-geist text-xl font-semibold text-primary mb-2">
                  Innovation
                </h3>
                <p className="font-manrope text-muted-foreground">
                  Embracing new technologies and creative solutions to drive
                  progress.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">
                    C
                  </span>
                </div>
                <h3 className="font-geist text-xl font-semibold text-primary mb-2">
                  Community
                </h3>
                <p className="font-manrope text-muted-foreground">
                  Building strong connections and supporting each other&apos;s
                  growth.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">
                    E
                  </span>
                </div>
                <h3 className="font-geist text-xl font-semibold text-primary mb-2">
                  Excellence
                </h3>
                <p className="font-manrope text-muted-foreground">
                  Striving for the highest standards in everything we do.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <JoinCommunitySection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
