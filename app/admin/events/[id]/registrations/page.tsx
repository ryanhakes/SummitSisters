import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function RegistrationsPage({ params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return (
      <section className="section">
        <div className="card">You must be signed in as an admin to view registrations.</div>
      </section>
    );
  }

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { registrations: true }
  });

  if (!event) {
    notFound();
  }

  return (
    <section className="section">
      <Link href="/admin" className="text-sm text-sunrise">← Back to dashboard</Link>
      <h1 className="mt-4 text-3xl font-bold text-pine">Registrations: {event.title}</h1>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`/api/admin/events/${event.id}/registrations?format=csv`}
          className="rounded-md border border-pine px-4 py-2 text-sm text-pine"
        >
          Export CSV
        </Link>
      </div>
      <div className="mt-8 card">
        <h2 className="text-lg font-semibold text-pine">Email attendees</h2>
        <form className="mt-4 grid gap-4" action={`/api/admin/events/${event.id}/broadcast`} method="post">
          <div className="grid gap-2">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" required />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} required />
          </div>
          <button type="submit">Send update</button>
        </form>
      </div>

      <div className="mt-8 grid gap-4">
        {event.registrations.length === 0 ? (
          <div className="card">No registrations yet.</div>
        ) : (
          event.registrations.map((registration) => (
            <div key={registration.id} className="card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-pine">{registration.name}</p>
                  <p className="text-xs text-pine/60">{registration.email}</p>
                  {registration.phone && <p className="text-xs text-pine/60">{registration.phone}</p>}
                </div>
                <div className="text-xs text-pine/60">Registered {registration.createdAt.toLocaleDateString()}</div>
              </div>
              <div className="mt-3 grid gap-2 text-xs text-pine/70">
                <p>Emergency contact: {registration.emergencyName} ({registration.emergencyPhone})</p>
                {registration.medicalNotes && <p>Medical notes: {registration.medicalNotes}</p>}
                {typeof registration.answers === "object" && registration.answers !== null && "howHeard" in registration.answers && (
                  <p>Heard about us: {(registration.answers as Record<string, string>).howHeard}</p>
                )}
                {typeof registration.answers === "object" && registration.answers !== null && "whyJoin" in registration.answers && (
                  <p>Why join: {(registration.answers as Record<string, string>).whyJoin}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
