export default function Page() {
return (
<main style={{ background: '#c86b28', minHeight: '100vh' }}>

{/* TOP STRAPLINE */}
<header style={{
background: '#c86b28',
color: '#111',
textAlign: 'center',
padding: '12px 0',
fontStyle: 'italic'
}}>
Politely dish politics. May the best mind win.
</header>

{/* HERO ROW */}
<section style={{
display: 'grid',
gridTemplateColumns: '320px 1fr',
gap: '24px',
padding: '24px'
}}>

{/* LEFT COLUMN — OUTPOST */}
<aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

{/* IMAGE 1 */}
<div style={{ position: 'relative' }}>
<img src="/pier.jpg" style={{ width: '100%' }} />
<div style={overlayStyle}>
Visualize your ad right here, to the left, or in the center.
</div>
</div>

{/* IMAGE 2 */}
<div style={{ position: 'relative' }}>
<img src="/decanter.jpg" style={{ width: '100%' }} />
<div style={overlayStyle}>
Advertisements are absolutely uncurated for your privacy.
</div>
</div>

{/* IMAGE 3 */}
<div style={{ position: 'relative' }}>
<img src="/peacock.jpg" style={{ width: '100%' }} />
<div style={overlayStyle}>
Polidish: The Outpost where luxury partners meet High Worthwhile Individuals (HWWI).
</div>
</div>

{/* BLACK PROMO BOXES */}
<div style={blackBox}>
POLIDISH.STORE COMING SOON FOR<br />ORIGINAL POLIDISH BRAND MERCH
</div>

<div style={blackBox}>
POLIDISH.BLOG COMING SOON IN<br />2026 — MEMBERS EXTENDED DISH
</div>

</aside>

{/* RIGHT COLUMN */}
<section>

{/* SIGNUP BAR */}
<div style={{
background: '#000',
padding: '24px',
color: '#fff'
}}>
<h2>Polidish</h2>
<p>Transparent. Public view. Members-only posting.<br />18+ · Freedom of speech · No censorship</p>

<div style={{ display: 'flex', marginTop: '12px' }}>
<input
placeholder="your@email.com"
style={{ flex: 1, padding: '8px' }}
/>
<button style={{
background: '#e3b341',
border: 'none',
padding: '8px 16px'
}}>
Join
</button>
</div>
</div>

{/* JUNGLE THREAD */}
<div style={{
background: '#fff',
marginTop: '16px',
minHeight: '360px',
padding: '16px'
}}>
Jungle loading…
</div>

</section>
</section>

{/* FOOTER */}
<footer style={{
display: 'grid',
gridTemplateColumns: '1fr 1fr 1fr',
padding: '16px',
fontSize: '12px'
}}>

<div style={{ textAlign: 'left' }}>
Polidish LLC · All rights reserved
</div>

<div style={{ textAlign: 'center' }}>
Polidish LLC is not legally responsible for your poor judgment. If you endanger children, threaten terrorism, or break the law, you reveal yourself. Two-factor authentication. It’s a troll-free freedom fest.
</div>

<div style={{ textAlign: 'right', fontWeight: 'bold' }}>
127 Minds · Day One
</div>

</footer>

</main>
);
}

const overlayStyle = {
position: 'absolute' as const,
bottom: '12px',
left: '12px',
right: '12px',
color: '#e3b341',
fontStyle: 'italic',
fontSize: '14px'
};

const blackBox = {
background: '#000',
color: '#e3b341',
padding: '12px',
textAlign: 'center' as const,
fontWeight: 'bold'
};
