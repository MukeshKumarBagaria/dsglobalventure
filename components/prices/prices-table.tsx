"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { PublishedPrice } from "@/lib/commodity-prices/data";
import { cx as cn } from "@/lib/cx";

const money = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const day = (iso: string | null) =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }) : "—";

type Sort = "name" | "rise" | "fall";

export function ChangeBadge({ value }: { value: number | null }) {
  if (value == null) return <span className="text-muted">—</span>;
  const dir = value > 0 ? "up" : value < 0 ? "down" : "flat";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[0.78rem] font-semibold tabular-nums",
        dir === "up" && "bg-up/10 text-up",
        dir === "down" && "bg-down/10 text-down",
        dir === "flat" && "bg-mist text-muted",
      )}
    >
      <span aria-hidden>{dir === "up" ? "▲" : dir === "down" ? "▼" : "•"}</span>
      <span className="sr-only">{dir === "up" ? "up" : dir === "down" ? "down" : "unchanged"}</span>
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

/** Searchable, sortable list of the latest prices (the full list is small, so filtering happens in the browser) */
export function PricesTable({ rows, previousDate, latestDate }: { rows: PublishedPrice[]; previousDate: string | null; latestDate: string | null }) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");
  const [sort, setSort] = useState<Sort>("name");
  const sectors = useMemo(() => ["All", ...new Set(rows.map((r) => r.sector))], [rows]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((r) => (sector === "All" || r.sector === sector) && (!q || r.commodity.toLowerCase().includes(q)));
    const change = (r: PublishedPrice) => r.changePct ?? 0;
    return list.sort((a, b) =>
      sort === "rise" ? change(b) - change(a) : sort === "fall" ? change(a) - change(b) : a.commodity.localeCompare(b.commodity),
    );
  }, [rows, query, sector, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block sm:w-80">
          <span className="sr-only">Search commodities</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a chemical…"
            className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-10 text-[0.95rem] text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {sectors.length > 2
            ? sectors.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={sector === s}
                  onClick={() => setSector(s)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    sector === s ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white text-body hover:border-brand-500",
                  )}
                >
                  {s}
                </button>
              ))
            : null}
          <label className="text-sm text-muted">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 rounded-full border border-line bg-white px-4 text-[0.95rem] text-ink outline-none focus:border-brand-500"
            >
              <option value="name">Sort: A–Z</option>
              <option value="rise">Sort: Biggest rise</option>
              <option value="fall">Sort: Biggest fall</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-white shadow-(--shadow-card)">
        <table className="w-full text-[0.95rem]">
          <caption className="sr-only">Chemical spot prices in RMB, {day(previousDate)} and {day(latestDate)}</caption>
          <thead className="bg-mist text-left text-xs font-semibold tracking-[0.08em] text-muted uppercase">
            <tr>
              <th scope="col" className="px-4 py-3.5 sm:px-6">Commodity</th>
              <th scope="col" className="hidden px-4 py-3.5 md:table-cell">Sector</th>
              <th scope="col" className="hidden px-4 py-3.5 text-right sm:table-cell">{day(previousDate)}</th>
              <th scope="col" className="px-4 py-3.5 text-right">{day(latestDate)}</th>
              <th scope="col" className="px-4 py-3.5 text-right sm:px-6">Change</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.commodity} className="border-t border-line transition-colors hover:bg-brand-50/50">
                <th scope="row" className="px-4 py-3.5 text-left font-semibold text-ink sm:px-6">
                  {r.commodity}
                  <span className="block text-xs font-normal text-muted md:hidden">{r.sector}</span>
                </th>
                <td className="hidden px-4 py-3.5 text-body md:table-cell">{r.sector}</td>
                <td className="hidden px-4 py-3.5 text-right font-mono text-[0.88rem] text-body tabular-nums sm:table-cell">
                  {r.previousPrice == null ? "—" : money.format(r.previousPrice)}
                </td>
                <td className="px-4 py-3.5 text-right font-mono text-[0.88rem] font-semibold text-ink tabular-nums">
                  {money.format(r.latestPrice)}
                  {r.latestDate !== latestDate ? <span className="block text-[0.7rem] font-normal text-muted">{day(r.latestDate)}</span> : null}
                </td>
                <td className="px-4 py-3.5 text-right sm:px-6">
                  <ChangeBadge value={r.changePct} />
                </td>
              </tr>
            ))}
            {shown.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-body">
                  No chemical matches “{query}”.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted">
        Showing {shown.length} of {rows.length} commodities.
      </p>
    </div>
  );
}
