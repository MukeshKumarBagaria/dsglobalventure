import type { Metadata } from "next";
import { Img as Image } from "@/components/ui/img";
import { Check, Quote } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { Icon } from "@/components/ui/icon";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { mission, principles, services, vision } from "@/content/company";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "DS Global Ventures is a chemical trading and sourcing company making chemical procurement reliable, transparent and efficient for industrial customers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={images.storageTanks}
        crumbs={[{ label: "About Us", href: "/about" }]}
        eyebrow="About DS Global Ventures"
        title="Connecting Reliable Chemical Sources with Industrial Buyers"
        lead="A chemical trading and sourcing company engaged in the supply of industrial chemicals, chemical raw materials and intermediates."
      >
        <Button href="/contact">Request a Quote</Button>
        <Button href="/products" variant="glass">
          Our Products
        </Button>
      </PageHero>

      {/* Who we are */}
      <section className="section-y bg-white">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Who We Are" title="Making Chemical Procurement Reliable, Transparent & Efficient" />
            <Reveal delay={0.1} className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed">
              <p>
                DS Global Ventures is a chemical trading and sourcing company engaged in the supply of industrial
                chemicals, chemical raw materials and intermediates.
              </p>
              <p>
                Our objective is simple — to make chemical procurement more reliable, transparent and efficient for
                industrial customers.
              </p>
              <p>
                We work with customers to understand their technical specifications, quantity requirements, packaging
                preferences and delivery schedules, and then coordinate suitable sourcing solutions.
              </p>
            </Reveal>
            <RevealGroup as="ul" className="mt-10 flex flex-wrap gap-3">
              {["Reliable", "Transparent", "Efficient"].map((v) => (
                <RevealItem
                  as="li"
                  key={v}
                  className="flex items-center gap-2 rounded-full border border-line bg-mist px-5 py-2.5 font-display text-sm font-semibold text-ink"
                >
                  <span className="size-2 rounded-full bg-brand-500" aria-hidden />
                  {v}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div className="relative lg:col-span-6">
            <Reveal>
              <ParallaxImage
                image={images.tankFarm}
                className="aspect-[5/6] rounded-[2rem] sm:aspect-[4/3] lg:aspect-[5/6]"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </Reveal>
            <Reveal delay={0.25} className="absolute -bottom-8 -left-4 max-w-[260px] sm:-left-8">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-(--shadow-lift)">
                <p className="font-mono text-[0.65rem] tracking-[0.18em] text-brand-700 uppercase">Primary focus</p>
                <p className="mt-2 font-display leading-snug font-semibold text-ink">
                  Industrial chemicals, chemical raw materials &amp; intermediates
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-y bg-grid-light bg-mist">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Vision & Mission" title="Where We Are Headed — and How We Get There" />
          <div className="mt-14 grid gap-5 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <div className="surface-blue relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-brand-500/15 p-8 sm:p-10">
                <div className="bg-grid-light absolute inset-0 opacity-70" aria-hidden />
                <Quote className="relative size-10 text-brand-600" strokeWidth={1.25} aria-hidden />
                <Eyebrow className="relative mt-8">
                  Our Vision
                </Eyebrow>
                <p className="relative mt-5 font-display text-2xl leading-snug font-semibold text-ink">{vision}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="h-full rounded-[2rem] border border-line bg-white p-8 shadow-(--shadow-card) sm:p-10">
                <Eyebrow>Our Mission</Eyebrow>
                <p className="mt-5 font-display text-xl font-semibold text-ink">Our mission is to:</p>
                <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                  {mission.map((m, i) => (
                    <li key={m} className="flex gap-4 rounded-2xl border border-line p-4">
                      <span className="font-mono text-sm font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[0.95rem] leading-relaxed text-ink/85">{m}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="What We Do"
                title="Five Ways We Support Your Procurement"
                lead="From a single specification sheet to recurring bulk supply, our services cover the full chemical procurement journey."
              />
            </div>
          </div>
          <RevealGroup as="ol" className="divide-y divide-line border-y border-line lg:col-span-8">
            {services.map((s, i) => (
              <RevealItem as="li" key={s.title} className="group grid gap-4 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                <span className="font-mono text-sm text-muted transition-colors group-hover:text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-brand-600">{s.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed">{s.text}</p>
                </div>
                <span className="hidden size-14 items-center justify-center rounded-2xl bg-mist text-brand-600 transition-all duration-500 group-hover:bg-brand-600 group-hover:text-white sm:flex">
                  <Icon name={s.icon} className="size-6" />
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Principles */}
      <section className="surface-soft section-y relative overflow-hidden">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="container-x relative">
          <SectionHeading eyebrow="How We Work" title="Principles Behind Every Supply" />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <RevealItem key={p.title}>
                <GlowCard className="h-full rounded-3xl border border-line bg-white p-7 shadow-(--shadow-card)">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brandwash text-brand-700">
                    <Icon name={p.icon} className="size-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed">{p.text}</p>
                </GlowCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Commitment */}
      <section className="section-y bg-white">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src={images.handshake.src}
              alt={images.handshake.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-brand-700/15 to-transparent" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our Commitment" title="More Than Price — Dependable Execution" />
            <Reveal delay={0.1} className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed">
              <p>At DS Global Ventures, we believe that successful chemical trading is not only about price.</p>
              <p className="font-display text-xl leading-snug font-semibold text-ink">
                It is about reliability, communication, product specifications, documentation and timely execution.
              </p>
              <p>
                We aim to create long-term value for our customers and suppliers through professional business practices
                and dependable service.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Reliability", "Communication", "Product specifications", "Documentation", "Timely execution", "Long-term value"].map(
                  (v) => (
                    <li key={v} className="flex items-center gap-3 text-sm font-medium text-ink">
                      <span className="flex size-6 items-center justify-center rounded-full bg-brandwash text-brand-700">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      {v}
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-10 border-t border-line pt-6 font-mono text-xs tracking-[0.16em] text-muted uppercase">
                DS Global Ventures — Reliable Chemical Sourcing. Trusted Global Trade.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Work With Us" title="Work With DS Global Ventures" />
    </>
  );
}
