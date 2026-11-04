import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from "@/lib/supabase/config";

/**
 * Cookie-based client for the admin area: carries the signed-in user's session, so row-level security sees who is
 * writing. Reads the request, so only use it behind <Suspense> or in Server Actions.
 */
export async function createSessionClient() {
  const config = supabaseConfig();
  if (!config) throw new Error("Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  const cookieStore = await cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only — proxy.ts refreshes the session instead.
        }
      },
    },
  });
}
