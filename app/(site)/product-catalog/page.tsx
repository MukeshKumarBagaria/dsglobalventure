import type { Metadata } from "next";
import { Download, Eye, Factory, FileText, FlaskConical, Send, Tag } from "lucide-react";
import pdfjsPkg from "pdfjs-dist/package.json";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { CatalogCard } from "@/components/catalog/catalog-card";
import { CatalogController } from "@/components/catalog/catalog-controller";
import type { ViewerDoc, ViewerProduct } from "@/components/catalog/types";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Img } from "@/components/ui/img";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  catalog,
  catalogCategories,
  catalogDocuments,
  docLabels,
  documentUrl,
  previewUrl,
  PREVIEW_SIZE,
} from "@/content/catalog";
import { productOptions } from "@/content/products";
import { images } from "@/lib/images";
import { absoluteUrl } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Product Catalogue — Specification Sheets (COA)",
  description:
    "Browse DS Global Ventures' product catalogue — specification sheets (COA) for Phenol, Methanol, MEG, Styrene, Isopropanol, Acetic Acid, Melamine, VAM, Paraffin Wax and more. View instantly, download, or request a quotation.",
  alternates: { canonical: "/product-catalog" },
};

const viewerProducts: ViewerProduct[] = catalog.map(({ slug, name, cas }) => ({ slug, name, cas }));
const viewerDocs: ViewerDoc[] = catalogDocuments.map((d) => ({
  id: d.id,
  type: d.type,
  label: docLabels[d.type].long,
  url: documentUrl(d),
  preview: previewUrl(d),
  file: d.file,
  pages: d.pages,
  sizeKB: d.sizeKB,
  productSlug: d.product.slug,
}));

const categoryCounts = catalogCategories.map((name) => ({
  name,
  count: catalog.filter((p) => p.category === name).length,
}));

const heroPoints = [
  { icon: Eye, text: "Open any sheet instantly — no download needed" },
  { icon: Download, text: "Free PDF download for your QC team" },
  { icon: Send, text: "Request a quotation in one click" },
];

const sheetContents = [
  {
    icon: FlaskConical,
    title: "Quality parameters",
    text: "Purity or assay, moisture, specific gravity, distillation range and other key limits for the grade.",
  },
  {
    icon: Tag,
    title: "Product identification",
    text: "Product name, CAS number, molecular formula and molecular weight for quick verification.",
  },
  {
    icon: Factory,
    title: "Typical applications",
    text: "The industries and processes each grade is commonly supplied for.",
  },
  {
    icon: FileText,
    title: "Batch COA with orders",
    text: "Batch-specific COA and packing details are shared with quotations and orders as applicable.",
  },
];

const [sampleSheet, sampleSheetBehind] = catalogDocuments;

export default function ProductCatalogPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DS Global Ventures Product Catalogue",
    itemListElement: catalog.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        url: absoluteUrl(p.href ?? `/product-catalog#${p.slug}`),
        additionalProperty: [{ "@type": "PropertyValue", name: "CAS Number", value: p.cas }],
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemList)} />
      <PageHero
        image={images.processPlant}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: "Product Catalogue", href: "/product-catalog" },
        ]}
        eyebrow="Product Catalogue"
        title="Product Catalogue & Specifications"
        lead="Specification sheets for our product range — key quality parameters, CAS details and typical applications. View any sheet instantly, download it, or request a quotation in one click."
        aside={
          <div className="rounded-[2rem] border border-white bg-white/85 p-6 shadow-[0_40px_90px_-35px_rgb(15_42_79/0.45)] backdrop-blur-md sm:p-7">
            <dl className="grid grid-cols-3 divide-x divide-line text-center">
              {[
                [String(catalog.length), "Products"],
                [String(catalogDocuments.length), "Spec sheets"],
                [String(catalogCategories.length), "Categories"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col-reverse px-2">
                  <dt className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">{label}</dt>
                  <dd className="font-display text-3xl font-bold text-ink sm:text-4xl">{value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {heroPoints.map((p) => (
                <li key={p.text} className="flex items-center gap-3 text-sm font-medium text-ink">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brandwash text-brand-700">
                    <p.icon className="size-4" aria-hidden />
                  </span>
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Button href="#catalogue">Browse the Catalogue</Button>
        <Button href="/contact" variant="glass">
          Request a Quote
        </Button>
      </PageHero>

      <section id="catalogue" className="scroll-mt-24 bg-white pt-14 pb-24 md:pt-20 md:pb-28">
        <div className="container-wide">
          <h2 className="sr-only">All products and specification sheets</h2>
          <CatalogBrowser categories={categoryCounts} total={catalog.length}>
            <ul className="mt-6 grid gap-5 xl:grid-cols-2">
              {catalog.map((p) => (
                <CatalogCard key={p.slug} product={p} />
              ))}
            </ul>
          </CatalogBrowser>
        </div>
      </section>

      <section className="section-y bg-grid-light overflow-hidden bg-mist">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Specification sheets"
              title="What’s Inside Each Specification Sheet"
              lead="Every sheet sets out the parameters that matter when you evaluate a grade — so purchase and QC teams can compare at a glance."
            />
            <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2">
              {sheetContents.map((d) => (
                <RevealItem key={d.title} className="rounded-2xl border border-line bg-white p-5 shadow-(--shadow-card)">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brandwash text-brand-700">
                    <d.icon className="size-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-bold tracking-tight">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed">{d.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-6 text-sm text-muted">
              Documents are provided for information. Final specification follows the supplier documents for the specific grade
              and batch.
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[22rem]">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-6 translate-y-2 rotate-[5deg] overflow-hidden rounded-2xl border border-line bg-white shadow-(--shadow-card)"
              >
                <Img
                  src={previewUrl(sampleSheetBehind)}
                  alt=""
                  width={PREVIEW_SIZE.width}
                  height={PREVIEW_SIZE.height}
                  sizes="352px"
                  className="h-auto w-full opacity-80"
                />
              </div>
              <a
                href={documentUrl(sampleSheet)}
                data-doc-open={sampleSheet.id}
                className="group relative block -rotate-2 overflow-hidden rounded-2xl border border-line bg-white shadow-(--shadow-lift) transition-transform duration-500 ease-(--ease-out-expo) hover:rotate-0"
              >
                <Img
                  src={previewUrl(sampleSheet)}
                  alt={`${sampleSheet.product.name} specification sheet, page 1`}
                  width={PREVIEW_SIZE.width}
                  height={PREVIEW_SIZE.height}
                  sizes="(min-width: 1024px) 352px, 90vw"
                  className="h-auto w-full"
                />
                <span className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white via-white/70 to-transparent pt-24 pb-7">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-(--shadow-lift) transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Eye className="size-4" aria-hidden />
                    View sample sheet
                  </span>
                </span>
              </a>
              <div className="absolute -top-6 left-3 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-(--shadow-lift) sm:-left-12">
                <span className="rounded-md bg-brand-600 px-2 py-0.5 font-mono text-[0.68rem] font-bold tracking-wider text-white">
                  {sampleSheet.type}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{sampleSheet.product.name}</span>
                  <span className="block text-xs text-muted">
                    PDF · {sampleSheet.pages} {sampleSheet.pages === 1 ? "page" : "pages"} · {sampleSheet.sizeKB} KB
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Request a Quotation"
        title="Need a Product From the Catalogue?"
        text="Share the product, quantity and delivery location — our team will respond with availability and commercial terms."
        image={images.drums}
      />

      <CatalogController
        products={viewerProducts}
        docs={viewerDocs}
        options={productOptions}
        workerUrl={`/pdfjs/pdf.worker.${pdfjsPkg.version}.min.mjs`}
      />
    </>
  );
}
