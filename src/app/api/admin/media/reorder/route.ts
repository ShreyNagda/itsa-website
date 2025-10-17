import { NextResponse } from "next/server";
import { reorderMediaByIds } from "@/lib/supabase/media";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ids: string[] = body.ids || [];
    await reorderMediaByIds(ids);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
