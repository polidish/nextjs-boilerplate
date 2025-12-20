'use client';

import { useEffect } from 'react';

export default function Page() {
useEffect(() => {
const ads = document.querySelectorAll<HTMLElement>('.ad');
const transition = 15000;
let i = 0;

function rotate() {
const current = ads[i];
const hold = parseInt(current.dataset.hold || '0', 10);

setTimeout(() => {
current.classList.remove('active');

setTimeout(() => {
i = (i + 1) % ads.length;
ads[i].classList.add('active');
rotate();
}, transition);

}, hold);
}

if (ads.length > 0) rotate();
}, []);

return (
<>
<style jsx global>{`
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; height: 100%; }

body {
font-family: Georgia, serif;
background: #c87c00;
color: #111;
}

.header {
display: flex;
align-items: center;
justify-content: space-between;
padding: 14px 24px;
border-bottom: 1px solid #111;
}

._logo { height: 34px; }

.header-line {
font-style: italic;
font-size: 16px;
}

.page {
display: grid;
grid-template-columns: 280px 1fr;
min-height: calc(100vh - 64px);
}

.outpost {
display: flex;
flex-direction: column;
padding: 18px;
border-right: 1px solid #111;
}

.outpost-note {
font-size: 13px;
margin-bottom: 16px;
}

.ad { display: none; }
.ad.active { display: block; }

.ad-caption {
margin-top: 10px;
font-size: 14px;
}

.outpost-links {
margin-top: auto;
display: flex;
gap: 12px;
}

.outpost-btn {
border: 1px solid #111;
padding: 6px 10px;
background: transparent;
text-decoration: none;
color: #111;
}

.jungle {
display: flex;
flex-direction: column;
min-height: 100%;
}

.auth {
padding: 16px 24px;
border-bottom: 1px solid #111;
}

.auth input {
width: 100%;
padding: 8px;
border: 1px solid #111;
background: transparent;
font-family: Georgia, serif;
}

.signin-note {
margin-top: 8px;
font-size: 13px;
}

.jungle-thread {
flex: 1;
padding: 24px;
overflow-y: auto;
}

.jungle-thread::after {
content: '';
display: block;
height: 180vh;
}

.mini-footer {
padding: 12px 24px;
border-top: 1px solid #111;
font-size: 12px;
}

.footer {
padding: 16px 24px;
border-top: 1px solid #111;
font-size: 12px;
}

@media (max-width: 768px) {
.page { grid-template-columns: 1fr; }
.outpost {
order: 2;
border-right: none;
border-top: 1px solid #111;
}
.jungle { order: 1; }
}
`}</style>

{/* HEADER */}
<header className="header">
<img src="/_logo.png" className="_logo" alt="Polidish logo" />
<div className="header-line">
Politely dishing politics. May the best mind win.
</div>
</header>

<div className="page">

{/* OUTPOST */}
<aside className="outpost">
<div className="outpost-note">Uncurated.</div>

<div className="ad active" data-hold="15000">
<img src="/ads/ad1.jpg" alt="" />
</div>

<div className="ad" data-hold="32000">
<img src="/ads/ad2.jpg" alt="" />
<div className="ad-caption">
{typeof window !== 'undefined' && (window as any).POLIDISH_AD2_CAPTION}
</div>
</div>

<div className="ad" data-hold="60000">
<img src="/ads/ad3.jpg" alt="" />
<div className="ad-caption">
{typeof window !== 'undefined' && (window as any).POLIDISH_AD3_CAPTION}
</div>
</div>

<div className="outpost-links">
<a className="outpost-btn" href="https://polidish.blog">polidish.blog</a>
<a className="outpost-btn" href="https://polidish.store">polidish.store</a>
</div>
</aside>

{/* JUNGLE */}
<main className="jungle">
<div className="auth">
<input type="email" placeholder="Email for member sign-up" />
<div className="signin-note">Sign in required to post.</div>
</div>

<section className="jungle-thread">
{/* existing jungle content */}
</section>

<div className="mini-footer">18+</div>
</main>

</div>

<footer className="footer">
{typeof window !== 'undefined' && (window as any).POLIDISH_FOOTER_COPY}
</footer>
</>
);
}
