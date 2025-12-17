'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Ad = {
src: string;
caption: string;
duration: number;
};

const ADS_TOP: Ad[] = [
{
src: '/pier.jpeg',
caption: 'Visualize your ad right here, to the left, or in the center.',
duration: 15000,
},
];

const ADS_MIDDLE: Ad[] = [
{
src: '/decanter.jpeg',
caption: 'Advertisements are absolutely uncurated for your privacy.',
duration: 30000,
},
];

const ADS_BOTTOM: Ad[] = [
{
src: '/peacock.jpeg',
caption:
'Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI).',
duration: 60000,
},
];

function RotatingAd({ ads, width }: { ads: Ad[]; width: number }) {
const [index, setIndex] = useState(0);
const [visible, setVisible] = useState(true);

useEffect(() => {
const current = ads[index];
const hold = current.duration;
const transition = 15000;

const t1 = setTimeout(() => setVisible(false), hold);
const t2 = setTimeout(() => {
setIndex((i) => (i + 1) % ads.length);
setVisible(true);
}, hold + transition);

return () => {
clearTimeout(t1);
clearTimeout(t2);
};
}, [index, ads]);

return (
<div style={{ border: '3px solid black', padding: 8, position: 'relative' }}>
<div
style={{
opacity: visible ? 1 : 0,
transition: 'opacity 15s linear',
}}
>
<Image
src={ads[index].src}
alt="Advertisement"
width={width}
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
{ads[index].caption}
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
color: '#c96a2d',
fontWeight: 600,
fontSize: 14,
}}
>
THE VENUE FOR UNCENSORED POLITICAL DISCOURSE. 18+
</div>
</header>

{/* BODY */}
<section className="layout">
{/* LEFT COLUMN */}
<aside className="ads">
<RotatingAd ads={ADS_TOP} width={300} />
<RotatingAd ads={ADS_MIDDLE} width={260} />
<RotatingAd ads={ADS_BOTTOM} width={300} />
</aside>

{/* RIGHT COLUMN */}
<section className="venue">
<h2>Politely dishing politics. May the best mind win.</h2>
<p>Freedom is deliberate. Welcome to the jungle thread.</p>

<div className="thread">
<em>enter</em>
<div className="scroll">
{/* posts will render here */}
</div>
</div>

<div className="signup">
<input type="email" placeholder="Email for member sign-up" />
<button>Join</button>
</div>

<p style={{ fontSize: 12 }}>
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
<style>{`
.layout {
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
.venue {
border: 3px solid black;
padding: 24px;
background: white;
}
.thread {
margin-top: 16px;
}
.scroll {
max-height: 300px;
overflow-y: auto;
margin-top: 8px;
}
.signup {
display: flex;
gap: 8px;
margin-top: 12px;
}

@media (max-width: 768px) {
.layout {
display: flex;
flex-direction: column;
}
.ads {
order: 1;
}
.venue {
order: 2;
}
}
`}</style>
</main>
);
}
