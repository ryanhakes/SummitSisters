export default function ContactPage() {
  return (
    <div>
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="badge">Let&apos;s Connect</p>
            <h1 className="mt-4 text-4xl font-bold text-pine md:text-5xl">Contact Summit Sisters</h1>
            <p className="mt-4 text-lg text-pine/80">
              Share your story, ask about upcoming hikes, or explore partnerships. We respond with care and keep every message
              confidential.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="card">
                <div className="flex items-start gap-3">
                  <span className="badge">Email</span>
                  <div>
                    <p className="text-sm font-semibold text-pine">hello@summitsisters.org</p>
                    <p className="mt-2 text-xs text-pine/60">Best for scheduling, sponsorships, or general questions.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="flex items-start gap-3">
                  <span className="badge">Instagram</span>
                  <div>
                    <p className="text-sm font-semibold text-pine">@go_summitsisters</p>
                    <p className="mt-2 text-xs text-pine/60">Follow the latest adventures and send a quick DM.</p>
                  </div>
                </div>
              </div>
              <div className="card sm:col-span-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="badge">Response Time</span>
                  <p className="text-sm text-pine/70">We aim to reply within 48 hours, Monday–Friday.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-pine">Send a message</h2>
            <p className="mt-2 text-sm text-pine/70">
              Tell us how we can help and we&apos;ll get back to you soon.
            </p>
            <form className="mt-6 grid gap-4" action="/api/contact" method="post">
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required placeholder="Your full name" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required placeholder="you@email.com" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required placeholder="Share what you need support with..." />
              </div>
              <div className="hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <button type="submit">Send message</button>
              <p className="text-xs text-pine/50">
                Your information is only used to respond to your request. We never sell or share it.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="section bg-sand/40">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Healing Hikes",
              description: "Questions about upcoming hikes, safety plans, or group size?"
            },
            {
              title: "Volunteer & Serve",
              description: "We love trail guides, prayer partners, and support crew."
            },
            {
              title: "Partner With Us",
              description: "Let&apos;s collaborate on sponsorships, retreats, or community outreach."
            }
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="text-lg font-semibold text-pine">{item.title}</h3>
              <p className="mt-3 text-sm text-pine/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
