import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createToken, COOKIE } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const normalised = email.trim().toLowerCase()

  // Check against whitelist
  const { data: member, error } = await supabaseAdmin
    .from('cohort_members')
    .select('name, email')
    .eq('email', normalised)
    .single()

  if (error || !member) {
    return NextResponse.json(
      { error: 'This email is not in our cohort list. Please use the email you registered with.' },
      { status: 403 }
    )
  }

  // Upsert community profile (first login)
  await supabaseAdmin.from('community_profiles').upsert(
    { email: member.email, name: member.name },
    { onConflict: 'email', ignoreDuplicates: true }
  )

  const token = await createToken({ email: member.email, name: member.name })

  const res = NextResponse.json({ ok: true, name: member.name })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 24 * 30, // 30 days
    path:     '/',
  })
  return res
}
