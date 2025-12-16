'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const IMAGES = [
{
src: '/pier.jpeg',
caption: 'Visualize your ad right here, to the left, or in the center.',
},
{
src: '/decanter.jpeg',
caption: 'Advertisements are absolutely uncurated for your privacy.',
},
{
src: '/peacock.jpeg',
caption:
'Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI).',
},
];

function RotatingAd({
startIndex,
hold,
}: {
startIndex: number;
hold: number;
}) {
const [index, setIndex] = useState(startIndex);
const [visible, setVisible] = useState(true);

useEffect(() => {
const transition = 15000;

const t1 = setTimeout(() => setVisible(false), hold);
const t2 = setTimeout(() => {
setIndex((i) => (i + 1) % IMAGES.length);
setVisible(true);
}, hold + transition);

return () => {
clearTimeout(t1);
clearTimeout(t2);
};
}, [index, hold]);

return (
<div style={{ border: '3px solid black', position: 'relative' }}>
<div
style={{
opacity: visible ? 1 : 0,
transition: 'opacity 15s linear',
}}
>
<Image
src={IMAGES[index].src}
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
{IMAGES[index].caption}
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
fontSize: 18,
fontWeight: 700,
color: '#d9895b',
textTransform: 'uppercase',
}}
>
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</div>
</header>

{/* BODY */}
<section
style={{
display: 'grid',
gridTemplateColumns: '320px 1fr',
gap: 24,
padding: 24,
alignItems: 'stretch',
}}
>
{/* LEFT COLUMN */}
<aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
<RotatingAd startIndex={0} hold={15000} />
<RotatingAd startIndex={1} hold={30000} />
<RotatingAd startIndex={2} hold={60000} />

<div
style={{
border: '3px solid black',
background: 'black',
color: 'gold',
padding: 12,
textAlign: 'center',
}}
>
POLIDISH.STORE COMING SOON FOR ORIGINAL POLIDISH BRAND MERCH
</div>

<div
style={{
border: '3px solid black',
background: 'black',
color: 'gold',
padding: 12,
textAlign: 'center',
}}
>
POLIDISH.BLOG COMING SOON IN 2026 — MEMBERS EXTENDED DISH
</div>
</aside>

{/* RIGHT COLUMN — MATCHED HEIGHT */}
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

<button style={{ padding: '6px 14px', marginBottom: 12 }}>
Enter
</button>

{/* JUNGLE THREAD */}
<div
style={{
border: '1px solid #ccc',
flex: 1,
overflowY: 'auto',
marginBottom: 12,
}}
>
<div style={{ padding: 12, borderBottom: '1px solid #ddd' }} />
<div style={{ padding: 12, borderBottom: '1px solid #ddd' }} />
<div style={{ padding: 12, borderBottom: '1px solid #ddd' }} />
<div style={{ padding: 12, borderBottom: '1px solid #ddd' }} />
<div style={{ padding: 12, borderBottom: '1px solid #ddd' }} />
<div style={{ padding: 12, borderBottom: '1px solid #ddd' }} />
</div>

<div style={{ display: 'flex', gap: 8 }}>
<input
type="email"
placeholder="Email for member sign-up"
style={{ flex: 1, padding: 8 }}
/>
<button style={{ padding: '8px 16px' }}>Join</button>
</div>

<p style={{ marginTop: 12, fontSize: 12 }}>
18+ only. By visiting or joining Polidish, you affirm that you are at
least 18 years of age.
</p>
</section>
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
borderTop: '1px solid #ccc',
}}
>
<div>
Polidish LLC is not legally responsible for your poor judgment. If you
endanger children, threaten terrorism, or break the law, you reveal
yourself. Two factor authentication. It’s a troll-free freedom fest.
</div>
<div>
© 2025 Polidish LLC. All rights reserved. — 127 Minds Day 1
</div>
</footer>
</main>
);
}
