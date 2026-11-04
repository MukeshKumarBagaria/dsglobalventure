import { cacheLife } from "next/cache";

export type MarketQuote = {
  name: string;
  price: number;
  /** % change against the previous close or settlement; null when the source doesn't give one */
  changePct: number | null;
};

export type MarketPrices = {
  quotes: MarketQuote[];
  /** "Oct 30, 4:59 PM ET" — when the quotes were last traded */
  asOf: string | null;
  source: string;
};

type YahooSymbol = { name: string; symbol: string };

/** NYMEX WTI and ICE Brent front-month futures, as listed on Yahoo Finance */
const CRUDE_SYMBOLS: YahooSymbol[] = [
  { name: "WTI", symbol: "CL=F" },
  { name: "Brent", symbol: "BZ=F" },
];

/** Rupees per one unit of each currency, as listed on Yahoo Finance */
const FOREX_SYMBOLS: YahooSymbol[] = [
  { name: "USD/INR", symbol: "INR=X" },
  { name: "EUR/INR", symbol: "EURINR=X" },
  { name: "GBP/INR", symbol: "GBPINR=X" },
];

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
async function fromYahoo(symbols: YahooSymbol[]): Promise<MarketPrices> {
  const metas = await Promise.all(
    symbols.map(async ({ symbol }) => {
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
    quotes: symbols.map(({ name }, i) => {
      const { regularMarketPrice: price = 0, chartPreviousClose: prev } = metas[i];
      return { name, price, changePct: prev ? ((price - prev) / prev) * 100 : null };
    }),
    asOf: latest ? `${marketTime.format(latest * 1000)} ET` : null,
    source: "Yahoo Finance",
  };
}

type OilPriceDemo = { data?: { prices?: { code: string; price: number }[] } };

/** Crude fallback: OilPriceAPI's keyless demo endpoint (25 requests a day per IP — fine behind the cache below). */
async function fromOilPriceApi(): Promise<MarketPrices> {
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

type CurrencyApi = { date?: string; usd?: Record<string, number> };

/** Forex fallback: the keyless currency-api package on jsDelivr. Rates refresh daily, so no change is shown from it. */
async function fromCurrencyApi(): Promise<MarketPrices> {
  const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json", {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`currency-api: HTTP ${res.status}`);
  const { date, usd } = (await res.json()) as CurrencyApi;
  const { inr, eur, gbp } = usd ?? {};
  if (!inr || !eur || !gbp) throw new Error("currency-api: missing INR/EUR/GBP");
  return {
    quotes: [
      { name: "USD/INR", price: inr, changePct: null },
      { name: "EUR/INR", price: inr / eur, changePct: null },
      { name: "GBP/INR", price: inr / gbp, changePct: null },
    ],
    asOf: date ?? null,
    source: "currency-api",
  };
}

/** The first source that answers; null when they all fail */
async function firstAvailable(sources: (() => Promise<MarketPrices>)[]): Promise<MarketPrices | null> {
  for (const source of sources) {
    try {
      return await source();
    } catch (error) {
      console.warn("[market-prices]", error instanceof Error ? error.message : error);
    }
  }
  return null;
}

/** Last successful results in this server process — shown through a brief outage instead of hiding the quotes */
let lastCrude: MarketPrices | null = null;
let lastForex: MarketPrices | null = null;

/**
 * Crude benchmarks for the header. Cached on the server and refreshed in the background every 5 minutes, so pages
 * stay static and visitors never call the APIs themselves. No `expire`: a page is never held back waiting for a
 * refresh. When every source fails it falls back to the last good prices (null if there are none — the ticker then
 * leaves them out) and retries after a minute.
 */
export async function getCrudePrices(): Promise<MarketPrices | null> {
  "use cache";

  const prices = await firstAvailable([() => fromYahoo(CRUDE_SYMBOLS), fromOilPriceApi]);
  cacheLife({ stale: 300, revalidate: prices ? 300 : 60 });
  if (prices) lastCrude = prices;
  return lastCrude;
}

/** Rupee exchange rates for the header, cached and falling back the same way as the crude prices above. */
export async function getForexRates(): Promise<MarketPrices | null> {
  "use cache";

  const rates = await firstAvailable([() => fromYahoo(FOREX_SYMBOLS), fromCurrencyApi]);
  cacheLife({ stale: 300, revalidate: rates ? 300 : 60 });
  if (rates) lastForex = rates;
  return lastForex;
}
