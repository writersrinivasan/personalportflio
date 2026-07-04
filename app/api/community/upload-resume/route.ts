import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const form = await req.formData()
  const file = form.get('resume') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const allowed = ['application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Only PDF or Word documents allowed' }, { status: 400 })
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File must be under 5 MB' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const path = `${session.email.replace('@', '_at_')}/resume.${ext}`
  const bytes = await file.arrayBuffer()

  const { error: uploadError } = await supabaseAdmin.storage
    .from('resumes')
    .upload(path, bytes, { contentType: file.type, upsert: true })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  await supabaseAdmin
    .from('community_profiles')
    .update({ resume_url: path, resume_name: file.name, updated_at: new Date().toISOString() })
    .eq('email', session.email)

  return NextResponse.json({ ok: true, path })
}
