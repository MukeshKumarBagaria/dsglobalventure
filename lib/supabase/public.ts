import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/supabase/config";

/**
 * Cookie-less client for public data (row-level security allows anonymous reads). It never touches the request,
 * so pages that use it can stay static and be cached with `use cache`.
 */
export function createPublicClient() {
  const config = supabaseConfig();
  if (!config) return null;
  return createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
