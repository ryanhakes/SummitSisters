import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EventForm from "@/components/EventForm";

function toInputDate(date: Date | null) {
  if (!date) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return (
      <section className="section">
        <div className="card">You must be signed in as an admin to edit events.</div>
      </section>
    );
  }

  const event = await prisma.event.findUnique({
    where: { id: params.id }
  });

  if (!event) {
    notFound();
  }

  return (
    <section className="section">
      <h1 className="text-3xl font-bold text-pine">Edit Event</h1>
      <div className="mt-6 card">
        <EventForm
          action={`/api/admin/events/${event.id}`}
          submitLabel="Save changes"
          event={{
            ...event,
            dateStart: toInputDate(event.dateStart),
            dateEnd: toInputDate(event.dateEnd),
            cost: event.cost ?? undefined,
            capacity: event.capacity ?? undefined
          }}
        />
      </div>
    </section>
  );
}
