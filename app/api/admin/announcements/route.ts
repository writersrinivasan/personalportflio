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
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('announcements')
    .select('*')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { title, body, tag, pinned } = await req.json()
  if (!title?.trim() || !body?.trim()) {
    return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('announcements')
    .insert({ title: title.trim(), body: body.trim(), tag: tag || 'General', pinned: !!pinned })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  const { error } = await supabaseAdmin.from('announcements').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
