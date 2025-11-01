
import { getMediaFromStorage } from "@/lib/supabase/queries";
import AdminMediaManager from "./media-manager";

export default async function MediaAdminPage() {
  const media = await getMediaFromStorage();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-geist text-3xl font-bold text-primary">
          Media Manager
        </h1>
        <p className="font-manrope text-muted-foreground">
          Manage featured gallery media
        </p>
      </div>
      
      {/* Client side manager with upload / reorder capabilities */}
      <AdminMediaManager initialMedia={media} />
    </div>
  );
}
