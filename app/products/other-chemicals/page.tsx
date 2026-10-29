import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Molecule } from "@/components/molecules/molecule";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Other Industrial Chemicals — Send Your Requirement",
  description:
    "Looking for an industrial chemical that is not listed? Share the product name, specification and quantity with DS Global Ventures.",
  alternates: { canonical: "/products/other-chemicals" },
};

const include = [
  "Product name / CAS No.",
  "Grade & specification",
  "Quantity (one-time or monthly)",
  "Packaging preference",
  "Delivery location",
  "Target timeline",
];

const steps = [
  { title: "Share your requirement", text: "Product, specification, quantity and destination." },
  { title: "We evaluate sourcing feasibility", text: "Suitable supply options are identified for your requirement." },
  { title: "We respond with a suitable option", text: "Commercial and supply details shared for your review." },
];

export default function OtherChemicalsPage() {
  return (
    <>
      <PageHero
        image={images.complex}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: "Other Chemicals", href: "/products/other-chemicals" },
        ]}
        eyebrow="Other Chemicals"
        title="Looking for a Specific Industrial Chemical?"
        lead="Our product portfolio can be expanded according to market requirements. Tell us what you need — product name, required specification and quantity."
        aside={
          <div className="rounded-[2rem] border border-white bg-white/80 p-8 shadow-[0_40px_90px_-35px_rgb(16_41_74/0.45)]">
            <div className="mx-auto max-w-[260px]">
              <Molecule name="other" tone="light" />
            </div>
            <p className="mt-6 text-center font-mono text-xs tracking-[0.16em] text-muted uppercase">Sourced on request</p>
          </div>
        }
      >
        <Button href="#requirement">Send Your Requirement</Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] border border-line bg-mist p-8 sm:p-10">
            <Eyebrow>What to include</Eyebrow>
            <h2 className="mt-5 text-2xl font-bold tracking-tight">Help us source the right product, faster</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {include.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] font-medium text-ink">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="surface-blue relative overflow-hidden rounded-[2rem] border border-brand-500/15 p-8 sm:p-10">
            <div className="bg-grid-light absolute inset-0 opacity-70" aria-hidden />
            <Eyebrow className="relative">
              How it works
            </Eyebrow>
            <ol className="relative mt-8 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-500/30 bg-white font-mono text-sm text-brand-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="mt-1">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section id="requirement" className="section-y bg-grid-light scroll-mt-20 bg-mist">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Send Your Requirement" title="Tell Us What You Need" />
            <RevealGroup className="mt-8">
              <RevealItem className="flex gap-3 rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed">
                <Info className="size-5 shrink-0 text-brand-600" aria-hidden />
                Sourcing is subject to feasibility, specification and applicable regulations.
              </RevealItem>
            </RevealGroup>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-(--shadow-card) sm:p-10">
              <EnquiryForm defaultProduct="other" submitLabel="Send Your Requirement" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
