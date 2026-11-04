import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { ChangeBadge, PricesTable } from "@/components/prices/prices-table";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getPublishedPrices, type PublishedPrice } from "@/lib/commodity-prices/data";
import { images } from "@/lib/images";

const description =
  "Daily China spot prices for industrial chemicals — n-Heptane, ECH, methanol, urea, titanium dioxide, PX and more — in RMB, with the day-on-day change. Source: SunSirs.";

export const metadata: Metadata = {
  title: "Chemical Spot Prices — Daily China Market Prices",
  description,
  alternates: { canonical: "/chemical-prices" },
  openGraph: { title: "Chemical Spot Prices | DS Global Ventures", description },
};

const fullDate = (iso: string | null) =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : null;

function Movers({ title, rows, icon: Icon, tone }: { title: string; rows: PublishedPrice[]; icon: typeof ArrowUpRight; tone: "up" | "down" }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-(--shadow-card)">
      <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-muted uppercase">
        <Icon aria-hidden className={tone === "up" ? "size-4 text-up" : "size-4 text-down"} />
        {title}
      </h2>
      {rows.length ? (
        <ul className="mt-4 divide-y divide-line">
          {rows.map((r) => (
            <li key={r.commodity} className="flex items-center justify-between gap-3 py-2.5">
              <span className="font-semibold text-ink">{r.commodity}</span>
              <ChangeBadge value={r.changePct} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-body">No moves in this direction.</p>
      )}
    </div>
  );
}

export default async function ChemicalPricesPage() {
  const data = await getPublishedPrices();
  const current = data.rows.filter((r) => r.latestDate === data.latestDate && r.changePct != null);
  const risers = current.filter((r) => r.changePct! > 0).sort((a, b) => b.changePct! - a.changePct!).slice(0, 4);
  const fallers = current.filter((r) => r.changePct! < 0).sort((a, b) => a.changePct! - b.changePct!).slice(0, 4);

  return (
    <>
      <PageHero
        image={images.petrochemPlant}
        crumbs={[{ label: "Chemical Prices", href: "/chemical-prices" }]}
        eyebrow="Market Prices"
        title="Chemical Spot Prices"
        lead="Daily China spot prices for key industrial chemicals, with the change from the previous day — a quick read on where the market is moving."
        compact
      >
        {data.latestDate ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-(--shadow-card)">
            <CalendarDays aria-hidden className="size-4 text-brand-600" />
            Prices as of {fullDate(data.latestDate)}
          </span>
        ) : null}
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-x">
          {data.rows.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-line bg-mist p-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Prices are being updated</h2>
              <p className="mt-3 leading-relaxed text-body">
                Today’s chemical spot prices will appear here shortly. For a current quotation on any chemical, contact our
                team.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <Movers title="Biggest rises" rows={risers} icon={ArrowUpRight} tone="up" />
                <Movers title="Biggest falls" rows={fallers} icon={ArrowDownRight} tone="down" />
              </div>
              <div className="mt-14">
                <PricesTable rows={data.rows} previousDate={data.previousDate} latestDate={data.latestDate} />
              </div>
            </>
          )}

          <Reveal className="mt-10 rounded-2xl border border-line bg-mist p-5 text-sm leading-relaxed text-body">
            <p>
              <strong className="text-ink">About these prices.</strong> Indicative China spot prices in RMB as published by{" "}
              <a href="https://www.sunsirs.com/CommodityPrice.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline underline-offset-2">
                SunSirs
              </a>{" "}
              (source: SunSirs), shown for market reference only. They are not DS Global Ventures’ selling prices or an offer
              to supply — contact us for a quotation based on your grade, quantity and delivery location.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Need a Quotation?"
        title="Prices Move Daily — Get a Firm Quote"
        text="Share the chemical, grade, quantity and delivery location, and our team will come back with current availability and pricing."
      />
    </>
  );
}
