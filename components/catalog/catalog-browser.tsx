"use client";

import Link from "next/link";
import { ArrowRight, Search, SearchX, X } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";

type Filters = { q: string; category: string };

const ALL = "All";

/**
 * Catalogue layout with search + category filters. Cards are server-rendered children
 * (`[data-catalog-card]`) and simply shown/hidden here, so the grid itself ships no client JavaScript.
 */
export function CatalogBrowser({
  categories,
  total,
  children,
}: {
  categories: { name: string; count: number }[];
  total: number;
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<Filters>({ q: "", category: ALL });
  const [count, setCount] = useState(total);
  const inputRef = useRef<HTMLInputElement>(null);

  function apply(next: Filters) {
    setFilters(next);
    const term = next.q.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll<HTMLElement>("[data-catalog-card]").forEach((card) => {
      const ok =
        (next.category === ALL || card.dataset.category === next.category) && (!term || (card.dataset.search ?? "").includes(term));
      card.hidden = !ok;
      if (ok) shown++;
    });
    setCount(shown);
  }

  const reset = () => {
    apply({ q: "", category: ALL });
    inputRef.current?.focus();
  };

  const filtered = filters.q !== "" || filters.category !== ALL;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[17rem_minmax(0,1fr)] xl:gap-12">
      <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <div className="lg:rounded-[1.5rem] lg:border lg:border-line lg:bg-white lg:p-3 lg:shadow-(--shadow-card)">
          <label className="relative block">
            <span className="sr-only">Search the catalogue</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              ref={inputRef}
              type="search"
              value={filters.q}
              onChange={(e) => apply({ ...filters, q: e.target.value })}
              placeholder="Search product or CAS"
              className={cx(
                "h-11 w-full rounded-full border border-line bg-mist pl-11 text-[0.95rem] text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15 lg:rounded-xl",
                filters.q ? "pr-10" : "pr-4",
              )}
            />
            {filters.q ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => apply({ ...filters, q: "" })}
                className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-white hover:text-ink"
              >
                <X className="size-4" aria-hidden />
              </button>
            ) : null}
          </label>

          <p className="mt-5 hidden px-3 font-mono text-[0.66rem] tracking-[0.18em] text-muted uppercase lg:block">Categories</p>
          <div
            role="group"
            aria-label="Filter by category"
            className="no-scrollbar -mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0"
          >
            {[{ name: ALL, count: total }, ...categories].map((c) => {
              const active = filters.category === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => apply({ ...filters, category: c.name })}
                  className={cx(
                    "flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors lg:h-10 lg:justify-between lg:rounded-xl lg:px-3",
                    active ? "bg-brand-600 text-white" : "bg-mist text-body hover:bg-brandwash hover:text-brand-700 lg:bg-transparent",
                  )}
                >
                  {c.name === ALL ? "All products" : c.name}
                  <span className={cx("font-mono text-xs tabular-nums", active ? "text-white/75" : "text-muted")}>{c.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-4 hidden overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-600 to-navy-800 p-5 text-white lg:block">
          <div aria-hidden className="absolute -top-16 -right-16 size-40 rounded-full bg-white/10 blur-2xl" />
          <p className="relative font-display text-base font-bold">Can’t find your product?</p>
          <p className="relative mt-1.5 text-sm leading-relaxed text-white/75">
            We source many more industrial chemicals on request.
          </p>
          <Link
            href="/products/other-chemicals"
            className="group/cta relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white"
          >
            Send your requirement
            <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" aria-hidden />
          </Link>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex min-h-9 items-center justify-between gap-4 border-b border-line pb-4 text-sm" aria-live="polite">
          <p>
            Showing <strong className="font-semibold text-ink">{count}</strong> of {total} products
            {filters.category !== ALL ? (
              <>
                {" "}
                in <strong className="font-semibold text-ink">{filters.category}</strong>
              </>
            ) : null}
          </p>
          {filtered ? (
            <button type="button" onClick={reset} className="shrink-0 font-semibold text-brand-700 hover:text-brand-600">
              Clear filters
            </button>
          ) : null}
        </div>

        {count === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-[1.75rem] border border-dashed border-line bg-white px-6 py-14 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-brandwash text-brand-700">
              <SearchX className="size-7" strokeWidth={1.5} aria-hidden />
            </span>
            <p className="mt-5 font-display text-xl font-bold text-ink">No products match your search</p>
            <p className="mt-2 max-w-md">
              Try another name or CAS number — or send us your requirement and we will source it for you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-11 items-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-ink hover:border-brand-500 hover:text-brand-700"
              >
                Clear filters
              </button>
              <Link
                href="/products/other-chemicals"
                className="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-6 text-sm font-semibold text-white"
              >
                Send Your Requirement
              </Link>
            </div>
          </div>
        ) : null}

        {children}
      </div>
    </div>
  );
}
