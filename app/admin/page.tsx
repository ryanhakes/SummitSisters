import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { isAdminEmail } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.email ? isAdminEmail(session.user.email) : false;

  if (!session || !isAdmin) {
    return (
      <section className="section">
        <div className="card max-w-xl">
          <h1 className="text-2xl font-bold text-pine">Admin access</h1>
          <p className="mt-3 text-sm text-pine/70">
            Sign in with the admin email address to manage events. You&apos;ll receive a magic link by email.
          </p>
          <Link href="/api/auth/signin" className="mt-6 inline-flex rounded-md bg-sunrise px-4 py-2 text-white">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const events = await prisma.event.findMany({
    orderBy: { dateStart: "desc" }
  });

  return (
    <section className="section">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pine">Admin Dashboard</h1>
        <Link href="/admin/events/new" className="rounded-md bg-sunrise px-4 py-2 text-white">
          Create new event
        </Link>
      </div>
      <div className="mt-8 grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-pine">{event.title}</p>
              <p className="text-xs text-pine/60">{event.dateStart.toLocaleDateString()} • {event.locationName}</p>
              <p className="text-xs text-pine/60">{event.published ? "Published" : "Draft"} • {event.isPrivate ? "Private" : "Public"}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/events/${event.id}/edit`} className="rounded-md border border-pine px-3 py-1 text-sm text-pine">
                Edit
              </Link>
              <Link href={`/admin/events/${event.id}/registrations`} className="rounded-md border border-pine px-3 py-1 text-sm text-pine">
                Registrations
              </Link>
              <form action={`/api/admin/events/${event.id}`} method="post">
                <input type="hidden" name="_method" value="delete" />
                <button type="submit" className="rounded-md border border-sunrise px-3 py-1 text-sm text-sunrise">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
