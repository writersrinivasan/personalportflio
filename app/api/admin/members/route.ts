import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { supabaseAdmin } from '@/lib/supabase'

const ADMIN_COOKIE = 'sr_admin_token'
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'sr-community-2026-fallback'
)

async function isAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload.role === 'admin'
  } catch { return false }
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('community_profiles')
    .select(`
      email, name, phone, whatsapp_consent, placement_consent,
      bio, linkedin_url, resume_url, resume_name, joined_at, updated_at
    `)
    .order('joined_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// Generate a signed resume download URL for a given member
export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  const { path } = await req.json()
  if (!path) return NextResponse.json({ error: 'No path' }, { status: 400 })

  const { data, error } = await supabaseAdmin.storage
    .from('resumes')
    .createSignedUrl(path, 60 * 60) // 1-hour signed URL

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ url: data.signedUrl })
}
