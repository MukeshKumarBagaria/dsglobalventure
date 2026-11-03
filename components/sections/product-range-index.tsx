import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, FlaskConical } from "lucide-react";
import { rangeIcons } from "@/components/layout/range-icons";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { catalogDocuments, docLabels, documentUrl, getDocumentsFor } from "@/content/catalog";
import { productRange } from "@/content/product-range";
import { getProduct } from "@/content/products";

/**
 * The product range by category (same grouping as the Products mega menu). Each product shows its COA / MSDS —
 * plain PDF links that the site-wide catalogue controller opens in the in-page viewer — or a quote link when no
 * document is published. Categories and products without a detail page are the mega menu's anchor targets.
 */
export function ProductRangeIndex() {
  return (
    <section id="range" className="bg-white pt-16 md:pt-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Product Range"
          title="Our Products by Category"
          lead="Open the specification sheet (COA) or material safety data sheet (MSDS) for any product that has one, or request a quote for the grade you need."
        />

        {/* 5 categories + the catalogue tile: 2×3 on tablets, 3×2 on laptops, one row + a banner on desktops */}
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {productRange.map((c) => {
            const Icon = rangeIcons[c.id] ?? FlaskConical;
            return (
              <RevealItem key={c.id}>
                <div id={c.id} className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-(--shadow-card)">
                  {/* name on its own line so "Glycol & Glycol Ethers" fits the narrow 5-column cards without wrapping */}
                  <header className="border-b border-line bg-mist px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-brand-600">
                        <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                      </span>
                      <span className="font-mono text-[0.7rem] text-muted">{c.items.length} products</span>
                    </div>
                    <h3 className="mt-3 text-base leading-tight font-bold tracking-tight">{c.name}</h3>
                  </header>

                  <ul className="flex-1 divide-y divide-line px-5">
                    {c.items.map((item) => {
                      const hasPage = Boolean(getProduct(item.slug));
                      const docs = getDocumentsFor(item.slug);
                      return (
                        <li key={item.slug} id={hasPage ? undefined : item.slug} className="py-4">
                          {hasPage ? (
                            <Link
                              href={`/products/${item.slug}`}
                              className="group inline-flex items-center gap-1 font-semibold text-ink transition-colors hover:text-brand-700"
                            >
                              {item.name}
                              <ArrowUpRight
                                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden
                              />
                            </Link>
                          ) : (
                            <p className="font-semibold text-ink">{item.name}</p>
                          )}
                          {item.fullName ? <p className="mt-0.5 text-xs text-muted">{item.fullName}</p> : null}

                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {docs.length > 0 ? (
                              docs.map((d) => (
                                <a
                                  key={d.id}
                                  href={documentUrl(d)}
                                  data-doc-open={d.id}
                                  title={docLabels[d.type].long}
                                  aria-label={`View ${item.name} ${docLabels[d.type].long} (PDF)`}
                                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-brand-500/25 bg-brandwash px-3 font-mono text-[0.7rem] font-bold tracking-wider text-brand-700 transition-colors hover:border-brand-500 hover:bg-white"
                                >
                                  <FileText className="size-3.5" aria-hidden />
                                  {d.type}
                                </a>
                              ))
                            ) : (
                              <Link
                                href={`/contact?product=${item.slug}`}
                                className="group inline-flex h-8 items-center gap-1 rounded-full border border-dashed border-ink/20 px-3 text-xs font-semibold text-body transition-colors hover:border-brand-500 hover:text-brand-700"
                              >
                                Request quote
                                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                              </Link>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </RevealItem>
            );
          })}

          <RevealItem className="xl:col-span-5">
            <Link
              href="/product-catalog"
              className="group surface-blue relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[1.75rem] border border-brand-500/15 p-6 xl:flex-row xl:items-center xl:py-5"
            >
              <div className="bg-grid-light absolute inset-0 opacity-60" aria-hidden />
              <div className="relative flex gap-4 xl:items-center">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-(--shadow-card)">
                  <FileText className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink">Product Catalogue</p>
                  <p className="font-mono text-[0.7rem] text-muted">{catalogDocuments.length} PDF documents</p>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    <strong className="font-semibold text-ink">COA</strong> — specification sheet ·{" "}
                    <strong className="font-semibold text-ink">MSDS</strong> — material safety data sheet. Every document opens
                    instantly and can be downloaded.
                  </p>
                </div>
              </div>
              <span className="relative inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700">
                Browse all documents
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
