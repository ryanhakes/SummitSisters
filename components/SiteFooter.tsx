import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-sand bg-white">
      <div className="grid gap-8 px-6 py-12 md:grid-cols-3 md:px-12 lg:px-24">
        <div>
          <p className="text-lg font-bold text-pine">Summit Sisters</p>
          <p className="mt-2 text-sm text-pine/70">
            Oregon-based women&apos;s outdoor ministry helping women summit their God-given purpose.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-pine">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/events">Upcoming Adventures</Link></li>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-pine">Safety & Policies</p>
          <ul className="mt-3 space-y-2 text-sm text-pine/70">
            <li>Healing hikes are not medical advice.</li>
            <li>We respect your privacy and never sell data.</li>
            <li>Always review the waiver before registering.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand px-6 py-4 text-xs text-pine/60 md:px-12 lg:px-24">
        © {new Date().getFullYear()} Summit Sisters. Founded 2022 by Julie Hakes.
      </div>
    </footer>
  );
}
