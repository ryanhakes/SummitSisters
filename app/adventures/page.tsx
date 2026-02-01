import Image from "next/image";
import Link from "next/link";

const gallery = [
  {
    src: "/images/adventures/adventure-01.jpg",
    alt: "Summit Sisters adventure photo 1",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    src: "/images/adventures/adventure-02.jpg",
    alt: "Summit Sisters adventure photo 2",
    className: ""
  },
  {
    src: "/images/adventures/adventure-03.jpg",
    alt: "Summit Sisters adventure photo 3",
    className: ""
  },
  {
    src: "/images/adventures/adventure-04.jpg",
    alt: "Summit Sisters adventure photo 4",
    className: "md:row-span-2"
  },
  {
    src: "/images/adventures/adventure-05.jpg",
    alt: "Summit Sisters adventure photo 5",
    className: ""
  },
  {
    src: "/images/adventures/adventure-06.jpg",
    alt: "Summit Sisters adventure photo 6",
    className: ""
  },
  {
    src: "/images/adventures/adventure-07.jpg",
    alt: "Summit Sisters adventure photo 7",
    className: ""
  },
  {
    src: "/images/adventures/adventure-08.jpg",
    alt: "Summit Sisters adventure photo 8",
    className: "md:col-span-2"
  },
  {
    src: "/images/adventures/adventure-09.jpg",
    alt: "Summit Sisters adventure photo 9",
    className: ""
  },
  {
    src: "/images/adventures/adventure-10.jpg",
    alt: "Summit Sisters adventure photo 10",
    className: ""
  },
  {
    src: "/images/adventures/adventure-11.jpg",
    alt: "Summit Sisters adventure photo 11",
    className: "md:row-span-2"
  },
  {
    src: "/images/adventures/adventure-12.jpg",
    alt: "Summit Sisters adventure photo 12",
    className: ""
  }
];

export default function AdventuresPage() {
  return (
    <div>
      <section className="section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="badge">Adventure Gallery</p>
            <h1 className="mt-4 text-4xl font-bold text-pine md:text-5xl">
              Summit Sisters on the trail
            </h1>
            <p className="mt-4 text-lg text-pine/80">
              A glimpse into the healing hikes, mountain laughs, and faith-filled moments happening all year long. Every photo
              represents a brave woman stepping into fresh air, deeper faith, and a sisterhood that shows up.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/events" className="rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-white">
                Join an Adventure
              </Link>
              <a
                href="https://instagram.com/go_summitsisters"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-pine/30 px-6 py-3 text-sm font-semibold text-pine"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/adventures/adventure-03.jpg"
                alt="Summit Sisters adventure highlight 1"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/adventures/adventure-06.jpg"
                  alt="Summit Sisters adventure highlight 2"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="/images/adventures/adventure-08.jpg"
                  alt="Summit Sisters adventure highlight 3"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sand/40">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-pine">Adventures in motion</h2>
            <p className="mt-3 max-w-2xl text-sm text-pine/70">
              From sunrise summits to trailhead prayers, here are the most recent moments from the Summit Sisters community.
            </p>
          </div>
          <p className="text-sm font-semibold text-moss">12 latest moments</p>
        </div>
        <div className="mt-8 grid auto-rows-[180px] gap-4 sm:auto-rows-[200px] md:auto-rows-[220px] lg:grid-cols-3">
          {gallery.map((photo) => (
            <div
              key={photo.src}
              className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-pine">Ready for your own adventure story?</h3>
            <p className="mt-3 text-sm text-pine/70">
              We host monthly hikes, outdoor workshops, and faith-forward gatherings throughout Michigan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/events" className="rounded-full bg-sunrise px-6 py-3 text-sm font-semibold text-white">
              See upcoming events
            </Link>
            <Link href="/contact" className="rounded-full border border-pine/30 px-6 py-3 text-sm font-semibold text-pine">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
