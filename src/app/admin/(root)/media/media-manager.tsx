"use client";

import React, { useEffect, useState } from "react";
import type { MediaItem } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { X, Upload, Trash } from "lucide-react";

interface AdminMediaManagerProps {
  initialMedia: MediaItem[];
}

export default function AdminMediaManager({ initialMedia }: AdminMediaManagerProps) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia || []);
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMedia(initialMedia || []), [initialMedia]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!files || files.length === 0) return;
    
    setLoading(true);
    const form = new FormData();
    
    // Add all files to form data
    for (const file of Array.from(files)) {
      form.append("files", file);
    }

    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: form });
      if (res.ok) {
        const json = await res.json();
        setMedia((m) => [...json.inserted, ...m]);
        setFiles(null);
        alert("Upload successful!");
      } else {
        const errorText = await res.text();
        console.error("Upload failed", errorText);
        alert(`Upload failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(`Network error: ${error}`);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this media item?")) return;
    const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    if (res.ok) setMedia((m) => m.filter((i) => i.id !== id));
    else console.error(await res.text());
  }

  function moveItem(index: number, dir: -1 | 1) {
    const next = [...media];
    const swap = index + dir;
    if (swap < 0 || swap >= next.length) return;
    const tmp = next[swap];
    next[swap] = next[index];
    next[index] = tmp;
    setMedia(next);
  }

  async function saveOrder() {
    setLoading(true);
    const ids = media.map((m) => m.id);
    const res = await fetch(`/api/admin/media/reorder`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) console.error(await res.text());
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleUpload} className="flex items-center gap-2">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => setFiles(e.target.files)}
        />
        <Button type="submit" disabled={loading}>
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </form>

      <div className="grid gap-3 md:grid-cols-2">
        {media.map((item, idx) => (
          <div key={item.id} className="p-3 border rounded flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden">
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <video src={item.url} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <div className="font-medium">{item.title || "Untitled"}</div>
                <div className="text-sm text-muted-foreground">{item.type}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => moveItem(idx, -1)}>-</Button>
              <Button variant="outline" onClick={() => moveItem(idx, 1)}>+</Button>
              <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={saveOrder} disabled={loading}>
          Save Order
        </Button>
      </div>
    </div>
  );
}
