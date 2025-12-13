export default function Home() {
return (
<main style={{ background: '#1a0f0a', minHeight: '100vh' }}>

{/* TOP BANNER */}
<div
style={{
background: '#ffffff',
color: '#b45a1c', // burnt orange (tanner)
padding: '20px 40px',
fontSize: '28px',
fontStyle: 'italic',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
borderBottom: '4px solid #000'
}}
>
<div>
Politely dishing politics. <strong>May the best mind win.</strong>
</div>

<button
style={{
background: '#ffffff',
color: '#000',
border: '2px solid #000',
padding: '10px 18px',
fontSize: '16px',
cursor: 'pointer'
}}
>
Members Sign-Up · 18+
</button>
</div>

{/* HERO */}
<section
style={{
display: 'grid',
gridTemplateColumns: '1fr 2fr',
gap: '30px',
padding: '40px',
maxWidth: '1400px',
margin: '0 auto'
}}
>

{/* LEFT COLUMN — OUTPOST */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

{/* PIER */}
<div style={photoBox('/pier.jpg')}>
<span style={overlayText}>Picture Your Ad</span>
</div>

{/* DECANTER */}
<div style={photoBox('/decanter.jpg')}>
<span style={overlayText}>Decanter</span>
</div>

{/* PEACOCK */}
<div style={photoBox('/peacock.jpg')}>
<span style={overlayText}>Peacock</span>
</div>

</div>

{/* RIGHT COLUMN — JUNGLE THREAD */}
<div
style={{
background: '#ffffff',
color: '#000',
padding: '30px',
minHeight: '600px',
border: '4px solid #000'
}}
>
<h2 style={{ marginTop: 0 }}>Polidish</h2>
<p style={{ fontSize: '18px', lineHeight: '1.6' }}>
Welcome to the Jungle Thread.
</p>
<p style={{ fontSize: '16px', color: '#333' }}>
This is a public reading venue.
Members post. Minds compete.
No moderation. No referees.
</p>
</div>

</section>
</main>
)
}

/* helpers */
const photoBox = (src: string) => ({
position: 'relative' as const,
height: '180px',
backgroundImage: `url(${src})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
border: '4px solid #000'
})

const overlayText = {
position: 'absolute' as const,
bottom: '12px',
left: '12px',
color: '#f5c26b', // gold overlay
fontSize: '20px',
fontWeight: 600,
textShadow: '1px 1px 2px #000'
}

