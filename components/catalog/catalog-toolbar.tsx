"use client";

import Link from "next/link";
import { Search, SearchX, X } from "lucide-react";
import { useRef, useState } from "react";
import { cx } from "@/lib/cx";

type DocFilter = "all" | "coa" | "msds";
type Filters = { q: string; category: string; docs: DocFilter };

const DOC_FILTERS: { value: DocFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "coa", label: "COA" },
  { value: "msds", label: "MSDS" },
];

/**
 * Search + filters for the catalogue. Cards are server-rendered (`[data-catalog-card]`)
 * and simply shown/hidden here, so the grid itself ships no client JavaScript.
 */
export function CatalogToolbar({ categories, total }: { categories: string[]; total: number }) {
  const [filters, setFilters] = useState<Filters>({ q: "", category: "All", docs: "all" });
  const [count, setCount] = useState(total);
  const inputRef = useRef<HTMLInputElement>(null);

  function apply(next: Filters) {
    setFilters(next);
    const term = next.q.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll<HTMLElement>("[data-catalog-card]").forEach((card) => {
      const ok =
        (next.category === "All" || card.dataset.category === next.category) &&
        (next.docs === "all" || (card.dataset.docs ?? "").split(" ").includes(next.docs)) &&
        (!term || (card.dataset.search ?? "").includes(term));
      card.hidden = !ok;
      if (ok) shown++;
    });
    setCount(shown);
  }

  const reset = () => {
    apply({ q: "", category: "All", docs: "all" });
    inputRef.current?.focus();
  };

  const filtered = filters.q !== "" || filters.category !== "All" || filters.docs !== "all";

  return (
    <>
      <div className="sticky top-20 z-30 rounded-[1.4rem] border border-line bg-white/95 p-2.5 shadow-[0_18px_44px_-24px_rgb(15_42_79/0.45)] backdrop-blur-xl">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <label className="relative flex-1 lg:max-w-sm">
            <span className="sr-only">Search the catalogue</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              ref={inputRef}
              type="search"
              value={filters.q}
              onChange={(e) => apply({ ...filters, q: e.target.value })}
              placeholder="Search product, CAS no. or application"
              className="h-11 w-full rounded-full border border-line bg-mist pr-10 pl-11 text-[0.95rem] text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
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

          <div className="no-scrollbar -mx-1 flex flex-1 gap-1.5 overflow-x-auto px-1" role="group" aria-label="Filter by category">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filters.category === c}
                onClick={() => apply({ ...filters, category: c })}
                className={cx(
                  "h-9 shrink-0 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                  filters.category === c ? "bg-brand-600 text-white" : "bg-mist text-body hover:bg-brandwash hover:text-brand-700",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full bg-mist p-1" role="group" aria-label="Filter by document">
            {DOC_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filters.docs === f.value}
                onClick={() => apply({ ...filters, docs: f.value })}
                className={cx(
                  "h-8 flex-1 rounded-full px-3.5 text-xs font-bold tracking-wide transition-colors lg:flex-none",
                  filters.docs === f.value ? "bg-white text-brand-700 shadow-(--shadow-card)" : "text-body hover:text-ink",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1 text-sm" aria-live="polite">
        <p>
          Showing <strong className="font-semibold text-ink">{count}</strong> of {total} products
        </p>
        {filtered ? (
          <button type="button" onClick={reset} className="font-semibold text-brand-700 hover:text-brand-600">
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
    </>
  );
}
