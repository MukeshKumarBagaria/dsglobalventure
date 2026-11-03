import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { IndustryIndex } from "@/components/sections/industry-index";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { industries } from "@/content/industries";
import { getProduct } from "@/content/products";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Chemical raw materials for resins & adhesives, plywood & laminates, paints & coatings, chemical manufacturing, pharmaceuticals, rubber & plastics, construction chemicals and textiles.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        image={images.port}
        crumbs={[{ label: "Industries", href: "/industries" }]}
        eyebrow="Industries We Serve"
        title="Chemical Solutions for Diverse Industries"
        lead="Different industries have different chemical requirements. DS Global Ventures works with customers across multiple industrial sectors to source and supply suitable chemical raw materials."
      >
        <Button href="/contact">Send Your Requirement</Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-x grid gap-12 xl:grid-cols-12">
          <aside className="hidden xl:col-span-3 xl:block">
            <IndustryIndex items={industries.map(({ slug, name }) => ({ slug, name }))} />
          </aside>

          <div className="space-y-20 md:space-y-28 xl:col-span-9">
            {industries.map((ind, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={ind.slug} id={ind.slug} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-12">
                  <Reveal className={cn(flip && "md:order-2")}>
                    <ParallaxImage
                      image={images[ind.image]}
                      className="aspect-[4/3] rounded-[2rem]"
                      sizes="(min-width: 1280px) 35vw, (min-width: 768px) 45vw, 100vw"
                      strength={8}
                    />
                  </Reveal>
                  <Reveal delay={0.1}>
                    <span className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, "0")} / 08</span>
                    <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold tracking-tight">{ind.name}</h2>
                    <p className="mt-4 text-[1.0625rem] leading-relaxed">{ind.description}</p>
                    <p className="mt-7 font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase">Relevant products</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {ind.products.map((slug) => {
                        const p = getProduct(slug);
                        if (!p) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/products/${slug}`}
                              className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-mist px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-500 hover:bg-white hover:text-brand-600"
                            >
                              {p.name}
                              <ArrowUpRight className="size-3.5 opacity-50 group-hover:opacity-100" aria-hidden />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Send Your Requirement"
        title="Looking for a specific chemical?"
        text="Tell us what you need — product name, specification, quantity and delivery location."
        primaryLabel="Send Your Requirement"
        image={images.terminal}
      />
    </>
  );
}
