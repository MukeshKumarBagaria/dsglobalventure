import type { Metadata } from "next";
import { FileCheck2, FileText, ShieldAlert, Zap } from "lucide-react";
import pdfjsPkg from "pdfjs-dist/package.json";
import { CatalogCard } from "@/components/catalog/catalog-card";
import { CatalogController } from "@/components/catalog/catalog-controller";
import { CatalogToolbar } from "@/components/catalog/catalog-toolbar";
import type { ViewerDoc, ViewerProduct } from "@/components/catalog/types";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { catalog, catalogCategories, catalogDocuments, docLabels, documentUrl, previewUrl } from "@/content/catalog";
import { productOptions } from "@/content/products";
import { images } from "@/lib/images";
import { absoluteUrl } from "@/lib/site";
import { jsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Product Catalogue — COA & MSDS Documents",
  description:
    "Browse DS Global Ventures' product catalogue — specifications (COA) and material safety data sheets (MSDS) for Phenol, Methanol, MEG, Styrene, Isopropanol, Acetic Acid, Melamine, VAM, Paraffin Wax and more. View instantly or request a quotation.",
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

const docTypes = [
  {
    icon: FileCheck2,
    title: "Specification / COA",
    text: "Product specification sheet with key parameters — purity or assay, moisture, specific gravity, distillation range and typical applications.",
  },
  {
    icon: ShieldAlert,
    title: "Material Safety Data Sheet",
    text: "Hazard identification, first-aid measures, handling and storage, exposure controls and transport information for safe use.",
  },
  {
    icon: FileText,
    title: "Batch documents on request",
    text: "Batch-specific COA, packing details and other applicable documentation are shared with quotations and orders as applicable.",
  },
];

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
        title="Product Catalogue & Technical Documents"
        lead="Specifications (COA) and Material Safety Data Sheets (MSDS) for our product range. Open any document instantly, download it, or request a quotation in one click."
        aside={
          <div className="rounded-[2rem] border border-white bg-white/85 p-6 shadow-[0_40px_90px_-35px_rgb(15_42_79/0.45)] sm:p-7">
            <dl className="grid grid-cols-3 divide-x divide-line text-center">
              {[
                [String(catalog.length), "Products"],
                [String(catalogDocuments.length), "Documents"],
                ["2", "Doc types"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col-reverse px-2">
                  <dt className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">{label}</dt>
                  <dd className="font-display text-3xl font-bold text-ink sm:text-4xl">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-brandwash px-4 py-3 text-sm text-ink">
              <Zap className="size-5 shrink-0 text-brand-600" aria-hidden />
              Documents open instantly in the built-in viewer — no download needed.
            </div>
          </div>
        }
      >
        <Button href="#catalogue">Browse the Catalogue</Button>
        <Button href="/contact" variant="glass">
          Request a Quote
        </Button>
      </PageHero>

      <section id="catalogue" className="scroll-mt-24 bg-white pt-14 pb-24 md:pt-20 md:pb-28">
        <div className="container-x">
          <h2 className="sr-only">All products and documents</h2>
          <CatalogToolbar categories={catalogCategories} total={catalog.length} />
          <ul className="mt-6 grid gap-5 lg:grid-cols-2">
            {catalog.map((p) => (
              <CatalogCard key={p.slug} product={p} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-grid-light bg-mist">
        <div className="container-x">
          <SectionHeading
            eyebrow="About the documents"
            title="What You’ll Find in Each Document"
            lead="Always review the relevant SDS and specification before handling, storing or using any chemical product."
          />
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
            {docTypes.map((d) => (
              <RevealItem key={d.title} className="rounded-3xl border border-line bg-white p-7 shadow-(--shadow-card)">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brandwash text-brand-700">
                  <d.icon className="size-6" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-bold tracking-tight">{d.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed">{d.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8 text-sm text-muted">
            Documents are provided for information. Final specification and classification follow the supplier documents
            for the specific grade and batch.
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
