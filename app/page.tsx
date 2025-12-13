export default function Page() {
return (
<main
style={{
minHeight: '100vh',
background: '#c55a1d', // burnt orange
fontFamily: 'Georgia, serif',
}}
>
{/* TOP BANNER */}
<section
style={{
background: '#fff',
color: '#c55a1d',
textAlign: 'center',
padding: '20px',
borderBottom: '4px solid #000',
fontStyle: 'italic',
}}
>
<h1 style={{ margin: 0 }}>
Politely dishing politics. <br />
May the best mind win.
</h1>
</section>

{/* HERO */}
<section
style={{
background: '#000',
color: '#f5c96a',
padding: '30px',
borderBottom: '4px solid #000',
}}
>
<h2 style={{ margin: 0, fontWeight: 'bold' }}>
Play fair.
</h2>
<p style={{ marginTop: '10px' }}>
You are cordially invited to the political venue.
</p>
<p style={{ marginTop: '10px', fontStyle: 'italic' }}>
Freedom is deliberate.
</p>
</section>

{/* MAIN TWO-COLUMN LAYOUT */}
<section
style={{
display: 'flex',
gap: '20px',
padding: '30px',
}}
>
{/* LEFT COLUMN — 1/3 */}
<aside
style={{
flex: 1,
background: '#000',
color: '#f5c96a',
padding: '20px',
border: '4px solid #000',
}}
>
<div style={{ marginBottom: '20px' }}>
<strong>Pier / Peacock</strong>
<p style={{ fontSize: '14px' }}>
Luxury partners meet High Worth While Individuals.
</p>
</div>

<div style={{ marginBottom: '20px' }}>
<button style={buttonStyle}>Polidish Blog</button>
</div>

<div>
<button style={buttonStyle}>Polidish Store</button>
</div>
</aside>

{/* RIGHT COLUMN — 2/3 */}
<section
style={{
flex: 2,
background: '#111',
color: '#f5c96a',
padding: '20px',
border: '4px solid #000',
}}
>
{/* MEMBER SIGNUP */}
<div
style={{
background: '#000',
padding: '20px',
marginBottom: '20px',
border: '2px solid #f5c96a',
}}
>
<h3>Members</h3>
<p>Verified contributors. Public discourse.</p>
<input
placeholder="your@email.com"
style={{
width: '100%',
padding: '10px',
marginTop: '10px',
border: '2px solid #f5c96a',
background: '#111',
color: '#f5c96a',
}}
/>
</div>

{/* JUNGLE THREAD */}
<div
style={{
background: '#000',
padding: '30px',
border: '2px solid #f5c96a',
minHeight: '300px',
}}
>
<h3>Welcome to the Jungle Thread — Members Only</h3>
<p style={{ fontStyle: 'italic' }}>
No posts yet — the first verified voice starts the fire.
</p>
</div>
</section>
</section>

{/* FOOTER */}
<footer
style={{
background: '#000',
color: '#f5c96a',
padding: '20px',
fontSize: '12px',
borderTop: '4px solid #000',
}}
>
<p>
Polidish LLC is not legally responsible for your poor judgment.
You endanger children, threaten terrorism, or break the law — you reveal yourself
