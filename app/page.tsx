export default function Page() {
return (
<main className="page">

{/* TOP STRAP */}
<div className="top-strap">
<span>YOU ARE CORDIALLY INVITED TO THE POLIDISH VENUE</span>
<span>FREEDOM IS DELIBERATE</span>
</div>

<div className="content">

{/* LEFT COLUMN */}
<aside className="outpost">

<div className="photo-card">
<img src="/pier.jpg" alt="Pier" />
<div className="overlay">
Visualize your ad right here, to the left, or in the center.
</div>
</div>

<div className="photo-card">
<img src="/decanter.jpg" alt="Decanter" />
<div className="overlay">
Advertisements are absolutely uncurated for your privacy.
</div>
</div>

<div className="photo-card">
<img src="/peacock.jpg" alt="Peacock" />
<div className="overlay">
Polidish: The Outpost where luxury partners meet High Worth While Individuals (HWWI).
</div>
</div>

<div className="black-box">
POLIDISH.STORE COMING SOON FOR ORIGINAL POLIDISH BRAND MERCH
</div>

<div className="black-box">
POLIDISH.BLOG COMING SOON IN 2026 — MEMBERS EXTENDED DISH
</div>

</aside>

{/* RIGHT COLUMN */}
<section className="thread">
<div className="signup">
<h1>Polidish</h1>
<p>Transparent. Public view. Members-only posting.<br/>18+ · Freedom of speech · No censorship</p>
<input placeholder="your@email.com" />
<button>Join</button>
</div>

<div className="jungle">
Jungle loading…
</div>
</section>

</div>

{/* FOOTER */}
<footer className="footer">
<div className="legal">
Polidish LLC is not legally responsible for your poor judgment. If you endanger children, threaten terrorism, or break the law, you reveal yourself. Two-factor authentication. It’s a troll-free freedom fest.
</div>
<div className="meta">
<span>Polidish LLC · All rights reserved</span>
<span>127 Minds · Day One</span>
</div>
</footer>

</main>
);
}
