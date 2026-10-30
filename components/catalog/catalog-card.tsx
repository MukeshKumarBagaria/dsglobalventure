import Link from "next/link";
import { ArrowUpRight, Download, Eye, FileClock, Send } from "lucide-react";
import { Img } from "@/components/ui/img";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { docLabels, documentUrl, previewUrl, PREVIEW_SIZE, type CatalogDoc, type CatalogProduct } from "@/content/catalog";
import { whatsappLink } from "@/lib/site";

function SpecSheet({ product, doc }: { product: CatalogProduct; doc: CatalogDoc }) {
  const url = documentUrl(doc);
  const label = docLabels[doc.type].long;
  return (
    <div className="group/doc flex items-center gap-3 rounded-2xl border border-line bg-mist/70 p-2.5 transition-[background-color,border-color,box-shadow] duration-300 hover:border-brand-500/35 hover:bg-white hover:shadow-(--shadow-card)">
      {/* Works as a plain PDF link without JS; the catalogue controller opens the in-page viewer. */}
      <a href={url} data-doc-open={doc.id} className="flex min-w-0 flex-1 items-center gap-4 rounded-xl">
        <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-white shadow-[0_8px_18px_-10px_rgb(15_42_79/0.45)]">
          <Img
            src={previewUrl(doc)}
            alt=""
            width={PREVIEW_SIZE.width}
            height={PREVIEW_SIZE.height}
            sizes="64px"
            className="absolute inset-x-0 top-0 h-auto w-full origin-top transition-transform duration-500 ease-(--ease-out-expo) group-hover/doc:scale-110"
          />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[0.95rem] font-semibold text-ink">
            <span className="sr-only">View {product.name} </span>
            {label}
          </span>
          <span className="mt-0.5 block text-xs text-muted">
            PDF · {doc.pages} {doc.pages === 1 ? "page" : "pages"} · {doc.sizeKB} KB
          </span>
          <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
            <Eye className="size-3.5" aria-hidden />
            View instantly
          </span>
        </span>
      </a>
      <a
        href={url}
        download={doc.file}
        aria-label={`Download ${product.name} ${label}`}
        title="Download PDF"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-body transition-colors hover:border-brand-500/50 hover:bg-brandwash hover:text-brand-700"
      >
        <Download className="size-4" aria-hidden />
      </a>
    </div>
  );
}

function SpecSheetRequest({ product }: { product: CatalogProduct }) {
  return (
    <a
      href={`/contact?product=${product.slug}`}
      data-quote={product.slug}
      data-quote-message={`Please share the specification sheet for ${product.name}.`}
      className="group/req flex items-center gap-4 rounded-2xl border border-dashed border-brand-300/70 bg-brand-50/50 p-2.5 transition-colors hover:border-brand-500 hover:bg-brandwash"
    >
      <span className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-brand-600">
        <FileClock className="size-6" strokeWidth={1.5} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.95rem] font-semibold text-ink">{docLabels.COA.long}</span>
        <span className="mt-0.5 block text-xs text-muted">Shared on request with your quotation</span>
        <span className="mt-1.5 inline-flex text-xs font-semibold text-brand-700 group-hover/req:underline">Request document</span>
      </span>
    </a>
  );
}

export function CatalogCard({ product }: { product: CatalogProduct }) {
  const sheet = product.documents.find((d) => d.type === "COA");
  const search = [product.name, product.label, product.cas, product.formula, product.category, product.summary, ...product.uses]
    .join(" ")
    .toLowerCase();

  return (
    <li id={product.slug} data-catalog-card="" data-category={product.category} data-search={search} className="scroll-mt-32">
      <article className="flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-5 shadow-(--shadow-card) transition-[border-color,box-shadow] duration-500 hover:border-brand-500/25 hover:shadow-(--shadow-lift) sm:p-6">
        <header className="flex items-center justify-between gap-3">
          <p className="inline-flex min-w-0 items-center gap-2 text-[0.7rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
            <span className="size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
            <span className="truncate">{product.category}</span>
          </p>
          <span className="shrink-0 rounded-full border border-line bg-mist px-2.5 py-1 font-mono text-[0.7rem] font-medium text-ink">
            CAS {product.cas}
          </span>
        </header>

        <h3 className="mt-3 text-[1.625rem] leading-tight font-bold tracking-tight">{product.name}</h3>
        <p className="mt-1 font-mono text-[0.8rem] text-muted">
          {product.formula}
          {product.mw ? ` · ${product.mw} g/mol` : ""}
        </p>

        <p className="mt-4 text-[0.95rem] leading-relaxed">{product.summary}</p>

        {product.specs.length > 0 ? (
          <dl className="mt-5 flex gap-2">
            {product.specs.map((s) => (
              <div key={s.label} className="min-w-0 flex-1 rounded-xl border border-line/70 bg-mist/60 px-3 py-2.5">
                <dt className="truncate text-[0.66rem] font-semibold tracking-wider text-muted uppercase">{s.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Applications">
            {product.uses.map((u) => (
              <li key={u} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink/80">
                {u}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          {sheet ? <SpecSheet product={product} doc={sheet} /> : <SpecSheetRequest product={product} />}

          <footer className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-line pt-5">
            <a
              href={`/contact?product=${product.slug}`}
              data-quote={product.slug}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgb(30_99_214/0.8)] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
            >
              <Send className="size-4" aria-hidden />
              Request Quotation
            </a>
            <a
              href={whatsappLink(`Hello DS Global Ventures, I would like a quotation for ${product.name} (CAS ${product.cas}).`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-whatsapp transition-colors hover:border-whatsapp/50"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            {product.href ? (
              <Link
                href={product.href}
                className="group/link ml-auto inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-brand-700"
              >
                Product details
                <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
              </Link>
            ) : null}
          </footer>
        </div>
      </article>
    </li>
  );
}
