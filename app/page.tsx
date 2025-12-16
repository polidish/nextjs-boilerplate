'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

/* === SUPABASE === */
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/* === AD ROTATION === */
const images = [
'/peacock.jpeg',
'/pier.jpeg',
'/decanter.jpeg',
]

const DURATIONS = [15000, 30000, 60000] // ms
const TRANSITION = 15000 // fade duration

export default function Page() {
const [indexes, setIndexes] = useState([0, 1, 2])
const [email, setEmail] = useState('')

useEffect(() => {
const timers = DURATIONS.map((duration, i) =>
setInterval(() => {
setIndexes(prev => {
const next = [...prev]
next[i] = (next[i] + 1) % images.length
return next
})
}, duration + TRANSITION)
)
return () => timers.forEach(clearInterval)
}, [])

const signIn = async () => {
if (!email) return
await supabase.auth.signInWithOtp({ email })
alert('Check your email for the link.')
}

return (
<main style={{ minHeight: '100vh', background: '#f5f1eb' }}>

{/* ===== HEADER ===== */}
<header style={{
display: 'flex',
alignItems: 'center',
padding: '16px',
background: '#fff',
borderBottom: '1px solid #000'
}}>
<img
src="/logo_polidish.png"
alt="Polidish"
style={{ height: 48 }}
/>
</header>

{/* ===== BODY ===== */}
<section style={{
display: 'grid',
gridTemplateColumns: '1fr 2fr',
gap: '16px',
padding: '16px'
}}>

{/* ===== LEFT COLUMN — ADS ===== */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
{[0, 1, 2].map(i => (
<div
key={i}
style={{
border: '2px solid #000',
height: 220,
overflow: 'hidden',
position: 'relative'
}}
>
<img
src={images[indexes[i]]}
alt="Ad"
style={{
width: '100%',
height: '100%',
objectFit: 'cover',
transition: `opacity ${TRANSITION}ms ease-in-out`
}}
/>
</div>
))}
</div>

{/* ===== RIGHT COLUMN — VENUE ===== */}
<div style={{
background: '#fff',
padding: '24px',
border: '2px solid #000',
display: 'flex',
flexDirection: 'column',
justifyContent: 'space-between'
}}>

{/* TITLE */}
<div>
<h1 style={{ marginBottom: 8 }}>
Politely Dishing Politics — May the Best Mind Win
</h1>

<h2 style={{ marginTop: 0 }}>
Welcome to the Jungle Thread
</h2>

{/* SIGN UP */}
<div style={{ marginTop: 16 }}>
<strong>Members Join</strong>
<div style={{ fontSize: 12 }}>
Membership is private. Your name appears only when you post.
</div>

<div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
<input
type="email"
placeholder="email"
value={email}
onChange={e => setEmail(e.target.value)}
style={{ padding: 8, flex: 1 }}
/>
<button onClick={signIn} style={{ padding: '8px 16px' }}>
Sign up
</button>
</div>
</div>
</div>

{/* JUNGLE THREAD PLACEHOLDER */}
<div style={{ marginTop: 32 }}>
{/* Jungle thread renders here */}
</div>
</div>
</section>

{/* ===== FOOTER ===== */}
<footer style={{
borderTop: '1px solid #000',
padding: '12px',
fontSize: 12,
display: 'flex',
justifyContent: 'space-between'
}}>
<div>
Polidish LLC is not legally responsible for your poor judgment.
If you endanger children, threaten terrorism, or break the law, you reveal yourself.
Two factor authentication. It’s a troll-free freedom fest.
</div>
<div style={{ fontSize: 10 }}>
© 2025 Polidish LLC · 127 Minds · Day 1
</div>
</footer>
</main>
)
}

