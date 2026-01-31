import Link from "next/link";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/events";

export default async function HomePage() {
  const events = await getUpcomingEvents(3);

  return (
    <div>
      <section className="section bg-[url('https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center text-white">
        <div className="rounded-3xl bg-pine/80 p-10 backdrop-blur-sm md:max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">Summit Sisters</p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Epic adventures + faith-forward sisterhood for women ready to rise.
          </h1>
          <p className="mt-4 text-lg text-white/90">
            We create healing hikes, outdoor skills, and a rah-rah community so women summit their God-given purpose.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/events" className="rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-white">
              View Upcoming Hikes
            </Link>
            <Link href="/about" className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white">
              Meet Julie Hakes
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-pine">Our Mission</h2>
            <p className="mt-4 text-lg text-pine/80">
              Summit Sisters exists to help women step into bold faith, build outdoor confidence, and find a trusted sisterhood.
              We&apos;re passionate about healing hikes for at-risk women and creating safe, joyful adventure spaces.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-pine/70">
              <li>• Faith-centered adventure experiences</li>
              <li>• Skill-building hikes and workshops</li>
              <li>• Compassionate support for women healing from trauma</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold text-pine">What to Expect</h3>
            <p className="mt-3 text-sm text-pine/70">
              Warm welcomes, trail prayers, practical safety planning, and plenty of time to connect. We keep group sizes small
              and focus on confidence, not performance.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-pine/70">
              <div className="flex items-start gap-3">
                <span className="badge">Safety</span>
                <p>Guided by experienced leaders with clear emergency plans.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="badge">Faith</span>
                <p>Scripture reflection and prayer integrated into every adventure.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="badge">Community</span>
                <p>Intentional sisterhood moments before, during, and after the hike.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sand/40">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-pine">Upcoming Adventures</h2>
          <Link href="/events" className="text-sm font-semibold text-sunrise">View all →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={{ ...event, dateStart: event.dateStart.toISOString(), dateEnd: event.dateEnd?.toISOString() ?? null }} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              quote: "Summit Sisters helped me feel brave again. The team made me feel safe and seen.",
              name: "Alyssa, Portland"
            },
            {
              quote: "The hiking devotionals are powerful. I left with new friends and hope.",
              name: "Marissa, Salem"
            },
            {
              quote: "Julie leads with so much compassion. I&apos;ve grown spiritually and physically.",
              name: "Nicole, Bend"
            }
          ].map((testimonial) => (
            <div key={testimonial.name} className="card">
              <p className="text-sm italic text-pine/80">"{testimonial.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-moss">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-pine text-white">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Support the Mission</h2>
            <p className="mt-4 text-white/80">
              Donations keep healing hikes low-cost or free for women who need them most. Your gift equips transportation,
              gear, and trail scholarships.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-pine">Donate (Coming Soon)</button>
            <Link href="/contact" className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white">
              Partner with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
