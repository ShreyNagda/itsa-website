import EventForm from "@/components/events/form";
import { updateEvent } from "@/lib/event-actions";
import { getEventById } from "@/lib/supabase/queries";
import { notFound } from "next/navigation";

interface EditEventPageProps {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  // Fetch the event by ID
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const updateEventAction = async (
    prevState: unknown,
    formData: FormData
  ): Promise<{ success?: boolean; error?: string }> => {
    "use server";
    return updateEvent(prevState, id, formData);
  };

  return (
    <div>
      <EventForm
        event={event}
        action={updateEventAction} // ✅ Correct type
        title="Update Event Details"
        description="Modify the information for this event"
      />
    </div>
  );
}
