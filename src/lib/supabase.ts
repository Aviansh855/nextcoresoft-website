import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
// New publishable key is preferred. The legacy anon key is supported for older projects.
// Never put a service_role / secret key in a VITE_ variable.
const publishableKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  ""
).trim()

export const isSupabaseConfigured = Boolean(url && publishableKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url, publishableKey, {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

export function authRedirectUrl(path = "/auth/callback/") {
  return `${window.location.origin}${path}`
}
