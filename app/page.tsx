import Image from "next/image";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/events";
import { siteCopy } from "@/content/siteCopy";

export default async function HomePage() {
  const events = await getUpcomingEvents(3);

  return (
    <div>
      <section className="section relative overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2000&auto=format&fit=crop"
          alt="Mountain landscape backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative rounded-3xl bg-pine/80 p-10 backdrop-blur-sm md:max-w-2xl">
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
        <div className="text-center">
          <h2 className="text-3xl font-bold text-pine">Follow Our Adventures</h2>
          <p className="mt-4 text-lg text-pine/80">
            Join our community on Instagram for daily inspiration, trail updates, and sisterhood moments.
          </p>
          <div className="mt-6">
            <a
              href="https://instagram.com/go_summitsisters"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white hover:from-purple-600 hover:to-pink-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @go_summitsisters
            </a>
          </div>
          <div className="mt-8">
            <iframe
              src="https://www.instagram.com/go_summitsisters/embed"
              width="400"
              height="480"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              className="mx-auto max-w-full"
            ></iframe>
          </div>
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
              <p className="text-sm italic text-pine/80">&ldquo;{testimonial.quote}&rdquo;</p>
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
