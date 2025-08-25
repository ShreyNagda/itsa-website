import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EventNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-geist">Event Not Found</CardTitle>
          <CardDescription className="font-manrope">
            The event you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild className="font-manrope">
            <Link href="/admin/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
