import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";
import { signOut } from "../actions";
import { PriceUploader, type RecentUpdate } from "./price-uploader";

export default function AdminPricesPage() {
  return (
    // the session is read per request, so the page streams in behind this boundary
    <Suspense fallback={<p className="container-wide py-16 text-body">Loading…</p>}>
      <AdminPrices />
    </Suspense>
  );
}

function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="container-x py-16">
      <div className="mx-auto max-w-xl rounded-3xl border border-line bg-white p-8 shadow-(--shadow-card)">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-body">{children}</div>
      </div>
    </section>
  );
}

async function AdminPrices() {
  let supabase: Awaited<ReturnType<typeof createSessionClient>>;
  try {
    supabase = await createSessionClient();
  } catch {
    return (
      <Notice title="Supabase isn’t connected">
        <p>Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to the environment and redeploy.</p>
      </Notice>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = await supabase.from("price_admins").select("email").maybeSingle();
  if (admin.error) {
    return (
      <Notice title="Finish the database setup">
        <p>The price tables don’t exist yet. In Supabase, open SQL Editor and run the file supabase/schema.sql from this project.</p>
        <p className="font-mono text-xs text-muted">{admin.error.message}</p>
      </Notice>
    );
  }
  if (!admin.data) {
    return (
      <Notice title="This account can’t publish prices">
        <p>
          You’re signed in as <strong>{user.email}</strong>. To allow it, run in Supabase SQL Editor:
        </p>
        <pre className="overflow-x-auto rounded-xl bg-mist p-4 font-mono text-xs text-ink">
          {`insert into public.price_admins (email)\nvalues ('${(user.email ?? "").toLowerCase()}');`}
        </pre>
        <form action={signOut}>
          <button type="submit" className="text-sm font-semibold text-brand-700 hover:text-brand-600">
            Sign out
          </button>
        </form>
      </Notice>
    );
  }

  const [latest, updates] = await Promise.all([
    supabase.from("latest_commodity_prices").select("commodity"),
    supabase
      .from("price_updates")
      .select("id, latest_date, previous_date, row_count, method, created_by, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return (
    <PriceUploader
      email={user.email ?? ""}
      knownNames={(latest.data ?? []).map((r: { commodity: string }) => r.commodity)}
      recent={(updates.data ?? []) as RecentUpdate[]}
    />
  );
}
