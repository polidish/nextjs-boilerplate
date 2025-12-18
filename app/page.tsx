'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Page() {
const [session, setSession] = useState<any>(null)
const [vine, setVine] = useState('')
const [loading, setLoading] = useState(true)

useEffect(() => {
// Get initial session
supabase.auth.getSession().then(({ data }) => {
setSession(data.session)
setLoading(false)
})

// Listen for auth changes
const {
data: { subscription },
} = supabase.auth.onAuthStateChange((_event, session) => {
setSession(session)
})

return () => subscription.unsubscribe()
}, [])

const submitVine = async () => {
if (!session || !vine.trim()) return

const { error } = await supabase.from('vines').insert({
content: vine,
author_id: session.user.id,
})

if (!error) {
setVine('')
}
}

if (loading) {
return <p>Loading…</p>
}

return (
<main style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'serif' }}>
<h1>Jungle Thread</h1>

{!session && (
<p style={{ opacity: 0.7 }}>
Sign in required to post.
</p>
)}

<textarea
placeholder={session ? 'Dish politely…' : 'Sign in to post'}
value={vine}
onChange={(e) => setVine(e.target.value)}
disabled={!session}
style={{
width: '100%',
height: 120,
padding: 12,
marginTop: 12,
fontSize: 16,
}}
/>

<button
onClick={submitVine}
disabled={!session || !vine.trim()}
style={{ marginTop: 12 }}
>
Post
</button>
</main>
)
}
