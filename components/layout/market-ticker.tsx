import { Marquee } from "@/components/ui/marquee";
import { getCrudePrices, getForexRates, type MarketPrices, type MarketQuote } from "@/lib/market-prices";
import { cn } from "@/lib/utils";

function describe(what: string, { asOf, source }: MarketPrices) {
  return [what, asOf && `as of ${asOf}`, `delayed, indicative only · ${source}`].filter(Boolean).join(" · ");
}

function QuoteGroup({ quotes, prefix = "" }: { quotes: MarketQuote[]; prefix?: string }) {
  return (
    // margin and divider sit after the last quote too, so the marquee loop stays evenly spaced
    <dl className="mr-5 flex items-center gap-5 border-r border-line pr-5">
      {quotes.map(({ name, price, changePct }) => {
        const up = changePct !== null && changePct >= 0;
        return (
          <div key={name} className="flex items-center gap-1.5">
            <dt className="text-muted">{name}</dt>
            <dd className="font-semibold text-ink tabular-nums">
              {prefix}
              {price.toFixed(2)}
            </dd>
            {changePct !== null ? (
              <dd className={cn("text-[0.74rem] font-medium tabular-nums", up ? "text-up" : "text-down")}>
                <span aria-hidden>{up ? "▲" : "▼"}</span>
                <span className="sr-only">{up ? "up" : "down"}</span> {Math.abs(changePct).toFixed(2)}%
              </dd>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}

/**
 * Crude and rupee forex prices for the top utility bar — server-rendered from a cache refreshed every 5 minutes, no client JS.
 * The quotes scroll because they can't all fit on a phone; with reduced motion the strip stops and can be swiped instead.
 * Body font only: its size-adjusted fallback matches closely, so the web-font swap doesn't shift the bar (CLS).
 */
export async function MarketTicker() {
  const [crude, forex] = await Promise.all([getCrudePrices(), getForexRates()]);
  if (!crude && !forex) return null;

  const note = [
    crude && describe("Front-month futures (NYMEX WTI, ICE Brent), USD per barrel", crude),
    forex && describe("Forex rates, INR per one unit of currency", forex),
  ]
    .filter(Boolean)
    .join(" — ");

  return (
    <div className="flex h-8 min-w-0 flex-1 items-center gap-3 lg:h-auto lg:border-r lg:border-line lg:pr-5" title={note}>
      <span className="flex shrink-0 items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-ink uppercase">
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 motion-reduce:hidden" />
          <span className="relative size-1.5 rounded-full bg-brand-600" />
        </span>
        Live
        <span className="sr-only">crude oil and forex prices ({note})</span>
      </span>
      {/* capped below the width of one set of quotes, or a gap opens before the marquee loops on wide tablets */}
      <Marquee className="no-scrollbar max-w-3xl min-w-0 flex-1 motion-reduce:overflow-x-auto motion-reduce:mask-none [&>div]:[animation-duration:30s]">
        {crude ? <QuoteGroup quotes={crude.quotes} prefix="$" /> : null}
        {forex ? <QuoteGroup quotes={forex.quotes} /> : null}
      </Marquee>
    </div>
  );
}
