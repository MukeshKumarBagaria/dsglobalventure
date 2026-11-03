import type { Metadata } from "next";
import { Img as Image } from "@/components/ui/img";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { Molecule } from "@/components/molecules/molecule";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { availableInformation, products } from "@/content/products";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products | Industrial Chemicals & Raw Materials",
  description:
    "Phenol, Paraformaldehyde, Formaldehyde, Methanol, Acetone and other industrial chemicals sourced and supplied to your specification.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        image={images.pipework}
        crumbs={[{ label: "Products", href: "/products" }]}
        eyebrow="Our Products"
        title="Industrial Chemicals & Chemical Raw Materials"
        lead="DS Global Ventures supplies and sources a range of industrial chemicals and chemical raw materials for customers across multiple industries."
      >
        <Button href="/contact">Request a Quote</Button>
        <Button href="/product-catalog" variant="glass">
          Catalogue · Spec Sheets
        </Button>
      </PageHero>

      <section className="bg-white pt-16 pb-8 md:pt-20">
        <div className="container-x">
          <Reveal className="flex gap-4 rounded-2xl border border-brand-500/20 bg-brand-500/[0.06] p-5 sm:items-center sm:p-6">
            <Info className="size-6 shrink-0 text-brand-600" strokeWidth={1.75} aria-hidden />
            <p className="text-[0.95rem] leading-relaxed text-ink/85">
              Product availability, grade, specification, packaging and minimum order quantity may vary according to the
              product and supply requirement.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white pb-24 md:pb-32">
        <div className="container-x space-y-6">
          {products.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.slug}>
                <article
                  id={p.slug}
                  className="group grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-(--shadow-card) transition-shadow duration-500 hover:shadow-(--shadow-lift) lg:grid-cols-12"
                >
                  <div
                    className={cn(
                      "surface-blue relative flex min-h-[300px] items-center justify-center overflow-hidden p-10 lg:col-span-5",
                      flip && "lg:order-2",
                    )}
                  >
                    <Image
                      src={images[p.image].src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover opacity-[0.12] grayscale transition-transform duration-[1.4s] ease-(--ease-out-expo) group-hover:scale-105"
                    />
                    <div className="bg-grid-light absolute inset-0 opacity-70" aria-hidden />
                    <div className="relative w-full max-w-[280px]">
                      <Molecule name={p.slug} tone="light" title={`${p.name} molecular structure`} />
                    </div>
                    <span className="absolute top-6 left-6 font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                    </span>
                    <span className="absolute right-6 bottom-6 font-mono text-sm text-brand-700">{p.formulaDisplay}</span>
                  </div>

                  <div className="flex flex-col p-8 sm:p-10 lg:col-span-7 lg:p-12">
                    <p className="font-mono text-[0.7rem] tracking-[0.16em] text-brand-600 uppercase">{p.category}</p>
                    <h2 className="mt-3 text-[clamp(2rem,3.4vw,2.75rem)] font-bold tracking-tight">{p.name}</h2>
                    <dl className="mt-5 flex flex-wrap gap-2 font-mono text-[0.75rem]">
                      {[
                        ["CAS", p.cas],
                        ["Formula", p.formula],
                        ["HS", p.hsCode],
                      ].map(([k, v]) => (
                        <div key={k} className="flex gap-1.5 rounded-full border border-line bg-mist px-3 py-1.5">
                          <dt className="text-muted">{k}</dt>
                          <dd className="font-medium text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-6 max-w-2xl leading-relaxed">{p.listing}</p>
                    <p className="mt-6 text-sm font-semibold text-ink">Applications:</p>
                    <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {p.listingApplications.map((a) => (
                        <li key={a} className="flex items-center gap-2.5 text-[0.95rem]">
                          <Check className="size-4 text-brand-500" strokeWidth={2.5} aria-hidden />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-3 pt-9">
                      <Button href={`/contact?product=${p.slug}`}>Request {p.name} Quote</Button>
                      <Button href={`/products/${p.slug}`} variant="outline" arrow>
                        View Product Details
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Information strip */}
      <section className="section-y bg-dots-light border-y border-line bg-mist">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="With Every Enquiry"
            title="Information Available for Each Product"
            lead="Share your requirement and our team will confirm the following details as applicable to the product and supply."
          />
          <RevealGroup className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {availableInformation.map((item) => (
              <RevealItem
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-4 text-sm font-semibold text-ink shadow-(--shadow-card)"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Other chemicals */}
      <section className="section-y bg-white">
        <div className="container-x">
          <Reveal>
            <div className="surface-blue relative isolate overflow-hidden rounded-[2rem] border border-brand-500/15 p-8 sm:p-12 lg:p-16">
              <Image
                src={images.complex.src}
                alt=""
                fill
                sizes="100vw"
                className="-z-20 object-cover opacity-90"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#eef4fd_0%,rgb(238_244_253/0.97)_45%,rgb(238_244_253/0.55)_75%,rgb(238_244_253/0.15)_100%)]" />
              <div className="max-w-2xl">
                <Eyebrow>Other Chemicals</Eyebrow>
                <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-tight font-bold tracking-tight">
                  Our product portfolio can be expanded according to market requirements.
                </h2>
                <p className="mt-6 text-lg leading-relaxed">
                  If you are looking for a specific industrial chemical that is not listed here, contact our team with the
                  product name, required specification and quantity.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <Button href="/products/other-chemicals">Send Your Requirement</Button>
                  <Link
                    href="/contact?product=other"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-600"
                  >
                    Go to enquiry form
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
