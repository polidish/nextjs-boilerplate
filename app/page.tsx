export default function Page() {
return (
<main style={{ background: '#8b3a1a', minHeight: '100vh', color: '#111' }}>

{/* TOP BANNER */}
<div style={{
background: '#fff',
color: '#c45a1a',
textAlign: 'center',
padding: '12px 20px',
fontStyle: 'italic',
fontWeight: 500,
borderBottom: '4px solid #000'
}}>
Politely dishing politics. <em>May the best mind win.</em>
</div>

{/* HERO */}
<section style={{
padding: '40px 20px 30px',
textAlign: 'center',
background: '#f5f1ea',
borderBottom: '6px solid #000'
}}>
<h1 style={{ fontSize: '40px', margin: '0 0 10px' }}>
Play fair.
</h1>
<p style={{ fontSize: '20px', margin: '0 0 14px' }}>
You’re cordially invited to the political venue.
</p>
<p style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>
Freedom is deliberate.
</p>
</section>

{/* MAIN BODY */}
<section style={{
display: 'grid',
gridTemplateColumns: '1fr 2fr',
gap: '20px',
padding: '30px',
maxWidth: '1400px',
margin: '0 auto'
}}>

{/* LEFT COLUMN (1/3) */}
<aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

{['Canter', 'Peacock', 'Blog', 'Store'].map(label => (
<div key={label} style={{
background: '#000',
color: '#f5c96a',
padding: '20px',
border: '3px solid #f5c96a',
textAlign: 'center',
fontWeight: 'bold'
}}>
{label}
</div>
))}

<div style={{
background: '#000',
color: '#ccc',
padding: '20px',
border: '3px solid #444',
textAlign: 'center'
}}>
Advertisement
</div>

</aside>

{/* RIGHT COLUMN (2/3) */}
<div style={{
background: '#000',
border: '4
