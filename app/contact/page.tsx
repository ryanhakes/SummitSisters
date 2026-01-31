export default function ContactPage() {
  return (
    <section className="section">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-pine">Contact Summit Sisters</h1>
          <p className="mt-4 text-sm text-pine/70">
            We would love to hear from you. Share your story, ask about upcoming hikes, or learn about partnerships.
          </p>
          <div className="mt-6 card">
            <p className="text-sm text-pine/70">Email: hello@summitsisters.org</p>
            <p className="text-sm text-pine/70">Instagram: @go_summitsisters</p>
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold text-pine">Send a message</h2>
          <form className="mt-4 grid gap-4" action="/api/contact" method="post">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} required />
            </div>
            <div className="hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <button type="submit">Send message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
