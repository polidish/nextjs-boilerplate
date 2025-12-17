'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const ADS = [
{
src: '/pier.jpeg',
caption: 'Visualize your ad right here, to the left, or in the center.',
duration: 15000,
},
{
src: '/decanter.jpeg',
caption: 'Advertisements are absolutely uncurated for your privacy.',
duration: 30000,
},
{
src: '/peacock.jpeg',
caption:
'Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI).',
duration: 60000,
},
];

function AdFrame({ startIndex }: { startIndex: number }) {
const [index, setIndex] = useState(startIndex);
const [visible, setVisible] = useState(true);

useEffect(() => {
const hold = ADS[index].duration;
const transition = 15000;

const t1 = setTimeout(() => setVisible(false), hold);
const t2 = setTimeout(() => {
setIndex((i) => (i + 1) % ADS.length);
setVisible(true);
}, hold + transition);

return () => {
clearTimeout(t1);
clearTimeout(t2);
};
}, [index]);

return (
<div style={{ border: '3px solid black', padding: 8, position: 'relative' }}>
<div style={{ opacity: visible ? 1 : 0, transition: 'opacity 15s linear' }}>
<Image
src={ADS[index].src}
alt="Advertisement"
width={300}
height={450}
style={{ width: '100%', height: 'auto' }}
/>
<div
style={{
position: 'absolute',
bottom: 16,
left: 16,
right: 16,
color: 'gold',
fontStyle: 'italic',
fontSize: 14,
}}
>
{ADS[index].caption}
</div>
</div>
</div>
);
}

export default function Page() {
return (
<main style={{ fontFamily: 'serif' }}>
{/* HEADER */}
<header
style={{
background: 'black',
color: 'white',
padding: '12px 24px',
display: 'flex',
alignItems: 'center',
justifyContent: 'space-between',
}}
>
{/* Crisp logo: higher intrinsic resolution, same visual size */}
<Image
src="/_logo polidish.png"
alt="Polidish"
width={96}
height={96}
style={{ width: 48, height: 48 }}
priority
/>

<div
style={{
color: '#d07a3a',
fontSize: 'clamp(14px, 1.6vw, 20px)',
letterSpacing: '0.05em',
textTransform: 'uppercase',
fontWeight: 600,
}}
>
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</div>
</header>

{/* BODY */}
<section className="grid">
{/* LEFT COLUMN — THREE ADS */}
<aside className="ads">
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />
</aside>

{/* RIGHT COLUMN — JUNGLE THREAD */}
<section className="jungle">
{/* Top, flush-left */}
<h2 style={{ marginBottom: 8 }}>
Politely dishing politics. May the best mind win.
</h2>

{/* Sign-up at TOP for functionality */}
<div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
<input
type="email"
placeholder="Email for member sign-up"
style={{ flex: 1, padding: 8 }}
/>
<button style={{ padding: '8px 16px' }}>Join</button>
</div>

<p style={{ marginBottom: 12 }}>
Freedom is deliberate. Welcome to the Jungle Thread.
</p>

{/* Divider */}
<div
style={{
margin: '12px 0',
padding: '8px 0',
borderTop: '1px solid #bbb',
borderBottom: '1px solid #bbb',
textAlign: 'center',
}}
>
The Jungle Thread only grows and grows…
</div>

{/* Scroll */}
<div
style={{
flex: 1,
border: '1px solid #ddd',
padding: 8,
overflowY: 'auto',
}}
>
<div style={{ fontStyle: 'italic' }}>Enter</div>
</div>

<p style={{ fontSize: 12, marginTop: 12 }}>
18+ only. By visiting or joining Polidish, you affirm that you are at
least 18 years of age.
</p>
</section>
</section>

{/* FOOTER — full width, single row */}
<footer className="footer">
<div className="footer-left">
Polidish LLC is not legally responsible for your poor judgment. If you
endanger children, threaten terrorism, or break the law, you reveal
yourself. Two factor authentication. It’s a troll-free freedom fest.
</div>
<div className="footer-right">
© 2025 Polidish LLC. All rights reserved. — 127 Minds Day 1
</div>
</footer>

{/* Styles (desktop locked; mobile stacking only) */}
<style jsx>{`
.grid {
display: grid;
grid-template-columns: 320px 1fr;
gap: 24px;
padding: 24px;
}
.ads {
display: flex;
flex-direction: column;
gap: 16px;
}
.jungle {
border: 3px solid black;
padding: 24px;
background: white;
display: flex;
flex-direction: column;
min-height: 100%;
}
.footer {
width: 100%;
display: flex;
justify-content: space-between;
align-items: flex-start;
gap: 16px;
padding: 16px 24px;
font-size: 12px;
border-top: 2px solid black;
background: white;
color: black;
box-sizing: border-box;
}
.footer-left {
flex: 1;
}
.footer-right {
white-space: nowrap;
}

/* MOBILE — stack only */
@media (max-width: 768px) {
.grid {
grid-template-columns: 1fr;
}
.ads {
order: 2; /* ads below jungle on mobile */
}
.jungle {
order: 1;
}
.footer {
flex-direction: row; /* stay single row */
}
}
`}</style>
</main>
);
}


