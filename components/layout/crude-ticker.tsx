import { getCrudePrices } from "@/lib/crude-prices";
import { cn } from "@/lib/utils";

/**
 * WTI and Brent prices for the top utility bar — server-rendered from a cache refreshed every 5 minutes, no client JS.
 * Body font only: its size-adjusted fallback matches closely, so the web-font swap doesn't shift the bar (CLS).
 */
export async function CrudeTicker() {
  const data = await getCrudePrices();
  if (!data) return null;

  const note = [
    "Front-month futures (NYMEX WTI, ICE Brent), USD per barrel",
    data.asOf && `as of ${data.asOf}`,
    `delayed, indicative only · ${data.source}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex items-center gap-3 border-r border-line pr-5" title={note}>
      <span className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-ink uppercase">
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 motion-reduce:hidden" />
          <span className="relative size-1.5 rounded-full bg-brand-600" />
        </span>
        Live
        <span className="sr-only">crude oil prices, US dollars per barrel ({note})</span>
      </span>
      <dl className="flex items-center gap-3">
        {data.quotes.map(({ name, price, changePct }) => {
          const up = changePct !== null && changePct >= 0;
          return (
            <div key={name} className="flex items-center gap-1.5">
              <dt className="text-muted">{name}</dt>
              <dd className="font-semibold text-ink tabular-nums">${price.toFixed(2)}</dd>
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
    </div>
  );
}
