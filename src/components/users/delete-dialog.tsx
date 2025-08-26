"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteAdminUser } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserDeleteDialogProps {
  userId: string; // the ID of the admin user to delete
  email: string;
}

export default function UserDeleteDialog({
  userId,
  email,
}: UserDeleteDialogProps) {
  const router = useRouter();

  const handleDelete = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const result = await deleteAdminUser(userId);
    if (result?.error) {
      toast.error(`Error deleting user: ${result.error}`);
    } else {
      toast.success("User deleted successfully!");
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete the admin user `{email}`
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form onSubmit={handleDelete}>
            <AlertDialogAction type="submit" asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogAction>
          </form>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
