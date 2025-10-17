import { NextResponse } from "next/server";
import { uploadMediaFiles, deleteMediaById, reorderMediaByIds } from "@/lib/supabase/media";

export async function POST(request: Request) {
  console.log("POST /api/admin/media called");
  
  // Accept multipart upload for files
  const url = new URL(request.url);
  if (url.pathname.endsWith("/reorder")) {
    try {
      const body = await request.json();
      const ids: string[] = body.ids || [];
      await reorderMediaByIds(ids);
      return NextResponse.json({ success: true });
    } catch (e: unknown) {
      const error = e as Error;
      console.error("Reorder error:", error);
      return NextResponse.json({ error: error?.message || String(e) }, { status: 500 });
    }
  }

  // Handle file uploads
  try {
    const formData = await request.formData();
    const files: File[] = [];
    for (const entry of formData.getAll("files")) {
      if (entry instanceof File) files.push(entry);
    }
    
    console.log(`Processing ${files.length} files`);
    
    const inserted = await uploadMediaFiles(files);
    console.log("Upload successful:", inserted);
    return NextResponse.json({ inserted });
  } catch (e: unknown) {
    const error = e as Error;
    console.error("Upload error:", error);
    return NextResponse.json({ error: error?.message || String(e) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  try {
    const res = await deleteMediaById(id);
    if (res.error) return NextResponse.json({ error: res.error }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const error = e as Error;
    return NextResponse.json({ error: error?.message || String(e) }, { status: 500 });
  }
}
