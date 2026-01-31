import Link from "next/link";
import type { Event } from "@/lib/types";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <span className="badge">{event.difficulty}</span>
        <span className="text-xs text-pine/60">{new Date(event.dateStart).toLocaleDateString()}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-pine">{event.title}</h3>
      <p className="mt-2 text-sm text-pine/70">{event.locationName}</p>
      <p className="mt-4 text-sm text-pine/80">{event.description}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-moss">{event.cost ? `$${event.cost}` : "Free"}</span>
        <Link href={`/events/${event.slug}`} className="text-sm font-semibold text-sunrise">
          View details →
        </Link>
      </div>
    </div>
  );
}
