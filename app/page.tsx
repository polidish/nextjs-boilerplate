'use client'

import { useEffect, useState } from 'react'

type Post = {
email: string
content: string
created_at?: string
}

export default function JunglePage() {
const [posts, setPosts] = useState<Post[]>([])
const [loading, setLoading] = useState(true)

async function loadPosts() {
try {
const res = await fetch('/api/posts')
const data = await res.json()
setPosts(data.posts || [])
} finally {
setLoading(false)
}
}

useEffect(() => {
loadPosts()
const interval = setInterval(loadPosts, 5000)
return () => clearInterval(interval)
}, [])

return (
<div
style={{
backgroundColor: '#ffffff',
color: '#000000',
minHeight: '100vh',
padding: '30px',
fontFamily: 'Georgia, serif',
lineHeight: '1.6',
maxWidth: '900px',
margin: '0 auto',
}}
>
<h1
style={{
textAlign: 'center',
fontWeight: 'bold',
marginBottom: '10px',
fontSize: '2.2rem',
}}
>
The Jungle Thread
</h1>

<p style={{ textAlign: 'center', marginBottom: '20px', color: '#444' }}>
One continuous conversation. No likes. No labels. Just words.
</p>

<hr
style={{
border: '1px solid #000000',
marginBottom: '25px',
}}
/>

{loading && (
<p style={{ textAlign: 'center', color: '#666' }}>Loading…</p>
)}

{!loading && posts.length === 0 && (
<p style={{ textAlign: 'center', color: '#444444' }}>
No posts yet — first verified voice sets the tone.
</p>
)}

{posts.map((p, i) => (
<article
key={i}
style={{
padding: '10px 0',
borderBottom: '1px solid #dddddd',
marginBottom: '12px',
}}
>
<div
style={{
fontSize: '0.85rem',
color: '#555555',
marginBottom: '4px',
}}
>
{p.email}
{p.created_at && (
<> · {new Date(p.created_at).toLocaleString()}</>
)}
</div>
<div
style={{
fontSize: '1.02rem',
color: '#000000',
}}
>
{p.content}
</div>
</article>
))}
</div>
)
}
