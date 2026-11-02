import { cacheLife } from "next/cache";

export type CrudeQuote = {
  name: "WTI" | "Brent";
  price: number;
  /** % change against the previous settlement; null when the source doesn't give one */
  changePct: number | null;
};

export type CrudePrices = {
  quotes: CrudeQuote[];
  /** "Oct 30, 4:59 PM ET" — when the quotes were last traded */
  asOf: string | null;
  source: string;
};

/** NYMEX WTI and ICE Brent front-month futures, as listed on Yahoo Finance */
const SYMBOLS = [
  { name: "WTI", symbol: "CL=F" },
  { name: "Brent", symbol: "BZ=F" },
] as const;

const TIMEOUT_MS = 6000;

const marketTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

type YahooChart = {
  chart?: {
    result?: { meta: { regularMarketPrice?: number; chartPreviousClose?: number; regularMarketTime?: number } }[];
  };
};

/** Yahoo Finance chart API — free, no key, quotes delayed ~10 min. It rejects requests without a user agent. */
async function fromYahoo(): Promise<CrudePrices> {
  const metas = await Promise.all(
    SYMBOLS.map(async ({ symbol }) => {
      const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; DSGlobalVentures/1.0)" },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`Yahoo ${symbol}: HTTP ${res.status}`);
      const meta = ((await res.json()) as YahooChart).chart?.result?.[0]?.meta;
      if (!meta?.regularMarketPrice) throw new Error(`Yahoo ${symbol}: no price`);
      return meta;
    }),
  );
  const latest = Math.max(...metas.map((m) => m.regularMarketTime ?? 0));
  return {
    quotes: SYMBOLS.map(({ name }, i) => {
      const { regularMarketPrice: price = 0, chartPreviousClose: prev } = metas[i];
      return { name, price, changePct: prev ? ((price - prev) / prev) * 100 : null };
    }),
    asOf: latest ? `${marketTime.format(latest * 1000)} ET` : null,
    source: "Yahoo Finance",
  };
}

type OilPriceDemo = { data?: { prices?: { code: string; price: number }[] } };

/** Fallback: OilPriceAPI's keyless demo endpoint (25 requests a day per IP — fine behind the cache below). */
async function fromOilPriceApi(): Promise<CrudePrices> {
  const res = await fetch("https://api.oilpriceapi.com/v1/demo/prices", { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`OilPriceAPI: HTTP ${res.status}`);
  const prices = ((await res.json()) as OilPriceDemo).data?.prices ?? [];
  const price = (code: string) => prices.find((p) => p.code === code)?.price;
  const wti = price("WTI_USD");
  const brent = price("BRENT_CRUDE_USD");
  if (!wti || !brent) throw new Error("OilPriceAPI: missing WTI/Brent");
  // its `change_24h` isn't documented as % or $, so no change is shown from this source
  return {
    quotes: [
      { name: "WTI", price: wti, changePct: null },
      { name: "Brent", price: brent, changePct: null },
    ],
    asOf: null,
    source: "OilPriceAPI",
  };
}

/** Last successful result in this server process — shown through a brief outage instead of hiding the ticker */
let lastGood: CrudePrices | null = null;

/**
 * Crude benchmarks for the header. Cached on the server and refreshed in the background every 5 minutes, so pages
 * stay static and visitors never call the APIs themselves. No `expire`: a page is never held back waiting for a
 * refresh. When every source fails it falls back to the last good prices (null if there are none — the ticker then
 * doesn't render) and retries after a minute.
 */
export async function getCrudePrices(): Promise<CrudePrices | null> {
  "use cache";

  for (const source of [fromYahoo, fromOilPriceApi]) {
    try {
      lastGood = await source();
      cacheLife({ stale: 300, revalidate: 300 });
      return lastGood;
    } catch (error) {
      console.warn("[crude-prices]", error instanceof Error ? error.message : error);
    }
  }
  cacheLife({ stale: 300, revalidate: 60 }); // retry soon
  return lastGood;
}
