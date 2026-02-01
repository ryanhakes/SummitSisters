"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [success, setSuccess] = useState("");

  const isAdmin = session?.user ? true : false;

  useEffect(() => {
    if (isAdmin) {
      fetch('/api/admin/events')
        .then(res => res.json())
        .then(data => setEvents(data));
    }
  }, [isAdmin]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get('success');
    const errorParam = urlParams.get('error');
    if (successParam) {
      if (successParam === 'updated') setSuccess('Event updated successfully!');
      else if (successParam === 'created') setSuccess('Event created successfully!');
      else if (successParam === 'deleted') setSuccess('Event deleted successfully!');
      // Clear the URL param
      window.history.replaceState({}, '', '/admin');
    }
    if (errorParam === 'delete') {
      setSuccess('Failed to delete event. Please try again.');
      window.history.replaceState({}, '', '/admin');
    }
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !isAdmin) {
    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      await signIn("credentials", { password, callbackUrl: "/admin" });
      setLoading(false);
    };

    return (
      <section className="section">
        <div className="card max-w-xl">
          <h1 className="text-2xl font-bold text-pine">Admin access</h1>
          <p className="mt-3 text-sm text-pine/70">
            Enter the admin password to sign in.
          </p>
          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full rounded-md border border-pine/20 px-3 py-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex rounded-md bg-sunrise px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pine">Admin Dashboard</h1>
        <Link href="/admin/events/new" className="rounded-md bg-sunrise px-4 py-2 text-white">
          Create new event
        </Link>
      </div>
      {success && (
        <p className="mt-4 text-green-600">{success}</p>
      )}
      <div className="mt-8 grid gap-4">
        {events.map((event: any) => (
          <div key={event.id} className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-pine">{event.title}</p>
              <p className="text-xs text-pine/60">{new Date(event.dateStart).toLocaleDateString()} • {event.locationName}</p>
              <p className="text-xs text-pine/60">{event.published ? "Published" : "Draft"} • {event.isPrivate ? "Private" : "Public"}</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-pine/70 bg-pine/10 px-2 py-1 rounded">
                {event._count.registrations} registered
              </span>
              <Link href={`/admin/events/${event.id}/edit`} className="rounded-md border border-pine px-3 py-1 text-sm text-pine">
                Edit
              </Link>
              <Link href={`/admin/events/${event.id}/registrations`} className="rounded-md border border-pine px-3 py-1 text-sm text-pine">
                Registrations
              </Link>
              <form action={`/api/admin/events/${event.id}`} method="post" className="inline">
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
