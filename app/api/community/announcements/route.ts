import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('announcements')
    .select('id, title, body, tag, pinned, created_at')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
