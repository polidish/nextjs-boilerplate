// app/api/post/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function POST(req: Request) {
try {
const { email, content } = await req.json()

if (!email || !content) {
return NextResponse.json(
{ error: 'Email and content are required' },
{ status: 400 }
)
}

const { error } = await supabase.from('signups').insert([
{
email,
content,
},
])

if (error) {
return NextResponse.json({ error: error.message }, { status: 400 })
}

return NextResponse.json({ success: true })
} catch (err: any) {
return NextResponse.json({ error: err.message }, { status: 500 })
}
}
