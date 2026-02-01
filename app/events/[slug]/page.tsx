import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/events";

export default async function EventDetailPage({ 
  params,
  searchParams
}: { 
  params: { slug: string },
  searchParams?: { success?: string; error?: string }
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) {
    notFound();
  }

  return (
    <section className="section">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <Link href="/events" className="text-sm text-sunrise">← Back to events</Link>
          <h1 className="mt-4 text-3xl font-bold text-pine">{event.title}</h1>
          <p className="mt-2 text-sm text-pine/70">{event.locationName}</p>

          {searchParams?.success === "registered" && (
            <div className="mt-6 rounded-md bg-green-50 p-4 text-green-800">
              <h3 className="font-semibold">Registration confirmed! 🎉</h3>
              <p className="mt-2 text-sm">
                Thanks for signing up! We&apos;ll send you more details soon. Can&apos;t wait to see you out there on the trails! 🌿
              </p>
            </div>
          )}

          {searchParams?.error && (
            <div className="mt-6 rounded-md bg-red-50 p-4 text-red-800">
              <h3 className="font-semibold">Registration failed</h3>
              <p className="mt-2 text-sm">
                {searchParams.error === "invalid" && "Please check all required fields and try again."}
                {searchParams.error === "spam" && "Spam detected. Please try again."}
                {searchParams.error === "access" && "Invalid access code for this private event."}
                {searchParams.error === "full" && "This event is at capacity."}
                {searchParams.error === "server" && "Server error. Please try again later."}
              </p>
            </div>
          )}
          <div className="mt-6 grid gap-4 text-sm text-pine/80 md:grid-cols-2">
            <div className="card">
              <p className="text-xs uppercase text-pine/60">Date + Time</p>
              <p className="mt-2 font-semibold">{event.dateStart.toLocaleString()}</p>
              {event.dateEnd && <p className="text-xs text-pine/60">Ends {event.dateEnd.toLocaleString()}</p>}
            </div>
            <div className="card">
              <p className="text-xs uppercase text-pine/60">Trail Details</p>
              <p className="mt-2">Difficulty: {event.difficulty}</p>
              {event.distance && <p>Distance: {event.distance}</p>}
              {event.elevationGain && <p>Elevation gain: {event.elevationGain}</p>}
            </div>
            <div className="card">
              <p className="text-xs uppercase text-pine/60">Meeting Spot</p>
              <p className="mt-2">{event.locationName}</p>
              {event.address && <p className="text-xs text-pine/60">{event.address}</p>}
              {event.googleMapsLink && (
                <Link href={event.googleMapsLink} className="text-sm text-sunrise">
                  View map
                </Link>
              )}
            </div>
            <div className="card">
              <p className="text-xs uppercase text-pine/60">Cost</p>
              <p className="mt-2 font-semibold">{event.cost ? `$${event.cost}` : "Free"}</p>
              {event.capacity && <p className="text-xs text-pine/60">Capacity: {event.capacity}</p>}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-pine">About this adventure</h2>
            <p className="mt-3 text-sm text-pine/70 whitespace-pre-line">{event.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-pine">Packing list</h3>
            <p className="mt-3 text-sm text-pine/70 whitespace-pre-line">
              {event.packingList ?? "Bring water, layers, sturdy shoes, and a journal."}
            </p>
          </div>

          <div className="mt-8 card">
            <h3 className="text-lg font-semibold text-pine">Safety & Faith Notes</h3>
            <ul className="mt-3 space-y-2 text-sm text-pine/70">
              <li>• Healing hikes are not medical advice; please bring needed support.</li>
              <li>• We will open and close with prayer and a short devotional.</li>
              <li>• Notify leaders of any medical concerns in your registration.</li>
            </ul>
          </div>
        </div>

        <div className="card h-fit">
          <h2 className="text-xl font-semibold text-pine">Register</h2>
          <p className="mt-2 text-sm text-pine/70">Reserve your spot and receive a confirmation email with details.</p>
          <form className="mt-6 grid gap-4" action={`/api/events/${event.id}/register`} method="post">
            <input type="hidden" name="eventId" value={event.id} />
            <div className="grid gap-2">
              <label htmlFor="name">Full name <span className="text-red-500">*</span></label>
              <input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input id="email" type="email" name="email" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone">Phone (optional)</label>
              <input id="phone" name="phone" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="emergencyName">Emergency contact name <span className="text-red-500">*</span></label>
              <input id="emergencyName" name="emergencyName" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="emergencyPhone">Emergency contact phone <span className="text-red-500">*</span></label>
              <input id="emergencyPhone" name="emergencyPhone" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="medicalNotes">Medical notes (optional)</label>
              <textarea id="medicalNotes" name="medicalNotes" rows={3} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="howHeard">How did you hear about Summit Sisters? <span className="text-red-500">*</span></label>
              <input id="howHeard" name="howHeard" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="whyJoin">Why do you want to come? <span className="text-red-500">*</span></label>
              <textarea id="whyJoin" name="whyJoin" rows={3} required />
            </div>
            {event.isPrivate && (
              <div className="grid gap-2">
                <label htmlFor="accessCode">Access code <span className="text-red-500">*</span></label>
                <input id="accessCode" name="accessCode" required />
                <p className="text-xs text-pine/60">This event is invite-only. Enter the code provided by Julie.</p>
              </div>
            )}
            <div className="flex items-start gap-3 text-xs text-pine/70">
              <input id="waiver" type="checkbox" name="waiver" required className="mt-1 h-4 w-4" />
              <label htmlFor="waiver">
                <span className="text-red-500">*</span> I understand this is an outdoor activity and I accept the waiver and safety guidelines. I agree that healing
                hikes are not medical advice.
              </label>
            </div>
            <div className="hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <button type="submit">Submit Registration</button>
            <p className="text-xs text-pine/60">
              By registering, you agree to our privacy policy. We only use your information to coordinate this event.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
