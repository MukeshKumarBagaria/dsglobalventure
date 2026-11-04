"use client";

import { AlertTriangle, Check, ClipboardPaste, ImagePlus, Loader2, LogOut, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { changePct, matchKnownName, mergeRows, parsePriceText, type ParsedRow } from "@/lib/commodity-prices/parse";
import { cx as cn } from "@/lib/cx";
import { savePrices, signOut, type SavePricesResult } from "../actions";

export type RecentUpdate = {
  id: number;
  latest_date: string;
  previous_date: string | null;
  row_count: number;
  method: string;
  created_by: string;
  created_at: string;
};

type EditRow = {
  id: number;
  commodity: string;
  sector: string;
  previous: string;
  latest: string;
  printedChange: number | null;
  /** the admin confirmed a flagged row */
  confirmed: boolean;
};

let nextId = 1;
const toEdit = (r: ParsedRow): EditRow => ({
  id: nextId++,
  commodity: r.commodity,
  sector: r.sector,
  previous: r.previous == null ? "" : r.previous.toFixed(2),
  latest: r.latest.toFixed(2),
  printedChange: r.printedChange,
  confirmed: false,
});
const readNumber = (s: string) => (s.trim() === "" ? null : Number(s.replace(/,/g, "")));
const today = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time

function rowState(r: EditRow) {
  const previous = readNumber(r.previous);
  const latest = readNumber(r.latest);
  const invalid = !r.commodity.trim() || latest == null || Number.isNaN(latest) || (previous != null && Number.isNaN(previous));
  const computed = !invalid ? changePct(previous, latest!) : null;
  const flagged =
    !r.confirmed &&
    (invalid ||
      (r.printedChange != null && computed != null && Math.abs(r.printedChange - computed) > 0.02) ||
      (computed != null && Math.abs(computed) > 25));
  return { previous, latest, invalid, computed, flagged };
}

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

export function PriceUploader({ email, knownNames, recent }: { email: string; knownNames: string[]; recent: RecentUpdate[] }) {
  const [tab, setTab] = useState<"screenshot" | "paste">("screenshot");
  const [method, setMethod] = useState<"screenshot" | "paste" | "manual">("screenshot");
  const [rows, setRows] = useState<EditRow[]>([]);
  const [previousDate, setPreviousDate] = useState("");
  // empty until the table header is read (or "Today" is clicked) — a default here would differ between server and browser
  const [latestDate, setLatestDate] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SavePricesResult | null>(null);
  const [saving, startSaving] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);

  /** Add parsed rows (snapping names to known commodities) and take the dates from the table header */
  const addParsed = useCallback(
    (text: string, source: "screenshot" | "paste") => {
      const parsed = parsePriceText(text);
      const named = parsed.rows.map((r) => ({ ...r, commodity: matchKnownName(r.commodity, knownNames) }));
      if (parsed.latestDate) setLatestDate(parsed.latestDate);
      if (parsed.previousDate) setPreviousDate(parsed.previousDate);
      setMethod(source);
      setResult(null);
      setRows((current) => {
        const kept = current.filter((c) => !named.some((n) => n.commodity.toLowerCase() === c.commodity.trim().toLowerCase()));
        return [...kept, ...mergeRows(named).map(toEdit)];
      });
      return named.length;
    },
    [knownNames],
  );

  const readImages = useCallback(
    async (files: File[]) => {
      const images = files.filter((f) => f.type.startsWith("image/"));
      if (!images.length) return;
      setBusy(true);
      setTab("screenshot");
      try {
        const { readScreenshot } = await import("@/lib/commodity-prices/ocr");
        let total = 0;
        for (const [i, file] of images.entries()) {
          const label = images.length > 1 ? `Screenshot ${i + 1} of ${images.length}: ` : "";
          const text = await readScreenshot(file, ({ stage, progress, detail }) =>
            setStatus(
              `${label}${stage === "loading" ? `getting the reader ready${detail ? ` (${detail})` : ""} — first time only` : stage === "locating" ? "finding the table" : "reading prices"} ${Math.round(progress * 100)}%`,
            ),
          );
          total += addParsed(text, "screenshot");
        }
        setStatus(total ? `Read ${total} prices — check the highlighted rows, then save.` : "No price rows found. Try a screenshot of just the table, or paste it.");
      } catch (e) {
        setStatus(`Couldn’t read the image: ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setBusy(false);
      }
    },
    [addParsed],
  );

  // paste anywhere: an image is read as a screenshot, copied table text is parsed straight away
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea")) return;
      const files = [...(e.clipboardData?.files ?? [])];
      if (files.some((f) => f.type.startsWith("image/"))) {
        e.preventDefault();
        void readImages(files);
        return;
      }
      const text = e.clipboardData?.getData("text") ?? "";
      if (text.trim()) {
        e.preventDefault();
        setTab("paste");
        setPasteText(text);
        const n = addParsed(text, "paste");
        setStatus(n ? `Read ${n} prices from the pasted table.` : "No price rows found in the pasted text.");
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [addParsed, readImages]);

  const update = (id: number, patch: Partial<EditRow>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch, confirmed: patch.confirmed ?? false } : r)));

  const states = rows.map(rowState);
  const flaggedCount = states.filter((s) => s.flagged).length;
  const invalidCount = states.filter((s) => s.invalid).length;

  const save = () => {
    setResult(null);
    startSaving(async () => {
      const res = await savePrices({
        latestDate,
        previousDate: previousDate || null,
        method,
        rows: rows.map((r, i) => ({ commodity: r.commodity, sector: r.sector, previous: states[i].previous, latest: states[i].latest ?? NaN })),
      });
      setResult(res);
      if (res.ok) {
        setRows([]);
        setPasteText("");
        setStatus(null);
      }
    });
  };

  return (
    <div className="container-wide space-y-8 py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">Chemical prices</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Update prices</h1>
          <p className="mt-2 text-[0.95rem] text-body">
            Open the SunSirs Commodity Price page, take a screenshot of the table and drop it here — or copy the table and
            paste it. Check the rows, then save.
          </p>
        </div>
        <form action={signOut} className="flex items-center gap-3 text-sm text-muted">
          <span>{email}</span>
          <button type="submit" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-600">
            <LogOut aria-hidden className="size-4" /> Sign out
          </button>
        </form>
      </div>

      {/* ---------------------------------------------------------------- input */}
      <section className="rounded-3xl border border-line bg-white p-6 shadow-(--shadow-card) sm:p-8">
        <div role="tablist" aria-label="How to add prices" className="inline-flex rounded-full bg-mist p-1">
          {(
            [
              ["screenshot", "Screenshot", ImagePlus],
              ["paste", "Paste table", ClipboardPaste],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                tab === key ? "bg-white text-ink shadow-(--shadow-card)" : "text-muted hover:text-ink",
              )}
            >
              <Icon aria-hidden className="size-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === "screenshot" ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              void readImages([...e.dataTransfer.files]);
            }}
            className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/60 px-6 py-12 text-center"
          >
            <ImagePlus aria-hidden className="size-9 text-brand-600" strokeWidth={1.5} />
            <p className="font-semibold text-ink">Drop screenshots here, or press Ctrl / ⌘ + V to paste one</p>
            <p className="max-w-lg text-sm text-body">
              Several screenshots are fine (scroll and capture the rest of the table) — rows are merged. Reading happens in
              your browser; images aren’t uploaded or stored.
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() => fileInput.current?.click()}
              className="mt-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Choose images
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                void readImages([...(e.target.files ?? [])]);
                e.target.value = "";
              }}
            />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              rows={7}
              placeholder={"Select the table on SunSirs (from “Commodity” to the last row), copy it and paste here.\nn-Heptane\tChemical\t16,300.00\t17,000.00\t4.29%"}
              className="w-full rounded-2xl border border-line bg-white p-4 font-mono text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              type="button"
              onClick={() => {
                const n = addParsed(pasteText, "paste");
                setStatus(n ? `Read ${n} prices from the pasted table.` : "No price rows found in the pasted text.");
              }}
              className="rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-2.5 text-sm font-semibold text-white"
            >
              Read table
            </button>
          </div>
        )}

        {status ? (
          <p role="status" className="mt-5 flex items-center gap-2 text-sm text-body">
            {busy ? <Loader2 aria-hidden className="size-4 animate-spin text-brand-600" /> : null}
            {status}
          </p>
        ) : null}
      </section>

      {/* ---------------------------------------------------------------- review */}
      <section className="rounded-3xl border border-line bg-white p-6 shadow-(--shadow-card) sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Review {rows.length ? `${rows.length} prices` : "prices"}</h2>
            <p className="mt-1 text-sm text-body">
              Amber rows don’t add up (the two prices and the printed change disagree) — compare them with SunSirs and fix
              or confirm them.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="text-sm">
              <span className="block font-semibold text-ink">Previous date</span>
              <input
                type="date"
                value={previousDate}
                onChange={(e) => setPreviousDate(e.target.value)}
                className="mt-1 h-10 rounded-xl border border-line px-3 text-ink"
              />
            </label>
            <label className="text-sm">
              <span className="block font-semibold text-ink">Latest date</span>
              <span className="mt-1 flex items-center gap-2">
                <input
                  type="date"
                  value={latestDate}
                  onChange={(e) => setLatestDate(e.target.value)}
                  className="h-10 rounded-xl border border-line px-3 text-ink"
                />
                <button type="button" onClick={() => setLatestDate(today())} className="text-xs font-semibold text-brand-700 hover:text-brand-600">
                  Today
                </button>
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[46rem] text-sm">
            <thead className="bg-mist text-left text-xs tracking-wide text-muted uppercase">
              <tr>
                <th scope="col" className="px-3 py-3">Commodity</th>
                <th scope="col" className="px-3 py-3">Sector</th>
                <th scope="col" className="px-3 py-3 text-right">Previous (RMB)</th>
                <th scope="col" className="px-3 py-3 text-right">Latest (RMB)</th>
                <th scope="col" className="px-3 py-3 text-right">Change</th>
                <th scope="col" className="px-3 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-body">
                    Rows appear here after you add a screenshot or paste the table.
                  </td>
                </tr>
              ) : (
                rows.map((r, i) => {
                  const s = states[i];
                  const cell = "h-9 w-full rounded-lg border border-transparent bg-transparent px-2 text-ink outline-none hover:border-line focus:border-brand-500 focus:bg-white";
                  return (
                    <tr key={r.id} className={cn("border-t border-line", s.flagged && "bg-amber-50")}>
                      <td className="px-1 py-1.5">
                        <input aria-label="Commodity" value={r.commodity} onChange={(e) => update(r.id, { commodity: e.target.value })} className={cell} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input aria-label="Sector" value={r.sector} onChange={(e) => update(r.id, { sector: e.target.value })} className={cell} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input aria-label="Previous price" inputMode="decimal" value={r.previous} onChange={(e) => update(r.id, { previous: e.target.value })} className={cn(cell, "text-right tabular-nums")} />
                      </td>
                      <td className="px-1 py-1.5">
                        <input aria-label="Latest price" inputMode="decimal" value={r.latest} onChange={(e) => update(r.id, { latest: e.target.value })} className={cn(cell, "text-right tabular-nums")} />
                      </td>
                      <td className="px-3 py-1.5 text-right whitespace-nowrap tabular-nums">
                        {s.computed == null ? "—" : `${s.computed > 0 ? "+" : ""}${s.computed.toFixed(2)}%`}
                        {r.printedChange != null && s.computed != null && Math.abs(r.printedChange - s.computed) > 0.02 ? (
                          <span className="block text-xs text-amber-700">SunSirs: {r.printedChange.toFixed(2)}%</span>
                        ) : null}
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="flex justify-end gap-1">
                          {s.flagged && !s.invalid ? (
                            <button
                              type="button"
                              onClick={() => update(r.id, { confirmed: true })}
                              title="I’ve checked this row"
                              className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-200"
                            >
                              <Check aria-hidden className="size-3.5" /> Looks right
                            </button>
                          ) : null}
                          <button
                            type="button"
                            aria-label={`Remove ${r.commodity || "row"}`}
                            onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
                            className="rounded-full p-1.5 text-muted hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 aria-hidden className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setMethod((m) => (m === "screenshot" || m === "paste" ? m : "manual"));
              setRows((rs) => [...rs, { id: nextId++, commodity: "", sector: "Chemical", previous: "", latest: "", printedChange: null, confirmed: false }]);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600"
          >
            <Plus aria-hidden className="size-4" /> Add a row
          </button>
          <div className="flex flex-wrap items-center gap-4">
            {flaggedCount ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700">
                <AlertTriangle aria-hidden className="size-4" /> {flaggedCount} to check
              </span>
            ) : null}
            <button
              type="button"
              onClick={save}
              disabled={saving || rows.length === 0 || invalidCount > 0 || !latestDate}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgb(30_99_214/0.75)] disabled:opacity-50"
            >
              {saving ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
              {saving ? "Saving…" : `Save ${rows.length || ""} prices`}
            </button>
          </div>
        </div>
        {invalidCount ? <p className="mt-3 text-right text-sm text-red-600">Fill in a name and latest price for every row (or remove it).</p> : null}
        {result ? (
          <p role="status" className={cn("mt-4 rounded-xl px-4 py-3 text-sm", result.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700")}>
            {result.ok ? `Saved ${result.saved} prices — the public page is updated.` : result.error}
          </p>
        ) : null}
      </section>

      {/* ---------------------------------------------------------------- history */}
      <section className="rounded-3xl border border-line bg-white p-6 shadow-(--shadow-card) sm:p-8">
        <h2 className="text-xl font-bold tracking-tight">Recent updates</h2>
        {recent.length ? (
          <ul className="mt-4 divide-y divide-line text-sm">
            {recent.map((u) => (
              <li key={u.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <span className="text-ink">
                  <strong>{u.row_count}</strong> prices for {u.latest_date}
                  {u.previous_date ? ` and ${u.previous_date}` : ""} · via {u.method}
                </span>
                <span className="text-muted">
                  {fmtTime(u.created_at)} · {u.created_by}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-body">No updates yet.</p>
        )}
      </section>
    </div>
  );
}
