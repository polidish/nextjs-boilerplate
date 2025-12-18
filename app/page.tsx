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
supabase.auth.getSession().then(({ data }) => {
setSession(data.session)
setLoading(false)
})

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
<section style={{ marginBottom: 40 }}>
<h1 style={{ fontSize: 42 }}>Polidish</h1>
<p><em>You are cordially invited to the Polidish venue.</em></p>
<p><strong>Freedom is deliberate.</strong></p>
</section>

<section
style={{
backgroundColor: '#0A1A14',
color: '#EAEAEA',
padding: '24px',
borderRadius: '4px',
marginTop: '32px',
}}
>
<h2>Jungle Thread</h2>

{!session && (
<p style={{ opacity: 0.8 }}>
Sign in required to post.
</p>
)}

{session && (
<p>
<strong>You</strong> are verified. Discuss <em>your</em> political opinions here.
</p>
)}

<textarea
value={vine}
onChange={(e) => setVine(e.target.value)}
placeholder={session ? 'Dish politely…' : 'Sign in to post'}
disabled={!session}
style={{
width: '100%',
height: '120px',
marginTop: '12px',
padding: '12px',
fontSize: '16px',
backgroundColor: '#0F2A1D',
color: '#EAEAEA',
border: '1px solid #333',
borderRadius: '4px',
}}
/>

<button
onClick={postVine}
disabled={!session || !vine.trim()}
style={{ marginTop: '12px' }}
>
Post
</button>

<div style={{ marginTop: '32px' }}>
{vines.map((v) => (
<div key={v.id} style={{ marginBottom: '24px' }}>
<p>{v.content}</p>
<small style={{ color: '#B5B5B5' }}>
{new Date(v.created_at).toLocaleString()}
</small>
</div>
))}
</div>
</section>
</main>
)
}


