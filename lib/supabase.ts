import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Browser / client-side (anon key, respects RLS)
export const supabase = createClient(url, anon)

// Server-side / API routes (service role, bypasses RLS)
export const supabaseAdmin = createClient(url, svc)
