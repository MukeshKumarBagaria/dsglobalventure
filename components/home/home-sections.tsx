import { Img as Image } from "@/components/ui/img";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { IndustryTile } from "@/components/sections/industry-tile";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { OtherChemicalsCard, ProductCard } from "@/components/sections/product-card";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { GlowCard } from "@/components/ui/glow-card";
import { Icon } from "@/components/ui/icon";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { capabilities, keyFacts, services } from "@/content/company";
import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { images } from "@/lib/images";

/* ---------------------------------------------------------------- Capabilities */
export function CapabilityStrip() {
  return (
    <section id="capabilities" className="relative z-10 bg-white pt-16 md:pt-24">
      <div className="container-x">
        <RevealGroup className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-(--shadow-lift) sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <RevealItem
              key={c.title}
              className={`group relative p-7 lg:p-8 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""} border-line`}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brandwash text-brand-700 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                <Icon name={c.icon} className="size-6" />
              </span>
              <h2 className="mt-6 text-lg font-bold tracking-tight">{c.title}</h2>
              <p className="mt-2 text-[0.92rem] leading-relaxed">{c.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- About intro */
export function AboutIntro() {
  return (
    <section className="bg-white pt-24 pb-28 md:pt-32 md:pb-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <Reveal>
            <ParallaxImage
              image={images.storageTanks}
              className="aspect-[4/5] w-[82%] rounded-[2rem]"
              sizes="(min-width: 1024px) 40vw, 80vw"
              strength={8}
            />
          </Reveal>
          <Reveal delay={0.2} className="absolute right-0 bottom-[-6%] w-[52%]">
            <ParallaxImage
              image={images.drums}
              className="aspect-square rounded-[1.75rem] border-[6px] border-white shadow-(--shadow-lift)"
              sizes="(min-width: 1024px) 25vw, 50vw"
              strength={14}
            />
          </Reveal>
          <Reveal delay={0.35} className="absolute top-10 right-[4%] sm:right-[8%]">
            <div className="rounded-2xl border border-white bg-white/90 px-5 py-4 shadow-(--shadow-lift)">
              <p className="font-mono text-[0.62rem] tracking-[0.18em] text-brand-700 uppercase">Our approach</p>
              <p className="mt-1.5 font-display text-sm font-semibold text-ink">Reliable · Transparent · Efficient</p>
            </div>
          </Reveal>
        </div>

        <div>
          <SectionHeading
            eyebrow="About DS Global Ventures"
            title="Connecting Reliable Chemical Sources with Industrial Buyers"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed">
              DS Global Ventures is a chemical trading and sourcing company engaged in the supply of industrial
              chemicals, chemical raw materials and intermediates.
            </p>
            <p className="mt-4 leading-relaxed">
              Our objective is simple — to make chemical procurement more reliable, transparent and efficient for
              industrial customers.
            </p>
          </Reveal>
          <RevealGroup as="ul" className="mt-8 space-y-3">
            {[
              "Technical specifications understood first",
              "Quantity & packaging matched to your plant",
              "Dispatch coordinated to your schedule",
            ].map((item) => (
              <RevealItem as="li" key={item} className="flex items-center gap-3 font-medium text-ink">
                <span className="flex size-6 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.2} className="mt-10">
            <Button href="/about" variant="soft">
              More About Us
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Key facts */
export function KeyFacts() {
  return (
    <section className="bg-dots-light border-y border-line bg-mist">
      <div className="container-x">
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4">
          {keyFacts.map((f, i) => (
            <RevealItem
              key={f.label}
              className={`py-10 md:py-14 ${i % 2 === 1 ? "pl-6 md:pl-10" : ""} ${i > 0 ? "lg:border-l lg:pl-10" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} border-line`}
            >
              <p className="font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-none font-bold tracking-tight text-ink">
                <Counter value={f.value} />
                <span aria-hidden className="ml-1 inline-block size-2.5 rounded-full bg-brand-400 align-top" />
              </p>
              <p className="mt-3 max-w-[12rem] text-sm leading-snug">{f.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Products */
export function ProductsShowcase() {
  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our Products"
            title="Industrial Chemicals & Chemical Raw Materials"
            lead="A focused portfolio of high-demand industrial chemicals. Grade, specification, packaging and minimum order quantity vary by product and supply requirement."
          />
          <Reveal delay={0.2} className="shrink-0">
            <Button href="/products" variant="outline">
              View All Products
            </Button>
          </Reveal>
        </div>
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <RevealItem key={p.slug}>
              <ProductCard product={p} />
            </RevealItem>
          ))}
          <RevealItem>
            <OtherChemicalsCard />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Services bento */
export function ServicesBento() {
  const [first, ...rest] = services;
  return (
    <section className="surface-soft section-y relative overflow-hidden">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="What We Do"
          title="End-to-End Chemical Procurement Support"
          lead="From identifying the right source to coordinating dispatch — one partner for your industrial chemical requirements."
        />

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <RevealItem className="md:col-span-2 lg:row-span-2">
            <GlowCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-(--shadow-card)">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-[1.25rem]">
                <Image
                  src={images.tankerTrucks.src}
                  alt={images.tankerTrucks.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-mono text-xs text-brand-700">
                  01
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-3xl font-bold tracking-tight">{first.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed">{first.text}</p>
              </div>
            </GlowCard>
          </RevealItem>
          {rest.map((s, i) => (
            <RevealItem key={s.title}>
              <GlowCard className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-(--shadow-card) transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brandwash text-brand-700 transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <span className="font-mono text-xs text-muted">{String(i + 2).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed">{s.text}</p>
              </GlowCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Industries */
export function IndustriesPreview() {
  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Industries We Serve"
            title="Chemical Solutions for Diverse Industries"
            lead="Different industries have different chemical requirements. We work across multiple industrial sectors to source and supply suitable raw materials."
          />
          <Reveal delay={0.2} className="shrink-0">
            <Button href="/industries" variant="outline">
              Explore Industries
            </Button>
          </Reveal>
        </div>
      </div>
      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-6 lg:mx-auto lg:max-w-7xl lg:grid-cols-4 lg:px-8">
        {industries.map((ind, i) => (
          <Reveal key={ind.slug} delay={(i % 4) * 0.08} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <IndustryTile industry={ind} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Process */
export function ProcessSection() {
  return (
    <section className="section-y bg-grid-light relative overflow-hidden bg-mist">
      <div className="container-x relative">
        <SectionHeading
          align="center"
          eyebrow="How We Work"
          title="A Clear, Five-Step Sourcing Process"
          lead="From your first enquiry to final delivery coordination — a transparent process designed around your requirement."
        />
        <div className="mt-16 lg:mt-20">
          <ProcessTimeline />
        </div>
        <Reveal className="mt-16 flex justify-center">
          <Button href="/contact">Start With Your Requirement</Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Global band */
export function GlobalBand() {
  return (
    <section className="relative isolate overflow-hidden bg-sky">
      <ParallaxImage
        image={images.terminal}
        className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[65%]"
        strength={14}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#eef4fd_0%,#eef4fd_37%,rgb(238_244_253/0.85)_46%,rgb(238_244_253/0.35)_66%,rgb(238_244_253/0)_100%)] max-lg:bg-[rgb(238_244_253/0.9)]"
      />
      <div className="container-x grid min-h-[620px] items-center py-24 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>Supply Coordination</Eyebrow>
          </Reveal>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] font-bold tracking-[-0.03em]">
            From Enquiry to Delivery — Coordinated
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed">
              Packaging, dispatch and delivery requirements are coordinated according to agreed terms, so your
              production schedule stays on track.
            </p>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-3">
            {["Drums, bags, IBCs & bulk options*", "Domestic & international enquiries", "Delivery-location based commercials"].map(
              (point) => (
                <RevealItem
                  as="li"
                  key={point}
                  className="rounded-2xl border border-white bg-white/85 p-4 text-sm leading-snug font-medium text-ink shadow-(--shadow-card)"
                >
                  <span aria-hidden className="mb-3 block h-0.5 w-6 rounded-full bg-brand-500" />
                  {point}
                </RevealItem>
              ),
            )}
          </RevealGroup>
          <p className="mt-5 text-xs text-muted">*Subject to product and availability.</p>
          <Reveal delay={0.2} className="mt-8">
            <Link
              href="/sourcing-supply"
              className="group inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-600"
            >
              Sourcing &amp; Supply
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
