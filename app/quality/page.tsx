import type { Metadata } from "next";
import { BookOpenCheck, FileText, HardHat, ShieldCheck, Truck, Warehouse } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { documents, specificationParams } from "@/content/company";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Quality & Documentation | COA, SDS & Specifications",
  description:
    "COA, SDS/MSDS, product specifications and batch information coordinated as applicable — plus guidance on responsible chemical handling.",
  alternates: { canonical: "/quality" },
};

const handling = [
  { icon: BookOpenCheck, title: "Read the SDS", text: "Review hazards, first aid and handling sections before use." },
  { icon: HardHat, title: "Use appropriate PPE", text: "Gloves, eye and respiratory protection as specified." },
  { icon: Warehouse, title: "Store as specified", text: "Ventilated, compatible storage away from ignition sources." },
  { icon: Truck, title: "Transport per regulations", text: "Follow applicable dangerous-goods and local regulations." },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        image={images.vessel}
        crumbs={[{ label: "Quality", href: "/quality" }]}
        eyebrow="Quality & Documentation"
        title="Product Information You Can Rely On"
        lead="Chemical procurement requires accurate product information and appropriate documentation. DS Global Ventures works with customers and suppliers to coordinate relevant product documentation as applicable to the product and transaction."
      >
        <Button href="/contact?doc=COA%20%2F%20SDS">Request COA / SDS</Button>
      </PageHero>

      {/* Documentation */}
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Documentation"
            title="Documents Coordinated With Your Supply"
            lead="Depending on the product and supply, relevant documentation may include:"
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((d, i) => (
              <RevealItem key={d.title}>
                <GlowCard className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-(--shadow-card)">
                  <div aria-hidden className="absolute top-0 right-0 size-24 translate-x-8 -translate-y-8 rotate-45 bg-mist" />
                  <div className="relative flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-brandwash text-brand-700 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                      <FileText className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted">DOC · {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="relative mt-7 text-lg font-bold tracking-tight">{d.title}</h3>
                  <p className="relative mt-2 text-[0.95rem] leading-relaxed">{d.text}</p>
                  <div aria-hidden className="relative mt-6 space-y-1.5">
                    <span className="block h-1 w-full rounded-full bg-line" />
                    <span className="block h-1 w-2/3 rounded-full bg-line" />
                  </div>
                </GlowCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-y bg-dots-light border-y border-line bg-mist">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Product Specifications"
              title="Tell Us Exactly What Your Process Needs"
              lead="Before finalizing a supply, customers can communicate their required:"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 leading-relaxed">
                This allows us to identify a supply option appropriate to the stated requirement.
              </p>
            </Reveal>
          </div>
          <RevealGroup className="flex flex-wrap gap-3" stagger={0.06}>
            {specificationParams.map((s, i) => (
              <RevealItem
                key={s}
                className="flex items-center gap-3 rounded-full border border-line bg-white py-3 pr-6 pl-3 shadow-(--shadow-card)"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-500/10 font-mono text-xs font-semibold text-brand-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-semibold text-ink">{s}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Responsible handling */}
      <section className="section-y bg-white">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/30 bg-[linear-gradient(135deg,#fffaf0_0%,#fff6e6_50%,#f4f8fe_100%)] p-8 sm:p-12 lg:p-16">
              <div className="bg-grid-light absolute inset-0 opacity-60" aria-hidden />
              <div aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(252_211_77/0.35),transparent)]" />
              <div className="relative grid gap-12 lg:grid-cols-2">
                <div>
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-amber-400 text-white">
                    <ShieldCheck className="size-7" aria-hidden />
                  </span>
                  <Eyebrow className="mt-8">
                    Responsible Chemical Handling
                  </Eyebrow>
                  <h2 className="mt-5 text-[clamp(1.875rem,3.2vw,2.75rem)] leading-tight font-bold tracking-tight">
                    Safety Is Part of Every Supply
                  </h2>
                  <p className="mt-6 leading-relaxed">
                    Chemical products should be handled, stored and transported in accordance with applicable safety
                    requirements, product documentation and applicable laws and regulations.
                  </p>
                  <p className="mt-4 leading-relaxed font-medium text-ink">
                    Customers should review the relevant SDS and technical documentation before handling or using any
                    chemical product.
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {handling.map((h) => (
                    <li key={h.title} className="rounded-2xl border border-white bg-white/85 p-6 shadow-(--shadow-card)">
                      <h.icon className="size-7 text-amber-500" strokeWidth={1.5} aria-hidden />
                      <h3 className="mt-5 font-bold">{h.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed">{h.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Documentation"
        title="Need Documentation for a Product?"
        text="Request the COA, SDS/MSDS or specification sheet for any product you are evaluating."
        primaryLabel="Request COA / SDS"
        primaryHref="/contact?doc=COA%20%2F%20SDS"
        image={images.processPlant}
      />
    </>
  );
}
