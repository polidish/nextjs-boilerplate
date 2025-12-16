'use client';

import { useEffect, useState } from 'react';

const images = ['/pier.jpeg', '/decanter.jpeg', '/peacock.jpeg'];

function AdBox({
duration,
caption,
}: {
duration: number;
caption: string;
}) {
const [index, setIndex] = useState(0);
const [visible, setVisible] = useState(true);

useEffect(() => {
const holdTime = duration * 1000;
const transitionTime = 15000;

const cycle = () => {
// fade out
setVisible(false);

// switch image halfway through transition
setTimeout(() => {
setIndex((prev) => (prev + 1) % images.length);
}, transitionTime / 2);

// fade back in
setTimeout(() => {
setVisible(true);
}, transitionTime);
};

const interval = setInterval(cycle, holdTime + transitionTime);

return () => clearInterval(interval);
}, [duration]);

return (
<div style={styles.adBox}>
<img
src={images[index]}
style={{
...styles.image,
opacity: visible ? 1 : 0,
}}
/>
<div style={styles.caption}>{caption}</div>
</div>
);
}

export default function Page() {
return (
<main style={styles.page}>
{/* LEFT COLUMN — ADS */}
<section style={styles.left}>
<AdBox
duration={15}
caption="Visualize your ad right here, to the left, or in the center."
/>
<AdBox
duration={30}
caption="Advertisements are absolutely uncurated for your privacy."
/>
<AdBox
duration={60}
caption="Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI)."
/>
</section>

{/* RIGHT COLUMN — JUNGLE PLACEHOLDER */}
<section style={styles.right}>
<div style={styles.jungleBox}>Jungle loading…</div>
</section>
</main>
);
}

const styles: Record<string, React.CSSProperties> = {
page: {
display: 'grid',
gridTemplateColumns: '340px 1fr',
gap: '24px',
padding: '24px',
background: '#d87a1d',
minHeight: '100vh',
},
left: {
display: 'flex',
flexDirection: 'column',
gap: '24px',
},
right: {
background: '#f5f5f5',
border: '2px solid #000',
padding: '24px',
},
jungleBox: {
height: '100%',
border: '2px dashed #999',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontStyle: 'italic',
},
adBox: {
position: 'relative',
border: '4px solid #000',
overflow: 'hidden',
},
image: {
width: '100%',
display: 'block',
transition: 'opacity 7.5s ease-in-out',
},
caption: {
position: 'absolute',
bottom: '12px',
left: '12px',
right: '12px',
color: '#f5d35b',
fontStyle: 'italic',
fontSize: '16px',
textShadow: '1px 1px 2px #000',
},
};
