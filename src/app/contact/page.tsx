import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";

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
  { name: "Shrey Nagda", email: "shreynagda2714@gmail.com", role: "Technical Head" },
  { name: "Tanishq Shelar", email: "itanishelar@gmail.com", role: "Technical Co-Head" },
];

export default function ContactPage() {
  return (
    <div>
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
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
