import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { Molecule } from "@/components/molecules/molecule";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { products } from "@/content/products";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const d = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

export function HomeHero() {
  return (
    <section data-hero="" className="surface-soft relative isolate flex min-h-[700px] flex-col overflow-hidden lg:h-svh lg:min-h-[760px]">
      <ParallaxImage
        image={images.petrochemPlant}
        className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[72%]"
        strength={8}
        zoom
        desktopOnly
        quality={70}
        sizes="72vw"
        imgClassName="object-[60%_50%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#f7faff_0%,#f7faff_29%,rgb(247_250_255/0.9)_38%,rgb(247_250_255/0.62)_56%,rgb(247_250_255/0.1)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(247_250_255/0.9)_0%,rgb(247_250_255/0.95)_70%,#f7faff_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-white via-white/60 to-transparent" />
      <div aria-hidden className="bg-grid-light absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_20%_40%,black,transparent_70%)]" />
      <div aria-hidden className="absolute top-1/4 -left-40 -z-10 size-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(91_155_245/0.25),transparent)]" />

      <div className="container-wide grid flex-1 items-center gap-12 pt-36 pb-12 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="anim-rise flex flex-wrap items-center gap-x-4 gap-y-2" style={d(0.05)}>
            <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-brand-700 uppercase">
              <span aria-hidden className="h-px w-8 bg-brand-500" />
              DS Global Ventures
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-ink/20 sm:block" />
            <span className="font-mono text-[0.72rem] tracking-[0.14em] text-muted uppercase">
              Industrial Chemicals &amp; Raw Materials
            </span>
          </div>

          <h1 className="mt-7 text-[clamp(2.5rem,4.5vw,4.6rem)] leading-[1.02] font-bold tracking-[-0.035em] text-ink">
            <span className="sr-only">{site.tagline}</span>
            {["Reliable Chemical Sourcing.", "Trusted Global Trade."].map((line, i) => (
              <span key={line} aria-hidden className="block overflow-hidden pb-[0.06em]">
                <span className={i === 1 ? "anim-mask text-gradient-ink" : "anim-mask"} style={d(0.1 + i * 0.1)}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-body md:text-xl">
            We supply and source industrial chemicals, chemical raw materials and intermediates — matched to your
            specification, quantity, packaging and delivery schedule.
          </p>

          <div className="anim-rise mt-10 flex flex-col gap-3 sm:flex-row" style={d(0.35)}>
            <Button href="/contact" size="lg">
              Request a Quote
            </Button>
            <Button href="/products" size="lg" variant="glass" arrow>
              Explore Products
            </Button>
          </div>

          <ul className="anim-rise mt-10 flex flex-wrap gap-2" aria-label="Highlights" style={d(0.5)}>
            {["Specification-led sourcing", "COA & SDS coordination", "Bulk & recurring supply"].map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-[0.8rem] font-medium text-ink/80 shadow-(--shadow-card)"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Molecule card */}
        <div className="anim-rise hidden lg:col-span-5 lg:block xl:col-span-4" style={d(0.4)}>
          <div className="animate-float">
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white/80 p-7 shadow-[0_40px_90px_-35px_rgb(16_41_74/0.45)]">
              <div aria-hidden className="absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(closest-side,rgb(91_155_245/0.30),transparent)]" />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[0.68rem] tracking-[0.18em] text-brand-700 uppercase">Featured product</span>
                <span className="flex items-center gap-2 font-mono text-[0.68rem] text-muted">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/70" />
                    <span className="relative size-2 rounded-full bg-brand-500" />
                  </span>
                  Enquiries open
                </span>
              </div>
              <div className="relative mx-auto mt-4 max-w-[250px]">
                <Molecule name="phenol" tone="light" title="Phenol molecular structure" />
              </div>
              <div className="relative mt-2 flex items-end justify-between border-t border-line pt-5">
                <div>
                  <p className="font-display text-2xl font-bold text-ink">Phenol</p>
                  <p className="mt-1 font-mono text-xs text-muted">C₆H₅OH · 94.11 g/mol</p>
                </div>
                <p className="rounded-full border border-brand-500/25 bg-brandwash px-3 py-1 font-mono text-[0.7rem] text-brand-700">
                  CAS 108-95-2
                </p>
              </div>
              <dl className="relative mt-5 grid grid-cols-2 gap-3 text-[0.78rem]">
                {[
                  ["Applications", "Phenolic resins"],
                  ["Supply", "Drums · ISO · Tankers"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-line bg-mist p-3">
                    <dt className="font-mono text-[0.62rem] tracking-[0.14em] text-muted uppercase">{k}</dt>
                    <dd className="mt-1 font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="anim-rise relative border-t border-line bg-white/75" style={d(0.6)}>
        <div className="container-wide flex items-center gap-6">
          <a
            href="#capabilities"
            className="hidden shrink-0 items-center gap-3 border-r border-line py-5 pr-6 text-[0.7rem] font-semibold tracking-[0.2em] text-muted uppercase transition-colors hover:text-ink md:flex"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-line">
              <ArrowDown className="size-3.5 animate-bounce" aria-hidden />
            </span>
            Scroll
          </a>
          <Marquee className="flex-1 py-5">
            {[...products.map((p) => [p.name, `CAS ${p.cas}`]), ["Other Chemicals", "On Request"]].map(([n, c]) => (
              <span key={n} className="flex items-center gap-3 pr-12 font-mono text-[0.78rem] tracking-[0.12em] whitespace-nowrap uppercase">
                <span aria-hidden className="text-brand-500">◆</span>
                <span className="text-ink">{n}</span>
                <span className="text-muted">{c}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
