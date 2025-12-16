'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
{
src: '/pier.jpeg',
caption: 'Visualize your ad right here, to the left, or in the center.'
},
{
src: '/decanter.jpeg',
caption: 'Advertisements are absolutely uncurated for your privacy.'
},
{
src: '/peacock.jpeg',
caption:
'Polidish: the Outpost — where luxury partners meet High Worth While Individuals (HWWI).'
}
];

export default function Page() {
const [index, setIndex] = useState(0);
const [fade, setFade] = useState(true);

useEffect(() => {
const hold = setTimeout(() => {
setFade(false);
}, 15000); // hold image for 15s

const transition = setTimeout(() => {
setIndex((prev) => (prev + 1) % images.length);
setFade(true);
}, 30000); // 15s fade out + 15s fade in

return () => {
clearTimeout(hold);
clearTimeout(transition);
};
}, [index]);

return (
<main style={styles.page}>
{/* Logo */}
<div style={styles.logoWrap}>
<Image
src="/_logo polidish.png"
alt="Polidish logo"
width={120}
height={60}
style={styles.logo}
/>
</div>

{/* Image column */}
<section style={styles.column}>
<div
style={{
...styles.imageFrame,
opacity: fade ? 1 : 0
}}
>
<Image
src={images[index].src}
alt=""
fill
style={{ objectFit: 'cover' }}
/>
<div style={styles.caption}>{images[index].caption}</div>
</div>
</section>
</main>
);
}

const styles: { [key: string]: React.CSSProperties } = {
page: {
background: '#d67c1c',
minHeight: '100vh',
padding: '20px',
display: 'flex',
flexDirection: 'column'
},

logoWrap: {
marginBottom: '16px'
},

logo: {
border: '3px solid black'
},

column: {
maxWidth: '420px',
width: '100%'
},

imageFrame: {
position: 'relative',
width: '100%',
aspectRatio: '3 / 4',
border: '4px solid black',
transition: 'opacity 15s linear',
overflow: 'hidden'
},

caption: {
position: 'absolute',
bottom: '12px',
left: '12px',
right: '12px',
color: '#f5d35b',
fontStyle: 'italic',
fontSize: '16px',
textShadow: '1px 1px 2px black'
}
};

