import Link from "next/link";
import { Anchor, ArrowUpRight, Ship, Warehouse, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { bgPhotoVars } from "@/lib/bg-photo";
import type { ImageKey } from "@/lib/images";

/** Capability pillars — wording stays within what docs/01-WEBSITE-CONTENT.md already states (no unbacked claims). */
const pillars: { icon: LucideIcon; title: string; text: string; image: ImageKey; href: string }[] = [
  {
    icon: Ship,
    title: "Global Sourcing Network",
    text: "Industrial chemicals sourced from international and domestic supply options, matched to your specification.",
    image: "tankerShip",
    href: "/sourcing-supply",
  },
  {
    icon: Anchor,
    title: "Port-to-Plant Coordination",
    text: "Shipping documents, dispatch and delivery coordinated to agreed terms — from the port to your plant.",
    image: "port",
    href: "/sourcing-supply",
  },
  {
    icon: Warehouse,
    title: "Bulk & Packaged Supply",
    text: "Drums, bags, IBCs and bulk options for one-time, monthly or contract volumes, subject to product.",
    image: "warehouse",
    href: "/products",
  },
];

/* Card photos are CSS backgrounds applied once the card is revealed (see `.trust-photo` in globals.css): a lazy
   <img> this close to the fold is still fetched during load and pushed the measured mobile LCP back ~0.4s. */
export function TrustSection() {
  return (
    <section aria-labelledby="trust-title" className="bg-white pt-20 md:pt-28">
      <div className="container-x">
        <Reveal className="flex items-center gap-5 md:gap-8">
          <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
          <h2
            id="trust-title"
            className="max-w-[18ch] text-center text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-bold tracking-[-0.02em] sm:max-w-none"
          >
            Why Industry Trusts <span className="text-brand-600">DS Global Ventures</span>
          </h2>
          <span aria-hidden className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text, image, href }) => (
            <RevealItem key={title}>
              <Link
                href={href}
                className="group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-[#103f93] p-6 text-white shadow-(--shadow-card) sm:aspect-[2/1] sm:min-h-0 md:p-7 lg:aspect-[4/3.7] xl:aspect-[6/5]"
              >
                <span
                  aria-hidden
                  className="trust-photo absolute inset-0 -z-20 transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-105"
                  style={bgPhotoVars(image, 640, 1080)}
                />
                {/* hero-blue wash: light at the top, solid behind the copy */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_58_140/0.12)_0%,rgb(11_58_140/0.35)_38%,rgb(11_58_140/0.88)_72%,#0b3a8c_100%)] transition-opacity duration-500 group-hover:opacity-90"
                />
                <span
                  aria-hidden
                  className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/35 transition-[background-color,transform] duration-500 ease-(--ease-out-expo) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-brand-700"
                >
                  <ArrowUpRight className="size-5" />
                </span>

                <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                  <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-white md:text-[1.35rem]">{title}</h3>
                {/* three lines reserved so titles line up across the row */}
                <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-white/85 lg:min-h-[3lh]">{text}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
