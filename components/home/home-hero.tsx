import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronRight, Headset, Layers, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { WorldMap } from "@/components/home/world-map";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { products } from "@/content/products";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const d = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

const highlights: { icon: LucideIcon; label: [string, string] }[] = [
  { icon: Truck, label: ["Global Sourcing", "Network"] },
  { icon: ShieldCheck, label: ["Quality", "Documentation"] },
  { icon: Layers, label: ["Bulk & Recurring", "Supply"] },
  { icon: Headset, label: ["End-to-End", "Coordination"] },
];

export function HomeHero() {
  return (
    <section data-hero="" className="relative isolate flex flex-col overflow-hidden bg-[#0b3a8c] lg:min-h-[max(100svh,840px)]">
      {/* Background — refinery photo (desktop only; object-cover in a viewport-tall box renders it ~100vw wide), blue wash, glows */}
      <ParallaxImage
        image={images.heroRefinery}
        className="absolute inset-y-0 right-0 -z-30 w-full lg:w-[68%] lg:bg-[#103f93]"
        strength={6}
        zoom
        desktopOnly
        quality={70}
        sizes="100vw"
        imgClassName="object-[100%_62%] [filter:brightness(1.18)_saturate(1.3)_contrast(1.04)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(900px_520px_at_8%_0%,#1553b8_0%,transparent_70%),linear-gradient(180deg,#0b3a8c_0%,#0c3f96_100%)] lg:bg-[radial-gradient(800px_480px_at_6%_0%,#1553b8_0%,transparent_70%),linear-gradient(90deg,#0b3a8c_0%,#0b3a8c_29%,rgb(11_58_140/0.78)_39%,rgb(11_58_140/0.32)_52%,rgb(14_70_166/0.06)_66%,rgb(14_70_166/0)_100%)]"
      />
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-20 opacity-60 [mask-image:radial-gradient(ellipse_at_15%_35%,black,transparent_65%)]" />
      {/* fixed offsets, not % of the hero height — a %-anchored glow moves (CLS) whenever the hero's height settles */}
      <div aria-hidden className="absolute top-40 left-[28%] -z-20 size-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(91_155_245/0.32),transparent)]" />

      <div className="container-wide grid flex-1 items-center gap-12 pt-32 pb-10 lg:grid-cols-12 lg:gap-8 lg:pt-40 lg:pb-10">
        <div className="lg:col-span-7">
          <div className="anim-rise flex flex-wrap items-center gap-x-4 gap-y-2" style={d(0.05)}>
            <span className="inline-flex items-center gap-3 font-mono text-[0.72rem] font-semibold tracking-[0.2em] text-white uppercase">
              <span aria-hidden className="h-px w-8 bg-white/70" />
              DS Global Ventures
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-white/35 sm:block" />
            <span className="font-mono text-[0.72rem] tracking-[0.16em] text-brand-100 uppercase">
              Industrial Chemicals &amp; Raw Materials
            </span>
          </div>

          <h1 className="mt-7 text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.04] font-bold tracking-[-0.035em] text-white">
            <span className="sr-only">{site.tagline}</span>
            {["Reliable Chemical", "Sourcing."].map((line, i) => (
              <span key={line} aria-hidden className="block overflow-hidden pb-[0.06em]">
                <span className="anim-mask" style={d(0.1 + i * 0.08)}>
                  {line}
                </span>
              </span>
            ))}
            <span aria-hidden className="relative block w-fit">
              <span className="block overflow-hidden pr-[0.14em] pb-[0.1em]">
                <span className="anim-mask text-gradient-hero italic" style={d(0.26)}>
                  Trusted Global Trade.
                </span>
              </span>
              <svg viewBox="0 0 300 24" className="absolute right-[-2%] -bottom-[0.16em] h-[0.3em] w-[64%] overflow-visible">
                <defs>
                  <linearGradient id="hero-swoosh" x1="0" x2="1">
                    <stop offset="0" stopColor="#8cc4ff" stopOpacity="0" />
                    <stop offset="0.35" stopColor="#8cc4ff" />
                    <stop offset="1" stopColor="#e3eefe" />
                  </linearGradient>
                </defs>
                <path className="hero-swoosh" pathLength={1} d="M2 20C80 9 190 3 298 8" fill="none" stroke="url(#hero-swoosh)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="anim-rise mt-8 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl" style={d(0.35)}>
            We supply and source industrial chemicals, chemical raw materials and intermediates — matched to your
            specification, quantity, packaging and delivery schedule.
          </p>

          <div className="anim-rise mt-10 flex flex-col gap-3 sm:flex-row sm:gap-5" style={d(0.45)}>
            <Button href="/contact" size="xl" variant="bright" arrow>
              Request a Quote
            </Button>
            <Button href="/products" size="xl" variant="outlineLight" arrow>
              Explore Products
            </Button>
          </div>

          {/* one divided row needs ~750px: below lg from 860px, beside the map from 1400px; 2 × 2 grid otherwise */}
          <ul
            className="anim-rise mt-11 grid grid-cols-2 items-center gap-y-5 min-[860px]:max-lg:flex min-[1400px]:flex"
            style={d(0.55)}
          >
            {highlights.map(({ icon: Icon, label: [a, b] }, i) => (
              <li
                key={a}
                className={cn(
                  "flex items-center gap-2.5 pr-4 min-[860px]:max-lg:pr-5 min-[1400px]:pr-5",
                  i > 0 &&
                    "border-white/25 min-[860px]:max-lg:border-l min-[860px]:max-lg:pl-5 min-[1400px]:border-l min-[1400px]:pl-5",
                )}
              >
                <Icon className="size-7 shrink-0 text-white" strokeWidth={1.3} aria-hidden />
                <span className="text-[0.82rem] leading-tight font-medium whitespace-nowrap text-white/90">
                  {a}
                  <br />
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Animated trade map — bleeds under the headline (faded out there) and to the edge of the screen */}
        <div className="relative -z-10 -mx-[12%] sm:mx-0 lg:col-span-5 lg:mr-[-2.5rem] lg:ml-[-62%]">
          <div aria-hidden className="absolute -inset-x-[4%] -inset-y-[30%] bg-[radial-gradient(closest-side,rgb(8_42_118/0.9),rgb(8_42_118/0.72)_50%,transparent)]" />
          <WorldMap
            className="relative lg:[mask-image:linear-gradient(90deg,transparent_4%,black_30%)]"
            hubLabel="DS Global · India"
            tags={products.map((p) => ({ title: p.formulaDisplay, meta: p.name }))}
          />
        </div>
      </div>

      {/* Key products bar */}
      <div className="anim-rise container-wide pb-6 lg:pb-8" style={d(0.65)}>
        <div className="flex items-center gap-2 rounded-full border border-white bg-white/90 p-1.5 shadow-[0_24px_50px_-26px_rgb(6_30_80/0.55)] backdrop-blur-md sm:p-2">
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-600 py-2.5 pr-3.5 pl-4 text-[0.82rem] font-semibold text-white transition-colors hover:bg-brand-700 sm:pr-4 sm:pl-5 sm:text-sm"
          >
            <span className="max-sm:hidden">Our&nbsp;</span>Key Products
            <ChevronRight className="size-4" aria-hidden />
          </Link>
          <Marquee className="flex-1">
            {[...products.map((p) => [p.name, `CAS ${p.cas}`]), ["Other Chemicals", "On Request"]].map(([n, c]) => (
              <span
                key={n}
                className="flex items-center gap-4 border-r border-line px-7 font-mono text-[0.78rem] tracking-[0.12em] whitespace-nowrap uppercase sm:px-9"
              >
                <span className="font-semibold text-ink">{n}</span>
                <span className="text-muted">{c}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Bottom-anchored decoration comes last: it then exists only once the section's height is final,
          so it cannot shift while the long hero markup is still streaming in (CLS). */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-[linear-gradient(0deg,#ffffff_0%,rgb(234_242_253/0.9)_30%,rgb(170_204_250/0.35)_70%,transparent_100%)]"
      />
      <svg aria-hidden viewBox="0 0 800 220" preserveAspectRatio="none" className="absolute bottom-16 left-0 -z-10 h-56 w-[70%] opacity-50">
        <defs>
          <linearGradient id="hero-streak" x1="0" x2="1">
            <stop offset="0" stopColor="#8cc4ff" stopOpacity="0" />
            <stop offset="0.45" stopColor="#8cc4ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-20 200C180 120 420 90 820 110" fill="none" stroke="url(#hero-streak)" strokeWidth="2" />
        <path d="M-20 214C220 150 460 128 820 140" fill="none" stroke="url(#hero-streak)" strokeWidth="1" />
      </svg>
    </section>
  );
}
