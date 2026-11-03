import Link from "next/link";
import { ArrowRight, FileText, FlaskConical, LayoutGrid } from "lucide-react";
import { rangeIcons } from "@/components/layout/range-icons";
import type { ProductMenuCategory } from "@/content/main-nav";
import { cx as cn } from "@/lib/cx";

/**
 * Products dropdown — the range in category columns. Positioned against the header bar (not the menu item)
 * so the wide panel stays centred in the viewport.
 */
export function MegaMenu({
  open,
  categories,
  onNavigate,
}: {
  open: boolean;
  categories: ProductMenuCategory[];
  onNavigate: () => void;
}) {
  const tabIndex = open ? undefined : -1;

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "absolute top-full left-1/2 w-[min(72rem,calc(100vw-3rem))] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-(--ease-out-expo)",
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
      )}
    >
      <div className="rounded-3xl border border-line bg-white/95 p-3 shadow-[0_40px_80px_-30px_rgb(16_41_74/0.35)]">
        <div className="grid grid-cols-5 divide-x divide-line">
          {categories.map((c) => {
            const Icon = rangeIcons[c.id] ?? FlaskConical;
            return (
              <div key={c.id} className="px-3 pt-2 pb-3">
                <Link href={c.href} tabIndex={tabIndex} onClick={onNavigate} className="group flex items-center gap-2.5 rounded-xl p-1">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line bg-mist text-brand-600 transition-colors group-hover:border-brand-500/40 group-hover:bg-brandwash">
                    <Icon className="size-4" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="font-display text-[0.85rem] leading-tight font-bold text-ink transition-colors group-hover:text-brand-700">
                    {c.label}
                  </span>
                </Link>
                <ul className="mt-2.5 space-y-0.5 border-t border-line pt-2.5">
                  {c.items.map((item) => (
                    <li key={item.slug} className="flex items-center gap-1">
                      <Link
                        href={item.href}
                        tabIndex={tabIndex}
                        onClick={onNavigate}
                        className="min-w-0 flex-1 rounded-lg px-2 py-1.5 text-[0.875rem] leading-snug font-medium text-body transition-colors hover:bg-mist hover:text-brand-700"
                      >
                        {item.label}
                      </Link>
                      {item.doc ? (
                        // Plain link to the PDF; the site-wide catalogue controller opens it in the in-page viewer.
                        <a
                          href={item.doc.url}
                          data-doc-open={item.doc.id}
                          tabIndex={tabIndex}
                          onClick={onNavigate}
                          title={`View ${item.doc.types.join(" & ")}`}
                          aria-label={`View ${item.label} documents (${item.doc.types.join(", ")})`}
                          className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full border border-brand-500/20 bg-brandwash px-2 font-mono text-[0.62rem] font-bold tracking-wider text-brand-700 transition-colors hover:border-brand-500/60 hover:bg-white"
                        >
                          <FileText className="size-3" aria-hidden />
                          PDF
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-1 flex items-center gap-2 rounded-2xl bg-mist p-2 text-sm">
          <Link
            href="/products"
            tabIndex={tabIndex}
            onClick={onNavigate}
            className="group inline-flex h-10 items-center gap-2 rounded-xl px-3 font-semibold text-ink transition-colors hover:bg-white hover:text-brand-700"
          >
            <LayoutGrid className="size-4 text-brand-600" aria-hidden />
            All Products
          </Link>
          <Link
            href="/product-catalog"
            tabIndex={tabIndex}
            onClick={onNavigate}
            className="group inline-flex h-10 items-center gap-2 rounded-xl px-3 font-semibold text-ink transition-colors hover:bg-white hover:text-brand-700"
          >
            <FileText className="size-4 text-brand-600" aria-hidden />
            Product Catalogue
            <span className="font-mono text-[0.7rem] font-medium text-muted">COA &amp; MSDS</span>
          </Link>
          <Link
            href="/products/other-chemicals"
            tabIndex={tabIndex}
            onClick={onNavigate}
            className="group ml-auto inline-flex h-10 items-center gap-2 rounded-xl px-3 text-body transition-colors hover:bg-white"
          >
            Can&apos;t find your chemical?
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
              Send Your Requirement
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
