import type { Metadata } from "next";
import { Img as Image } from "@/components/ui/img";
import { Check } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { Icon } from "@/components/ui/icon";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { bulkChecklist, packagingFormats, procurementChallenges, supplyModels } from "@/content/company";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Chemical Sourcing & Supply",
  description:
    "Your procurement partner for industrial chemicals — a clear five-step sourcing process and bulk supply solutions for industrial buyers.",
  alternates: { canonical: "/sourcing-supply" },
};

export default function SourcingSupplyPage() {
  return (
    <>
      <PageHero
        image={images.tankFarm}
        crumbs={[{ label: "Sourcing & Supply", href: "/sourcing-supply" }]}
        eyebrow="Chemical Sourcing & Supply"
        title="Your Procurement Partner for Industrial Chemicals"
        lead="Finding the right chemical at the right specification, quantity and commercial terms can be challenging. DS Global Ventures works to simplify this process by connecting industrial buyers with suitable chemical supply sources."
      >
        <Button href="/contact?type=bulk">Request Bulk Quote</Button>
        <Button href="#process" variant="glass">
          Our Process
        </Button>
      </PageHero>

      {/* Challenges */}
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why It Matters"
            title="Procurement Challenges — Simplified"
            lead="Chemical buying involves more than finding a price. These are the gaps we help industrial buyers close."
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {procurementChallenges.map((c, i) => (
              <RevealItem key={c.title}>
                <GlowCard className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-(--shadow-card)">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{c.problem}</p>
                  <div className="mt-auto pt-6">
                    <div className="rounded-2xl bg-brand-500/[0.08] p-4">
                      <p className="font-mono text-[0.62rem] tracking-[0.16em] text-brand-700 uppercase">How we help</p>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed font-medium text-ink">{c.help}</p>
                    </div>
                  </div>
                </GlowCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="surface-blue section-y relative scroll-mt-20 overflow-hidden">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="container-x relative">
          <SectionHeading
            align="center"
            eyebrow="Our Sourcing Process"
            title="Five Clear Steps From Requirement to Supply"
          />
          <div className="mt-16 lg:mt-20">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* Bulk */}
      <section className="section-y bg-white">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Bulk & Industrial Requirements"
              title="Regular or Bulk Quantities — Planned Properly"
              lead="We understand that industrial customers may require regular or bulk quantities. For large-volume requirements, contact our team with:"
            />
            <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-2">
              {bulkChecklist.map((item) => (
                <RevealItem as="li" key={item} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 font-medium text-ink">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1}>
              <p className="mt-8 leading-relaxed">
                Our team will evaluate the requirement and provide a suitable sourcing solution.
              </p>
              <Button href="/contact?type=bulk" className="mt-8">
                Request Bulk Quote
              </Button>
            </Reveal>
          </div>
          <div className="relative">
            <Reveal>
              <ParallaxImage image={images.tankerShip} className="aspect-[4/5] rounded-[2rem]" sizes="(min-width: 1024px) 45vw, 100vw" />
            </Reveal>
            <Reveal delay={0.2} className="absolute -bottom-6 left-6 right-6 sm:left-auto sm:w-72">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-(--shadow-lift)">
                <p className="font-mono text-[0.65rem] tracking-[0.18em] text-brand-700 uppercase">Volume planning</p>
                <p className="mt-2 font-display font-semibold text-ink">One-time, monthly or contract supply schedules</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Supply models */}
      <section className="section-y bg-grid-light bg-mist">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Supply Models" title="Flexible Ways to Buy" />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {supplyModels.map((m) => (
              <RevealItem key={m.title}>
                <div className="group h-full rounded-3xl border border-line bg-white p-8 shadow-(--shadow-card) transition-transform duration-500 hover:-translate-y-1">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-brandwash text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={m.icon} className="size-6" />
                  </span>
                  <h3 className="mt-7 text-xl font-bold tracking-tight">{m.title}</h3>
                  <p className="mt-2 leading-relaxed">{m.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Packaging */}
      <section className="section-y bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative aspect-[16/11] overflow-hidden rounded-[2rem] lg:col-span-7">
            <Image
              src={images.terminal.src}
              alt={images.terminal.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div className="lg:col-span-5">
            <Eyebrow>Packaging &amp; Dispatch</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.875rem,3.2vw,2.75rem)] leading-tight font-bold tracking-tight">
              Packaging Matched to Product &amp; Plant
            </h2>
            <RevealGroup className="mt-8 grid grid-cols-2 gap-3">
              {packagingFormats.map((f) => (
                <RevealItem key={f.title} className="rounded-2xl border border-line p-5">
                  <Icon name={f.icon} className="size-7 text-brand-600" />
                  <p className="mt-4 font-display font-semibold text-ink">{f.title}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-6 text-sm text-muted">Packaging options depend on product, grade and supply source.</p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Bulk Enquiries"
        title="Planning a Bulk or Recurring Requirement?"
        text="Share the product, grade, monthly quantity, packaging and delivery schedule. Our team will evaluate and respond with a suitable sourcing solution."
        primaryLabel="Request Bulk Quote"
        primaryHref="/contact?type=bulk"
        image={images.warehouse}
      />
    </>
  );
}
