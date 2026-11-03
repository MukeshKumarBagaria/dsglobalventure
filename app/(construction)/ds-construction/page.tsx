import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, BadgeCheck, HardHat, Layers, Mail, Phone, ShieldCheck } from "lucide-react";
import { ConstructionHeader } from "@/components/construction/construction-header";
import { SectorIcon } from "@/components/construction/sector-icon";
import { Img } from "@/components/ui/img";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SplitWords } from "@/components/ui/split-words";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  approach,
  construction,
  constructionNav,
  enquiryChecklist,
  expertise,
  highlights,
  sectors,
  standards,
  type HighlightIcon,
} from "@/content/construction";
import { legalNav } from "@/content/main-nav";
import { images } from "@/lib/images";
import { absoluteUrl, mailLink, site, telLink, whatsappLink } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

const title = "DS Construction | Premium & Government Construction";

export const metadata: Metadata = {
  title: { absolute: title },
  description: construction.description,
  alternates: { canonical: "/ds-construction" },
  openGraph: { title, description: construction.description, url: absoluteUrl("/ds-construction"), siteName: construction.name },
  twitter: { title, description: construction.description },
};

const d = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;
const roman = ["I", "II", "III", "IV", "V"];
const whatsapp = whatsappLink("Hello DS Construction, I would like to discuss a construction project.");
const highlightIcons: Record<HighlightIcon, typeof Award> = { award: Award, layers: Layers, shield: ShieldCheck, hardhat: HardHat };

export default function ConstructionPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": absoluteUrl("/ds-construction#organization"),
    name: construction.name,
    description: construction.description,
    url: absoluteUrl("/ds-construction"),
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    areaServed: "IN",
    parentOrganization: { "@id": absoluteUrl("/#organization") },
    knowsAbout: expertise.map((e) => e.title),
  };

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 bg-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#0b1f3b] transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ConstructionHeader />

      <main id="main">
        {/* ------------------------------------------------------------ Hero */}
        <section data-hero="" className="dsc-hero dsc-dark">
          <div className="dsc-hero-main">
            <div className="dsc-hero-photo">
              <div className="anim-zoom absolute inset-0">
                {/* mirrored so the cranes stand clear of the headline; the navy wash over it is in construction.css */}
                <Img
                  src={images.construction.src}
                  alt={images.construction.alt}
                  fill
                  preload
                  quality={80}
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className="-scale-x-100 object-cover object-left"
                />
              </div>
            </div>

            <div className="container-wide relative w-full">
              <div className="max-w-[40rem]">
                <p className="dsc-eyebrow anim-rise" style={d(0.05)}>
                  {construction.descriptor}
                </p>
                <h1 className="mt-7">
                  <span className="sr-only">Built with precision. Delivered with integrity.</span>
                  {["Built with", "Precision."].map((line, i) => (
                    <span key={line} aria-hidden className="block overflow-hidden pb-[0.06em]">
                      <span className="anim-mask" style={d(0.12 + i * 0.09)}>
                        {line}
                      </span>
                    </span>
                  ))}
                  <span aria-hidden className="mt-1 block overflow-hidden pb-[0.14em] text-[0.66em]">
                    <span className="anim-mask dsc-gold-text italic" style={d(0.32)}>
                      Delivered with Integrity.
                    </span>
                  </span>
                </h1>
                <p className="dsc-lead anim-rise mt-6 max-w-xl text-white/85" style={d(0.42)}>
                  {construction.description}
                </p>
                <div className="anim-rise mt-9 flex flex-wrap gap-4" style={d(0.52)}>
                  <a href="#contact" className="dsc-btn dsc-btn-solid">
                    Start a Project
                    <ArrowRight aria-hidden />
                  </a>
                  <a href="#expertise" className="dsc-btn dsc-btn-line">
                    Our Expertise
                  </a>
                </div>
                <ul className="dsc-pillars anim-rise mt-12" style={d(0.62)}>
                  {sectors.map((s) => (
                    <li key={s.id}>
                      <a href={`#sector-${s.id}`}>
                        <SectorIcon kind={s.icon} className="size-10 shrink-0" strokeWidth={2.2} />
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="dsc-stats anim-rise" style={d(0.72)}>
            <ul className="container-wide">
              {highlights.map((h) => {
                const Icon = highlightIcons[h.icon];
                return (
                  <li key={h.label} className="dsc-stat">
                    <Icon aria-hidden strokeWidth={1.4} />
                    <span className="min-w-0">
                      <strong className={/^\d/.test(h.value) ? "dsc-stat-figure" : undefined}>{h.value}</strong>
                      <span>{h.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ Statement */}
        <section className="dsc-statement dsc-section">
          <div className="container-x">
            <Reveal className="mx-auto max-w-5xl text-center">
              <p>
                Every structure begins as a promise on paper — scope, drawings, specification and schedule, agreed in
                writing. <em>Then we build exactly to it.</em>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------ Sectors */}
        <section id="sectors" className="dsc-dark dsc-section scroll-mt-16">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="dsc-eyebrow">Who We Build For</p>
                </Reveal>
                <h2 className="dsc-h2 mt-6">
                  <SplitWords text="Three Kinds of Client. One Standard of Work." />
                </h2>
              </div>
              <Reveal className="lg:col-span-5" delay={0.1}>
                <p className="dsc-lead">
                  Government departments, private owners and institutions ask different things of a contractor. The
                  discipline we bring to each of them is the same.
                </p>
              </Reveal>
            </div>

            <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
              {sectors.map((s) => (
                <RevealItem key={s.id}>
                  <article id={`sector-${s.id}`} className="dsc-sector glow-card scroll-mt-28">
                    <div className="flex items-start justify-between">
                      <SectorIcon kind={s.icon} className="size-14 text-[var(--dsc-gold)]" />
                      <span aria-hidden className="dsc-numeral">
                        {s.numeral}
                      </span>
                    </div>
                    <h3 className="mt-10">{s.title}</h3>
                    <p className="mt-4 leading-relaxed">{s.text}</p>
                    <ul className="mt-auto pt-8">
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ------------------------------------------------------------ Expertise */}
        <section id="expertise" className="dsc-section scroll-mt-16">
          <div className="container-wide grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <p className="dsc-eyebrow">Expertise</p>
                </Reveal>
                <h2 className="dsc-h2 mt-6">
                  <SplitWords text="Every Discipline, One Accountable Team." />
                </h2>
                <Reveal delay={0.1}>
                  <p className="dsc-lead mt-6">
                    From the first excavation to the last coat of finish, the work is planned, supervised and answered
                    for by a single team.
                  </p>
                  <a href="#contact" className="dsc-btn dsc-btn-line mt-9">
                    Discuss Your Scope
                    <ArrowRight aria-hidden />
                  </a>
                </Reveal>
              </div>
            </div>
            <RevealGroup className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
              {expertise.map((e, i) => (
                <RevealItem key={e.title} className="dsc-skill">
                  <span className="dsc-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3">{e.title}</h3>
                  <p className="mt-3 leading-relaxed">{e.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ------------------------------------------------------------ Approach */}
        <section id="approach" className="dsc-approach dsc-section scroll-mt-16">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <p className="dsc-eyebrow">How We Deliver</p>
              </Reveal>
              <h2 className="dsc-h2 mt-6">
                <SplitWords text="A Considered Process, From Brief to Handover." />
              </h2>
            </div>
            <ol className="dsc-steps mt-16 lg:mt-20">
              <li aria-hidden className="dsc-steps-line" />
              {approach.map((s, i) => (
                <li key={s.title} className="dsc-step">
                  <Reveal>
                    <span className="dsc-step-mark">{roman[i]}</span>
                    <h3 className="mt-6">{s.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed">{s.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ Standards */}
        <section id="standards" className="dsc-section scroll-mt-16">
          <div className="container-wide grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="dsc-eyebrow">Government & Public Works</p>
              </Reveal>
              <h2 className="dsc-h2 mt-6">
                <SplitWords text="Built to Public-Sector Standards." />
              </h2>
              <Reveal delay={0.1}>
                <p className="dsc-lead mt-6">
                  Public works are judged on paper as much as on site. We keep both in order — so inspections,
                  measurements and audits find exactly what the contract asked for.
                </p>
              </Reveal>
            </div>
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {standards.map((s) => (
                <RevealItem key={s.title} className="dsc-standard">
                  <span aria-hidden className="dsc-standard-icon">
                    <BadgeCheck className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5">{s.title}</h3>
                  <p className="mt-3 leading-relaxed">{s.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ------------------------------------------------------------ Photo band */}
        <section className="dsc-band relative isolate flex min-h-[72vh] items-center overflow-hidden py-28">
          {/* the same dusk site as the hero, cropped to the lit glass blocks rather than the cranes */}
          <ParallaxImage
            image={images.construction}
            className="absolute inset-0 -z-20 bg-[#0b1f3b]"
            imgClassName="object-right"
            strength={14}
            sizes="100vw"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(11_31_59/0.94),rgb(11_31_59/0.7)_55%,rgb(11_31_59/0.4))]" />
          <div className="container-wide">
            <Reveal>
              <blockquote className="max-w-4xl">
                <p>
                  Precision is not a finish applied at the end. <em className="dsc-gold-text">It is how every project begins.</em>
                </p>
                <footer className="dsc-label mt-8">— The DS Construction way</footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------------ Contact */}
        <section id="contact" className="dsc-dark dsc-section scroll-mt-16">
          <div className="container-wide grid gap-14 lg:grid-cols-12">
            {/* min-w-0: let the truncated contact values shrink instead of widening the grid track on phones */}
            <div className="min-w-0 lg:col-span-7">
              <Reveal>
                <p className="dsc-eyebrow">Start a Project</p>
              </Reveal>
              <h2 className="dsc-h2 mt-6">
                <SplitWords text="Let’s Build Something That Lasts." />
              </h2>
              <Reveal delay={0.1}>
                <p className="dsc-lead mt-6 max-w-xl">
                  Tell us about the site, the scope and the timeline. We’ll come back with how we would approach it.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-12 border-b border-white/12">
                {[
                  { href: telLink(), icon: <Phone className="size-5" />, label: "Call", value: site.contact.phoneDisplay },
                  { href: whatsapp, icon: <WhatsAppIcon className="size-5" />, label: "WhatsApp", value: site.contact.whatsappDisplay, external: true },
                  {
                    href: mailLink("Construction enquiry — DS Construction"),
                    icon: <Mail className="size-5" />,
                    label: "Email",
                    value: site.contact.email,
                  },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="dsc-contact-link"
                  >
                    <span aria-hidden className="dsc-contact-icon">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="dsc-label block">{c.label}</span>
                      <span className="dsc-contact-value mt-1 block truncate">{c.value}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="ml-auto size-5 shrink-0 text-[var(--dsc-gold)]" />
                  </a>
                ))}
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-5">
              <div className="dsc-brief">
                <h3 className="dsc-serif text-[1.9rem] leading-tight text-white!">For a faster response, share:</h3>
                <ul className="mt-6">
                  {enquiryChecklist.map((item) => (
                    <li key={item} className="flex gap-4 border-t border-white/10 py-4">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-[var(--dsc-gold)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="dsc-btn dsc-btn-solid">
                    Send on WhatsApp
                    <ArrowRight aria-hidden />
                  </a>
                  <a href={telLink()} className="dsc-btn dsc-btn-line">
                    Call Us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------ Footer */}
      <footer className="dsc-footer">
        <div className="container-wide grid gap-10 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span aria-hidden className="dsc-mark">
                DS
              </span>
              <span className="dsc-serif text-[1.6rem] text-white!">DS Construction</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed">{construction.tagline}</p>
            <p className="mt-4 text-sm">
              A business of{" "}
              <Link href="/" className="text-[var(--dsc-gold)] underline decoration-[rgb(212_175_55/0.4)] underline-offset-4 hover:decoration-[var(--dsc-gold)]">
                DS Global Ventures
              </Link>
              .
            </p>
          </div>
          <nav aria-label="DS Construction footer" className="md:col-span-3">
            <ul className="space-y-3 text-sm">
              {constructionNav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-[var(--dsc-gold)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 text-sm md:col-span-4">
            <a href={telLink()} className="block transition-colors hover:text-[var(--dsc-gold)]">
              {site.contact.phoneDisplay}
            </a>
            <a href={mailLink("Construction enquiry — DS Construction")} className="block transition-colors hover:text-[var(--dsc-gold)]">
              {site.contact.email}
            </a>
            <p>{site.contact.hoursShort}</p>
          </div>
        </div>
        <div className="container-wide flex flex-col gap-3 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {construction.name}. {construction.parent}.
          </p>
          <ul className="flex flex-wrap gap-5">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-[var(--dsc-gold)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </>
  );
}
