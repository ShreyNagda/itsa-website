"use client";

import { useState, useEffect, startTransition } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Event } from "@/lib/supabase/types";
import Image from "next/image";
import { toast } from "sonner";

interface SubmitButtonProps {
  isEditing: boolean;
  uploading: boolean;
}

function SubmitButton({ isEditing, uploading }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const disabled = pending || uploading;

  return (
    <Button type="submit" disabled={disabled} className="font-manrope">
      {disabled ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {uploading
            ? "Uploading..."
            : isEditing
            ? "Updating..."
            : "Creating..."}
        </>
      ) : isEditing ? (
        "Update Event"
      ) : (
        "Create Event"
      )}
    </Button>
  );
}

interface EventFormProps {
  event?: Event;
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<{ success?: boolean; error?: string }>;
  title: string;
  description: string;
}

interface FileWithPreview {
  preview: string;
  storagePath?: string;
}

export default function EventForm({
  event,
  action,
  title,
  description,
}: EventFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(action, null);

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>(
    event?.media?.map((url) => ({ preview: url })) || []
  );

  const [uploading, setUploading] = useState(false);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = 5 - selectedFiles.length;
    const newFiles = files.slice(0, remainingSlots);

    setUploading(true);

    const uploadedFiles: (FileWithPreview | null)[] = await Promise.all(
      newFiles.map(async (file) => {
        const fileName = file.name.split(" ").join("-");
        const filePath = `events/${fileName}`;

        const { error } = await supabase.storage
          .from("media")
          .upload(filePath, file);
        if (error && error?.message !== "The resource already exists") {
          console.error("Upload failed:", error?.name);
          toast.error(error.message);
        }

        const url = supabase.storage.from("media").getPublicUrl(filePath)
          .data.publicUrl;

        return {
          preview: url,
          storagePath: filePath,
        } as FileWithPreview;
      })
    );

    setSelectedFiles([
      ...selectedFiles,
      ...(uploadedFiles.filter(Boolean) as FileWithPreview[]),
    ]);
    setUploading(false);
    e.target.value = "";
  };

  const removeFile = async (index: number) => {
    const fileToRemove = selectedFiles[index];
    if (fileToRemove.storagePath) {
      const { error } = await supabase.storage
        .from("media")
        .remove([fileToRemove.storagePath]);
      if (error) console.error("Delete failed:", error.message);
    }
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const moveFile = (from: number, to: number) => {
    if (to < 0 || to >= selectedFiles.length) return;
    const filesCopy = [...selectedFiles];
    const [moved] = filesCopy.splice(from, 1);
    filesCopy.splice(to, 0, moved);
    setSelectedFiles(filesCopy);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploading) return;

    const formData = new FormData(e.currentTarget);
    selectedFiles.forEach((f) => formData.append("media_urls", f.preview));

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        event ? "Event updated successfully" : "Event created successfully"
      );
      router.push("/admin/events");
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state, router, event]);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <Button variant="ghost" className="w-fit" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <CardTitle className="font-geist text-3xl font-bold">{title}</CardTitle>
        <CardDescription className="font-manrope text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {state?.error && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded font-manrope text-sm">
              {state.error}
            </div>
          )}

          <div className="grid gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter event title"
                defaultValue={event?.title}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter event description"
                defaultValue={event?.description}
                required
                rows={4}
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event_date">Event Date *</Label>
                <Input
                  id="event_date"
                  name="event_date"
                  type="date"
                  defaultValue={event?.event_date}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_time">Event Time *</Label>
                <Input
                  id="event_time"
                  name="event_time"
                  type="time"
                  defaultValue={event?.event_time}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter event location"
                defaultValue={event?.location || ""}
              />
            </div>

            {/* Media Upload */}
            <div className="space-y-2">
              <Label htmlFor="media">
                Media (Images/Videos, max 5, Place poster as first)
              </Label>
              <Input
                type="file"
                name="media"
                multiple
                accept="image/*,video/*"
                onChange={handleFilesChange}
              />
              {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedFiles.map((f, idx) => (
                    <div
                      key={idx}
                      className="relative w-24 h-24 border rounded overflow-hidden"
                    >
                      {f.preview.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video
                          src={f.preview}
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <Image
                          src={f.preview}
                          alt="preview"
                          className="object-cover"
                          fill
                        />
                      )}
                      <div className="absolute top-1 right-1 flex flex-col gap-1">
                        {idx > 0 && (
                          <Button
                            size="icon"
                            type="button"
                            variant="secondary"
                            onClick={() => moveFile(idx, idx - 1)}
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                        )}
                        {idx < selectedFiles.length - 1 && (
                          <Button
                            size="icon"
                            type="button"
                            variant="secondary"
                            onClick={() => moveFile(idx, idx + 1)}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          type="button"
                          variant="destructive"
                          onClick={() => removeFile(idx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  name="category"
                  defaultValue={event?.category || "general"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  name="status"
                  defaultValue={event?.status || "upcoming"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <SubmitButton isEditing={!!event} uploading={uploading} />
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
