export default function Page() {
return (
<main style={{ background: '#c65a1e', minHeight: '100vh', padding: '40px' }}>

{/* TOP BANNER */}
<header style={{ background: '#fff', padding: '20px', textAlign: 'center' }}>
<em>Politely dishing politics.</em>
<br />
<strong>May the best mind win.</strong>
</header>

{/* HERO */}
<section style={{ marginTop: '40px' }}>
<h1 style={{ fontWeight: 'bold' }}>
Play fair.
<br />
You are cordially invited to the Polidish venue.
</h1>
<p><strong>Freedom is deliberate.</strong></p>
</section>

{/* MAIN LAYOUT */}
<section style={{
display: 'grid',
gridTemplateColumns: '1fr 2fr',
gap: '30px',
marginTop: '40px'
}}>

{/* LEFT COLUMN */}
<aside style={{ border: '4px solid #000', padding: '20px' }}>
<p><strong>Portrait / Ads / Pier / Peacock</strong></p>
<p>Blog</p>
<p>Store</p>
</aside>

{/* RIGHT COLUMN — JUNGLE THREAD */}
<div style={{ border: '4px solid #000', padding: '20px', background: '#111', color: '#fff' }}>
<h2>Members Sign-Up</h2>
<input
placeholder="your@email.com"
style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
/>
<button style={{ padding: '10px', background: '#f5c96a', border: 'none' }}>
Join
</button>

<div style={{ marginTop: '30px', border: '2px solid #555', padding: '20px' }}>
<em>Jungle loading…</em>
</div>
</div>

</section>

{/* FOOTER */}
<footer style={{ marginTop: '60px', fontSize: '14px' }}>
<p>Polidish LLC is not legally responsible for your poor judgment.</p>
<p>
If you endanger children, threaten terrorism, or break the law,
you reveal yourself.
</p>
<p>© 2025 Polidish LLC · Day I · 127 Minds</p>
</footer>

</main>
)
}
