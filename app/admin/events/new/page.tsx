import { requireAdmin } from "@/lib/auth";
import EventForm from "@/components/EventForm";

export default async function NewEventPage({
  searchParams
}: {
  searchParams?: { error?: string; success?: string };
}) {
  const session = await requireAdmin();
  if (!session) {
    return (
      <section className="section">
        <div className="card">You must be signed in as an admin to create events.</div>
      </section>
    );
  }

  return (
    <section className="section">
      <h1 className="text-3xl font-bold text-pine">Create New Event</h1>
      {searchParams?.error === "invalid" && (
        <p className="mt-4 text-red-600">Invalid event data. Please check all required fields.</p>
      )}
      {searchParams?.success === "created" && (
        <p className="mt-4 text-green-600">Event created successfully!</p>
      )}
      <div className="mt-6 card">
        <EventForm action="/api/admin/events" submitLabel="Create event" />
      </div>
    </section>
  );
}
