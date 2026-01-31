import { getUpcomingEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";

const difficulties = ["Easy", "Moderate", "Challenging"];

export default async function EventsPage({
  searchParams
}: {
  searchParams?: { location?: string; difficulty?: string; date?: string };
}) {
  const events = await getUpcomingEvents();
  const filtered = events.filter((event) => {
    if (searchParams?.difficulty && event.difficulty !== searchParams.difficulty) {
      return false;
    }
    if (searchParams?.location && !event.locationName.toLowerCase().includes(searchParams.location.toLowerCase())) {
      return false;
    }
    if (searchParams?.date && new Date(event.dateStart).toISOString().slice(0, 10) !== searchParams.date) {
      return false;
    }
    return true;
  });

  return (
    <section className="section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-pine">Upcoming Adventures</h1>
          <p className="mt-2 text-sm text-pine/70">Find your next hike, retreat, or healing adventure.</p>
        </div>
        <form className="grid gap-3 md:grid-cols-3">
          <input name="location" placeholder="Filter by location" defaultValue={searchParams?.location} />
          <select name="difficulty" defaultValue={searchParams?.difficulty ?? ""}>
            <option value="">All difficulties</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
          <input type="date" name="date" defaultValue={searchParams?.date} />
          <button type="submit" className="md:col-span-3">
            Apply Filters
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filtered.length ? (
          filtered.map((event) => (
            <EventCard
              key={event.id}
              event={{
                ...event,
                dateStart: event.dateStart.toISOString(),
                dateEnd: event.dateEnd?.toISOString() ?? null
              }}
            />
          ))
        ) : (
          <div className="card md:col-span-3">
            <p className="text-sm text-pine/70">No events match those filters yet. Try widening your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
