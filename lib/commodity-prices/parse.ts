/**
 * Turns SunSirs spot-price text — OCR of a screenshot, or the table copied and pasted — into rows.
 * Pure functions (no DOM, no network), shared by the admin uploader and its checks.
 *
 * SunSirs rows read: Commodity · Sector · <previous day price> · <latest day price> · Change %
 * e.g. "n-Heptane   Chemical   16,300.00   17,000.00   4.29%"
 */

export type ParsedRow = {
  commodity: string;
  sector: string;
  previous: number | null;
  latest: number;
  /** % change as printed in the source; null when it couldn't be read */
  printedChange: number | null;
  /** true when the two prices and the printed change don't agree — worth a human look before saving */
  check: boolean;
};

export type ParseResult = {
  rows: ParsedRow[];
  /** ISO dates of the previous and latest columns, when the header ("11-03  11-04") was read */
  previousDate: string | null;
  latestDate: string | null;
};

/** SunSirs sector labels (the eight industries), matched loosely so small OCR slips still hit */
const SECTORS: { label: string; re: RegExp }[] = [
  { label: "Chemical", re: /\bchem[il1]cals?\b/i },
  { label: "Energy", re: /\benergy\b/i },
  { label: "Rubber & Plastics", re: /\brubber\s*&\s*plastics?\b/i },
  { label: "Textile", re: /\btext[il1]les?\b/i },
  { label: "Non-ferrous Metals", re: /\bnon[\s-]?ferrous(\s+metals?)?\b/i },
  { label: "Steel", re: /\bsteel\b/i },
  { label: "Building Materials", re: /\bbu[il1]ld[il1]ng\s+materials?\b/i },
  { label: "Agricultural & Sideline Products", re: /\bagricultur\w*\s*&\s*side[l1]ine(\s+products?)?\b/i },
];

/**
 * SunSirs prints every price with exactly two decimals, so the digits alone fix the value: "16,300.00",
 * "16.300.00", "1630000" and "16,300 00" (all real OCR outputs) each give 16300.
 */
export function readPrice(token: string): number | null {
  const digits = token.replace(/[Oo]/g, "0").replace(/[lI|]/g, "1").replace(/\D/g, "");
  if (digits.length < 3 || digits.length > 12) return null;
  return Number(digits) / 100;
}

/** "4.29%", "429%", "-1.20%", "−0.5%" → 4.29, 4.29, -1.2, -0.5 (also two decimals) */
export function readChange(token: string): number | null {
  if (!/\d/.test(token)) return null;
  const negative = /^[\s(]*[-−–]/.test(token);
  const digits = token.replace(/\D/g, "");
  if (!digits || digits.length > 6) return null;
  const value = Number(digits) / 100;
  return negative ? -value : value;
}

export const changePct = (previous: number | null, latest: number) =>
  previous ? Math.round(((latest - previous) / previous) * 10000) / 100 : null;

/** Collapse spacing and stray OCR punctuation at the edges of a name */
export function cleanName(name: string) {
  return name
    .replace(/^[\s>»«|&+*.,:;'"`~_-]+/, "")
    .replace(/[\s>»«|&+*,:;'"`~_]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

/**
 * Snap an OCR'd name to a commodity already in the database ("Tetrachioroetylene" → "Tetrachloroethylene"),
 * so history isn't split across misspellings. Only close matches are taken.
 */
export function matchKnownName(name: string, known: string[]) {
  const lower = name.toLowerCase();
  let best: { name: string; distance: number } | null = null;
  for (const k of known) {
    const distance = levenshtein(lower, k.toLowerCase());
    if (distance === 0) return k;
    if (!best || distance < best.distance) best = { name: k, distance };
  }
  const allowed = Math.max(1, Math.floor(name.length / 6));
  return best && best.distance <= allowed ? best.name : name;
}

/** "11-04" → ISO date. SunSirs omits the year: take the reference year, or last year if that lands in the future. */
export function inferDate(month: number, day: number, reference = new Date()) {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  let year = reference.getFullYear();
  const candidate = Date.UTC(year, month - 1, day);
  if (candidate > Date.UTC(reference.getFullYear(), reference.getMonth(), reference.getDate()) + 7 * 86_400_000) year -= 1;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseHeaderDates(line: string, reference: Date) {
  const found = [...line.matchAll(/\b(\d{1,2})\s?[-–.]\s?(\d{1,2})\b/g)].map((m) => inferDate(Number(m[1]), Number(m[2]), reference));
  return found.filter((d): d is string => Boolean(d)).slice(0, 2);
}

/** Parse one table row; null when the line isn't one (menus, headings, OCR noise) */
export function parseRow(line: string): ParsedRow | null {
  // the sector cell anchors the row — take the last one on the line (a sidebar may print "Chemicals" earlier)
  let anchor: { label: string; index: number; length: number } | null = null;
  for (const s of SECTORS) {
    for (const m of line.matchAll(new RegExp(s.re.source, "gi"))) {
      if (!anchor || m.index > anchor.index) anchor = { label: s.label, index: m.index, length: m[0].length };
    }
  }
  if (!anchor) return null;

  // columns are separated by tabs (pasted) or runs of spaces (OCR keeps the gaps between columns)
  const cells = (text: string) => text.split(/\t|\s{2,}/).map((c) => c.trim()).filter(Boolean);
  const head = cells(line.slice(0, anchor.index));
  const tail = cells(line.slice(anchor.index + anchor.length));
  const commodity = cleanName(head.at(-1) ?? "");
  if (!commodity || !/[a-z]/i.test(commodity)) return null;

  const changeCell = tail.length >= 3 || tail.at(-1)?.includes("%") ? tail.at(-1)! : null;
  const priceCells = (changeCell ? tail.slice(0, -1) : tail).filter((c) => /\d/.test(c));
  if (priceCells.length === 0) return null;
  const prices = priceCells.slice(-2).map(readPrice);
  const latest = prices.at(-1);
  if (latest == null) return null;
  const previous = prices.length === 2 ? prices[0] : null;

  const printedChange = changeCell ? readChange(changeCell) : null;
  const computed = changePct(previous, latest);
  const check =
    previous == null ||
    (printedChange != null && computed != null && Math.abs(printedChange - computed) > 0.02) ||
    // a day-on-day move this large is far more likely a misread digit than a market move
    (computed != null && Math.abs(computed) > 25);

  return { commodity, sector: anchor.label, previous, latest, printedChange, check };
}

/** Parse a whole screenshot's OCR text or a pasted table */
export function parsePriceText(text: string, reference = new Date()): ParseResult {
  let dates: string[] = [];
  const rows: ParsedRow[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!dates.length && /commodity|sectors?/i.test(line)) dates = parseHeaderDates(line, reference);
    const row = parseRow(line);
    if (row) rows.push(row);
  }
  return { rows, previousDate: dates[0] ?? null, latestDate: dates[1] ?? null };
}

/** Merge rows from several screenshots — a commodity seen twice keeps its latest reading */
export function mergeRows(...lists: ParsedRow[][]) {
  const byName = new Map<string, ParsedRow>();
  for (const row of lists.flat()) byName.set(row.commodity.toLowerCase(), row);
  return [...byName.values()];
}
