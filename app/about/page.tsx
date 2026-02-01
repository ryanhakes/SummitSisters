export default function AboutPage() {
  return (
    <section className="section">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="badge">Our Story</p>
          <h1 className="mt-4 text-3xl font-bold text-pine">Founded by Julie Hakes in 2022</h1>
          <p className="mt-4 text-sm text-pine/70">
            Julie launched Summit Sisters after seeing how outdoor adventure and faith-centered community can unlock healing.
            The ministry now serves women across Michigan who want to grow in courage, confidence, and purpose.
          </p>
          <p className="mt-4 text-sm text-pine/70">
            Our signature healing hikes create safe space for at-risk women to breathe fresh air, connect with God, and walk with
            a trusted sisterhood.
          </p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold text-pine">What we believe</h2>
          <ul className="mt-4 space-y-3 text-sm text-pine/70">
            <li>• Every woman is created on purpose and for a purpose.</li>
            <li>• Healing happens in community, nature, and faith.</li>
            <li>• Outdoor skills build confidence for everyday life.</li>
            <li>• Compassion and safety are non-negotiable.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
