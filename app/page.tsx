'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Vine = {
id: number
content: string
created_at: string
}

export default function Page() {
const [session, setSession] = useState<any>(null)
const [vine, setVine] = useState('')
const [vines, setVines] = useState<Vine[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
// Initial session check
supabase.auth.getSession().then(({ data }) => {
setSession(data.session)
setLoading(false)
})

// Reactive auth listener (critical fix)
const {
data: { subscription },
} = supabase.auth.onAuthStateChange((_event, session) => {
setSession(session)
})

loadVines()

return () => subscription.unsubscribe()
}, [])

const loadVines = async () => {
const { data } = await supabase
.from('vines')
.select('id, content, created_at')
.order('created_at', { ascending: false })

if (data) setVines(data)
}

const postVine = async () => {
if (!session || !vine.trim()) return

const { error } = await supabase.from('vines').insert({
content: vine,
author_id: session.user.id,
})

if (!error) {
setVine('')
loadVines()
}
}

if (loading) {
return <p style={{ padding: 40 }}>Loading…</p>
}

return (
<main style={{ maxWidth: 900, margin: '40px auto', fontFamily: 'serif' }}>
{/* HERO */}
<section style={{ marginBottom: 40 }}>
<h1 style={{ fontSize: 42 }}>Polidish</h1>
<p><em>You are cordially invited to the Polidish venue.</em></p>
<p><strong>Freedom is deliberate.</strong></p>
</section>

{/* RULES */}
<section style={{ marginBottom: 40 }}>
<p>
This is a text-only venue. Speak plainly. Read carefully.
May the best mind win.
</p>
</section>

{/* JUNGLE THREAD */}
<section style={{ borderTop: '1px solid #000', paddingTop: 24 }}>
<h2>Jungle Thread</h2>

{!session && (
<p style={{ opacity: 0.7 }}>
Sign in required to post.
</p>
)}

{session && (
<p style={{ marginTop: 8, opacity: 0.85 }}>
Voilà. The venue invites your vine.
</p>
)}

<textarea
value={vine}
onChange={(e) => setVine(e.target.value)}
placeholder={session ? 'Dish politely…' : 'Sign in to post'}
disabled={!session}
style={{
width: '100%',
height: 120,
padding: 12,
fontSize: 16,
marginTop: 12,
}}
/>

<button
onClick={postVine}
disabled={!session || !vine.trim()}
style={{ marginTop: 12 }}
>
Post
</button>

<div style={{ marginTop: 40 }}>
{vines.map((v) => (
<div key={v.id} style={{ marginBottom: 24 }}>
<p>{v.content}</p>
<small style={{ opacity: 0.6 }}>
{new Date(v.created_at).toLocaleString()}
</small>
</div>
))}
</div>
</section>
</main>
)
}
