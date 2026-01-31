import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-mist/95 backdrop-blur border-b border-sand">
      <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <Link href="/" className="text-xl font-bold text-pine">
          Summit Sisters
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-pine">
              {item.label}
            </Link>
          ))}
          <Link href="/events" className="rounded-full bg-sunrise px-4 py-2 text-sm font-semibold text-white">
            Join the Adventure
          </Link>
        </nav>
        <Link href="/events" className="md:hidden rounded-full bg-sunrise px-4 py-2 text-sm font-semibold text-white">
          Join
        </Link>
      </div>
    </header>
  );
}
