import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Marquee } from "@/components/ui/marquee";
import { mainNav, legalNav, productNav } from "@/content/navigation";
import { mailLink, site, telLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-mist text-body">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      {/* Oversized wordmark ticker */}
      <div className="relative border-b border-line py-8">
        <Marquee>
          {["Phenol", "Paraformaldehyde", "Formaldehyde", "Methanol", "Acetone", "Other Chemicals"].map((w) => (
            <span
              key={w}
              className="flex items-center gap-10 pr-10 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_rgb(16_41_74/0.16)]"
            >
              {w}
              <span className="size-3 rounded-full bg-brand-500/60" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-wide relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 font-display text-lg font-semibold text-ink">{site.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">{site.descriptor}</p>
        </div>

        <nav aria-label="Quick links" className="lg:col-span-2">
          <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-brand-700 uppercase">Quick Links</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products" className="lg:col-span-2">
          <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-brand-700 uppercase">Products</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {productNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-brand-700 uppercase">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={telLink()} className="flex items-start gap-3 transition-colors hover:text-brand-700">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mailLink()} className="flex items-start gap-3 break-all transition-colors hover:text-brand-700">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
              {site.contact.address}
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
              {site.contact.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-line bg-white/60">
        <div className="container-wide flex flex-col gap-4 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="container-wide pb-24 text-[0.7rem] text-muted md:pb-8">
          Product information on this website is indicative. Always refer to the supplier SDS and agreed specifications.
        </p>
      </div>
    </footer>
  );
}
