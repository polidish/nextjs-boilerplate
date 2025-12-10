import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
try {
const { email, content } = await req.json()

if (!email || !content) {
return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
}

const { error } = await supabase.from('signups')
.insert([{ email, content }])

if (error) {
return NextResponse.json({ error: error.message }, { status: 500 })
}

return NextResponse.json({ success: true })
} catch (err) {
return NextResponse.json({ error: 'Server error' }, { status: 500 })
}
}
