"use client";

import { useEffect, useRef, useState } from "react";

/* =========================
AD CONFIG (LOCKED)
========================= */

type Ad = {
src: string;
caption: string;
};

const ADS: Ad[] = [
{
src: "/pier.jpeg",
caption: "Visualize your ad right here, to the left, or in the center."
},
{
src: "/decanter.jpeg",
caption: "Advertisements are absolutely uncurated for your privacy."
},
{
src: "/peacock.jpeg",
caption:
"Polidish: the Outpost — where luxury partners meet High Worth While Individuals (HWWI)."
}
];

/* =========================
AD BOX COMPONENT
========================= */

function AdBox({
holdMs,
transitionMs,
startIndex
}: {
holdMs: number;
transitionMs: number;
startIndex: number;
}) {
const [current, setCurrent] = useState(startIndex % ADS.length);
const [next, setNext] = useState((startIndex + 1) % ADS.length);
const [fading, setFading] = useState(false);

const holdTimer = useRef<number | null>(null);
const transitionTimer = useRef<number | null>(null);

useEffect(() => {
if (holdTimer.current) clearTimeout(holdTimer.current);
if (transitionTimer.current) clearTimeout(transitionTimer.current);

holdTimer.current = window.setTimeout(() => {
setFading(true);

transitionTimer.current = window.setTimeout(() => {
setCurrent(next);
setNext((next + 1) % ADS.length);
setFading(false);
}, transitionMs);
}, holdMs);

return () => {
if (holdTimer.current) clearTimeout(holdTimer.current);
if (transitionTimer.current) clearTimeout(transitionTimer.current);
};
}, [current, next, holdMs, transitionMs]);

return (
<div className="ad-box">
<div
className="ad-layer"
style={{
opacity: fading ? 0 : 1,
transition: `opacity ${transitionMs}ms linear`
}}
>
<img src={ADS[current].src} alt="" />
<div className="caption">{ADS[current].caption}</div>
</div>

<div
className="ad-layer next"
style={{
opacity: fading ? 1 : 0,
transition: `opacity ${transitionMs}ms linear`
}}
>
<img src={ADS[next].src} alt="" />
<div className="caption">{ADS[next].caption}</div>
</div>
</div>
);
}

/* =========================
PAGE
========================= */

export default function Page() {
return (
<main className="page">
{/* HEADER */}
<header className="header">
<div className="topline">GRAND OPENING COMING SOON</div>
<div className="brandline">
<em>Politely dishing politics.</em>{" "}
<strong>May the best mind win.</strong>
</div>
</header>

{/* BODY */}
<section className="layout">
{/* LEFT COLUMN */}
<aside className="left">
<div className="logo-frame">
<img src="/logo.png" alt="Polidish" />
</div>

<div className="ads">
<AdBox holdMs={15000} transitionMs={15000} startIndex={0} />
<AdBox holdMs={30000} transitionMs={15000} startIndex={1} />
<AdBox holdMs={60000} transitionMs={15000} startIndex={2} />
</div>
</aside>

{/* RIGHT COLUMN */}
<section className="right">
<div className="hero">
<h1>PLAY FAIR</h1>
<p>You’re cordially invited to the Polidish venue.</p>
<em>Freedom is deliberate.</em>
</div>

<div className="jungle">
<div className="jungle-head">
<strong>Jungle Thread</strong>
<button>Members Sign Up</button>
</div>
<div className="jungle-body">
Preparing the venue.
</div>
</div>
</section>
</section>

{/* FOOTER */}
<footer className="footer">
Polidish LLC · Legal disclaimer · Count
</footer>

{/* STYLES */}
<style>{`
.page {
background: #d67c1c;
min-height: 100vh;
padding: 18px;
font-family: Georgia, "Times New Roman", Times, serif;
overflow-x: hidden;
color: #111;
}

.header {
margin-bottom: 14px;
}

.topline {
font-size: 14px;
letter-spacing: 0.08em;
text-transform: uppercase;
margin-bottom: 6px;
}

.brandline {
font-size: 18px;
}

.layout {
display: flex;
gap: 18px;
align-items: flex-start;
}

.left {
width: 380px;
max-width: 100%;
}

.right {
flex: 1;
}

.logo-frame {
border: 3px solid #000;
padding: 6px;
display: inline-block;
margin-bottom: 12px;
}

.logo-frame img {
height: 48px;
display: block;
}

.ads {
display: flex;
flex-direction: column;
gap: 14px;
}

.ad-box {
border: 4px solid #000;
position: relative;
overflow: hidden;
aspect-ratio: 4 / 5;
background: #000;
}

.ad-layer {
position: relative;
width: 100%;
height: 100%;
}

.ad-layer.next {
position: absolute;
inset: 0;
}

.ad-box img {
width: 100%;
height: 100%;
object-fit: cover;
display: block;
}

.caption {
position: absolute;
left: 12px;
right: 12px;
bottom: 12px;
color: #f5d35b;
font-style: italic;
font-size: 16px;
text-shadow: 1px 1px 2px #000;
}

.hero {
border: 4px solid #000;
background: #fff;
padding: 14px;
margin-bottom: 14px;
}

.hero h1 {
margin: 0 0 6px 0;
font-size: 26px;
}

.jungle {
border: 4px solid #000;
background: #fff;
}

.jungle-head {
display: flex;
justify-content: space-between;
align-items: center;
padding: 12px;
border-bottom: 4px solid #000;
}

.jungle-head button {
border: 3px solid #000;
background: #fff;
padding: 6px 10px;
font-family: inherit;
font-weight: bold;
cursor: pointer;
}

.jungle-body {
padding: 14px;
font-size: 18px;
}

.footer {
margin-top: 16px;
font-size: 12px;
opacity: 0.9;
}

@media (max-width: 900px) {
.layout {
flex-direction: column;
}
.left {
width: 100%;
}
}
`}</style>
</main>
);
}
