import Link from "next/link";
import { ArrowUpRight, Download, Eye, FileClock, Send } from "lucide-react";
import { Img } from "@/components/ui/img";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  docLabels,
  documentUrl,
  previewUrl,
  PREVIEW_SIZE,
  type CatalogDoc,
  type CatalogProduct,
  type DocType,
} from "@/content/catalog";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const badge: Record<DocType, string> = {
  COA: "bg-brand-600 text-white",
  MSDS: "bg-amber-400 text-ink",
};

function DocTile({ product, doc }: { product: CatalogProduct; doc: CatalogDoc }) {
  const url = documentUrl(doc);
  const label = docLabels[doc.type].long;
  return (
    <div className="group/doc relative overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow,transform] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-(--shadow-lift)">
      {/* Works as a plain PDF link without JS; the catalogue controller opens the in-page viewer. */}
      <a
        href={url}
        data-doc-open={doc.id}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-mist">
          <Img
            src={previewUrl(doc)}
            alt=""
            width={PREVIEW_SIZE.width}
            height={PREVIEW_SIZE.height}
            sizes="(min-width: 1280px) 300px, (min-width: 1024px) 24vw, (min-width: 640px) 45vw, 46vw"
            className="absolute inset-x-0 top-0 h-auto w-full origin-top transition-transform duration-700 ease-(--ease-out-expo) group-hover/doc:scale-[1.04]"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
          <span className={cn("absolute top-3 left-3 rounded-md px-2 py-0.5 font-mono text-[0.68rem] font-bold tracking-wider shadow-sm", badge[doc.type])}>
            {doc.type}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-brand-700/0 opacity-0 transition-all duration-300 group-hover/doc:bg-brand-700/10 group-hover/doc:opacity-100"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-(--shadow-lift)">
              <Eye className="size-4" />
              View document
            </span>
          </span>
        </div>
        <div className="py-3 pr-14 pl-3.5">
          <p className="truncate text-sm font-semibold text-ink">
            <span className="sr-only">View {product.name} </span>
            {label}
          </p>
          <p className="mt-0.5 text-xs text-muted">
            PDF · {doc.pages} {doc.pages === 1 ? "page" : "pages"} · {doc.sizeKB} KB
          </p>
        </div>
      </a>
      <a
        href={url}
        download={doc.file}
        aria-label={`Download ${product.name} ${label}`}
        title="Download PDF"
        className="absolute right-2.5 bottom-2.5 flex size-9 items-center justify-center rounded-full border border-line bg-white text-body transition-colors hover:border-brand-500/50 hover:bg-brandwash hover:text-brand-700"
      >
        <Download className="size-4" aria-hidden />
      </a>
    </div>
  );
}

function RequestTile({ product, type }: { product: CatalogProduct; type: DocType }) {
  const label = docLabels[type].long;
  return (
    <a
      href={`/contact?product=${product.slug}`}
      data-quote={product.slug}
      data-quote-message={`Please share the ${type === "COA" ? "COA / specification" : "MSDS"} for ${product.name}.`}
      className="group/req flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-300/70 bg-brand-50/60 p-4 text-center transition-colors hover:border-brand-500 hover:bg-brandwash"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-(--shadow-card)">
        <FileClock className="size-5" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="mt-3 text-sm font-semibold text-ink">{label}</span>
      <span className="mt-0.5 text-xs text-muted">Available on request</span>
      <span className="mt-3 text-xs font-semibold text-brand-700 group-hover/req:underline">Request document</span>
    </a>
  );
}

export function CatalogCard({ product }: { product: CatalogProduct }) {
  const has = (t: DocType) => product.documents.some((d) => d.type === t);
  const search = [product.name, product.label, product.cas, product.formula, product.category, product.summary, ...product.uses]
    .join(" ")
    .toLowerCase();

  return (
    <li
      id={product.slug}
      data-catalog-card=""
      data-category={product.category}
      data-docs={product.documents.map((d) => d.type.toLowerCase()).join(" ")}
      data-search={search}
      className="scroll-mt-44"
    >
      <article className="flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-5 shadow-(--shadow-card) transition-shadow duration-500 hover:shadow-(--shadow-lift) sm:p-6">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">{product.category}</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">{product.name}</h3>
            <p className="mt-1 font-mono text-[0.8rem] text-body">
              {product.formula}
              {product.mw ? ` · ${product.mw} g/mol` : ""}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-line bg-mist px-3 py-1 font-mono text-[0.72rem] font-medium text-ink">
            CAS {product.cas}
          </span>
        </header>

        <p className="mt-4 text-[0.95rem] leading-relaxed">{product.summary}</p>

        {product.specs.length > 0 ? (
          <dl className="mt-5 grid grid-cols-3 gap-2">
            {product.specs.map((s) => (
              <div key={s.label} className="rounded-xl bg-mist px-3 py-2.5">
                <dt className="truncate text-[0.68rem] font-medium tracking-wide text-muted uppercase">{s.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Applications">
            {product.uses.map((u) => (
              <li key={u} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink/80">
                {u}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          {(["COA", "MSDS"] as const).map((t) => {
            const d = product.documents.find((x) => x.type === t);
            return d ? <DocTile key={t} product={product} doc={d} /> : <RequestTile key={t} product={product} type={t} />;
          })}
        </div>

        <footer className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
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
        {!has("COA") && !has("MSDS") ? <span className="sr-only">Documents available on request.</span> : null}
      </article>
    </li>
  );
}
