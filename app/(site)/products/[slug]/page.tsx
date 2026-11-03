import type { Metadata } from "next";
import { Img as Image } from "@/components/ui/img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, FileText, Phone, TriangleAlert } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Molecule } from "@/components/molecules/molecule";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/sections/page-hero";
import { ProductCard } from "@/components/sections/product-card";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { getIndustry } from "@/content/industries";
import { getDocumentsFor } from "@/content/catalog";
import { availableInformation, getProduct, productFaqs, productOptions, products } from "@/content/products";
import { images } from "@/lib/images";
import { absoluteUrl, site, telLink, whatsappLink } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.seoTitle} | ${site.name}`, description: product.seoDescription },
  };
}

// Every product page is fully prerendered from generateStaticParams; render it in one pass
// (no loading placeholder → no layout shift). Navigations prefetch it via <Link prefetch>.
export const instant = false;

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return <ProductDetail params={params} />;
}

async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug);
  const coa = getDocumentsFor(product.slug).find((d) => d.type === "COA");
  const facts: [string, string][] = [
    ["CAS No.", product.cas],
    ["Molecular formula", `${product.formulaDisplay} (${product.formula})`],
    ["Molecular weight", product.molecularWeight],
    ["Synonyms", product.synonyms.join(", ")],
    ["HS code (indicative)", product.hsCode],
    ["Typical physical form", product.physicalForm],
    ["Typical packaging*", product.packaging],
    ["Transport (typical)", product.transport],
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.intro,
    category: product.category,
    url: absoluteUrl(`/products/${product.slug}`),
    brand: { "@type": "Organization", name: site.name },
    alternateName: product.synonyms,
    additionalProperty: [
      { "@type": "PropertyValue", name: "CAS Number", value: product.cas },
      { "@type": "PropertyValue", name: "Molecular formula", value: product.formula },
      { "@type": "PropertyValue", name: "Molecular weight", value: product.molecularWeight },
      { "@type": "PropertyValue", name: "HS code", value: product.hsCode },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />
      <PageHero
        image={images[product.image]}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
        eyebrow={product.category}
        title={product.name}
        lead={product.intro}
        aside={
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white/80 p-7 shadow-[0_40px_90px_-35px_rgb(16_41_74/0.45)]">
            <div aria-hidden className="absolute -top-20 -right-20 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(91_155_245/0.30),transparent)]" />
            <div className="relative flex items-center justify-between">
              <span className="rounded-full border border-brand-500/25 bg-brandwash px-3 py-1 font-mono text-xs text-brand-700">
                CAS No. {product.cas}
              </span>
              <span className="font-mono text-xs text-muted">{product.molecularWeight}</span>
            </div>
            <div className="relative mx-auto my-6 max-w-[300px]">
              <Molecule name={product.slug} tone="light" title={`${product.name} molecular structure`} />
            </div>
            <p className="relative text-center font-mono text-lg text-ink">{product.formulaDisplay}</p>
          </div>
        }
      >
        <Button href="#enquiry">Request a Quote</Button>
        <Button
          href={whatsappLink(`Hello DS Global Ventures, I would like a quote for ${product.name} (CAS ${product.cas}).`)}
          variant="glass"
          arrow={false}
          icon={<WhatsAppIcon className="size-4 text-whatsapp" />}
        >
          WhatsApp Enquiry
        </Button>
        {coa ? (
          <Button href={`/product-catalog#doc=${coa.id}`} variant="soft" arrow={false} icon={<FileText className="size-4" />}>
            View Specification Sheet
          </Button>
        ) : null}
      </PageHero>

      {/* Quick facts */}
      <section className="bg-white pt-16 md:pt-24">
        <div className="container-x">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-(--shadow-card)">
              <div className="flex flex-col gap-2 border-b border-line bg-mist px-7 py-5 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold tracking-tight">Product Identification</h2>
                <p className="font-mono text-xs text-muted">{product.name} · Quick facts</p>
              </div>
              <dl className="grid md:grid-cols-2">
                {facts.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid grid-cols-[150px_1fr] gap-4 border-line px-7 py-5 sm:grid-cols-[190px_1fr] ${i > 0 ? "border-t" : ""} ${i === 1 ? "md:border-t-0" : ""} ${i % 2 === 1 ? "md:border-l" : ""}`}
                  >
                    <dt className="text-sm text-muted">{k}</dt>
                    <dd className={`text-[0.95rem] font-medium text-ink ${k === "CAS No." || k.startsWith("HS") ? "font-mono" : ""}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-4 text-xs text-muted">
              *Typical formats offered subject to product and availability. Identifiers are standard published data; final
              specification, packaging and classification follow the supplier COA/SDS for the specific grade.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Applications */}
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Applications" title={`Where ${product.name} Is Used`} lead={`${product.name} is commonly used in:`} />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((a, i) => (
              <RevealItem
                key={a}
                className="group flex items-center gap-5 rounded-3xl border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-(--shadow-card)"
              >
                <span className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg font-semibold text-ink">{a}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Supply + Available information */}
      <section className="section-y bg-grid-light bg-mist">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] border border-line bg-white p-8 shadow-(--shadow-card) sm:p-10">
            <Image
              src={images.tankerTrucks.src}
              alt={images.tankerTrucks.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="-z-20 object-cover"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-white via-white/85 to-white/0" />
            <Eyebrow>Supply</Eyebrow>
            <p className="mt-5 font-display text-2xl leading-snug font-semibold text-ink">
              DS Global Ventures can source and supply {product.name} according to customer requirements, subject to product
              availability and agreed specifications.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] border border-line bg-white p-8 shadow-(--shadow-card) sm:p-10">
            <Eyebrow>Available Information</Eyebrow>
            <h2 className="mt-5 text-2xl font-bold tracking-tight">Confirmed with your enquiry</h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {availableInformation.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-[0.95rem] font-medium text-ink">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">For current availability and pricing, please contact our sales team.</p>
          </Reveal>
        </div>
      </section>

      {/* Industries + Safety */}
      <section className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Industries" title={`Industries Using ${product.name}`} />
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2.5">
              {product.industries.map((slug) => {
                const ind = getIndustry(slug);
                if (!ind) return null;
                return (
                  <Link
                    key={slug}
                    href={`/industries#${slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-500 hover:text-brand-600"
                  >
                    {ind.name}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </Link>
                );
              })}
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="h-full rounded-[2rem] border border-amber-400/40 bg-amber-400/[0.07] p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-amber-400 text-white">
                  <TriangleAlert className="size-5" aria-hidden />
                </span>
                <h2 className="text-xl font-bold tracking-tight">Safety &amp; Handling</h2>
              </div>
              <p className="mt-5 leading-relaxed text-ink/85">{product.safety}</p>
              <Link
                href={`/contact?product=${product.slug}&doc=SDS`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-brand-700"
              >
                <FileText className="size-4" aria-hidden />
                {`Request SDS for ${product.name}`}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="surface-blue section-y relative scroll-mt-20 overflow-hidden">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Request a Quote" title={`Need ${product.name}?`} lead="Send us your required quantity and delivery location." />
            <Reveal delay={0.15} className="mt-10 space-y-3">
              <a
                href={telLink()}
                className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 text-ink shadow-(--shadow-card) transition-colors hover:border-brand-500/40"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brandwash text-brand-700">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-muted">Call our sales team</span>
                  <span className="font-semibold">{site.contact.phoneDisplay}</span>
                </span>
              </a>
              <a
                href={whatsappLink(`Hello DS Global Ventures, I would like a quote for ${product.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 text-ink shadow-(--shadow-card) transition-colors hover:border-brand-500/40"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#e8f9ef] text-whatsapp">
                  <WhatsAppIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">WhatsApp enquiry</span>
                  <span className="font-semibold">{site.contact.whatsappDisplay}</span>
                </span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-35px_rgb(16_41_74/0.4)] sm:p-10">
              <EnquiryForm defaultProduct={product.slug} lockProduct submitLabel="Request a Quote" options={productOptions} />
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection items={productFaqs(product)} title={`${product.name} — Frequently Asked Questions`} />

      {/* Related */}
      <section className="section-y bg-mist">
        <div className="container-x">
          <SectionHeading eyebrow="Related Products" title="Explore Other Chemicals" />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <RevealItem key={p.slug}>
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
