"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { PRICES_TAG } from "@/lib/commodity-prices/data";
import { createSessionClient } from "@/lib/supabase/server";

export type SignInState = { error?: string };

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Those details didn’t work. Check your email and password." };
  redirect("/admin/prices");
}

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type PriceInput = { commodity: string; sector: string; previous: number | null; latest: number };
export type SavePricesInput = {
  previousDate: string | null;
  latestDate: string;
  method: "screenshot" | "paste" | "manual";
  rows: PriceInput[];
};
export type SavePricesResult = { ok: true; saved: number } | { ok: false; error: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const validDate = (d: string) => ISO_DATE.test(d) && !Number.isNaN(Date.parse(d));
const validPrice = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n) && n >= 0 && n < 1e10;

/**
 * Publishes reviewed prices: upserts the latest day (and the previous day, when given) for each commodity, logs
 * the update and refreshes /chemical-prices. Row-level security limits writes to emails in `price_admins`.
 */
export async function savePrices(input: SavePricesInput): Promise<SavePricesResult> {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Your session has expired — sign in again." };

  const { latestDate, previousDate, method } = input;
  if (!validDate(latestDate)) return { ok: false, error: "Set the date of the latest prices." };
  if (previousDate && (!validDate(previousDate) || previousDate >= latestDate)) {
    return { ok: false, error: "The previous date must be earlier than the latest date." };
  }
  if (!["screenshot", "paste", "manual"].includes(method)) return { ok: false, error: "Unknown upload method." };
  if (!Array.isArray(input.rows) || input.rows.length === 0) return { ok: false, error: "There are no rows to save." };
  if (input.rows.length > 500) return { ok: false, error: "Too many rows in one save (500 max)." };

  const records: { commodity: string; sector: string; price_date: string; price: number }[] = [];
  const seen = new Set<string>();
  for (const row of input.rows) {
    const commodity = String(row.commodity ?? "").replace(/\s+/g, " ").trim();
    const sector = String(row.sector ?? "").replace(/\s+/g, " ").trim() || "Chemical";
    if (!commodity || commodity.length > 80 || sector.length > 60) return { ok: false, error: `Check the name “${commodity || "(blank)"}”.` };
    if (seen.has(commodity.toLowerCase())) return { ok: false, error: `“${commodity}” appears twice — remove one.` };
    seen.add(commodity.toLowerCase());
    if (!validPrice(row.latest)) return { ok: false, error: `Check the latest price for ${commodity}.` };
    if (row.previous != null && !validPrice(row.previous)) return { ok: false, error: `Check the previous price for ${commodity}.` };

    records.push({ commodity, sector, price_date: latestDate, price: row.latest });
    if (previousDate && row.previous != null) records.push({ commodity, sector, price_date: previousDate, price: row.previous });
  }

  const { error } = await supabase.from("commodity_prices").upsert(
    records.map((r) => ({ ...r, updated_at: new Date().toISOString() })),
    { onConflict: "commodity,price_date" },
  );
  if (error) {
    return {
      ok: false,
      error: error.code === "42501" ? "This account isn’t allowed to publish prices (add its email to price_admins)." : error.message,
    };
  }

  await supabase.from("price_updates").insert({
    latest_date: latestDate,
    previous_date: previousDate,
    row_count: input.rows.length,
    method,
  });

  updateTag(PRICES_TAG);
  return { ok: true, saved: input.rows.length };
}
