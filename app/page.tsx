'use client'

import { useEffect, useState } from 'react'

export default function JunglePage() {
const [posts, setPosts] = useState([])

async function loadPosts() {
const res = await fetch('/api/posts')
const data = await res.json()
setPosts(data.posts || [])
}

useEffect(() => {
loadPosts()
const interval = setInterval(loadPosts, 5000)
return () => clearInterval(interval)
}, [])

return (
<div style={{
backgroundColor: '#ffffff',
color: '#000000',
minHeight: '100vh',
padding: '30px',
fontFamily: 'Georgia, serif',
lineHeight: '1.6'
}}>
<h1 style={{
textAlign: 'center',
fontWeight: 'bold',
marginBottom: '20px'
}}>
The Jungle Thread
</h1>

<hr style={{ border: '1px solid #000000', marginBottom: '25px' }} />

{posts.length === 0 && (
<p style={{ textAlign: 'center', color: '#444444' }}>
No posts yet — first voice sets the tone.
</p>
)}

{posts.length > 0 && posts.map((p, i) => (
<div key={i} style={{
padding: '10px 0',
borderBottom: '1px solid #dddddd',
marginBottom: '15px'
}}>
<div style={{ fontSize: '0.9em', color: '#555555' }}>
{p.email}
</div>
<div style={{ marginTop: '4px', fontSize: '1.1em', color: '#000000' }}>
{p.content}
</div>
</div>
))}
</div>
)
}
