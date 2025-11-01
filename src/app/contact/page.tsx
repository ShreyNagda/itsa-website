import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";
import Image from "next/image";

type Person = {
  name: string;
  email?: string;
  role?: string;
};

const members: Person[] = [
  { name: "Tharani Velar", role: "President" },
  { name: "Divyashree Bhangle", role: "Vice-President" },
  { name: "Rudranarayan Sahu", role: "Secretary" },
  { name: "Shruti Thakur",  role: "Treasurer" },
  { name: "Aditya Chavan",  role: "CSI Co-Head" },
  { name: "Mrunmai Dhoble",  role: "CSI Head" },
  { name: "Shubham Pawaskar",  role: "T&P Head" },
  { name: "Aryan Yadav",  role: "T&P Co-Head" },
  { name: "Neha Chauhan",  role: "Photography Head" },
  { name: "Siddhi Thanekar",  role: "Design Head" },
  { name: "Jui Katkade",  role: "Publicity Head" },
  { name: "Vaidehi Borekar",  role: "Literature Head" },
  { name: "Gauri Borse",  role: "Photography Head" },
  { name: "Khushi Anchalia", role: "Design Head" },
  { name: "Rinkal Mishra",  role: "Publicity Head" },
  { name: "Rutuja Gujar",  role: "Literature Head" },
];

const heads: Person[] = [
  { name: "Shrey Nagda", email: "", role: "Technical Head" },
  { name: "Tanishq Shelar", email: "", role: "Technical Co-Head" },
];

export default function ContactPage() {
  return (
    <div>
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Team Picture Section */}
          <div className="mb-16 text-center">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-1">
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900">
                <Image
                  src="/itsa25team.jpg"
                  alt="ITSA Team Photo"
                  width={1200}
                  height={600}
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
                {/* Overlay with team info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                  <div className="p-6 md:p-8 text-white">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                      ITSA Team 2025-26
                    </h2>
                    <p className="text-sm md:text-base opacity-90">
                      United in Innovation, Driven by Excellence
                    </p>
                  </div>
                </div>
                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/30 rounded-bl-lg"></div>
              </div>
            </div>
          </div>

          <SectionHeading title="ITSA TEAM" />
          <p className="font-manrope text-muted-foreground mb-6">
            Meet the official ITSA team for 2025-26
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m, idx) => (
              <Fragment key={`${m.name}-${idx}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{m.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{m.role ?? "Member"}</div>
                  </CardHeader>
                  {m.email && (
                    <CardContent>
                      <a
                        href={`mailto:${m.email}`}
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {m.email}
                      </a>
                    </CardContent>
                  )}
                </Card>
                {idx === 3 && (
                  <div className="col-span-full h-6 sm:h-8 lg:h-10" aria-hidden="true" />
                )}
              </Fragment>
            ))}
          </div>

          <div className="mt-12 border-t pt-10">
            <SectionHeading title="Technical Heads" />
            <div className="grid gap-4 sm:grid-cols-2">
              {heads.map((h, idx) => (
                <Card key={`${h.name}-${idx}`} className="border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-base">{h.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{h.role}</div>
                  </CardHeader>
                  {h.email && (
                    <CardContent>
                      <a
                        href={`mailto:${h.email}`}
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {h.email}
                      </a>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
