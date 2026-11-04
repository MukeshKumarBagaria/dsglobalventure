import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";

/** Cache tag on the published prices — the admin save action calls updateTag() with it */
export const PRICES_TAG = "commodity-prices";

export type PublishedPrice = {
  commodity: string;
  sector: string;
  currency: string;
  latestDate: string;
  latestPrice: number;
  previousDate: string | null;
  previousPrice: number | null;
  changePct: number | null;
};

export type PublishedPrices = {
  rows: PublishedPrice[];
  latestDate: string | null;
  previousDate: string | null;
  /** when an admin last saved prices (ISO timestamp) */
  updatedAt: string | null;
  /** set when Supabase isn't configured yet or the tables are missing — the page shows a placeholder */
  unavailable: boolean;
};

type ViewRow = {
  commodity: string;
  sector: string;
  currency: string;
  latest_date: string;
  latest_price: number | string;
  previous_date: string | null;
  previous_price: number | string | null;
  change_pct: number | string | null;
};

const num = (v: number | string | null) => (v == null ? null : Number(v));

/** Commodities not in the newest upload for this many days (dropped by SunSirs) stop being shown */
const STALE_DAYS = 10;

/**
 * Latest published prices for /chemical-prices. Cached and tagged, so the page stays static; an admin save
 * expires it at once (updateTag), and it also refreshes hourly in case rows are edited in Supabase directly.
 */
export async function getPublishedPrices(): Promise<PublishedPrices> {
  "use cache";
  cacheTag(PRICES_TAG);
  cacheLife("hours");

  const empty: PublishedPrices = { rows: [], latestDate: null, previousDate: null, updatedAt: null, unavailable: true };
  const supabase = createPublicClient();
  if (!supabase) return empty;

  const [prices, updates] = await Promise.all([
    supabase.from("latest_commodity_prices").select("*"),
    supabase.from("price_updates").select("created_at").order("created_at", { ascending: false }).limit(1),
  ]);
  if (prices.error) {
    console.warn("[commodity-prices]", prices.error.message);
    return empty;
  }

  const all = ((prices.data ?? []) as ViewRow[]).map<PublishedPrice>((r) => ({
    commodity: r.commodity,
    sector: r.sector,
    currency: r.currency,
    latestDate: r.latest_date,
    latestPrice: Number(r.latest_price),
    previousDate: r.previous_date,
    previousPrice: num(r.previous_price),
    changePct: num(r.change_pct),
  }));
  const latestDate = all.reduce<string | null>((max, r) => (!max || r.latestDate > max ? r.latestDate : max), null);
  const cutoff = latestDate ? new Date(Date.parse(latestDate) - STALE_DAYS * 86_400_000).toISOString().slice(0, 10) : null;
  const rows = all.filter((r) => !cutoff || r.latestDate >= cutoff).sort((a, b) => a.commodity.localeCompare(b.commodity));
  const current = rows.filter((r) => r.latestDate === latestDate);

  return {
    rows,
    latestDate,
    previousDate: current.find((r) => r.previousDate)?.previousDate ?? null,
    updatedAt: updates.data?.[0]?.created_at ?? null,
    unavailable: false,
  };
}
