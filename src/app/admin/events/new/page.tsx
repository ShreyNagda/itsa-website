import EventForm from "@/components/events/form";
import { createEvent } from "@/lib/event-actions";

export default function NewEventPage() {
  return (
    <div>
      <EventForm
        action={createEvent}
        title={"New Event"}
        description={"Fill in all information for the new event"}
      />
    </div>
  );
}
