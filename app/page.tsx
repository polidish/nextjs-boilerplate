export default function Page() {
return (
<main style={{ background: "#c46f2d", minHeight: "100vh", fontFamily: "serif" }}>

{/* TOP BANNER */}
<div style={{
background: "white",
color: "#c46f2d",
textAlign: "center",
fontStyle: "italic",
fontSize: "22px",
padding: "10px 0",
borderBottom: "2px solid #000"
}}>
Politely dish politics. May the best mind win.
</div>

{/* HERO HEADER */}
<div style={{
display: "flex",
justifyContent: "space-between",
padding: "20px",
fontSize: "22px",
fontWeight: "bold"
}}>
<div>YOU ARE CORDIALLY INVITED TO THE POLIDISH VENUE</div>
<div>FREEDOM IS DELIBERATE</div>
</div>

{/* MAIN GRID */}
<section style={{
display: "grid",
gridTemplateColumns: "320px 1fr",
gap: "30px",
padding: "20px"
}}>

{/* LEFT COLUMN – OUTPOST */}
<aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

{/* PIER */}
<div style={{ position: "relative" }}>
<img src="/pier.jpg" style={{ width: "100%", display: "block" }} />
<div style={{
position: "absolute",
bottom: "15px",
left: "10px",
right: "10px",
color: "gold",
fontStyle: "italic",
textAlign: "center"
}}>
Visualize your ad right here, to the left, or in the center.
</div>
</div>

{/* DECANTER */}
<div style={{ position: "relative" }}>
<img src="/decanter.jpg" style={{ width: "100%", display: "block" }} />
<div style={{
position: "absolute",
bottom: "15px",
left: "10px",
right: "10px",
color: "gold",
fontStyle: "italic",
textAlign: "center"
}}>
Advertisements are absolutely uncurated for your privacy.
</div>
</div>

{/* PEACOCK */}
<div style={{ position: "relative" }}>
<img src="/peacock.jpg" style={{ width: "100%", display: "block" }} />
<div style={{
position: "absolute",
bottom: "15px",
left: "10px",
right: "10px",
color: "gold",
fontStyle: "italic",
textAlign: "center"
}}>
Polidish: the Outpost where luxury partners meet High Worth While Individuals (HWWI).
</div>
</div>

{/* STORE */}
<div style={{
background: "black",
color: "gold",
padding: "15px",
textAlign: "center",
fontWeight: "bold"
}}>
POLIDISH.STORE COMING SOON FOR<br />
ORIGINAL POLIDISH BRAND MERCH
</div>

{/* BLOG */}
<div style={{
background: "black",
color: "gold",
padding: "15px",
textAlign: "center",
fontWeight: "bold"
}}>
POLIDISH.BLOG COMING SOON IN<br />
2026 — MEMBERS EXTENDED DISH
</div>

</aside>

{/* RIGHT COLUMN */}
<section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

{/* MEMBER SIGN-UP */}
<div style={{
background: "black",
color: "white",
padding: "25px"
}}>
<h2 style={{ marginBottom: "5px" }}>Polidish</h2>
<p style={{ fontSize: "14px", opacity: 0.85 }}>
Transparent. Public view. Members-only posting.<br />
18+ · Freedom of speech · No censorship
</p>
<div style={{ display: "flex", marginTop: "10px" }}>
<input
placeholder="your@email.com"
style={{
flex: 1,
padding: "10px",
border: "1px solid gold",
background: "black",
color: "white"
}}
/>
<button style={{
padding: "10px 20px",
background: "gold",
border: "none",
fontWeight: "bold"
}}>
Join
</button>
</div>
</div>

{/* JUNGLE THREAD */}
<div style={{
background: "white",
minHeight: "420px",
border: "2px solid #000",
padding: "15px",
color: "#000"
}}>
Jungle loading…
</div>

</section>
</section>

{/* FOOTER */}
<footer style={{
fontSize: "12px",
padding: "20px",
color: "#000"
}}>
© 2025 Polidish LLC · Day 1 · 127 Minds<br /><br />
Polidish LLC is not legally responsible for your poor judgement.
If you endanger children, threaten terrorism, or break the law, you reveal yourself.
*Two-factor Authentication. It's a troll-free freedom fest.
</footer>

</main>
);
}
