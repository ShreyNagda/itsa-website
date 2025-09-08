"use client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from "lucide-react";
import { SectionHeading } from "../common/section-heading";
import Link from "next/link";
import { toast } from "sonner"; // Adjust the import path as needed
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/lib/newsletter-action";

export default function JoinCommunitySection() {
  const [state, formAction] = useActionState(subscribeToNewsletter, null);
  const [email, setEmail] = useState("");

  // Handle success/error from formAction
  useEffect(() => {
    if (state?.success) {
      toast.success(`Thank you for subscribing with ${state.email}!`);
      setEmail("");
    } else if (state?.error) {
      toast.error(state.error.toString());
    }
  }, [state]);

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Join Our Community" />

        <div className="mt-6 space-y-6">
          <p className="font-manrope text-muted-foreground text-lg md:text-xl max-w-2xl">
            Ready to be part of something bigger? Check out our upcoming events
            and get involved!
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* WhatsApp Button */}
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 w-full md:w-1/2 "
            >
              <Link
                href="https://faq.whatsapp.com/495856382464992"
                className="font-manrope flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Join WhatsApp Community
              </Link>
            </Button>

            {/* Newsletter Form */}
            <form
              className="w-full md:w-1/2 flex flex-col sm:flex-row gap-2"
              action={formAction}
            >
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                autoComplete="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="flex-1 "
              />
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// SubmitButton component to handle pending state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="font-manrope  flex items-center gap-2"
      disabled={pending}
    >
      {pending ? (
        <span>Subscribing...</span>
      ) : (
        <>
          <Send className="h-5 w-5" />
          Subscribe
        </>
      )}
    </Button>
  );
}
