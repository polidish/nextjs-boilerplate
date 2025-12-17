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
<div
style={{
opacity: visible ? 1 : 0,
transition: 'opacity 15s linear',
willChange: 'opacity',
}}
>
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
<Image src="/_logo polidish.png" alt="Polidish" width={48} height={48} />
<div
style={{
color: '#d8925c',
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
<section
className="layout"
style={{
display: 'grid',
gridTemplateColumns: '320px 1fr',
gap: 24,
padding: 24,
}}
>
{/* LEFT COLUMN — DESKTOP ADS */}
<aside className="desktop-ads" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />
</aside>

{/* RIGHT COLUMN — JUNGLE THREAD */}
<section
style={{
border: '3px solid black',
padding: 24,
background: 'white',
display: 'flex',
flexDirection: 'column',
}}
>
<h2>Politely dishing politics. May the best mind win.</h2>
<p>Freedom is deliberate. Welcome to the Jungle Thread.</p>

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

<div
style={{
flex: 1,
border: '1px solid #ddd',
padding: 8,
overflowY: 'auto',
}}
>
<div style={{ fontStyle: 'italic', opacity: 0.8 }}>Enter</div>
</div>

<div className="signup-block" style={{ display: 'flex', gap: 8, marginTop: 12 }}>
<input
type="email"
placeholder="Email for member sign-up"
style={{ flex: 1, padding: 8 }}
/>
<button style={{ padding: '8px 16px' }}>Join</button>
</div>

<p style={{ fontSize: 12, marginTop: 12 }}>
18+ only. By visiting or joining Polidish, you affirm that you are at
least 18 years of age.
</p>
</section>
</section>

{/* MOBILE ADS — BELOW THREAD */}
<section className="mobile-ads" style={{ display: 'none', padding: '0 24px 24px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
<AdFrame startIndex={0} />
<AdFrame startIndex={1} />
<AdFrame startIndex={2} />
</div>
</section>

{/* FOOTER */}
<footer
style={{
background: 'white',
color: 'black',
padding: '12px 24px',
fontSize: 12,
display: 'flex',
justifyContent: 'space-between',
borderTop: '2px solid black',
}}
>
<div>
Polidish LLC is not legally responsible for your poor judgment. If you
endanger children, threaten terrorism, or break the law, you reveal
yourself. Two factor authentication. It’s a troll-free freedom fest.
</div>
<div>© 2025 Polidish LLC. All rights reserved. — 127 Minds Day 1</div>
</footer>

{/* MOBILE RULES */}
<style jsx global>{`
@media (max-width: 768px) {
.layout {
display: block !important;
padding: 16px;
}

.desktop-ads {
display: none !important;
}

.mobile-ads {
display: block !important;
width: 100%;
}

footer {
border-top: none;
}
}
`}</style>
</main>
);
}

