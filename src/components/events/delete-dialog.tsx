"use client";

import { deleteEvent } from "@/lib/event-actions"; // server function
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteEventDialogProps {
  eventId: string;
  eventTitle: string;
}

export default function DeleteEventDialog({
  eventId,
  eventTitle,
}: DeleteEventDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEvent(eventId); // server action
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete the event &quot;{eventTitle}&quot;?
        </AlertDialogDescription>
        <AlertDialogAction asChild>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />} Yes,
            Delete
          </Button>
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
